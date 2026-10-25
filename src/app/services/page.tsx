import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd, { BUSINESS_ID, faqPage } from "@/components/seo/JsonLd";
import { Breadcrumbs, FaqList, QuickAnswer } from "@/components/site/PageBits";
import { BUSINESS, SERVICE_AREAS, hoursSummary } from "@/data/business";
import { faqAnswerText, faqsById } from "@/data/faqs";
import { modelRepairPages } from "@/data/model-repair-pages";
import { blogPosts } from "@/data/blog-posts";
import "@/components/site/page.css";
import Icon, { type IconName } from "@/components/site/Icon";

const TITLE = "Phone & Apple Watch Repairs Heidelberg | Same Day | Mobile Armour";
const DESCRIPTION = `iPhone, Samsung, Pixel, iPad and Apple Watch repairs at Warringal Shopping Centre, Heidelberg. Most repairs done in ${BUSINESS.repairTimes.common} with a ${BUSINESS.warranty.short}.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/services",
    siteName: BUSINESS.name,
    locale: "en_AU",
    type: "website",
    images: [{ url: "/img/services/iphone-screen-repair.webp", width: 1600, height: 1200, alt: "Technician fitting a new screen to a phone" }],
  },
};

const SERVICES: { icon: IconName; name: string; href: string; body: string; time: string }[] = [
  { icon: "screen", name: "Screen replacement", href: "/services/iphone-screen-repair", body: "Cracked glass, black or flickering display, or touch that stopped working. OLED and LCD screens.", time: "1–2 hours" },
  { icon: "battery", name: "Battery replacement", href: "/services/iphone-battery-replacement", body: "Battery drains fast, the phone shuts down early, or battery health is below 80%.", time: "1–2 hours" },
  { icon: "bolt", name: "Charging port repair", href: "/services/charging-port-repair", body: "The cable feels loose, or the phone charges slowly or not at all.", time: "1–2 hours" },
  { icon: "droplet", name: "Water damage repair", href: "/services/water-damage-repair", body: "Dropped in water, no power or a fogged camera. Bring it in fast and don't charge it.", time: "24–48 hours" },
  { icon: "phone-back", name: "Back glass replacement", href: "/services/back-glass-replacement", body: "Shattered rear glass replaced so the phone is sealed and safe to hold again.", time: "Same day" },
  { icon: "camera", name: "Camera lens repair", href: "/services/camera-lens-repair", body: "Cracked lens cover, blurry photos or a camera that won't focus.", time: "Same day" },
  { icon: "watch", name: "Apple Watch repair", href: "/services/apple-watch-repair", body: "Screen and battery replacement for Apple Watch Ultra, Series 9, 8, 7, 6 and SE.", time: "Same day" },
  { icon: "tablet", name: "iPad screen repair", href: "/services/ipad-screen-repair", body: "Cracked iPad glass or display replaced, with touch and Touch ID tested afterwards.", time: "Same day" },
];

const BRANDS = [
  { name: "iPhone", note: "Screens, batteries, ports, back glass", href: "/services/iphone-screen-repair" },
  { name: "Samsung Galaxy", note: "S, A, Note and Z series", href: "/services/samsung-repair" },
  { name: "Google Pixel", note: "Screens and batteries", href: "/services/google-pixel-repair" },
  { name: "iPad", note: "Glass, display and battery", href: "/services/ipad-screen-repair" },
  { name: "Apple Watch", note: "Ultra, Series 6–9, SE", href: "/services/apple-watch-repair" },
  { name: "MacBook & laptops", note: "Ask us about your model", href: "/services/macbook-laptop-repair" },
];

const STEPS = [
  { title: "Walk in or call", body: "Come to the kiosk, or call first so we can have your part ready." },
  { title: "Check and quote", body: "We test the phone in front of you and confirm the price and time before any work starts." },
  { title: "Repair while you shop", body: `Most screens, batteries and charging ports take ${BUSINESS.repairTimes.common}.` },
  { title: "Tested, with warranty", body: `We check touch, cameras, Face ID and charging, then hand it back with a ${BUSINESS.warranty.short}.` },
];

const FAQ_IDS = ["repair-time", "appointment", "parts", "authorised", "water-damage", "screen-cost"];

function repairTime(types: { name: string; time: string }[], word: string) {
  const t = types.find((r) => r.name.toLowerCase().includes(word));
  return t ? t.time.replace("-", "–") : "—";
}

export default function ServicesPage() {
  const faqs = faqsById(FAQ_IDS);
  const models = modelRepairPages.filter((m) => m.brand !== "ipad").slice(0, 10);
  const guides = ["screen-repair-vs-replacement", "extend-battery-life", "water-damage-first-aid"]
    .map((slug) => blogPosts.find((p) => p.slug === slug))
    .filter((p): p is (typeof blogPosts)[number] => Boolean(p));

  const serviceList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Phone and device repair services at Mobile Armour, Heidelberg",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name,
        description: s.body,
        url: `${BUSINESS.url}${s.href}`,
        serviceType: "Mobile device repair",
        areaServed: { "@type": "City", name: "Heidelberg, VIC" },
        provider: { "@id": BUSINESS_ID },
      },
    })),
  };

  return (
    <main className="ma-page">
      <JsonLd data={serviceList} />
      <JsonLd data={faqPage(faqs.map((f) => ({ q: f.q, a: faqAnswerText(f) })))} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Repairs", path: "/services" }]} />

      <section className="ma-hero">
        <div className="ma-hero__copy">
          <span className="ma-eyebrow">Repairs at Warringal Shopping Centre</span>
          <h1 className="ma-h1">Phone and Apple Watch repairs in Heidelberg</h1>
          <QuickAnswer>
            Mobile Armour repairs iPhone, Samsung, Google Pixel, iPad and Apple Watch at {BUSINESS.address.unit},{" "}
            {BUSINESS.address.centre}, Heidelberg. Screens, batteries and charging ports usually take{" "}
            <strong>{BUSINESS.repairTimes.common}</strong>, every repair has a <strong>{BUSINESS.warranty.long}</strong>,
            and you can walk in without an appointment.
          </QuickAnswer>
          <div className="ma-actions">
            <Link href="/contact?topic=repair" className="ma-btn ma-btn--primary">
              Book a repair
            </Link>
            <a href={BUSINESS.phoneHref} className="ma-btn ma-btn--outline">
              Call {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
        <div className="ma-hero__media">
          <Image
            src="/img/services/iphone-screen-repair.webp"
            alt="Technician fitting a new screen to a phone, with the cracked old screen beside it"
            fill
            sizes="(max-width: 860px) 100vw, 520px"
            priority
          />
        </div>
      </section>

      <section aria-label="Why repair with us" className="ma-promises">
        <ul>
          {[
            { icon: "clock" as IconName, title: "Same day", sub: `Most repairs in ${BUSINESS.repairTimes.common}` },
            { icon: "check" as IconName, title: BUSINESS.warranty.short, sub: "Parts and labour" },
            { icon: "tag" as IconName, title: "Price before we start", sub: "No surprises" },
            { icon: "store" as IconName, title: "Walk-ins welcome", sub: "Shop while you wait" },
          ].map((p) => (
            <li key={p.title}>
              <span className="ma-promises__icon" aria-hidden="true">
                <Icon name={p.icon} size={27} />
              </span>
              <span>
                <strong>{p.title}</strong>
                <span>{p.sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="what" className="ma-section">
        <h2 id="what" className="ma-h2">
          What do you repair?
        </h2>
        <p className="ma-lead">
          Every repair is done at the kiosk. Times are typical for common models; we confirm yours when we check the
          phone.
        </p>
        <div className="ma-grid ma-grid--4">
          {SERVICES.map((s) => (
            <Link key={s.href} href={s.href} className="ma-card">
              <span className="ma-card__icon" aria-hidden="true">
                <Icon name={s.icon} />
              </span>
              <h3>{s.name}</h3>
              <p>{s.body}</p>
              <span className="ma-tags">
                <span className="ma-tag">⏱ {s.time}</span>
                <span className="ma-tag">Free quote</span>
              </span>
              <span className="ma-card__more">{s.name} details →</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="devices" className="ma-section">
        <h2 id="devices" className="ma-h2">
          Which phones and devices do you fix?
        </h2>
        <p className="ma-lead">
          We repair current and older models from these brands. Not listed? Call {BUSINESS.phoneDisplay} and we&apos;ll
          tell you straight away.
        </p>
        <div className="ma-grid ma-grid--3">
          {BRANDS.map((b) => (
            <Link key={b.name} href={b.href} className="ma-tile">
              <strong>{b.name}</strong>
              <span>{b.note}</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="times" className="ma-section">
        <h2 id="times" className="ma-h2">
          How long does a repair take for my model?
        </h2>
        <p className="ma-lead">
          Typical repair times for popular models. Prices depend on the part you choose, so we quote each phone; tap a
          model for details.
        </p>
        <div className="ma-table-wrap">
          <table className="ma-table">
            <caption className="ma-sr">Typical repair times by model</caption>
            <thead>
              <tr>
                <th scope="col">Model</th>
                <th scope="col">Screen</th>
                <th scope="col">Battery</th>
                <th scope="col">Back glass</th>
                <th scope="col">Charging port</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m) => (
                <tr key={m.slug}>
                  <th scope="row">
                    <Link href={`/repairs/${m.slug}`}>{m.model}</Link>
                  </th>
                  <td>{repairTime(m.repairTypes, "screen")}</td>
                  <td>{repairTime(m.repairTypes, "battery")}</td>
                  <td>{repairTime(m.repairTypes, "back glass")}</td>
                  <td>{repairTime(m.repairTypes, "charging")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="ma-note">
          For screens you can choose an original part (when available) or a premium aftermarket screen. We explain the
          difference and the price before you decide. <Link href="/contact?topic=repair" className="ma-link">Ask for a quote →</Link>
        </p>
      </section>

      <section aria-labelledby="how" className="ma-section">
        <h2 id="how" className="ma-h2">
          How does a repair work?
        </h2>
        <p className="ma-lead">Four steps, usually done while you shop at Warringal.</p>
        <ol className="ma-steps">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="ma-steps__n" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="ma-section">
        <div className="ma-grid ma-grid--2">
          <div className="ma-panel ma-panel--peach">
            <h2 id="warranty">What does the warranty cover?</h2>
            <p>
              Every repair comes with a <strong>{BUSINESS.warranty.long}</strong>. If the same fault comes back, we fix
              it free.
            </p>
            <ul>
              <li>Covered: the part we fitted and our workmanship</li>
              <li>Not covered: new drops, cracks or liquid damage after the repair</li>
            </ul>
          </div>
          <div className="ma-panel ma-panel--dark">
            <h2>Is my data safe during a repair?</h2>
            <p>
              Yes. We don&apos;t open your apps, photos or messages unless you ask us to, for example for data recovery.
              We still recommend a backup before any repair.
            </p>
            <Link href="/blog/phone-maintenance-checklist" className="ma-link" style={{ color: "#ff7a3d" }}>
              Phone care checklist →
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="business" className="ma-section">
        <div className="ma-panel ma-panel--line" style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 24 }}>
          <div style={{ flex: "1 1 480px" }}>
            <h2 id="business">Repairs for businesses and schools</h2>
            <p style={{ color: "var(--ma-body)", marginTop: 8 }}>
              Staff phones repaired with priority turnaround, one point of contact and invoicing for your team.
            </p>
          </div>
          <Link href="/corporate-repairs" className="ma-btn ma-btn--dark">
            Business repairs
          </Link>
        </div>
      </section>

      <section aria-labelledby="areas" className="ma-section">
        <h2 id="areas" className="ma-h2">
          Do you serve my suburb?
        </h2>
        <p className="ma-lead">
          Customers come to Warringal Shopping Centre from across Melbourne&apos;s north and north-east.
        </p>
        <ul className="ma-chips">
          {SERVICE_AREAS.map((a) => (
            <li key={a.name}>
              {a.slug ? (
                <Link href={`/phone-repair/${a.slug}`} className="ma-chip">
                  Phone repair {a.name}
                </Link>
              ) : (
                <span className="ma-chip">Phone repair {a.name}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {guides.length > 0 && (
        <section aria-labelledby="guides" className="ma-section">
          <h2 id="guides" className="ma-h2">
            Repair guides from our technicians
          </h2>
          <p className="ma-lead">Honest answers before you pay for anything.</p>
          <div className="ma-grid ma-grid--3">
            {guides.map((g) => (
              <Link key={g.slug} href={`/blog/${g.slug}`} className="ma-guide">
                <span className="ma-guide__img">
                  <Image src={g.image} alt={g.imageAlt} fill sizes="(max-width: 860px) 100vw, 400px" />
                </span>
                <span className="ma-guide__body">
                  <span className="ma-guide__tag">{g.category}</span>
                  <span className="ma-guide__title">{g.title}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="faq" className="ma-section">
        <div className="ma-faq-split">
          <div>
            <h2 id="faq" className="ma-h2">
              Repair questions
            </h2>
            <p className="ma-lead" style={{ marginBottom: 16 }}>
              The questions we hear most at the counter.
            </p>
            <Link href="/faq" className="ma-link">
              See all FAQs →
            </Link>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>

      <section className="ma-section">
        <div className="ma-cta">
          <div>
            <h2>Cracked, slow or not charging? Bring it in today.</h2>
            <p>
              {BUSINESS.address.unit}, {BUSINESS.address.centre}, {BUSINESS.address.streetShort}, Heidelberg ·{" "}
              {hoursSummary()}
            </p>
          </div>
          <div className="ma-actions">
            <Link href="/contact?topic=repair" className="ma-btn ma-btn--primary">
              Book a repair
            </Link>
            <a href={BUSINESS.mapsUrl} className="ma-btn ma-btn--ghost" target="_blank" rel="noopener">
              Get directions
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
