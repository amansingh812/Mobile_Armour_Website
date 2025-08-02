"use client";
import Blog3Card from "@/components/shared/card/blog3-card";
import SectionTitle from "@/components/shared/section/section-title";
import { Blog3CardData } from "@/data/blog3-card-seeds";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import React from "react";

function Blog3({}) {
  return (
    <div className="blog-section gray-bg section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-8 text-center">
            <SectionTitle
              title="Articles About Roofing "
              subTitle="From Our Blog"
            />
          </div>
        </div>
        <div className="row mt-30">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            speed={1000}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
          >
            {Blog3CardData.map((card, index) => (
              <SwiperSlide key={index}>
                <Blog3Card card={card} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Blog3;
