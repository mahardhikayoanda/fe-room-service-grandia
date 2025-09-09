import { configureStore } from "@reduxjs/toolkit";
import SelectedRoom from "./slices/testSlice";

export const store = configureStore({
  reducer: {
    selectedRoom: SelectedRoom,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
