import { create } from "zustand";

interface NotificationState {
  isDrawerOpen: boolean;
  orderUuid: string | null;
  toggleDrawer: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  setOrderUuid: (orderUuid: string | null) => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
  isDrawerOpen: false,
  orderUuid: null,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  setOrderUuid: (orderUuid) => set({ orderUuid }),
}));

export default useNotificationStore;
