"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { Trophy, ThumbsUp } from "lucide-react";
import AddMenuButton from "./AddMenuButton";
import { formatRupiah } from "@/utils";
import AnimatedItem from "@/components/framer-motion/AnimatedItem";
import { ProductType } from "@/types/product.type";

interface MenuCardProps {
  item: ProductType;
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
          {/* price */}
          <Box>
            {item.selling_price < item.base_price && (
              <Typography
                variant="body2"
                className="px-1 py-0.5 rounded-sm text-red-700 bg-red-200 w-fit mb-0.5"
                sx={{ fontSize: "10px", fontWeight: "bold" }}
              >
                Promo
              </Typography>
            )}
            <Typography
              sx={{
                fontWeight: 700,
                color: "#000",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {formatRupiah(item.selling_price)}
              {item.selling_price < item.base_price && (
                <span className="line-through text-gray-500 mr-2 text-sm">
                  {item.base_price}
                </span>
              )}
            </Typography>
          </Box>

          <AddMenuButton
            menuUuid={item.uuid}
            titleMenu={item.name}
            priceMenu={item.selling_price}
          />
        </div>

        {!isLastItem && <hr className="mx-4 border-t border-gray-300" />}
      </div>
    </AnimatedItem>
  );
}
