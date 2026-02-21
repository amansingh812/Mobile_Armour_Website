"use client";
import SectionTitle from "@/components/shared/section/section-title";
import Image from "next/image";
import React from "react";
import CountUp from "react-countup";

function Funfact({ }) {
  return (
    <div id="team-page" className="funfact-section section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-6">
            <SectionTitle
              title="In‑store servicing"

            />
            <p>
              At our mobile service store, we provide fast and reliable in-house repairs for all major smartphone issues — from cracked screens and battery swaps to water damage and software glitches. Our certified technicians use top-quality parts and tools to ensure lasting results. Most repairs are done the same day, so you can wait or return later.
            </p>

          </div>
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="team-img-wrap">
              <Image
                src="/img/funfact/Store_servicing.webp"
                width={516}
                height={476}
                alt="In-store mobile device servicing and repair facility"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Funfact;
