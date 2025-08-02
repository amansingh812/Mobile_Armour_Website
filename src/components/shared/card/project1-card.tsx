import { IProject1CardData } from "@/data/project1-card-seeds";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Project1CardProps {
  project1CardData: IProject1CardData;
}
function Project1Card({ project1CardData }: Project1CardProps) {
  return (
    <div>
      <Link href={project1CardData.href} className="single-project-wrapper">
        <div className="project-bg">
          <Image
            src={project1CardData.src}
            alt={project1CardData.alt}
            width={576}
            height={507}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
          <div className="project-details">
            {/* <h4>{project1CardData.title}</h4> */}
            <p>{project1CardData.desc}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Project1Card;
