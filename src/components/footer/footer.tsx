import React from "react";
import FooterBottom from "./footer-bottom";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <>
      <footer className="footer-area">
        <div className="container">
          <div className="footer-up">
            <div className="row gy-5">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <Link href="/" className="logo">
                  <div className="logo-container">
                    <Image
                      src="/img/logo-22.png"
                      width={50}
                      height={75}
                      alt="factorix-logo"
                    />
                    <span className="logo-namefotter">
                      Mobile <span style={{ color: "#FF5600" }}>Armour</span>
                    </span>
                  </div>
                </Link>
                <p>
                  Mobile Armour – Home of Certified Technicians and Quality Accessories. 
                  Expert repairs and the best gear for your device.<br />
                </p>
              </div>

              <div className="col-lg-2 col-md-6">
                <h5>Contact Info</h5>
                <ul>
                  <li>
                    <p>
                      Kiosk 4 Warringal Shopping Centre<br />
                      56 Burgundy Street<br />
                      Heidelberg, VIC 3084<br />
                    </p>
                    <Link
                      href="mailto:repair@mobilearmour.com.au"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      repair@mobilearmour.com.au
                    </Link>
                    <p>0405-326-205</p>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 offset-lg-1 col-md-6 col-sm-12">
                <h5>Links</h5>
                <ul>
                  <li>
                    <Link href="/services" target="_blank" rel="noopener noreferrer">Services</Link>
                    <Link href="/products" target="_blank" rel="noopener noreferrer">Products</Link>
                    <Link href="/about" target="_blank" rel="noopener noreferrer">About</Link>
                    <Link href="/contact" target="_blank" rel="noopener noreferrer">Contact</Link>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-12">
                <h5>Get in Touch</h5>
                <ul>
                  <li>
                    <div className="social-area">
                      <Link href="https://www.facebook.com/share/r/16iozieawf/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                        <i className="lab la-facebook-f"></i>Facebook
                      </Link>
                      <Link href="https://www.instagram.com/p/DLuWzL3ybu6/?igsh=M3RheWdxdHVtNGhn" target="_blank" rel="noopener noreferrer">
                        <i className="lab la-instagram"></i>Instagram
                      </Link>
                      <Link href="https://www.tiktok.com/@mobilearm0ur?_t=ZS-8xnVKGBKPPF&_r=1" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-tiktok"></i>TikTok
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* ✅ Site-wide disclaimer note */}
            <div className="text-center mt-4 small text-muted">
              Independent device servicing provider. Not affiliated with or authorized by any device manufacturer.
            </div>
          </div>
        </div>
      </footer>
      <FooterBottom />
    </>
  );
}

export default Footer;
