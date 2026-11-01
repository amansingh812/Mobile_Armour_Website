"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { REFURB_ASK_EVENT } from "./RefurbEnquiry";

export interface FinderFamily {
  slug: string;
  brand: string;
  title: string;
  year?: string;
  summary: string;
  href?: string;
  models: { name: string; spec?: string }[];
}

const TABS = ["All", "iPhone", "Samsung", "Google Pixel"];

function ask(model: string) {
  window.dispatchEvent(new CustomEvent(REFURB_ASK_EVENT, { detail: { model } }));
}

/** Search + brand tabs over the refurbished models. Renders every model on the
 *  server (good for search engines); filtering happens in the browser. */
export default function RefurbFinder({ families }: { families: FinderFamily[] }) {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("All");

  const shown = useMemo(() => {
    const words = q.toLowerCase().replace(/galaxy|samsung|apple/g, "").split(/\s+/).filter(Boolean);
    return families
      .filter((f) => tab === "All" || f.brand === tab)
      .map((f) => {
        if (!words.length) return f;
        const hay = (m: string) => `${f.brand} ${f.title} ${m}`.toLowerCase();
        const models = f.models.filter((m) => words.every((w) => hay(m.name).includes(w)));
        return models.length ? { ...f, models } : null;
      })
      .filter(Boolean) as FinderFamily[];
  }, [families, q, tab]);

  return (
    <div className="ma-refurb-finder">
      <div className="ma-refurb-finder__bar">
        <label className="ma-refurb-finder__search">
          <span className="ma-sr">Search models</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search a model, e.g. iPhone 14 Pro or S24"
            autoComplete="off"
          />
        </label>
        <div className="ma-chips" role="tablist" aria-label="Brand">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              className={`ma-chip${tab === t ? " is-on" : ""}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <div className="ma-refurb-finder__none">
          <p>
            Not listed? We can often still get it.{" "}
            <button type="button" className="ma-link" onClick={() => ask(q)}>
              Ask us about “{q}” →
            </button>
          </p>
        </div>
      ) : (
        <div className="ma-refurb-grid">
          {shown.map((f) => (
            <article key={f.slug} id={f.slug} className="ma-refurb-card">
              <header>
                <span className="ma-eyebrow">
                  {f.brand}
                  {f.year ? ` · ${f.year}` : ""}
                </span>
                <h3>{f.href ? <Link href={f.href}>Refurbished {f.title}</Link> : `Refurbished ${f.title}`}</h3>
                <p>{f.summary}</p>
              </header>
              <ul className="ma-refurb-card__models">
                {f.models.map((m) => (
                  <li key={m.name}>
                    <button type="button" onClick={() => ask(m.name)} title={`Ask about a refurbished ${m.name}`}>
                      <strong>{m.name}</strong>
                      {m.spec && <span>{m.spec}</span>}
                    </button>
                  </li>
                ))}
              </ul>
              <footer>
                <button type="button" className="ma-btn ma-btn--primary ma-btn--sm" onClick={() => ask(f.models[0]?.name || f.title)}>
                  Ask about this model
                </button>
                {f.href && (
                  <Link href={f.href} className="ma-link">
                    Details →
                  </Link>
                )}
              </footer>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
