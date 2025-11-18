"use client";

import { Box, Typography, Divider } from "@mui/material";

interface PaymentSummaryProps {
  totalItems: number;
  subtotal: number;
  discount?: number;
  promoName?: string;
}

export default function PaymentSummary({
  totalItems,
  subtotal,
  discount = 0,
  promoName,
}: PaymentSummaryProps) {
  const totalPayment = subtotal - discount;

  const formatPrice = (price: number) => {
    return `Rp${price.toLocaleString("id-ID")}`;
  };

  return (
    <Box sx={{ width: "100%", py: 2 }}>
      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          fontSize: "16px",
          fontWeight: 700,
          color: "#000",
          mb: 2,
        }}
      >
        Payment Summary
      </Typography>

      {/* Summary Details */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        {/* Total Order */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#666",
            }}
          >
            Total order
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#666",
            }}
          >
            {totalItems} item{totalItems !== 1 && "s"}
          </Typography>
        </Box>

        {/* Price */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#666",
            }}
          >
            Price
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#666",
            }}
          >
            {formatPrice(subtotal)}
          </Typography>
        </Box>

        {/* Optional: Discount */}
        {discount > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#666",
              }}
            >
              Discount {promoName && `(${promoName})`}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#EF4444",
                fontWeight: 600,
              }}
            >
              -{formatPrice(discount)}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Divider */}
      <Divider sx={{ borderColor: "#E5E7EB", my: 0.5 }} />

      {/* Total Payment */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#000",
          }}
        >
          Total Payment
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#000",
          }}
        >
          {formatPrice(totalPayment)}
        </Typography>
      </Box>
    </Box>
  );
}
