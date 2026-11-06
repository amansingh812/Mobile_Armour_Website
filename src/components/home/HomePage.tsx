import Image from 'next/image';
import Link from 'next/link';
import JsonLd, { faqPage } from '@/components/seo/JsonLd';
import { FaqList } from '@/components/site/PageBits';
import ProductTile from '@/components/store/ProductTile';
import PromiseStrip from '@/components/store/PromiseStrip';
import GoogleReviews from './GoogleReviews';
import { getAllProducts } from '@/lib/shop-data';
import { getPhoneHubs } from '@/lib/phones';
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
import HomeSplash from '@/components/site/loader/HomeSplash';
import '@/components/refurb/refurb.css';

const REPAIRS: { icon: IconName; name: string; href: string; time: string }[] = [
  { icon: 'screen', name: 'Screen replacement', href: '/services/iphone-screen-repair', time: '1–2 hours' },
  { icon: 'battery', name: 'Battery replacement', href: '/services/iphone-battery-replacement', time: '1–2 hours' },
  { icon: 'bolt', name: 'Charging port repair', href: '/services/charging-port-repair', time: '1–2 hours' },
  { icon: 'phone-back', name: 'Back glass replacement', href: '/services/back-glass-replacement', time: '24–48 hours' },
  { icon: 'droplet', name: 'Water damage repair', href: '/services/water-damage-repair', time: '24–48 hours' },
  { icon: 'watch', name: 'Apple Watch repair', href: '/services/apple-watch-repair', time: 'same day' },
];

export default async function HomePage() {
  const [all, hubs] = await Promise.all([getAllProducts(), getPhoneHubs()]);
  const onSale = all.filter((p) => typeof p.oldPrice === 'number' && p.oldPrice > currentPrice(p)).slice(0, 5);
  // Every category, stocked or not: new ranges fill up as products are imported.
  const cats = SHOP_CATEGORIES.map((c) => ({
    ...c,
    image: CATEGORY_IMAGES.find((x) => x.link === `/shop/${c.slug}`)?.image,
  }));
  // Feature phone: the iPhone Duo (first foldable iPhone stock), shown once we have products for it.
  const FEATURE = 'iPhone Duo';
  const featureHub = hubs.find((h) => h.device === FEATURE);
  const featureItems = featureHub ? featureHub.products : [];
  const featureCases = featureItems.filter((p) => p.category === 'Cases');
  const featureFrom = featureCases.length ? Math.min(...featureCases.map((p) => currentPrice(p))) : null;
  const featureOrderIn = featureCases.length > 0 && featureCases.every((p) => p.fulfilment === 'order-in');
  // Three Duo cases on the home page, one of each style: wallet, rugged, clear
  // (the first two are the most viewed Duo cases in Analytics). Falls back to
  // other available Duo cases if any of these goes out of stock or is removed.
  const DUO_PICKS = ['6adda99b617dbb3ce80cc0f5', '6adda9d49c5b435d55b7cf5b', '6adda9f8087744a1fc264b48'];
  const duoAvailable = (p: (typeof featureCases)[number]) =>
    p.variants?.length ? p.variants.some((v) => v.available) : !(typeof p.stock === 'number' && p.stock <= 0);
  const duoCases = [
    ...DUO_PICKS.map((id) => featureCases.find((p) => p._id === id)).filter((p): p is (typeof featureCases)[number] => !!p && duoAvailable(p)),
    ...featureCases.filter((p) => !DUO_PICKS.includes(p._id) && duoAvailable(p)),
  ].slice(0, 3);
  // iPhone 18 Pro / Pro Max range: cases first, then glass and the rest.
  const IPHONE18 = ['iPhone 18 Pro Max', 'iPhone 18 Pro'];
  const iphone18 = all
    .filter((p) => (p.deviceCompatibility || []).some((d) => IPHONE18.includes(d)))
    .filter((p) => !(typeof p.stock === 'number' && p.stock <= 0))
    .sort((a, b) => (a.category === 'Cases' ? 0 : 1) - (b.category === 'Cases' ? 0 : 1));
  const iphone18Hubs = IPHONE18.map((d) => hubs.find((h) => h.device === d)).filter(Boolean) as typeof hubs;
  const topHub = hubs[0];
  // Apple Watch straps promo (most-searched accessory after phone cases).
  const straps = all
    .filter((p) => p.category === 'Apple Watch Straps')
    .filter((p) => !(typeof p.stock === 'number' && p.stock <= 0));
  const strapColours = new Set(straps.flatMap((p) => (p.variants || []).map((v) => v.colour).filter(Boolean))).size;
  const strapFrom = straps.length ? Math.min(...straps.map((p) => currentPrice(p))) : null;
  const guides = [...blogPosts]
    .sort((a, b) => +new Date(b.modifiedDate || b.publishedDate) - +new Date(a.modifiedDate || a.publishedDate))
    .slice(0, 3);
  const faqs = faqsById(['repair-time', 'appointment', 'accessories', 'warranty-cover', 'where']);

  return (
    <main className="ma-page ma-home">
      <HomeSplash />
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
            <Link href={`/phones/${featureHub.slug}`} className="ma-duo__banner" aria-label={`Shop ${FEATURE} cases`}>
              <Image
                src="/img/home/iphone-duo-banner.webp"
                alt={`Clear magnetic case on the foldable ${FEATURE}`}
                fill
                sizes="(max-width: 1320px) 100vw, 1272px"
              />
            </Link>
            <div className="ma-duo__bar">
              <div>
                <h2 id="duo-h">
                  {FEATURE} cases <span>{featureOrderIn ? 'now available' : 'in stock'}</span>
                </h2>
                <p>
                  Cut for the Duo&apos;s hinge and cameras
                  {featureFrom !== null ? `, from $${featureFrom % 1 === 0 ? featureFrom : featureFrom.toFixed(2)}` : ''}.
                  {featureOrderIn
                    ? ` Ordered in for you (${STORE.orderIn.readyText}): click & collect at the kiosk or delivery.`
                    : ' Try them on at the kiosk, or order online and collect.'}
                </p>
              </div>
              <div className="ma-actions">
                <Link href={`/phones/${featureHub.slug}`} className="ma-btn ma-btn--primary">
                  Shop {FEATURE}
                </Link>
                <Link href="/contact" className="ma-btn ma-btn--ghost">
                  Ask about stock
                </Link>
              </div>
            </div>
          </div>
          {duoCases.length > 0 && (
            <div className="ma-pgrid ma-home__duo-cases" style={{ marginTop: 16 }}>
              {duoCases.map((p) => (
                <ProductTile key={p._id} product={p} model={FEATURE} />
              ))}
            </div>
          )}
        </section>
      )}

      {iphone18.length > 0 && (
        <section aria-labelledby="i18-h" className="ma-section">
          <div className="ma-shead">
            <div>
              <h2 id="i18-h" className="ma-h2">
                iPhone 18 Pro &amp; Pro Max
              </h2>
              <p>Cases, glass and lens protectors for the new iPhone 18 Pro and Pro Max. Pick your model on each product.</p>
            </div>
            <div className="ma-home__i18-links">
              {iphone18Hubs.map((h) => (
                <Link key={h.slug} href={`/phones/${h.slug}`} className="ma-link">
                  All {h.device.replace('iPhone ', '')} →
                </Link>
              ))}
            </div>
          </div>
          <div className="ma-pgrid">
            {iphone18.slice(0, 10).map((p, i) => (
              <ProductTile key={p._id} product={p} priority={i < 2} />
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
                  <span>Shop now →</span>
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
              <Link href="/contact?topic=repair" className="ma-btn ma-btn--primary" style={{ alignSelf: 'flex-start' }}>
                Get a repair quote
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
            straps.length > 0 && (
              <div className="ma-panel ma-panel--peach ma-home__promo">
                <div className="ma-home__promo-copy">
                  <span className="ma-eyebrow">New category</span>
                  <h2>Apple Watch straps</h2>
                  <p>
                    {straps.length} styles in {strapColours} colours, small and large sizes
                    {strapFrom ? `, from $${strapFrom}` : ''}. Silicone sport, stretchy nylon, braided and Alpine loops.
                  </p>
                  <Link href="/shop/apple-watch-straps" className="ma-btn ma-btn--dark" style={{ alignSelf: 'flex-start' }}>
                    Shop watch straps
                  </Link>
                </div>
                <Link
                  href="/shop/apple-watch-straps"
                  className="ma-home__promo-img ma-home__promo-img--photo"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Image src="/img/home/watch-straps.webp" alt="" fill sizes="(max-width: 560px) 112px, 220px" />
                </Link>
              </div>
            )
          )}
        </div>
      </section>

      <section aria-labelledby="refurb-h" className="ma-section">
        <div className="ma-refurb-banner">
          <div className="ma-refurb-banner__copy">
            <span className="ma-eyebrow" style={{ color: '#ff7a3d' }}>
              Now at our kiosk
            </span>
            <h2 id="refurb-h">Refurbished iPhones &amp; Android phones</h2>
            <p>
              iPhone 11 to iPhone 17, Samsung Galaxy and Google Pixel, to suit your budget. Ask what&apos;s in stock, or
              come in and see them.
            </p>
            <ul className="ma-refurb-banner__pts">
              <li>Fully checked</li>
              <li>Graded</li>
              <li>{BUSINESS.warranty.short}</li>
            </ul>
            <div className="ma-actions">
              <Link href="/refurbished-phones" className="ma-btn ma-btn--primary">
                See refurbished phones
              </Link>
              <Link href="/refurbished-phones#enquire" className="ma-btn ma-btn--ghost">
                Ask what&apos;s in stock
              </Link>
            </div>
          </div>
          <Link href="/refurbished-phones" className="ma-refurb-banner__img" tabIndex={-1} aria-hidden="true">
            <Image src="/img/home/refurb-banner.webp" alt="" fill sizes="(max-width: 640px) 100vw, 600px" />
          </Link>
        </div>
      </section>

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

      <section aria-labelledby="bg-h" className="ma-section">
        <div className="ma-refurb-banner">
          <div className="ma-refurb-banner__copy">
            <span className="ma-eyebrow" style={{ color: '#ff7a3d' }}>
              Back glass repair
            </span>
            <h2 id="bg-h">Cracked back glass? We replace it.</h2>
            <p>
              Rear glass replaced for every iPhone from the 8 to the 17 Pro Max, plus Samsung Galaxy and Google Pixel.
              Wireless charging and cameras tested before you collect it.
            </p>
            <ul className="ma-refurb-banner__pts">
              <li>Quote before we start</li>
              <li>Usually {BUSINESS.repairTimes.complex}</li>
              <li>{BUSINESS.warranty.short}</li>
            </ul>
            <div className="ma-actions">
              <Link href="/services/back-glass-replacement" className="ma-btn ma-btn--primary">
                Back glass replacement
              </Link>
              <Link href="/blog/cracked-iphone-back-glass-worth-fixing" className="ma-btn ma-btn--ghost">
                Is it worth fixing?
              </Link>
            </div>
          </div>
          <Link href="/services/back-glass-replacement" className="ma-refurb-banner__img" tabIndex={-1} aria-hidden="true">
            <Image src="/img/home/back-glass-banner.webp" alt="" fill sizes="(max-width: 640px) 100vw, 600px" />
          </Link>
        </div>
      </section>

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
          <Link href="/services" className="ma-link">
            All repairs →
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
