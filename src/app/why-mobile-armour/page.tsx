import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd, { faqPage } from '@/components/seo/JsonLd';
import { Breadcrumbs, FaqList } from '@/components/site/PageBits';
import { BUSINESS, fullAddress, hoursSummary } from '@/data/business';
import { STORE, deliveryFeeText } from '@/data/store-settings';
import type { Faq } from '@/data/faqs';
import '@/components/site/page.css';
import '@/components/store/store.css';
import { OG_IMAGE } from '@/lib/seo';
import Icon, { type IconName } from '@/components/site/Icon';

const TITLE = 'Why Buy Phone Accessories from Mobile Armour | Heidelberg Kiosk';
const DESCRIPTION =
  'A real shop you can walk into at Warringal Shopping Centre: we check accessories fit your exact phone, and repair it if the worst happens.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/why-mobile-armour' },
  openGraph: { images: [OG_IMAGE], title: TITLE, description: DESCRIPTION, url: '/why-mobile-armour', siteName: BUSINESS.name, locale: 'en_AU', type: 'website' },
};

export default function WhyBuyPage() {
  const promises = [
    STORE.fitGuarantee && { icon: 'check', title: 'Fit guarantee', body: 'Bought the wrong model? Bring it back unused and swap it the same day.' },
    STORE.freeFitting && { icon: 'sparkle', title: 'Glass fitted free', body: 'Buy a screen protector and we fit it bubble-free at the kiosk.' },
    STORE.clickAndCollect.enabled && { icon: 'bag', title: 'Click & collect', body: `Order online and pick up at Warringal, ${STORE.clickAndCollect.readyText}.` },
    STORE.returns.walkIn && { icon: 'return', title: 'Walk-in returns', body: 'No printing labels or posting back. Talk to a person at the counter.' },
    { icon: 'wrench', title: 'Repair desk on site', body: 'If the worst happens, screens, batteries and charging ports are fixed right here.' },
  ].filter(Boolean) as { icon: IconName; title: string; body: string }[];

  const rows: [string, string, string][] = [
    ['Checks it fits your phone', 'Yes, at the counter', 'You check the listing yourself'],
    ...(STORE.freeFitting ? ([['Screen protector fitting', 'Free, done for you', 'Do it yourself']] as [string, string, string][]) : []),
    ...(STORE.clickAndCollect.enabled ? ([['When you get it', 'Collect the same day', 'Usually a few days']] as [string, string, string][]) : []),
    STORE.returns.walkIn
      ? ['Returns', 'Walk in, talk to a person', 'Online form and post it back']
      : ['Wrong model?', STORE.fitGuarantee ? 'Swap it at the counter, same day' : 'Talk to us at the counter', 'Post it back and wait'],
    ['Who you talk to', 'The technician who sold it', 'Seller messages or support chat'],
    ['If your phone breaks', 'Repair desk at the same kiosk', 'Find a repairer yourself'],
    ['Price', 'Local shop prices', 'Often lower'],
  ];

  const faqs: Faq[] = [
    {
      id: 'cheaper',
      q: 'Is Mobile Armour cheaper than buying online?',
      short: 'Not always. Big online marketplaces are often cheaper.',
      more: 'What you get here is a person who checks the fit, fits your glass, takes returns at the counter and can repair your phone, all in one place.',
    },
    {
      id: 'online',
      q: 'Can I buy online and still get the in-store service?',
      short: `Yes. Order online, choose click & collect, and we check the fit${STORE.freeFitting ? ' and fit your glass' : ''} when you pick up.`,
    },
    {
      id: 'deliver',
      q: 'Do you deliver?',
      short: `Yes, Australia-wide by ${STORE.delivery.carrier} (${deliveryFeeText().toLowerCase()}).`,
      more: STORE.returns.walkIn ? 'You can still return delivered orders at the kiosk.' : undefined,
    },
  ];

  return (
    <main className="ma-page">
      <JsonLd data={faqPage(faqs.map((f) => ({ q: f.q, a: f.more ? `${f.short} ${f.more}` : f.short })))} />
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Why buy from us', path: '/why-mobile-armour' }]} />

      <section style={{ background: 'var(--ma-night)', color: '#fff', marginTop: 18 }}>
        <div className="ma-hero" style={{ padding: '64px 24px' }}>
          <div className="ma-hero__copy">
            <span className="ma-eyebrow" style={{ color: '#ff7a3d' }}>
              Why buy from us
            </span>
            <h1 className="ma-h1" style={{ color: '#fff' }}>
              Phone accessories from a shop you can walk into.
            </h1>
            <p style={{ color: '#c9cbd1', fontSize: 18, lineHeight: 1.6 }}>
              We&apos;re a phone repair and accessories kiosk at {BUSINESS.address.centre}, Heidelberg. When you buy from
              us, there&apos;s a person behind the counter who checks it fits, fits your glass and sorts it out if anything
              goes wrong.
            </p>
            <div className="ma-actions">
              <Link href="/phones" className="ma-btn ma-btn--primary">
                Shop for my phone
              </Link>
              <a href="#visit" className="ma-btn ma-btn--ghost">
                Visit the kiosk
              </a>
            </div>
          </div>
          <div className="ma-hero__media">
            <Image
              src="/img/home/new-in-cases.webp"
              alt="Phone in a slim black protective case with a glass screen protector"
              fill
              sizes="(max-width: 860px) 100vw, 520px"
              priority
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="promises" className="ma-section">
        <h2 id="promises" className="ma-h2">
          Our promises
        </h2>
        <p className="ma-lead">We may not be the cheapest listing online. Here&apos;s what the price includes.</p>
        <div className="ma-grid" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))` }}>
          {promises.map((p) => (
            <div key={p.title} className="ma-tile" style={{ padding: 22, gap: 10 }}>
              <span className="ma-pstrip__icon" aria-hidden="true" style={{ background: 'var(--ma-ink)' }}>
                <Icon name={p.icon} size={27} />
              </span>
              <strong style={{ fontSize: 18 }}>{p.title}</strong>
              <span style={{ fontSize: 14, color: 'var(--ma-body)', lineHeight: 1.55 }}>{p.body}</span>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="compare" className="ma-section">
        <h2 id="compare" className="ma-h2">
          Buying local vs buying from an online marketplace
        </h2>
        <p className="ma-lead">A fair comparison. Online marketplaces are often cheaper; this is what&apos;s different.</p>
        <div className="ma-table-wrap">
          <table className="ma-table">
            <thead>
              <tr>
                <th scope="col">
                  <span className="ma-sr">Compare</span>
                </th>
                <th scope="col" style={{ background: 'var(--ma-orange)' }}>
                  Mobile Armour
                </th>
                <th scope="col">Typical online marketplace</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([k, us, them]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td style={{ background: '#fff8f4' }}>{us}</td>
                  <td style={{ color: 'var(--ma-body)' }}>{them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="reviews" className="ma-section">
        <div className="ma-panel ma-panel--peach" style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 20 }}>
          <div style={{ flex: '1 1 420px' }}>
            <h2 id="reviews">What do customers say?</h2>
            <p style={{ marginTop: 6 }}>
              {STORE.googleRating
                ? `Rated ${STORE.googleRating.rating.toFixed(1)} out of 5 from ${STORE.googleRating.count} Google reviews.`
                : 'Read honest reviews from Heidelberg customers on Google.'}
            </p>
          </div>
          <a
            href={STORE.googleRating?.url || STORE.googleReviewsUrl}
            className="ma-btn ma-btn--dark"
            target="_blank"
            rel="noopener"
          >
            Read our Google reviews
          </a>
        </div>
      </section>

      <section id="visit" aria-labelledby="visit-h" className="ma-section" style={{ scrollMarginTop: 140 }}>
        <div className="ma-grid ma-grid--2" style={{ alignItems: 'center', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h2 id="visit-h" className="ma-h2">
              Visit the kiosk
            </h2>
            <p style={{ fontSize: 17 }}>
              <strong>{fullAddress}</strong>
            </p>
            <p style={{ color: 'var(--ma-body)' }}>
              {hoursSummary()} · <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>
            </p>
            <div className="ma-actions">
              <a href={BUSINESS.mapsUrl} className="ma-btn ma-btn--primary" target="_blank" rel="noopener">
                Get directions
              </a>
              <Link href="/services" className="ma-btn ma-btn--outline">
                Book a repair
              </Link>
            </div>
          </div>
          <div style={{ borderRadius: 24, overflow: 'hidden', aspectRatio: '16 / 10', background: 'var(--ma-line)' }}>
            <iframe
              title={`Map showing ${BUSINESS.name} at ${BUSINESS.address.centre}`}
              src={BUSINESS.mapEmbedUrl}
              loading="lazy"
              style={{ width: '100%', height: '100%', border: 0 }}
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="wfaq" className="ma-section">
        <div className="ma-faq-split">
          <h2 id="wfaq" className="ma-h2">
            Questions
          </h2>
          <FaqList faqs={faqs} />
        </div>
      </section>
    </main>
  );
}
