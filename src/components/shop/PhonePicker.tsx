'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { phoneModel, shortModel } from '@/data/phone-models';
import { slugify } from '@/lib/products';

const PHONE_KEY = 'ma-phone';

export interface PhoneLink {
  device: string;
  href: string;
  count: number;
  active?: boolean;
}

/**
 * "Shop by phone": every phone with products, grouped by series
 * (iPhone 18, iPhone 17, …). Remembers the shopper's phone across pages.
 */
export default function PhonePicker({ phones, allHref }: { phones: PhoneLink[]; allHref?: string }) {
  const [mine, setMine] = useState<string | null>(null);
  const active = phones.find((p) => p.active);

  useEffect(() => {
    try {
      if (active) localStorage.setItem(PHONE_KEY, slugify(active.device));
      setMine(localStorage.getItem(PHONE_KEY));
    } catch {}
  }, [active]);

  if (!phones.length) return null;

  const groups = new Map<string, PhoneLink[]>();
  for (const p of phones) {
    const series = phoneModel(p.device)?.series || 'Other phones';
    groups.set(series, [...(groups.get(series) || []), p]);
  }
  const minePhone = !active && mine ? phones.find((p) => slugify(p.device) === mine) : undefined;

  const remember = (device: string) => {
    try {
      localStorage.setItem(PHONE_KEY, slugify(device));
    } catch {}
  };

  return (
    <nav className="ma-wrap ma-phonepick" aria-labelledby="phones-h">
      <div className="ma-phonepick__head">
        <h2 id="phones-h">Shop by phone</h2>
        {active && allHref ? (
          <Link href={allHref} className="ma-link">
            Show all phones
          </Link>
        ) : minePhone ? (
          <Link href={minePhone.href} className="ma-phonepick__mine" onClick={() => remember(minePhone.device)}>
            Your phone: <strong>{minePhone.device}</strong> →
          </Link>
        ) : null}
      </div>
      <div className="ma-phonepick__groups">
        {Array.from(groups.entries()).map(([series, list]) => (
          <div key={series} className="ma-phonepick__group">
            <span className="ma-phonepick__series">{series}</span>
            <ul>
              {list.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className={`ma-phonepick__chip${p.active ? ' is-on' : ''}`}
                    aria-current={p.active ? 'page' : undefined}
                    onClick={() => remember(p.device)}
                  >
                    {shortModel(p.device)}
                    <span>{p.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
