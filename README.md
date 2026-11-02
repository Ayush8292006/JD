# JD Bazar (jdbazar.in) ⚡

> **"Aapka apna bazar, ab minutes mein."**

A complete, production-grade quick-commerce grocery web application prototype inspired by **Blinkit** and **Zepto**, featuring original branding, custom vector SVG logos, 10-minute dark store delivery logic, dynamic live search, cart drawer with real-time bill breakdown, coupon application, location switcher, OTP authentication modal, and smooth 60fps Framer Motion micro-interactions.

---

## 🚀 Quick Start Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🎨 Design System & Colors

- **Primary Yellow:** `#F8CB46` (Hero gradients, highlight badges, offer tags)
- **Brand Green:** `#0C831F` (Action buttons, 'ADD' buttons, delivery confirmations)
- **Backgrounds:** `#FFFFFF` and Soft Off-White `#F7F7F7`
- **Text:** Primary `#1F1F1F`, Secondary `#6B6B6B`
- **Border Radius:** `1rem` (rounded-2xl) and `1.5rem` (rounded-3xl)
- **Typography:** `Poppins` (Headings & accents) and `Inter` (Body & interface)

---

## 📦 Key Features Implemented

1. **Brand Identity & Animated SVG Logo:**
   - Custom inline SVG mark with a rounded shopping bag whose handles arc dynamically.
   - Letters **J** and **D** monogrammed inside with an electric delivery flash motif.
   - Smooth pathLength drawing and scale animation on load.

2. **Splash Screen Experience:**
   - 1.5s intro screen with an expanding yellow circle reveal and logo scale-in.
   - Smooth fade-out leading directly into staggered hero typography.

3. **Sticky Dynamic Header:**
   - Scroll-aware backdrop blur & shadow.
   - Location Selector with simulated GPS auto-detection and city list.
   - Big search bar with auto-rotating placeholders (`Search "milk"`, `Search "atta"`...).
   - Live auto-suggest search dropdown with instant product filtering.
   - Floating cart button with live count badge and bounce animation.

4. **Interactive Hero Section:**
   - Yellow sunburst gradient with word-by-word headline reveal.
   - Floating grocery illustrations (Milk, Tomatoes, Snacks, Bananas) with subtle idle hovering and scroll parallax.

5. **Shop by Category Grid:**
   - 12 Indian grocery aisles (Fruits & Veggies, Dairy & Bread, Atta & Rice, Snacks, etc.).
   - Staggered scroll entrance with interactive click-to-scroll targeting.

6. **Promotional Carousel:**
   - Auto-rotating offer banners with dots, arrow controls, and one-click coupon copying (`JDFIRST`, `FRESH50`, `SNACKFEST`).

7. **Blinkit-Style Product Rows:**
   - 30 realistic Indian grocery products with ₹ pricing, MRP, discounts, and delivery time tags (`8 MINS`).
   - Image skeleton shimmer loading with fallback emojis.
   - Green `ADD` button that smoothly morphs into `[- qty +]` quantity steppers.

8. **Comprehensive Cart Drawer:**
   - Slide-in side drawer (and mobile bottom sheet).
   - Dynamic free delivery progress bar (`Add ₹X more for FREE delivery`).
   - Bill breakdown: Item total, MRP savings, delivery partner fee, handling fee, delivery tip, coupon discounts, and grand total.
   - Full persistence in React state and `localStorage`.

9. **Checkout & Celebration Screen:**
   - Confetti particle fireworks.
   - Live 10-minute countdown delivery timer.
   - Delivery partner details with thermal check & vaccine verification.

10. **Delivery Strip, How It Works, Stats & Testimonials:**
    - Animated connecting progress line drawn on scroll.
    - Viewport-triggered animated count-up numbers.
    - App download banner with SVG QR code and user review carousel.

