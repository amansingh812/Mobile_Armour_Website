import Breadcrumb from "@/components/sections/breadcrumb/breadcrumb";
import PdRightSidebar from "@/components/sections/project-details/pd-right-sidebar";

import React from "react";

function PdRightSidebarPage({}) {
  return (
    <div>
      <Breadcrumb title="Root Installation" />
      <PdRightSidebar />
    </div>
  );
}

export default PdRightSidebarPage;
