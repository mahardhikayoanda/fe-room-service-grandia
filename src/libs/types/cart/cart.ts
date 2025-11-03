// Cart Types
export interface ModifierOption {
  uuid: string;
  name: string;
}

export interface Modifier {
  uuid: string;
  name: string;
  options: ModifierOption[];
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
}

// Order payload for API
export interface OrderPayload {
  room_uuid: string;
  selected_menus: SelectedMenu[];
}
