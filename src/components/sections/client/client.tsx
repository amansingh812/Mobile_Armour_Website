"use client";

import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ClientsData } from "@/data/client-seeds";
import SingleClient from "./single-client";

function Client({}) {
  return (
    <div className="client-section section-padding pt-40">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12">
            <Swiper
              className="client-wrap"
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={2}
              speed={1000}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 40,
                },
              }}
            >
              {ClientsData.map((item, i) => (
                <SwiperSlide key={i}>
                  <SingleClient imageSrc={item.src} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Client;
