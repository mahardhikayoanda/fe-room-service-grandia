import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { combineReducers } from "@reduxjs/toolkit";
import SelectedRoom from "./slices/testSlice";
import cartReducer from "./slices/cartSlice";

// Create a noop storage for server-side rendering
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

// Use sessionStorage if available, otherwise use noop storage
const storage =
  typeof window !== "undefined"
    ? createWebStorage("session")
    : createNoopStorage();

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // Only persist cart state
};

// Combine reducers
const rootReducer = combineReducers({
  selectedRoom: SelectedRoom,
  cart: cartReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
