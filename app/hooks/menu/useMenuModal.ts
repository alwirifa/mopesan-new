import { create } from 'zustand';
interface MenuModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useMenuModal = create<MenuModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

