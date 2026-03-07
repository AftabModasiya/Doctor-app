# FRONTEND.md - Modern PG Management System UI

## Design Philosophy

**Aesthetic Direction**: Clean, Professional Dashboard with Subtle Luxury

**Core Principles**:

- **Trust & Reliability**: Financial transactions require confidence - use consistent spacing, clear hierarchy, and reassuring visual cues
- **Modern Minimalism**: Generous whitespace, refined typography, purposeful color
- **Subtle Animation**: Smooth, meaningful transitions that guide attention
- **Information Hierarchy**: Critical payment info stands out, secondary details recede
- **Responsive Excellence**: Flawless on mobile (tenants will use phones)

**NOT Generic**: We're avoiding:

- ❌ Inter/Roboto fonts
- ❌ Purple gradients on white
- ❌ Overused rounded cards everywhere
- ❌ Generic blue buttons
- ❌ Cookie-cutter layouts

**Instead**:

- ✅ Distinctive but professional typography
- ✅ Sophisticated color palette with accent colors
- ✅ Thoughtful use of shadows and depth
- ✅ Asymmetric layouts where appropriate
- ✅ Micro-interactions that delight

---

## Typography System

### Font Pairing

**Primary Font Stack** (Display & Headers):

```typescript
font-family: 'Cal Sans', 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Body Font Stack**:

```typescript
font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Monospace** (for transaction IDs, amounts):

```typescript
font-family: 'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code', monospace;
```

### Import Fonts (Add to layout.tsx)

```typescript
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
});

// Then in layout:
<body className={`${dmSans.variable} font-sans`}>
```

### Typography Scale

```css
/* Add to globals.css */
:root {
  /* Font Sizes */
  --text-xs: 0.75rem; /* 12px */
  --text-sm: 0.875rem; /* 14px */
  --text-base: 1rem; /* 16px */
  --text-lg: 1.125rem; /* 18px */
  --text-xl: 1.25rem; /* 20px */
  --text-2xl: 1.5rem; /* 24px */
  --text-3xl: 1.875rem; /* 30px */
  --text-4xl: 2.25rem; /* 36px */

  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;

  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

---

## Color System

### Base Palette

```css
:root {
  /* Primary Brand Colors */
  --primary-50: #f0f9ff;
  --primary-100: #e0f2fe;
  --primary-200: #bae6fd;
  --primary-500: #0ea5e9;
  --primary-600: #0284c7;
  --primary-700: #0369a1;
  --primary-900: #0c4a6e;

  /* Accent Colors */
  --accent-emerald: #10b981;
  --accent-amber: #f59e0b;
  --accent-rose: #f43f5e;

  /* Neutrals (Sophisticated Grays) */
  --gray-50: #fafafa;
  --gray-100: #f5f5f5;
  --gray-200: #e5e5e5;
  --gray-300: #d4d4d4;
  --gray-400: #a3a3a3;
  --gray-500: #737373;
  --gray-600: #525252;
  --gray-700: #404040;
  --gray-800: #262626;
  --gray-900: #171717;

  /* Semantic Colors */
  --success-bg: #ecfdf5;
  --success-text: #059669;
  --success-border: #10b981;

  --warning-bg: #fffbeb;
  --warning-text: #d97706;
  --warning-border: #f59e0b;

  --error-bg: #fef2f2;
  --error-text: #dc2626;
  --error-border: #f43f5e;

  /* Backgrounds */
  --bg-primary: #ffffff;
  --bg-secondary: #fafafa;
  --bg-tertiary: #f5f5f5;

  /* Surfaces (Cards, Panels) */
  --surface-elevated: #ffffff;
  --surface-overlay: rgba(0, 0, 0, 0.5);
}

/* Dark mode (optional) */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #0a0a0a;
    --bg-secondary: #171717;
    --bg-tertiary: #262626;
    --surface-elevated: #1a1a1a;
  }
}
```

### Status Color System

```typescript
// Use consistent colors for payment status
const statusColors = {
  completed: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  pending: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  failed: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    dot: "bg-rose-500",
  },
};
```

---

## Spacing & Layout System

### Spacing Scale

```css
:root {
  --space-1: 0.25rem; /* 4px */
  --space-2: 0.5rem; /* 8px */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1rem; /* 16px */
  --space-5: 1.25rem; /* 20px */
  --space-6: 1.5rem; /* 24px */
  --space-8: 2rem; /* 32px */
  --space-10: 2.5rem; /* 40px */
  --space-12: 3rem; /* 48px */
  --space-16: 4rem; /* 64px */
  --space-20: 5rem; /* 80px */
  --space-24: 6rem; /* 96px */

  /* Container Widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1400px;
}
```

### Layout Patterns

**Dashboard Grid**:

```tsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
  {/* Main content - 8 columns on large screens */}
  <div className="lg:col-span-8 space-y-6">{/* Primary content */}</div>

  {/* Sidebar - 4 columns on large screens */}
  <div className="lg:col-span-4 space-y-6">{/* Secondary content */}</div>
</div>
```

---

## Component Design System

### 1. Navigation Bar

```tsx
// components/Navbar.tsx
"use client";

import { User, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar({
  userName,
  onLogout,
}: {
  userName: string;
  onLogout: () => void;
}) {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold text-lg shadow-md">
              PG
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                PG Manager
              </h1>
              <p className="text-xs text-gray-500">Dashboard</p>
            </div>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <span className="hidden sm:inline-block text-sm font-medium">
                  {userName}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
```

### 2. Stat Card (Dashboard Metrics)

```tsx
// components/StatCard.tsx
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "bg-primary-100 text-primary-600",
}: StatCardProps) {
  const changeColors = {
    positive: "text-emerald-600",
    negative: "text-rose-600",
    neutral: "text-gray-600",
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm font-medium ${changeColors[changeType]}`}>
              {change}
            </p>
          )}
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconColor}`}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
}
```

### 3. Payment Card (Current Month)

```tsx
// components/PaymentCard.tsx
"use client";

import { CreditCard, Calendar, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PaymentCardProps {
  amount: number;
  month: string;
  dueDate: string;
  isPaid: boolean;
  onPay: () => void;
  loading?: boolean;
}

export function PaymentCard({
  amount,
  month,
  dueDate,
  isPaid,
  onPay,
  loading,
}: PaymentCardProps) {
  return (
    <Card className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative p-8 text-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm font-medium text-white/80 mb-1">
              Current Month
            </p>
            <h2 className="text-2xl font-bold">{month}</h2>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <CreditCard className="h-6 w-6" />
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-baseline gap-2">
            <IndianRupee className="h-6 w-6 mt-1" />
            <span className="text-4xl font-bold">
              {amount.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-white/90">
            <Calendar className="h-4 w-4" />
            <span>Due by {dueDate}</span>
          </div>
        </div>

        {isPaid ? (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-500/20 px-4 py-3 backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-medium">Payment Completed</span>
          </div>
        ) : (
          <Button
            size="lg"
            onClick={onPay}
            disabled={loading}
            className="w-full bg-white text-primary-600 hover:bg-white/90 font-semibold shadow-lg"
          >
            {loading ? "Processing..." : "Pay Now"}
          </Button>
        )}
      </div>
    </Card>
  );
}
```

### 4. Payment History Table

```tsx
// components/PaymentHistoryTable.tsx
import { Download, Calendar, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Payment {
  id: string;
  month: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  invoiceUrl?: string;
}

const statusConfig = {
  completed: {
    label: "Paid",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dotColor: "bg-emerald-500",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-200",
    dotColor: "bg-amber-500",
  },
  failed: {
    label: "Failed",
    className: "bg-rose-50 text-rose-700 border-rose-200",
    dotColor: "bg-rose-500",
  },
};

export function PaymentHistoryTable({
  payments,
  onDownload,
}: {
  payments: Payment[];
  onDownload: (id: string) => void;
}) {
  return (
    <Card>
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Payment History</h2>
        <p className="text-sm text-gray-600 mt-1">
          View all your past rent payments
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Month</TableHead>
              <TableHead className="font-semibold">Amount</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Payment Date</TableHead>
              <TableHead className="text-right font-semibold">
                Invoice
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-12 text-gray-500"
                >
                  <div className="flex flex-col items-center gap-3">
                    <Calendar className="h-12 w-12 text-gray-300" />
                    <p className="text-sm">No payment history yet</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => (
                <TableRow
                  key={payment.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="font-medium">{payment.month}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 font-mono font-semibold">
                      <IndianRupee className="h-4 w-4 text-gray-500" />
                      {payment.amount.toLocaleString("en-IN")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`
                      inline-flex items-center gap-2 px-3 py-1 rounded-full 
                      text-xs font-medium border
                      ${statusConfig[payment.status].className}
                    `}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${statusConfig[payment.status].dotColor}`}
                      />
                      {statusConfig[payment.status].label}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {payment.date || "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {payment.status === "completed" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDownload(payment.id)}
                        className="hover:bg-primary-50 hover:text-primary-700"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
```

### 5. Login Page Design

```tsx
// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Mail, Lock, ArrowRight, Home } from "lucide-react";
import { authAPI } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authAPI.login(email, password);
      const { access, refresh } = response.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      const profileResponse = await authAPI.getProfile();
      const userType = profileResponse.data.user_type;

      if (userType === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/tenant/dashboard");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-12 flex-col justify-between relative overflow-hidden">
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="login-grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#login-grid)" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-white font-bold text-xl">
              <Home className="h-6 w-6" />
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">PG Manager</h1>
              <p className="text-sm text-white/80">Rent Management System</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-6 text-white">
          <h2 className="text-4xl font-bold leading-tight">
            Manage your rent payments with ease
          </h2>
          <p className="text-lg text-white/90">
            Secure payments, instant invoices, and complete payment history -
            all in one place.
          </p>

          <div className="space-y-4 mt-8">
            {[
              "Automated rent collection",
              "Instant invoice generation",
              "Complete payment tracking",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                  <span className="text-sm font-bold">✓</span>
                </div>
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-white/60 text-sm">
          © 2024 PG Manager. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md p-8 shadow-xl border-0">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back
            </h2>
            <p className="text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-rose-50 border border-rose-200">
                <p className="text-sm text-rose-700">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-primary-600 hover:bg-primary-700 transition-colors"
              disabled={loading}
            >
              {loading ? (
                "Logging in..."
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Having trouble? Contact your PG administrator
          </div>
        </Card>
      </div>
    </div>
  );
}
```

---

## Animation Guidelines

### Micro-interactions

```css
/* Add to globals.css */

/* Button Hover Effect */
.btn-hover-lift {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Card Hover */
.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

/* Fade In Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

/* Stagger children */
.stagger-children > * {
  animation: fadeIn 0.5s ease-out;
}

.stagger-children > *:nth-child(1) {
  animation-delay: 0.1s;
}
.stagger-children > *:nth-child(2) {
  animation-delay: 0.2s;
}
.stagger-children > *:nth-child(3) {
  animation-delay: 0.3s;
}
.stagger-children > *:nth-child(4) {
  animation-delay: 0.4s;
}

/* Loading Spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin 3s linear infinite;
}

/* Pulse Dot */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse-dot {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Slide in from right */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in-right {
  animation: slideInRight 0.3s ease-out;
}
```

### Page Transitions

```tsx
// Use framer-motion for smooth page transitions
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Page() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.3 }}
    >
      {/* Page content */}
    </motion.div>
  );
}
```

---

## Responsive Design

### Breakpoints

```typescript
// tailwind.config.ts
export default {
  theme: {
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
};
```

### Mobile-First Patterns

```tsx
// Stack on mobile, side-by-side on desktop
<div className="flex flex-col lg:flex-row gap-6">
  <div className="flex-1">{/* Content 1 */}</div>
  <div className="flex-1">{/* Content 2 */}</div>
</div>

// Hide on mobile, show on desktop
<div className="hidden lg:block">Desktop only</div>

// Show on mobile, hide on desktop
<div className="lg:hidden">Mobile only</div>

// Responsive padding
<div className="p-4 sm:p-6 lg:p-8">
```

---

## Accessibility

### ARIA Labels

```tsx
<Button aria-label="Download invoice">
  <Download className="h-4 w-4" />
</Button>

<Input
  aria-describedby="email-error"
  aria-invalid={!!error}
/>
{error && <p id="email-error" className="text-red-600">{error}</p>}
```

### Keyboard Navigation

```tsx
// Ensure all interactive elements are keyboard accessible
<button
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
```

### Focus States

```css
/* Visible focus rings */
.focus-visible:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}
```

---

## Loading States

### Skeleton Loaders

```tsx
// components/SkeletonCard.tsx
export function SkeletonCard() {
  return (
    <Card className="p-6 animate-pulse">
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
    </Card>
  );
}
```

### Loading Spinner

```tsx
// components/Spinner.tsx
export function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={`${sizes[size]} animate-spin rounded-full border-2 border-gray-300 border-t-primary-600`}
    />
  );
}
```

---

## Global Styles

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-gray-200;
  }

  body {
    @apply bg-gray-50 text-gray-900 antialiased;
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    @apply bg-gray-100;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-gray-300 rounded-full;
  }

  ::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-400;
  }
}

@layer components {
  /* Custom gradient text */
  .gradient-text {
    @apply bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent;
  }

  /* Glass morphism */
  .glass {
    @apply bg-white/70 backdrop-blur-lg border border-white/20;
  }

  /* Elevated surface */
  .surface-elevated {
    @apply bg-white rounded-xl shadow-lg border border-gray-100;
  }
}

@layer utilities {
  /* Text balance */
  .text-balance {
    text-wrap: balance;
  }

  /* Hide scrollbar */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
```

---

## Cursor Prompts

### For Complete Dashboard Redesign

```
Using FRONTEND.md as your guide, redesign the tenant dashboard with these requirements:

1. Use the color system and typography defined in FRONTEND.md
2. Implement the PaymentCard component for current month payment with gradient background and pattern overlay
3. Create a modern Navbar with user dropdown
4. Use StatCard components to show: Total Paid, Pending Amount, and Payment Success Rate
5. Implement the PaymentHistoryTable with status badges and download buttons
6. Add smooth animations using the fadeIn and stagger patterns
7. Ensure mobile responsiveness with the grid layout system
8. Use DM Sans font family
9. Add the glass morphism effect to key UI elements
10. Include micro-interactions on hover states

Make it look professional and modern - this is for a production app, not a student project.
```

### For Login Page Redesign

```
Redesign the login page following the login page design in FRONTEND.md:

1. Create a split layout: left side with gradient branding, right side with login form
2. Use the pattern overlay on the left side
3. Add the PG Manager logo and tagline on the left
4. List 3 key features with checkmarks
5. Use the Mail and Lock icons in input fields
6. Add smooth error state animations
7. Style the button with hover lift effect
8. Make it responsive - stack on mobile
9. Use the color system from FRONTEND.md
10. Add proper focus states for accessibility

This should look like a modern SaaS login page.
```

### For Individual Components

```
Create the PaymentCard component from FRONTEND.md exactly as specified:
- Gradient background from primary-500 to primary-700
- Grid pattern overlay at 10% opacity
- Large amount display with Rupee icon
- Due date with calendar icon
- Glass morphism button OR completed badge based on status
- Smooth transitions on all interactive elements
- Mobile responsive

Use the exact color variables and spacing defined in FRONTEND.md.
```

### For Styling Existing Components

```
Restyle the existing payment history table to match the PaymentHistoryTable component in FRONTEND.md:

1. Replace generic status text with colored badges (emerald for paid, amber for pending, rose for failed)
2. Add status dots that pulse
3. Use monospace font for amounts with Rupee icon
4. Add hover effects on table rows
5. Style the download button with primary color on hover
6. Add empty state with calendar icon and message
7. Use the table header styling from FRONTEND.md
8. Ensure proper spacing and typography hierarchy

Make it match the professional design system.
```

---

## Final Checklist

Before calling the redesign complete:

- [ ] Custom fonts loaded (DM Sans)
- [ ] Color system implemented with CSS variables
- [ ] Spacing system consistent throughout
- [ ] All interactive elements have hover states
- [ ] Loading states for all async operations
- [ ] Mobile responsive (test on actual phone)
- [ ] Animations smooth and purposeful
- [ ] Accessibility: focus states, ARIA labels
- [ ] No generic blue buttons or Inter font
- [ ] Status badges use correct colors
- [ ] Icons from lucide-react used consistently
- [ ] Cards have proper shadows and borders
- [ ] Typography hierarchy clear
- [ ] Empty states designed
- [ ] Error states styled
- [ ] Success feedback visible

---

## Inspiration References

**Study these for visual inspiration**:

- Stripe Dashboard (clean, sophisticated)
- Linear App (minimal, focused)
- Vercel Dashboard (modern, fast)
- Notion (flexible, organized)
- Raycast (polished, delightful)

**Key Takeaways**:

- Generous whitespace
- Subtle shadows and borders
- Purposeful color usage
- Clear visual hierarchy
- Delightful micro-interactions
- Professional, not playful

---

This frontend system will make your PG Management app look like a $1M+ SaaS product! 🚀
