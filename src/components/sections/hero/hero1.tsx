"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Hero1Data } from "@/data/hero-seeds";
import Hero1Slide from "./hero1-slide";

function Hero1() {
  return (
    <div id="home-1">
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
        {Hero1Data &&
          Hero1Data.map((item, i) => (
            <SwiperSlide key={i}>
              <Hero1Slide
                subtitle={item.subtitle}
                title={item.title}
                src={item.src}
                description={item.description}
                link={item.link}
                buttonText={item.buttonText}
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

export default Hero1;
