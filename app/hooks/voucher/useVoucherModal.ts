import { create } from 'zustand';

interface VoucherModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useVoucherModal = create<VoucherModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));


