import { MenuItem } from "@/data/menu-seeds";
import Link from "next/link";

export const renderSubMenu = (subMenu: MenuItem[]) => (
  <ul className="sub-menu">
    {subMenu.map((item, i) => (
      <li key={i}>
        <Link href={item.link} className={item.active ? "active" : ""}>
          {item.icon && <span className="menu-icon">{item.icon}</span>}
          {item.title}
        </Link>
        {item.subMenu && renderSubMenu(item.subMenu)}
      </li>
    ))}
  </ul>
);
