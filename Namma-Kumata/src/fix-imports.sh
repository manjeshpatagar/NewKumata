#!/bin/bash

echo "🔧 Starting Next.js Migration Fix..."
echo "Fixing versioned imports in all TypeScript files..."

# Fix versioned imports in all .tsx and .ts files
find . -type f \( -name "*.tsx" -o -name "*.ts" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/.next/*" \
  -not -path "*/dist/*" \
  -exec sed -i.bak \
  -e 's/@radix-ui\/react-accordion@[0-9.]*/@radix-ui\/react-accordion/g' \
  -e 's/@radix-ui\/react-alert-dialog@[0-9.]*/@radix-ui\/react-alert-dialog/g' \
  -e 's/@radix-ui\/react-aspect-ratio@[0-9.]*/@radix-ui\/react-aspect-ratio/g' \
  -e 's/@radix-ui\/react-avatar@[0-9.]*/@radix-ui\/react-avatar/g' \
  -e 's/@radix-ui\/react-checkbox@[0-9.]*/@radix-ui\/react-checkbox/g' \
  -e 's/@radix-ui\/react-collapsible@[0-9.]*/@radix-ui\/react-collapsible/g' \
  -e 's/@radix-ui\/react-context-menu@[0-9.]*/@radix-ui\/react-context-menu/g' \
  -e 's/@radix-ui\/react-dialog@[0-9.]*/@radix-ui\/react-dialog/g' \
  -e 's/@radix-ui\/react-dropdown-menu@[0-9.]*/@radix-ui\/react-dropdown-menu/g' \
  -e 's/@radix-ui\/react-hover-card@[0-9.]*/@radix-ui\/react-hover-card/g' \
  -e 's/@radix-ui\/react-label@[0-9.]*/@radix-ui\/react-label/g' \
  -e 's/@radix-ui\/react-menubar@[0-9.]*/@radix-ui\/react-menubar/g' \
  -e 's/@radix-ui\/react-navigation-menu@[0-9.]*/@radix-ui\/react-navigation-menu/g' \
  -e 's/@radix-ui\/react-popover@[0-9.]*/@radix-ui\/react-popover/g' \
  -e 's/@radix-ui\/react-progress@[0-9.]*/@radix-ui\/react-progress/g' \
  -e 's/@radix-ui\/react-radio-group@[0-9.]*/@radix-ui\/react-radio-group/g' \
  -e 's/@radix-ui\/react-scroll-area@[0-9.]*/@radix-ui\/react-scroll-area/g' \
  -e 's/@radix-ui\/react-select@[0-9.]*/@radix-ui\/react-select/g' \
  -e 's/@radix-ui\/react-separator@[0-9.]*/@radix-ui\/react-separator/g' \
  -e 's/@radix-ui\/react-slider@[0-9.]*/@radix-ui\/react-slider/g' \
  -e 's/@radix-ui\/react-slot@[0-9.]*/@radix-ui\/react-slot/g' \
  -e 's/@radix-ui\/react-switch@[0-9.]*/@radix-ui\/react-switch/g' \
  -e 's/@radix-ui\/react-tabs@[0-9.]*/@radix-ui\/react-tabs/g' \
  -e 's/@radix-ui\/react-toast@[0-9.]*/@radix-ui\/react-toast/g' \
  -e 's/@radix-ui\/react-toggle@[0-9.]*/@radix-ui\/react-toggle/g' \
  -e 's/@radix-ui\/react-toggle-group@[0-9.]*/@radix-ui\/react-toggle-group/g' \
  -e 's/@radix-ui\/react-tooltip@[0-9.]*/@radix-ui\/react-tooltip/g' \
  -e 's/lucide-react@[0-9.]*/lucide-react/g' \
  -e 's/class-variance-authority@[0-9.]*/class-variance-authority/g' \
  -e 's/embla-carousel-react@[0-9.]*/embla-carousel-react/g' \
  -e 's/sonner@[0-9.]*/sonner/g' \
  -e 's/next-themes@[0-9.]*/next-themes/g' \
  -e 's/react-day-picker@[0-9.]*/react-day-picker/g' \
  -e 's/recharts@[0-9.]*/recharts/g' \
  -e 's/date-fns@[0-9.]*/date-fns/g' \
  -e 's/react-hook-form@[0-9.]*/react-hook-form/g' \
  -e 's/clsx@[0-9.]*/clsx/g' \
  -e 's/tailwind-merge@[0-9.]*/tailwind-merge/g' \
  -e 's/cmdk@[0-9.]*/cmdk/g' \
  -e 's/vaul@[0-9.]*/vaul/g' \
  {} +

# Remove backup files
find . -type f -name "*.bak" -delete

echo "✅ Versioned imports fixed!"
echo "✅ Backup files cleaned up!"
echo ""
echo "📝 Next steps:"
echo "1. Manually add 'use client' to component files with hooks/events"
echo "2. Convert relative imports (../) to absolute imports (@/)"
echo "3. Test with 'npm run dev'"
