# FluxMind 流思舱

AI 智伴 Web3 自托管钱包 — 紫薄荷流光 UI、本地智伴对话、**随机演示余额**；集成 TokenCore。

## 开发

```bash
cd wallets/fluxmind
npm install
npm run dev
```

**http://localhost:5191/**

## 页面

| 路由 | 说明 |
|------|------|
| `/` | 启航建舱 / 解锁 |
| `/bridge` | 舰桥：随机演示余额 + 智伴简报 |
| `/copilot` | 流思智伴对话 |
| `/send` | 智伴解读 + Sepolia 转账 |

> 舰桥余额为按地址种子生成的**演示数据**，非链上真实资产；可点「随机刷新余额」。
