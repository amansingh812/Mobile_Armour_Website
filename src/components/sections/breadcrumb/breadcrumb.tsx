import React from "react";
interface BreadcrumbProps {
  title: string;
  backgroundImage?: string;
}
function Breadcrumb({ title, backgroundImage }: BreadcrumbProps) {
  //nst imageUrl = "/img/bread-bg1.jpg";  about-us-bg
  const imageUrl = backgroundImage || "/img/about-us-bg.jpg";

  return (
    <div
      className="breadcrumb-area bread-bg"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className="overlay-5"></div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <div className="breadcrumb-title">
              <h1>{title}</h1>
            </div>
            <div className="breadcrumb-icon">
              <i className="las la-angle-down"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Breadcrumb;
