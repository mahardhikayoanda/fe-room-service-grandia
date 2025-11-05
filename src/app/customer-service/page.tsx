"use client";

import React from "react";
import { Box, Button, Divider } from "@mui/material";
import { User, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import BackHeader from "@/components/BackHeader";
import TextInput from "@/components/form/TextInput";
import FileUploadInput from "@/components/form/FileUploadInput";
import { useScrolled } from "@/libs/hooks/useScrolled";
import { useRouter } from "nextjs-toploader/app";
import useCreateRequestComplaint from "@/services/customer-service/useCreateRequestComplaint";
import {
  CustomerServiceFormSchema,
  CustomerServiceFormType,
  defaultCustomerServiceForm,
} from "./_utils/customer-service-schema";
import { maxFileSize } from "@/constants";

export default function CustomerServicePage() {
  const router = useRouter();
  const isScrolled = useScrolled(5);

  const { mutate, isPending } = useCreateRequestComplaint();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: defaultCustomerServiceForm,
    resolver: zodResolver(CustomerServiceFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: CustomerServiceFormType) => {
    console.log("Form submitted:", data);

    mutate(data, {
      onSuccess: () => {
        reset();
        router.push("/customer-service/complaint");
      },
    });
  };

  return (
    <div className="w-full min-h-screen relative min-w-sm">
      <div
        className={`sticky top-0 z-10 flex flex-col gap-3 bg-white px-6 pt-4 pb-4 transition-shadow duration-150 ease-in-out ${isScrolled ? "shadow-md" : "shadow-none"}`}
      >
        {/* Header */}
        <BackHeader
          title="Customer Service"
          subTitle="Complaint/request from room 120"
        />
      </div>

      {/* Form Container */}
      <Box
        component="form"
        onSubmit={handleSubmit((d) => onSubmit(d))}
        sx={{
          bgcolor: "white",
          mt: 1,
          px: 3,
          py: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box>
          <Box
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#191919",
            }}
          >
            Form Filling
          </Box>
          <Box
            sx={{
              fontSize: "14px",
              color: "#6B7280",
              mt: 0.5,
            }}
          >
            Completing this report is mandatory.
          </Box>
          <Divider sx={{ my: 1 }} />
        </Box>

        {/* Full Name */}
        <TextInput
          name="name"
          control={control}
          label="Full Name"
          placeholder="Enter full name"
          required
          startIcon={<User size={16} />}
        />

        {/* Phone Number */}
        <TextInput
          name="phone_number"
          control={control}
          label="Phone Number"
          placeholder="Enter phone number"
          required
          startIcon={<Phone size={16} />}
        />

        {/* Request/Complaint */}
        <TextInput
          name="remark"
          control={control}
          label="Request/Complaint"
          placeholder="Enter request/complaint message"
          required
          multiline
          minRows={4}
        />

        {/* File Upload */}
        <FileUploadInput
          name="complaint_and_request_images"
          control={control}
          label="Upload Image (optional)"
          helperText={`Upload up to 3 images (max ${maxFileSize}MB each)`}
          maxFiles={3}
          accept="image/*"
        />
      </Box>

      {/* Submit Button */}
      <Box
        sx={{
          bgcolor: "white",
          mt: 1,
          px: 3,
          py: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
          component={isValid ? Link : "button"}
          href={isValid ? "/customer-service/complaint" : undefined}
          sx={{
            width: "100%",
            maxWidth: 342,
            height: 48,
            borderRadius: 6,
            fontSize: "14px",
            fontWeight: 600,
            textTransform: "none",
            bgcolor: isValid ? "#5B3C2E" : "#D9C9C9",
            color: "white",
            "&:hover": {
              bgcolor: isValid ? "#4A2F23" : "#D9C9C9",
            },
            "&.Mui-disabled": {
              bgcolor: "#D9C9C9",
              color: "white",
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
}
