import React from "react";

function HeaderTop({}) {
  return (
    <div className="header-top-area dark-bg">
      <div className="container">
        <div className="row">
          <div className="col-xl-10 col-lg-10">
            <span>
              <i className="fa-light fa-envelope"></i>repair@mobilearmour.com.au
            </span>
            <span>
              <i className="fa-light fa-location-dot"></i>Kiosk 4 Warringal Shopping Centre, VIC 3084
            </span>
            <span>
              <i className="fa-light fa-clock"></i>Mon - Sun: 9:30am - 5:30pm
            </span>
          </div>
          <div className="col-xl-2 col-lg-2 text-end">
            <div className="social-area">
              <a href="https://www.facebook.com/people/Mobile-Armour/61577763766480/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/mobilearm0ur/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://tiktok.com/@mobilearmourau" target="_blank" rel="noopener noreferrer">
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
