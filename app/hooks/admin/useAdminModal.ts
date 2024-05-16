import { create } from 'zustand';

interface AdminModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAdminModal = create<AdminModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));


