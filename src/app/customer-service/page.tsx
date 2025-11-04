"use client";

import React from "react";
import { Box, Button, Divider } from "@mui/material";
import { User, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import BackHeader from "@/components/BackHeader";
import TextInput from "@/components/form/TextInput";
import FileUploadInput from "@/components/form/FileUploadInput";
import { useScrolled } from "@/libs/hooks/useScrolled";
import { useRouter } from "nextjs-toploader/app";

// Zod validation schema
const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]+$/, "Phone number must contain only numbers"),
  complaint: z.string().min(1, "Request/Complaint is required"),
  files: z
    .custom<FileList>()
    .refine(
      (files) => files && files.length > 0,
      "At least one image is required"
    )
    .refine((files) => {
      if (!files) return false;
      return Array.from(files).every((file) => file.size <= 5 * 1024 * 1024);
    }, "Each file must be less than 5MB"),
});

type FormData = z.infer<typeof formSchema>;

export default function CustomerServicePage() {
  const router = useRouter();
  const isScrolled = useScrolled(5);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      complaint: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
    router.push("/customer-service/complaint");
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

      <Box
        sx={{
          bgcolor: "#F2F2F2",
        }}
      >
        {/* Form Container */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
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
            name="fullName"
            control={control}
            label="Full Name"
            placeholder="Enter full name"
            required
            startIcon={<User size={16} />}
          />

          {/* Phone Number */}
          <TextInput
            name="phoneNumber"
            control={control}
            label="Phone Number"
            placeholder="Enter phone number"
            required
            startIcon={<Phone size={16} />}
          />

          {/* Request/Complaint */}
          <TextInput
            name="complaint"
            control={control}
            label="Request/Complaint"
            placeholder="Enter request/complaint message"
            required
            multiline
            minRows={4}
          />

          {/* File Upload */}
          <FileUploadInput
            name="files"
            control={control}
            label="Upload Image (optional)"
            helperText="Upload up to 3 images (max 5MB each)"
            maxFiles={3}
            accept="image/*"
          />
        </Box>

        {/* Submit Button */}
        <Box
          sx={{
            bgcolor: "white",
            mt: 3,
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
      </Box>
    </div>
  );
}
