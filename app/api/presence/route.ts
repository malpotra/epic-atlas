import { connection } from "next/server";
import { isValidVisitorId } from "@/lib/presence";
import { getPresenceHub } from "@/lib/redis";

const KEEPALIVE_MS = 20_000;

export async function GET(request: Request) {
  await connection();

  const visitor = new URL(request.url).searchParams.get("visitor");
  if (!isValidVisitorId(visitor)) {
    return new Response("Invalid visitor id", { status: 400 });
  }

  const encoder = new TextEncoder();
  let cleanup = () => {};

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const send = (text: string) => controller.enqueue(encoder.encode(text));

      const unsubscribe = getPresenceHub().subscribe(visitor, (count) => {
        send(`data: ${JSON.stringify({ count })}\n\n`);
      });
      // A comment line stops idle proxies from dropping the connection.
      const keepalive = setInterval(() => send(": keepalive\n\n"), KEEPALIVE_MS);

      let closed = false;
      cleanup = () => {
        if (closed) return;
        closed = true;
        clearInterval(keepalive);
        unsubscribe();
      };

      send("retry: 3000\n\n");

      request.signal.addEventListener("abort", () => {
        cleanup();
        try {
          controller.close();
        } catch {
          // Already closed by the runtime.
        }
      });
    },
    cancel() {
      cleanup();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
