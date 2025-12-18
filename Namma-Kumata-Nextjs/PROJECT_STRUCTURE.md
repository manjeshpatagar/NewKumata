# Namma Kumta Next.js - Project Structure

## 📁 Complete Folder Structure

```
Namma-Kumata-Nextjs/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with all providers
│   ├── page.tsx                  # Homepage (/)
│   │
│   ├── explore/
│   │   └── page.tsx              # Explore page (/explore)
│   │
│   ├── ads/
│   │   └── page.tsx              # Advertisements page (/ads)
│   │
│   ├── favorites/
│   │   └── page.tsx              # Favorites page (/favorites)
│   │
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx         # Login page (/auth/login)
│   │   └── register/
│   │       └── page.tsx         # Register page (/auth/register)
│   │
│   └── admin/                    # Admin routes (to be created)
│
├── components/                   # React Components
│   ├── HomePage.tsx
│   ├── ExplorePage.tsx
│   ├── AdvertisementsPage.tsx
│   ├── FavoritesPage.tsx
│   ├── ProfilePage.tsx
│   ├── CategoriesPage.tsx
│   ├── DetailPage.tsx
│   ├── BottomNav.tsx
│   ├── WeatherWidget.tsx
│   │
│   ├── auth/                     # Auth components
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   └── ForgotPasswordScreen.tsx
│   │
│   ├── admin/                    # Admin components
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminLoginPage.tsx
│   │   ├── AdminShopsPage.tsx
│   │   ├── AdminAdsPage.tsx
│   │   └── ...
│   │
│   ├── ui/                       # UI components (Radix UI)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ... (48 files)
│   │
│   ├── common/                   # Common components
│   ├── cards/                    # Card components
│   ├── features/                 # Feature components
│   └── ...
│
├── contexts/                     # React Contexts
│   ├── AuthContext.tsx          # User authentication
│   ├── ThemeContext.tsx          # Dark/light theme
│   ├── LanguageContext.tsx       # i18n (English/Kannada)
│   ├── FavoritesContext.tsx     # Favorites management
│   ├── NotificationContext.tsx   # Notifications
│   └── AdminContext.tsx          # Admin state
│
├── hooks/                        # Custom Hooks
│   └── useRequireAuth.ts        # Auth requirement hook
│
├── lib/                          # Utilities & Libraries
│   ├── api/                      # API clients
│   │   ├── axiosClient.ts       # Axios configuration
│   │   ├── authApi.ts           # Auth API calls
│   │   └── profile.ts           # Profile API calls
│   │
│   ├── translations.ts          # Translation strings
│   ├── categoryData.ts          # Category data
│   ├── advertisementData.ts     # Advertisement data
│   ├── mockListingsData.ts      # Mock listings
│   └── subcategoryImages.ts    # Subcategory images
│
├── styles/                       # Styles
│   └── globals.css              # Global CSS with Tailwind
│
├── public/                       # Static Assets
│   └── assets/                  # Images and media files
│
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── next.config.js                # Next.js config
├── tailwind.config.ts            # Tailwind config
├── postcss.config.js             # PostCSS config
├── .gitignore                    # Git ignore rules
├── .env.example                  # Environment variables template
│
├── README.md                     # Project documentation
├── MIGRATION_SUMMARY.md          # Migration details
└── PROJECT_STRUCTURE.md          # This file
```

## 🔑 Key Files

### Configuration Files
- **package.json** - All project dependencies
- **tsconfig.json** - TypeScript configuration
- **next.config.js** - Next.js configuration (image domains, etc.)
- **tailwind.config.ts** - Tailwind CSS configuration
- **postcss.config.js** - PostCSS configuration

### Core Application Files
- **app/layout.tsx** - Root layout wrapping all pages with providers
- **app/page.tsx** - Homepage route
- **styles/globals.css** - Global styles and CSS variables

### Context Providers
All contexts are client components ('use client'):
- **AuthContext** - Manages user authentication state
- **ThemeContext** - Manages dark/light theme
- **LanguageContext** - Manages language (en/kn) and translations
- **FavoritesContext** - Manages user favorites
- **NotificationContext** - Manages notifications
- **AdminContext** - Manages admin state and data

### API Layer
- **lib/api/axiosClient.ts** - Configured Axios instance with interceptors
- **lib/api/authApi.ts** - Authentication API methods
- **lib/api/profile.ts** - Profile API methods

## 📊 Statistics

- **Total Components:** 100+ components
- **Context Providers:** 6
- **Custom Hooks:** 1+ (useRequireAuth)
- **UI Components:** 48 (Radix UI based)
- **App Routes:** 6+ main routes created
- **API Clients:** 3

## 🎯 Route Structure

### Public Routes
- `/` - Homepage
- `/explore` - Explore local places
- `/ads` - Browse advertisements
- `/favorites` - User favorites
- `/auth/login` - Login page
- `/auth/register` - Register page

### Protected Routes (To be created)
- `/profile` - User profile
- `/categories` - Categories listing
- `/subcategory` - Subcategory page
- `/category-listings` - Category listings
- `/detail` - Detail page
- `/add-advertisement` - Add advertisement
- `/edit-advertisement` - Edit advertisement
- `/notifications` - Notifications
- `/settings` - Settings
- `/emergency` - Emergency contacts
- `/help` - Help page
- `/contact-us` - Contact us
- `/terms-conditions` - Terms & conditions
- `/privacy-policy` - Privacy policy
- `/about` - About page

### Admin Routes (To be created)
- `/admin-login` - Admin login
- `/admin` - Admin dashboard
- `/admin/shops` - Manage shops
- `/admin/ads` - Manage ads
- `/admin/users` - Manage users
- `/admin/categories` - Manage categories
- `/admin/notifications` - Manage notifications
- `/admin/analytics` - Analytics

## 🔄 Migration Status

✅ **Completed:**
- Project structure
- All contexts
- API utilities
- Main routes (home, explore, ads, favorites, auth)
- Global styles
- All components copied
- All hooks copied

🔄 **In Progress:**
- Updating components to use Next.js navigation
- Converting images to Next.js Image component
- Adding remaining routes

## 📝 Notes

- All components are copied from the original project
- Components may need updates to use Next.js navigation
- Some components use `onNavigate` prop which should be replaced with `useRouter` from `next/navigation`
- All contexts work as client components
- API calls work the same way as original

