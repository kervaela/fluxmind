import type { DemoBalance } from "../types";

const KEY = "fluxmind-demo-balance";

function hashSeed(addr: string): number {
  const s = addr.toLowerCase();
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** 按地址种子生成稳定随机演示余额（非链上真实资产） */
export function getOrCreateDemoBalance(address: string, refresh = false): DemoBalance {
  if (!refresh) {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw) as DemoBalance & { address?: string };
        if (saved.address === address.toLowerCase()) {
          return {
            eth: saved.eth,
            usd: saved.usd,
            stables: saved.stables,
            generatedAt: saved.generatedAt,
          };
        }
      }
    } catch {
      /* ignore */
    }
  }

  const h = hashSeed(address);
  const eth = ((h % 128_50) / 100 + 1.08).toFixed(4);
  const rate = 2100 + (h % 1200);
  const usd = (parseFloat(eth) * rate).toFixed(2);
  const stables = ((h % 8500) / 100 + 120).toFixed(2);
  const bal: DemoBalance & { address: string } = {
    eth,
    usd,
    stables,
    generatedAt: Date.now(),
    address: address.toLowerCase(),
  };
  localStorage.setItem(KEY, JSON.stringify(bal));
  return bal;
}

export function rerollDemoBalance(address: string): DemoBalance {
  localStorage.removeItem(KEY);
  const h = (hashSeed(address) + Date.now()) >>> 0;
  const eth = ((h % 99_99) / 100 + 0.5).toFixed(4);
  const usd = (parseFloat(eth) * (1950 + (h % 900))).toFixed(2);
  const stables = ((h % 6200) / 100 + 80).toFixed(2);
  const bal: DemoBalance & { address: string } = {
    eth,
    usd,
    stables,
    generatedAt: Date.now(),
    address: address.toLowerCase(),
  };
  localStorage.setItem(KEY, JSON.stringify(bal));
  return bal;
}
