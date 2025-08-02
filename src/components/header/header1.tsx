"use client";

import useStickyHeader from "@/hooks/useStickyHeader";
import { useState } from "react";
import MobileNav from "./mobile-nav";
import HeaderRight from "./header-right";
import MainMenu from "./main-menu";
import HeaderLogo from "./header-logo";
import { LogoEnum } from "./header.enum";

export default function Header1() {
  const isSticky = useStickyHeader();
  return (
    <div className="header-area">
      <div id="header-sticky" className={isSticky ? "header-sticky" : ""}>
        <div className="navigation">
          <div className="container-fluid">
            <div className="header-inner-box">
              {/*  */}
              <HeaderLogo logoType={LogoEnum.dark} />
              {/*  */}
              <MainMenu />
              {/*  */}
              <HeaderRight />
              {/*  */}
              <MobileNav />
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
