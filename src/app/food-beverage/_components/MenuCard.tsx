"use client";

import { Typography } from "@mui/material";
import Image from "next/image";
import { Trophy, ThumbsUp } from "lucide-react";
import AddMenuButton from "./AddMenuButton";
import { formatRupiah } from "@/utils";
import AnimatedItem from "@/components/framer-motion/AnimatedItem";

interface MenuCardProps {
  item: {
    uuid: string;
    name: string;
    description: string;
    price: number;
    image: {
      url: string;
    };
    is_best_seller: boolean;
    is_recommended: boolean;
  };
  index: number;
  isLastItem: boolean;
}

export default function MenuCard({ item, index, isLastItem }: MenuCardProps) {
  return (
    <AnimatedItem delay={index * 0.05}>
      <div className="flex flex-col gap-0">
        <div className="flex flex-row-reverse justify-center gap-4 mt-4">
          <div className="w-[90px] h-[90px] relative">
            <Image
              src={item.image.url}
              alt={item.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain rounded-xl"
            />
          </div>

          <div className="flex-1">
            <Typography
              sx={{ fontWeight: 700, color: "#000", fontSize: "14px" }}
            >
              {item.name}
            </Typography>

            {item.is_best_seller && (
              <div className="flex items-center w-fit gap-2 my-1 px-2 py-1 rounded-sm text-[#67527A] bg-[#F2F0F5]">
                <Trophy size={16} />
                <p className="text-[12px]">Best Seller</p>
              </div>
            )}

            {item.is_recommended && (
              <div className="flex items-center w-fit gap-2 my-1 px-2 py-1 rounded-sm text-primary bg-[#F4F0F0]">
                <ThumbsUp size={16} />
                <p className="text-[12px]">Recommended</p>
              </div>
            )}

            <Typography
              sx={{
                mt: "4px",
                fontWeight: 400,
                color: "#000",
                fontSize: "12px",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.description}
            </Typography>
          </div>
        </div>

        <div className="flex justify-between items-center my-4">
          <Typography sx={{ fontWeight: 700, color: "#000", fontSize: "16px" }}>
            {formatRupiah(item.price)}
          </Typography>

          <AddMenuButton
            menuUuid={item.uuid}
            titleMenu={item.name}
            priceMenu={item.price}
          />
        </div>

        {!isLastItem && <hr className="mx-4 border-t border-gray-300" />}
      </div>
    </AnimatedItem>
  );
}
