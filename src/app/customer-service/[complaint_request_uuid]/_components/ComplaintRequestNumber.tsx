"use client";

import { Box, Button, Typography } from "@mui/material";
import { Copy } from "lucide-react";
import { useState } from "react";

interface ComplaintRequestInfoNumberProps {
  ComplaintRequestNumber: string;
  ComplaintRequestTime: string;
}

export default function ComplaintRequestNumber({
  ComplaintRequestNumber,
  ComplaintRequestTime,
}: ComplaintRequestInfoNumberProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ComplaintRequestNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Box sx={{ mb: 3, mt: 2 }}>
      {/* ComplaintRequest Number */}
      <Typography
        variant="h2"
        sx={{
          fontSize: "16px",
          fontWeight: 700,
          mb: 0.5,
          color: "#000",
        }}
      >
        Complaint or Request Information
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 0.5,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            color: "#7F7F7F",
          }}
        >
          Number
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#000",
            }}
          >
            {ComplaintRequestNumber}
          </Typography>

          <Button
            onClick={handleCopy}
            sx={{
              minWidth: "auto",
              p: 1,
              bgcolor: copied ? "#4F3534" : "#F5F5F5",
              borderRadius: 1.5,
              "&:hover": {
                bgcolor: copied ? "#4F3534" : "#E5E5E5",
              },
              transition: "all 0.2s",
            }}
          >
            <Copy size={18} color={copied ? "#fff" : "#666"} />
          </Button>
        </Box>
      </Box>

      {/* Payment Method and ComplaintRequest Time */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {/* Payment Method */}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#7F7F7F",
            }}
          >
            Time
          </Typography>
        </Box>

        {/* ComplaintRequest Time */}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              color: "#7F7F7F",
              textAlign: "right",
            }}
          >
            {ComplaintRequestTime}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
