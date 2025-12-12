"use client";

import Image from "next/image";
import { Typography } from "@mui/material";
import { SearchX } from "lucide-react";
import { CategoryType } from "@/types/category.type";
import useGetProducts from "@/services/food-beverage/useGetProducts";
import MenuCard from "./MenuCard";

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
              key={selectedCategory.uuid}
              src={selectedCategory?.photo?.url || "/images/f_and_b/food.png"}
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
              {(productData?.data?.length ?? 0) > 1 ? "items" : "item"}
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
          {/* menu card */}
          {productData?.data?.map((item, index) => (
            <MenuCard
              key={item.uuid}
              item={item}
              index={index}
              isLastItem={index === (productData?.data?.length ?? 0) - 1}
            />
          ))}
        </div>
      </div>
    </>
  );
}
