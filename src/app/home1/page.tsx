import About1 from "@/components/sections/about/about1";
import Blog1 from "@/components/sections/blog/blog1";
//import Counter1 from "@/components/sections/counter/counter1";

import Promo1 from "@/components/sections/promo/promo1";
import Service1 from "@/components/sections/service/service1";
import ServiceMobile from "@/components/sections/service/ServiceMobile";
import ServiceSummary from "@/components/sections/service/ServiceSummary";
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
import TrustBadges from "@/components/sections/trust-badges/TrustBadges";
import FloatingCTA from "@/components/shared/FloatingCTA";
import LeadCapturePopup from "@/components/shared/LeadCapturePopup";
import FAQ from "@/components/sections/faq/FAQ";
import MobileEnhancements from "@/components/shared/MobileEnhancements";
import ReviewSchema from "@/components/seo/ReviewSchema";


function Home1({ }) {
  return (
    <div>
      <ReviewSchema />
      <Hero1 />
      <TrustBadges /> 
      <Hero2 />
      {/* <ServiceSummary /> */}
       <Categories />
      <RepairProcess />
      <FAQ />
      <Testimonial1 />
      <PopularProducts />
      <Blog1 />
      <FloatingCTA />
      <LeadCapturePopup />
      {/* <MobileEnhancements /> */}
    </div>
  );
}

export default Home1;
