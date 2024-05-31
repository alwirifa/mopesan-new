import { create } from 'zustand';

interface EditAdminModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useEditAdminModal = create<EditAdminModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));


