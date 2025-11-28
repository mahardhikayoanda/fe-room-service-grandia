import { CheckoutFormType } from "@/app/food-beverage/cart/_utils/checkout-schema";

// Cart Types
export interface ModifierOption {
  uuid: string;
  name: string;
}

export interface Modifier {
  uuid: string;
  name: string;
  modifier_items: ModifierOption[];
}

export interface SelectedMenu {
  uuid: string;
  name: string;
  image: string;
  modifiers: Modifier[];
  notes: string;
  quantity: number;
  basePrice: number;
  totalPrice: number;
}

export interface CartState {
  room_uuid: string;
  selected_menus: SelectedMenu[];
  cart_personal_info?: CheckoutFormType;
}

// Order payload for API
export interface OrderPayload {
  room_uuid: string;
  selected_menus: SelectedMenu[];
}
