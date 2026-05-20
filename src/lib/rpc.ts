import type { ChainNode } from "./chains";

async function rpc<T>(chain: ChainNode, method: string, params: unknown[]): Promise<T> {
  const res = await fetch(chain.rpcUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  const json = (await res.json()) as { result?: T; error?: { message: string } };
  if (json.error) throw new Error(json.error.message || "RPC 失败");
  if (json.result === undefined) throw new Error("RPC 无数据");
  return json.result;
}

export function parseAmount(amount: string, decimals = 18): bigint {
  const t = amount.trim();
  if (!t || Number.isNaN(Number(t)) || Number(t) <= 0) throw new Error("请输入有效金额");
  const [w, f = ""] = t.split(".");
  const pad = (f + "0".repeat(decimals)).slice(0, decimals);
  return BigInt(w) * 10n ** BigInt(decimals) + BigInt(pad || "0");
}

export async function fetchGasPrice(chain: ChainNode): Promise<string> {
  const hex = await rpc<string>(chain, "eth_gasPrice", []);
  return BigInt(hex).toString();
}

export async function broadcastRaw(chain: ChainNode, raw: string): Promise<string> {
  const tx = raw.startsWith("0x") ? raw : `0x${raw}`;
  return rpc<string>(chain, "eth_sendRawTransaction", [tx]);
}
