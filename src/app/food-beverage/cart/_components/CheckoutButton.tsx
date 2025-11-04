"use client";

import { Box, Button, Typography } from "@mui/material";
import { ChevronRight } from "lucide-react";
import { useAppSelector } from "@/libs/hooks/useRedux";
import {
  selectCartItemCount,
  selectCartTotalPrice,
} from "@/libs/store/slices/cartSlice";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import PaymentMethodModal from "./PaymentMethodModal";

export default function CheckoutButton() {
  const router = useRouter();
  const totalItems = useAppSelector(selectCartItemCount);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  const [openPaymentMethod, setOpenPaymentMethod] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");

  // Don't show the button if cart is empty
  if (totalItems === 0) {
    return null;
  }

  const handleCheckout = () => {
    switch (paymentMethodId) {
      case "non-tunai":
        console.log("open midtrans gateway");
        break;
      case "cod":
        router.push("/food-beverage/cart/tracking-order");
        break;
      case "checkout":
        router.push("/food-beverage/cart/tracking-order");
        break;
      default:
        console.log("No payment method selected");
    }
  };

  const handlePaymentOptions = () => {
    // TODO: Navigate to payment options
    setOpenPaymentMethod(true);
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "white",
          maxWidth: 384,
          mx: "auto",
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2,
          }}
        >
          {/* Total Price and Payment Options */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#000",
                }}
              >
                {paymentMethod}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#000",
                }}
              >
                Rp{totalPrice.toLocaleString("id-ID")}
              </Typography>
            </Box>

            <Button
              onClick={handlePaymentOptions}
              endIcon={<ChevronRight size={20} />}
              sx={{
                textTransform: "none",
                color: "#1976d2",
                fontWeight: 600,
                fontSize: "14px",
                p: 0,
                minWidth: "auto",
                "&:hover": {
                  bgcolor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              Payment options
            </Button>
          </Box>

          {/* Checkout Button */}
          <Button
            fullWidth
            onClick={handleCheckout}
            disabled={!paymentMethod}
            sx={{
              bgcolor: "#4F3534",
              color: "white",
              py: 1,
              borderRadius: 8,
              fontSize: "16px",
              fontWeight: 500,
              textTransform: "none",
              mb: 1,
              "&:hover": {
                bgcolor: "#4F3534",
              },
              "&:disabled": {
                bgcolor: "#E8E8E8",
                color: "#999",
              },
            }}
          >
            Checkout order
          </Button>
        </Box>
      </Box>

      <PaymentMethodModal
        open={openPaymentMethod}
        onClose={() => setOpenPaymentMethod(false)}
        onSelectPaymentTitle={(method) => {
          setPaymentMethod(method);
        }}
        onSelectPaymentId={(methodId) => {
          setPaymentMethodId(methodId);
        }}
      />
    </>
  );
}
