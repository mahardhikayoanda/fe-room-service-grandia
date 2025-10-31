"use client";

import { Typography, Button } from "@mui/material";
import { Plus } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useAppSelector } from "@/libs/hooks/useRedux";
import { selectSelectedMenus } from "@/libs/store/slices/cartSlice";
import { useMemo } from "react";

interface Props {
  menuUuid?: string;
  titleMenu?: string;
  priceMenu?: string;
}

export default function AddMenuButton({
  menuUuid,
  titleMenu,
  priceMenu,
}: Props) {
  const router = useRouter();
  const selectedMenus = useAppSelector(selectSelectedMenus);

  // Calculate total quantity for this specific menu in cart
  const itemCount = useMemo(() => {
    if (!menuUuid) return 0;

    return selectedMenus
      .filter((menu) => menu.uuid === menuUuid)
      .reduce((total, menu) => total + menu.quantity, 0);
  }, [selectedMenus, menuUuid]);

  // route to modifier-item page
  const handleAddItem = () => {
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
    </>
  );
}
