import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IPmCardData {
  src: string;
  alt: string;
  title: string;
  subTitle: string;
  href: string;
  size: "big" | "small" | "wide";
}

const PmCard: React.FC<IPmCardData> = ({
  src,
  alt,
  title,
  subTitle,
  href,
  size,
}) => {
  const sizeClass = size === "big" ? "big" : size === "wide" ? "wide" : "small";

  return (
    <Link href={href} className={`single-project-wrap ${sizeClass}`}>
      <Image
        src={src}
        alt={alt}
        width={700}
        height={760}
      />
      <div className="details">
        <div className="info">
          <h5>{title}</h5>
          <h6>{subTitle}</h6>
        </div>
      </div>
    </Link>
  );
};

export default PmCard;
