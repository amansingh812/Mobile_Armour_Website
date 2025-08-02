import Team1Card from "@/components/shared/card/team1-card";
import { TeamCardsData } from "@/data/team-cards-seeds";
import React from "react";

function TeamCards({}) {
  return (
    <div className="team-section gray-bg section-padding pb-90">
      <div className="container">
        <div className="row gx-5">
          {TeamCardsData &&
            TeamCardsData.map((item, i) => (
              <div className="col-xl-4 col-lg-4 col-md-4 " key={i}>
                <Team1Card team1Card={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default TeamCards;
