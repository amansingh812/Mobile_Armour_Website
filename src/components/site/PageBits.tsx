import Link from "next/link";
import JsonLd, { breadcrumbList } from "@/components/seo/JsonLd";
import type { Faq } from "@/data/faqs";

/** Visible breadcrumb + matching BreadcrumbList JSON-LD. */
export function Breadcrumbs({ items }: { items: { name: string; path?: string }[] }) {
  return (
    <>
      <JsonLd data={breadcrumbList(items)} />
      <nav aria-label="Breadcrumb" className="ma-crumbs">
        <ol>
          {items.map((item, i) => (
            <li key={item.name}>
              {item.path && i < items.length - 1 ? (
                <Link href={item.path}>{item.name}</Link>
              ) : (
                <span aria-current="page">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/** "Quick answer" box: the 40–60 word answer AI engines quote. */
export function QuickAnswer({ children }: { children: React.ReactNode }) {
  return (
    <section aria-label="Quick answer" className="ma-quick">
      <p className="ma-quick__label">Quick answer</p>
      <p className="ma-quick__text">{children}</p>
    </section>
  );
}

/** Accordion of FAQs using native <details>, so every answer is in the HTML. */
export function FaqList({ faqs, openFirst = true }: { faqs: Faq[]; openFirst?: boolean }) {
  return (
    <div className="ma-faqs">
      {faqs.map((f, i) => (
        <details key={f.id} id={f.id} className="ma-faq" open={openFirst && i === 0}>
          <summary>
            <h3>{f.q}</h3>
            <span className="ma-faq__icon" aria-hidden="true">
              +
            </span>
          </summary>
          <div className="ma-faq__body">
            <p>
              <strong>{f.short}</strong>
              {f.more ? ` ${f.more}` : ""}
            </p>
            {f.link && (
              <Link href={f.link.href} className="ma-link">
                {f.link.label} →
              </Link>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
