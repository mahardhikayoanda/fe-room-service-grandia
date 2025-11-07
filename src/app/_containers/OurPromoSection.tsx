"use client";

import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";

export default function OurPromoSection() {
  return (
    <section>
      <h2 className="pl-6 font-bold text-black text-sm mt-4 mb-2">OUR PROMO</h2>
      <div className="flex">
        <Swiper
          spaceBetween={32}
          slidesPerView={2}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
              spaceBetween: 12,
              slidesOffsetAfter: 24,
              slidesOffsetBefore: 24,
            },
          }}
          className="w-full"
          watchSlidesProgress={true}
          cssMode={false}
        >
          <SwiperSlide>
            <Image
              src="/images/promo/promo1.png"
              alt="Promo 1"
              width={340}
              height={100}
              className="rounded-lg cursor-pointer aspect-video"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/promo/promo1.png"
              alt="Promo 1"
              width={340}
              height={100}
              className="rounded-lg cursor-pointer aspect-video"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/promo/promo1.png"
              alt="Promo 2"
              width={340}
              height={100}
              className="rounded-lg cursor-pointer aspect-video"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/promo/promo1.png"
              alt="Promo 2"
              width={340}
              height={160}
              className="rounded-lg cursor-pointer aspect-video"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
