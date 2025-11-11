"use client";

import { Modifier } from "@/libs/types/cart/cart";
import { MenuOrderType } from "@/types/order.type";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface OrderCardProps {
  item?: MenuOrderType;
}

export default function OrderCard({ item }: OrderCardProps) {
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
            {item?.name}
          </Typography>

          {/* Choices */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            {item?.modifiers &&
              // list all modifier choices
              item.modifiers.map((modifier, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#666",
                  }}
                >
                  <span style={{ fontWeight: 700, color: "#000" }}>
                    {modifier.name}:
                  </span>{" "}
                  {modifier.modifier_items.map((opt) => opt.name).join(", ")}
                </Typography>
              ))}
            {item?.remark && (
              <Typography
                variant="body2"
                sx={{
                  fontSize: "12px",
                  color: "#666",
                }}
              >
                <span style={{ fontWeight: 500 }}>Notes:</span> {item.remark}
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
              {formatPrice(Number(item?.total_price))}
            </Typography>
            {(item?.quantity ?? 0) > 1 && (
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#0F67B9",
                }}
              >
                &nbsp; x {item?.quantity}
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
            src={item?.image.url || ""}
            alt={item?.name || ""}
            fill
            style={{ objectFit: "cover" }}
            sizes="312px"
          />
        </Box>
      </Box>
    </Box>
  );
}
