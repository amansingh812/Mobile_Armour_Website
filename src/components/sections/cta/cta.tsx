import WhiteBtn from "@/components/shared/button/white-btn";
import SectionTitle from "@/components/shared/section/section-title";
import React from "react";
interface CtaProps {
  title?: string;
  type?: string;
}
function Cta({ type, title = "We create Smart Repair Solutions." }: CtaProps) {
  return (
    <div
      className={`cta-section section-padding pt-80 pb-80  ${type === "type-1" ? "dark-bg" : "theme-bg"
        }`}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-8 col-lg-8 col-md-8">
            <div className="cta-title">
              <SectionTitle title={title} textColor="text-white" />
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 text-lg-end">
            <div className="cta-btn">
              <WhiteBtn href="/contact" text="Contact Us" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cta;
