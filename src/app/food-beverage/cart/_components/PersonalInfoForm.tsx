"use client";

import { Box, Typography } from "@mui/material";
import { Info as InfoIcon, User, Phone } from "lucide-react";

import TextInput from "@/components/form/TextInput";

interface PersonalInfoFormProps {
  fullName: string;
  phoneNumber: string;
  onFullNameChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
}

export default function PersonalInfoForm({
  fullName,
  phoneNumber,
  onFullNameChange,
  onPhoneNumberChange,
}: PersonalInfoFormProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <InfoIcon size={20} color="#191919" />
        <Typography
          variant="body1"
          sx={{
            fontSize: "14px",
            color: "#191919",
          }}
        >
          Fill in your personal info for this order.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextInput
          fullWidth
          required
          label="Full name"
          placeholder="Enter full name"
          value={fullName}
          onChange={(e) => onFullNameChange(e.target.value)}
          startIcon={<User size={20} />}
        />

        <TextInput
          fullWidth
          required
          label="Phone Number"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => onPhoneNumberChange(e.target.value)}
          type="tel"
          startIcon={<Phone size={20} />}
        />
      </Box>
    </Box>
  );
}
