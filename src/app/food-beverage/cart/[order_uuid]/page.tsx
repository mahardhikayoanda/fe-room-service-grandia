"use client";

import BackHeader from "@/components/BackHeader";
import { useScrolled } from "@/libs/hooks/useScrolled";
import React, { use, useEffect } from "react";
import { Box, Button, Typography, Divider, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import DeliveryRoomInfo from "./_components/DeliveryRoomInfo";
import OrderStatus from "./_components/OrderStatus";
import BackNavigationConfirm from "./_components/BackNavigationConfirm";
import OrderCard from "./_components/OrderCard";
import OrderInfoNumber from "./_components/OrderInfoNumber";
import useGetOrder from "@/services/order/useGetOrder";
import { formatRupiah } from "@/utils";
import { toast } from "react-toastify";
import useNotificationStore from "@/lib/zustand/notification.store";
import { saveCustomerPhone } from "@/utils/customerPhone";

export default function TrackingOrderPage({
  params,
}: {
  params: Promise<{ order_uuid: string }>;
}) {
  const { order_uuid } = use(params);
  const isScrolled = useScrolled(5);
  const router = useRouter();

  const { data, isLoading } = useGetOrder(order_uuid);
  const setOrderUuid = useNotificationStore((s) => s.setOrderUuid);

  useEffect(() => {
    setOrderUuid(order_uuid);
    return () => setOrderUuid(null);
  }, [order_uuid, setOrderUuid]);

  useEffect(() => {
    if (data?.phone_number?.trim()) {
      saveCustomerPhone(data.phone_number);
    }
  }, [data?.phone_number]);

  // Local state
  const [showAll, setShowAll] = React.useState<boolean>(false);
  const [showBackConfirm, setShowBackConfirm] = React.useState<boolean>(false);

  // test token
  const test_snap_token = "9369e074-a355-47b9-920e-c69175fb6a28";

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

  // Check if order has pending payment
  const isWaitingPayment =
    data?.order_status_trackers?.length === 1 &&
    data?.order_status_trackers[0]?.status?.value === "waiting_payment";
  // && data?.snap_token;

  // Function to open Snap payment UI
  const handleContinuePayment = () => {
    if (!data?.snap_token) return;

    const snapInstance = (window as any).snap;
    if (snapInstance) {
      snapInstance.pay(data.snap_token, {
        onSuccess: function (result: any) {
          console.log("Payment success:", result);
          toast.success("Payment successful!");

          // Clear pending payment from localStorage if it matches this order
          const pending = localStorage.getItem("pending_payment");
          if (pending) {
            try {
              const pendingData = JSON.parse(pending);
              if (pendingData.order_uuid === order_uuid) {
                localStorage.removeItem("pending_payment");
              }
            } catch (e) {
              console.error("Failed to parse pending payment:", e);
            }
          }

          // Refresh order data
          window.location.reload();
        },
        onPending: function (result: any) {
          console.log("Payment pending:", result);
          toast.info("Waiting for payment...");
        },
        onError: function (result: any) {
          console.log("Payment error:", result);
          toast.error("Payment failed!");
        },
        onClose: function () {
          console.log("Payment popup closed");
          toast.info("You can continue the payment anytime");
        },
      });
    } else {
      toast.error("Midtrans Snap is not loaded yet. Please try again.");
    }
  };

  // Calculate displayed menus
  const displayedMenus = showAll
    ? data?.order_details
    : data?.order_details?.slice(0, 2);
  const hasMoreMenus = (data?.order_details?.length ?? 0) > 2;

  // Prevent browser back button
  React.useEffect(() => {
    // Push a dummy state to prevent back
    window.history.pushState(null, "", window.location.href);

    const handlePopState = (event: PopStateEvent) => {
      // Prevent the default back action
      window.history.pushState(null, "", window.location.href);
      // Show confirmation dialog
      setShowBackConfirm(true);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Handlers
  const handleConfirmBack = () => {
    setShowBackConfirm(false);
    // Navigate to food-beverage page
    router.push("/");
  };

  const handleCancelBack = () => {
    setShowBackConfirm(false);
  };

  return (
    <div className="w-full min-h-screen relative min-w-sm">
      {/* F&B header */}
      <div
        className={`sticky top-0 z-10 flex flex-col gap-3 bg-white px-6 pt-4 pb-4 transition-shadow duration-150 ease-in-out ${isScrolled ? "shadow-md" : "shadow-none"}`}
      >
        <BackHeader
          title="Order Details"
          subTitle={`#${data?.order_number || "----"}`}
          withoutBackButton
          showNotifications
        />
      </div>

      {/* Delivery Room Info */}
      <section className="flex flex-col items-center justify-center bg-white mt-1">
        <div className="w-full px-6">
          <DeliveryRoomInfo
            name={data?.name || "----"}
            phoneNumber={data?.phone_number || "----"}
            roomNumber={data?.room?.room_number || "----"}
            roomType={data?.room?.room_type.name || "----"}
            floor={data?.room?.location || "----"}
          />

          {/* Order Status */}
          <OrderStatus
            statusTrackers={data?.order_status_trackers || []}
            estimatedDelivery={data?.estimated_delivery || "----"}
            paymentMethod={data?.payment_method || "----"}
          />
        </div>
      </section>

      {/* Order List */}
      <section className="flex flex-col items-center justify-center bg-white mt-1">
        <div className="w-full px-6">
          <Box sx={{ mb: 2, mt: 2, width: "100%" }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#000",
              }}
            >
              Your Order |{" "}
              <Typography component="span" sx={{ fontWeight: 100 }}>
                {data?.total_item_count}{" "}
                {data?.total_item_count === 1 ? "item" : "items"}
              </Typography>
            </Typography>
          </Box>

          {/* Order Cards */}
          <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
            {data?.order_details?.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 4,
                  color: "#666",
                }}
              >
                <Typography>No orders yet</Typography>
              </Box>
            ) : (
              <AnimatePresence mode="sync">
                {displayedMenus?.map((menu, index) => {
                  const isLastItem =
                    index === (data?.order_details?.length ?? 0) - 1;
                  // const originalIndex = data?.order_details?.findIndex(
                  //   (m) => m.uuid === menu.uuid
                  // );

                  return (
                    <motion.div
                      key={`${index}`}
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        marginBottom: 0,
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        marginBottom: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                        opacity: { duration: 0.2 },
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      <OrderCard item={menu} />
                      {!isLastItem && (
                        <Divider
                          sx={{ mt: 2, mb: 2, borderColor: "#E5E7EB" }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </Box>

          {/* Show More Button */}
          {hasMoreMenus && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 1.5,
                mt: -3,
              }}
            >
              <Button
                onClick={() => setShowAll(!showAll)}
                endIcon={
                  <Box
                    component="span"
                    sx={{
                      transform: showAll ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="#1976d2"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>
                }
                sx={{
                  textTransform: "none",
                  color: "#1976d2",
                  fontWeight: 600,
                  fontSize: "14px",
                  "&:hover": {
                    bgcolor: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                {showAll ? "Show less" : "Show more"}
              </Button>
            </Box>
          )}

          {/* Summary Payment*/}
          <Divider sx={{ mb: 2, borderColor: "#E5E7EB" }} />
          <div className="w-full flex justify-end pb-4">
            <Typography
              variant="body1"
              sx={{
                mr: 1,
                fontSize: "14px",
                fontWeight: 400,
                color: "#191919",
                mb: 0.5,
              }}
            >
              Total Order:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#191919",
                mb: 0.5,
              }}
            >
              {formatRupiah(data?.rounded_grand_total || "0.00")}
            </Typography>
          </div>
        </div>
      </section>

      {/* Order Info Number */}
      <section className="flex flex-col items-center justify-center bg-white mt-1">
        <div className="w-full px-6">
          <OrderInfoNumber
            orderNumber={data?.order_number || "----"}
            paymentMethod={data?.payment_method || "----"}
            orderTime={data?.ordered_at || "----"}
          />
        </div>
      </section>

      {/* Return to Main Menu Button */}
      <Box sx={{ mb: 3, mt: 2, px: 2 }}>
        {isWaitingPayment ? (
          <Button
            fullWidth
            onClick={handleContinuePayment}
            sx={{
              bgcolor: "#4F3534",
              color: "white",
              py: 1.5,
              borderRadius: 8,
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "none",
              mb: 1,
              "&:hover": {
                bgcolor: "#3d2a29",
              },
            }}
          >
            Continue Payment
          </Button>
        ) : null}

        <Button
          fullWidth
          onClick={() => setShowBackConfirm(true)}
          sx={{
            bgcolor: "transparent",
            color: "#191919",
            py: 1,
            borderRadius: 8,
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "none",
            border: "1px solid #4F3534",
            "&:hover": {
              color: "#FFFFFF",
              fontWeight: 500,
              bgcolor: "#4F3534",
              borderColor: "#4F3534",
            },
          }}
        >
          Return to the main menu
        </Button>
      </Box>

      {/* Back Navigation Confirmation */}
      <BackNavigationConfirm
        title="Are you sure you want to leave this page?"
        description="You can still check your
          order details from the WhatsApp link we've sent."
        open={showBackConfirm}
        onClose={handleCancelBack}
        onConfirm={handleConfirmBack}
      />
    </div>
  );
}
