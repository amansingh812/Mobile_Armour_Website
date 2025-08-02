"use client";
import Image from "next/image";
import { LogoEnum } from "./header.enum";
import Link from "next/link";

interface HeaderLogoProps {
  logoType?: LogoEnum;
}



export default function HeaderLogo({
  logoType = LogoEnum.white,
}: HeaderLogoProps) {
  return (
    <div className="logo">
      <Link className="navbar-brand" href="/">
        <Image
          src={
            logoType === LogoEnum.white
              ? "/img/logo-white.png"
              : logoType === LogoEnum.dark
                ? "/img/logo-22.png"
                : "/img/logo-22.png"
          }
          width={50}
          height={75}
          alt="Picture of the author"
        />
        <span className="logo-name-header">
          Mobile <span style={{ color: "#FF5600" }}>Armour</span>
        </span>
      </Link>
    </div>
  );
}
