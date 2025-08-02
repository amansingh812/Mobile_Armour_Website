// import Blog1 from "@/components/sections/blog/blog1";
import Breadcrumb from "@/components/sections/breadcrumb/breadcrumb";
import FaqItems from "@/components/sections/faq/faq-items";
import Mission from "@/components/sections/mission/mission";
import React from "react";

function FaqPage({ }) {
  return (
    <div>
      <Breadcrumb title="FAQ's" />
      <FaqItems />
      <Mission />
      {/* <Blog1 /> */}
    </div>
  );
}

export default FaqPage;
