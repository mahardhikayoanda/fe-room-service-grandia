"use client";

import { Box, Typography, Divider } from "@mui/material";

interface PaymentSummaryProps {
  totalItems: number;
  subtotal: number;
  tax?: number;
  serviceCharge?: number;
  discount?: number;
}

export default function PaymentSummary({
  totalItems,
  subtotal,
  tax = 0,
  serviceCharge = 0,
  discount = 0,
}: PaymentSummaryProps) {
  const totalPayment = subtotal + tax + serviceCharge - discount;

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

        {/* Optional: Tax */}
        {tax > 0 && (
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
              Tax
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#666",
              }}
            >
              {formatPrice(tax)}
            </Typography>
          </Box>
        )}

        {/* Optional: Service Charge */}
        {serviceCharge > 0 && (
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
              Service Charge
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#666",
              }}
            >
              {formatPrice(serviceCharge)}
            </Typography>
          </Box>
        )}

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
              Discount
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#EF4444",
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
