import Image from "next/image";
import Link from "next/link";
import React from "react";

function PdLeftSidebar({}) {
  return (
    <div className="project-details-wrap section-padding">
      <div className="container">
        <div className="row gx-5">
          <div className="col-xl-5 col-lg-5">
            <div className="project-details-info">
              <h3>Roof Repair Project</h3>
              <p>Dicta sunt explicabo enim ipsam</p>
              <div className="row single-details-item gy-3 mt-30">
                <div className="col-4">
                  <h5>Client</h5>
                </div>
                <div className="col-6">
                  <span>Good invest</span>
                </div>
                <div className="col-4">
                  <h5>Year</h5>
                </div>
                <div className="col-6">
                  <span>February, 2024</span>
                </div>
                <div className="col-4">
                  <h5>Author</h5>
                </div>
                <div className="col-6">
                  <span>Jim Rayan</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-7 col-lg-7">
            <div className="project-details-inner">
              <div className="project-feature-img">
                <Image
                  src="/img/project/project-feature-img-2.jpg"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                  alt="img"
                  width={666}
                  height={656}
                />
              </div>
              <div className="project-feature-img mt-30">
                <Image
                  src="/img/project/project-feature-img-3.jpg"
                  alt="img"
                  width={666}
                  height={656}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
              <div className="project-feature-img mt-30">
                <Image
                  src="/img/project/project-feature-img-4.jpg"
                  alt="img"
                  width={666}
                  height={656}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-100">
          <div className="nav-links">
            <div className="nav-previous">
              <Link href="/project-details-gallery">
                <span className="meta-nav">
                  <i className="las la-arrow-left"></i>Prev Project
                </span>
              </Link>
            </div>
            <div className="nav-next">
              <Link href="/project-details-right-sidebar">
                <span className="meta-nav">
                  Next Project<i className="las la-arrow-right"></i>
                </span>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PdLeftSidebar;
