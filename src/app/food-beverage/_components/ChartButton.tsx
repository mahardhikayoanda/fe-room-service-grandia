"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useAppSelector } from "@/libs/hooks/useRedux";
import {
  selectCartItemCount,
  selectCartTotalPrice,
} from "@/libs/store/slices/cartSlice";

export default function ChartButton() {
  const router = useRouter();
  const totalItems = useAppSelector(selectCartItemCount);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  // Don't show the button if cart is empty
  if (totalItems === 0) {
    return null;
  }

  const handleViewCart = () => {
    router.push("/food-beverage/cart");
  };

  return (
    <Box
      component="section"
      sx={{
        boxShadow: 3,
      }}
    >
      <Box
        component="nav"
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "24rem",
            mx: "auto",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "#4F3534",
              my: 3,
              mx: 2,
              p: 2,
              borderRadius: 4,
              color: "white",
            }}
          >
            <Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                }}
              >
                Your Cart
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.875rem",
                }}
              >
                {totalItems} {totalItems === 1 ? "item" : "items"} - Rp{" "}
                {totalPrice.toLocaleString("id-ID")}
              </Typography>
            </Box>

            <Button
              onClick={handleViewCart}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 1,
                bgcolor: "black",
                borderRadius: 2,
                cursor: "pointer",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#1f2937",
                },
                transition: "background-color 0.2s",
              }}
            >
              <Image src="/icons/Cart.svg" alt="Cart" width={16} height={16} />
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "white",
                }}
              >
                View Cart
              </Typography>
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
