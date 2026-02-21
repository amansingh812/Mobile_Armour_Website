import Image from "next/image";
import React from "react";

function Testimonial3({}) {
  return (
    <div
      id="testimonial-3"
      className="testimonial-section gray-bg section-padding"
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 ">
            <div className="testimonial-bg">
              <Image
                src="/img/testimonial/testimonial-img.jpg"
                width={516}
                height={516}
                alt="Mobile Armour customer testimonial and review image"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 ">
            <div className="testimonial-content">
              <div className="testimonial-icon">
                <Image
                  src="/img/straight-quotes.png"
                  alt="Quotation mark icon for customer testimonial review"
                  width={64}
                  height={64}
                />
              </div>
              <div className="testimonial-text">
                <h3>
                  "Beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed. Beatae
                  vitae dicta. Adipiscing elit, sed do
                </h3>
                <p>
                  Adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua ut enim ad minim. Adipiscing elit , sed
                  do"
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-img">
                  <Image
                    src="/img/testimonial/ceo.jpg"
                    alt="Testimonial author CEO portrait at Mobile Armour"
                    width={80}
                    height={80}
                  />
                </div>
                <div className="author-desc">
                  <h5>Francis Fooler</h5>
                  <h6>CEO, Roofix Inc.</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial3;
