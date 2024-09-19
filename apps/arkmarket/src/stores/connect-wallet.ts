import { create } from "zustand";

interface ConnectWalletState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useConnectWalletStore = create<ConnectWalletState>()((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
