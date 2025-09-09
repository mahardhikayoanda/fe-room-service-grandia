"use client";

import React, { useState } from "react";
import SearchFilterFoodBeverage from "./_components/SearchFilterFoodBeverage";
import MenuList from "./_components/MenuList";
import ChartButton from "./_components/ChartButton";
import BackHeader from "@/components/BasicHeader";

export default function FoodBeveragePage() {
  const [filter, setFilter] = useState<string>("All");

  return (
    <div className=" border border-blue-500">
      {/* F&B header, search and filter */}
      <SearchFilterFoodBeverage filter={filter} setFilter={setFilter} />

      {/* F&B items list */}
      <section className="flex flex-col items-center justify-center bg-black/25">
        <div className="w-full min-h-screen bg-white">
          <MenuList filter={filter} />
        </div>
      </section>

      {/* F&B cart button */}
      <ChartButton />
    </div>
  );
}
