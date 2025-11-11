// Checkout Payload Types
export interface CheckoutModifierItem {
  name: string;
}

export interface CheckoutModifier {
  name: string;
  modifier_items: CheckoutModifierItem[];
}

export interface CheckoutOrderItem {
  item_uuid: string;
  name: string;
  price: number;
  quantity: number;
  total_price: number;
  remark?: string;
  modifiers?: CheckoutModifier[];
}

// export interface CheckoutPayload {
//   room_uuid: string;
//   promo_uuid?: string;
//   name: string;
//   phone_number: string;
//   remark?: string;
//   payment_method: "cash" | "charge_to_room" | null;
//   order_items: CheckoutOrderItem[];
//   grand_total: number;
//   rounded_grand_total: number;
//   total_discount: number;
// }
