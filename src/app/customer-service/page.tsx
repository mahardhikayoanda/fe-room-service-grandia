"use client";
import React, { useState } from "react";
import Image from "next/image";
import FormTypeDrawer from "./_components/test";
import Link from "next/link";

export default function CustomerServicePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [formType, setFormType] = useState("");
  const [complaint, setComplaint] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const isFormValid = name && phone && formType && complaint && file;

  return (
    <section>
      <div className="bg-[#FFFFFF]">
        <div className="bg-[#F2F2F2] w-[390px] h-[766px] flex flex-col">
          <div className="flex flex-row bg-white px-6 py-4 gap-2">
            <Image
              src="/icons/Arrow.svg"
              alt="Back"
              width={16}
              height={16}
              className="pb-5"
            />
            <div>
              <p className="font-bold text-[#191919]">Customer Service</p>
              <p className="text-[#4C4C4C]">Complaint/request from room 120</p>
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-6 px-6 pt-3 pb-6 mt-4 bg-white">
            <p className="text-[#191919] font-bold">Form Filling</p>

            {/* Full Name */}
            <div className="bg-[#FAFAFA] py-2 px-3 rounded-[12px]">
              <div className="flex gap-1 items-center mb-1">
                <p className="text-[#7F7F7F]">Full Name</p>
                <span className="text-red-500">*</span>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Image src="/icons/User.svg" alt="User" width={16} height={16} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent outline-none text-black placeholder:text-[#B2B2B2]"
                  placeholder="Enter full name"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="bg-[#FAFAFA] py-2 px-3 rounded-[12px]">
              <div className="flex gap-1 items-center mb-1">
                <p className="text-[#7F7F7F]">Phone Number</p>
                <span className="text-red-500">*</span>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Image src="/icons/Phone.svg" alt="Phone" width={16} height={16} />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-transparent outline-none text-black placeholder:text-[#B2B2B2]"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {/* Form Type */}
            <div className="bg-[#FAFAFA] py-2 px-3 rounded-[12px]">
              <div className="flex gap-1 items-center mb-1">
                <p className="text-[#7F7F7F]">Form Type</p>
                <span className="text-red-500">*</span>
              </div>
              <FormTypeDrawer value={formType} onChange={setFormType} />
            </div>

            
            <div className="bg-[#FAFAFA] py-2 px-3 rounded-[12px]">
              <div className="flex gap-1 items-center mb-1">
                <p className="text-[#7F7F7F]">Request/Complaint</p>
                <span className="text-red-500">*</span>
              </div>
              <textarea
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                className="w-full h-[122px] rounded px-3 py-2 bg-transparent outline-none text-black placeholder:text-[#B2B2B2]"
                placeholder="Enter request/complaint message"
              />
            </div>

            <label className="w-full h-[154px] border-2 border-dashed border-gray-300 rounded-[12px] flex flex-col items-center justify-center cursor-pointer">
              {file ? (
                <>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="Uploaded"
                    width={60}
                    height={60}
                    className="rounded"
                  />
                  <p className="text-black font-medium">
                    Change the photo for requests or complaints
                  </p>
                </>
              ) : (
                <>
                  <Image src="/icons/image-plus.svg" alt="Upload" width={48} height={48} />
                  <p className="text-black font-medium">
                    Upload photo request or complaint
                  </p>
                  <p className="text-gray-400 text-sm">Click to select an image</p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) setFile(e.target.files[0]);
                }}
              />
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6 py-6 bg-white">
            {isFormValid ? (
            <Link
              href="customer-service/complaint" 
              className="w-[342px] h-[48px] flex items-center justify-center rounded-full font-semibold bg-[#5B3C2E] text-white"
            >
              Submit
            </Link>
          ) : (
            <button
              disabled
              className="w-[342px] h-[48px] rounded-full font-semibold bg-[#D9C9C9] text-white cursor-not-allowed"
            >
              Submit
            </button>
          )}

          </div>
        </div>
      </div>
    </section>
  );
}
