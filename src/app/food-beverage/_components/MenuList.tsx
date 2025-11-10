"use client";

import { menusDummyData } from "@/libs/data/menuDummyData";
import Image from "next/image";
import AddMenuButton from "./AddMenuButton";
import { Typography } from "@mui/material";
// import { categoryMenus } from "./FilterFoodBeverage";
import { SearchX, ThumbsUp, Trophy } from "lucide-react";
import AnimatedItem from "@/components/framer-motion/AnimatedItem";
import { CategoryType } from "@/types/category.type";
import useGetProducts from "@/services/food-beverage/useGetProducts";

interface Props {
  filterValue: string;
  searchValue: string;
  categoryData?: CategoryType[];
}

export default function MenuList({
  filterValue,
  searchValue,
  categoryData,
}: Props) {
  const { data: productData, isLoading } = useGetProducts({
    params: {
      product_category_uuid: filterValue || "",
      search_param: searchValue || "",
    },
  });

  // get categoryMenus from FilterFoodBeverage.tsx
  const selectedCategory = categoryData?.find(
    (cat) => cat.uuid === filterValue
  );

  return (
    <>
      <div
        // className={`${filteredItems.length === 0 ? "bg-black/50" : ""} px-6 py-4 min-h-screen`}
        className={`px-6 py-4 min-h-screen ${(productData?.data?.length ?? 0) >= 3 ? "mb-24" : "mb-0"}`}
      >
        {!searchValue && selectedCategory && (
          <div className={`flex items-center gap-1`}>
            <Image
              src={selectedCategory?.photo.url || "/images/f_and_b/food.png"}
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
              {productData?.data?.length} items
            </Typography>
          </div>
        )}

        {searchValue && (
          <div className="flex items-center gap-1 mb-3">
            <Typography
              sx={{
                fontWeight: "700",
                color: "#000000",
                fontSize: "16px",
              }}
            >
              Search Results
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
              {productData?.data?.length} items found
            </Typography>
          </div>
        )}

        {!searchValue && !filterValue && (
          <div className="flex items-center gap-1 mb-3">
            <Typography
              sx={{
                fontWeight: "700",
                color: "#000000",
                fontSize: "16px",
              }}
            >
              All Menu
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
              {productData?.data?.length} items
            </Typography>
          </div>
        )}

        {productData?.data?.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
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

        <div className={`flex flex-col`}>
          {productData?.data?.map((item, index) => (
            <AnimatedItem key={item.uuid} delay={index * 0.05}>
              {/* tambahkan pb-20 pada card index terakhir */}
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
                        WebkitLineClamp: 3,
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
                  <Typography
                    sx={{ fontWeight: 700, color: "#000", fontSize: "16px" }}
                  >
                    {item.price}
                  </Typography>

                  <AddMenuButton
                    menuUuid={item.uuid}
                    titleMenu={item.name}
                    priceMenu={item.price}
                  />
                </div>

                {index !== productData?.data?.length - 1 && (
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
