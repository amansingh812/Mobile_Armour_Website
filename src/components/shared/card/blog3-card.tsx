import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface IBlog3CardData {
  src: string;
  alt: string;
  title: string;
  meta: string;
  href: string;
  date: string;
  comment: number;
}

interface Blog3CardProps {
  card: IBlog3CardData;
  index: number;
}

const Blog3Card: React.FC<Blog3CardProps> = ({ card, index }) => {
  const isFirstLayout = index % 2 === 0;

  return (
    <Link href={card.href} className={`single-blog-item `}>
      {isFirstLayout && (
        <>
          <div className="blog-img">
            <Image
              src={card.src}
              alt={card.alt}
              width={373}
              height={249}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
          <div className="blog-content">
            <div className="blog-meta">
              <span>{card.meta}</span>
            </div>
            <div className="blog-title">
              <h4>{card.title}</h4>
            </div>
            <div className="blog-info">
              <span>{card.date}</span>
              <span>{card.comment} comment</span>
            </div>
          </div>
        </>
      )}

      {!isFirstLayout && (
        <>
          <div className="blog-content">
            <div className="blog-meta">
              <span>{card.meta}</span>
            </div>
            <div className="blog-title">
              <h4>{card.title}</h4>
            </div>
            <div className="blog-info">
              <span>{card.date}</span>
              <span>{card.comment} comment</span>
            </div>
          </div>
          <div className="blog-img">
            <Image
              src={card.src}
              alt={card.alt}
              width={373}
              height={249}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        </>
      )}
    </Link>
  );
};

export default Blog3Card;
