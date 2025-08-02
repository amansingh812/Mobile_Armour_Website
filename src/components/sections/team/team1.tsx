import PrimaryBtn from "@/components/shared/button/primary-btn";
import Team1Card from "@/components/shared/card/team1-card";
import SectionTitle from "@/components/shared/section/section-title";
import { Team1CardData } from "@/data/team1-card-seeds";
import React from "react";
interface Team1Props {
  type?: string;
}
function Team1({ type }: Team1Props) {
  return (
    <div
      className={`team-section  section-padding ${
        type === "type-1" ? "dark-bg" : ""
      }`}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 order-2 order-lg-1">
            <div className="team-members-wrap">
              <div className="row">
                {Team1CardData &&
                  Team1CardData.map((item, i) => (
                    <div className="col-xl-6 col-lg-6 col-md-6 " key={i}>
                      <Team1Card team1Card={item} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 order-1 order-lg-2">
            <div className="team-content-wrap">
              <SectionTitle
                title="Meet Our talent & Professional Roofers"
                subTitle="Our Team"
                textColor={`${type === "type-1" ? "text-white" : ""}`}
              />
              <p>
                Adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim. Adipiscing elit, sed do
                eiusmod tempor incididunt ut labore.
              </p>
              <PrimaryBtn href="team" text="See More" className="mt-30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team1;
