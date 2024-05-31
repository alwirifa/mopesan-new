import { create } from 'zustand';
interface EditMenuModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useEditMenuModal = create<EditMenuModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

