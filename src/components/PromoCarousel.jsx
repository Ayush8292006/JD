import React, { useState, useEffect, useRef } from 'react';
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

  // Touch swipe (phones / tablets)
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? handleNext : handlePrev)();
    touchStartX.current = null;
    setIsPaused(false);
  };

  const banner = PROMO_BANNERS[currentIndex];

  return (
    <section className="pt-1 pb-4 md:py-8 bg-white md:bg-surface-off">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div
          className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-card"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Active Banner Slide with Framer Motion AnimatePresence */}
          <div className="relative min-h-[160px] sm:min-h-[200px] md:min-h-[250px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={banner.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute inset-0 bg-gradient-to-r ${banner.bgGradient} p-4 sm:p-8 md:p-10 flex flex-col justify-between`}
              >
                {/* Top Badge & Tag */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-black tracking-wide ${banner.badgeBg}`}
                  >
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    {banner.tag}
                  </span>

                  {/* Promo Code Pill */}
                  <button
                    onClick={() => handleCopyCode(banner.code)}
                    className="flex items-center gap-1 bg-black/25 hover:bg-black/35 backdrop-blur-sm text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-mono font-bold transition-all border border-white/20 active:scale-95"
                  >
                    <span>CODE: {banner.code}</span>
                    {copiedCode === banner.code ? (
                      <Check className="w-3 h-3 text-brand-yellow" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>

                {/* Banner Content & Large Illustration */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center my-auto py-1 sm:py-2">
                  <div className="md:col-span-8 space-y-1">
                    <h3 className={`text-xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight ${banner.textColor}`}>
                      {banner.title}
                    </h3>
                    <p className={`text-xs sm:text-sm font-semibold opacity-90 ${banner.textColor} line-clamp-1 sm:line-clamp-none`}>
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
                    className="bg-stone-900 hover:bg-black text-brand-yellow font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-md transition-all active:scale-95 inline-flex items-center gap-1.5 sm:gap-2"
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
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-stone-800 items-center justify-center shadow-md backdrop-blur-sm transition-all"
            aria-label="Previous banner"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={handleNext}
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-stone-800 items-center justify-center shadow-md backdrop-blur-sm transition-all"
            aria-label="Next banner"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 right-3 md:right-auto md:left-1/2 md:-translate-x-1/2 flex items-center gap-1.5 sm:gap-2 bg-black/25 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full z-10">
            {PROMO_BANNERS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all rounded-full ${
                  currentIndex === idx
                    ? 'w-5 sm:w-6 h-1.5 sm:h-2 bg-brand-yellow'
                    : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/60 hover:bg-white'
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
