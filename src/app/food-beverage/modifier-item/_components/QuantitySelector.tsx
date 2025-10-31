"use client";

import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}: QuantitySelectorProps) {
  return (
    <Box className="flex items-center justify-between pb-4 bg-white">
      <Typography variant="body1" className="font-semibold text-gray-900">
        Quantity
      </Typography>

      <Box className="flex items-center gap-1">
        <IconButton
          onClick={onDecrease}
          disabled={quantity <= 1}
          sx={{
            width: 28,
            height: 28,
            padding: 0,
            borderRadius: "50%",
            border: "1px solid #4F3534",
            backgroundColor: "white",
            color: "#6B7280",
            "&:hover": {
              backgroundColor: "#F9FAFB",
              borderColor: "#D1D5DB",
            },
            "&:disabled": {
              opacity: 0.5,
              borderColor: "#E5E7EB",
            },
          }}
        >
          <Minus size={20} strokeWidth={2.5} />
        </IconButton>

        <Typography className="font-semibold text-base text-gray-900 min-w-[30px] text-center">
          {quantity}
        </Typography>

        <IconButton
          onClick={onIncrease}
          sx={{
            width: 28,
            height: 28,
            padding: 0,
            borderRadius: "50%",
            border: "1px solid #4F3534",
            backgroundColor: "white",
            color: "#6B7280",
            "&:hover": {
              backgroundColor: "#F9FAFB",
              borderColor: "#D1D5DB",
            },
          }}
        >
          <Plus size={20} strokeWidth={2.5} className="text-[#4F3534]" />
        </IconButton>
      </Box>
    </Box>
  );
}
