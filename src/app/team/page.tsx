import Breadcrumb from "@/components/sections/breadcrumb/breadcrumb";
import Funfact from "@/components/sections/funfact/funfact";
import TeamCards from "@/components/sections/team/team-cards";
import React from "react";

function TeamPage({}) {
  return (
    <div>
      <Breadcrumb title="Our Team" />
      <Funfact />
      <TeamCards />
    </div>
  );
}

export default TeamPage;
