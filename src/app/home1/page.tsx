import About1 from "@/components/sections/about/about1";
import Blog1 from "@/components/sections/blog/blog1";
//import Counter1 from "@/components/sections/counter/counter1";

import Promo1 from "@/components/sections/promo/promo1";
import Service1 from "@/components/sections/service/service1";
import Categories from "@/components/sections/categories/Categories";
import React from "react";



import Hero1 from "@/components/sections/hero/hero1";
import Hero2 from "@/components/sections/hero/hero2";
import Hero4 from "@/components/sections/hero/hero4";

function Home1({ }) {
  return (
    <div>
      <Hero1   />
      <Categories />
      {/* <About1 type="type-2" /> */}
      <Hero2 />
      <Hero4 />
      
      <Service1 />
      <Promo1 />
    </div>
  );
}

export default Home1;
