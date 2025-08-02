"use client";

import { usePathname } from "next/navigation";
import { MenuData, MenuItem } from "@/data/menu-seeds";
import Link from "next/link";
import RenderSubMenu from "./sub-menu";

export default function MainMenu() {
  const pathname = usePathname();

  return (
    <div className="main-menu d-none d-lg-block">
      <ul>
        {MenuData.map((menu, index) => {
          return (
            <li key={index}>
              <Link href={menu.link} className="navlink">
                {menu.title}
                {menu.icon && <span className="menu-icon">{menu.icon}</span>}
              </Link>
              {menu.subMenu && (
                <RenderSubMenu subMenu={menu.subMenu} isDesktop={true} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
