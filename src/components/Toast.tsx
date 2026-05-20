import { useEffect } from "react";
import { useWalletStore } from "../store/walletStore";

export function Toast() {
  const toast = useWalletStore((s) => s.toast);
  const clear = useWalletStore((s) => s.clearToast);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(clear, 3200);
    return () => clearTimeout(t);
  }, [toast, clear]);
  if (!toast) return null;
  return (
    <div
      className={`fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full px-5 py-2 text-sm ${
        toast.ok ? "bg-mint-glow text-flux-bg" : "bg-red-500 text-white"
      }`}
    >
      {toast.msg}
    </div>
  );
}
