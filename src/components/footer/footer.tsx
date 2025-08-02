import React from "react";
import FooterBottom from "./footer-bottom";
import Link from "next/link";
import Image from "next/image";

function Footer({ }) {
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
                    <span className="logo-namefotter">Mobile Armour</span>
                  </div>
                </Link>
                <p>
                  We provide the best repair and reliable  Services<br />
                </p>
              </div>
              <div className="col-lg-2 col-md-6">
                <h5>Office</h5>
                <p>
                  opening soon<br />
                </p>
                <div className="company-email">
                  <Link href="mailto:Manager@mobilearmour.com.au" target="_blank" rel="noopener noreferrer">Manager@mobilearmour.com.au</Link>
                </div>
                <div className="phone-number">
                  <p>0405-326-205</p>
                </div>
              </div>
              <div className="col-lg-2 offset-lg-1 col-md-6 com-sm-12">
                <h5>Links</h5>
                <ul>
                  <li>

                    <Link href="/services" target="_blank" rel="noopener noreferrer">Services</Link>
                    <Link href="/project-grid" target="_blank" rel="noopener noreferrer">Projects</Link>
                    <Link href="/faq" target="_blank" rel="noopener noreferrer"> FAQ</Link>
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
          </div>
        </div>
      </footer>
      <FooterBottom />
    </>
  );
}

export default Footer;