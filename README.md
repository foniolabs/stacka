# STACKA - Smart Investment Platform

> One wallet. All your investments. Powered by AI.

STACKA is a next-generation investment platform that bridges crypto and traditional finance. Built for crypto-native users, STACKA provides a unified interface to invest in stocks, crypto, and DeFi protocols using USDC.

![STACKA Platform](https://img.shields.io/badge/Status-Beta-yellow)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## Features

- **Multi-Asset Investment**: Trade Nigerian stocks, US stocks, cryptocurrency, and DeFi all from one platform
- **USDC-Based**: Use USDC as your primary currency for all investments
- **AI-Powered Insights**: Get personalized investment recommendations powered by Claude AI
- **Mobile-First PWA**: Optimized for mobile with progressive web app capabilities
- **Real-Time Portfolio**: Track your investments with live updates and analytics
- **Secure & Regulated**: Bank-level security with regulatory compliance

## Tech Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

### Backend (Already Built)
- Node.js + Express
- PostgreSQL + Prisma
- Redis for caching
- Blockchain integration (viem)

## Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn
- Backend API running (default: http://localhost:4000)

### Installation

1. **Clone the repository** (if not already done)

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
```bash
# The .env.local file should already exist with:
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_APP_NAME=STACKA
```

4. **Make sure your backend is running**:
```bash
# In your backend directory
npm run dev
# Should be running on http://localhost:4000
```

5. **Run the development server**:
```bash
npm run dev
```

6. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
stacka/
├── app/                    # Next.js app directory (routes)
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   ├── trade/            # Trading interface
│   ├── wallet/           # Wallet management
│   ├── portfolio/        # Portfolio view
│   ├── layout.tsx        # Root layout with fonts
│   ├── page.tsx          # Landing page
│   └── globals.css       # Global styles & design system
│
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx    # Primary button component
│   │   ├── Input.tsx     # Form input component
│   │   └── Card.tsx      # Card container
│   └── layout/           # Layout components
│       ├── Header.tsx    # Page header
│       └── MobileNav.tsx # Bottom navigation
│
├── lib/                   # Utilities and helpers
│   ├── api/              # API client
│   │   └── client.ts     # Axios instance with interceptors
│   └── utils.ts          # Utility functions
│
├── store/                 # Zustand state management
│   ├── authStore.ts      # Authentication state
│   ├── walletStore.ts    # Wallet state
│   └── portfolioStore.ts # Portfolio state
│
├── types/                 # TypeScript type definitions
│   └── index.ts          # Shared types
│
├── public/               # Static assets
│   └── manifest.json     # PWA manifest
│
├── tailwind.config.ts    # Tailwind configuration
├── next.config.ts        # Next.js configuration
└── tsconfig.json         # TypeScript configuration
```

## Available Pages

- `/` - Landing page with hero and features
- `/login` - User login
- `/signup` - User registration
- `/dashboard` - Main dashboard with portfolio overview
- `/wallet` - Wallet management and deposits
- `/trade` - Browse and trade assets
- `/portfolio` - Detailed portfolio view

## Available Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Features Explained

### PWA Support
The app is configured as a Progressive Web App:
- **Manifest**: Defined in `public/manifest.json`
- **Offline support**: Service worker ready
- **Install to home screen**: Mobile app-like experience
- **App shortcuts**: Quick access to Dashboard, Trade, Wallet

### State Management (Zustand)
Three main stores:

1. **authStore** - User authentication
   - Login/signup
   - User profile
   - Token management
   - Persistent storage

2. **walletStore** - Wallet management
   - Balance tracking
   - Deposit addresses
   - Multi-chain support

3. **portfolioStore** - Portfolio data
   - Holdings
   - Performance metrics
   - Asset allocation

### API Integration
Centralized API client (`lib/api/client.ts`):
- Automatic JWT token injection
- Request/response interceptors
- Global error handling
- Toast notifications
- TypeScript types

### Design System
STACKA brand guidelines:
- **Primary**: #C4FF0D (Neon Green)
- **Background**: #0A0A0A (Deep Black)
- **Cards**: #1A1A1A with borders
- **Text**: White with secondary/tertiary variants
- **Accents**: Blue, Purple, Orange for different asset types

Custom CSS utilities in `globals.css`:
- `.card` - Card styling
- `.btn-primary` - Primary button
- `.glass` - Glassmorphism effect
- `.text-gradient` - Gradient text

## Backend Integration

The frontend connects to your backend API at `NEXT_PUBLIC_API_URL`.

### API Endpoints Used
```
Authentication:
POST   /api/v1/auth/signup      - User registration
POST   /api/v1/auth/login       - User login
GET    /api/v1/auth/me          - Get user profile

Wallet:
GET    /api/v1/wallet/balance           - Get USDC balance
GET    /api/v1/wallet/deposit-address   - Get deposit address

Portfolio:
GET    /api/v1/portfolio         - Get portfolio summary
GET    /api/v1/portfolio/holdings - Get asset holdings

Trading:
GET    /api/v1/trade/quote/:symbol - Get asset quote
POST   /api/v1/trade/stocks/ngn    - Trade Nigerian stocks
POST   /api/v1/trade/stocks/us     - Trade US stocks
```

## Component Usage Examples

### Button
```tsx
import Button from '@/components/ui/Button';

<Button variant="primary" size="lg" isLoading={loading}>
  Submit
</Button>
```

### Input
```tsx
import Input from '@/components/ui/Input';
import { Mail } from 'lucide-react';

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  icon={<Mail className="w-5 h-5" />}
  error={errors.email}
/>
```

### Card
```tsx
import Card from '@/components/ui/Card';

<Card hover variant="glass">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy

### Manual Deployment
```bash
# Build the app
npm run build

# Start production server
npm run start
```

## Environment Variables

```env
# Required
NEXT_PUBLIC_API_URL=http://localhost:4000

# Optional
NEXT_PUBLIC_APP_NAME=STACKA
NEXT_PUBLIC_APP_DESCRIPTION=Smart Investment Platform
```

## Troubleshooting

### Backend Connection Issues
- Ensure backend is running on port 4000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify CORS is enabled on backend

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run lint`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Roadmap

- [x] Landing page
- [x] Authentication (login/signup)
- [x] Dashboard with portfolio overview
- [x] Wallet management
- [x] Trading interface
- [ ] Asset detail pages with charts
- [ ] Complete KYC flow
- [ ] Transaction history
- [ ] DeFi yield integration
- [ ] AI chat assistant
- [ ] Portfolio analytics
- [ ] Mobile native apps

## License

All rights reserved. STACKA © 2025

## Support

- **Email**: support@stacka.app
- **Documentation**: Coming soon
- **Issues**: GitHub Issues

---

**Built with by the STACKA team**
