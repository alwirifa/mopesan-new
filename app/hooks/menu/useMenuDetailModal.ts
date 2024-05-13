import create from 'zustand';

interface MenuModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useMenuDetailModal = create<MenuModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

