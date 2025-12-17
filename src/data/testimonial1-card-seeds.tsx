import React from "react";

export interface ITestimonial1CardData {
  icon: React.ReactNode;
  comment: string;
  src: string;
  alt: string;
  name: string;
  designation: string;
  rating?: number;
}

export const Testimonial1CardData: ITestimonial1CardData[] = [
  {
    icon: <i className="la la-quote-left"></i>,
    comment:
      "Really good and helpful assistance. I got my phone accessories in the best price. Highly recommended!",
    src: "/img/unnamed.png",
    alt: "client-1",
    name: "Anthony Mchugh",
    designation: "Mobile User",
    rating: 5,
  },
  {
    icon: <i className="la la-quote-left"></i>,
    comment:
      "Awesome worker, great customer service and extremely time efficient, cheers mate 👏 …",
    src: "/img/unnamed (1).png",
    alt: "client-2",
    name: "Oli",
    designation: "Happy Customer",
    rating: 5,
  },
  {
    icon: <i className="la la-quote-left"></i>,
    comment:
      "Super quick & easy. I smash my phone a lot and this has been the best repair experience so far",
    src: "/img/unnamed (2).png",
    alt: "client-3",
    name: "Sam Elsmere",
    designation: "Satisfied Customer",
    rating: 5,
  },
  {
    icon: <i className="la la-quote-left"></i>,
    comment:
      "Great service. Came to my home to repair phone at no extra cost. Great service. Great Price. You won’t be disappointed",
    src: "/img/unnamed (3).png",
    alt: "client-5",
    name: "Con Sakkas",
    designation: "Trusted Customer",
    rating: 5,
  },
  
];
