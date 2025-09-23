"use client";

import React, { useEffect, useState } from "react";
import FilterFoodBeverage from "./_components/FilterFoodBeverage";
import MenuList from "./_components/MenuList";
import BackHeader from "@/components/BackHeader";
import TextInput from "@/components/form/TextInput";
import { Fade, InputAdornment, Typography } from "@mui/material";
import { Search } from "lucide-react";
import { useScrolled } from "@/libs/hooks/useScrolled";

export default function FoodBeveragePage() {
  const [filterValue, setFilterValue] = useState<string>("food");
  const [searchValue, setSearchValue] = useState<string>("");

  const isScrolled = useScrolled(5);

  // clear searchValue when filterValue changes
  useEffect(() => {
    setSearchValue("");
  }, [filterValue]);

  // handle clear searchValue
  const handleClearSearch = () => {
    setSearchValue("");
  };

  return (
    <div className="w-full min-h-screen relative min-w-sm">
      {/* F&B header */}
      <div
        className={`sticky top-0 z-10 flex flex-col gap-3 bg-white px-6 pt-4 pb-4 transition-shadow duration-150 ease-in-out ${isScrolled ? "shadow-md" : "shadow-none"}`}
      >
        <BackHeader title="Food & Beverage" />
        <div className="flex items-center gap-2">
          <TextInput
            size="small"
            name="search"
            fullWidth
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
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
          {searchValue && (
            <Fade in={!!searchValue} timeout={300}>
              <Typography
                onClick={handleClearSearch}
                sx={{
                  fontWeight: "600",
                  color: "#4F3534",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </Typography>
            </Fade>
          )}
        </div>
      </div>

      {/* F&B filter */}
      {searchValue === "" && (
        <FilterFoodBeverage
          filterValue={filterValue}
          onFilterValue={setFilterValue}
        />
      )}

      {/* F&B items list */}
      <section className="flex flex-col items-center justify-center bg-black/25">
        <div className="w-full min-h-screen bg-white">
          <MenuList filterValue={filterValue} searchValue={searchValue} />
        </div>
      </section>

      {/* F&B cart button */}
      {/* <ChartButton /> */}
    </div>
  );
}
