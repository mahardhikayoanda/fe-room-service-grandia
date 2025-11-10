"use client";

import { Typography, Button, Box, Divider, IconButton } from "@mui/material";
import { Edit, Minus, Plus } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useAppSelector, useAppDispatch } from "@/libs/hooks/useRedux";
import {
  selectSelectedMenus,
  updateMenuQuantity,
  removeMenuFromCart,
} from "@/libs/store/slices/cartSlice";
import { useMemo, useState } from "react";
import SwipeableDrawerWrapper from "@/components/SwipeableDrawerWrapper";

interface Props {
  menuUuid?: string;
  titleMenu?: string;
  priceMenu?: number;
}

export default function AddMenuButton({
  menuUuid,
  titleMenu,
  priceMenu,
}: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [openModifierSheet, setOpenModifierSheet] = useState(false);
  const selectedMenus = useAppSelector(selectSelectedMenus);

  // Get all selected menus for this specific menuUuid
  const currentMenuItems = useMemo(() => {
    if (!menuUuid) return [];

    return selectedMenus.filter((menu) => menu.uuid === menuUuid);
  }, [selectedMenus, menuUuid]);

  // Calculate total quantity for this specific menu in cart
  const itemCount = useMemo(() => {
    return currentMenuItems.reduce((total, menu) => total + menu.quantity, 0);
  }, [currentMenuItems]);

  const handleDrawerClose = () => {
    setOpenModifierSheet(false);
  };

  const handleDrawerOpen = () => {
    setOpenModifierSheet(true);
  };

  // Find the actual index in the full selectedMenus array
  const getCartIndex = (localIndex: number) => {
    const targetItem = currentMenuItems[localIndex];
    return selectedMenus.findIndex((menu) => menu === targetItem);
  };

  // Handle quantity increase
  const handleIncreaseQuantity = (localIndex: number) => {
    const cartIndex = getCartIndex(localIndex);
    if (cartIndex !== -1) {
      const currentItem = selectedMenus[cartIndex];
      dispatch(
        updateMenuQuantity({
          index: cartIndex,
          quantity: currentItem.quantity + 1,
        })
      );
    }
  };

  // Handle quantity decrease
  const handleDecreaseQuantity = (localIndex: number) => {
    const cartIndex = getCartIndex(localIndex);
    if (cartIndex !== -1) {
      const currentItem = selectedMenus[cartIndex];

      if (currentItem.quantity === 1) {
        // Remove item if quantity becomes 0
        dispatch(removeMenuFromCart(cartIndex));

        // Close drawer if no more items for this menu
        if (currentMenuItems.length === 1) {
          setOpenModifierSheet(false);
        }
      } else {
        dispatch(
          updateMenuQuantity({
            index: cartIndex,
            quantity: currentItem.quantity - 1,
          })
        );
      }
    }
  };

  // route to modifier-item page
  const handleAddItem = () => {
    // If this menu has been previously selected, open the modifier sheet.
    if (itemCount > 0) {
      setOpenModifierSheet(true);
      return;
    }

    // if not already selected, navigate to the modifier-item page
    router.push(`/food-beverage/modifier-item?menuId=${menuUuid}`);
  };

  return (
    <>
      <Button
        onClick={handleAddItem}
        variant="outlined"
        sx={{
          minWidth: "90px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          py: 0.5,
          px: itemCount > 0 ? 1.5 : 2,
          borderRadius: "9999px",
          textTransform: "none",
          borderColor: "#4F3534",
          backgroundColor: itemCount > 0 ? "#4F3534" : "transparent",
          "&:hover": {
            backgroundColor: itemCount > 0 ? "#3d2a29" : "grey.100",
            borderColor: "#4F3534",
          },
        }}
      >
        {itemCount === 0 && <Plus size={12} strokeWidth={3} color="#4F3534" />}
        <Typography
          sx={{
            fontWeight: 700,
            color: itemCount > 0 ? "#FFFFFF" : "#4F3534",
            fontSize: "12px",
          }}
        >
          {itemCount > 0 ? `${itemCount} item` : "Add item"}
        </Typography>
      </Button>

      {/* Modifier Sheet */}
      <SwipeableDrawerWrapper
        open={openModifierSheet}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
        maxHeight="90vh"
      >
        {/* Menu Title */}
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#000",
            mb: 1,
          }}
        >
          {titleMenu}
        </Typography>

        <Divider sx={{ mb: 1 }} />

        {/* List of selected menu items with different modifiers */}
        <Box sx={{ mb: 3 }}>
          {currentMenuItems.map((item, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              {/* Price */}
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#000",
                  mb: 1,
                }}
              >
                Rp{item.basePrice.toLocaleString("id-ID")}
              </Typography>

              {/* Modifiers */}
              {item.modifiers.map((modifier) => (
                <Box key={modifier.uuid} sx={{ mb: 0.5 }}>
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#000",
                    }}
                  >
                    {modifier.name}:{" "}
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#4C4C4C",
                    }}
                  >
                    {modifier.options.map((opt) => opt.name).join(", ")}
                  </Typography>
                </Box>
              ))}

              {/* Notes */}
              {item.notes && (
                <Box sx={{ mb: 1 }}>
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#000",
                    }}
                  >
                    Notes:{" "}
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#4C4C4C",
                    }}
                  >
                    {item.notes}
                  </Typography>
                </Box>
              )}

              {/* Edit Button and Quantity Controls */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  mt: 2,
                  gap: 2,
                }}
              >
                {/* Edit Button */}
                <Button
                  onClick={() => {
                    router.push(
                      `/food-beverage/modifier-item?menuId=${menuUuid}&editIndex=${index}`
                    );
                  }}
                  variant="outlined"
                  sx={{
                    minWidth: "90px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    py: 0.5,
                    px: 2,
                    borderRadius: "9999px",
                    textTransform: "none",
                    borderColor: "#4F3534",
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: "grey.100",
                      borderColor: "#4F3534",
                    },
                  }}
                >
                  {itemCount === 0 && (
                    <Plus size={12} strokeWidth={3} color="#4F3534" />
                  )}
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "#4F3534",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Edit size={14} strokeWidth={2} color="#4F3534" />
                    Edit
                  </Typography>
                </Button>

                {/* Quantity Controls */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {/* Decrease Button */}
                  <IconButton
                    onClick={() => handleDecreaseQuantity(index)}
                    disabled={item.quantity <= 1}
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

                  {/* Quantity */}
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#000",
                      minWidth: "20px",
                      textAlign: "center",
                    }}
                  >
                    {item.quantity}
                  </Typography>

                  {/* Increase Button */}
                  <IconButton
                    onClick={() => handleIncreaseQuantity(index)}
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
                    <Plus
                      size={20}
                      strokeWidth={2.5}
                      className="text-[#4F3534]"
                    />
                  </IconButton>
                </Box>
              </Box>

              {/* Divider between items */}
              {index < currentMenuItems.length - 1 && (
                <Divider sx={{ mt: 3 }} />
              )}
            </Box>
          ))}
        </Box>

        {/* Adjust Modifier Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            router.push(`/food-beverage/modifier-item?menuId=${menuUuid}`);
          }}
          sx={{
            bgcolor: "#4F3534",
            color: "white",
            py: 1.5,
            borderRadius: "99px",
            fontWeight: "medium",
            textTransform: "none",
            fontSize: "16px",
            "&:hover": { bgcolor: "#3d2a29" },
          }}
        >
          Adjust the modifier
        </Button>
      </SwipeableDrawerWrapper>
    </>
  );
}
