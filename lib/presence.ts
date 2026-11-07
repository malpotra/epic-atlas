/**
 * Live visitor counting. See .claude/skills/presence-counter/SKILL.md.
 *
 * Each process runs one timer while it has open streams. Every tick it refreshes
 * its connected visitors in the shared store, drops anyone not refreshed within
 * VISITOR_TTL_MS, and pushes the new total to its streams. Nothing is deleted on
 * disconnect, so several tabs, refreshes and crashed replicas are all safe.
 */

export const TICK_MS = 2_000;
export const VISITOR_TTL_MS = 15_000;

const VISITOR_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidVisitorId(value: string | null): value is string {
  return value !== null && VISITOR_ID.test(value);
}

export interface PresenceStore {
  /** Marks visitors as seen at `now`, expires stale ones, and returns the total. */
  refresh(visitors: string[], now: number): Promise<number>;
}

/** `null` means the count is unavailable, for example because Redis is down. */
export type CountListener = (count: number | null) => void;

export class PresenceHub {
  private readonly subscribers = new Map<symbol, { visitor: string; listener: CountListener }>();
  private timer: ReturnType<typeof setInterval> | null = null;
  private ticking = false;
  private lastCount: number | null | undefined = undefined;

  constructor(
    private readonly store: PresenceStore,
    private readonly tickMs: number = TICK_MS,
    private readonly now: () => number = Date.now,
  ) {}

  /** Registers a stream and returns its unsubscribe function. */
  subscribe(visitor: string, listener: CountListener): () => void {
    const id = Symbol(visitor);
    this.subscribers.set(id, { visitor, listener });

    if (this.timer === null) {
      this.timer = setInterval(() => void this.tick(), this.tickMs);
      this.timer.unref?.();
    }

    // Count the new visitor right away, then give this stream its first value
    // even if the total turns out unchanged.
    void this.tick().finally(() => {
      if (this.subscribers.has(id) && this.lastCount !== undefined) listener(this.lastCount);
    });

    return () => {
      this.subscribers.delete(id);
      if (this.subscribers.size === 0 && this.timer !== null) {
        clearInterval(this.timer);
        this.timer = null;
        this.lastCount = undefined;
      }
    };
  }

  async tick(): Promise<void> {
    if (this.ticking || this.subscribers.size === 0) return;
    this.ticking = true;

    const visitors = [...new Set([...this.subscribers.values()].map((s) => s.visitor))];
    let count: number | null;
    try {
      count = await this.store.refresh(visitors, this.now());
    } catch {
      count = null;
    } finally {
      this.ticking = false;
    }

    if (count === this.lastCount) return;
    this.lastCount = count;
    for (const { listener } of this.subscribers.values()) listener(count);
  }
}
