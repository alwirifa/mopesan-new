import { create } from 'zustand';

interface MerchantModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useMerchantModal = create<MerchantModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));


