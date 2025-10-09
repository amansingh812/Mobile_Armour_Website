export interface Category {
  name: string;
  image: string;
  link: string;
}

export const categories: Category[] = [
  {
    name: "Cases",
    image: "/img/categories/case.jpg",
    link: "/products?category=Cases",
  },
  {
    name: "Power Banks",
    image: "/img/categories/powerbank.jpg",
    link: "/products?category=Power Banks",
  },
  {
    name: "Car Holders",
    image: "/img/categories/carholder.jpg",
    link: "/products?category=Car Holders",
  },
  {
    name: "Cables & Adapters",
    image: "/img/categories/cable.jpg",
    link: "/products?category=Cables & Adapters",
  },
  {
    name: "Screen Protectors",
    image: "/img/categories/screenprotector.jpg",
    link: "/products?category=Screen Protectors",
  },
];

