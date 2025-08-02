import Breadcrumb from "@/components/sections/breadcrumb/breadcrumb";
import ProjectList from "@/components/sections/project/project-list";


import React from "react";

function ProjectListPage({}) {
  return (
    <div>
      <Breadcrumb title="Project - List" />
      <ProjectList />
    </div>
  );
}

export default ProjectListPage;
