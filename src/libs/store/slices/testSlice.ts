// store/paymentSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PaymentState = {
  room_name: string | null;
};

const initialState: PaymentState = {
  room_name: null,
};

const paymentSlice = createSlice({
  name: "selected_room",
  initialState,
  reducers: {
    setSelectedRoom(state, action: PayloadAction<string>) {
      state.room_name = action.payload;
    },
    resetSelectedRoom(state) {
      state.room_name = null;
    },
  },
});

export const { setSelectedRoom, resetSelectedRoom } = paymentSlice.actions;
export default paymentSlice.reducer;
