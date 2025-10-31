"use client";

import { Typography, Button } from "@mui/material";
import { Plus } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";

interface Props {
  titleMenu?: string;
  priceMenu?: string;
}

export default function AddMenuButton({ titleMenu, priceMenu }: Props) {
  // const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [count, setCount] = useState(0);
  // const [request, setRequest] = useState("");
  // const [isRequestOpen, setIsRequestOpen] = useState(false);

  const router = useRouter();

  // route to modifier-item page
  const handleAddItem = () => {
    router.push(`/food-beverage/modifier-item`);
  };

  return (
    <>
      <Button
        onClick={handleAddItem}
        variant="outlined"
        sx={{
          width: "90px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          py: 0.5,
          borderRadius: "9999px",
          textTransform: "none",
          borderColor: "#4F3534",
          "&:hover": { backgroundColor: "grey.100" },
        }}
      >
        {count < 0 && <Plus size={12} strokeWidth={3} color="#4F3534" />}
        <Typography
          sx={{
            fontWeight: 700,
            color: "#4F3534",
            fontSize: "12px",
          }}
        >
          {count ? `${count} Item${count > 1 ? "s" : ""}` : "Add item"}
        </Typography>
      </Button>

      {/* <BottomSheet
        open={openBottomSheet}
        onClose={() => setOpenBottomSheet(false)}
        title={titleMenu}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          {formatCurrency(Number(priceMenu || 0))}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            setCount(count + 1);
            setOpenBottomSheet(false);
          }}
          sx={{
            bgcolor: "#4F3534",
            color: "white",
            py: 1,
            textTransform: "none",
            borderRadius: "99px",
            fontWeight: "medium",
            "&:hover": { bgcolor: "#333" },
          }}
        >
          Adjust the modifier
        </Button>
      </BottomSheet> */}
    </>
  );
}
