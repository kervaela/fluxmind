import { create } from "zustand";
import type { WalletSession } from "../types";
import { loadSession } from "../lib/walletCore";

interface WalletState {
  session: WalletSession | null;
  unlocked: boolean;
  walletPassword: string;
  toast: { msg: string; ok: boolean } | null;
  setSession: (s: WalletSession | null) => void;
  setUnlocked: (v: boolean) => void;
  setWalletPassword: (p: string) => void;
  toastOk: (msg: string) => void;
  toastErr: (msg: string) => void;
  clearToast: () => void;
  hydrate: () => void;
  lock: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  session: null,
  unlocked: false,
  walletPassword: "",
  toast: null,
  setSession: (session) => set({ session }),
  setUnlocked: (unlocked) => set({ unlocked }),
  setWalletPassword: (walletPassword) => set({ walletPassword }),
  toastOk: (msg) => set({ toast: { msg, ok: true } }),
  toastErr: (msg) => set({ toast: { msg, ok: false } }),
  clearToast: () => set({ toast: null }),
  hydrate: () => set({ session: loadSession() }),
  lock: () => set({ unlocked: false, walletPassword: "" }),
}));
