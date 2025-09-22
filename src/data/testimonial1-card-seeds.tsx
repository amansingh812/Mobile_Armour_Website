import React from "react";

export interface ITestimonial1CardData {
  icon: React.ReactNode;
  comment: string;
  src: string;
  alt: string;
  name: string;
  designation: string;
}

export const Testimonial1CardData: ITestimonial1CardData[] = [
  {
    icon: <i className="la la-quote-left"></i>,
    comment:
      "Mobile Armour has transformed how we manage device security. The onboarding was seamless and support is outstanding.",
    src: "/img/team-img.jpg",
    alt: "client-1",
    name: "Aarav Mehta",
    designation: "IT Lead, FinTech Co.",
  },
  {
    icon: <i className="la la-quote-left"></i>,
    comment:
      "We love the simplicity and power. Policy updates roll out instantly across our fleet.",
    src: "/img/logo-22.png",
    alt: "client-2",
    name: "Sana Kapoor",
    designation: "Operations Manager",
  },
  {
    icon: <i className="la la-quote-left"></i>,
    comment:
      "Reliable, intuitive, and secure. Exactly what our remote teams needed.",
    src: "/img/logo.png",
    alt: "client-3",
    name: "Rohit Verma",
    designation: "Founder, Startup Labs",
  },
];
