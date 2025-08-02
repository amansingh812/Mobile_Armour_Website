import Image from "next/image";
import Link from "next/link";
import React from "react";

function PdGallery({}) {
  return (
    <div className="project-details-wrap section-padding">
      <div className="container">
        <div className="row align-items-end mb-60">
          <div className="col-xl-9 col-lg-9">
            <div className="project-desc">
              <h3>Roofing Inspection</h3>
              <p>
                Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                sit aspernatur aut odit aut fugit, sed quia consequuntur. Dicta
                sunt explicabo.
              </p>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3">
            <div className="row single-details-item gy-3 mt-30">
              <div className="col-4">
                <h5>Client</h5>
              </div>
              <div className="col-6">
                <span>New Plant</span>
              </div>
              <div className="col-4">
                <h5>Year</h5>
              </div>
              <div className="col-6">
                <span>January, 2024</span>
              </div>
              <div className="col-4">
                <h5>Author</h5>
              </div>
              <div className="col-6">
                <span>Anna Lewis</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row gx-5">
          <div className="col-xl-12 col-lg-12">
            <div className="project-details-inner">
              <div className="project-feature-img">
                <Image
                  src="/img/project/project-feature-img-5.jpg"
                  alt="img"
                  width={1176}
                  height={521}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
              <div className="project-details-content">
                <h3>Altogether Better</h3>
                <p>
                  Aenean interdum purus vitae purus laoreet, eu egestas augue
                  dictum. Nunc tincidunt felis ullamcorper dolor euismod
                  porttitor at tincidunt arcu. Ut molestie cursus sapien, a
                  auctor quam viverra ac. Sed non blandit mi. Proin pharetra dui
                  in molestie sollicitudin. Vivamus ornare lorem in tempus
                  facilisis. Quisque tristique erat interdum augue sodales
                  fringilla.
                </p>
              </div>
              <div className="project-image-gallery">
                <div className="row">
                  <div className="col-6">
                    <Image
                      src="/img/project/gallery-img-1.jpg"
                      alt="img"
                      width={576}
                      height={384}
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <Image
                      src="/img/project/gallery-img-2.jpg"
                      alt="img"
                      width={576}
                      height={384}
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </div>
                  <div className="col-12 mt-30">
                    <Image
                      src="/img/project/gallery-img-3.jpg"
                      alt="img"
                      width={1176}
                      height={521}
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </div>
                </div>
              </div>
              <p className="mt-30">
                {" "}
                Phasellus euismod, dolor at efficitur condimentum, neque nulla
                viverra lectus, varius bibendum quam sapien dignissim mi.
                Maecenas rhoncus leo turpis, sit amet aliquet lectus viverra
                sed. Aliquam sodales commodo imperdiet. Morbi tincidunt ante
                interdum urna commodo tempor vitae id orci. Suspendisse id orci
                ut erat convallis iaculis luctus vel diam. Donec felis eros,
                consectetur sed ornare quis, ultrices a libero. Vestibulum
                consectetur purus id libero euismod maximus.
              </p>
            </div>
          </div>
        </div>
        <div className="row mt-100">
          <div className="nav-links">
            <div className="nav-previous">
              <Link href="/project-details-right-sidebar">
                <span className="meta-nav">
                  <i className="las la-arrow-left"></i>Prev Project
                </span>
              </Link>
            </div>
            <div className="nav-next">
              <Link href="/project-details-left-sidebar">
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

export default PdGallery;
