"use client";

import React, { useState } from "react";
import SearchFilterFoodBeverage from "./_components/SearchFilterFoodBeverage";
import MenuList from "./_components/MenuList";
import ChartButton from "./_components/ChartButton";

export default function FoodBeveragePage() {
  const [filter, setFilter] = useState<string>("All");

  return (
    <div>
      {/* F&B header, search and filter */}
      <SearchFilterFoodBeverage filter={filter} setFilter={setFilter} />

      {/* F&B items list */}
      <section className="flex flex-col items-center justify-center bg-black/25">
        <div className="w-[390px] min-h-screen bg-white pt-80 pb-40">
          <MenuList filter={filter} />
        </div>
      </section>

      {/* F&B cart button */}
      <ChartButton />
    </div>
  );
}
