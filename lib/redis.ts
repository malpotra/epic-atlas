import { Redis } from "ioredis";
import { PresenceHub, VISITOR_TTL_MS, type PresenceStore } from "./presence";

const KEY = "presence:visitors";
/** Below TICK_MS, so a down Redis still reports OFFLINE before the next tick. */
const READY_WAIT_MS = 1_500;

function createRedis(): Redis {
  const client = new Redis(process.env.REDIS_URL ?? "redis://127.0.0.1:6379", {
    // Fail fast so the badge shows OFFLINE instead of commands queueing up.
    enableOfflineQueue: false,
    maxRetriesPerRequest: 1,
    retryStrategy: (attempt) => Math.min(attempt * 500, 5_000),
  });

  let lastLogged = "";
  client.on("error", (error: Error) => {
    if (error.message !== lastLogged) console.error(`[redis] ${error.message}`);
    lastLogged = error.message;
  });
  client.on("ready", () => {
    lastLogged = "";
  });
  return client;
}

/**
 * The client connects when the first visitor arrives, and with the offline queue off,
 * a command sent before then fails. Waiting briefly stops that first visitor from
 * seeing COUNTER OFFLINE for a tick.
 */
function whenReady(client: Redis): Promise<void> {
  if (client.status === "ready") return Promise.resolve();
  return new Promise((resolve, reject) => {
    const onReady = () => {
      clearTimeout(timer);
      resolve();
    };
    const timer = setTimeout(() => {
      client.off("ready", onReady);
      reject(new Error("Redis not ready"));
    }, READY_WAIT_MS);
    client.once("ready", onReady);
  });
}

function redisStore(client: Redis): PresenceStore {
  return {
    async refresh(visitors, now) {
      await whenReady(client);
      const pipeline = client.pipeline();
      for (const visitor of visitors) pipeline.zadd(KEY, now, visitor);
      pipeline.zremrangebyscore(KEY, "-inf", now - VISITOR_TTL_MS);
      pipeline.zcard(KEY);
      pipeline.pexpire(KEY, VISITOR_TTL_MS * 2);

      const results = await pipeline.exec();
      if (!results) throw new Error("Redis pipeline returned no results");
      for (const [error] of results) if (error) throw error;

      // Order matches the pipeline above: ZCARD is second to last.
      return results[results.length - 2][1] as number;
    },
  };
}

// Kept on globalThis so dev-mode module reloads don't open a new connection each time.
const shared = globalThis as typeof globalThis & { presenceHub?: PresenceHub };

export function getPresenceHub(): PresenceHub {
  shared.presenceHub ??= new PresenceHub(redisStore(createRedis()));
  return shared.presenceHub;
}
