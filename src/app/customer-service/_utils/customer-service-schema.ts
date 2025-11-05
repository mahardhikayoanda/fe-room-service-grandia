import { maxFileSize } from "@/constants";
import z from "zod";

export interface CustomerServiceFormType {
  room_uuid: string;
  name: string;
  phone_number: string;
  remark: string;
  complaint_and_request_images?: FileList | null;
}

export interface CustomerServicePayload {
  room_uuid: string;
  name: string;
  phone_number: string;
  remark: string;
  complaint_and_request_images: Array<{
    photo_uuid: string;
  }>;
}

export const defaultCustomerServiceForm: CustomerServiceFormType = {
  room_uuid: "550e8400-e29b-41d4-a716-446655440000", // Dummy UUID
  name: "",
  phone_number: "",
  remark: "",
  complaint_and_request_images: null,
};

export const CustomerServiceFormSchema = z.object({
  room_uuid: z.string().min(1, "Room UUID is required"),
  name: z.string().min(1, "Name is required"),
  phone_number: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]+$/, "Phone number must contain only numbers"),
  // .min(10, "Phone number must be at least 10 digits")
  // .max(15, "Phone number must be at most 15 digits"),
  remark: z.string().min(1, "Remark is required"),
  complaint_and_request_images: z
    .custom<FileList>()
    .nullable()
    .optional()
    .refine(
      (files) => !files || files.length <= 3,
      "You can upload up to 3 images"
    ),
  // Note: File size validation is done in FileUploadInput component BEFORE compression
  // to check original file size (2MB limit), not after compression which may be larger
});
