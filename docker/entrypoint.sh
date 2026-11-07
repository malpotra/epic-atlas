#!/bin/sh
# Runs Next.js and nginx together. If either one dies, the other is stopped and the
# container exits non-zero, so Docker can restart it instead of leaving it half-working.

cd /app || exit 1

HOSTNAME=127.0.0.1 PORT=3000 su-exec nginx node server.js &
node_pid=$!

nginx -g 'daemon off;' &
nginx_pid=$!

stop_all() {
  kill -TERM "$node_pid" "$nginx_pid" 2>/dev/null
  wait "$node_pid" "$nginx_pid" 2>/dev/null
}

trap 'trap - TERM INT; stop_all; exit 0' TERM INT

while kill -0 "$node_pid" 2>/dev/null && kill -0 "$nginx_pid" 2>/dev/null; do
  # Waiting on a background sleep lets the trap run immediately on SIGTERM.
  sleep 1 &
  wait $!
done

echo "A server process exited unexpectedly. Stopping the container." >&2
stop_all
exit 1
