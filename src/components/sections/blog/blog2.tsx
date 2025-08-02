"use client";
import Blog1Card from "@/components/shared/card/blog1-card";
import SectionTitle from "@/components/shared/section/section-title";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Blog2CardData } from "@/data/blog2-card-seeds";

function Blog2() {
  return (
    <div className="blog-section gray-bg section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-8 text-center">
            <SectionTitle
              title="Articles About Roofing"
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
            speed={1000}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
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
            {Blog2CardData.map((item, i) => (
              <SwiperSlide key={i}>
                <Blog1Card blog1CardData={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Blog2;
