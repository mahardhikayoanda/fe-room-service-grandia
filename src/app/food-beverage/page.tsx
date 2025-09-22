"use client";

import React, { useState } from "react";
import FilterFoodBeverage from "./_components/FilterFoodBeverage";
import MenuList from "./_components/MenuList";
import ChartButton from "./_components/ChartButton";
import BackHeader from "@/components/BackHeader";
import TextInput from "@/components/form/TextInput";
import { InputAdornment } from "@mui/material";
import { Search } from "lucide-react";

export default function FoodBeveragePage() {
  const [filterValue, setFilterValue] = useState<string>("food");
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div className="min-h-screen relative">
      {/* F&B header */}
      <div className="sticky top-0 z-10 flex flex-col gap-3 bg-white px-4 pt-4 pb-4">
        <BackHeader title="Food & Beverage" />
        <TextInput
          size="small"
          name="search"
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full"
          placeholder="Cari makanan, minuman, atau dessert"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={"16px"} className="text-[#7F7F7F]" />
                </InputAdornment>
              ),
              className: "rounded-lg bg-[#F2F2F2]",
            },
          }}
        />
      </div>

      {/* F&B filter */}
      <FilterFoodBeverage
        filterValue={filterValue}
        onFilterValue={setFilterValue}
      />

      {/* F&B items list */}
      <section className="flex flex-col items-center justify-center bg-black/25">
        <div className="w-full min-h-screen bg-white">
          <MenuList filterValue={filterValue} />
        </div>
      </section>

      {/* F&B cart button */}
      {/* <ChartButton /> */}
    </div>
  );
}
