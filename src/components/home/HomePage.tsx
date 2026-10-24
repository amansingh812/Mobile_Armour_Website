import Image from 'next/image';
import Link from 'next/link';
import JsonLd, { faqPage } from '@/components/seo/JsonLd';
import { FaqList } from '@/components/site/PageBits';
import ProductTile from '@/components/store/ProductTile';
import PromiseStrip from '@/components/store/PromiseStrip';
import { getAllProducts } from '@/lib/shop-data';
import { getPhoneHubs, hubSummary } from '@/lib/phones';
import { currentPrice } from '@/lib/products';
import { SHOP_CATEGORIES } from '@/data/shop-categories';
import { categories as CATEGORY_IMAGES } from '@/data/categories';
import { BUSINESS, fullAddress, hoursShort, hoursSummary } from '@/data/business';
import { STORE } from '@/data/store-settings';
import { faqAnswerText, faqsById } from '@/data/faqs';
import '@/components/site/page.css';
import '@/components/store/store.css';
import './home.css';

const REPAIRS = [
  { icon: '▣', name: 'Screen replacement', href: '/services/iphone-screen-repair', time: '1–2 hours' },
  { icon: '▮', name: 'Battery replacement', href: '/services/iphone-battery-replacement', time: '1–2 hours' },
  { icon: 'ϟ', name: 'Charging port repair', href: '/services/charging-port-repair', time: '1–2 hours' },
  { icon: '◧', name: 'Back glass replacement', href: '/services/back-glass-replacement', time: 'Same day' },
  { icon: '≈', name: 'Water damage repair', href: '/services/water-damage-repair', time: '24–48 hours' },
  { icon: '◷', name: 'Apple Watch repair', href: '/services/apple-watch-repair', time: 'Same day' },
];

export default async function HomePage() {
  const [all, hubs] = await Promise.all([getAllProducts(), getPhoneHubs()]);
  const newest = all.filter((p) => !(typeof p.stock === 'number' && p.stock <= 0)).slice(0, 10);
  const onSale = all.filter((p) => typeof p.oldPrice === 'number' && p.oldPrice > currentPrice(p)).slice(0, 5);
  const cats = SHOP_CATEGORIES.map((c) => ({
    ...c,
    count: all.filter((p) => p.category === c.dbCategory).length,
    image: CATEGORY_IMAGES.find((x) => x.link === `/shop/${c.slug}`)?.image,
  })).filter((c) => c.count > 0);
  const topHub = hubs[0];
  const faqs = faqsById(['repair-time', 'appointment', 'accessories', 'warranty-cover', 'where']);

  return (
    <main className="ma-page ma-home">
      <JsonLd data={faqPage(faqs.map((f) => ({ q: f.q, a: faqAnswerText(f) })))} />

      <section className="ma-home__hero">
        <Image
          src="/img/hero/home-hero-iphone18.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="ma-home__hero-bg"
        />
        <div className="ma-home__hero-inner">
          <p className="ma-home__kicker">Your devices. Our armour.</p>
          <h1>
            Phone repairs &amp; accessories <span>in Heidelberg.</span>
          </h1>
          <p className="ma-home__lead">
            Cracked screen, tired battery, or a new phone to protect. Walk in at {BUSINESS.address.centre}: most repairs
            are done in {BUSINESS.repairTimes.common} with a {BUSINESS.warranty.short}, and cases and glass are ready to
            take home today.
          </p>
          <div className="ma-actions">
            <Link href="/contact?topic=repair" className="ma-btn ma-btn--primary">
              Book a repair →
            </Link>
            <Link href="/products" className="ma-btn ma-btn--ghost">
              Shop accessories
            </Link>
          </div>
          <ul className="ma-home__trust">
            <li>
              <strong>Same day</strong>
              <span>most repairs</span>
            </li>
            <li>
              <strong>{BUSINESS.warranty.short.replace(' warranty', '')}</strong>
              <span>repair warranty</span>
            </li>
            <li>
              <strong>7 days</strong>
              <span>{hoursShort()}</span>
            </li>
            {STORE.googleRating && (
              <li>
                <strong>★ {STORE.googleRating.rating}</strong>
                <span>{STORE.googleRating.count} Google reviews</span>
              </li>
            )}
          </ul>
        </div>
      </section>

      <PromiseStrip />

      {hubs.length > 0 && (
        <section aria-labelledby="phones-h" className="ma-section">
          <div className="ma-shead">
            <div>
              <h2 id="phones-h" className="ma-h2">
                Shop by your phone
              </h2>
              <p>Everything that fits, in one place: cases, glass, chargers and repairs.</p>
            </div>
            <Link href="/phones" className="ma-link">
              All phones →
            </Link>
          </div>
          <div className="ma-phones">
            {hubs.slice(0, 8).map((h) => (
              <Link key={h.slug} href={`/phones/${h.slug}`} className="ma-phone">
                <strong>{h.device}</strong>
                <span>{hubSummary(h.products)}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {cats.length > 0 && (
        <section aria-labelledby="cat-h" className="ma-section">
          <div className="ma-shead">
            <h2 id="cat-h" className="ma-h2">
              Shop by category
            </h2>
            <Link href="/products" className="ma-link">
              All accessories →
            </Link>
          </div>
          <div className="ma-cats">
            {cats.map((c) => (
              <Link key={c.slug} href={`/shop/${c.slug}`} className="ma-cat">
                <span className="ma-cat__img">
                  {c.image && <Image src={c.image} alt="" fill sizes="(max-width: 760px) 50vw, 240px" />}
                </span>
                <span className="ma-cat__body">
                  <strong>{c.name}</strong>
                  <span>{c.count} in stock</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="ma-section">
        <div className="ma-grid ma-grid--2">
          <div className="ma-panel ma-panel--dark ma-home__promo">
            <span className="ma-eyebrow" style={{ color: '#ff7a3d' }}>
              Repairs
            </span>
            <h2>Cracked screen? Fixed today.</h2>
            <p>
              Screens, batteries, charging ports and back glass for iPhone, Samsung, Pixel and iPad. Price confirmed before
              we start.
            </p>
            <Link href="/services" className="ma-btn ma-btn--primary" style={{ alignSelf: 'flex-start' }}>
              See repairs
            </Link>
          </div>
          {STORE.bundle.enabled ? (
            <div className="ma-panel ma-panel--peach ma-home__promo">
              <span className="ma-eyebrow">{STORE.bundle.label}</span>
              <h2>
                Case + glass{STORE.freeFitting ? ' + fitting' : ''}. Save {STORE.bundle.discountPercent}%.
              </h2>
              <p>
                Pick a case and a screen protector for your phone
                {STORE.freeFitting ? '; we fit the glass for you at the kiosk' : ''}.
              </p>
              <Link
                href={topHub ? `/bundle?device=${encodeURIComponent(topHub.device)}` : '/bundle'}
                className="ma-btn ma-btn--dark"
                style={{ alignSelf: 'flex-start' }}
              >
                Build your bundle
              </Link>
            </div>
          ) : (
            topHub && (
              <div className="ma-panel ma-panel--peach ma-home__promo">
                <span className="ma-eyebrow">New in</span>
                <h2>{topHub.device} accessories</h2>
                <p>{hubSummary(topHub.products)} in stock. Try them on at the kiosk.</p>
                <Link href={`/phones/${topHub.slug}`} className="ma-btn ma-btn--dark" style={{ alignSelf: 'flex-start' }}>
                  Shop {topHub.device}
                </Link>
              </div>
            )
          )}
        </div>
      </section>

      {newest.length > 0 && (
        <section aria-labelledby="new-h" className="ma-section">
          <div className="ma-shead">
            <h2 id="new-h" className="ma-h2">
              New in
            </h2>
            <Link href="/products" className="ma-link">
              View all →
            </Link>
          </div>
          <div className="ma-pgrid ma-pgrid--rail">
            {newest.map((p) => (
              <ProductTile key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}

      {onSale.length > 0 && (
        <section aria-labelledby="sale-h" className="ma-section">
          <div className="ma-shead">
            <h2 id="sale-h" className="ma-h2">
              On sale
            </h2>
          </div>
          <div className="ma-pgrid ma-pgrid--rail">
            {onSale.map((p) => (
              <ProductTile key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="rep-h" className="ma-section">
        <div className="ma-shead">
          <div>
            <h2 id="rep-h" className="ma-h2">
              Repairs while you shop
            </h2>
            <p>
              iPhone, Samsung, Google Pixel, iPad and Apple Watch. Upfront quote, {BUSINESS.warranty.short}.
            </p>
          </div>
          <Link href="/pricing" className="ma-link">
            Repair prices →
          </Link>
        </div>
        <ul className="ma-home__repairs">
          {REPAIRS.map((r) => (
            <li key={r.href}>
              <Link href={r.href}>
                <span className="ma-card__icon" aria-hidden="true">
                  {r.icon}
                </span>
                <span>
                  <strong>{r.name}</strong>
                  <span>Typically {r.time}</span>
                </span>
                <span aria-hidden="true" className="ma-home__chev">
                  ›
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how-h" className="ma-section">
        <h2 id="how-h" className="ma-h2" style={{ marginBottom: 18 }}>
          How it works
        </h2>
        <ol className="ma-steps" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          <li>
            <span className="ma-steps__n">1</span>
            <h3>Walk in or order online</h3>
            <p>Come to {BUSINESS.address.unit} at Warringal, or shop online and choose click &amp; collect or delivery.</p>
          </li>
          <li>
            <span className="ma-steps__n">2</span>
            <h3>We check it fits</h3>
            <p>We test your phone, confirm the price for any repair, and make sure accessories fit your exact model.</p>
          </li>
          <li>
            <span className="ma-steps__n">3</span>
            <h3>Shop while you wait</h3>
            <p>Most repairs take {BUSINESS.repairTimes.common}{STORE.freeFitting ? '; screen protectors are fitted on the spot' : ''}.</p>
          </li>
        </ol>
      </section>

      <section aria-labelledby="visit-h" className="ma-section">
        <div className="ma-home__visit">
          <div>
            <h2 id="visit-h" className="ma-h2" style={{ color: '#fff' }}>
              Visit the kiosk
            </h2>
            <p className="ma-home__addr">{fullAddress}</p>
            <p>
              {hoursSummary()} · <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>
            </p>
            {STORE.googleRating && (
              <p>
                ★ {STORE.googleRating.rating} from {STORE.googleRating.count} Google reviews
              </p>
            )}
            <div className="ma-actions">
              <a href={BUSINESS.mapsUrl} className="ma-btn ma-btn--primary" target="_blank" rel="noopener">
                Get directions
              </a>
              <a
                href={STORE.googleRating?.url || STORE.googleReviewsUrl}
                className="ma-btn ma-btn--ghost"
                target="_blank"
                rel="noopener"
              >
                Read Google reviews
              </a>
            </div>
          </div>
          <div className="ma-home__map">
            <iframe
              title={`Map showing ${BUSINESS.name} at ${BUSINESS.address.centre}`}
              src={BUSINESS.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-h" className="ma-section">
        <div className="ma-faq-split">
          <div>
            <h2 id="faq-h" className="ma-h2">
              Questions
            </h2>
            <Link href="/faq" className="ma-link">
              All FAQs →
            </Link>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>
    </main>
  );
}
