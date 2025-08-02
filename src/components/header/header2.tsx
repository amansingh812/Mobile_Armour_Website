"use client";

import HeaderRight from "./header-right";
import MainMenu from "./main-menu";
import MobileNav from "./mobile-nav";
import HeaderLogo from "./header-logo";
import useStickyHeader from "@/hooks/useStickyHeader";

export default function Header2() {
  const isSticky = useStickyHeader();
  return (
    <>
      <div
        id="header-sticky"
        className={`header-area header-two ${isSticky && "header-sticky"}`}
      >
        <div className="navigation">
          <div className="container">
            <div className="header-inner-box">
              {/* Logo */}
              <HeaderLogo />
              {/* Main Menu  */}
              <MainMenu />
              {/* Header Right */}
              <HeaderRight />
              {/* Mobile Menu */}
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
