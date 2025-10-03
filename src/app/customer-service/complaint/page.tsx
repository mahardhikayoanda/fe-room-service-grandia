"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ComplaintStatus from "@/app/customer-service/_components/ComplaintStatus";
import ComplaintInformationDetails from "@/app/_components/ComplaintInformationDetails";

export default function ComplaintPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  return (
    <section>
      <div className="bg-white">
        <div className="bg-[#F2F2F2] w-[390px] h-[766px] flex flex-col gap-2">
          {/* Header */}
          <div className="flex flex-row bg-white px-6 py-4">
            <div className="gap-4">
              <p className="font-bold text-[#191919] text-lg">Complaint</p>
              <p className="text-[#191919] text-sm">#25012421320</p>
            </div>
          </div>

          {/* Complaint Info */}
          <div className="bg-white p-6 flex flex-col gap-4">
            <div>
              <p className="text-black font-bold text-base">Complaint Information</p>
              <p className="text-[#4C4C4C] text-sm">
                Bayu Imam Fauzan | 0895632317128
              </p>
            </div>

            {/* Room Info */}
            <div className="flex items-center justify-center">
              <div className="bg-[#F4F0F0] p-4 w-[342px] h-[74px] rounded-xl flex flex-row items-center gap-2">
                <div className="p-2 bg-[#BE9E9D] rounded-full flex items-center justify-center w-10 h-10">
                  <Image src="/icons/door-open.svg" alt="Door" width={24} height={24} />
                </div>
                <div>
                  <p className="text-[#4F3534] font-bold">Room 120</p>
                  <p className="text-[#4C4C4C]">Deluxe Suite - 3rd floor</p>
                </div>
              </div>
            </div>

            {/* Complaint Text */}
            <div className="flex flex-row gap-4 pb-4 border-b border-[#D8D8D8]">
              <Image
                src="/images/customer_service/pict-cs.png"
                alt="pict"
                width={80}
                height={80}
              />
              <p className="text-[#4C4C4C] text-sm">
                Air di kamar mandi warnanya hijau dan sangat kotor
              </p>
            </div>

            {/* Status */}
            <div>
              <p className="text-black font-bold text-base mb-4">Complaint Status</p>
              <ComplaintStatus />
            </div>

            {/* View Details */}
            <div
              className="flex flex-row justify-end items-center text-sm font-bold text-[#0F67B9] cursor-pointer"
              onClick={handleOpenDrawer}
            >
              <p>View Details</p>
              <Image src="/icons/chevron-down.svg" alt="pict" width={16} height={16} />
            </div>
          </div>

          {/* Complaint Meta */}
          <div className="bg-white py-4 px-6">
            <div className="flex flex-row justify-between">
              <p className="text-black font-bold text-sm">No. Complaint</p>
              <div className="flex flex-row gap-1 items-center">
                <p className="text-black text-sm">25012421320</p>
                <div className="outline-1 outline-[#D8D8D8] px-2 py-0.5 rounded">
                  <p className="text-[#7F7F7F] font-bold text-sm">Copy</p>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between mt-[8px]">
              <p className="text-[#7F7F7F] text-sm">Complaint time</p>
              <p className="text-[#7F7F7F] text-sm">07-08-2025 09:10</p>
            </div>
          </div>

          {/* Footer Button */}
          <div className="py-3 flex items-center justify-center">
            <Link
              href="/" 
              className="outline-1 outline-[#D8D8D8] px-9 py-3 w-[342px] h-12 flex items-center justify-center rounded-[24px] text-[#191919] font-bold"
              >Return to the main menu
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Sheet Drawer */}
      <ComplaintInformationDetails open={drawerOpen} onClose={handleCloseDrawer} />
    </section>
  );
}
