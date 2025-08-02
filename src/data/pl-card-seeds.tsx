export interface IPlCardData {
  src: string;
  alt: string;
  title: string;
  subTitle: string;
  desc: string;
  href: string;
  text: string;
  icon: React.ReactNode;
}

export const PlCardData: IPlCardData[] = [
  {
    src: "/img/project/list/1.jpg",
    alt: "img",
    title: "Roof Installation",
    subTitle: "TILE GUARD",
    desc: "Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur. Dicta sunt explicabo.",
    href: "/project-details-gallery",
    text: "Read More",
    icon: <i className="las la-arrow-right"></i>,
  },
  {
    src: "/img/project/list/2.jpg",
    alt: "img",
    title: "Roof Inspection",
    subTitle: "METAL ARMOR",
    desc: "Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur. Dicta sunt explicabo.",
    href: "/project-details-gallery",
    text: "Read More",
    icon: <i className="las la-arrow-right"></i>,
  },
  {
    src: "/img/project/list/3.jpg",
    alt: "img",
    title: "Roof Renovation",
    subTitle: "SEAL SHIELD",
    desc: "Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur. Dicta sunt explicabo.",
    href: "/project-details-gallery",
    text: "Read More",
    icon: <i className="las la-arrow-right"></i>,
  },
  {
    src: "/img/project/list/4.jpg",
    alt: "img",
    title: "Roof Renewal",
    subTitle: "ROOF ARMOR",
    desc: "Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur. Dicta sunt explicabo.",
    href: "/project-details-gallery",
    text: "Read More",
    icon: <i className="las la-arrow-right"></i>,
  },
];
