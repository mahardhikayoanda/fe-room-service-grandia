import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { CartState, SelectedMenu } from "@/libs/types/cart/cart";

// Initial State
const initialState: CartState = {
  room_uuid: "",
  selected_menus: [],
};

// Slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Set room UUID
    setRoomUuid: (state, action: PayloadAction<string>) => {
      state.room_uuid = action.payload;
    },

    // Add menu to cart
    addMenuToCart: (state, action: PayloadAction<SelectedMenu>) => {
      state.selected_menus.push(action.payload);
    },

    // Update menu in cart by index
    updateMenuInCart: (
      state,
      action: PayloadAction<{ index: number; menu: SelectedMenu }>
    ) => {
      const { index, menu } = action.payload;
      if (index >= 0 && index < state.selected_menus.length) {
        state.selected_menus[index] = menu;
      }
    },

    // Remove menu from cart by index
    removeMenuFromCart: (state, action: PayloadAction<number>) => {
      state.selected_menus.splice(action.payload, 1);
    },

    // Update quantity of a menu by index
    updateMenuQuantity: (
      state,
      action: PayloadAction<{ index: number; quantity: number }>
    ) => {
      const { index, quantity } = action.payload;
      if (index >= 0 && index < state.selected_menus.length) {
        const menu = state.selected_menus[index];
        menu.quantity = quantity;
        menu.totalPrice = menu.basePrice * quantity;
      }
    },

    // Clear cart
    clearCart: (state) => {
      state.selected_menus = [];
    },

    // Reset entire cart including room_uuid
    resetCart: (state) => {
      state.room_uuid = "";
      state.selected_menus = [];
    },
  },
});

// Actions
export const {
  setRoomUuid,
  addMenuToCart,
  updateMenuInCart,
  removeMenuFromCart,
  updateMenuQuantity,
  clearCart,
  resetCart,
} = cartSlice.actions;

// Selectors
export const selectCart = (state: RootState) => state.cart;
export const selectRoomUuid = (state: RootState) => state.cart.room_uuid;
export const selectSelectedMenus = (state: RootState) =>
  state.cart.selected_menus;
export const selectCartItemCount = (state: RootState) =>
  state.cart.selected_menus.reduce((total, menu) => total + menu.quantity, 0);
export const selectCartTotalPrice = (state: RootState) =>
  state.cart.selected_menus.reduce((total, menu) => total + menu.totalPrice, 0);

export default cartSlice.reducer;
