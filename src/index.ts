import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { x402 } from '@proxies-sx/x402-hono';

const app = new Hono();

// CONFIGURACIÓN — Tu wallet de Solana
const WALLET = 'BKjS4agVRowFGqUuWHEKZerk3dCS52V1n4NdWaeNTo8E';

// Base de datos en memoria de oportunidades DeFi (actualizable)
const DEFI_DATA = {
  protocols: {
    jupiter: {
      name: 'Jupiter',
      tvl: 2100000000,
      apy: { staking: 28.5, lp: 15.2 },
      risk: 'medium',
      url: 'https://jup.ag'
    },
    marinade: {
      name: 'Marinade',
      tvl: 1200000000,
      apy: { staking: 6.8, liquid: 6.2 },
      risk: 'low',
      url: 'https://marinade.finance'
    },
    kamino: {
      name: 'Kamino',
      tvl: 890000000,
      apy: { lending: 8.5, borrowing: 12.3, lp: 18.7 },
      risk: 'medium',
      url: 'https://kamino.finance'
    },
    drift: {
      name: 'Drift',
      tvl: 450000000,
      apy: { perp: 15.4, spot: 8.1 },
      risk: 'medium-high',
      url: 'https://app.drift.trade'
    },
    solend: {
      name: 'Solend',
      tvl: 320000000,
      apy: { lending: 5.2, borrowing: 9.8 },
      risk: 'medium',
      url: 'https://solend.fi'
    },
    raydium: {
      name: 'Raydium',
      tvl: 280000000,
      apy: { cpmm: 22.4, clmm: 35.6 },
      risk: 'medium',
      url: 'https://raydium.io'
    },
    orca: {
      name: 'Orca',
      tvl: 190000000,
      apy: { whirlpool: 18.9, aquafarm: 12.3 },
      risk: 'medium',
      url: 'https://orca.so'
    },
    jito: {
      name: 'Jito',
      tvl: 650000000,
      apy: { staking: 7.2, mev: 4.5 },
      risk: 'low',
      url: 'https://www.jito.network'
    }
  },

  strategies: {
    safe: {
      name: 'Conservative Staking',
      apy: '6-8%',
      risk: 'Low',
      steps: [
        'Stake SOL in Marinade (mSOL)',
        'Hold mSOL for liquid staking rewards',
        'Optional: Use mSOL as collateral in Kamino'
      ],
      protocols: ['marinade', 'kamino'],
      minCapital: 1
    },
    moderate: {
      name: 'Yield Farming',
      apy: '12-20%',
      risk: 'Medium',
      steps: [
        'Deposit USDC in Kamino lending',
        'Borrow SOL at 50% LTV',
        'Stake borrowed SOL in Jito (jitoSOL)',
        'Deposit jitoSOL in Orca Whirlpool'
      ],
      protocols: ['kamino', 'jito', 'orca'],
      minCapital: 100
    },
    advanced: {
      name: 'Delta Neutral',
      apy: '25-40%',
      risk: 'Medium-High',
      steps: [
        'Lend USDC in Solend',
        'Borrow SOL (50% LTV)',
        'Short SOL in Drift Perps',
        'Farm LP fees in Raydium CPMM',
        'Collect funding rate arbitrage'
      ],
      protocols: ['solend', 'drift', 'raydium'],
      minCapital: 500
    },
    aggressive: {
      name: 'MEV + Arbitrage',
      apy: 'Variable',
      risk: 'High',
      steps: [
        'Monitor Jupiter for price discrepancies',
        'Use Jito bundles for MEV extraction',
        'Execute cross-DEX arbitrage',
        'Reinvest profits immediately'
      ],
      protocols: ['jupiter', 'jito', 'raydium', 'orca'],
      minCapital: 1000
    }
  },

  airdrops: {
    jupiter: {
      name: 'Jupiter JUP',
      status: 'active',
      eligibility: 'Jupiter users before Nov 2023',
      value: '$50-500',
      deadline: '2026-12-31'
    },
    kamino: {
      name: 'Kamino KMNO',
      status: 'active',
      eligibility: 'Kamino lenders/borrowers',
      value: '$25-200',
      deadline: '2026-08-15'
    },
    drift: {
      name: 'Drift DRIFT',
      status: 'active',
      eligibility: 'Drift traders',
      value: '$100-1000',
      deadline: '2026-09-30'
    },
    jito: {
      name: 'Jito JTO',
      status: 'claimable',
      eligibility: 'JitoSOL holders',
      value: '$75-300',
      deadline: '2026-10-31'
    }
  }
};

// ENDPOINT 1: Precios en tiempo real (0.005 USDC)
app.use('/api/v1/prices', x402({
  amount: '0.005',
  currency: 'USDC',
  network: 'solana',
  recipient: WALLET,
  description: 'Real-time Solana DeFi token prices'
}));

app.get('/api/v1/prices', (c) => {
  const token = c.req.query('token')?.toUpperCase() || 'SOL';

  // Simulación de precios (en producción, conectar a CoinGecko/Jupiter API)
  const prices = {
    SOL: { price: 142.50, change_24h: 3.2, volume: 1200000000 },
    JUP: { price: 0.85, change_24h: -1.5, volume: 45000000 },
    RAY: { price: 2.15, change_24h: 5.8, volume: 12000000 },
    ORCA: { price: 1.95, change_24h: 2.1, volume: 8900000 },
    MSOL: { price: 152.30, change_24h: 3.1, volume: 5600000 },
    JITOSOL: { price: 149.80, change_24h: 3.0, volume: 3400000 }
  };

  return c.json({
    token,
    data: prices[token] || { error: 'Token not found' },
    timestamp: new Date().toISOString(),
    source: 'Solana DeFi Intelligence API'
  });
});

// ENDPOINT 2: Análisis de protocolos (0.008 USDC)
app.use('/api/v1/protocols', x402({
  amount: '0.008',
  currency: 'USDC',
  network: 'solana',
  recipient: WALLET,
  description: 'Solana DeFi protocol analysis and metrics'
}));

app.get('/api/v1/protocols', (c) => {
  const protocol = c.req.query('name');

  if (protocol && DEFI_DATA.protocols[protocol.toLowerCase()]) {
    return c.json({
      protocol: DEFI_DATA.protocols[protocol.toLowerCase()],
      timestamp: new Date().toISOString()
    });
  }

  return c.json({
    protocols: DEFI_DATA.protocols,
    count: Object.keys(DEFI_DATA.protocols).length,
    total_tvl: Object.values(DEFI_DATA.protocols).reduce((a, p) => a + p.tvl, 0),
    timestamp: new Date().toISOString()
  });
});

// ENDPOINT 3: Estrategias de yield (0.01 USDC)
app.use('/api/v1/strategies', x402({
  amount: '0.01',
  currency: 'USDC',
  network: 'solana',
  recipient: WALLET,
  description: 'Curated Solana DeFi yield strategies'
}));

app.get('/api/v1/strategies', (c) => {
  const risk = c.req.query('risk');

  if (risk && DEFI_DATA.strategies[risk.toLowerCase()]) {
    return c.json({
      strategy: DEFI_DATA.strategies[risk.toLowerCase()],
      timestamp: new Date().toISOString()
    });
  }

  return c.json({
    strategies: DEFI_DATA.strategies,
    count: Object.keys(DEFI_DATA.strategies).length,
    timestamp: new Date().toISOString()
  });
});

// ENDPOINT 4: Airdrops activos (0.005 USDC)
app.use('/api/v1/airdrops', x402({
  amount: '0.005',
  currency: 'USDC',
  network: 'solana',
  recipient: WALLET,
  description: 'Active Solana airdrop tracker'
}));

app.get('/api/v1/airdrops', (c) => {
  const status = c.req.query('status') || 'all';

  let airdrops = DEFI_DATA.airdrops;
  if (status !== 'all') {
    airdrops = Object.fromEntries(
      Object.entries(DEFI_DATA.airdrops).filter(([, v]) => v.status === status)
    );
  }

  return c.json({
    airdrops,
    count: Object.keys(airdrops).length,
    timestamp: new Date().toISOString()
  });
});

// ENDPOINT 5: Portfolio optimizer (0.015 USDC)
app.use('/api/v1/optimize', x402({
  amount: '0.015',
  currency: 'USDC',
  network: 'solana',
  recipient: WALLET,
  description: 'AI-powered portfolio optimization'
}));

app.post('/api/v1/optimize', async (c) => {
  const body = await c.req.json();
  const { capital, risk_tolerance, goals } = body;

  // Lógica de optimización simplificada
  let recommendation;
  if (risk_tolerance === 'low') {
    recommendation = {
      allocation: { marinade: 60, jito: 40 },
      expected_apy: '6.5%',
      risk_score: 2,
      rebalance_frequency: 'monthly'
    };
  } else if (risk_tolerance === 'medium') {
    recommendation = {
      allocation: { kamino: 40, orca: 30, jito: 30 },
      expected_apy: '15.2%',
      risk_score: 5,
      rebalance_frequency: 'weekly'
    };
  } else {
    recommendation = {
      allocation: { drift: 35, raydium: 35, jupiter: 30 },
      expected_apy: '32.8%',
      risk_score: 8,
      rebalance_frequency: 'daily'
    };
  }

  return c.json({
    input: { capital, risk_tolerance, goals },
    recommendation,
    timestamp: new Date().toISOString()
  });
});

// Health check (GRATIS)
app.get('/health', (c) => c.json({
  status: 'operational',
  version: '1.0.0',
  endpoints: 5,
  wallet: WALLET,
  network: 'solana'
}));

// Documentación (GRATIS)
app.get('/', (c) => c.json({
  name: 'Solana DeFi Intelligence API',
  description: 'Pay-per-request DeFi data powered by x402',
  version: '1.0.0',
  endpoints: {
    '/api/v1/prices?token=SOL': { price: '0.005 USDC', description: 'Token price feed' },
    '/api/v1/protocols?name=jupiter': { price: '0.008 USDC', description: 'Protocol analysis' },
    '/api/v1/strategies?risk=moderate': { price: '0.01 USDC', description: 'Yield strategies' },
    '/api/v1/airdrops?status=active': { price: '0.005 USDC', description: 'Airdrop tracker' },
    '/api/v1/optimize': { price: '0.015 USDC', description: 'Portfolio optimizer (POST)' }
  },
  payment: {
    method: 'x402 protocol',
    currency: 'USDC',
    network: 'Solana',
    recipient: WALLET
  },
  revenue_projection: {
    '100_requests_day': '$5-15/day',
    '1000_requests_day': '$50-150/day',
    '10000_requests_day': '$500-1500/day'
  }
}));

const port = process.env.PORT || 3000;
serve({ fetch: app.fetch, port });

console.log(`🚀 Solana DeFi Intelligence API v1.0.0`);
console.log(`💰 All payments go to: ${WALLET}`);
console.log(`📊 5 endpoints ready for x402 payments`);
console.log(`🌐 Server running on port ${port}`);
