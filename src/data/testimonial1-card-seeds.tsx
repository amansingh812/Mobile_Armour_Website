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
  {
    icon: <i className="la la-quote-left"></i>,
    comment:
      "Excellent advice and very good product with good price and quality. The technical  was very friendly and helpful. all the best for for them",
    src: "/img/unnamed (4).png",
    alt: "client-5",
    name: "Ahmad AL Mutawa",
    designation: "Trusted Customer",
    rating: 5,
  },
  {
    icon: <i className="la la-quote-left"></i>,
    comment:
      "Went to get the back of my phone repaired and can honestly say the service was amazing and the finished product even better. Pricing was on point and was kind enough to give me a discount on the case. Definitely referring to others",
    src: "/img/harriet.png",  
    alt: "client-6",
    name: "Harriet Knijff",
    designation: "Satisfied Customer",
    rating: 5,
  },
  {
    icon: <i className="la la-quote-left"></i>,
    comment:
   "Came in today around 2:00pm and had the absolute best experience! My phone was very cracked to the point my screen had blacked out. I unfortunately didn’t catch their name but the worker who served me and fixed my phone is the absolute nicest person. Amazing service and really fair and affordable price. Will definitely be back in the future if I need. I highly recommend this place! I can finally use my phone again, Thank you so much!",
    src: "/img/alina.png",
    alt: "client-7",
    name: "Alina Marquardt",  
    designation: "Happy Customer",
    rating: 5,
  },


];
