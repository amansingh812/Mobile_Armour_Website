export interface MenuItem {
  title: string;
  link: string;
  active?: boolean;
  icon?: React.ReactNode;
  subMenu?: MenuItem[];
}

export const MenuData: MenuItem[] = [
  {
    title: "Home",
    link: "/",
    active: true,
    // subMenu: [
    //   { title: "Home - One", link: "/", active: true },
    //   { title: "Home - Two", link: "/home2" },
    //   { title: "Home - Three", link: "/home3" },
    // ],
  },
  // {
  //   title: "About Us",
  //   link: "/about",
  //   // subMenu: [
  //   //   { title: "About Us", link: "/about" },
  //   //   { title: "Our Team", link: "/team" },
  //   //   { title: "Pricing", link: "/price" },
  //   //   { title: "FAQs", link: "/faq" },
  //   // ],
  // },
  {
    title: "Services",
    link: "/services",
    // subMenu: [
    //   { title: "Services", link: "/services" },
    //   { title: "Service Details", link: "/service-details" },
    // ],
  },
  // {
  //   title: "Projects",
  //   link: "#",
  //   subMenu: [
  //     { title: "Standard", link: "/project-standard" },
  //     { title: "Metro Fullwidth", link: "/project-metro" },
  //     { title: "Grid", link: "/project-grid" },
  //     { title: "List", link: "/project-list" },
  //     { title: "Masonry", link: "/project-masonry" },
  //     { title: "Slider", link: "/project-slider" },
  //     {
  //       title: "Single Project",
  //       link: "#",
  //       icon: <i className="las la-arrow-right"></i>,
  //       subMenu: [
  //         { title: "Left Sidebar", link: "/project-details-left-sidebar" },
  //         { title: "Right Sidebar", link: "/project-details-right-sidebar" },
  //         { title: "Gallery", link: "/project-details-gallery" },
  //       ],
  //     },
  //   ],
  // },
  {
    title: "FAQs",
    link: "/faq",
    // subMenu: [
    //    { title: "Blogs", link: "/blog" },
    //    { title: "Blog Details", link: "/blog-details" },
    // ],
  },
  { title: "Contact", link: "/contact" },
];
