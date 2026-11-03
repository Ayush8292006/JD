import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Clock, Eye } from 'lucide-react';

export default function ProductCard({
  product,
  quantity = 0,
  onAdd,
  onIncrement,
  onDecrement,
  onQuickView,
  variant = 'rail' // 'rail' = horizontal scroller card, 'grid' = fills a grid cell
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isAdded = quantity > 0;
  const savings = product.mrp && product.mrp > product.price ? product.mrp - product.price : 0;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`bg-white rounded-2xl border border-stone-200/80 p-2.5 sm:p-3.5 flex flex-col justify-between shadow-2xs hover:shadow-card hover:border-stone-300 transition-all duration-200 relative group select-none ${
        variant === 'grid'
          ? 'w-full min-w-0 sm:w-auto sm:min-w-[195px] sm:max-w-[215px] sm:flex-shrink-0'
          : 'w-[146px] sm:w-auto sm:min-w-[195px] max-w-[215px] flex-shrink-0 snap-start'
      }`}
    >
      {/* Top Delivery Time Tag & Discount Pill */}
      <div className="flex items-center justify-between gap-1 mb-1.5 sm:mb-2">
        <span className="inline-flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-[10px] font-black tracking-tight text-brand-green bg-brand-green-light px-1.5 sm:px-2 py-0.5 rounded-md">
          <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          {product.deliveryTime}
        </span>

        {product.discount && (
          <span className="text-[9px] sm:text-[10px] font-extrabold text-white bg-blue-600 px-1 sm:px-1.5 py-0.5 rounded-md uppercase tracking-wider">
            {product.discount}
          </span>
        )}
      </div>

      {/* Image Container with Shimmer, Fallback & Quick View Trigger */}
      <div
        onClick={() => onQuickView && onQuickView(product)}
        className="relative w-full aspect-square rounded-xl overflow-hidden bg-surface-off mb-2 sm:mb-2.5 flex items-center justify-center cursor-pointer group/img"
      >
        {/* Shimmer skeleton until image loads */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 skeleton-shimmer z-10" />
        )}

        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
            className={`w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-3">
            <span className="text-4xl sm:text-5xl select-none">{product.emoji}</span>
          </div>
        )}

        {/* Quick View Hover Button (Desktop only) */}
        <div className="hidden sm:flex absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity items-center justify-center">
          <span className="bg-white/95 text-stone-900 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 backdrop-blur-xs">
            <Eye className="w-3 h-3 text-brand-green" /> Quick View
          </span>
        </div>

        {/* Product Tag Badge */}
        {product.tag && (
          <span className="absolute bottom-1 left-1 bg-stone-900/80 backdrop-blur-xs text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-md z-20">
            {product.tag}
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3
            onClick={() => onQuickView && onQuickView(product)}
            className="text-xs sm:text-sm font-bold text-content-primary line-clamp-2 min-h-[30px] sm:min-h-[34px] group-hover:text-brand-green transition-colors cursor-pointer leading-tight"
          >
            {product.name}
          </h3>
          <p className="text-[10px] sm:text-[11px] text-content-secondary font-medium mt-0.5">
            {product.weight}
          </p>
        </div>

        {/* Price and Add / Quantity Stepper Button */}
        <div className="flex items-center justify-between gap-1 pt-2 sm:pt-3 mt-1.5 border-t border-stone-100">
          <div className="flex flex-col min-w-0">
            <div className="flex items-baseline gap-1">
              <span className="text-xs sm:text-base font-black text-content-primary">
                ₹{product.price}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-[10px] sm:text-[11px] text-stone-400 line-through">
                  ₹{product.mrp}
                </span>
              )}
            </div>
            {savings > 0 && (
              <span className="text-[8px] sm:text-[9px] font-bold text-brand-green truncate">
                Save ₹{savings}
              </span>
            )}
          </div>

          {/* Morphing Green ADD button / Stepper */}
          <div className="flex-shrink-0">
            <AnimatePresence mode="wait">
              {!isAdded ? (
                <motion.button
                  key="add-btn"
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => onAdd(product)}
                  className="bg-brand-green-subtle hover:bg-brand-green border border-brand-green text-brand-green hover:text-white font-extrabold text-[11px] sm:text-xs px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-xl shadow-2xs transition-colors duration-150 flex items-center justify-center min-w-[56px] sm:min-w-[68px]"
                  aria-label={`Add ${product.name} to cart`}
                >
                  ADD
                </motion.button>
              ) : (
                <motion.div
                  key="stepper"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="flex items-center bg-brand-green text-white rounded-xl shadow-xs overflow-hidden"
                >
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => onDecrement(product.id)}
                    className="p-1 sm:p-1.5 hover:bg-brand-green-hover transition-colors flex items-center justify-center"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3 stroke-[3]" />
                  </motion.button>

                  <motion.span
                    key={quantity}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="px-1.5 sm:px-2 text-[11px] sm:text-xs font-black min-w-[18px] text-center select-none"
                  >
                    {quantity}
                  </motion.span>

                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => onIncrement(product.id)}
                    className="p-1 sm:p-1.5 hover:bg-brand-green-hover transition-colors flex items-center justify-center"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3 stroke-[3]" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
