export interface IPmCardData {
  src: string;
  alt: string;
  title: string;
  subTitle: string;
  href: string;
  size: "big" | "small" | "wide";
}

export const PmCardData: IPmCardData[] = [
  {
    src: "/img/project/metro/1.jpg",
    alt: "img",
    title: "Roof Install",
    subTitle: "Tile Guard",
    href: "/project-details-right-sidebar",
    size: "big",
  },
  {
    src: "/img/project/metro/2.jpg",
    alt: "img",
    title: "Roof Repair",
    subTitle: "Rain Guard",
    href: "/project-details-right-sidebar",
    size: "small",
  },
  {
    src: "/img/project/metro/3.jpg",
    alt: "img",
    title: "Roof Inspection",
    subTitle: "Storm Shield",
    href: "/project-details-right-sidebar",
    size: "small",
  },
  {
    src: "/img/project/metro/4.jpg",
    alt: "img",
    title: "Roof Renovation",
    subTitle: "Metal Armor",
    href: "/project-details-right-sidebar",
    size: "wide",
  },
];
