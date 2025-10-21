import React from "react";

function HeaderTop({}) {
  return (
    <div className="header-top-area dark-bg">
      <div className="container">
        <div className="row">
          <div className="col-xl-10 col-lg-10">
            <span>
              <i className="fa-light fa-envelope"></i>Manager@mobilearmour.com.au
            </span>
            <span>
              <i className="fa-light fa-location-dot"></i>Kiosk 4 Warringal Shopping Centre 56, VIC 3084
            </span>
            <span>
              <i className="fa-light fa-clock"></i>Sun - Fri: 9 am - 8 pm
            </span>
          </div>
          <div className="col-xl-2 col-lg-2 text-end">
            <div className="social-area">
              <a href="https://www.facebook.com/mobilearmourau">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/mobile_armour/">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://tiktok.com/@mobilearmourau">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderTop;
