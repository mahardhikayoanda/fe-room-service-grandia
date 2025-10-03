"use client";
import React from "react";
import Image from "next/image";

export default function ComplaintStatus() {
  return (
    <div className="border-b border-[#D8D8D8] pb-4">
      {/* Timeline item: Message Read */}
      <div className="flex flex-row gap-2 mb-4">
        <div className="flex flex-col items-center">
          {/* Circle icon */}
          <div className="bg-[#28A745]/10 h-8 w-8 rounded-full flex items-center justify-center">
            <Image
              src="/icons/mail-open.svg"
              alt="Message Read"
              width={16}
              height={16}
            />
          </div>
          {/* Vertical line with fixed size */}
          <div className="w-[2px] h-5 mt-3 bg-[#D8D8D8]"></div>
        </div>

        {/* Texts */}
        <div>
          <p className="text-[#28A745] font-bold text-[14px]">Message Read</p>
          <p className="text-[#7F7F7F] text-[12px]">07-07-2025 09:15</p>
        </div>
      </div>

      {/* Timeline item: Order received */}
      <div className="flex flex-row gap-2">
        <div className="flex flex-col items-center">
          {/* Circle icon */}
          <div className="bg-[#F2F2F2] h-8 w-8 rounded-full flex items-center justify-center">
            <Image
              src="/icons/notebook-pen.svg"
              alt="Order received"
              width={16}
              height={16}
            />
          </div>
        </div>

        {/* Texts */}
        <div>
          <p className="text-[#7F7F7F] font-bold text-[14px]">Order received</p>
          <p className="text-[#7F7F7F] text-[12px]">07-07-2025 09:10</p>
        </div>
      </div>
    </div>
  );
}
