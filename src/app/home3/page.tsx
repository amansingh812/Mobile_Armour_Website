import About3 from "@/components/sections/about/about3";
import Blog3 from "@/components/sections/blog/blog3";
import Cta from "@/components/sections/cta/cta";

import Feature3 from "@/components/sections/feature/feature3";
import Hero3 from "@/components/sections/hero/hero3";
import Process3 from "@/components/sections/process/process3";
import Project3 from "@/components/sections/project/project3";
import Service3 from "@/components/sections/service/service3";
import Team1 from "@/components/sections/team/team1";
import Testimonial3 from "@/components/sections/testimonial/testimonial3";
import React from "react";

function Home3({}) {
  return (
    <div>
      <Hero3 />
      <Feature3 />
      <About3 />
      <Service3 />
      <Project3 />
      <Process3 />
      <Testimonial3 />
      <Cta />
      <Team1 />
      <Blog3 />
    </div>
  );
}

export default Home3;
