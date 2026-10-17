import Link from "next/link";
import { storePromises } from "@/data/store-settings";

/** Dark strip of shop promises (fit guarantee, free fitting, collect, returns, repairs). */
export default function PromiseStrip({ compact }: { compact?: boolean }) {
  const items = storePromises();
  return (
    <section aria-label="Why shop with Mobile Armour" className={`ma-pstrip${compact ? " ma-pstrip--compact" : ""}`}>
      <ul>
        {items.map((p) => (
          <li key={p.title}>
            <Link href={p.href}>
              <span className="ma-pstrip__icon" aria-hidden="true">
                {p.icon}
              </span>
              <span>
                <strong>{p.title}</strong>
                <span>{p.sub}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
