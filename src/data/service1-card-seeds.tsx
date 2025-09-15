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
    title: "Phone Screen Repairs",
    desc: "Cracked or unresponsive screen? We replace damaged displays with high-quality LCD/OLED panels—same-day service, warranty included!",
    href: "/service-details",
    linkText: "Read More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
  {
    src: "/img/service/repairing.png",
    alt: "img",
    title: "Corporate Repair",
    desc: "Bulk device repairs for businesses! On-site or in-store service with minimal downtime to keep your team connected and productive.",
    href: "/service-details",
    linkText: "Read More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
  {
    src: "/img/service/1-33.png",
    alt: "img",
    title: "In Home repair",
    desc: "Can’t make it to our shop? Our technicians come to you for screen fixes, battery swaps, and more—convenience at your doorstep!",
    href: "/service-details",
    linkText: "Read More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
  {
    src: "/img/service/1-41.png",
    alt: "img",
    title: "Water Damage Repairs",
    desc: "Spilled coffee or a dunked phone? Emergency cleaning & diagnostics to quickly rescue your device from liquid disasters!",
    href: "/service-details",
    linkText: "Read More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
  {
    src: "/img/service/1-51.png",
    alt: "img",
    title: "Charging Repair",
    desc: "Faulty charging port or slow charging? We replace ports, batteries, and cables to restore full power—fast and hassle-free every time.",
    href: "/service-details",
    linkText: "Read More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
  {
    src: "/img/service/1-61.png",
    alt: "img",
    title: "Back Glass Replacement",
    desc: "Shattered back cover? We replace it while preserving water resistance (where applicable) and offer color-matching options!",
    href: "/service-details",
    linkText: "Read More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
];
