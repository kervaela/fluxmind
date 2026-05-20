/** 本地规则智伴文案（无外部 API） */

export function greetInsight(balanceEth: string): string {
  const n = parseFloat(balanceEth);
  if (n > 50) return "资产舱面充裕，建议分批转出并留意 Gas 波动。";
  if (n > 5) return "余额适中，转账前可在智伴页复述收款地址。";
  return "余额较薄，优先确认网络为 Sepolia 测试环境。";
}

export function analyzeTransfer(to: string, amount: string): string {
  const a = parseFloat(amount);
  if (!to.startsWith("0x") || to.length !== 42) {
    return "⚠ 收款地址格式异常，请核对后再签名。";
  }
  if (Number.isNaN(a) || a <= 0) return "请输入有效转出金额。";
  if (a > 10) return "大额转出：建议二次确认地址末四位与网络。";
  return `将向 ${to.slice(0, 8)}…${to.slice(-4)} 转出 ${amount} ETH，本地签名后可选广播。`;
}

export function copilotReply(input: string, address: string): string {
  const q = input.trim().toLowerCase();
  if (!q) return "告诉我你想查询余额、转账还是备份助记词。";
  if (q.includes("余额") || q.includes("balance")) {
    return `当前为演示随机余额（非链上），地址 ${address.slice(0, 10)}… 可在舰桥页刷新。`;
  }
  if (q.includes("安全") || q.includes("助记词")) {
    return "助记词仅保存在本机，请勿截图上传；断开请点上锁。";
  }
  if (q.includes("gas") || q.includes("费")) {
    return "Gas 由公共 RPC 估算，测试网可能波动，广播失败可稍后重试。";
  }
  return "我是流思舱智伴：可帮你解读转出风险、提醒测试网操作，密钥永不上传。";
}
