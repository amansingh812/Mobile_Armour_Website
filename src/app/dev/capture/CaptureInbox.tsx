'use client';

import { useEffect, useState } from 'react';

const SUPPLIER = 'https://www.crazyparts.com.au';

export default function CaptureInbox() {
  const [log, setLog] = useState<string[]>([]);
  useEffect(() => {
    const onMessage = async (e: MessageEvent) => {
      if (e.origin !== SUPPLIER || !e.data || e.data.source !== 'crazyparts') return;
      let reply: Record<string, unknown>;
      try {
        const r = await fetch('/api/dev/capture', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(e.data),
        });
        reply = { ack: e.data.productId, ...(await r.json()) };
      } catch (err) {
        reply = { ack: e.data.productId, error: String(err) };
      }
      setLog((l) => [`${reply.file || reply.error}`, ...l].slice(0, 200));
      (e.source as Window | null)?.postMessage(reply, SUPPLIER);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);
  return (
    <main style={{ padding: 32, fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: 22 }}>Crazy Parts capture inbox (dev only)</h1>
      <p>Keep this tab open while captures are sent. Saved: {log.length}</p>
      <ol style={{ fontSize: 13 }}>
        {log.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ol>
    </main>
  );
}
