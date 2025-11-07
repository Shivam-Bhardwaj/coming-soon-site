#!/bin/bash

# Deploy to Vercel using API token
# Usage: ./deploy.sh

set -e

VERCEL_TOKEN="${VERCEL_TOKEN:-XLFfhVZS3nlkcOGMuDoD1HvT}"
PROJECT_NAME="coming-soon-site"

echo "Building project..."
npm run build

echo "Deploying to Vercel..."
vercel --token "$VERCEL_TOKEN" --prod --yes

echo "Deployment complete!"

