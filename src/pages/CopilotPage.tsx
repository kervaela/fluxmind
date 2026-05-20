import { useState } from "react";
import { copilotReply } from "../lib/fluxAi";
import { useWalletStore } from "../store/walletStore";

interface Msg {
  role: "user" | "ai";
  text: string;
}

export function CopilotPage() {
  const session = useWalletStore((s) => s.session)!;
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: "你好，我是流思舱智伴。可问我余额、安全或 Gas。" },
  ]);

  function send(e: React.FormEvent) {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    const reply = copilotReply(q, session.address);
    setMsgs((m) => [...m, { role: "user", text: q }, { role: "ai", text: reply }]);
    setInput("");
  }

  return (
    <div className="flex h-[calc(100vh-11rem)] flex-col">
      <h1 className="mb-3 text-lg font-semibold text-white">流思智伴</h1>
      <div className="flex-1 space-y-3 overflow-y-auto rounded-xl border border-flux-line bg-flux-panel/60 p-4">
        {msgs.map((m, i) => (
          <div
            key={`${m.role}-${i}`}
            className={`max-w-[90%] rounded-xl px-3 py-2 text-sm ${
              m.role === "user"
                ? "ml-auto bg-violet-deep text-white"
                : "bg-flux-bg text-gray-300"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>
      <form onSubmit={send} className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入问题…"
          className="flex-1 rounded-lg border border-flux-line bg-flux-bg px-3 py-2 text-sm text-gray-100"
        />
        <button type="submit" className="rounded-lg bg-mint-glow px-4 py-2 text-sm font-medium text-flux-bg">
          发送
        </button>
      </form>
    </div>
  );
}
