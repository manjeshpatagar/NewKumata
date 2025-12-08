#!/bin/bash
echo "Cleaning Next.js cache..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .turbo
echo "Cache cleared! Now restart the dev server with: npm run dev"

