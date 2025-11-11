"use client";

import BackHeader from "@/components/BackHeader";
import { useScrolled } from "@/libs/hooks/useScrolled";
import React, { useEffect } from "react";
import DeliveryRoomInfo from "./_components/DeliveryRoomInfo";
import PersonalInfoForm from "./_components/PersonalInfoForm";
import OrderCard from "./_components/OrderCard";
import { Box, Button, Typography, Divider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/libs/hooks/useRedux";
import {
  selectSelectedMenus,
  selectCartItemCount,
  selectCartTotalPrice,
  updateMenuQuantity,
} from "@/libs/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import PaymentSummary from "./_components/PaymentSummary";
import CheckoutButton from "./_components/CheckoutButton";
import { AnimatePresence, motion } from "framer-motion";
import { useRoom } from "@/providers/RoomProvider";
import { roundToThousand } from "@/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckoutFormSchema,
  CheckoutFormType,
  CheckoutPayload,
  defaultCheckoutForm,
} from "./_utils/checkout-schema";

export default function ChartPage() {
  const isScrolled = useScrolled(5);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { roomData, roomUUID } = useRoom();

  // Redux state
  const selectedMenus = useAppSelector(selectSelectedMenus);
  const cartItemCount = useAppSelector(selectCartItemCount);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  // React Hook Form
  const {
    control,
    watch,
    formState: { isValid },
  } = useForm<CheckoutFormType>({
    defaultValues: defaultCheckoutForm,
    resolver: zodResolver(CheckoutFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // Watch form values
  const formValues = watch();

  // Local state
  const [showAll, setShowAll] = React.useState<boolean>(false);

  // Calculate displayed menus
  const displayedMenus = showAll ? selectedMenus : selectedMenus.slice(0, 2);
  const hasMoreMenus = selectedMenus.length > 2;

  // Handlers
  const handleIncrement = (index: number) => {
    const currentQuantity = selectedMenus[index].quantity;
    dispatch(updateMenuQuantity({ index, quantity: currentQuantity + 1 }));
  };

  const handleDecrement = (index: number) => {
    const currentQuantity = selectedMenus[index].quantity;
    if (currentQuantity > 1) {
      dispatch(updateMenuQuantity({ index, quantity: currentQuantity - 1 }));
    }
  };

  const handleEdit = (index: number) => {
    console.log("Edit menu at index:", index);
  };

  const handleAddMoreOrder = () => {
    router.push("/food-beverage");
  };

  // Function to build checkout payload
  const buildCheckoutPayload = (
    paymentMethod: "cash" | "charge_to_room" | null
  ): CheckoutPayload => {
    const orderItems = selectedMenus.map((menu) => ({
      item_uuid: menu.uuid,
      name: menu.name,
      price: menu.basePrice,
      quantity: menu.quantity,
      total_price: menu.totalPrice,
      remark: menu.notes || undefined,
      modifiers: menu.modifiers.map((modifier) => ({
        name: modifier.name,
        modifier_items: modifier.modifier_items.map((item) => ({
          name: item.name,
        })),
      })),
    }));

    const grandTotal = totalPrice;
    const roundedGrandTotal = roundToThousand(grandTotal);

    return {
      room_uuid: roomUUID || "",
      promo_uuid: "",
      service_code: "fnb",
      name: formValues.name,
      phone_number: formValues.phone_number,
      payment_method: paymentMethod,
      order_items: orderItems,
      grand_total: grandTotal,
      rounded_grand_total: roundedGrandTotal,
      total_discount: 0,
    };
  };

  return (
    <div className="w-full min-h-screen relative min-w-sm">
      {/* F&B header */}
      <div
        className={`sticky top-0 z-10 flex flex-col gap-3 bg-white px-6 pt-4 pb-4 transition-shadow duration-150 ease-in-out ${isScrolled ? "shadow-md" : "shadow-none"}`}
      >
        <BackHeader title="Checkout" />
      </div>

      {/* Delivery Room Info */}
      <section className="flex flex-col items-center justify-center bg-white mt-1">
        <div className="w-full px-6">
          {roomData && <DeliveryRoomInfo roomData={roomData} />}
          <PersonalInfoForm control={control} />
        </div>
      </section>

      {/* Order List */}
      <section className="flex flex-col items-center justify-center bg-white mt-1">
        <div className="w-full px-6">
          <Box sx={{ mb: 2, mt: 2, width: "100%" }}>
            <div className="flex justify-between items-center">
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
                  {cartItemCount} {cartItemCount === 1 ? "item" : "items"}
                </Typography>
              </Typography>
              <Button
                variant="text"
                onClick={handleAddMoreOrder}
                sx={{
                  p: 0,
                  cursor: "pointer",
                  textTransform: "none",
                  px: 0.5,
                  py: 0,
                }}
              >
                Tambah Pesanan
              </Button>
            </div>
          </Box>

          {/* Order Cards */}
          <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
            {selectedMenus.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 4,
                  color: "#666",
                }}
              >
                <Typography>Belum ada pesanan</Typography>
              </Box>
            ) : (
              <AnimatePresence mode="sync">
                {displayedMenus.map((menu, index) => {
                  const isLastItem = index === selectedMenus.length - 1;
                  const originalIndex = selectedMenus.findIndex(
                    (m) => m.uuid === menu.uuid
                  );

                  return (
                    <motion.div
                      key={`${menu.uuid}-${index}`}
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
                      <OrderCard
                        title={menu.name}
                        image={menu.image}
                        modifierChoices={menu.modifiers}
                        notes={menu.notes}
                        price={menu.basePrice}
                        quantity={menu.quantity}
                        onEdit={() => handleEdit(originalIndex)}
                        onIncrement={() => handleIncrement(originalIndex)}
                        onDecrement={() => handleDecrement(originalIndex)}
                      />
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
        </div>
      </section>

      {/* payment summary */}
      <section className="flex flex-col items-center justify-center bg-white mt-1 px-6">
        <PaymentSummary totalItems={cartItemCount} subtotal={totalPrice} />
      </section>

      {/* button payment */}
      <section className="mt-1">
        <CheckoutButton
          onBuildPayload={buildCheckoutPayload}
          isFormValid={isValid}
        />
      </section>
    </div>
  );
}
