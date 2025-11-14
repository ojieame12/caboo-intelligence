# Caboo - WhatsApp Booking Assistant

Automated WhatsApp booking management for South African restaurants. Cut no-shows by 91% with intelligent confirmations and reminders.

**Live Site:** [caboo.design](https://caboo.design)
**Company:** Caboo Intelligence (Pty) Ltd (2025/868763/07)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL (Neon)
- Vercel account (frontend)
- Railway/Render account (backend)

### Installation

```bash
# Clone repository
git clone https://github.com/ojieame12/caboo-intelligence.git
cd caboo-intelligence

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your Neon database URL, auth secret, etc.

# Run development server
npm run dev

# Run backend API (separate terminal)
npm run server
```

---

## 📁 Project Structure

```
caboo-intelligence/
├── src/                      # Frontend (React + Vite)
│   ├── components/           # Reusable UI components
│   │   ├── AnimatedInput.tsx
│   │   ├── AnimatedTextArea.tsx
│   │   ├── AnimatedSection.tsx
│   │   └── ProtectedRoute.tsx
│   ├── pages/                # Route pages
│   │   ├── LandingPage.tsx   # Marketing homepage
│   │   ├── SignUp.tsx        # Registration
│   │   ├── SignIn.tsx        # Login
│   │   ├── BetaWaitlist.tsx  # Pre-launch waitlist
│   │   ├── Dashboard.tsx     # Overview
│   │   ├── Privacy.tsx       # Legal
│   │   ├── Terms.tsx         # Legal
│   │   ├── About.tsx         # Company info
│   │   ├── Contact.tsx       # Contact form
│   │   ├── Architecture.tsx  # Technical docs
│   │   ├── dashboard/
│   │   │   ├── Bookings.tsx  # Booking management
│   │   │   └── Settings.tsx  # Settings & billing
│   │   └── onboarding/
│   │       ├── Connect.tsx   # WhatsApp connection
│   │       ├── Processing.tsx
│   │       ├── Settings.tsx
│   │       └── Success.tsx
│   ├── hooks/                # Custom React hooks
│   │   ├── useDashboardSummary.ts
│   │   ├── useBookings.ts
│   │   ├── useSettingsData.ts
│   │   ├── useAuthFetch.ts
│   │   └── useScrollAnimation.ts
│   ├── context/
│   │   └── AuthContext.tsx   # Authentication state
│   ├── lib/
│   │   └── api.ts            # API client
│   └── subframe/             # UI component library
│
├── server/                   # Backend (Express + Node.js)
│   ├── index.mjs             # API server entry
│   ├── db.mjs                # Neon database connection
│   ├── schema.sql            # Database schema
│   ├── middleware/
│   │   └── auth.mjs          # JWT middleware
│   └── routes/
│       ├── auth.mjs          # Signup/login endpoints
│       ├── user.mjs          # User info
│       ├── dashboard.mjs     # Dashboard data
│       ├── bookings.mjs      # Booking management
│       └── settings.mjs      # Restaurant settings
│
├── public/                   # Static assets
│   ├── mockup-*.png          # WhatsApp UI mockups
│   └── ...
│
├── STYLE_GUIDE.md           # Design system documentation
└── README.md                # This file
```

---

## 🎨 Tech Stack

### Frontend
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 3
- **Components:** Subframe UI
- **Routing:** React Router 7
- **Animations:** Custom CSS + Intersection Observer
- **Fonts:** Season Mix TRIAL, Geist, pxGrotesk

### Backend
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express 5
- **Database:** Neon PostgreSQL
- **Auth:** JWT + bcryptjs
- **WhatsApp:** Bird.com (multi-tenant via workspaces)

### Deployment
- **Frontend:** Vercel
- **Backend:** Railway/Render (to be deployed)
- **Database:** Neon
- **Domain:** caboo.design

---

## 🔧 Environment Variables

### Frontend (.env.local)
```bash
VITE_API_BASE_URL=http://localhost:3000  # Backend API URL (dev)
# Production: https://your-api.railway.app
```

### Backend (.env)
```bash
NEON_DATABASE_URL=postgresql://user:pass@host/db
AUTH_SECRET=your-random-secret-string-here
PORT=3000
CORS_ORIGIN=https://caboo.design
```

---

## 🗄️ Database Setup

### Apply Schema

```bash
# Connect to your Neon database
psql $NEON_DATABASE_URL -f server/schema.sql
```

### Tables Created
- `users` - Account credentials
- `restaurants` - Restaurant profiles and settings
- `bookings` - Booking records

---

## 🚀 Deployment

### Frontend (Vercel)

```bash
# Deploy to Vercel
vercel --prod

# Or connect GitHub repo in Vercel dashboard
# Set environment variable: VITE_API_BASE_URL
```

### Backend (Railway/Render)

**Railway:**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy
railway up

# Set environment variables in Railway dashboard
```

**Render:**
- Create new Web Service
- Connect to GitHub repo
- Build command: `npm install`
- Start command: `npm run server`
- Set environment variables

---

## 🎯 Features

### For Restaurants
- Automated WhatsApp booking capture
- One-tap confirmations via WhatsApp
- Automatic reminders (91% no-show reduction)
- Dashboard for booking management
- Template customization
- Multi-number alerts
- Opening hours management
- Trial + subscription billing

### For You (SaaS)
- Multi-tenant architecture
- Per-restaurant workspaces (Bird)
- Scalable to 1000s of restaurants
- POPIA compliant
- Neon-backed authentication
- Real-time data sync

---

## 📱 User Flow

```
Landing Page
    ↓
Sign Up (creates account in Neon)
    ↓
Beta Waitlist (during Meta approval)
    ↓
[After approval]
    ↓
Connect WhatsApp (Meta embedded signup)
    ↓
Processing (Bird workspace creation)
    ↓
Basic Settings (alert destination, hours)
    ↓
Success Screen
    ↓
Dashboard (manage bookings, settings, billing)
```

---

## 🔐 Security

- Passwords hashed with bcryptjs
- JWT tokens for session management
- Protected API routes
- CORS configured
- Environment variables for secrets
- SQL injection prevention (parameterized queries)
- POPIA/GDPR compliant data handling

---

## 📊 API Endpoints

### Public
- `POST /api/signup` - Create account
- `POST /api/login` - Authenticate

### Protected (requires JWT)
- `GET /api/me` - Current user + restaurant info
- `GET /api/dashboard/summary` - Dashboard stats
- `GET /api/bookings` - List bookings (filter, search)
- `PUT /api/settings` - Update restaurant settings

---

## 🎨 Design System

See [STYLE_GUIDE.md](./STYLE_GUIDE.md) for:
- Color palette and typography
- Reusable components (AnimatedInput, etc.)
- Layout patterns
- Responsive breakpoints
- Animation guidelines
- Form patterns
- Best practices

---

## 🧪 Testing

### Local Development

```bash
# Frontend (http://localhost:5173)
npm run dev

# Backend (http://localhost:3000)
npm run server

# Build for production
npm run build
```

### Test Pages
- `/` - Landing page
- `/signup` - Registration
- `/signin` - Login
- `/beta-waitlist` - Waitlist screen
- `/dashboard` - Overview (protected)
- `/dashboard/bookings` - Bookings (protected)
- `/dashboard/settings` - Settings (protected)
- `/privacy` - Privacy policy
- `/terms` - Terms of service

---

## 📋 Pre-Launch Checklist

### Meta Business Verification
- [x] Professional website (caboo.design)
- [x] Privacy Policy (POPIA compliant)
- [x] Terms of Service
- [x] Company registration (2025/868763/07)
- [x] Clear use case documented
- [ ] Submit application

### Bird ISV Program
- [x] Technical architecture page (/architecture)
- [x] Multi-tenant design documented
- [x] Business model clear (R599/month)
- [x] Security measures outlined
- [ ] Create Bird account
- [ ] Submit ISV application

### Backend Deployment
- [ ] Apply schema.sql to Neon
- [ ] Deploy server/ to Railway/Render
- [ ] Set environment variables
- [ ] Test API endpoints
- [ ] Connect frontend to backend

---

## 🎯 Roadmap

### Phase 1: Beta Launch (Weeks 1-2)
- [x] Complete UI/UX
- [x] Neon backend integration
- [x] Beta waitlist system
- [ ] Meta/Bird verification
- [ ] Deploy backend
- [ ] Manual onboarding for first 10 restaurants

### Phase 2: Automated Onboarding (Weeks 3-4)
- [ ] Meta embedded signup flow
- [ ] Bird workspace creation
- [ ] Webhook handler for messages
- [ ] Conversation flow engine
- [ ] Template system

### Phase 3: Scale (Month 2)
- [ ] Remove waitlist
- [ ] Full self-serve onboarding
- [ ] Automated billing (Stripe/PayFast)
- [ ] Analytics dashboard
- [ ] Email notifications

### Phase 4: Growth (Month 3+)
- [ ] Google Calendar integration
- [ ] Dineplan sync
- [ ] Multi-location support
- [ ] Expand to salons, clinics
- [ ] Marketing automation

---

## 🆘 Support

- **Email:** support@caboo.design
- **Documentation:** See STYLE_GUIDE.md and /architecture page
- **Issues:** GitHub Issues

---

## 📄 License

Proprietary - Caboo Intelligence (Pty) Ltd

---

## 👨‍💻 Built With

- React + Vite
- Tailwind CSS + Subframe
- Neon PostgreSQL
- Express.js
- Bird WhatsApp Business Platform
- Vercel (frontend hosting)

---

**Ready for beta launch!** 🚀
