export interface IProject1CardData {
  src: string;
  alt: string;
  title: string;
  desc: string;
  href: string;
  conditionalClass?: string;
}

export const Project1CardData: IProject1CardData[] = [
  {
    src: "/img/project/1-1111.jpg",
    alt: "img",
    title: "Mobile Cases",
    desc: "Shock Resistance",
    href: "/contact",
  },
  {
    src: "/img/project/1-222.jpg",
    alt: "img",
    title: "Power Bank",
    desc: "Portable Power",
    href: "/contact",
  },
  {
    src: "/img/project/1-41.png",
    alt: "img",
    title: "Mobile Stand",
    desc: "hand-Free Suport",
    href: "/contact",
  },
  {
    src: "/img/project/1-31.jpeg",
    alt: "img",
    title: "Lens Protection",
    desc: "Camera Safety",
    href: "/contact",
  },
  {
    src: "/img/project/1-51.png",
    alt: "img",
    title: "Data cable",
    desc: "Durable wires",
    href: "/contact",
    conditionalClass: "d-none d-lg-block",
  },
];
