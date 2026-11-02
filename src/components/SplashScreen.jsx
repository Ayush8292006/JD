import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import Logo from './Logo';

// Smooth comfortable timing: 2.6s total (gives eyes time to register logo + tagline, then smoothly fades out)
const SPLASH_DURATION = 2600;

export default function SplashScreen({ onFinish }) {
  const [progressComplete, setProgressComplete] = useState(false);

  useEffect(() => {
    // Progress bar fills over 2.2s
    const progressTimer = setTimeout(() => {
      setProgressComplete(true);
    }, 2200);

    // Gracefully finish after full duration
    const finishTimer = setTimeout(() => {
      onFinish();
    }, SPLASH_DURATION);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden select-none"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 0.97,
        transition: {
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
    >
      {/* Background Soft Warm Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF2] via-[#FFF8E1] to-white" />

      {/* Gentle Expanding Circular Pulse (Subtle, No floating clutter) */}
      <motion.div
        aria-hidden
        className="absolute rounded-full bg-brand-yellow/30 pointer-events-none"
        initial={{ width: 0, height: 0, opacity: 0.8 }}
        animate={{ width: '140vmax', height: '140vmax', opacity: 0 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        aria-hidden
        className="absolute rounded-full bg-brand-green/15 pointer-events-none"
        initial={{ width: 0, height: 0, opacity: 0.6 }}
        animate={{ width: '90vmax', height: '90vmax', opacity: 0 }}
        transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />

      {/* Main Center Content Card */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm w-full">
        {/* Soft Radial Ambient Behind Logo */}
        <div className="relative flex items-center justify-center">
          <motion.div
            aria-hidden
            className="absolute rounded-full bg-brand-yellow/50 blur-3xl"
            initial={{ width: 60, height: 60, opacity: 0 }}
            animate={{ width: 220, height: 220, opacity: [0, 0.8, 0.6] }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
          />

          {/* Logo with Smooth Gentle Scale & Draw */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative"
          >
            <Logo size="hero" showTagline={false} animated={true} />
          </motion.div>
        </div>

        {/* Tagline Animation with Smooth Fade & Lift */}
        <motion.div
          className="mt-6 flex flex-col items-center"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-lg sm:text-xl font-bold text-content-primary tracking-tight">
            Aapka apna bazar,{' '}
            <span className="text-brand-green">
              ab minutes mein.
            </span>
          </p>

          {/* Delivery Promise Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/20 text-brand-green px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-xs"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green" />
            </span>
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>10-Minute Lightning Delivery</span>
          </motion.div>
        </motion.div>

        {/* Smooth App Loading Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="mt-8 w-48 h-1.5 rounded-full bg-stone-200/90 overflow-hidden shadow-inner"
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-yellow via-amber-400 to-brand-green"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: 2.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />
        </motion.div>

        {/* Skip button for rapid interaction */}
        <motion.button
          onClick={onFinish}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.4 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-800 bg-white/80 hover:bg-white border border-stone-200 px-4 py-1.5 rounded-full shadow-2xs transition-all"
        >
          <span>Skip</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </motion.div>
  );
}
