import Breadcrumb from "@/components/sections/breadcrumb/breadcrumb";
import PdGallery from "@/components/sections/project-details/pd-gallery";

import React from "react";

function PdGalleryPage({}) {
  return (
    <div>
      <Breadcrumb title="Root Installation" />
      <PdGallery />
    </div>
  );
}

export default PdGalleryPage;
