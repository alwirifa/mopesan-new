import { create } from "zustand";

interface StaffModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useStaffModal = create<StaffModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
