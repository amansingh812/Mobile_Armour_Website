export interface IBdCategoryData {
  icon: React.ReactNode;
  text: string;
  href: string;
}

export const BdCategoryData: IBdCategoryData[] = [
  {
    icon: <i className="las la-angle-double-right"></i>,
    text: "Repair",
    href: "/blog",
  },
  {
    icon: <i className="las la-angle-double-right"></i>,
    text: "Inspection",
    href: "/blog",
  },
  {
    icon: <i className="las la-angle-double-right"></i>,
    text: "Roof Installation",
    href: "/blog",
  },
  {
    icon: <i className="las la-angle-double-right"></i>,
    text: "Roof Fabrication",
    href: "/blog",
  },
  {
    icon: <i className="las la-angle-double-right"></i>,
    text: "Home Renovation",
    href: "/blog",
  },
];
