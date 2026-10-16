"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { FaqGroup } from "@/data/faqs";

// All questions and answers render on the server (crawlable). Search and
// topic filters only hide items on the client.
export default function FaqExplorer({ groups }: { groups: FaqGroup[] }) {
  const [topic, setTopic] = useState<string>("all");
  const [query, setQuery] = useState("");
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  const q = query.trim().toLowerCase();
  const matches = useMemo(() => {
    const m = new Set<string>();
    for (const g of groups)
      for (const f of g.items)
        if (!q || `${f.q} ${f.short} ${f.more || ""}`.toLowerCase().includes(q)) m.add(f.id);
    return m;
  }, [groups, q]);

  const visibleGroups = groups.filter(
    (g) => (topic === "all" || topic === g.id) && g.items.some((f) => matches.has(f.id))
  );

  return (
    <>
      <div className="ma-faq-tools">
        <div className="ma-faq-search">
          <label htmlFor="faq-q">Search the FAQs</label>
          <input
            id="faq-q"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. warranty, water damage, hours"
          />
        </div>
        <div className="ma-chips" role="group" aria-label="FAQ topics">
          {[{ id: "all", title: "All", n: total }, ...groups.map((g) => ({ id: g.id, title: g.title, n: g.items.length }))].map(
            (t) => (
              <button
                key={t.id}
                type="button"
                className="ma-chip"
                aria-pressed={topic === t.id}
                onClick={() => setTopic(t.id)}
              >
                {t.title} <span className="ma-chip__n">{t.n}</span>
              </button>
            )
          )}
        </div>
      </div>

      <div className="ma-faq-groups" aria-live="polite">
        {visibleGroups.length === 0 && (
          <p className="ma-faq-empty">
            No answers match &ldquo;{query}&rdquo;. Try another word, or <Link href="/contact">ask us directly</Link>.
          </p>
        )}
        {groups.map((g) => {
          const shown = visibleGroups.includes(g);
          return (
            <section key={g.id} id={g.id} aria-labelledby={`h-${g.id}`} hidden={!shown}>
              <h2 id={`h-${g.id}`} className="ma-faq-group__title">
                {g.title}
              </h2>
              <div className="ma-faqs">
                {g.items.map((f, i) => (
                  <details
                    key={f.id}
                    id={f.id}
                    className="ma-faq"
                    open={(g === groups[0] && i === 0) || (q.length > 1 && matches.has(f.id)) || undefined}
                    hidden={!matches.has(f.id)}
                  >
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
            </section>
          );
        })}
      </div>
    </>
  );
}
