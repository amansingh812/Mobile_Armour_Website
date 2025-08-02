import About2 from "@/components/sections/about/about2";
import Blog2 from "@/components/sections/blog/blog2";
import Cta from "@/components/sections/cta/cta";
import Faq2 from "@/components/sections/faq/faq2";
import Hero2 from "@/components/sections/hero/hero2";
import Pricing1 from "@/components/sections/pricing/pricing2";
import Project2 from "@/components/sections/project/project2";
import Service2 from "@/components/sections/service/service2";
import Service2Slider from "@/components/sections/service/service2-slider";
import Testimonial3 from "@/components/sections/testimonial/testimonial3";
import React from "react";

function Home2({ }) {
  return (
    <div>
      <Hero2 />
      <About2 />
      <Service2Slider />
      <Service2 />
      <Faq2 />
      <Project2 />
      <Pricing1 />
      <Cta type="type-1" />
      <Blog2 />
      <Testimonial3 />
    </div>
  );
}

export default Home2;
