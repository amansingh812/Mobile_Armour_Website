import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { faqPage } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/site/PageBits";
import FaqExplorer from "@/components/site/FaqExplorer";
import { BUSINESS, fullAddress, hoursSummary } from "@/data/business";
import { ALL_FAQS, FAQ_GROUPS, faqAnswerText } from "@/data/faqs";
import "@/components/site/page.css";
import "./faq.css";
import { OG_IMAGE } from "@/lib/seo";

const TITLE = "Phone Repair FAQs: Times, Warranty, Prices | Mobile Armour";
const DESCRIPTION = `Answers on repair times (${BUSINESS.repairTimes.common} for most), our ${BUSINESS.warranty.short}, parts, prices and visiting our Warringal Shopping Centre kiosk.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/faq" },
  openGraph: {
    images: [OG_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    url: "/faq",
    siteName: BUSINESS.name,
    locale: "en_AU",
    type: "website",
  },
};

export default function FaqPage() {
  return (
    <main className="ma-page">
      <JsonLd data={faqPage(ALL_FAQS.map((f) => ({ q: f.q, a: faqAnswerText(f) })))} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "FAQs", path: "/faq" }]} />

      <section className="ma-wrap" style={{ paddingTop: 18 }}>
        <div className="ma-faq-hero">
          <h1 className="ma-h1">Phone repair and shopping FAQs</h1>
          <p className="ma-faq-hero__lead">
            Straight answers about repair times, warranty, parts, prices and visiting our Heidelberg kiosk.
          </p>
          <p className="ma-byline">
            {ALL_FAQS.length} questions · Answered by the {BUSINESS.name} repair team
          </p>
        </div>
      </section>

      <div className="ma-wrap ma-faq-layout">
        <div>
          <FaqExplorer groups={FAQ_GROUPS} />
        </div>
        <aside className="ma-faq-aside" aria-label="Contact Mobile Armour">
          <div className="ma-panel ma-panel--dark">
            <h2 style={{ fontSize: 22 }}>Still have a question?</h2>
            <p>Talk to the technician who will do the repair.</p>
            <a href={BUSINESS.phoneHref} className="ma-btn ma-btn--primary">
              Call {BUSINESS.phoneDisplay}
            </a>
            <Link href="/contact" className="ma-btn ma-btn--ghost">
              Send a message
            </Link>
          </div>
          <div className="ma-panel ma-panel--line" style={{ padding: 22, gap: 8 }}>
            <strong>{BUSINESS.address.centre}</strong>
            <span style={{ color: "var(--ma-body)", fontSize: 15 }}>{fullAddress}</span>
            <span style={{ color: "var(--ma-body)", fontSize: 15 }}>{hoursSummary()}</span>
            <a href={BUSINESS.mapsUrl} className="ma-link" target="_blank" rel="noopener">
              Get directions →
            </a>
          </div>
          <div className="ma-panel ma-panel--peach" style={{ padding: 22, gap: 8, fontSize: 15 }}>
            <strong>Popular pages</strong>
            <Link href="/services">All repair services</Link>
            <Link href="/pricing">Repair prices</Link>
            <Link href="/shop/cases">Phone cases</Link>
            <Link href="/shop/screen-protectors">Screen protectors</Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
