# Epic Atlas

A single-page, neo-brutalist atlas of the Odyssey, the Iliad, the Ramayana and the Mahabharata. Each epic has an illustrated map with an animated route, linked episode cards and a timeline. A badge shows how many people are on the page right now.

## Run with Docker

```sh
docker compose up --build
```

Then open http://localhost:8080. To run several replicas that share one count, give them a port range:

```sh
APP_PORTS=8080-8085 docker compose up --build --scale app=2
docker compose ps    # shows which port each replica got
```

Put your own load balancer in front of them in production.

## Before hosting

The container serves plain HTTP, sets security headers (CSP, `nosniff`, `frame-ancestors 'none'` and others, in [docker/security-headers.conf](docker/security-headers.conf)), and limits how many counter streams one IP can open. Before going live:

- Put it behind something that terminates HTTPS, redirects HTTP to HTTPS and adds HSTS.
- If that proxy or a CDN sits in front, configure nginx's `set_real_ip_from` / `real_ip_header` for it. Otherwise the per-IP limits in [docker/nginx.conf](docker/nginx.conf) see every visitor as the proxy's IP and throttle them all together.
- Keep Redis unexposed (no published port). For a managed Redis, use `rediss://` with a password.

To run the image against your own Redis:

```sh
docker build -t epic-atlas .
docker run -p 8080:80 -e REDIS_URL=redis://your-redis:6379 epic-atlas
```

## Develop locally

This needs **Node 20.19+, 22.13+ or 24+**. Node 22 is recommended (see [.nvmrc](.nvmrc)), since Node 20 is past end of life. Older versions such as 20.17 fail the Tailwind build, because they can't `require()` ES modules. After a failed build, delete `.next` before trying again, because the broken build cache makes later builds fail too.

```sh
npm install
npm run dev      # http://localhost:3000
npm test
npm run lint
```

Without a Redis at `REDIS_URL` (see [.env.example](.env.example)), the page still works and the badge shows `COUNTER OFFLINE`.

## How it fits together

```
browser ──> nginx :80 ──┬── /_next/static/*  served from disk
                        └── everything else  ──> Next.js :3000 ──> Redis
```

nginx and Next.js run in one container, built on `nginx:stable-alpine`. Redis is a separate service, so the count stays correct across replicas.

| Path | What it holds |
|---|---|
| `app/page.tsx` | The single page |
| `app/api/presence/route.ts`, `lib/` | Live counter (Server-Sent Events + Redis) |
| `components/`, `components/art/` | UI and the original SVG artwork |
| `content/epics/` | Story data for each epic |
| `docker/`, `Dockerfile`, `docker-compose.yml` | Container setup |
| `.claude/skills/` | Project skills for design, content, Docker and the counter |

## About the count

The count covers visitors with the page open in a visible tab. Several tabs in one browser count once. A new visitor appears within about 2 seconds and a departure within about 15. It's a friendly indicator, not analytics: a private window counts as a new visitor, and the count isn't tamper-proof.
