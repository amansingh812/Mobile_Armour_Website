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
    src: "/img/service/repairing.png",
    alt: "img",
    title: "Business Device Services",
    desc: "Business device services for companies! In-store service with priority turnaround to keep your team connected and productive.",
    href: "/contact",
    linkText: "Know More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
  {
    src: "/img/service/1-33.png",
    alt: "img",
  title: "In-Store Servicing",
  desc: "Experience professional device care at our service center. Our certified experts provide quick, precise repairs to keep your phone performing like new.",
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
    src: "/img/service/1-51.png",
    alt: "img",
    title: "Charging Repair",
    desc: "Faulty charging port or slow charging? We replace ports, batteries, and cables to restore full power—fast and hassle-free every time.",
    href: "/contact",
    linkText: "Know More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
  {
    src: "/img/service/1-61.png",
    alt: "img",
    title: "Back Glass Replacement",
  desc: "Visit our service center for quick and reliable phone repairs. From screen replacements to battery upgrades — we get your device back in perfect shape, fast.",
    href: "/contact",
    linkText: "Know More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
];
