import Link from "next/link";
import React from "react";
interface WhiteBtnProps {
  href: string;
  text: string;
  className?: string;
}
function WhiteBtn({ href, text, className }: WhiteBtnProps) {
  return (
    <div>
      <Link href={href} className={`white-btn ${className}`}>
        {text}
      </Link>
    </div>
  );
}

export default WhiteBtn;
