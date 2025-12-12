"use client";

import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import { useRoom } from "@/providers/RoomProvider";
import { useRouter } from "nextjs-toploader/app";

export default function OurPromoSection() {
  const router = useRouter();
  const { roomData } = useRoom();

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
          {roomData?.promos.map((promo) => (
            <SwiperSlide
              key={promo.uuid}
              onClick={() =>
                promo.promo_product.uuid
                  ? router.push(`/food-beverage/${promo.promo_product.uuid}`)
                  : router.push(`/food-beverage`)
              }
            >
              <Image
                src={promo.photo?.url || ""}
                alt={promo.name ?? "Promo Image"}
                width={1920}
                height={1080}
                className="rounded-lg cursor-pointer aspect-video object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
