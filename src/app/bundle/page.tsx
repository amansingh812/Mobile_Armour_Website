import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd, { faqPage } from '@/components/seo/JsonLd';
import { Breadcrumbs, FaqList, QuickAnswer } from '@/components/site/PageBits';
import BundleBuilder from './BundleBuilder';
import { getAllProducts } from '@/lib/shop-data';
import { STORE } from '@/data/store-settings';
import { BUSINESS } from '@/data/business';
import '@/components/site/page.css';
import '@/components/store/store.css';
import './bundle.css';

export const revalidate = 3600;

const pct = STORE.bundle.discountPercent;
const TITLE = `Phone Protection Bundle: Case + Screen Protector, Save ${pct}% | Mobile Armour`;
const DESCRIPTION = `Pick a case and a screen protector for your phone and save ${pct}% on both${
  STORE.freeFitting ? ', with the glass fitted free' : ''
} at Mobile Armour, Warringal Shopping Centre, Heidelberg.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/bundle' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/bundle', siteName: BUSINESS.name, locale: 'en_AU', type: 'website' },
};

export default async function BundlePage() {
  // Bundle switched off in store-settings: the page doesn't exist until it's back on.
  if (!STORE.bundle.enabled) notFound();
  const all = await getAllProducts();
  const cases = all.filter((p) => p.category === 'Cases');
  const protectors = all.filter((p) => p.category === 'Screen Protectors');
  const extras = all.filter((p) => p.category === 'Cables & Adapters').slice(0, 4);

  // Phones that have at least one case AND one screen protector.
  const count = new Map<string, number>();
  for (const c of cases)
    for (const d of c.deviceCompatibility || [])
      if (protectors.some((p) => (p.deviceCompatibility || []).includes(d))) count.set(d, (count.get(d) || 0) + 1);
  const devices = Array.from(count.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([d]) => d);

  const faqs = [
    {
      id: 'what',
      q: 'What is in the protection bundle?',
      short: `One case and one screen protector for the same phone, with ${pct}% off both.`,
      more: STORE.freeFitting ? 'We also fit the glass for you at the kiosk, free.' : undefined,
    },
    {
      id: 'how',
      q: 'How do I get the bundle discount?',
      short: 'It applies automatically in your cart.',
      more: 'Add a case and a screen protector that fit the same phone, here or from any product page, and the saving shows in the cart.',
    },
    ...(STORE.freeFitting
      ? [
          {
            id: 'fit',
            q: 'Do you fit the screen protector?',
            short: 'Yes, free, at our kiosk in Warringal Shopping Centre.',
            more: 'Choose click & collect and bring your phone, or walk in any time with your receipt.',
          },
        ]
      : []),
  ];

  return (
    <main className="ma-page">
      <JsonLd data={faqPage(faqs.map((f) => ({ q: f.q, a: f.more ? `${f.short} ${f.more}` : f.short })))} />
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Shop', path: '/products' }, { name: 'Protection bundle', path: '/bundle' }]} />

      <section className="ma-wrap" style={{ paddingTop: 18 }}>
        <div className="ma-bundle__hero">
          <h1 className="ma-h1">Build your phone protection bundle</h1>
          <QuickAnswer>
            Choose a case and a screen protector for the same phone and save <strong>{pct}% on both</strong>
            {STORE.freeFitting ? ', with the glass fitted free at our Warringal kiosk' : ''}. Collect today in Heidelberg or
            get it delivered.
          </QuickAnswer>
        </div>
      </section>

      <section className="ma-wrap" style={{ paddingTop: 28 }}>
        <BundleBuilder devices={devices} cases={cases} protectors={protectors} extras={extras} />
      </section>

      <section aria-labelledby="bfaq" className="ma-section">
        <div className="ma-faq-split">
          <h2 id="bfaq" className="ma-h2">
            Bundle questions
          </h2>
          <FaqList faqs={faqs} />
        </div>
      </section>
    </main>
  );
}
