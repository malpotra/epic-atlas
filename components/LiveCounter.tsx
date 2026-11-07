"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "epic-atlas:visitor";
const RECONNECT_MS = 3_000;

type Status = "connecting" | "live" | "offline";

/** Built on getRandomValues because crypto.randomUUID is missing on plain-HTTP origins. */
function createVisitorId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function getVisitorId(): string {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return existing;
    const created = createVisitorId();
    localStorage.setItem(STORAGE_KEY, created);
    return created;
  } catch {
    // Storage blocked: this visit still counts, just not across tabs.
    return createVisitorId();
  }
}

export function LiveCounter() {
  const [status, setStatus] = useState<Status>("connecting");
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const visitor = getVisitorId();
    let source: EventSource | null = null;
    let retry: ReturnType<typeof setTimeout> | null = null;

    const disconnect = () => {
      if (retry !== null) clearTimeout(retry);
      retry = null;
      source?.close();
      source = null;
    };

    const connect = () => {
      disconnect();
      const next = new EventSource(`/api/presence?visitor=${visitor}`);
      source = next;

      next.onmessage = (event) => {
        const { count: latest } = JSON.parse(event.data) as { count: number | null };
        setCount(latest);
        setStatus(latest === null ? "offline" : "live");
      };
      next.onerror = () => {
        setStatus("offline");
        // EventSource retries by itself, except after a non-200 such as a 502.
        if (next.readyState === EventSource.CLOSED) {
          retry = setTimeout(connect, RECONNECT_MS);
        }
      };
    };

    // Hidden tabs let go of their connection: they aren't active, and browsers
    // allow only six HTTP/1.1 connections per site.
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") connect();
      else disconnect();
    };

    if (document.visibilityState === "visible") connect();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      disconnect();
    };
  }, []);

  const label =
    status === "live" ? `${count} ONLINE NOW` : status === "offline" ? "COUNTER OFFLINE" : "CONNECTING";

  return (
    <div
      className="live-badge"
      data-status={status}
      title="Visitors with this page open in a visible tab"
    >
      <span className="live-dot" aria-hidden="true" />
      <span className="tabular-nums">{label}</span>
    </div>
  );
}
