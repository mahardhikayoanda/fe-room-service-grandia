"use client";

import { Modifier } from "@/libs/types/cart/cart";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { Edit, Minus, Plus, Trash2 } from "lucide-react";
import { useAppDispatch } from "@/libs/hooks/useRedux";
import { removeMenuFromCart } from "@/libs/store/slices/cartSlice";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";

interface OrderCardProps {
  menuIndex: number;
  menuUuid: string;
  title: string;
  image: string;
  modifierChoices?: Modifier[];
  notes?: string;
  price: number;
  quantity: number;
  onEdit?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
  disabled?: boolean;
}

export default function OrderCard({
  menuIndex: index,
  menuUuid,
  title,
  image,
  modifierChoices,
  notes,
  price,
  quantity,
  onEdit,
  onIncrement,
  onDecrement,
  disabled,
}: OrderCardProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

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
              modifierChoices.map((modifier, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#666",
                  }}
                >
                  <span style={{ fontWeight: 700 }}>{modifier.name}:</span>{" "}
                  {modifier.modifier_items.map((opt) => opt.name).join(", ")}
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
                <span style={{ fontWeight: 700 }}>Notes:</span> {notes}
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
          onClick={() => {
            router.push(`/food-beverage/${menuUuid}?editIndex=${index}`);
          }}
          variant="outlined"
          disabled={disabled}
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
            "&:disabled": {
              opacity: 0.5,
              borderColor: "#E5E7EB",
              cursor: "not-allowed",
            },
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              color: disabled ? "#999" : "#4F3534",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Edit
              size={14}
              strokeWidth={2}
              color={disabled ? "#999" : "#4F3534"}
            />
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
          {quantity > 1 ? (
            <IconButton
              onClick={onDecrement}
              disabled={quantity <= 1 || disabled}
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
          ) : (
            <IconButton
              onClick={() => dispatch(removeMenuFromCart(index))}
              disabled={disabled}
              sx={{
                width: 28,
                height: 28,
                padding: 0,
                borderRadius: "50%",
                border: "1px solid #F87171",
                backgroundColor: "white",
                color: "#DC2626",
                "&:hover": {
                  backgroundColor: "rgba(220, 38, 38, 0.06)",
                  borderColor: "#FCA5A5",
                },
                "&:disabled": {
                  opacity: 0.5,
                  borderColor: "#E5E7EB",
                },
              }}
            >
              <Trash2 size={18} strokeWidth={1.8} />
            </IconButton>
          )}

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
            disabled={disabled}
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
            <Plus size={20} strokeWidth={2.5} className="text-[#4F3534]" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
