import About1 from "@/components/sections/about/about1";
import Blog1 from "@/components/sections/blog/blog1";
//import Counter1 from "@/components/sections/counter/counter1";
import Hero1 from "@/components/sections/hero/hero1";
import Project1 from "@/components/sections/project/project1";
import Promo1 from "@/components/sections/promo/promo1";
import Service1 from "@/components/sections/service/service1";
import React from "react";
import ProductsPage from "../products/page";
import AdminProductsPage from "../admin/products/page";

function Home1({ }) {
  return (
    <div>
      <Hero1 />

      <About1 type="type-2" />
      <Service1 />



      <ProductsPage />
      <Promo1 />

    </div>
  );
}

export default Home1;
