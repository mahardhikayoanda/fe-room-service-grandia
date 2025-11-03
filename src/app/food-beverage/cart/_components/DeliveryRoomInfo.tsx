"use client";

import { Box, Paper, Typography } from "@mui/material";
import { DoorOpen } from "lucide-react";
import Image from "next/image";

interface DeliveryRoomInfoProps {
  roomNumber: string;
  roomType: string;
  floor: string;
}

export default function DeliveryRoomInfo({
  roomNumber,
  roomType,
  floor,
}: DeliveryRoomInfoProps) {
  return (
    <Box sx={{ mb: 2, mt: 2, width: "100%" }}>
      <Typography
        variant="h1"
        sx={{
          fontSize: "16px",
          fontWeight: 700,
          mb: 2,
          color: "#000",
        }}
      >
        Delivery room
      </Typography>

      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
          p: 2,
          bgcolor: "#F5F5F5",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            bgcolor: "#B89B9B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <DoorOpen size={28} className="text-white" />
        </Box>

        <Box>
          <Typography
            variant="h2"
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#4F3534",
              mb: 0.5,
            }}
          >
            Room {roomNumber}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "14px",
              color: "#4C4C4C",
              fontWeight: 500,
            }}
          >
            {roomType} - {floor}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
