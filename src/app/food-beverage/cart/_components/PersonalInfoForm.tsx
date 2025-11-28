"use client";

import { Box, debounce, Typography } from "@mui/material";
import { Info as InfoIcon, User, Phone } from "lucide-react";
import {
  Control,
  UseFormSetValue,
  UseFormWatch,
  useWatch,
} from "react-hook-form";
import TextInput from "@/components/form/TextInput";
import { CheckoutFormType } from "../_utils/checkout-schema";
import { memo, useEffect, useMemo, useRef } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useAppDispatch, useAppSelector } from "@/libs/hooks/useRedux";
import {
  selectCartPersonalInfo,
  setCartPersonalInfo,
} from "@/libs/store/slices/cartSlice";

interface PersonalInfoFormProps {
  control: Control<CheckoutFormType>;
  disabled?: boolean;
  setValue: UseFormSetValue<CheckoutFormType>;
  watch: UseFormWatch<CheckoutFormType>;
}

function PersonalInfoForm({
  control,
  disabled,
  setValue,
  watch,
}: PersonalInfoFormProps) {
  const personalInfo = useAppSelector(selectCartPersonalInfo);

  const isDirty = useRef(false);

  useEffect(() => {
    if (!isDirty.current) {
      setValue("name", personalInfo?.name || "");
      setValue("phone_number", personalInfo?.phone_number || "");
      isDirty.current = false;
    }
  }, [personalInfo, setValue]);

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
          disabled={disabled}
          startIcon={<User size={20} />}
        />

        <TextInput
          name="phone_number"
          control={control}
          label="Phone Number"
          placeholder="Enter phone number"
          required
          disabled={disabled}
          startIcon={<Phone size={20} />}
        />
      </Box>
    </Box>
  );
}

export default memo(PersonalInfoForm);
