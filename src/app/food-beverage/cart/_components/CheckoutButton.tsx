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
import useCreateCheckout from "@/services/food-beverage/useCheckout";
import { formatRupiah, roundToThousand } from "@/utils";
import { toast } from "react-toastify";
import { CheckoutPayload } from "../_utils/checkout-schema";

interface CheckoutButtonProps {
  onBuildPayload: (
    paymentMethod: "cash" | "charge_to_room" | null
  ) => CheckoutPayload;
  isFormValid: boolean;
}

export default function CheckoutButton({
  onBuildPayload,
  isFormValid,
}: CheckoutButtonProps) {
  const router = useRouter();
  const totalItems = useAppSelector(selectCartItemCount);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  const [openPaymentMethod, setOpenPaymentMethod] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");

  // Checkout mutation
  // const checkoutMutation = useCreateCheckout({
  //   onSuccess: (data) => {
  //     toast.success("Order berhasil dibuat!");
  //     console.log("Checkout success:", data);
  //     router.push("/food-beverage/cart/tracking-order");
  //   },
  //   onError: (error: any) => {
  //     toast.error(error?.response?.data?.message || "Checkout gagal!");
  //     console.error("Checkout error:", error);
  //   },
  // });

  const { mutate, isPending } = useCreateCheckout();

  // Don't show the button if cart is empty
  if (totalItems === 0) {
    return null;
  }

  const roundedTotal = roundToThousand(totalPrice);

  const handleCheckout = () => {
    if (!isFormValid) {
      toast.error("Mohon lengkapi data diri terlebih dahulu");
      return;
    }

    let paymentMethodValue: "cash" | "charge_to_room" | null = null;

    switch (paymentMethodId) {
      case "non-tunai":
        paymentMethodValue = null; // For Midtrans
        break;
      case "cod":
        paymentMethodValue = "cash";
        break;
      case "checkout":
        paymentMethodValue = "charge_to_room";
        break;
      default:
        toast.error("Mohon pilih metode pembayaran");
        return;
    }

    const payload = onBuildPayload(paymentMethodValue);

    console.log("Checkout payload:", payload);

    // Uncomment this when API is ready
    mutate(payload);

    // For now, just navigate (for testing)
    if (paymentMethodId === "non-tunai") {
      console.log("open midtrans gateway");
      // TODO: Open Midtrans payment gateway
    } else {
      // router.push("/food-beverage/cart/tracking-order");
    }
  };

  const handlePaymentOptions = () => {
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
                {paymentMethod || "Pilih metode pembayaran"}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#000",
                }}
              >
                {formatRupiah(roundedTotal)}
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
            disabled={!paymentMethod || !isFormValid || isPending}
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
            {isPending ? "Processing..." : "Checkout order"}
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
