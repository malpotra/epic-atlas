---
name: presence-counter
description: How the Epic Atlas live user counter works and how to debug it. Use when the online count is wrong, stuck or offline, or when changing lib/presence.ts, lib/redis.ts, the /api/presence route or LiveCounter.
---

# Presence counter

## Flow

1. `components/LiveCounter.tsx` keeps an anonymous UUID in `localStorage` and opens `EventSource("/api/presence?visitor=<uuid>")`. It closes the stream while the tab is hidden.
2. `app/api/presence/route.ts` validates the UUID and subscribes the stream to the process-wide `PresenceHub`.
3. `lib/presence.ts`: every `TICK_MS` (2s) while streams are open, the hub refreshes its connected visitors, gets the total, and pushes it to its streams if it changed.
4. `lib/redis.ts`: the refresh is one pipeline on the sorted set `presence:visitors`, where the score is last-seen time: `ZADD` for each visitor, `ZREMRANGEBYSCORE` older than `VISITOR_TTL_MS` (15s), `ZCARD`, `PEXPIRE`.

The stream sends `{"count": <number>}`, or `{"count": null}` when Redis is unavailable, which the badge shows as `COUNTER OFFLINE`.

## Design constraints

- **Never delete a visitor on disconnect.** Their other tabs may still be open, possibly on another replica. Expiry handles it, which is also why a refresh doesn't make the count dip.
- **Hidden tabs must disconnect.** HTTP/1.1 browsers allow only 6 connections per site, so open streams from background tabs could block the whole site.
- **`VISITOR_TTL_MS` must stay well above `TICK_MS`,** or a slow tick makes live visitors flicker out.
- **Keep the visitor UUID generator on `getRandomValues`.** `crypto.randomUUID` doesn't exist on plain-HTTP origins.
- **Route handlers:** with Cache Components on, the route uses `await connection()`. Don't add `export const dynamic`.

## Debugging

```sh
# Watch the stream through nginx. Events should appear immediately.
curl -N "http://localhost:8080/api/presence?visitor=3f2b8c1e-9d4a-4b7c-8e21-0a1b2c3d4e5f"

# See who Redis has, with last-seen times
docker compose exec redis redis-cli ZRANGE presence:visitors 0 -1 WITHSCORES
```

| Symptom | Likely cause |
|---|---|
| Events arrive late or in bursts | nginx buffering: check the `/api/presence` block in `docker/nginx.conf` |
| Badge stuck on `COUNTER OFFLINE` | Redis unreachable: check `REDIS_URL` and look for `[redis]` lines in the app logs |
| Replicas show different totals | They point at different Redis instances, or their clocks differ by a large amount |
| Count too high for 15s after leaving | Expected, this is the TTL |

Run `npm test` after changing the logic. `tests/presence.test.ts` covers de-duplication, expiry, late subscribers, multiple processes and failure recovery.
