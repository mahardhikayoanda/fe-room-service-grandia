"use client";

import {
  Box,
  Card,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";

type CategoryMenus = {
  id: string;
  name: string;
  items: number;
  image: string;
};

type Props = {
  filterValue: string;
  onFilterValue: (filter: string) => void;
};

export const categoryMenus: CategoryMenus[] = [
  {
    id: "food",
    name: "Food",
    items: 24,
    image: "/images/f_and_b/food.png",
  },
  {
    id: "drink",
    name: "Drink",
    items: 12,
    image: "/images/f_and_b/drink.png",
  },
  {
    id: "dessert",
    name: "Dessert",
    items: 16,
    image: "/images/f_and_b/dessert.png",
  },
];

export default function FilterFoodBeverage({
  filterValue,
  onFilterValue,
}: Props) {
  const currentFilter = filterValue || "food";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterValue(event.target.value);
  };

  useEffect(() => {
    if (!filterValue) {
      onFilterValue("food");
    }
  }, [filterValue, onFilterValue]);

  return (
    <Box sx={{ px: 2, pb: 2, background: "white", mb: 2 }}>
      <Typography
        variant="body1"
        sx={{
          mb: "12px",
          fontWeight: "700",
          fontSize: "16px",
          color: "text.primary",
        }}
      >
        Select Category
      </Typography>
      <RadioGroup value={currentFilter} onChange={handleChange}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          {categoryMenus.map((cat) => (
            <FormControlLabel
              key={cat.id}
              value={cat.id}
              control={<Radio sx={{ display: "none" }} />}
              label={
                <Card
                  elevation={0}
                  sx={{
                    width: "100%",
                    cursor: "pointer",
                    overflow: "hidden",
                    borderRadius: 2,
                    border: "2px solid",
                    borderColor:
                      currentFilter === cat.id ? "#A67472" : "#FFFFFF",
                    backgroundColor:
                      currentFilter === cat.id ? "#A67472" : "#FFFFFF",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                      transform: "translateY(-1px)",
                    },
                    ...(currentFilter === cat.id && {
                      boxShadow: "0 8px 25px rgba(166,124,82,0.3)",
                    }),
                  }}
                >
                  <Box sx={{ alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 106,
                        height: 57,
                        position: "relative",
                        backgroundColor: "#f5f5f5",
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={cat.image || "/placeholder.svg"}
                        alt={cat.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                    <div className="p-2">
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "600",
                          color:
                            currentFilter === cat.id ? "white" : "text.primary",
                          fontSize: "12px",
                        }}
                      >
                        {cat.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            currentFilter === cat.id
                              ? "rgba(255,255,255,0.8)"
                              : "text.secondary",
                          fontSize: "12px",
                          mb: 0,
                        }}
                      >
                        {cat.items} items
                      </Typography>
                    </div>
                  </Box>
                </Card>
              }
              sx={{ m: 0, width: "100%" }}
            />
          ))}
        </Box>
      </RadioGroup>
    </Box>
  );
}
