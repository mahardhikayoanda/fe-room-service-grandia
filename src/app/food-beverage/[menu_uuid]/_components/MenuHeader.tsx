"use client";

import React from "react";
import { Box, IconButton, Typography, Chip } from "@mui/material";
import { ArrowLeft, ThumbsUp, Trophy } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import Image from "next/image";
import { formatRupiah } from "@/utils";

interface MenuHeaderProps {
  title: string;
  subtitle?: string;
  image: string;
  isRecommended?: boolean;
  isBestSeller?: boolean;
  price: number;
}

export default function MenuHeader({
  title,
  subtitle,
  image,
  isRecommended = false,
  isBestSeller = false,
  price,
}: MenuHeaderProps) {
  const router = useRouter();

  return (
    <Box className="relative">
      {/* Header Image */}
      <Box className="relative w-full h-[250px] bg-gray-200">
        <Image src={image} alt={title} fill className="object-cover" priority />

        {/* Back Button */}
        <IconButton
          onClick={() => router.back()}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm hover:bg-white"
          sx={{
            width: 40,
            height: 40,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <ArrowLeft size={20} className="text-gray-800" />
        </IconButton>
      </Box>

      {/* Title Section */}
      <Box className="px-6 py-4 bg-white">
        <Box className="flex items-start justify-between mb-2">
          <Typography variant="h5" className="font-bold text-gray-900">
            {title}
          </Typography>
        </Box>
        {isBestSeller && (
          <div className="flex items-center w-fit gap-2 my-2 px-2 py-1 font-bold rounded-sm text-[#67527A] bg-[#F2F0F5]">
            <Trophy size={16} />
            <p className="text-[12px]">Best Seller</p>
          </div>
        )}

        {isRecommended && (
          <div className="flex items-center w-fit gap-2 my-2 px-2 py-1 font-bold rounded-sm text-primary bg-[#F4F0F0]">
            <ThumbsUp size={16} />
            <p className="text-[12px]">Recommended</p>
          </div>
        )}
        {subtitle && (
          <Typography variant="body2" className="text-gray-600 mb-2">
            {subtitle}
          </Typography>
        )}

        <Box className="text-2xl font-bold text-gray-900">
          {formatRupiah(price)}
        </Box>
      </Box>
    </Box>
  );
}
