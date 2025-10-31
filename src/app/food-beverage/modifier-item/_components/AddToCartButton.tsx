"use client";

import React from "react";
import { Button, Box, Typography } from "@mui/material";

interface AddToCartButtonProps {
  price: number;
  onClick: () => void;
  disabled?: boolean;
}

export default function AddToCartButton({
  price,
  onClick,
  disabled = false,
}: AddToCartButtonProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Box className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <Button
        fullWidth
        variant="contained"
        onClick={onClick}
        disabled={disabled}
        sx={{
          backgroundColor: "#5B2C91",
          color: "white",
          padding: "14px 24px",
          borderRadius: "12px",
          textTransform: "none",
          fontSize: "16px",
          fontWeight: 600,
          boxShadow: "0 4px 12px rgba(91, 44, 145, 0.2)",
          "&:hover": {
            backgroundColor: "#4A2373",
          },
          "&:disabled": {
            backgroundColor: "#9CA3AF",
            color: "white",
          },
        }}
      >
        <Box className="flex items-center justify-between w-full">
          <Typography className="font-semibold text-white">
            Add to cart
          </Typography>
          <Typography className="font-bold text-white">
            {formatPrice(price)}
          </Typography>
        </Box>
      </Button>
    </Box>
  );
}
