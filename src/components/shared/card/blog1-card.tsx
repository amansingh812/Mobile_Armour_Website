import { IBlog1CardData } from "@/data/blog1-card-seeds";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Blog1CardProps {
  blog1CardData: IBlog1CardData;
}
function Blog1Card({ blog1CardData }: Blog1CardProps) {
  return (
    <div>
      <Link href={blog1CardData.href} className="single-blog-item ">
        <div className="blog-img">
          <Image
            src={blog1CardData.src} alt={blog1CardData.alt}
            width={365}
            height={244}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
        <div className="blog-content">
          <div className="blog-meta">
            <span>{blog1CardData.meta}</span>
          </div>
          <div className="blog-title">
            <h4>{blog1CardData.title}</h4>
          </div>
          <div className="blog-info">
            <span>{blog1CardData.date}</span>
            <span>{blog1CardData.comment} comment</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Blog1Card;
