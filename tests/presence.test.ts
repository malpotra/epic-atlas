import { describe, expect, it } from "vitest";
import {
  isValidVisitorId,
  PresenceHub,
  VISITOR_TTL_MS,
  type PresenceStore,
} from "../lib/presence";

/** Same behaviour as the Redis sorted set: last-seen per visitor, pruned by age. */
function memoryStore(seen = new Map<string, number>()): PresenceStore {
  return {
    async refresh(visitors, now) {
      for (const visitor of visitors) seen.set(visitor, now);
      for (const [visitor, at] of seen) if (at <= now - VISITOR_TTL_MS) seen.delete(visitor);
      return seen.size;
    },
  };
}

const flush = () => new Promise((resolve) => setImmediate(resolve));
const NEVER = 1 << 30;

describe("isValidVisitorId", () => {
  it("accepts a v4 UUID and rejects anything else", () => {
    expect(isValidVisitorId("3f2b8c1e-9d4a-4b7c-8e21-0a1b2c3d4e5f")).toBe(true);
    expect(isValidVisitorId(null)).toBe(false);
    expect(isValidVisitorId("")).toBe(false);
    expect(isValidVisitorId("not-a-uuid")).toBe(false);
    expect(isValidVisitorId("3f2b8c1e-9d4a-1b7c-8e21-0a1b2c3d4e5f")).toBe(false);
  });
});

describe("PresenceHub", () => {
  it("counts several tabs from one visitor once", async () => {
    const hub = new PresenceHub(memoryStore(), NEVER);
    const seen: (number | null)[] = [];
    const stopA = hub.subscribe("visitor-a", (count) => seen.push(count));
    const stopB = hub.subscribe("visitor-a", () => {});
    await flush();
    await hub.tick();
    expect(seen.at(-1)).toBe(1);
    stopA();
    stopB();
  });

  it("gives a late subscriber the current count even though it is unchanged", async () => {
    const hub = new PresenceHub(memoryStore(), NEVER);
    const stopA = hub.subscribe("visitor-a", () => {});
    await flush();
    let late: number | null | undefined;
    const stopB = hub.subscribe("visitor-a", (count) => (late = count));
    await flush();
    expect(late).toBe(1);
    stopA();
    stopB();
  });

  it("combines visitors across processes sharing a store", async () => {
    const seen = new Map<string, number>();
    const hubA = new PresenceHub(memoryStore(seen), NEVER);
    const hubB = new PresenceHub(memoryStore(seen), NEVER);
    let latestA: number | null = null;
    const stopA = hubA.subscribe("visitor-a", (count) => (latestA = count));
    const stopB = hubB.subscribe("visitor-b", () => {});
    await flush();
    await hubA.tick();
    expect(latestA).toBe(2);
    stopA();
    stopB();
  });

  it("drops a visitor once they stop refreshing and the TTL passes", async () => {
    const seen = new Map<string, number>();
    let now = 1_000_000;
    const hubA = new PresenceHub(memoryStore(seen), NEVER, () => now);
    const hubB = new PresenceHub(memoryStore(seen), NEVER, () => now);
    let latest: number | null = null;
    const stopA = hubA.subscribe("visitor-a", (count) => (latest = count));
    const stopB = hubB.subscribe("visitor-b", () => {});
    await flush();
    await hubA.tick();
    expect(latest).toBe(2);

    stopB();
    now += VISITOR_TTL_MS - 1;
    await hubA.tick();
    expect(latest).toBe(2);

    now += 1;
    await hubA.tick();
    expect(latest).toBe(1);
    stopA();
  });

  it("reports null while the store fails, then recovers", async () => {
    let failing = true;
    const healthy = memoryStore();
    const store: PresenceStore = {
      refresh: (visitors, now) =>
        failing ? Promise.reject(new Error("down")) : healthy.refresh(visitors, now),
    };
    const hub = new PresenceHub(store, NEVER);
    const seen: (number | null)[] = [];
    const stop = hub.subscribe("visitor-a", (count) => seen.push(count));
    await flush();
    expect(seen.at(-1)).toBeNull();

    failing = false;
    await hub.tick();
    expect(seen.at(-1)).toBe(1);
    stop();
  });

  it("does not call a listener after it unsubscribes", async () => {
    const hub = new PresenceHub(memoryStore(), NEVER);
    const seen: (number | null)[] = [];
    const stop = hub.subscribe("visitor-a", (count) => seen.push(count));
    stop();
    await flush();
    expect(seen).toEqual([]);
  });
});
