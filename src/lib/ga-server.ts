// Server-side GA4 purchase (Measurement Protocol), sent when Stripe confirms
// payment. It counts the sale even if the customer closes the tab before the
// thank-you page loads. GA4 de-duplicates purchases with the same
// transaction_id, so the browser's own purchase event doesn't double-count.
//
// Needs GA4_API_SECRET (GA4 Admin > Data streams > the web stream >
// Measurement Protocol API secrets). Without it this does nothing.

const MEASUREMENT_ID = process.env.GA4_MEASUREMENT_ID || 'G-MLSCY2PDGX';

/** client_id from the _ga cookie ("GA1.1.123456.7890123" -> "123456.7890123"). */
export function gaClientIdFromCookie(cookieHeader: string | null): string | null {
  const m = (cookieHeader || '').match(/(?:^|;\s*)_ga=GA\d\.\d\.(\d+\.\d+)/);
  return m ? m[1] : null;
}

/** session_id from the _ga_<stream> cookie (GS1.1.<id>. or GS2.1.s<id>$...). */
export function gaSessionIdFromCookie(cookieHeader: string | null): string | null {
  const id = MEASUREMENT_ID.replace(/^G-/, '');
  const m = (cookieHeader || '').match(new RegExp(`(?:^|;\\s*)_ga_${id}=([^;]+)`));
  if (!m) return null;
  const v = m[1];
  const gs1 = v.match(/^GS1\.\d\.(\d+)\./);
  if (gs1) return gs1[1];
  const gs2 = v.match(/^GS2\.\d\.s(\d+)/);
  return gs2 ? gs2[1] : null;
}

export async function sendGaPurchase(p: {
  clientId?: string | null;
  sessionId?: string | null;
  transactionId: string;
  value: number;
  shipping: number;
  items: { item_id: string; item_name: string; price: number; quantity: number }[];
}): Promise<boolean> {
  const secret = process.env.GA4_API_SECRET;
  if (!secret) return false;
  // Without the visitor's client_id the sale still counts, just not tied to their visit.
  const clientId = p.clientId || `server.${p.transactionId}`;
  const res = await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${encodeURIComponent(secret)}`,
    {
      method: 'POST',
      body: JSON.stringify({
        client_id: clientId,
        events: [
          {
            name: 'purchase',
            params: {
              transaction_id: p.transactionId,
              currency: 'AUD',
              value: p.value,
              shipping: p.shipping,
              items: p.items,
              ...(p.sessionId ? { session_id: p.sessionId } : {}),
              engagement_time_msec: 1,
            },
          },
        ],
      }),
    }
  );
  return res.ok;
}
