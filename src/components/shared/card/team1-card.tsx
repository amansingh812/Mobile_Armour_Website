import { ITeam1CardData } from "@/data/team1-card-seeds";
import Image from "next/image";
import React from "react";
interface Team1CardProps {
  team1Card: ITeam1CardData;
}
function Team1Card({ team1Card }: Team1CardProps) {
  return (
    <div className="single-team-member">
      <div className="team-bg">
        <Image
          src={team1Card.src}
          alt={team1Card.alt}
          width={246}
          height={308}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
      <div className="team-hover-info">
        <div className="team-title">
          <h5>{team1Card.name}</h5>
          <span>{team1Card.designation}</span>
        </div>
      </div>
      <div className="social-icon">
        <a href="#">{team1Card.fbIcon}</a>
        <a href="#">{team1Card.instaIcon}</a>
        <a href="#">{team1Card.ldIcon}</a>
        <a href="#">{team1Card.skypeIcon}</a>
      </div>
    </div>
  );
}

export default Team1Card;
