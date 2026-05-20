export function shorten(addr: string, n = 6): string {
  if (!addr || addr.length < 12) return addr;
  return `${addr.slice(0, n + 2)}…${addr.slice(-n)}`;
}

export function normalizeAddr(addr: string): string {
  const t = addr.trim();
  if (!/^0x[a-fA-F0-9]{40}$/.test(t)) throw new Error("无效 EVM 地址");
  return t;
}
