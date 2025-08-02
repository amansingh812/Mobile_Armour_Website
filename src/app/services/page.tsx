import About3 from "@/components/sections/about/about3";
import Breadcrumb from "@/components/sections/breadcrumb/breadcrumb";
import Cta from "@/components/sections/cta/cta";
import Service3 from "@/components/sections/service/service3";
import React from "react";

import Funfact from "@/components/sections/funfact/funfact";


function ServicesPage({ }) {
  return (
    <div>
      <Breadcrumb title="Services" />
      <About3
        title="Expert Mobile Repair Solution"
        subTitle="Our Services"
        sectionClass="section-padding"
      />
      <Service3 />
      <Funfact />
      {/* <Service2Slider /> */}
      <Cta />



      {/* <Testimonial1 /> */}
    </div>
  );
}

export default ServicesPage;
