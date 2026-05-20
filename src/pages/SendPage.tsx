import { useState } from "react";
import { DEFAULT_CHAIN, getChain } from "../lib/chains";
import { analyzeTransfer } from "../lib/fluxAi";
import { signTransfer } from "../lib/walletCore";
import { useWalletStore } from "../store/walletStore";

export function SendPage() {
  const session = useWalletStore((s) => s.session)!;
  const password = useWalletStore((s) => s.walletPassword);
  const toastOk = useWalletStore((s) => s.toastOk);
  const toastErr = useWalletStore((s) => s.toastErr);
  const chain = getChain(DEFAULT_CHAIN);
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [hint, setHint] = useState("");
  const [busy, setBusy] = useState(false);

  function onAnalyze() {
    setHint(analyzeTransfer(to, amount));
  }

  async function onSend(e: React.FormEvent) {
    e.preventDefault();
    if (!password) return toastErr("请重新解锁");
    setBusy(true);
    try {
      const res = await signTransfer(session, password, chain, to, amount, true);
      toastOk(res.txHash ? `已广播 ${res.txHash.slice(0, 14)}…` : "已签名");
    } catch (err) {
      toastErr(err instanceof Error ? err.message : "转出失败");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <h1 className="text-lg font-semibold text-white">智伴转出</h1>
      <form onSubmit={onSend} className="space-y-3 rounded-2xl border border-flux-line bg-flux-panel p-5">
        <input
          placeholder="收款地址 0x…"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full rounded-lg border border-flux-line bg-flux-bg px-3 py-2 font-mono text-sm text-gray-100"
        />
        <input
          placeholder={`金额 (${chain.nativeSymbol})`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-lg border border-flux-line bg-flux-bg px-3 py-2 text-gray-100"
        />
        <button
          type="button"
          onClick={onAnalyze}
          className="w-full rounded-lg border border-violet-glow/50 py-2 text-sm text-violet-glow"
        >
          智伴解读
        </button>
        {hint && <p className="rounded-lg bg-flux-bg p-3 text-sm text-mint-glow">{hint}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-gradient-to-r from-violet-deep to-mint-glow py-3 font-medium text-white disabled:opacity-60"
        >
          {busy ? "签名中…" : "签名并广播 (Sepolia)"}
        </button>
      </form>
    </div>
  );
}
