"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Hero3Slide from "./hero3-slide";
import { Hero3Data } from "@/data/hero-seeds";

function Hero3() {
  return (
    <div id="home-3">
      <Swiper
        className="homepage-slides "
        modules={[Navigation, Autoplay, EffectFade]}
        slidesPerView={1}
        navigation={{
          prevEl: ".banner-prev",
          nextEl: ".banner-next",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        effect="fade"
        speed={1000}
      >
        {Hero3Data &&
          Hero3Data.map((item, i) => (
            <SwiperSlide key={i}>
              <Hero3Slide
                subtitle={item.subtitle}
                title={item.title}
                buttonText={item.buttonText}
                link={item.link}
                src={item.src}
                description={item.description}
              />
            </SwiperSlide>
          ))}

        <div className="banner-prev ">
          <i className="las la-arrow-left"></i>
        </div>
        <div className="banner-next">
          <i className="las la-arrow-right"></i>
        </div>
      </Swiper>
    </div>
  );
}

export default Hero3;
