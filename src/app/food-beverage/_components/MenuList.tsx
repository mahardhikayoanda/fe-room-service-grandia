"use client";

import { menusDummyData } from "@/libs/data/menuDummyData";
import Image from "next/image";
import AddMenuButton from "./AddMenuButton";
import { Typography } from "@mui/material";
import { categoryMenus } from "./FilterFoodBeverage";
import { SearchX, ThumbsUp, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedItem from "@/components/framer-motion/AnimatedItem";
import BottomSheet from "@/components/BottomSheet";

interface Props {
  filterValue: string;
  searchValue: string;
}

export default function MenuList({ filterValue, searchValue }: Props) {
  // get categoryMenus from FilterFoodBeverage.tsx
  const selectedCategory = categoryMenus.find(
    (cat) => cat.name.toLowerCase() === filterValue.toLowerCase()
  );

  // filter menusDummyData based on filterValue and searchValue
  let filteredItems = menusDummyData;

  if (searchValue) {
    filteredItems = menusDummyData.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  } else {
    filteredItems = menusDummyData.filter(
      (item) => item.category.toLowerCase() === filterValue.toLowerCase()
    );
  }

  return (
    <>
      <div
        // className={`${filteredItems.length === 0 ? "bg-black/50" : ""} px-6 py-4 min-h-screen`}
        className={`px-6 py-4 min-h-screen`}
      >
        <div
          className={`${searchValue ? "hidden" : ""} flex items-center gap-1`}
        >
          <Image
            src={selectedCategory?.image || "/images/f_and_b/food.png"}
            alt="Food & Beverage Banner"
            width={200}
            height={200}
            className="w-8 h-8 object-cover rounded-full mr-1"
          />
          <Typography
            sx={{
              fontWeight: "700",
              color: "#000000",
              fontSize: "16px",
            }}
          >
            {selectedCategory?.name} Menu
          </Typography>
          <Typography
            sx={{
              fontWeight: "700",
              color: "#000000",
              fontSize: "16px",
            }}
          >
            |
          </Typography>
          <Typography
            sx={{
              fontWeight: "400",
              color: "#4C4C4C",
              fontSize: "14px",
            }}
          >
            {" "}
            {filteredItems.length} items
          </Typography>
        </div>

        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <SearchX size={100} className="text-primary mb-4" />
            <Typography
              sx={{
                fontWeight: "700",
                color: "#000000",
                fontSize: "16px",
              }}
            >
              No items found
            </Typography>
            <Typography
              sx={{
                mt: "4px",
                fontWeight: "400",
                color: "#000000",
                fontSize: "12px",
              }}
            >
              We couldn't find any menu items matching your search.
            </Typography>
          </div>
        )}

        <div className="flex flex-col">
          {filteredItems.map((item, index) => (
            <AnimatedItem key={item.uuid} delay={index * 0.05}>
              <div className="flex flex-col gap-0">
                <div className="flex flex-row-reverse justify-center gap-4 mt-4">
                  <div className="w-[90px] h-[90px] relative">
                    <Image
                      src={item.image.url}
                      alt={item.name}
                      fill
                      className="object-contain rounded-xl"
                    />
                  </div>

                  <div className="flex-1">
                    <Typography
                      sx={{ fontWeight: 700, color: "#000", fontSize: "14px" }}
                    >
                      {item.name}
                    </Typography>

                    {item.best_seller && (
                      <div className="flex items-center w-fit gap-2 my-1 px-2 py-1 rounded-sm text-[#67527A] bg-[#F2F0F5]">
                        <Trophy size={16} />
                        <p className="text-[12px]">Best Seller</p>
                      </div>
                    )}

                    {item.recommended && (
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
                      }}
                    >
                      {item.description}
                    </Typography>
                  </div>
                </div>

                <div className="flex justify-between items-center my-4">
                  <Typography
                    sx={{ fontWeight: 700, color: "#000", fontSize: "16px" }}
                  >
                    {item.price}
                  </Typography>

                  <AddMenuButton titleMenu={item.name} priceMenu={item.price} />
                </div>

                {index !== filteredItems.length - 1 && (
                  <hr className="mx-4 border-t border-gray-300" />
                )}
              </div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </>
  );
}
