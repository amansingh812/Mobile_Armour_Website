import Image from 'next/image';
import Link from 'next/link';
import JsonLd, { faqPage } from '@/components/seo/JsonLd';
import { FaqList } from '@/components/site/PageBits';
import ProductTile from '@/components/store/ProductTile';
import PromiseStrip from '@/components/store/PromiseStrip';
import GoogleReviews from './GoogleReviews';
import { getAllProducts } from '@/lib/shop-data';
import { getPhoneHubs, hubSummary } from '@/lib/phones';
import { currentPrice, productPath, slugify } from '@/lib/products';
import { SHOP_CATEGORIES } from '@/data/shop-categories';
import { categories as CATEGORY_IMAGES } from '@/data/categories';
import { BUSINESS, SERVICE_AREAS, fullAddress, hoursShort, hoursSummary } from '@/data/business';
import { blogPosts } from '@/data/blog-posts';
import { STORE } from '@/data/store-settings';
import { faqAnswerText, faqsById } from '@/data/faqs';
import '@/components/site/page.css';
import '@/components/store/store.css';
import '@/app/blog/blog.css';
import './home.css';
import Icon, { type IconName } from '@/components/site/Icon';

const REPAIRS: { icon: IconName; name: string; href: string; time: string }[] = [
  { icon: 'screen', name: 'Screen replacement', href: '/services/iphone-screen-repair', time: '1–2 hours' },
  { icon: 'battery', name: 'Battery replacement', href: '/services/iphone-battery-replacement', time: '1–2 hours' },
  { icon: 'bolt', name: 'Charging port repair', href: '/services/charging-port-repair', time: '1–2 hours' },
  { icon: 'phone-back', name: 'Back glass replacement', href: '/services/back-glass-replacement', time: 'same day' },
  { icon: 'droplet', name: 'Water damage repair', href: '/services/water-damage-repair', time: '24–48 hours' },
  { icon: 'watch', name: 'Apple Watch repair', href: '/services/apple-watch-repair', time: 'same day' },
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
  // Feature phone: the iPhone Duo (first foldable iPhone stock), shown once we have products for it.
  const FEATURE = 'iPhone Duo';
  const featureHub = hubs.find((h) => h.device === FEATURE);
  const featureItems = featureHub ? featureHub.products : [];
  const featureFrom = featureItems.length ? Math.min(...featureItems.map((p) => currentPrice(p))) : null;
  const featureCats = new Set(featureItems.map((p) => p.category));
  const topHub = hubs[0];
  const topCases = topHub ? topHub.products.filter((p) => p.category === 'Cases') : [];
  const guides = [...blogPosts]
    .sort((a, b) => +new Date(b.modifiedDate || b.publishedDate) - +new Date(a.modifiedDate || a.publishedDate))
    .slice(0, 3);
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
          <p className="ma-home__kicker">Cases · Glass · Chargers · Repairs</p>
          <h1>
            Your new phone deserves <span>Mobile Armour.</span>
          </h1>
          <p className="ma-home__lead">
            Cases, tempered glass and fast chargers for the latest iPhone, Samsung and Pixel, ready to take home today.
            And if it ever cracks, most repairs are done in {BUSINESS.repairTimes.common} at {BUSINESS.address.centre},
            with a {BUSINESS.warranty.short}.
          </p>
          <div className="ma-actions">
            <Link href="/products" className="ma-btn ma-btn--primary">
              Shop accessories →
            </Link>
            <Link href="/contact?topic=repair" className="ma-btn ma-btn--ghost">
              Book a repair
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
                <strong>★ {STORE.googleRating.rating.toFixed(1)}</strong>
                <span>{STORE.googleRating.count} Google reviews</span>
              </li>
            )}
          </ul>
        </div>
      </section>

      <PromiseStrip />

      {featureHub && (
        <section aria-labelledby="duo-h" className="ma-section">
          <div className="ma-duo">
            <div className="ma-duo__copy">
              <span className="ma-duo__eyebrow">New in · {FEATURE}</span>
              <h2 id="duo-h">Made for the foldable {FEATURE}</h2>
              <p>
                {featureItems.length === 1
                  ? `A ${featureCats.has('Cases') ? 'case' : 'accessory'} cut`
                  : `${featureItems.length} ${featureCats.has('Cases') ? 'cases and accessories' : 'accessories'} cut`}{' '}
                for the Duo&apos;s hinge and cameras
                {featureFrom !== null ? `, from $${featureFrom % 1 === 0 ? featureFrom : featureFrom.toFixed(2)}` : ''}.
                Try them on at the kiosk, or order online and collect.
              </p>
              <div className="ma-actions">
                <Link href={`/phones/${featureHub.slug}`} className="ma-btn ma-btn--primary">
                  Shop {FEATURE}
                </Link>
                <Link href="/contact" className="ma-btn ma-btn--ghost">
                  Ask about stock
                </Link>
              </div>
            </div>
            <ul className="ma-duo__shots" aria-label={`${FEATURE} products`}>
              {featureItems.slice(0, 3).map((p, i) => (
                <li key={p._id} className={i === 0 ? 'is-main' : undefined}>
                  <Link href={p.variants ? `${productPath(p)}?model=${slugify(FEATURE)}` : productPath(p)} aria-label={p.name}>
                    {p.imageUrl && <Image src={p.imageUrl} alt="" fill sizes="(max-width: 900px) 45vw, 300px" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

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
            <div className="ma-home__promo-copy">
              <span className="ma-eyebrow" style={{ color: '#ff7a3d' }}>
                Repairs
              </span>
              <h2>Cracked screen? Fixed today.</h2>
              <p>
                Screens, batteries, charging ports and back glass for iPhone, Samsung, Pixel and iPad. Price confirmed
                before we start.
              </p>
              <Link href="/pricing" className="ma-btn ma-btn--primary" style={{ alignSelf: 'flex-start' }}>
                See repair prices
              </Link>
            </div>
            <div className="ma-home__promo-img ma-home__promo-img--photo">
              <Image
                src="/img/home/repair-hands.webp"
                alt="Technician's hands replacing a cracked phone screen"
                fill
                sizes="(max-width: 560px) 112px, 220px"
              />
            </div>
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
                <div className="ma-home__promo-copy">
                  <span className="ma-eyebrow">New in</span>
                  <h2>
                    {topHub.device} {topCases.length > 0 ? 'cases' : 'accessories'}
                  </h2>
                  <p>
                    {topCases.length > 0
                      ? `${topCases.length} ${topCases.length === 1 ? 'case' : 'cases'} in stock.`
                      : `${hubSummary(topHub.products)} in stock.`}{' '}
                    Try them on at the kiosk.
                  </p>
                  <Link
                    href={`/phones/${topHub.slug}`}
                    className="ma-btn ma-btn--dark"
                    style={{ alignSelf: 'flex-start' }}
                  >
                    {topCases.length > 0 ? 'Shop cases' : `Shop ${topHub.device}`}
                  </Link>
                </div>
                <Link
                  href={`/phones/${topHub.slug}`}
                  className="ma-home__promo-img ma-home__promo-img--photo"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Image src="/img/home/new-in-cases.webp" alt="" fill sizes="(max-width: 560px) 112px, 220px" />
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
                  <Icon name={r.icon} />
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

      {guides.length > 0 && (
        <section aria-labelledby="guides-h" className="ma-section">
          <div className="ma-shead">
            <div>
              <h2 id="guides-h" className="ma-h2">
                Repair guides
              </h2>
              <p>Straight answers from our repair bench, so you know your options before you pay.</p>
            </div>
            <Link href="/blog" className="ma-link">
              All guides →
            </Link>
          </div>
          <div className="ma-grid ma-grid--3">
            {guides.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="ma-guide">
                <span className="ma-guide__img">
                  <Image src={p.image} alt={p.imageAlt} fill sizes="(max-width: 860px) 100vw, 400px" />
                </span>
                <span className="ma-guide__body">
                  <span className="ma-guide__tag">{p.category}</span>
                  <span className="ma-guide__title">{p.title}</span>
                  <span className="ma-meta">{p.readingTime} min read</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

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

      <GoogleReviews />

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
            <div className="ma-actions">
              <a href={BUSINESS.mapsUrl} className="ma-btn ma-btn--primary" target="_blank" rel="noopener">
                Get directions
              </a>
              <a href={BUSINESS.phoneHref} className="ma-btn ma-btn--ghost">
                Call {BUSINESS.phoneDisplay}
              </a>
            </div>
            <nav aria-labelledby="areas-h" className="ma-home__areas">
              <h3 id="areas-h">Phone repair near you</h3>
              <ul>
                {SERVICE_AREAS.filter((a) => a.slug).map((a) => (
                  <li key={a.slug}>
                    <Link href={`/phone-repair/${a.slug}`}>{a.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
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
    </main>
  );
}
