import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { faqPage } from '@/components/seo/JsonLd';
import { Breadcrumbs, QuickAnswer } from '@/components/site/PageBits';
import { BUSINESS, fullAddress, hoursShort } from '@/data/business';
import { STORE, deliveryFeeText } from '@/data/store-settings';
import '@/components/site/page.css';
import { OG_IMAGE } from '@/lib/seo';

const TITLE = 'Delivery, Click & Collect and Returns | Mobile Armour Heidelberg';
const noReturns = STORE.returns.changeOfMindDays <= 0;
const DESCRIPTION = `Click & collect from Warringal Shopping Centre or delivery across Australia (${deliveryFeeText().toLowerCase()})${
  STORE.fitGuarantee ? ', a same-day fit guarantee' : ''
}, plus our returns policy.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/delivery-returns' },
  openGraph: { images: [OG_IMAGE], title: TITLE, description: DESCRIPTION, url: '/delivery-returns', siteName: BUSINESS.name, locale: 'en_AU', type: 'website' },
};

export default function DeliveryReturnsPage() {
  const d = STORE.delivery;
  const faqs = [
    STORE.clickAndCollect.enabled && {
      q: 'Can I collect my order in store?',
      a: `Yes. Choose click & collect at checkout and pick it up from ${fullAddress}. Orders are ${STORE.clickAndCollect.readyText}, and we text you when it's ready.`,
    },
    d.enabled && {
      q: 'How much is delivery and how long does it take?',
      a: `Delivery is ${deliveryFeeText().toLowerCase()} by ${d.carrier}, ${d.timeText}. We deliver within Australia.`,
    },
    noReturns
      ? {
          q: 'Can I return something if I change my mind?',
          a: `No, we don't offer change-of-mind returns, so please check the model before you buy.${
            STORE.fitGuarantee ? ' Bought the wrong model? Bring it back unused and we swap it the same day.' : ''
          } Faulty items are always covered under Australian Consumer Law.`,
        }
      : {
          q: 'Can I return something I bought online?',
          a: `Yes. Bring it back unused, in its packaging, within ${STORE.returns.changeOfMindDays} days with your receipt or order email${
            STORE.returns.walkIn ? '. You can return online orders at the kiosk, no posting needed' : ''
          }.`,
        },
    STORE.fitGuarantee && {
      q: "What if the case or screen protector doesn't fit my phone?",
      a: 'Bring it back to the kiosk and we swap it for the right model the same day, as long as it is unused.',
    },
    {
      q: 'What if a product is faulty?',
      a: 'Faulty products are covered by the consumer guarantees under Australian Consumer Law. Bring it in or call us and we will repair, replace or refund it.',
    },
  ].filter(Boolean) as { q: string; a: string }[];

  return (
    <main className="ma-page">
      <JsonLd data={faqPage(faqs)} />
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Delivery & returns', path: '/delivery-returns' }]} />

      <section className="ma-wrap" style={{ paddingTop: 18, maxWidth: 980 }}>
        <h1 className="ma-h1">Delivery, click & collect and returns</h1>
        <div style={{ marginTop: 18 }}>
          <QuickAnswer>
            {STORE.clickAndCollect.enabled && (
              <>
                Collect free from {BUSINESS.address.unit}, {BUSINESS.address.centre}, Heidelberg ({STORE.clickAndCollect.readyText}),
                or get it{' '}
              </>
            )}
            delivered by {d.carrier} ({deliveryFeeText().toLowerCase()}, {d.timeText}).{' '}
            {noReturns
              ? `We don't offer change-of-mind returns${STORE.fitGuarantee ? ', but a wrong model can be swapped the same day' : ''}.`
              : `Unused items can be returned within ${STORE.returns.changeOfMindDays} days${STORE.returns.walkIn ? ', straight to the kiosk' : ''}.`}
          </QuickAnswer>
        </div>
      </section>

      <div className="ma-wrap ma-policy" style={{ maxWidth: 980 }}>
        {STORE.clickAndCollect.enabled && (
          <section id="click-and-collect">
            <h2>How does click & collect work?</h2>
            <ol>
              <li>Add items to your cart and choose &ldquo;Click & collect at Warringal&rdquo;.</li>
              <li>Pay online. Your order is {STORE.clickAndCollect.readyText}.</li>
              <li>We text you when it&apos;s ready. Collect from {fullAddress}.</li>
            </ol>
            <p>
              Collection hours: {hoursShort()}. Bring your order email or the name on the order.
            </p>
          </section>
        )}

        {STORE.freeFitting && (
          <section id="fitting">
            <h2>Do you fit screen protectors?</h2>
            <p>
              Yes. When you buy a screen protector from us, we clean your screen and fit the glass bubble-free at the kiosk,
              free. Bring your phone when you collect, or walk in any time with your receipt.
            </p>
          </section>
        )}

        {d.enabled && (
          <section id="delivery">
            <h2>How much is delivery?</h2>
            <ul>
              <li>
                <strong>Cost:</strong> {deliveryFeeText()}
              </li>
              <li>
                <strong>Carrier:</strong> {d.carrier}
              </li>
              <li>
                <strong>Time:</strong> {d.timeText}
              </li>
              <li>
                <strong>Where:</strong> anywhere in Australia
              </li>
            </ul>
          </section>
        )}

        <section id="returns">
          <h2>What is your returns policy?</h2>
          {noReturns ? (
            <p>
              We don&apos;t offer refunds or returns for change of mind, so please check your phone model before you buy.
              Not sure? Call <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a> or bring your phone to the kiosk and
              we&apos;ll check it. This doesn&apos;t affect your rights if a product is faulty (see below).
            </p>
          ) : (
            <>
              <p>
                Changed your mind? Return unused items in their original packaging within{' '}
                <strong>{STORE.returns.changeOfMindDays} days</strong> of purchase with your receipt or order email for a
                refund or exchange.
                {STORE.returns.walkIn && ' Online orders can be returned at the kiosk, so there is nothing to post.'}
              </p>
              <p>Screen protectors that have been fitted can&apos;t be returned for change of mind.</p>
            </>
          )}
        </section>

        {STORE.fitGuarantee && (
          <section id="fit-guarantee">
            <h2>What is the fit guarantee?</h2>
            <p>
              Bought a case or screen protector for the wrong model? Bring it back unused and we swap it for the right one
              the same day. Not sure which model you have? Bring your phone and we&apos;ll check.
            </p>
          </section>
        )}

        <section id="faulty">
          <h2>What if something is faulty?</h2>
          <p>
            Our products come with guarantees that cannot be excluded under the Australian Consumer Law. If something is
            faulty, bring it to the kiosk or call <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a> and we&apos;ll
            repair, replace or refund it.
          </p>
        </section>

        <section id="repair-warranty">
          <h2>What warranty do repairs have?</h2>
          <p>
            Every repair comes with a {BUSINESS.warranty.long}. If the same fault comes back, we fix it free. It doesn&apos;t
            cover new drops or liquid damage. <Link href="/services#warranty">More about repairs</Link>
          </p>
        </section>

        <section className="ma-panel ma-panel--peach" style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: 22 }}>Need help with an order?</h2>
          <p>
            Call <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>, email{' '}
            <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> or visit us at {fullAddress}.
          </p>
        </section>
      </div>
    </main>
  );
}
