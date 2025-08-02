import Breadcrumb from "@/components/sections/breadcrumb/breadcrumb";
import SdSections from "@/components/sections/service-details/sd-sections";
import React from "react";

function ServiceDetailsPage({}) {
  return (
    <div>
      <Breadcrumb title="Service Details" />
      <SdSections />
    </div>
  );
}

export default ServiceDetailsPage;
