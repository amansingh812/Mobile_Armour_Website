import Breadcrumb from "@/components/sections/breadcrumb/breadcrumb";
import PdLeftSidebar from "@/components/sections/project-details/pd-left-sidebar";

import React from "react";

function PdLeftSidebarPage({}) {
  return (
    <div>
      <Breadcrumb title="Root Installation" />
      <PdLeftSidebar />
    </div>
  );
}

export default PdLeftSidebarPage;
