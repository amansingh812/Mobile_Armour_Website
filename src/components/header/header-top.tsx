import React from "react";

function HeaderTop({}) {
  return (
    <div className="header-top-area dark-bg">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8">
            <span>
              <i className="fa-light fa-location-dot"></i>Kiosk 4 Warringal Shopping Centre 56, VIC 3084
              
            </span>
            <span>
              <i className="fa-light fa-clock"></i>Sunday - Friday: 9 am - 8 pm
            </span>
          </div>
          <div className="col-xl-4 col-lg-4 text-end">
            <div className="social-area">
              <a href="https://www.facebook.com/mobilearmourau">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/mobile_armour/">
                <i className="fa-brands fa-instagram"></i>
              </a>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderTop;
