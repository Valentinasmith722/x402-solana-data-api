#!/bin/bash
# Deploy x402 Solana Data API to Railway (Free Tier)
# Run: bash deploy.sh

set -e

echo "🚀 Deploying x402 Solana Data API to Railway..."

# Check dependencies
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

if ! command -v bun &> /dev/null; then
    echo "📦 Installing Bun..."
    curl -fsSL https://bun.sh/install | bash
    export PATH="$HOME/.bun/bin:$PATH"
fi

# Login
echo "🔑 Logging into Railway..."
railway login

# Create project
echo "📁 Creating project..."
railway init --name "x402-solana-api"

# Set environment variables
echo "⚙️ Setting environment variables..."
railway variables set PROXIES_SX_URL="http://proxy.proxies.sx:8080"
railway variables set RECIPIENT_ADDRESS="BKjS4agVRowFGqUuWHEKZerk3dCS52V1n4NdWaeNTo8E"
railway variables set NETWORK="solana"
railway variables set TOKEN="USDC"
railway variables set PORT="3000"
railway variables set NODE_ENV="production"

# Deploy
echo "🚢 Deploying..."
railway up

# Get URL
echo "🔗 Getting deployment URL..."
URL=$(railway domain)
echo "✅ Deployed to: $URL"
echo ""
echo "💰 All payments go to: BKjS4agVRowFGqUuWHEKZerk3dCS52V1n4NdWaeNTo8E"
echo "📊 Monitor revenue at: https://proxies.sx/dashboard"
