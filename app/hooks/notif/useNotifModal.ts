import { create } from 'zustand';
interface NotifModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useNotifModal = create<NotifModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

