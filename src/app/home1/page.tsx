import About1 from "@/components/sections/about/about1";
import Blog1 from "@/components/sections/blog/blog1";
//import Counter1 from "@/components/sections/counter/counter1";
import Hero1 from "@/components/sections/hero/hero1";
import Project1 from "@/components/sections/project/project1";
import Promo1 from "@/components/sections/promo/promo1";
import Service1 from "@/components/sections/service/service1";
//import Team1 from "@/components/sections/team/team1";
//import Testimonial1 from "@/components/sections/testimonial/testimonial1";
//import Video1 from "@/components/sections/video/video1";
import React from "react";
import ProjectMasonryPage from "../project-masonry/page";
import ProjectGridPage from "../project-grid/page";
import ProductsPage from "../products/page";

function Home1({ }) {
  return (
    <div>
      <Hero1 />
      {/* <Counter1 /> */}
      <About1 type="type-2" />
      <Service1 />
      {/* <Project1 /> */}
      <ProductsPage />
      <Promo1 />
     
      {/* <ProjectGridPage />
      <ProjectMasonryPage /> */}
    </div>
  );
}

export default Home1;
