"use client";

import { Box, Button, Typography } from "@mui/material";
import { ChevronRight } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/libs/hooks/useRedux";
import {
  selectCartItemCount,
  selectCartTotalPrice,
} from "@/libs/store/slices/cartSlice";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import PaymentMethodModal from "./PaymentMethodModal";
import useCreateCheckout from "@/services/order/useCreateCheckoutOrder";
import { formatRupiah, roundToThousand } from "@/utils";
import { toast } from "react-toastify";
import { clearCart } from "@/libs/store/slices/cartSlice";
import { CheckoutPayload } from "../_utils/checkout-schema";
import { saveCustomerPhone } from "@/utils/customerPhone";

interface CheckoutButtonProps {
  onBuildPayload: (
    paymentMethod: "cash" | "charge_to_room" | null,
  ) => CheckoutPayload;
  isFormValid: boolean;
  onPendingPaymentChange?: (hasPending: boolean) => void;
  finalPrice?: number;
}

export default function CheckoutButton({
  onBuildPayload,
  isFormValid,
  onPendingPaymentChange,
  finalPrice,
}: CheckoutButtonProps) {
  const router = useRouter();
  const totalItems = useAppSelector(selectCartItemCount);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  // Use finalPrice if provided, otherwise use totalPrice
  const displayPrice = finalPrice !== undefined ? finalPrice : totalPrice;

  const [openPaymentMethod, setOpenPaymentMethod] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [pendingPayment, setPendingPayment] = useState<{
    snap_token: string;
    order_uuid: string;
  } | null>(null);

  const dispatch = useAppDispatch();

  // Check for pending payment on mount
  useEffect(() => {
    const pending = localStorage.getItem("pending_payment");
    if (pending) {
      try {
        const data = JSON.parse(pending);
        setPendingPayment(data);
        if (onPendingPaymentChange) {
          onPendingPaymentChange(true);
        }
      } catch (e) {
        console.error("Failed to parse pending payment:", e);
        localStorage.removeItem("pending_payment");
      }
    }
  }, [onPendingPaymentChange]);

  // Notify parent when pending payment changes
  useEffect(() => {
    if (onPendingPaymentChange) {
      onPendingPaymentChange(!!pendingPayment);
    }
  }, [pendingPayment, onPendingPaymentChange]);

  // Load Midtrans Snap script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "",
    );
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Checkout mutation
  const { mutate, isPending } = useCreateCheckout({
    onSuccess: (response, variables) => {
      toast.success("Order berhasil dibuat!");

      if (variables.phone_number?.trim()) {
        saveCustomerPhone(variables.phone_number);
      }

      // Navigate based on payment method
      if (paymentMethodId === "non-tunai" && response.data?.snap_token) {
        // Save to localStorage for retry payment
        const paymentData = {
          snap_token: response.data.snap_token,
          order_uuid: response.data.order.uuid,
        };
        localStorage.setItem("pending_payment", JSON.stringify(paymentData));
        setPendingPayment(paymentData);

        // Open Snap UI
        openSnapPayment(response.data.snap_token, response.data.order.uuid);
      } else {
        // For cash or charge to room - clear cart then go to tracking order
        try {
          dispatch(clearCart());
        } catch (e) {
          console.warn("Failed to clear cart after checkout success", e);
        }
        router.push(`/food-beverage/cart/${response.data.order.uuid}`);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Checkout gagal!");
      console.error("Checkout error:", error);
    },
  });

  // Function to open Snap payment UI
  const openSnapPayment = (snapToken: string, orderUuid: string) => {
    const snapInstance = (window as any).snap;
    if (snapInstance) {
      snapInstance.pay(snapToken, {
        onSuccess: function (result: any) {
          console.log("Payment success:", result);
          toast.success("Payment successful!");

          // Clear pending payment from localStorage
          localStorage.removeItem("pending_payment");
          setPendingPayment(null);

          // clear cart only after real payment success for non-tunai
          try {
            dispatch(clearCart());
          } catch (e) {
            console.warn("Failed to clear cart after payment success", e);
          }
          // Navigate to tracking order after successful payment
          router.push(`/food-beverage/cart/${orderUuid}`);
        },
        onPending: function (result: any) {
          console.log("Payment pending:", result);
          toast.info("Waiting for payment...");
          // Don't clear pending payment, user can retry
        },
        onError: function (result: any) {
          console.log("Payment error:", result);
          toast.error("Payment failed!");
          // Don't clear pending payment, user can retry
        },
        onClose: function () {
          console.log("Payment popup closed");
          // Don't navigate, user can retry payment
          toast.info("Anda dapat melanjutkan pembayaran kapan saja");
        },
      });
    } else {
      toast.error("Midtrans Snap is not loaded yet. Please try again.");
    }
  };

  // Handle continue payment
  const handleContinuePayment = () => {
    if (pendingPayment) {
      openSnapPayment(pendingPayment.snap_token, pendingPayment.order_uuid);
    }
  };

  // Handle cancel pending payment
  const handleCancelPendingPayment = () => {
    localStorage.removeItem("pending_payment");
    setPendingPayment(null);
    toast.info("Pembayaran dibatalkan");
  };

  // Don't show the button if cart is empty
  if (totalItems === 0) {
    return null;
  }

  const roundedTotal = roundToThousand(displayPrice);

  const handleCheckout = () => {
    if (!isFormValid) {
      toast.error("Please complete your personal data first");
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

    // Submit checkout - navigation will be handled in onSuccess callback
    mutate(payload);
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
              disabled={!!pendingPayment}
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
                "&:disabled": {
                  color: "#999",
                  cursor: "not-allowed",
                },
              }}
            >
              Payment options
            </Button>
          </Box>

          {/* Pending Payment Alert */}
          {pendingPayment && (
            <Box
              sx={{
                mb: 2,
                p: 1.5,
                borderRadius: 2,
                bgcolor: "#FEF3C7",
                border: "1px solid #FCD34D",
              }}
            >
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#92400E",
                  mb: 0.5,
                }}
              >
                Pembayaran Belum Selesai
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#92400E",
                }}
              >
                Anda memiliki pembayaran yang belum diselesaikan
              </Typography>
            </Box>
          )}

          {/* Checkout Button - Changes based on pending payment */}
          {pendingPayment ? (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                fullWidth
                onClick={handleCancelPendingPayment}
                sx={{
                  bgcolor: "transparent",
                  color: "#4F3534",
                  py: 1,
                  borderRadius: 8,
                  fontSize: "16px",
                  fontWeight: 500,
                  textTransform: "none",
                  mb: 1,
                  border: "1px solid #4F3534",
                  "&:hover": {
                    bgcolor: "rgba(79, 53, 52, 0.05)",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                fullWidth
                onClick={handleContinuePayment}
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
                    bgcolor: "#3d2a29",
                  },
                }}
              >
                Continue Payment
              </Button>
            </Box>
          ) : (
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
          )}
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
