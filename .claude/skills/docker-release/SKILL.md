---
name: docker-release
description: Build, run, scale and verify the Epic Atlas Docker image. Use when changing the Dockerfile, docker/nginx.conf, docker/entrypoint.sh or docker-compose.yml, or before shipping an image.
---

# Docker release

## Layout

- `Dockerfile`: builds in `node:22-alpine`, runs on `nginx:stable-alpine` with Node added.
- `docker/entrypoint.sh`: runs Next.js (as user `nginx`, on `127.0.0.1:3000`) and nginx (on `:80`). If either dies, the container exits non-zero.
- `docker/nginx.conf`: serves `/_next/static/` and `public/` from disk and proxies everything else.
- `docker-compose.yml`: `app` plus `redis`. Redis has no published port.

## Verify a change

```sh
docker compose up --build -d
docker compose ps                                   # app should reach "healthy"
curl -I localhost:8080/                             # 200
curl -N "localhost:8080/api/presence?visitor=3f2b8c1e-9d4a-4b7c-8e21-0a1b2c3d4e5f"   # first event within ~2s
```

Then also check:

- **Static files come from nginx:** fetch any `/_next/static/...` URL from the page's HTML. It should have `Cache-Control: public, max-age=31536000, immutable`.
- **Security headers:** `curl -I localhost:8080/` shows `Content-Security-Policy` and `X-Content-Type-Options`, and no `Server` version or `X-Powered-By`. Load the page in a browser and check the console for CSP violations.
- **Counter limits:** more than 20 simultaneous streams from one IP get `429`.
- **Replicas share a count:** `APP_PORTS=8080-8085 docker compose up -d --scale app=2`, open a stream on each published port (`docker compose ps`), and both should report 2.
- **Failure handling:** `docker compose exec app pkill node`. The container should exit and restart.
- **Clean stop:** `time docker compose stop app` should take well under Docker's 10s timeout, even with a stream open.

## Pitfalls

- **SSE through nginx:** `/api/presence` needs `proxy_buffering off`, `gzip off` and a long `proxy_read_timeout`.
- **`add_header` inheritance:** a location with its own `add_header` loses the server-level ones, so it must `include /etc/nginx/security-headers.conf` again, as `/_next/static/` does.
- **Behind a proxy or CDN:** the per-IP limits need `set_real_ip_from` for that proxy, or every visitor shares one limit.
- **Stop signal:** the nginx base image uses `SIGQUIT`, which waits for open connections, and SSE streams never finish. Keep `STOPSIGNAL SIGTERM`.
- **`HOSTNAME`:** Docker sets it to the container ID, and Next.js binds to it. The entrypoint overrides it to `127.0.0.1`.
- **`.next/static` and `public/`:** standalone output doesn't serve these without help, so they must be copied into the nginx root.
- **Build architecture:** both stages use Alpine (musl), so native modules built in one work in the other. Keep them matched.
- **Node version:** the build needs Node 22+. Tailwind's build fails on Node 20.17.
