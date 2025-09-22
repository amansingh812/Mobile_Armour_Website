"use client";

import { usePathname } from "next/navigation";
import { MenuData, MenuItem } from "@/data/menu-seeds";
import Link from "next/link";
import RenderSubMenu from "./sub-menu";
import { useSession } from "next-auth/react";

export default function MainMenu() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = session?.user?.email === 'dromperfectly125@gmail.com';

  return (
    <div className="main-menu d-none d-lg-block">
      <ul>
        {MenuData.map((menu, index) => {
          // Skip admin menu if user is not admin
          if (menu.title === 'Admin' && !isAdmin) {
            return null;
          }
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
