'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

/**
 * Site-wide: counts taps on call, text, WhatsApp and email links as a GA4
 * "contact_click" event (method + page), so phone and message enquiries show
 * up next to online orders. Mark contact_click as a key event in GA4.
 */
export default function ContactTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute('href') || '';
      const method = href.startsWith('tel:')
        ? 'call'
        : href.startsWith('sms:')
          ? 'text'
          : href.startsWith('mailto:')
            ? 'email'
            : /wa\.me\/|whatsapp\.com/.test(href)
              ? 'whatsapp'
              : /google\.com\/maps|maps\.app\.goo\.gl/.test(href)
                ? 'directions'
                : null;
      if (method) track('contact_click', { method, page_path: location.pathname });
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);
  return null;
}
