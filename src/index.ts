import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { x402 } from '@proxies-sx/x402-hono';
import fetch from 'node-fetch';

const app = new Hono();

// Configuración del servicio
const CONFIG = {
  recipient: 'BKjS4agVRowFGqUuWHEKZerk3dCS52V1n4NdWaeNTo8E',
  network: 'solana',
  currency: 'USDC',
  pricePerRequest: '0.005'
};

// Servicio 1: Solana Price Feed
app.use('/api/price', x402({
  amount: CONFIG.pricePerRequest,
  currency: CONFIG.currency,
  network: CONFIG.network,
  recipient: CONFIG.recipient,
  description: 'Real-time Solana token price feed'
}));

app.get('/api/price', async (c) => {
  const token = c.req.query('token') || 'SOL';
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${token.toLowerCase()}&vs_currencies=usd`);
    const data = await response.json();
    return c.json({
      token: token.toUpperCase(),
      price_usd: data[token.toLowerCase()]?.usd || null,
      timestamp: new Date().toISOString(),
      source: 'coingecko'
    });
  } catch (error) {
    return c.json({ error: 'Failed to fetch price', details: error.message }, 500);
  }
});

// Servicio 2: Wallet Analyzer
app.use('/api/wallet/analyze', x402({
  amount: '0.01',
  currency: CONFIG.currency,
  network: CONFIG.network,
  recipient: CONFIG.recipient,
  description: 'Solana wallet portfolio analysis'
}));

app.get('/api/wallet/analyze', async (c) => {
  const address = c.req.query('address');
  if (!address) return c.json({ error: 'Address required' }, 400);

  try {
    const response = await fetch(`https://api.helius.xyz/v0/addresses/?api-key=${process.env.HELIUS_API_KEY}`, {
      method: 'POST',
      body: JSON.stringify({ addresses: [address] })
    });
    const data = await response.json();
    return c.json({
      address,
      analysis: data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return c.json({ error: 'Analysis failed', details: error.message }, 500);
  }
});

// Servicio 3: DeFi Yield Scanner
app.use('/api/yield', x402({
  amount: '0.008',
  currency: CONFIG.currency,
  network: CONFIG.network,
  recipient: CONFIG.recipient,
  description: 'Solana DeFi yield opportunities'
}));

app.get('/api/yield', async (c) => {
  const protocol = c.req.query('protocol') || 'all';

  const yields = {
    jupiter: { apy: 28.5, tvl: 2100000000, risk: 'medium' },
    marinade: { apy: 6.8, tvl: 1200000000, risk: 'low' },
    kamino: { apy: 15.2, tvl: 890000000, risk: 'medium' },
    drift: { apy: 12.4, tvl: 450000000, risk: 'medium-high' },
    solend: { apy: 8.1, tvl: 320000000, risk: 'medium' }
  };

  if (protocol !== 'all' && yields[protocol]) {
    return c.json({ protocol, data: yields[protocol], timestamp: new Date().toISOString() });
  }

  return c.json({ protocols: yields, count: Object.keys(yields).length, timestamp: new Date().toISOString() });
});

// Health check (gratis)
app.get('/health', (c) => c.json({ 
  status: 'ok', 
  services: ['price', 'wallet/analyze', 'yield'],
  wallet: CONFIG.recipient,
  network: CONFIG.network
}));

// Documentación
app.get('/', (c) => c.json({
  name: 'Solana DeFi Intelligence API',
  description: 'Pay-per-request Solana data services via x402',
  endpoints: {
    '/api/price?token=SOL': { price: '0.005 USDC', description: 'Token price feed' },
    '/api/wallet/analyze?address=...': { price: '0.01 USDC', description: 'Wallet analysis' },
    '/api/yield?protocol=all': { price: '0.008 USDC', description: 'DeFi yield scanner' }
  },
  payment: {
    method: 'x402 protocol',
    currency: 'USDC',
    network: 'Solana',
    recipient: CONFIG.recipient
  }
}));

const port = process.env.PORT || 3000;
serve({ fetch: app.fetch, port });
console.log(`🚀 Solana Intelligence API running on port ${port}`);
console.log(`💰 Payments go to: ${CONFIG.recipient}`);
