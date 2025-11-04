"use client";

import { Modifier } from "@/libs/types/cart/cart";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface OrderCardProps {
  title: string;
  image: string;
  modifierChoices?: Modifier[];
  notes?: string;
  price: number;
  quantity: number;
}

export default function OrderCard({
  title,
  image,
  modifierChoices,
  notes,
  price,
  quantity,
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
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#000",
              }}
            >
              {formatPrice(price)}
            </Typography>
            {quantity > 1 && (
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#0F67B9",
                }}
              >
                &nbsp; x {quantity}
              </Typography>
            )}
          </Box>
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
    </Box>
  );
}
