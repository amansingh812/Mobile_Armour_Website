"use client";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface props {
  setIsSearchActive: Dispatch<SetStateAction<boolean>>;
}
export default function SearchPopup({ setIsSearchActive }: props) {
  return (
    <div className="search-popup ">
      <span
        className="search-back-drop"
        onClick={() => setIsSearchActive(false)}
      ></span>

      <div className="search-inner">
        <div className="container">
          <div className="logo">
            <Link className="navbar-brand" href="/">
              <Image src="/img/logo-2.png" width={198} height={64} alt="logo" />
            </Link>
          </div>
          {/* <HeaderLogo /> */}
          <button
            className="close-search"
            onClick={() => setIsSearchActive(false)}
          >
            <span className="la la-times"></span>
          </button>
          <form method="post" action="/">
            <div className="form-group">
              <input
                type="search"
                name="search-field"
                placeholder="Type your keyword"
                required
              />
              <button type="submit">
                <i className="fal fa-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
