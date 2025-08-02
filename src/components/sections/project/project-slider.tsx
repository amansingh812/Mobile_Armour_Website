"use client";
import PsCard from "@/components/shared/card/ps-card";
import { PSliderCardData } from "@/data/ps-card-seeds";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

//Autoplay

function ProjectSlider({}) {
  return (
    <div id="project-standard" className="project-section section-padding">
      <div className="container">
        <div className="row">
          <div className="project-slider-2">
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              speed={1000}
              navigation={{
                prevEl: ".project-slider-2-prev",
                nextEl: ".project-slider-2-next",
              }}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
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
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
              }}
            >
              {PSliderCardData &&
                PSliderCardData.map((item, i) => (
                  <SwiperSlide key={i}>
                    <PsCard psCardData={item} />
                  </SwiperSlide>
                ))}
            </Swiper>
            <div className="project-slider-2-nav">
              <div className="project-slider-2-prev ">
                <i className="las la-arrow-left"></i>
              </div>
              <div className="project-slider-2-next">
                <i className="las la-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectSlider;
