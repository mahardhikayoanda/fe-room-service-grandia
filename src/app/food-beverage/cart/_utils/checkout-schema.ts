import { CheckoutOrderItem } from "@/types/checkout.type";
import { z } from "zod";

export const CheckoutFormSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .max(100, "Full name must not exceed 100 characters"),
  phone_number: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]+$/, "Phone number must contain only numbers"),
});

export type CheckoutFormType = z.infer<typeof CheckoutFormSchema>;

export const defaultCheckoutForm: CheckoutFormType = {
  name: "",
  phone_number: "",
};

export interface CheckoutPayload {
  room_uuid: string;
  promo_uuid?: string;
  service_code?: string;
  name: string;
  phone_number: string;
  remark?: string;
  payment_method: "cash" | "charge_to_room" | null;
  order_items: CheckoutOrderItem[];
  grand_total: number;
  raw_total: number;
  rounded_grand_total: number;
  total_discount: number;
}
