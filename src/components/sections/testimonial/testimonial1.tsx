"use client";
import Testimonial1Card from "@/components/shared/card/testimonial1-card";
import SectionTitle from "@/components/shared/section/section-title";
import { Testimonial1CardData } from "@/data/testimonial1-card-seeds";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import React from "react";

function Testimonial1() {
  return (
    <div
      id="testimonial-1"
      className="testimonial-area gray-bg section-padding pb-100"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <SectionTitle
              title="Happy Client Says About Us"
              subTitle="Testimonial"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              speed={1000}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
            >
              {Testimonial1CardData.map((item, i) => (
                <SwiperSlide key={i}>
                  <Testimonial1Card testimonial1Card={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial1;
