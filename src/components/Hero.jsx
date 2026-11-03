import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Zap,
  MapPin,
  Plus,
  TrendingUp,
} from 'lucide-react';

const QUICK_CHIPS = [
  { label: "Milk & Dairy", icon: "🥛", categoryId: "dairy-bread" },
  { label: "Fresh Veggies", icon: "🍅", categoryId: "fruits-veg" },
  { label: "Atta & Dal", icon: "🌾", categoryId: "atta-rice" },
  { label: "Snacks & Chips", icon: "🍟", categoryId: "snacks-munchies" },
  { label: "Tea & Coffee", icon: "☕", categoryId: "instant-food" },
];

const SHOWCASE_PRODUCTS = [
  {
    id: "p7",
    name: "Amul Taaza Toned Milk",
    weight: "500 ml",
    price: 27,
    mrp: 28,
    delivery: "7 MINS",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&auto=format&fit=crop&q=80",
    tag: "Daily Fresh",
  },
  {
    id: "p1",
    name: "Fresh Hybrid Tomato",
    weight: "500 g",
    price: 24,
    mrp: 35,
    delivery: "8 MINS",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&auto=format&fit=crop&q=80",
    tag: "Farm Picked",
  },
  {
    id: "p3",
    name: "Robusta Banana",
    weight: "1 kg",
    price: 49,
    mrp: 65,
    delivery: "8 MINS",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&auto=format&fit=crop&q=80",
    tag: "Top Seller",
  },
  {
    id: "p13",
    name: "Aashirvaad Chakki Atta",
    weight: "5 kg",
    price: 245,
    mrp: 290,
    delivery: "10 MINS",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80",
    tag: "Whole Wheat",
  },
];

const headlineWords = ["Groceries", "delivered", "in"];

export default function Hero({ onShopNow, onSelectCategory, onAddToCart }) {
  const [orderCount, setOrderCount] = useState(48);

  // Live ticker simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setOrderCount((n) => n + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-4 pb-8 sm:pt-8 sm:pb-14 border-b border-stone-200/60 bg-gradient-to-br from-[#FFF7D6] via-[#FFFAEB] to-[#EEF8F1]">
      {/* Background ambient gradient glow */}
      <div
        aria-hidden
        className="absolute top-0 right-1/4 w-96 h-96 bg-brand-yellow/20 rounded-full blur-3xl pointer-events-none -z-10"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-10 w-80 h-80 bg-brand-green/10 rounded-full blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* Top-aligned grid so left content starts at the top alongside the right showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* ===== Left column: Content aligned at top ===== */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-5 text-center lg:text-left pt-0.5 sm:pt-2">
            {/* Speed badge */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="relative inline-flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-md border border-brand-yellow/80 text-stone-900 pl-2 pr-3 sm:pr-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold shadow-2xs"
              >
                <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-brand-yellow to-amber-400 flex items-center justify-center text-[10px] sm:text-xs font-black shadow-inner">
                  ⚡
                </span>
                <span>10-Minute Dark Store Delivery • Instant Checkout</span>
              </motion.div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-content-primary tracking-tight leading-[1.08] sm:leading-[1.06]">
              {headlineWords.map((word, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.1 + idx * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block mr-2 sm:mr-3.5"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.36,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative inline-block"
              >
                <span className="text-brand-green">
                  minutes.
                </span>
              </motion.span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="text-xs sm:text-base lg:text-lg text-content-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              <strong className="text-content-primary font-semibold">
                Aapka apna bazar, ab minutes mein.
              </strong>{" "}
              Fresh milk, farm vegetables, bakery bread, snacks, and daily
              groceries delivered right to your kitchen in{" "}
              <span className="font-semibold text-brand-green">10 minutes</span>.
            </motion.p>

            {/* Quick chips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.52 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 pt-0.5"
            >
              <span className="text-[11px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider mr-1 hidden sm:inline">
                Popular:
              </span>
              {QUICK_CHIPS.map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => onSelectCategory(chip.categoryId)}
                  className="flex items-center gap-1 sm:gap-1.5 bg-white/95 hover:bg-white border border-stone-200 hover:border-brand-green text-content-primary text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-2xs hover:shadow-xs transition-all active:scale-95"
                >
                  <span>{chip.icon}</span>
                  <span>{chip.label}</span>
                </button>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 pt-1 sm:pt-2"
            >
              <button
                onClick={onShopNow}
                className="bg-brand-green hover:bg-brand-green-hover text-white font-bold px-5 sm:px-7 py-3 sm:py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 group text-xs sm:text-base active:scale-95"
              >
                <span>Order Groceries Now</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#categories"
                className="bg-white hover:bg-stone-50 text-content-primary font-semibold px-4 sm:px-6 py-3 sm:py-3.5 rounded-2xl border border-stone-200 shadow-2xs transition-all text-xs sm:text-base"
              >
                Explore 12 Aisles
              </a>
            </motion.div>

            {/* Quality badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-[11px] sm:text-xs font-semibold text-content-secondary"
            >
              {[
                "100% Mandi Fresh",
                "Free Delivery over ₹199",
                "Zero Minimum Order",
              ].map((text) => (
                <span key={text} className="flex items-center gap-1 sm:gap-1.5">
                  <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-green stroke-[3]" />
                  </span>
                  <span>{text}</span>
                </span>
              ))}
            </motion.div>
          </div>

          {/* ===== Right column: showcase board ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-3xl border border-stone-200/90 shadow-card p-3 sm:p-5">
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-brand-yellow/30 flex items-center justify-center text-base sm:text-lg">
                    🏪
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-content-primary">
                      Dark Store #14 • Local Hub
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-content-secondary flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-green flex-shrink-0" />
                      1.2 km away • Avg packing 1.8 mins
                    </p>
                  </div>
                </div>

                <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-black text-brand-green bg-brand-green-light px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping" />
                  ⚡ 8-10 MINS
                </span>
              </div>

              {/* Product grid: compact 2x2 */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-2 sm:gap-3 py-2.5 sm:py-3">
                {SHOWCASE_PRODUCTS.map((prod) => {
                  const discount = Math.round(
                    ((prod.mrp - prod.price) / prod.mrp) * 100
                  );
                  return (
                    <div
                      key={prod.id}
                      className="p-2 sm:p-2.5 rounded-2xl bg-surface-off border border-stone-100 flex flex-col justify-between hover:border-stone-300 transition-colors"
                    >
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-1.5 sm:mb-2 bg-white">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-1 left-1 bg-stone-900/80 text-white text-[8px] sm:text-[9px] font-bold px-1 sm:px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <Zap className="w-2.5 h-2.5 fill-current" />
                          {prod.delivery}
                        </span>
                        {discount > 0 && (
                          <span className="absolute top-1 right-1 bg-rose-500 text-white text-[8px] sm:text-[9px] font-black px-1 sm:px-1.5 py-0.5 rounded shadow-xs">
                            {discount}% OFF
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="text-[11px] sm:text-xs font-bold text-content-primary line-clamp-1">
                          {prod.name}
                        </h4>
                        <p className="text-[9px] sm:text-[10px] text-content-secondary">
                          {prod.weight}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1.5 sm:pt-2 mt-1 border-t border-stone-200/60">
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs sm:text-xs font-black text-content-primary">
                            ₹{prod.price}
                          </span>
                          {prod.mrp > prod.price && (
                            <span className="text-[8px] sm:text-[9px] text-stone-400 line-through">
                              ₹{prod.mrp}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => onAddToCart(prod)}
                          className="bg-brand-green hover:bg-brand-green-hover text-white text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg flex items-center gap-0.5 sm:gap-1 active:scale-95 transition-all"
                        >
                          <Plus className="w-3 h-3 stroke-[3]" />
                          <span>ADD</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Live ticker */}
              <div className="bg-brand-green-light/70 border border-brand-green/20 rounded-2xl p-2 sm:p-2.5 flex items-center justify-between text-[10px] sm:text-[11px]">
                <div className="flex items-center gap-1.5 sm:gap-2 font-medium text-brand-green truncate mr-1">
                  <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={orderCount}
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ duration: 0.2 }}
                      className="truncate"
                    >
                      {orderCount} orders delivered in your area in last 20m
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-brand-green font-mono flex-shrink-0">
                  LIVE
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
