import About1 from "@/components/sections/about/about1";
import Breadcrumb from "@/components/sections/breadcrumb/breadcrumb";
import Client from "@/components/sections/client/client";
import Cta from "@/components/sections/cta/cta";
import Promo1 from "@/components/sections/promo/promo1";
import Service3 from "@/components/sections/service/service3";
import Team1 from "@/components/sections/team/team1";
import Video2 from "@/components/sections/video/video2";
import React from "react";

function AboutPage({ }) {
  return (
    <div>
      <Breadcrumb title="About Us" />
      <About1 />
      {/* <Client /> */}
      {/* <Video2 /> */}
      <Service3 />
      <Promo1
        subTitle="Quality Work"
        title="We Are Committed to Best Service"
        sectionClass="section-padding"
      />
      <Cta title="Got a Device that Needs Fixing?" />
      {/* <Team1 /> */}
    </div>
  );
}

export default AboutPage;
