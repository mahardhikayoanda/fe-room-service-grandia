import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <>
      <section className="relative h-[260px] bg-[url('/images/BedView.png')] bg-cover bg-center">
        <div className="absolute bottom-[-70px] gap-8 w-full flex flex-row justify-center">
          <Link href="/food-beverage">
            <div className="w-[150px] h-[148px] bg-white text-center rounded-xl gap-1 flex flex-col items-center justify-center border shadow-md">
              <div className="bg-[#4F3534] rounded-full p-2 mb-1">
                <Image
                  src="/icons/FoodAndBeverage.svg"
                  alt="FoodAndBeverage"
                  width={24}
                  height={24}
                />
              </div>
              <p className="text-[16px] text-[#87431D] font-bold">
                Food & Beverage
              </p>
              <p className="text-[12px] text-black">Order Food & Beverage</p>
            </div>
          </Link>

          <div className="w-[150px] h-[148px] bg-white text-center rounded-xl gap-1 flex flex-col items-center justify-center border shadow-md">
            <div className="bg-[#4F3534] rounded-full p-2 mb-1">
              <Image
                src="/icons/CustomerService.svg"
                alt="CustomerService"
                width={24}
                height={24}
              />
            </div>
            <p className="text-[16px] text-[#87431D] font-bold">
              Customer Service
            </p>
            <p className="text-[12px] text-black">Get Assistance Anytime</p>
          </div>
        </div>
      </section>
    </>
  );
}
