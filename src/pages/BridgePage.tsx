import { useState } from "react";
import { getOrCreateDemoBalance, rerollDemoBalance } from "../lib/demoBalance";
import { greetInsight } from "../lib/fluxAi";
import { useWalletStore } from "../store/walletStore";

export function BridgePage() {
  const session = useWalletStore((s) => s.session)!;
  const toastOk = useWalletStore((s) => s.toastOk);
  const [demo, setDemo] = useState(() => getOrCreateDemoBalance(session.address));

  function refresh() {
    setDemo(rerollDemoBalance(session.address));
    toastOk("已刷新演示余额");
  }

  return (
    <div className="space-y-5">
      <h1 className="text-lg font-semibold text-white">舰桥总览</h1>

      <div className="rounded-2xl border border-violet-glow/30 bg-gradient-to-br from-flux-panel to-violet-deep/20 p-5">
        <p className="text-xs text-mint-glow">演示资产 · 非链上真实余额</p>
        <p className="mt-2 font-mono text-3xl font-bold text-white">{demo.eth} ETH</p>
        <p className="text-sm text-gray-400">≈ ${demo.usd} USD</p>
        <p className="mt-2 text-sm text-violet-glow">稳定币演示 {demo.stables} USDC</p>
        <button
          type="button"
          onClick={refresh}
          className="mt-4 rounded-lg border border-mint-glow/40 px-4 py-2 text-sm text-mint-glow"
        >
          随机刷新余额
        </button>
      </div>

      <div className="rounded-xl border border-flux-line bg-flux-panel/80 p-4">
        <p className="text-xs text-violet-glow">智伴简报</p>
        <p className="mt-2 text-sm leading-relaxed text-gray-300">{greetInsight(demo.eth)}</p>
      </div>

      <p className="text-center text-xs text-gray-500">
        链上 Sepolia 真实余额以转出页 RPC 为准；此处仅为 UI 演示。
      </p>
    </div>
  );
}
