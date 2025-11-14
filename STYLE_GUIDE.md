# Caboo Design System & Style Guide

Complete reference for building consistent, polished pages across the Caboo platform.

---

## 🎨 Design Tokens

### Colors

#### Brand Colors
```typescript
brand-50: #FFF7ED    // Lightest peachy background
brand-100: #FFEDD5
brand-600: #EA580C   // Primary orange (buttons, links, accents)
brand-700: #C2410C   // Darker orange (hover states)
```

#### Neutral Grays
```typescript
white: #FFFFFF
neutral-50: #FAFAFA   // Light backgrounds
neutral-200: #E5E5E5  // Borders, dividers
neutral-300: #D4D4D4
neutral-500: #737373  // Helper text
neutral-600: #525252  // Body text
neutral-700: #404040  // Dark headings, footer background
neutral-900: #171717  // Primary text, headlines
```

#### Semantic Colors
```typescript
success-600: #16A34A  // Green for success states
success-50: #F0FDF4   // Success backgrounds
error-600: #DC2626    // Red for errors
error-50: #FEF2F2     // Error backgrounds
```

#### Backgrounds
```typescript
Hero/Features: #FCF6EF  // Warm peachy tone
Default: #FFFFFF        // White
Footer: neutral-700     // Dark grey
```

---

### Typography

#### Font Families
```css
/* Headlines */
font-['Season_Mix_TRIAL']

/* Body Text */
font-['Geist']

/* UI Elements */
font-['Inter']
```

#### Font Sizes (Responsive)

**Headlines:**
```typescript
H1 (Hero): text-[36px] md:text-[48px] lg:text-[56px]
H2 (Sections): text-[32px] md:text-[40px] lg:text-[48px]
H3 (Sub-sections): text-[24px] md:text-[28px]
```

**Body Text:**
```typescript
Large: text-[16px] md:text-[18px] lg:text-[20px]
Regular: text-[16px] md:text-[17px] lg:text-[18px]
Small: text-[14px] md:text-[15px]
Helper: text-[13px]
Tiny: text-[12px]
```

**Font Weights:**
```typescript
Light: font-[300]    // Body text
Regular: font-[400]  // Headlines, Season Mix TRIAL
Medium: font-[500]   // Nav active, labels
```

---

### Spacing Scale

#### Padding (Responsive)
```typescript
// Vertical section padding
py-16 md:py-24 lg:py-32

// Horizontal page padding
px-4 md:px-6

// Card padding
p-6 md:p-8 lg:p-10

// Button padding
px-2 py-1 (for button wrappers)
```

#### Gaps
```typescript
// Grid gaps
gap-4 md:gap-6 lg:gap-8      // Tight
gap-8 md:gap-10 lg:gap-12    // Medium
gap-8 md:gap-12 lg:gap-16    // Loose
```

#### Margins
```typescript
// Section spacing
mb-8 md:mb-12 lg:mb-16
mb-12 md:mb-16 lg:mb-20

// Element spacing
mb-4 md:mb-6
```

---

### Border Radius
```typescript
rounded-xl: 12px      // Cards, inputs
rounded-2xl: 16px     // Large cards, sections
rounded-3xl: 24px     // Pricing cards
rounded-full: 9999px  // Buttons, badges
```

---

### Shadows
```typescript
// No shadows by default (minimal aesthetic)
// Exception: Button hover
box-shadow: 0 10px 25px -5px rgba(234, 88, 12, 0.3)
```

---

## 🧩 Reusable Components

### 1. AnimatedInput

**Purpose:** Form inputs with floating labels and animated underlines

**Usage:**
```tsx
import { AnimatedInput, validators } from "@/components/AnimatedInput";

<AnimatedInput
  label="Email address"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="john@restaurant.co.za"
  required
  validate={validators.email}
  helperText="We'll send confirmation here"
/>
```

**Features:**
- Floating label (floats up on focus/fill)
- Animated underline (expands from center)
- Real-time validation on blur
- Password visibility toggle
- Success/error icons
- Smart helper text

**Validators Available:**
```typescript
validators.email      // Email format
validators.phone      // SA phone (+27 or 0)
validators.password   // 8+ chars, uppercase, number
validators.required   // Not empty
validators.minLength(n) // Min characters
```

---

### 2. AnimatedTextArea

**Purpose:** Multi-line text input with same polish as AnimatedInput

**Usage:**
```tsx
import { AnimatedTextArea } from "@/components/AnimatedTextArea";

<AnimatedTextArea
  label="Message"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  placeholder="How can we help?"
  required
  rows={5}
  maxLength={500}
/>
```

**Features:**
- Floating label
- Animated underline
- Character count (shows at 80% capacity)
- Error handling
- Resizable height

---

### 3. AnimatedSection

**Purpose:** Fade-in-up animation when scrolled into view

**Usage:**
```tsx
import { AnimatedSection } from "./components/AnimatedSection";

<AnimatedSection delay={200}>
  <div className="...">
    Your content here
  </div>
</AnimatedSection>
```

**Props:**
- `delay`: Animation delay in ms (optional)
- `className`: Additional classes

---

### 4. CountUp

**Purpose:** Animated number counter for stats

**Usage:**
```tsx
import { CountUp } from "./components/AnimatedSection";

<CountUp end={87} suffix="%" />
<CountUp end={22} suffix="K" />
<CountUp end={2.5} suffix="h" duration={1500} />
```

**Props:**
- `end`: Target number
- `suffix`: Text after number (%, K, h, etc.)
- `duration`: Animation duration (default: 2000ms)
- `className`: Additional classes

---

### 5. Accordion

**Purpose:** Expandable content sections

**Usage:**
```tsx
import { Accordion } from "@/subframe/components/Accordion";
import { FeatherArrowRight } from "@subframe/core";

<Accordion
  trigger={
    <div className="flex w-full items-center justify-between border-b border-neutral-border py-6 hover:border-brand-600 transition-colors cursor-pointer">
      <span className="font-['Season_Mix_TRIAL'] text-[24px] font-[400] text-neutral-900">
        Question or feature title
      </span>
      <FeatherArrowRight className="text-neutral-400" size={24} />
    </div>
  }
>
  <div className="py-6">
    <p className="font-['Geist'] text-[16px] font-[300] leading-[26px] text-neutral-600">
      Answer or feature description goes here.
    </p>
  </div>
</Accordion>
```

---

## 🎭 Layout Patterns

### Standard Page Structure

```tsx
<div className="flex h-full min-h-screen w-full flex-col bg-default-background">
  {/* Navbar */}
  <div className="w-full border-b border-neutral-border bg-white sticky top-0 z-50">
    {/* Nav content */}
  </div>

  {/* Main Content */}
  <div className="flex-1 px-4 md:px-6 py-12 md:py-16">
    <div className="max-w-[1280px] mx-auto">
      {/* Page content */}
    </div>
  </div>

  {/* Footer */}
  <footer className="w-full py-12 md:py-16 px-4 md:px-6 bg-neutral-700">
    {/* Footer content */}
  </footer>
</div>
```

---

### Section Pattern

```tsx
<div className="w-full py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-white">
  <div className="max-w-[1280px] mx-auto">
    {/* Section header */}
    <div className="text-center mb-12 md:mb-16 lg:mb-20">
      <h2 className="font-['Season_Mix_TRIAL'] text-[32px] md:text-[40px] lg:text-[48px] font-[400] leading-[36px] md:leading-[44px] lg:leading-[52px] text-neutral-900 mb-4 md:mb-6">
        Section Title
      </h2>
      <p className="font-['Geist'] text-[16px] md:text-[17px] lg:text-[18px] font-[300] leading-[26px] md:leading-[28px] lg:leading-[30px] text-neutral-600 max-w-[700px] mx-auto px-4">
        Section description that explains what's below.
      </p>
    </div>

    {/* Section content */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
      {/* Content here */}
    </div>
  </div>
</div>
```

---

### Card Pattern

```tsx
<div className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 hover:border-brand-600 transition-all">
  {/* Card content */}
</div>
```

---

## 🎬 Animation Classes

### Pre-defined Animations

```css
/* Fade in (for hero elements) */
.animate-fade-in

/* Fade in + slide up (for sections) */
.animate-fade-in-up

/* Stagger delays */
.delay-100  /* 100ms */
.delay-200  /* 200ms */
.delay-300  /* 300ms */
.delay-400  /* 400ms */

/* Button hover lift */
.btn-hover-lift
```

### Usage Example
```tsx
<h1 className="... animate-fade-in">Hero Text</h1>
<p className="... animate-fade-in delay-200">Subtext</p>
<div className="... animate-fade-in-up delay-100">Card 1</div>
<div className="... animate-fade-in-up delay-200">Card 2</div>
```

---

## 🔘 Button Patterns

### Primary CTA
```tsx
<div className="flex items-center gap-2 rounded-full bg-brand-600 px-2 py-1 btn-hover-lift">
  <Button size="large" onClick={handleClick}>
    Start free trial
  </Button>
</div>
```

### Secondary Button
```tsx
<Button variant="neutral-secondary" size="medium">
  Secondary Action
</Button>
```

### Tertiary / Text Button
```tsx
<Button variant="brand-tertiary" size="medium">
  Learn more
</Button>
```

---

## 📱 Responsive Grid Patterns

### 3-Column (Features, Benefits)
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
  {/* Items */}
</div>
```

### 4-Column (Stats)
```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
  {/* Stats */}
</div>
```

### 2-Column (Pricing Features)
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-4">
  {/* Feature list */}
</div>
```

---

## 🧭 Navigation Patterns

### Desktop Nav
```tsx
<nav className="hidden md:flex items-center gap-8">
  <a href="#section" className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-neutral-900 transition-colors">
    Link Text
  </a>
</nav>
```

### Mobile Menu
```tsx
{mobileMenuOpen && (
  <div className="md:hidden border-t border-neutral-200 animate-fade-in">
    <nav className="flex flex-col p-4 space-y-4">
      <a href="#section" onClick={() => setMobileMenuOpen(false)} className="font-['Inter'] text-[15px] font-[400] text-neutral-700 py-2">
        Link Text
      </a>
    </nav>
  </div>
)}
```

---

## 📝 Form Patterns

### Standard Form
```tsx
<form className="space-y-8" onSubmit={handleSubmit}>
  <div className="space-y-8 animate-fade-in-up delay-100">
    <AnimatedInput
      label="Field Label"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Placeholder text"
      required
      validate={validators.required}
    />
  </div>

  {error && (
    <div className="rounded-2xl border border-error-200 bg-error-50 px-6 py-4 animate-fade-in">
      <p className="font-['Geist'] text-[14px] text-error-700">{error}</p>
    </div>
  )}

  <div className="pt-6">
    <div className="flex items-center gap-2 rounded-full bg-brand-600 px-2 py-1 btn-hover-lift">
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </div>
  </div>
</form>
```

---

## 📊 Stats Display Pattern

```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
  <div className="text-center">
    <div className="font-['Season_Mix_TRIAL'] text-[48px] md:text-[52px] leading-[52px] text-neutral-700 mb-2">
      <CountUp end={87} suffix="%" />
    </div>
    <p className="font-['Geist'] text-[14px] leading-[20px] text-neutral-600">
      Stat description
    </p>
  </div>
</div>
```

---

## 🎯 Common UI Patterns

### Hero Section
```tsx
<div className="w-full px-4 md:px-6 py-4 md:py-6">
  <div className="flex min-h-[500px] md:h-144 w-full flex-col items-center justify-center gap-6 md:gap-8 rounded-2xl px-4 md:px-6 py-12 md:py-2 bg-[#FCF6EF]">
    <div className="flex w-full max-w-[1280px] flex-col items-start gap-4 md:gap-6">
      <h1 className="font-['Season_Mix_TRIAL'] text-[36px] md:text-[48px] lg:text-[56px] font-[400] animate-fade-in">
        Hero Headline
      </h1>
      <p className="font-['Geist'] text-[16px] md:text-[18px] lg:text-[20px] font-[300] animate-fade-in delay-200">
        Supporting text that explains the value proposition.
      </p>
    </div>
  </div>
</div>
```

### Empty State
```tsx
<div className="bg-white rounded-2xl p-12 md:p-16 border border-neutral-200 text-center">
  <div className="max-w-[600px] mx-auto">
    <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-8">
      <span className="text-[40px]">📱</span>
    </div>
    <h2 className="font-['Season_Mix_TRIAL'] text-[32px] md:text-[36px] font-[400] text-neutral-900 mb-6">
      No data yet
    </h2>
    <p className="font-['Geist'] text-[16px] font-[300] leading-[28px] text-neutral-600 mb-10">
      Explanation of what will appear here and how to get started.
    </p>
    <Button variant="brand-tertiary">
      Get Started
    </Button>
  </div>
</div>
```

### Loading State
```tsx
import { Loader } from "@/subframe/components/Loader";

<div className="flex items-center justify-center py-20">
  <div className="text-center">
    <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-4">
      <Loader size="large" />
    </div>
    <p className="font-['Geist'] text-[14px] text-neutral-600">
      Loading...
    </p>
  </div>
</div>
```

### Error State
```tsx
<div className="rounded-2xl border border-error-200 bg-error-50 px-6 py-4">
  <p className="font-['Geist'] text-[14px] text-error-700 flex items-center gap-2">
    <FeatherAlertCircle size={16} />
    Error message here
  </p>
</div>
```

---

## 🎨 Background Image Pattern

```tsx
{/* Hide on mobile, show on desktop with responsive sizing */}
<div className="bg-none md:bg-[url('...image-url...')] md:bg-[right_-10rem_bottom_-10rem] md:bg-[length:800px] lg:bg-[length:1200px] bg-no-repeat">
  {/* Content */}
</div>
```

**Rules:**
- Always `bg-none` on mobile to prevent overlap
- Position from right/bottom for decorative images
- Scale size: 600-800px tablet, 1200px desktop
- Use `bg-no-repeat`

---

## 📐 Grid Breakpoints

```tsx
// Mobile first approach
grid-cols-1              // Default (mobile)
sm:grid-cols-2           // 640px+ (landscape phones)
md:grid-cols-3           // 768px+ (tablets)
lg:grid-cols-4           // 1024px+ (desktop)
```

**Use cases:**
- 1 → 3: Features, benefits, mockups
- 2 → 4: Stats, metrics
- 1 → 2: Pricing features, form grids

---

## 🎯 Icon Usage

### Feather Icons (from Subframe)
```tsx
import { FeatherCheck, FeatherArrowRight, FeatherAlertCircle, FeatherEye, FeatherEyeOff } from "@subframe/core";

<FeatherCheck className="text-brand-600" size={18} />
<FeatherArrowRight className="text-neutral-400" size={24} />
```

**Common sizes:**
- Small: 14-16px (inline icons)
- Medium: 18-20px (form icons)
- Large: 24px (accordion arrows)
- XL: 40px (hero icons)

---

## 🔗 Link Styles

### Navigation Link
```tsx
<a href="#section" className="font-['Inter'] text-[14px] font-[400] text-neutral-600 hover:text-neutral-900 transition-colors">
  Link Text
</a>
```

### Brand Link (CTA-style)
```tsx
<a href="/page" className="font-['Geist'] text-[16px] font-medium text-brand-600 hover:underline">
  Action Link →
</a>
```

### Footer Link
```tsx
<a href="/page" className="font-['Geist'] text-[14px] font-[300] text-neutral-300 hover:text-brand-600 transition-colors">
  Footer Link
</a>
```

---

## 📱 Mobile Menu Pattern

```tsx
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

{/* Hamburger Button */}
<button
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  className="md:hidden p-2 text-neutral-600 hover:text-neutral-900"
>
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {mobileMenuOpen ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    )}
  </svg>
</button>

{/* Mobile Menu Dropdown */}
{mobileMenuOpen && (
  <div className="md:hidden border-t border-neutral-200 animate-fade-in">
    <nav className="flex flex-col p-4 space-y-4">
      {/* Menu items */}
    </nav>
  </div>
)}
```

---

## 🎨 Badge/Pill Patterns

### Trial Badge
```tsx
<div className="flex items-center gap-2 bg-success-50 border border-success-200 rounded-full px-4 py-2">
  <div className="w-2 h-2 rounded-full bg-success-600"></div>
  <span className="font-['Geist'] text-[13px] font-medium text-success-700">
    Trial: 14 days left
  </span>
</div>
```

### Status Badge
```tsx
<div className="inline-flex items-center gap-2 bg-neutral-100 rounded-full px-3 py-1">
  <span className="font-['Geist'] text-[12px] font-medium text-neutral-700">
    Active
  </span>
</div>
```

---

## 📋 Onboarding Progress Dots

```tsx
<div className="flex items-center gap-3">
  <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
  <div className="w-2 h-2 rounded-full bg-brand-600"></div>  {/* Current */}
  <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
  <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
</div>
```

---

## 🎯 Best Practices

### DO:
✅ Use responsive text sizes (text-[32px] md:text-[48px])
✅ Mobile-first grids (grid-cols-1 md:grid-cols-3)
✅ Consistent spacing scale
✅ AnimatedInput for all forms
✅ AnimatedSection for scroll reveals
✅ Hide decorative backgrounds on mobile
✅ Add animations for polish
✅ Use semantic color names (brand-600, not #EA580C)

### DON'T:
❌ Fixed pixel sizes without responsive variants
❌ Grids without mobile fallback
❌ Background images that cover text on mobile
❌ Inconsistent font families
❌ Random spacing values (use scale)
❌ Borders on everything (minimal aesthetic)
❌ Heavy shadows (keep it clean)

---

## 🚀 Quick Start for New Pages

```tsx
import React from "react";
import { Button } from "@/subframe/components/Button";
import { AnimatedSection } from "@/components/AnimatedSection";

function NewPage() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col bg-default-background">
      {/* Copy navbar from LandingPage.tsx */}

      {/* Page Content */}
      <div className="flex-1 px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto">
          <AnimatedSection>
            <h1 className="font-['Season_Mix_TRIAL'] text-[36px] md:text-[48px] font-[400] text-neutral-900 mb-6">
              Page Title
            </h1>
            {/* Your content */}
          </AnimatedSection>
        </div>
      </div>

      {/* Copy footer from LandingPage.tsx */}
    </div>
  );
}

export default NewPage;
```

---

## 📦 Component Import Reference

```tsx
// Forms
import { AnimatedInput, validators } from "@/components/AnimatedInput";
import { AnimatedTextArea } from "@/components/AnimatedTextArea";

// Animations
import { AnimatedSection, CountUp } from "@/components/AnimatedSection";

// Subframe Components
import { Button } from "@/subframe/components/Button";
import { Accordion } from "@/subframe/components/Accordion";
import { Loader } from "@/subframe/components/Loader";

// Icons
import { FeatherCheck, FeatherArrowRight, FeatherAlertCircle, FeatherEye, FeatherEyeOff } from "@subframe/core";

// Auth
import { useAuthContext } from "@/context/AuthContext";
```

---

## 🎨 Color Usage Guide

| Element | Color Class | Use Case |
|---------|-------------|----------|
| Headlines | `text-neutral-900` | Main headlines, emphasis |
| Body text | `text-neutral-600` | Regular content |
| Helper text | `text-neutral-500` | Secondary info |
| Links (default) | `text-neutral-600 hover:text-neutral-900` | Navigation |
| Links (CTA) | `text-brand-600 hover:text-brand-700` | Action links |
| Buttons | `bg-brand-600` | Primary CTAs |
| Backgrounds (warm) | `bg-[#FCF6EF]` | Hero, features |
| Backgrounds (cool) | `bg-neutral-50` | Alternating sections |
| Borders | `border-neutral-200` | Cards, dividers |
| Footer | `bg-neutral-700` | Dark footer |

---

## 📏 Spacing Cheat Sheet

```typescript
// Vertical Spacing
py-16 md:py-24 lg:py-32    // Section padding
mb-8 md:mb-12 lg:mb-16     // Section margins
mb-4 md:mb-6               // Element margins
gap-8 md:gap-12 lg:gap-16  // Grid gaps

// Horizontal Spacing
px-4 md:px-6               // Page edges
gap-4                      // Button groups
gap-8                      // Nav links
```

---

## 🎭 Animation Timing

```typescript
Micro-interactions: 200ms
Form transitions: 300ms
Section reveals: 600ms
Count-ups: 1500-2000ms

Easing: ease-out (default)
Stagger delay: 100-200ms between items
```

---

## ✅ Checklist for New Pages

- [ ] Responsive text sizes (3 breakpoints minimum)
- [ ] Grid adapts (1 col mobile minimum)
- [ ] Background images hidden/adapted on mobile
- [ ] Spacing uses responsive scale
- [ ] Forms use AnimatedInput components
- [ ] Sections wrapped in AnimatedSection
- [ ] Mobile navigation accessible
- [ ] Buttons have hover effects
- [ ] Touch targets 44px minimum
- [ ] Consistent font families
- [ ] Error states handled
- [ ] Loading states shown
- [ ] Empty states designed

---

## 📚 File Structure Reference

```
src/
├── components/
│   ├── AnimatedInput.tsx       // Form input with floating label
│   ├── AnimatedTextArea.tsx    // Textarea with animations
│   ├── AnimatedSection.tsx     // Scroll-reveal wrapper
│   └── ProtectedRoute.tsx      // Auth guard
│
├── pages/
│   ├── LandingPage.tsx         // Main marketing page
│   ├── SignUp.tsx              // Registration form
│   ├── SignIn.tsx              // Login form
│   ├── Dashboard.tsx           // User dashboard
│   ├── Privacy.tsx             // Legal page
│   ├── Terms.tsx               // Legal page
│   ├── About.tsx               // Company info
│   ├── Contact.tsx             // Contact form
│   └── onboarding/
│       ├── Connect.tsx         // WhatsApp connection
│       ├── Processing.tsx      // Loading animation
│       ├── Settings.tsx        // Basic config
│       └── Success.tsx         // Completion screen
│
├── context/
│   └── AuthContext.tsx         // Auth state management
│
└── lib/
    └── api.ts                  // API client
```

---

This style guide ensures every new page, component, or feature maintains the same polished, minimal aesthetic throughout Caboo.
