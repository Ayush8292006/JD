import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Copy, Check, Sparkles } from 'lucide-react';
import { PROMO_BANNERS } from '../data/products';

export default function PromoCarousel({ onApplyCoupon }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play interval
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROMO_BANNERS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? PROMO_BANNERS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PROMO_BANNERS.length);
  };

  const handleCopyCode = (code) => {
    setCopiedCode(code);
    if (onApplyCoupon) onApplyCoupon(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const banner = PROMO_BANNERS[currentIndex];

  return (
    <section className="py-6 sm:py-8 bg-surface-off">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-3xl overflow-hidden shadow-card"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Active Banner Slide with Framer Motion AnimatePresence */}
          <div className="relative min-h-[190px] sm:min-h-[220px] md:min-h-[250px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={banner.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute inset-0 bg-gradient-to-r ${banner.bgGradient} p-6 sm:p-8 md:p-10 flex flex-col justify-between`}
              >
                {/* Top Badge & Tag */}
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wide ${banner.badgeBg}`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {banner.tag}
                  </span>

                  {/* Promo Code Pill */}
                  <button
                    onClick={() => handleCopyCode(banner.code)}
                    className="flex items-center gap-1.5 bg-black/20 hover:bg-black/30 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border border-white/20 active:scale-95"
                  >
                    <span>CODE: {banner.code}</span>
                    {copiedCode === banner.code ? (
                      <Check className="w-3.5 h-3.5 text-brand-yellow" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Banner Content & Large Illustration */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center my-auto py-2">
                  <div className="md:col-span-8 space-y-1.5">
                    <h3 className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight ${banner.textColor}`}>
                      {banner.title}
                    </h3>
                    <p className={`text-xs sm:text-sm font-semibold opacity-90 ${banner.textColor}`}>
                      {banner.offer} • {banner.subtitle}
                    </p>
                  </div>

                  {/* Right Illustration */}
                  <div className="hidden md:flex md:col-span-4 justify-end">
                    <span className="text-6xl lg:text-7xl filter drop-shadow-lg select-none">
                      {banner.illustration}
                    </span>
                  </div>
                </div>

                {/* Bottom Row: CTA Button */}
                <div>
                  <button
                    onClick={() => handleCopyCode(banner.code)}
                    className="bg-stone-900 hover:bg-black text-brand-yellow font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 inline-flex items-center gap-2"
                  >
                    <span>{banner.cta}</span>
                    <span>→</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Previous / Next Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-stone-800 flex items-center justify-center shadow-md backdrop-blur-sm transition-all"
            aria-label="Previous banner"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-stone-800 flex items-center justify-center shadow-md backdrop-blur-sm transition-all"
            aria-label="Next banner"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/25 backdrop-blur-sm px-3 py-1.5 rounded-full z-10">
            {PROMO_BANNERS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all rounded-full ${
                  currentIndex === idx
                    ? 'w-6 h-2 bg-brand-yellow'
                    : 'w-2 h-2 bg-white/60 hover:bg-white'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

