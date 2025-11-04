"use client";

import { Box, Button, Typography } from "@mui/material";
import SwipeableDrawerWrapper from "@/components/SwipeableDrawerWrapper";
import { AlertCircle } from "lucide-react";

interface BackNavigationConfirmProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function BackNavigationConfirm({
  open,
  onClose,
  onConfirm,
}: BackNavigationConfirmProps) {
  return (
    <SwipeableDrawerWrapper
      open={open}
      onClose={onClose}
      onOpen={() => {}}
      maxWidth={384}
      maxHeight="auto"
      borderRadius={16}
      showHandle={false}
    >
      <Box sx={{ pb: 2, pt: 1 }}>
        {/* Icon */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              bgcolor: "rgba(239, 68, 68, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AlertCircle size={32} color="#EF4444" strokeWidth={2} />
          </Box>
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontSize: "18px",
            fontWeight: 700,
            mb: 1,
            color: "#000",
            textAlign: "center",
          }}
        >
          Leave Order Tracking?
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontSize: "14px",
            color: "#666",
            mb: 3,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Are you sure you want to leave this page? You can always track your
          order from the order history.
        </Typography>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: "row",
          }}
        >
          <Button
            fullWidth
            onClick={onConfirm}
            sx={{
              bgcolor: "#EF4444",
              color: "white",
              py: 1,
              borderRadius: 2,
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#DC2626",
              },
            }}
          >
            Yes, Leave
          </Button>

          <Button
            fullWidth
            onClick={onClose}
            sx={{
              bgcolor: "#F5F5F5",
              color: "#000",
              py: 1,
              borderRadius: 2,
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#E5E5E5",
              },
            }}
          >
            Stay on This Page
          </Button>
        </Box>
      </Box>
    </SwipeableDrawerWrapper>
  );
}
