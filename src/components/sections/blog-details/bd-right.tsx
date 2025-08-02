import { BdCategoryData } from "@/data/bd-category-seeds";
import { BdPopularTagData } from "@/data/bd-popular-tag-seeds";
import { BdRecentPostData } from "@/data/bd-recent-post-seeds";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function BdRight({}) {
  return (
    <div className="blog-sidebar">
      <div className="search-bar-wrap d-flex">
        <input type="search" placeholder="search" />
        <i className="fal fa-search"></i>
      </div>
      <div className="blog-category">
        <h5>Categories</h5>
        <ul>
          {BdCategoryData.map((item, i) => (
            <li key={i}>
              {item.icon}
              <Link href={item.href}>{item.text}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="recent-post-wrap">
        <h5>Recent Post</h5>
        {BdRecentPostData.map((item, i) => (
          <div className="single-recent-post" key={i}>
            <div className="recent-post-thumbs">
              <Image
                src={item.src}
                width={100}
                height={100}
                alt={item.alt}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>
            <div className="recent-post-content">
              <p>{item.time}</p>
              <Link href={item.href}>
                <h6>{item.title}</h6>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="popular-tag-wrap">
        <h5>Popular Tag</h5>
        {BdPopularTagData.map((item, i) => (
          <span key={i}> {item.text}</span>
        ))}
      </div>
    </div>
  );
}

export default BdRight;
