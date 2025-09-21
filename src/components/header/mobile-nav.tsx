"use client";
import { MenuData, MenuItem } from "@/data/menu-seeds";
import { useState } from "react";
import PrimaryBtn from "../shared/button/primary-btn";
import RenderSubMenu from "./sub-menu";
import AuthNav from "../auth/AuthNav";

interface mobileNavProps { }
export default function MobileNav({ }: mobileNavProps) {
  const [subMenu, setSubMenu] = useState<number | null>(null);

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      {showMobileMenu && <div className="overlay active"></div>}

      <div className="mobile-nav-bar d-block col-sm-1 col-6 d-lg-none">
        <div className="mobile-nav-wrap">
          <div id="hamburger" onClick={() => setShowMobileMenu(true)}>
            <i className="las la-bars"></i>
          </div>
          <div className={`mobile-nav ${showMobileMenu ? "show" : ""}`}>
            <button
              type="button"
              className="close-nav"
              onClick={() => {
                setShowMobileMenu(!showMobileMenu);
                setSubMenu(null);
              }}
            >
              <i className="las la-times-circle"></i>
            </button>
            <nav className="sidebar-nav">
              <ul className="metismenu" id="mobile-menu">
                {MenuData.map((item, index) => (
                  <li
                    key={index}
                    className={subMenu === index ? "active" : ""}
                    onClick={(e: any) => {
                      if (item.subMenu) {
                        setSubMenu(subMenu !== index ? index : null);
                      }
                    }}
                  >
                    <a
                      onClick={(e) => {
                        if (item.subMenu) {
                          e.preventDefault();
                        }
                      }}
                      className={item.subMenu ? "has-arrow" : ""}
                      href={item.link}
                    >
                      {item.title}
                    </a>
                    {subMenu === index && item.subMenu && (
                      <RenderSubMenu isDesktop={false} subMenu={item.subMenu} />
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="action-bar">
              {/* Mobile Auth Navigation */}
              <div className="mobile-auth-nav mb-4">
                <AuthNav />
              </div>
              
              <a href="mailto:Manager@mobilearmour.com.au">
                <i className="las la-envelope"></i>Manager@mobilearmour.com.au
              </a>
              <a href="tel:0405-326-205">
                <i className="fal fa-phone"></i>0405-326-205
              </a>
              <PrimaryBtn href="/contact" text="Contact Us" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
