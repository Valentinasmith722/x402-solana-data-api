# Solana DeFi Intelligence API

> **Pay-per-request Solana data services powered by x402 protocol**
> 
> Every API call generates USDC revenue automatically. No subscriptions. No invoicing. No platform fees.

## 🚀 Live Endpoints

| Endpoint | Price | Description |
|----------|-------|-------------|
| `GET /api/price?token=SOL` | 0.005 USDC | Real-time token price feed |
| `GET /api/wallet/analyze?address=...` | 0.01 USDC | Portfolio analysis |
| `GET /api/yield?protocol=all` | 0.008 USDC | DeFi yield opportunities |
| `GET /health` | FREE | Service health check |

## 💰 Revenue Math

| Daily Requests | Daily Revenue | Monthly Revenue |
|----------------|---------------|-----------------|
| 1,000 | $5-8 USDC | ~$150-240 |
| 5,000 | $25-40 USDC | ~$750-1,200 |
| 10,000 | $50-80 USDC | ~$1,500-2,400 |

*Net after proxy (~$2/day) and VPS (~$20/mo) costs*

## 🛠️ Quick Deploy

```bash
# 1. Clone
git clone https://github.com/Valentinasmith722/x402-solana-data-api.git
cd x402-solana-data-api

# 2. Install
npm install

# 3. Configure
export HELIUS_API_KEY=your_key_here

# 4. Run
npm start
```

## 📦 Tech Stack

- **Hono** - Fast, lightweight web framework
- **x402** - Payment gating at HTTP layer
- **Playwright** - Browser automation (for advanced scraping)
- **Node.js 18+**

## 🔗 Links

- [x402 Protocol Docs](https://eco.com/support/en/articles/14839402-x402-protocol-explained)
- [Proxies.sx Marketplace](https://agents.proxies.sx/marketplace/)
- [Solana DeFi Pack](https://valentinasmith722.github.io/solana-defi-mastery)

---

**Support this project:**

If this API helped your trading bot, research, or DeFi strategy, consider supporting continued development:

**Solana (USDT):** `BKjS4agVRowFGqUuWHEKZerk3dCS52V1n4NdWaeNTo8E`
