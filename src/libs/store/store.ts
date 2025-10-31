import { configureStore } from "@reduxjs/toolkit";
import SelectedRoom from "./slices/testSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    selectedRoom: SelectedRoom,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
