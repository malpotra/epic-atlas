# Build the standalone Next.js server.
FROM node:22-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# nginx serves static files and proxies everything else to Next.js in the same container.
FROM nginx:stable-alpine
RUN apk add --no-cache nodejs su-exec \
  && rm -rf /usr/share/nginx/html/*

ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1

COPY --chown=nginx:nginx --from=build /app/.next/standalone /app
COPY --from=build /app/public /usr/share/nginx/html
COPY --from=build /app/.next/static /usr/share/nginx/html/_next/static
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/security-headers.conf /etc/nginx/security-headers.conf
# Each live-counter viewer holds two connections (browser and upstream), so the
# default of 1024 per worker would cap a small server at a few hundred viewers.
RUN sed -i 's/worker_connections .*;/worker_connections 4096;/' /etc/nginx/nginx.conf \
  && grep -q 'worker_connections 4096;' /etc/nginx/nginx.conf
COPY --chmod=755 docker/entrypoint.sh /entrypoint.sh

EXPOSE 80

HEALTHCHECK --interval=15s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/healthz || exit 1

# The nginx image stops on SIGQUIT, which would wait for open SSE streams to finish.
STOPSIGNAL SIGTERM
ENTRYPOINT ["/entrypoint.sh"]
