import { create } from 'zustand';

interface FeeModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useFeeModal = create<FeeModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));


