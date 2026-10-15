export interface Category {
  name: string;
  image: string;
  link: string;
}

export const categories: Category[] = [
  {
    name: "Cases",
    image: "/img/categories/case.jpg",
    link: "/shop/cases",
  },
  {
    name: "Power Banks",
    image: "/img/categories/powerbank.jpg",
    link: "/shop/power-banks",
  },
  {
    name: "Car Holders",
    image: "/img/categories/carholder.jpg",
    link: "/shop/car-holders",
  },
  {
    name: "Cables & Adapters",
    image: "/img/categories/cable.jpg",
    link: "/shop/cables-adapters",
  },
  {
    name: "Screen Protectors",
    image: "/img/categories/screenprotector.jpg",
    link: "/shop/screen-protectors",
  },
];

