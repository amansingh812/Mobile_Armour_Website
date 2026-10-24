import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { faqPage } from '@/components/seo/JsonLd';
import { Breadcrumbs, FaqList, QuickAnswer } from '@/components/site/PageBits';
import { BUSINESS, hoursShort } from '@/data/business';
import { STORE } from '@/data/store-settings';
import type { Faq } from '@/data/faqs';
import { OG_IMAGE } from '@/lib/seo';
import '@/components/site/page.css';

const PATH = '/warranty';
const TITLE = 'Repair Warranty: 6 Months on Parts & Labour | Mobile Armour';
const DESCRIPTION =
  'Every Mobile Armour repair has a 6-month warranty on parts and labour, including all three screen options. What it covers, what it doesn’t, and how to claim.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { images: [OG_IMAGE], title: TITLE, description: DESCRIPTION, url: PATH, siteName: BUSINESS.name, locale: 'en_AU', type: 'website' },
};

const FAQS: Faq[] = [
  {
    id: 'length',
    q: 'How long is the warranty on a phone repair?',
    short: `Six months from the repair date, on the parts we fitted and our work.`,
    more: 'It applies to every repair: screens, batteries, charging ports, back glass and the rest.',
  },
  {
    id: 'screens',
    q: 'Do all screen options get the same warranty?',
    short: 'Yes. Standard LCD, aftermarket OLED and original screens all carry the 6-month warranty.',
    more: 'The options differ in picture quality and price, not in cover. We explain each before we start.',
  },
  {
    id: 'not-covered',
    q: 'What does the repair warranty not cover?',
    short: 'New physical or liquid damage after the repair, and faults in parts we didn’t replace.',
    more: 'A phone that came in with heavy damage can have other hidden faults, such as a cut cable; we point these out when we can.',
  },
  {
    id: 'claim',
    q: 'How do I make a warranty claim?',
    short: `Bring the phone and your receipt to ${BUSINESS.address.unit}, ${BUSINESS.address.centre}, Heidelberg.`,
    more: `We inspect it on the spot and fix or replace the part if it’s covered. Open 7 days, ${hoursShort()}.`,
  },
  {
    id: 'accessories',
    q: 'What about accessories?',
    short: STORE.fitGuarantee
      ? 'If a case or screen protector doesn’t fit your phone, bring it back unused and we swap it the same day.'
      : 'Faulty accessories are handled under the Australian Consumer Law.',
    more: 'We don’t offer change-of-mind refunds. Faulty items are covered by the Australian Consumer Law.',
  },
];

export default function WarrantyPage() {
  return (
    <main className="ma-page">
      <JsonLd data={faqPage(FAQS.map((f) => ({ q: f.q, a: f.more ? `${f.short} ${f.more}` : f.short })))} />
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Repairs', path: '/services' }, { name: 'Warranty', path: PATH }]} />

      <section className="ma-wrap" style={{ paddingTop: 18 }}>
        <h1 className="ma-h1">Repair warranty</h1>
        <QuickAnswer>
          Every repair at Mobile Armour comes with a <strong>{BUSINESS.warranty.long}</strong>, whichever screen or part
          you choose. If the part we fitted fails, bring the phone back and we fix it free. New drops or water damage
          aren&apos;t covered.
        </QuickAnswer>
      </section>

      <section aria-labelledby="cover" className="ma-section">
        <h2 id="cover" className="ma-h2">
          What&apos;s covered and what isn&apos;t
        </h2>
        <div className="ma-table-wrap" style={{ marginTop: 18 }}>
          <table className="ma-table">
            <thead>
              <tr>
                <th scope="col">Covered for 6 months</th>
                <th scope="col">Not covered</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A replacement screen that stops responding, flickers or shows lines</td>
                <td>A screen cracked by a new drop</td>
              </tr>
              <tr>
                <td>A replacement battery that fails or won&apos;t hold charge</td>
                <td>Liquid damage after the repair</td>
              </tr>
              <tr>
                <td>A charging port, camera or back glass part we fitted that develops a fault</td>
                <td>Faults in parts we didn&apos;t replace</td>
              </tr>
              <tr>
                <td>Our workmanship: loose fittings, seals or connections</td>
                <td>Problems caused by damage the phone already had</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="claim" className="ma-section">
        <h2 id="claim" className="ma-h2">
          How to claim
        </h2>
        <ol className="ma-steps" style={{ marginTop: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <li>
            <span className="ma-steps__n" aria-hidden="true">
              1
            </span>
            <h3>Bring it in</h3>
            <p>
              Come to {BUSINESS.address.unit}, {BUSINESS.address.centre} with the phone and your receipt. No appointment
              needed.
            </p>
          </li>
          <li>
            <span className="ma-steps__n" aria-hidden="true">
              2
            </span>
            <h3>We check it</h3>
            <p>We test the part we fitted and look for any new damage.</p>
          </li>
          <li>
            <span className="ma-steps__n" aria-hidden="true">
              3
            </span>
            <h3>Fixed free</h3>
            <p>If it&apos;s covered, we repair or replace the part at no cost.</p>
          </li>
        </ol>
        <p className="ma-lead" style={{ marginTop: 18 }}>
          Every phone is tested before we hand it back. Notice anything wrong afterwards? Come back straight away, or call{' '}
          <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>. Your rights under the Australian Consumer Law are not
          affected by this warranty.
        </p>
      </section>

      <section aria-labelledby="wfaq" className="ma-section">
        <div className="ma-faq-split">
          <div>
            <h2 id="wfaq" className="ma-h2">
              Warranty questions
            </h2>
            <Link href="/delivery-returns" className="ma-link">
              Delivery &amp; returns →
            </Link>
          </div>
          <FaqList faqs={FAQS} />
        </div>
      </section>
    </main>
  );
}
