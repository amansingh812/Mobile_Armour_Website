"use client";
import Project1Card from "@/components/shared/card/project1-card";
import SectionTitle from "@/components/shared/section/section-title";
import { Project2CardData } from "@/data/project2-card-seeds";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Project2({}) {
  return (
    <div className="project-section gray-bg section-padding">
      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-lg-7 ">
            <SectionTitle
              title="Impact of Roofing on Property Value"
              subTitle="Our Latest Work"
            />
          </div>
          <div className="col-lg-5 text-end">
            <div className="swiper-nav project-slider-nav d-inline-flex h-100 align-items-end">
              <div className="project-slider-prev   ">
                <i className="las la-arrow-left"></i>
              </div>
              <div className="project-slider-next">
                <i className="las la-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-30">
          <div className="project-slider">
            <Swiper
              modules={[Pagination, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={{
                prevEl: ".project-slider-prev ",
                nextEl: ".project-slider-next ",
              }}
              speed={1000}
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
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
              }}
            >
              {Project2CardData &&
                Project2CardData.map((item, i) => (
                  <SwiperSlide key={i}>
                    <Project1Card project1CardData={item} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project2;
