import Image from "next/image";
import Link from "next/link";
import { BUSINESS, hoursSummary } from "@/data/business";
import "./site.css";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Cases", href: "/shop/cases" },
      { label: "Screen protectors", href: "/shop/screen-protectors" },
      { label: "Chargers & cables", href: "/shop/cables-adapters" },
      { label: "Protection bundle", href: "/bundle" },
      { label: "All products", href: "/products" },
    ],
  },
  {
    title: "Repairs",
    links: [
      { label: "All repair services", href: "/services" },
      { label: "iPhone screen repair", href: "/services/iphone-screen-repair" },
      { label: "Battery replacement", href: "/services/iphone-battery-replacement" },
      { label: "Repair prices", href: "/pricing" },
      { label: "Business repairs", href: "/corporate-repairs" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQs", href: "/faq" },
      { label: "Delivery & returns", href: "/delivery-returns" },
      { label: "Why buy from us", href: "/why-mobile-armour" },
      { label: "Contact us", href: "/contact" },
      { label: "Repair guides", href: "/blog" },
      { label: "About", href: "/about" },
    ],
  },
];

export default function SiteFooter() {
  const a = BUSINESS.address;
  return (
    <footer className="ma-footer">
      <div className="ma-footer__grid">
        <div className="ma-footer__brand">
          <Link href="/" className="ma-logo" aria-label="Mobile Armour home">
            <Image src="/img/logo-22.png" width={24} height={38} alt="" />
            <span className="ma-logo__text">
              Mobile <span>Armour</span>
            </span>
          </Link>
          <p>Phone repairs and accessories at {a.centre}, Heidelberg.</p>
          <address>
            {a.unit}, {a.centre}
            <br />
            {a.streetShort}, {a.suburb} {a.state} {a.postcode}
            <br />
            <a href={BUSINESS.phoneHref} className="ma-footer__phone">
              {BUSINESS.phoneDisplay}
            </a>
            <br />
            <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            <br />
            {hoursSummary()}
          </address>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title} className="ma-footer__col">
            <h2>{col.title}</h2>
            <ul>
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="ma-footer__bottom">
        <span>
          © {new Date().getFullYear()} {BUSINESS.name}. {BUSINESS.legalDescription}
        </span>
        <span className="ma-footer__social">
          <a href={BUSINESS.sameAs[0]} rel="noopener" target="_blank">
            Facebook
          </a>
          <a href={BUSINESS.sameAs[1]} rel="noopener" target="_blank">
            Instagram
          </a>
          <a href={BUSINESS.sameAs[2]} rel="noopener" target="_blank">
            TikTok
          </a>
        </span>
      </div>
    </footer>
  );
}
