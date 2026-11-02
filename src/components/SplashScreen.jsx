import React, { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import Logo from './Logo';

const SPLASH_DURATION = 1600;

const FLOATING_EMOJIS = [
  { emoji: '🥛', top: '15%', left: '10%', delay: 0, size: 'text-3xl' },
  { emoji: '🍅', top: '70%', left: '8%', delay: 0.4, size: 'text-4xl' },
  { emoji: '🥦', top: '20%', left: '85%', delay: 0.2, size: 'text-3xl' },
  { emoji: '🍞', top: '78%', left: '88%', delay: 0.6, size: 'text-4xl' },
  { emoji: '🍌', top: '45%', left: '5%', delay: 0.3, size: 'text-2xl' },
  { emoji: '🥑', top: '55%', left: '92%', delay: 0.5, size: 'text-2xl' },
];

// Deterministic sparkle positions (avoids hydration mismatch)
const SPARKLES = Array.from({ length: 12 }).map((_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  const distance = 90 + (i % 3) * 25;
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    delay: 0.5 + (i % 4) * 0.05,
    size: i % 3 === 0 ? 6 : 4,
  };
});

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: 'blur(6px)',
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* ===== Background layers ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF6D4] via-white to-[#E8F7EE]" />

      {/* Subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }}
      />

      {/* Expanding rings (3 layers) */}
      <motion.div
        aria-hidden
        className="absolute rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,210,80,0.45) 0%, rgba(255,210,80,0) 70%)',
        }}
        initial={{ width: 0, height: 0, opacity: 1 }}
        animate={{ width: '160vmax', height: '160vmax', opacity: 0 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        aria-hidden
        className="absolute rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(34,197,94,0.35) 0%, rgba(34,197,94,0) 70%)',
        }}
        initial={{ width: 0, height: 0, opacity: 1 }}
        animate={{ width: '110vmax', height: '110vmax', opacity: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
      />
      <motion.div
        aria-hidden
        className="absolute rounded-full bg-brand-yellow/40"
        initial={{ width: 0, height: 0, opacity: 0.9 }}
        animate={{ width: '60vmax', height: '60vmax', opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.24 }}
      />

      {/* Floating grocery emojis */}
      {FLOATING_EMOJIS.map((item, i) => (
        <motion.span
          key={i}
          aria-hidden
          className={`absolute ${item.size} select-none pointer-events-none opacity-30 blur-[0.3px]`}
          style={{ top: item.top, left: item.left }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.35, y: [0, -14, 0], rotate: [0, 6, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 0.3 + item.delay },
            y: { duration: 4 + i, repeat: Infinity, delay: item.delay, ease: 'easeInOut' },
            rotate: { duration: 5 + i, repeat: Infinity, delay: item.delay, ease: 'easeInOut' },
          }}
        >
          {item.emoji}
        </motion.span>
      ))}

      {/* ===== Center content ===== */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Logo + halo + sparkles */}
        <div className="relative flex items-center justify-center">
          {/* Pulsing halo */}
          <motion.div
            aria-hidden
            className="absolute rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(255,210,80,0.55) 0%, rgba(34,197,94,0.25) 45%, transparent 70%)',
              filter: 'blur(28px)',
            }}
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{
              width: 280,
              height: 280,
              opacity: [0, 0.9, 0.6, 0.9],
              scale: [0.6, 1, 0.95, 1],
            }}
            transition={{
              duration: 2.4,
              ease: 'easeInOut',
              times: [0, 0.4, 0.7, 1],
            }}
          />

          {/* Sparkles radiating outward */}
          {SPARKLES.map((s, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute rounded-full bg-brand-green"
              style={{ width: s.size, height: s.size }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{
                x: s.x,
                y: s.y,
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0],
              }}
              transition={{
                duration: 1.1,
                delay: s.delay,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0, rotate: -6 }}
            animate={{ scale: [0.4, 1.12, 1], opacity: 1, rotate: 0 }}
            transition={{
              duration: 0.9,
              times: [0, 0.7, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <Logo size="hero" showTagline={false} animated={true} />
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.div
          className="mt-6 flex flex-col items-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-lg md:text-xl font-bold text-content-primary">
            Aapka apna bazar,{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-500 via-brand-green to-lime-500 bg-clip-text text-transparent">
                ab minutes mein.
              </span>
              <motion.span
                aria-hidden
                className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-brand-green to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
              />
            </span>
          </p>

          {/* Delivery badge with shimmer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.75, duration: 0.4 }}
            className="relative mt-4 flex items-center gap-2 bg-brand-green/10 backdrop-blur-sm border border-brand-green/20 text-brand-green px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide overflow-hidden"
          >
            <motion.span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 0.8,
              }}
            />
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green" />
            </span>
            <Zap className="relative w-3.5 h-3.5 fill-current" />
            <span className="relative">10-Minute Lightning Delivery</span>
          </motion.div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.4 }}
          className="mt-8 w-44 h-1 rounded-full bg-stone-200/80 overflow-hidden"
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-yellow via-brand-green to-emerald-500"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: SPLASH_DURATION / 1000 - 0.1,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        </motion.div>

        {/* Skip */}
        <motion.button
          onClick={onFinish}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="group mt-6 flex items-center gap-1.5 text-xs font-medium text-content-secondary hover:text-content-primary bg-white/70 backdrop-blur-sm border border-stone-200/80 hover:border-stone-300 px-3.5 py-1.5 rounded-full shadow-sm transition-colors"
        >
          <span>Skip intro</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </motion.button>
      </div>
    </motion.div>
  );
}