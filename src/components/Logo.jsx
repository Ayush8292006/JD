import React from 'react';
import { motion } from 'framer-motion';

export default function Logo({ size = 'default', showTagline = false, animated = true, className = '' }) {
  const isLarge = size === 'large';
  const isHero = size === 'hero';

  return (
    <motion.div
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none group ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {/* Bag Icon with handle & JD motif */}
      <motion.div
        className="relative flex-shrink-0"
        initial={animated ? { scale: 0, rotate: -15 } : false}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, duration: 0.6 }}
      >
        <svg
          width={isHero ? 58 : isLarge ? 46 : 38}
          height={isHero ? 58 : isLarge ? 46 : 38}
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300"
        >
          {/* Shopping Bag Outer Body */}
          <rect
            x="6"
            y="14"
            width="42"
            height="36"
            rx="10"
            fill="#F8CB46"
            className="group-hover:fill-[#F6C22E] transition-colors"
          />

          {/* Bag Handle (Looping arch) */}
          <motion.path
            d="M18 16V10C18 6.68629 20.6863 4 24 4H30C33.3137 4 36 6.68629 36 10V16"
            stroke="#0C831F"
            strokeWidth="4"
            strokeLinecap="round"
            initial={animated ? { pathLength: 0 } : false}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          {/* "JD" Monogram inside Bag */}
          {/* 'J' letter with hooked base */}
          <motion.path
            d="M20 22V32C20 34.2 18.2 36 16 36H15"
            stroke="#1F1F1F"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* 'D' letter with bold rounded arch */}
          <motion.path
            d="M25 22H29C32.3137 22 35 24.6863 35 28C35 31.3137 32.3137 34 29 34H25V22Z"
            fill="#1F1F1F"
          />
          <rect x="25" y="22" width="3" height="12" fill="#1F1F1F" />
          <path
            d="M28 25H29C30.6569 25 32 26.3431 32 28C32 29.6569 30.6569 31 29 31H28V25Z"
            fill="#F8CB46"
          />

          {/* Mini Flash / Lightning Sparkle */}
          <motion.path
            d="M39 12L35 18H40L37 24"
            stroke="#0C831F"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ scale: [1, 1.25, 1], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span
            className={`font-black tracking-tight text-content-primary ${
              isHero ? 'text-3xl' : isLarge ? 'text-2xl' : 'text-xl'
            }`}
          >
            JD
          </span>
          <span
            className={`font-black tracking-tight text-brand-green ${
              isHero ? 'text-3xl' : isLarge ? 'text-2xl' : 'text-xl'
            }`}
          >
            Bazar
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded ml-1">
            .in
          </span>
        </div>

        {showTagline && (
          <p className="text-[11px] font-medium text-content-secondary -mt-0.5 tracking-tight">
            Aapka apna bazar, ab minutes mein.
          </p>
        )}
      </div>
    </motion.div>
  );
}

