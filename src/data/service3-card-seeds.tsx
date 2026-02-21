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
    src: "/img/service/screen-replacement.png",
    alt: "img",
    title: "Phone Screen Repairs",
    href: "/service-details",
    linkText: "Read More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
  {
    src: "/img/service/water-damage-repairs.png",
    alt: "img",
    title: "Water Damage Repairs",
    href: "/service-details",
    linkText: "Read More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
  {
    src: "/img/service/back-glass-replacement.png",
    alt: "img",
    title: "Back Glass Replacement",
    href: "/service-details",
    linkText: "Read More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
  {
    src: "/img/service/repairing.png",
    alt: "img",
    title: "Business Device Services",
    href: "/service-details",
    linkText: "Read More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },

];
