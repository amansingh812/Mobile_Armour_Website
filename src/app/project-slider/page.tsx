import Breadcrumb from "@/components/sections/breadcrumb/breadcrumb";
import ProjectSlider from "@/components/sections/project/project-slider";

import React from "react";

function ProjectSliderPage({}) {
  return (
    <div>
      <header className="product-Header section-title">
        <div className="container">
          <p className="products-title">Our Products <span></span></p>
           <h2 className="products-subtitle">Discover our amazing <br>
           </br> collection of tech products</h2>
        </div>
      </header>
      <ProjectSlider />
    </div>
  );

  
}

export default ProjectSliderPage;
