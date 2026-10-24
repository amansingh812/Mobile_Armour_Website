import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { BUSINESS_ID, faqPage } from "@/components/seo/JsonLd";
import { Breadcrumbs, FaqList, QuickAnswer } from "@/components/site/PageBits";
import ContactForm from "@/components/site/ContactForm";
import { HoursTable, OpenNowBadge } from "@/components/site/OpenNow";
import { BUSINESS, SERVICE_AREAS, fullAddress, hoursShort, hoursSummary } from "@/data/business";
import { faqAnswerText, faqsById } from "@/data/faqs";
import "@/components/site/page.css";
import "./contact.css";
import { OG_IMAGE } from "@/lib/seo";
import Icon, { type IconName } from "@/components/site/Icon";

const TITLE = "Contact Mobile Armour | Warringal Shopping Centre, Heidelberg";
const DESCRIPTION = `Call ${BUSINESS.phoneDisplay} or visit ${BUSINESS.address.unit}, ${BUSINESS.address.centre}, Heidelberg. ${hoursSummary()}. No appointment needed.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    images: [OG_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    url: "/contact",
    siteName: BUSINESS.name,
    locale: "en_AU",
    type: "website",
  },
};

const WAYS = [
  { icon: "call" as IconName, title: "Call", value: BUSINESS.phoneDisplay, note: "Fastest for quotes during opening hours", href: BUSINESS.phoneHref },
  { icon: "mail" as IconName, title: "Email", value: BUSINESS.email, note: "For photos, invoices and business repairs", href: `mailto:${BUSINESS.email}` },
  { icon: "pin" as IconName, title: "Walk in", value: `${BUSINESS.address.unit}, Warringal`, note: "No appointment needed", href: BUSINESS.mapsUrl },
  { icon: "quote" as IconName, title: "Repair quote", value: "Send your model", note: "We'll reply with a price and time", href: "#message" },
];

export default function ContactPage() {
  const faqs = faqsById(["appointment", "quote", "where", "hours"]);
  const contactPage = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: TITLE,
    url: `${BUSINESS.url}/contact`,
    mainEntity: { "@id": BUSINESS_ID },
  };

  return (
    <main className="ma-page">
      <JsonLd data={contactPage} />
      <JsonLd data={faqPage(faqs.map((f) => ({ q: f.q, a: faqAnswerText(f) })))} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />

      <section className="ma-hero ma-contact-hero">
        <div className="ma-hero__copy">
          <h1 className="ma-h1">Contact Mobile Armour, Heidelberg</h1>
          <QuickAnswer>
            Call <strong>{BUSINESS.phoneDisplay}</strong>, email <strong>{BUSINESS.email}</strong>, or walk in to{" "}
            <strong>{fullAddress}</strong>. We&apos;re open 7 days ({hoursShort()}) and no appointment is needed.
          </QuickAnswer>
          <div className="ma-actions">
            <a href={BUSINESS.phoneHref} className="ma-btn ma-btn--primary">
              Call {BUSINESS.phoneDisplay}
            </a>
            <a href={BUSINESS.mapsUrl} className="ma-btn ma-btn--outline" target="_blank" rel="noopener">
              Get directions
            </a>
          </div>
        </div>
        <div className="ma-panel ma-panel--dark ma-hours-card">
          <OpenNowBadge />
          <h2>Opening hours</h2>
          <HoursTable />
          <p className="ma-hours-note">Public holiday hours may differ; we post changes on our Google profile.</p>
        </div>
      </section>

      <section aria-label="Ways to reach us" className="ma-section" style={{ paddingTop: 36 }}>
        <div className="ma-grid ma-grid--4">
          {WAYS.map((w) => (
            <a key={w.title} href={w.href} className="ma-card ma-way" {...(w.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>
              <span className="ma-card__icon" aria-hidden="true">
                <Icon name={w.icon} />
              </span>
              <strong className="ma-way__title">{w.title}</strong>
              <span className="ma-way__value">{w.value}</span>
              <span className="ma-way__note">{w.note}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="ma-section ma-contact-main">
        <div id="message" className="ma-form-card">
          <ContactForm />
        </div>
        <div id="find-us" className="ma-find">
          <div className="ma-map">
            <iframe
              title={`Map showing ${BUSINESS.name} at ${BUSINESS.address.centre}, Heidelberg`}
              src={BUSINESS.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="ma-panel" style={{ background: "var(--ma-stone)", padding: 24 }}>
            <h2 style={{ fontSize: 22 }}>How do I find the kiosk?</h2>
            <address className="ma-find__addr">
              <strong>
                {BUSINESS.name}, {BUSINESS.address.unit}
              </strong>
              <br />
              {BUSINESS.address.centre}
              <br />
              {BUSINESS.address.street}, {BUSINESS.address.suburb} {BUSINESS.address.state} {BUSINESS.address.postcode}
            </address>
            <p style={{ color: "var(--ma-body)" }}>
              We&apos;re a kiosk inside {BUSINESS.address.centre}, so you can shop while your phone is repaired.
            </p>
            <a href={BUSINESS.mapsUrl} className="ma-btn ma-btn--dark" target="_blank" rel="noopener" style={{ alignSelf: "flex-start" }}>
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="cfaq" className="ma-section">
        <div className="ma-faq-split">
          <div>
            <h2 id="cfaq" className="ma-h2">
              Before you visit
            </h2>
            <Link href="/faq" className="ma-link">
              All FAQs →
            </Link>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>

      <section aria-labelledby="careas" className="ma-section">
        <h2 id="careas" className="ma-h2" style={{ fontSize: 24 }}>
          Serving Heidelberg and nearby suburbs
        </h2>
        <ul className="ma-chips" style={{ marginTop: 14 }}>
          {SERVICE_AREAS.map((a) => (
            <li key={a.name}>
              {a.slug ? (
                <Link href={`/phone-repair/${a.slug}`} className="ma-chip">
                  {a.name}
                </Link>
              ) : (
                <span className="ma-chip">{a.name}</span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
