import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Headset, Utensils, UtensilsCrossed } from "lucide-react";

export default function HeroSection() {
  return (
    <>
      <section className="flex flex-col items-center">
        <div className="relative h-[300px] bg-[url('/images/home/bg_hero_section.png')] bg-cover bg-center w-full text-white text-center p-7 bg-black/10">
          <div className="bg-black/30 mt-4 py-[12px] px-[16px]">
            <h1 className="text-4xl font-medium font-quicksand">
              GRANDIA <br /> HOTELS
            </h1>
            <p className="text-[16px] mt-2 font-light">
              Enjoy your stay and make the most of everything we have to offer.
            </p>
          </div>
        </div>

        <div className="gap-8 w-full flex flex-row justify-center -mt-[70px] z-10">
          <Link href="/food-beverage">
            <div className="w-[150px] h-[148px] bg-white text-center rounded-xl gap-1 flex flex-col items-center justify-center shadow-lg border border-gray-100">
              <div className="bg-[#F4F0F0] rounded-full p-2 mb-1">
                <UtensilsCrossed size={24} className="text-primary" />
              </div>
              <p className="text-[16px] text-primary font-bold">
                Food & Beverage
              </p>
              <p className="text-[12px] text-primary-500">
                Order Food & Beverage
              </p>
            </div>
          </Link>

          <Link href="/customer-service">
            <div className="w-[150px] h-[148px] bg-white text-center rounded-xl gap-1 flex flex-col items-center justify-center shadow-lg border border-gray-100">
              <div className="bg-[#F4F0F0] rounded-full p-2 mb-1">
                <Headset size={24} className="text-primary" />
              </div>
              <p className="text-[16px] text-primary font-bold">
                Customer Service
              </p>
              <p className="text-[12px] text-primary-500">
                Get Assistance Anytime
              </p>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
