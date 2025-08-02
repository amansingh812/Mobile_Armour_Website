import Blog1Card from "@/components/shared/card/blog1-card";
import Pagination from "@/components/shared/pagination/pagination";
import { BlogCardsData } from "@/data/blog-cards-seeds";
import React from "react";

function BlogCards({}) {
  return (
    <div className="blog-section gray-bg section-padding">
      <div className="container">
        <div className="row">
          {BlogCardsData &&
            BlogCardsData.map((item, i) => (
              <div className="col-xl-4 col-lg-4 col-md-6" key={i}>
                <Blog1Card blog1CardData={item} />
              </div>
            ))}
        </div>
        <Pagination />
      </div>
    </div>
  );
}

export default BlogCards;
