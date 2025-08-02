export interface IProject3CardData {
  src: string;
  alt: string;
  title: string;
  desc: string;
  href: string;
  conditionalClass?: string;
}

export const Project3CardData: IProject3CardData[] = [
  {
    src: "/img/project/3-1.jpg",
    alt: "img",
    title: "Roof Installation",
    desc: "Simple Roofing",
    href: "/project-details-gallery",
  },
  {
    src: "/img/project/3-2.jpg",
    alt: "img",
    title: "Roof Repair",
    desc: "Preparation Project",
    href: "/project-details-gallery",
  },
  {
    src: "/img/project/3-3.jpg",
    alt: "img",
    title: "Roof Maintenance",
    desc: "Leak Detection",
    href: "/project-details-gallery",
  },
  {
    src: "/img/project/3-4.jpg",
    alt: "img",
    title: "Roofing Inspection",
    desc: "Felt Roofing",
    href: "/project-details-gallery",
  },
  {
    src: "/img/project/3-5.jpg",
    alt: "img",
    title: "Roof Maintenance",
    desc: "Leak Detection",
    href: "/project-details-gallery",
    conditionalClass: "d-none d-lg-block",
  },
  {
    src: "/img/project/3-6.jpg",
    alt: "img",
    title: "Roofing Inspection",
    desc: "Felt Roofing",
    href: "/project-details-gallery",
    conditionalClass: "d-none d-lg-block",
  },
];
