import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/site/PageBits';
import { getPhoneHubs, hubSummary } from '@/lib/phones';
import { BUSINESS } from '@/data/business';
import '@/components/site/page.css';
import '@/components/store/store.css';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Shop by Phone: Cases, Glass & Chargers | Mobile Armour',
  description:
    'Pick your phone and see every case, screen protector and charger that fits it, plus repairs. Mobile Armour, Warringal Shopping Centre, Heidelberg.',
  alternates: { canonical: '/phones' },
};

export default async function PhonesPage() {
  const hubs = await getPhoneHubs();
  return (
    <main className="ma-page">
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Phones', path: '/phones' }]} />
      <section className="ma-wrap" style={{ paddingTop: 18 }}>
        <h1 className="ma-h1">Shop by your phone</h1>
        <p className="ma-lead" style={{ marginTop: 12 }}>
          Everything that fits, in one place: cases, glass, chargers and repairs. Can&apos;t see your phone? Call{' '}
          {BUSINESS.phoneDisplay} or visit the kiosk; we stock more in store.
        </p>
        <div className="ma-phones">
          {hubs.map((h) => (
            <Link key={h.slug} href={`/phones/${h.slug}`} className="ma-phone">
              <strong>{h.device}</strong>
              <span>{hubSummary(h.products)}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
