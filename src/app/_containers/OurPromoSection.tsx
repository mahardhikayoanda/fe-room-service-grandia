import Image from "next/image";
import React from "react";

export default function OurPromoSection() {
  return (
    <section className="px-4">
      <h2 className="font-bold text-black text-sm pt-24 pb-6">OUR PROMO</h2>
      <div className="flex overflow-x-auto gap-4 no-scrollbar">
        <Image
          src="/images/promo/promo1.png"
          alt="Promo 1"
          width={340}
          height={160}
          className="rounded-lg cursor-pointer"
        />
        <Image
          src="/images/promo/promo1.png"
          alt="Promo 2"
          width={340}
          height={160}
          className="rounded-lg cursor-pointer"
        />
        <Image
          src="/images/promo/promo1.png"
          alt="Promo 2"
          width={340}
          height={160}
          className="rounded-lg cursor-pointer"
        />
      </div>
    </section>
  );
}
