"use client";

import { Box, Typography } from "@mui/material";
import { Info as InfoIcon, User, Phone } from "lucide-react";
import { Control } from "react-hook-form";
import TextInput from "@/components/form/TextInput";
import { CheckoutFormType } from "../_utils/checkout-schema";

interface PersonalInfoFormProps {
  control: Control<CheckoutFormType>;
}

export default function PersonalInfoForm({ control }: PersonalInfoFormProps) {
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
          name="name"
          control={control}
          label="Full name"
          placeholder="Enter full name"
          required
          startIcon={<User size={20} />}
        />

        <TextInput
          name="phone_number"
          control={control}
          label="Phone Number"
          placeholder="Enter phone number"
          required
          startIcon={<Phone size={20} />}
        />
      </Box>
    </Box>
  );
}
