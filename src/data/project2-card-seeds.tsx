export interface IProject2CardData {
  src: string;
  alt: string;
  title: string;
  desc: string;
  href: string;
  conditionalClass?: string;
}

export const Project2CardData: IProject2CardData[] = [
  {
    src: "/img/project/2-1.jpg",
    alt: "img",
    title: "Roof Installation",
    desc: "Simple Roofing",
    href: "/project-details-left-sidebar",
  },
  {
    src: "/img/project/2-2.jpg",
    alt: "img",
    title: "Roof Repair",
    desc: "Preparation Project",
    href: "/project-details-left-sidebar",
  },
  {
    src: "/img/project/2-3.jpg",
    alt: "img",
    title: "Roof Maintenance",
    desc: "Leak Detection",
    href: "/project-details-left-sidebar",
  },
  {
    src: "/img/project/2-4.jpg",
    alt: "img",
    title: "Roofing Inspection",
    desc: "Felt Roofing",
    href: "/project-details-left-sidebar",
  },
];
