import React from "react";
interface BorderedBtnProps {
  href: string;
  text: string;
  className?: string;
}
function BorderedBtn({ href, text, className }: BorderedBtnProps) {
  return (
    <div>
      <a href={href} className={`bordered-btn ${className}`}>
        {text}
      </a>
    </div>
  );
}

export default BorderedBtn;
