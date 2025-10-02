"use client";

import * as React from "react";
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import { X } from "lucide-react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxHeight?: string | number; // optional: biar ga lebih dari layar
}

export default function BottomSheet({
  open,
  onClose,
  title,
  children,
  maxHeight = "80vh",
}: BottomSheetProps) {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          height: "fit-content", // <- ini kuncinya
          maxHeight: maxHeight, // biar ga overflow
          overflow: "visible",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          pt: 1.5,
          pb: 1,
          borderBottom: "1px solid #eee",
        }}
      >
        {title && (
          <Typography variant="subtitle1" fontWeight="bold">
            {title}
          </Typography>
        )}
        <IconButton onClick={onClose}>
          <X size={16} />
        </IconButton>
      </Box>

      {/* Konten */}
      <Box sx={{ px: 2, py: 2 }}>{children}</Box>
    </Drawer>
  );
}
