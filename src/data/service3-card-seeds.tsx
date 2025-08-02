export interface IService3CardData {
  src: string;
  alt: string;
  title: string;

  href: string;
  linkText: string;
  linkIcon: React.ReactNode;
  className?: string;
}

export const Service3CardData: IService3CardData[] = [
  {
    src: "/img/service/1-13.png",
    alt: "img",
    title: "Phone Screen Repairs",
    href: "/service-details",
    linkText: "Read More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
  {
    src: "/img/service/1-41.png",
    alt: "img",
    title: "Water Damage Repairs",
    href: "/service-details",
    linkText: "Read More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
  {
    src: "/img/service/1-61.png",
    alt: "img",
    title: "Back Glass Replacement",
    href: "/service-details",
    linkText: "Read More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
  {
    src: "/img/service/repairing.png",
    alt: "img",
    title: "Corporate Repair",
    href: "/service-details",
    linkText: "Read More",
    linkIcon: <i className="las la-arrow-right"></i>,
    className: "b-none",
  },
];
