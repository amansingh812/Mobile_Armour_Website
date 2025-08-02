export interface IService2CardData {
  src: string;
  alt: string;
  iconSrc: string;
  title: string;
  desc: string;
  href: string;
  linkText: string;
  linkIcon: React.ReactNode;
}

export const Service2CardData: IService2CardData[] = [
  {
    src: "/img/service/2-1.jpg",
    iconSrc: "/img/service/1-1.png",
    alt: "img",
    title: "Felt Roofing",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    href: "/service-details",
    linkText: "Read More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
  {
    src: "/img/service/2-2.jpg",
    iconSrc: "/img/service/1-2.png",
    alt: "img",
    title: "Roof Restoration",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    href: "/service-details",
    linkText: "Read More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
  {
    src: "/img/service/2-3.jpg",
    iconSrc: "/img/service/1-3.png",
    alt: "img",
    title: "Roof Repairing",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    href: "/service-details",
    linkText: "Read More",
    linkIcon: <i className="las la-arrow-right"></i>,
  },
];
