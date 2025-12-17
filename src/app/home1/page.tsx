import About1 from "@/components/sections/about/about1";
import Blog1 from "@/components/sections/blog/blog1";
//import Counter1 from "@/components/sections/counter/counter1";

import Promo1 from "@/components/sections/promo/promo1";
import Service1 from "@/components/sections/service/service1";
import ServiceMobile from "@/components/sections/service/ServiceMobile";
import Categories from "@/components/sections/categories/Categories";
import PopularProducts from "@/components/sections/popular-products/PopularProducts";
import React from "react";
import Hero1 from "@/components/sections/hero/hero1";
import Hero2 from "@/components/sections/hero/hero2";
import Hero4 from "@/components/sections/hero/hero4";
import RepairProcess from "@/components/sections/repair-process/RepairProcess";
import Client from "@/components/sections/client/client";
import Testimonial1 from "@/components/sections/testimonial/testimonial1";
import Testimonial3 from "@/components/sections/testimonial/testimonial3";


function Home1({ }) {
  return (
    <div>
      <Hero1 />
      <Hero2 />
      <Service1 />
      <ServiceMobile />
      <RepairProcess />
      <Categories />
      <PopularProducts />
      {/* <Hero4 /> */}
      <Testimonial1 />
      <Promo1 />
      
    </div>
  );
}

export default Home1;
