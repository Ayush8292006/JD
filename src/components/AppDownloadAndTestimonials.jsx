import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, QrCode, Smartphone, CheckCircle, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export default function AppDownloadAndTestimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const prevReview = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const review = TESTIMONIALS[currentTestimonial];

  return (
    <section className="py-12 sm:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* App Download Banner (Zepto/Blinkit style) */}
        <div className="rounded-3xl bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          {/* Background glowing blobs */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-yellow/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-brand-green/20 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-yellow text-stone-900">
                ⚡ JD Bazar Mobile App
              </span>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Get ₹100 OFF on your first 3 orders on the App
              </h2>

              <p className="text-sm text-stone-300 max-w-lg leading-relaxed">
                Experience supersonic checkout, live rider GPS tracking, and exclusive dark store discounts only on the JD Bazar app.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                {/* Simulated App Store & Play Store Buttons */}
                <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 rounded-2xl transition-all">
                  <span className="text-2xl">🍏</span>
                  <div className="text-left">
                    <p className="text-[10px] text-stone-400 uppercase leading-none">Download on</p>
                    <p className="text-xs font-bold text-white">Apple App Store</p>
                  </div>
                </button>

                <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 rounded-2xl transition-all">
                  <span className="text-2xl">🤖</span>
                  <div className="text-left">
                    <p className="text-[10px] text-stone-400 uppercase leading-none">Get it on</p>
                    <p className="text-xs font-bold text-white">Google Play</p>
                  </div>
                </button>
              </div>
            </div>

            {/* QR Code & Phone Mockup */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end gap-5">
              <div className="bg-white p-4 rounded-2xl shadow-xl flex flex-col items-center text-center text-stone-900">
                {/* High quality clean SVG QR code */}
                <div className="w-28 h-28 bg-stone-100 rounded-xl p-2 flex items-center justify-center border border-stone-200">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-stone-900 fill-current">
                    <rect x="10" y="10" width="30" height="30" rx="4" fill="currentColor"/>
                    <rect x="18" y="18" width="14" height="14" rx="2" fill="white"/>
                    <rect x="60" y="10" width="30" height="30" rx="4" fill="currentColor"/>
                    <rect x="68" y="18" width="14" height="14" rx="2" fill="white"/>
                    <rect x="10" y="60" width="30" height="30" rx="4" fill="currentColor"/>
                    <rect x="18" y="68" width="14" height="14" rx="2" fill="white"/>
                    <circle cx="25" cy="25" r="4" fill="currentColor"/>
                    <circle cx="75" cy="25" r="4" fill="currentColor"/>
                    <circle cx="25" cy="75" r="4" fill="currentColor"/>
                    <rect x="50" y="50" width="10" height="10" fill="#0C831F"/>
                    <rect x="65" y="65" width="20" height="10" fill="currentColor"/>
                    <rect x="50" y="75" width="15" height="15" fill="currentColor"/>
                    <rect x="75" y="50" width="15" height="10" fill="currentColor"/>
                  </svg>
                </div>
                <p className="text-[11px] font-bold mt-2">Scan to install</p>
                <p className="text-[9px] text-stone-500 font-medium">iOS & Android</p>
              </div>

              {/* Mini App Rating Pill */}
              <div className="hidden sm:flex flex-col gap-2">
                <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-3 rounded-2xl text-left">
                  <div className="flex items-center gap-1 text-brand-yellow">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-white mt-1">4.8 / 5 Rating</p>
                  <p className="text-[10px] text-stone-300">Over 1,20,000+ reviews</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-3 rounded-2xl text-left">
                  <div className="flex items-center gap-1.5 text-brand-green">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">100% Secure</span>
                  </div>
                  <p className="text-[10px] text-stone-300">Razorpay & UPI Verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-brand-green uppercase tracking-wider bg-brand-green-light px-3 py-1 rounded-full">
              What Neighbours Say
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-content-primary tracking-tight mt-2">
              Loved by 5,00,000+ Families
            </h3>
          </div>

          <div className="relative bg-surface-off rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-green bg-white px-2.5 py-1 rounded-full border border-brand-green/20">
                    <CheckCircle className="w-3.5 h-3.5" /> {review.badge}
                  </span>
                </div>

                {/* Comment quote */}
                <p className="text-base sm:text-lg text-content-primary font-medium leading-relaxed italic">
                  "{review.comment}"
                </p>

                {/* Reviewer info */}
                <div className="flex items-center gap-3.5 pt-2 border-t border-stone-200/60">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-brand-yellow"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-content-primary">
                      {review.name}
                    </h4>
                    <p className="text-xs text-content-secondary">
                      {review.role} • {review.time}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav Arrows */}
            <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 flex items-center gap-2">
              <button
                onClick={prevReview}
                className="w-9 h-9 rounded-full bg-white hover:bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700 transition-colors shadow-xs"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextReview}
                className="w-9 h-9 rounded-full bg-white hover:bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700 transition-colors shadow-xs"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

