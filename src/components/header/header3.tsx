"use client";

import useStickyHeader from "@/hooks/useStickyHeader";
import HeaderLogo from "./header-logo";
import HeaderRight from "./header-right";
import MainMenu from "./main-menu";
import MobileNav from "./mobile-nav";
import { LogoEnum } from "./header.enum";

export default function Header3() {
  const isSticky = useStickyHeader();
  return (
    <div className="header-area absolute-header">
      <div id="header-sticky" className={` ${isSticky && "header-sticky"}`}>
        <div className="navigation">
          <div className="container-fluid">
            <div className="header-inner-box">
              {/* Logo */}
              <HeaderLogo logoType={LogoEnum.red} />
              {/* Main Menu  */}
              <MainMenu />
              <HeaderRight />
              {/* Mobile Menu */}
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
