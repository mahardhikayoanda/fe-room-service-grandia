"use client";

import { Modifier } from "@/libs/types/cart/cart";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { Edit, Minus, Plus } from "lucide-react";
import Image from "next/image";

interface OrderCardProps {
  title: string;
  image: string;
  modifierChoices?: Modifier[];
  notes?: string;
  price: number;
  quantity: number;
  onEdit?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export default function OrderCard({
  title,
  image,
  modifierChoices,
  notes,
  price,
  quantity,
  onEdit,
  onIncrement,
  onDecrement,
}: OrderCardProps) {
  const formatPrice = (price: number) => {
    return `Rp${price.toLocaleString("id-ID")}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* Top Section: Title and Image */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        {/* Left: Title and Details */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#000",
              mb: 1,
            }}
          >
            {title}
          </Typography>

          {/* Choices */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            {modifierChoices &&
              // list all modifier choices
              modifierChoices.map((modifier) => (
                <Typography
                  key={modifier.name}
                  variant="body2"
                  sx={{
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#666",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{modifier.name}:</span>{" "}
                  {modifier.options.map((opt) => opt.name).join(", ")}
                </Typography>
              ))}
            {notes && (
              <Typography
                variant="body2"
                sx={{
                  fontSize: "12px",
                  color: "#666",
                }}
              >
                <span style={{ fontWeight: 500 }}>Notes:</span> {notes}
              </Typography>
            )}
          </Box>
          <Typography
            variant="h6"
            mt={1}
            sx={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#000",
            }}
          >
            {formatPrice(price)}
          </Typography>
        </Box>

        {/* Right: Image */}
        <Box
          sx={{
            position: "relative",
            width: 100,
            height: 100,
            borderRadius: "12px",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            sizes="312px"
          />
        </Box>
      </Box>

      {/* Bottom Section: Price, Edit Button, and Quantity Controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left:Edit Button */}
        <Button
          onClick={() => {}}
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

        {/* Right: Quantity Controls */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <IconButton
            onClick={onDecrement}
            disabled={quantity <= 1}
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

          <Typography
            sx={{
              fontSize: "1.125rem",
              fontWeight: 600,
              color: "#000",
              minWidth: 32,
              textAlign: "center",
            }}
          >
            {quantity}
          </Typography>

          <IconButton
            onClick={onIncrement}
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
            <Plus size={20} strokeWidth={2.5} className="text-[#4F3534]" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
