import React from "react";

interface SectionTitleProps {
  title?: string;
  subTitle?: string;
  className?: string;
  textColor?: string;
}

function SectionTitle({ title, subTitle, className, textColor }: SectionTitleProps) {
  return (
    <div className={`${className} section-title`}>
      <h6 className={`${textColor}`}>{subTitle}</h6>
      <h2 className={`${textColor}`}>{title}</h2>
    </div>
  );
}

export default SectionTitle;
