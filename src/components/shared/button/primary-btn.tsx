import Link from "next/link";
import React from "react";
interface PrimaryBtnProps {
  href: string;
  text: string;
  className?: string;
}
function PrimaryBtn({ href, text, className }: PrimaryBtnProps) {
  return (
    <div>
      <Link href={href} className={`theme-btn ${className}`}>
        {text}
      </Link>
    </div>
  );
}

export default PrimaryBtn;
