import { create } from 'zustand';

interface BannerModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useBannerModal = create<BannerModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

