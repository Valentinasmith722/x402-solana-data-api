# 🔥 x402 Solana DeFi Data API

AI-agent compatible DeFi data API with automatic USDC payments. No accounts. No KYC. No API keys.

## What is x402?

[x402](https://github.com/coinbase/x402) is a protocol where your API returns `402 Payment Required` with the price. The client (usually an AI agent) pays USDC on Solana and gets the result. Settlement takes ~400ms. You keep 100% of revenue.

## Endpoints

| Endpoint | Price | Description |
|----------|-------|-------------|
| `GET /protocol/:name` | $0.005 | Protocol TVL, market cap, chain data |
| `GET /token/:mint` | $0.003 | Token price, volume, liquidity |
| `GET /yield` | $0.008 | Best yield farming opportunities |
| `GET /airdrops` | $0.004 | Active and upcoming airdrops |

## Quick Start

```bash
git clone https://github.com/Valentinasmith722/x402-solana-data-api.git
cd x402-solana-data-api
bun install
cp .env.example .env
# Edit .env with your Proxies.sx credentials
bun run dev
```

## Deploy to Railway (Free)

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

## Economics

At 10,000 requests/day:
- Revenue: ~$200/day
- Proxy cost: ~$6/day
- Hosting: ~$5/month
- **Net: ~$190/day = $5,700/month**

## Why This Matters

Traditional API marketplaces take 20-30% commission. x402 takes 0%. You keep every cent.

## License

MIT — Build freely, earn passively.

---

*This tool is 100% free and open source. If this project helped you monetize your data, consider supporting its continued development.*

**Solana (USDT):** `BKjS4agVRowFGqUuWHEKZerk3dCS52V1n4NdWaeNTo8E`
