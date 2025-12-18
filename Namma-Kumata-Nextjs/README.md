# Namma Kumta - Next.js 14 Migration

This is the Next.js 14 (App Router) version of the Namma Kumta project, migrated from the original React + Vite setup.

## 🚀 Project Structure

```
Namma-Kumata-Nextjs/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx             # Homepage
│   ├── explore/             # Explore page
│   ├── ads/                 # Advertisements page
│   ├── favorites/           # Favorites page
│   └── auth/                # Authentication pages
│       ├── login/
│       └── register/
├── components/              # React components (migrated from original)
├── contexts/                # React contexts (Auth, Theme, Language, etc.)
├── hooks/                   # Custom React hooks
├── lib/                     # Utilities and API clients
│   ├── api/                 # API client setup
│   └── translations.ts      # Translation files
├── styles/                  # Global styles
└── public/                  # Static assets
```

## ✅ Completed Migration Tasks

1. ✅ Created Next.js 14 project structure with TypeScript
2. ✅ Set up package.json with all dependencies
3. ✅ Created Next.js config files (next.config.js, tsconfig.json, tailwind.config)
4. ✅ Migrated all contexts (Auth, Theme, Language, Favorites, Admin, Notification)
5. ✅ Migrated API utilities to `/lib/api`
6. ✅ Created root layout with all providers
7. ✅ Set up global styles
8. ✅ Created main app routes with SEO metadata
9. ✅ Copied all components and hooks from original project

## 🔄 Migration Notes

### Navigation Changes Needed

The original project used a custom router (`@/lib/router`). In Next.js, you should:

1. **Replace custom router imports:**
   ```tsx
   // OLD (React Router)
   import { useRouter, usePathname, useSearchParams } from '@/lib/router';
   
   // NEW (Next.js)
   import { useRouter, usePathname, useSearchParams } from 'next/navigation';
   ```

2. **Replace navigation calls:**
   ```tsx
   // OLD
   router.push('/page');
   
   // NEW (same API, but from next/navigation)
   router.push('/page');
   ```

3. **Replace Link components:**
   ```tsx
   // OLD
   <a href="/page">Link</a>
   
   // NEW
   import Link from 'next/link';
   <Link href="/page">Link</Link>
   ```

4. **Update components that use `onNavigate` prop:**
   - Components like `HomePage`, `ExplorePage`, etc. currently accept `onNavigate` prop
   - These should be updated to use Next.js `useRouter` hook directly
   - Or create a wrapper component that handles navigation

### Component Updates Required

1. **Add 'use client' directive** to components that use:
   - React hooks (useState, useEffect, etc.)
   - Browser APIs (localStorage, window, etc.)
   - Event handlers
   - Context hooks

2. **Update Image components:**
   ```tsx
   // OLD
   <img src="/image.jpg" alt="..." />
   
   // NEW
   import Image from 'next/image';
   <Image src="/image.jpg" alt="..." width={500} height={300} />
   ```

3. **Update dynamic routes:**
   - Original: `/detail?listingId=123`
   - Next.js: `/detail/[id]` or use searchParams in page component

## 📦 Dependencies

All dependencies from the original project have been included:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Radix UI components
- Axios
- Sonner (toast notifications)
- And all other UI libraries

## 🛠️ Setup Instructions

1. **Install dependencies:**
   ```bash
   cd Namma-Kumata-Nextjs
   npm install
   ```

2. **Set up environment variables:**
   Create `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5006/api/
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## 🔧 Remaining Tasks

1. **Update all components** to use Next.js navigation instead of custom router
2. **Convert all `<img>` tags** to Next.js `<Image>` component
3. **Update dynamic routes** to use Next.js route parameters
4. **Add SEO metadata** to all remaining pages
5. **Test all routes** and fix any navigation issues
6. **Update components** that pass `onNavigate` prop to use `useRouter` directly

## 📝 Key Files

- `app/layout.tsx` - Root layout with all providers
- `contexts/*.tsx` - All context providers migrated
- `lib/api/axiosClient.ts` - API client configured for Next.js
- `styles/globals.css` - Global styles from original project

## 🎯 Next Steps

1. Start by updating the `HomePage` component to remove `onNavigate` prop and use `useRouter` from `next/navigation`
2. Update all page components similarly
3. Replace all `<img>` with Next.js `<Image>` component
4. Test the application thoroughly
5. Add remaining routes that were in the original App.tsx

## 📚 Resources

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js Image Optimization](https://nextjs.org/docs/pages/api-reference/components/image)

