"use client";

import { MenuItem } from "@/data/menu-seeds";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useMemo, useCallback } from "react";

const RenderSubMenu = ({
  subMenu,
  isDesktop = true,
}: {
  subMenu: MenuItem[];
  isDesktop: boolean;
}) => {
  const pathname = usePathname();

  const defaultActive = useMemo(() => {
    const routes = ["/", "/home2", "/home3"];
    return routes.indexOf(pathname);
  }, [pathname]);

  const [activeMenu, setActiveMenu] = useState<number | null>(defaultActive);

  const handleMouseEnter = useCallback((index: number) => {
    setActiveMenu(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveMenu(defaultActive);
  }, [defaultActive]);
  const [nestedMenu, setNestedMenu] = useState<number | null>(null);
  return (
    <ul className="sub-menu" onMouseLeave={handleMouseLeave}>
      {subMenu.map((item, i) => (
        <li
          key={i}
          onClick={(e: any) => {
            if (item.subMenu) {
              e.stopPropagation();
              setNestedMenu(nestedMenu !== i ? i : null);
            }
          }}
        >
          <Link
            href={item.link}
            className={`${i === activeMenu && "active"}   `}
            onMouseEnter={() => handleMouseEnter(i)}
            onClick={(e) => {
              if (item.subMenu) {
                e.preventDefault();
              }
            }}
          >
            {isDesktop && item.icon && (
              <span className="menu-icon">{item.icon}</span>
            )}
            {item.title}
            {!isDesktop && item.subMenu && (
              <i className="las la-arrow-right"></i>
            )}
          </Link>
          {!isDesktop && nestedMenu === i && item.subMenu && (
            <RenderSubMenu subMenu={item.subMenu} isDesktop={isDesktop} />
          )}
          {isDesktop && item.subMenu && (
            <RenderSubMenu subMenu={item.subMenu} isDesktop={isDesktop} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default RenderSubMenu;
