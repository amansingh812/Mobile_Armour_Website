import React from "react";

function Mission({ }) {
  const imageUrl = "/img/mission-bg1.jpg";
  return (
    <div
      className="mission-section pt-90 pb-90"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="overlay-5"></div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-10 col-md-10 text-center">
            <div className="section-title">
              <h6 className="text-white">Our Mission</h6>
              <h2 className="text-white">
                Exceptional Mobile Care, <span>Precison Repairs</span>
                quality, crafted by <span>skill technicians</span>
              </h2>
            </div>
            {/* <div className="author-info">
              <h5 className="text-white">Nirajan Singh</h5>
              <h6 className="text-white">Business CEO</h6>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mission;
