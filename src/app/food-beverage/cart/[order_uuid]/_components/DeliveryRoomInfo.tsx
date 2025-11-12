"use client";

import { Box, Divider, Paper, Typography } from "@mui/material";
import { DoorOpen } from "lucide-react";

interface DeliveryRoomInfoProps {
  name: string;
  phoneNumber: string;
  roomNumber: string;
  roomType: string;
  floor: string;
}

export default function DeliveryRoomInfo({
  name,
  phoneNumber,
  roomNumber,
  roomType,
  floor,
}: DeliveryRoomInfoProps) {
  return (
    <Box sx={{ mb: 2, mt: 2, width: "100%" }}>
      <Typography
        variant="h2"
        sx={{
          fontSize: "16px",
          fontWeight: 700,
          mb: 0.5,
          color: "#000",
        }}
      >
        Order Information
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: "14px",
          fontWeight: 400,
          mb: 2,
          color: "#4C4C4C",
        }}
      >
        {name} | {phoneNumber}
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

      <Divider
        sx={{
          my: 2,
          borderColor: "#E0E0E0",
        }}
      />
    </Box>
  );
}
