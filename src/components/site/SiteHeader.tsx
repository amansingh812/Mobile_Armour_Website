"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "@/hooks/useCart";
import { BUSINESS } from "@/data/business";
import { STORE } from "@/data/store-settings";
import "./site.css";
import "@/components/store/store.css";

const ADMIN_EMAIL = "dromperfectly125@gmail.com";

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Shop all", href: "/products" },
  { label: "Cases", href: "/shop/cases" },
  { label: "Screen protectors", href: "/shop/screen-protectors" },
  { label: "Chargers & cables", href: "/shop/cables-adapters" },
  STORE.bundle.enabled ? { label: "Protection bundle", href: "/bundle" } : { label: "Shop by phone", href: "/phones" },
  { label: "Repairs", href: "/services" },
  { label: "Accessories", href: "/phone-accessories-heidelberg" },
  { label: "Guides", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/products") return pathname === "/products" || pathname.startsWith("/products/");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const { getItemCount } = useCart();
  const [count, setCount] = useState(0);
  const isAdmin = session?.user?.email === ADMIN_EMAIL;

  // Cart lives in localStorage: read the count after mount so server and
  // client HTML match.
  useEffect(() => setCount(getItemCount()), [getItemCount]);
  useEffect(() => setOpen(false), [pathname]);

  // "Added to cart" toast, fired by AddToCartButton and the bundle builder.
  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const on = (e: Event) => {
      const d = (e as CustomEvent<{ name: string; count: number }>).detail;
      setToast(d.count > 1 && d.name === "bundle" ? `${d.count} items added` : `${d.name} added`);
      clearTimeout(t);
      t = setTimeout(() => setToast(null), 4000);
    };
    window.addEventListener("ma-cart-added", on);
    return () => {
      window.removeEventListener("ma-cart-added", on);
      clearTimeout(t);
    };
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = isAdmin ? [...NAV_LINKS, { label: "Admin", href: "/admin/products" }] : NAV_LINKS;

  return (
    <header className="ma-header">
      <a className="ma-skip" href="#main">
        Skip to content
      </a>
      <div className="ma-header__top">
        <Link href="/" className="ma-logo" aria-label="Mobile Armour home">
          <Image src="/img/logo-22.png" width={26} height={40} alt="Mobile Armour" priority />
          <span className="ma-logo__text">
            Mobile <span>Armour</span>
          </span>
        </Link>

        <form className="ma-search" role="search" action="/products" method="get">
          <label htmlFor="ma-q" className="ma-sr">
            Search products
          </label>
          <input
            id="ma-q"
            name="q"
            type="search"
            placeholder="Search cases, screen protectors, chargers"
            autoComplete="off"
          />
          <button type="submit" aria-label="Search">
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
          </button>
        </form>

        <div className="ma-header__actions">
          <a href={BUSINESS.phoneHref} className="ma-btn ma-btn--ghost ma-hide-sm">
            {BUSINESS.phoneDisplay}
          </a>
          <Link href="/contact?topic=repair" className="ma-btn ma-btn--primary ma-hide-sm">
            Book a repair
          </Link>
          <Link
            href={session ? "/account/profile" : "/account/login"}
            className="ma-icon-btn"
            aria-label={session ? "Your account" : "Log in"}
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
            </svg>
          </Link>
          <Link href="/cart" className="ma-icon-btn" aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 4h2l2.4 11h11l2-8H6.2" />
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
            </svg>
            {count > 0 && <span className="ma-badge">{count}</span>}
          </Link>
          <button
            type="button"
            className="ma-icon-btn ma-menu-btn"
            aria-expanded={open}
            aria-controls="ma-drawer"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      <nav className="ma-nav" aria-label="Main">
        {links.map((l) => (
          <Link key={l.href} href={l.href} aria-current={isActive(pathname, l.href) ? "page" : undefined}>
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="ma-toast" role="status" aria-live="polite" hidden={!toast}>
        {toast && (
          <>
            <span className="ma-toast__tick" aria-hidden="true">
              ✓
            </span>
            <span className="ma-toast__text">{toast}</span>
            <Link href="/cart" className="ma-btn ma-btn--primary">
              View cart
            </Link>
          </>
        )}
      </div>

      <div id="ma-drawer" className={`ma-drawer${open ? " is-open" : ""}`} hidden={!open}>
        <nav aria-label="Mobile">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={isActive(pathname, l.href) ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ma-drawer__cta">
          <a href={BUSINESS.phoneHref} className="ma-btn ma-btn--primary">
            Call {BUSINESS.phoneDisplay}
          </a>
          <Link href="/contact?topic=repair" className="ma-btn ma-btn--ghost">
            Book a repair
          </Link>
          <a href={`mailto:${BUSINESS.email}`} className="ma-drawer__mail">
            {BUSINESS.email}
          </a>
        </div>
      </div>
    </header>
  );
}
