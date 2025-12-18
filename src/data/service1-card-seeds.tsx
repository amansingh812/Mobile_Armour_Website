export interface IService1CardData {
  src: string;
  alt: string;
  title: string;
  desc: string;
  href: string;
  linkText: string;
  linkIcon: React.ReactNode;
}

export const Service1CardData: IService1CardData[] = [
  {
    src: "/img/service/1-13.png",
    alt: "img",
    title: "Screen Replacement",
    desc: "Cracked or unresponsive screen? We replace damaged displays with high-quality LCD/OLED panels—same-day service, warranty included!",
    href: "/contact",
    linkText: "Know More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
  {
    src: "/img/service/mobile.png",
    alt: "img",
    title: "Battery replacement",
    desc: "Fast, reliable battery replacement using high-quality parts to restore performance, improve battery life, and ensure safe, efficient charging.",
    href: "/contact",
    linkText: "Know More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
  {
    src: "/img/service/application-settings.png",
    alt: "img",
  title: "Software Troubleshooting",
  desc: "Diagnose and fix software bugs, crashes, update issues, and performance problems to keep your device running smoothly and securely.",
    href: "/contact",
    linkText: "Know More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
  {
    src: "/img/service/1-41.png",
    alt: "img",
    title: "Water Damage Repairs",
    desc: "Spilled coffee or a dunked phone? Emergency cleaning & diagnostics to quickly rescue your device from liquid disasters!",
    href: "/contact",
    linkText: "Know More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
  {
    src: "/img/service/charginPortIssue.png",
    alt: "img",
    title: "Charging Port Repair",
    desc: "Fast charging port repair to fix loose connections, charging issues, and restore safe, reliable power flow, ensuring stable charging and device safety.",
    href: "/contact",
    linkText: "Know More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
  {
    src: "/img/service/1-61.png",
    alt: "img",
    title: "Back Glass Replacement",
    desc: "Visit our service center for quick and reliable phone repairs. From screen replacements to battery upgrades — we get your device back.",
    href: "/contact",
    linkText: "Know More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
];
