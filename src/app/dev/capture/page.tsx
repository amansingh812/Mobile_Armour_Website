// DEVELOPMENT ONLY: an "inbox" tab for Crazy Parts captures.
// The Crazy Parts tab opens this page and sends each product capture with
// postMessage; this page saves it through /api/dev/capture (same origin).
// 404 in production.
import { notFound } from 'next/navigation';
import CaptureInbox from './CaptureInbox';

export const metadata = { robots: { index: false, follow: false } };

export default function DevCapturePage() {
  if (process.env.NODE_ENV !== 'development') notFound();
  return <CaptureInbox />;
}
