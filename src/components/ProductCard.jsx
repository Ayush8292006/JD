import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Clock, Star, Eye } from 'lucide-react';

export default function ProductCard({
  product,
  quantity = 0,
  onAdd,
  onIncrement,
  onDecrement,
  onQuickView
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isAdded = quantity > 0;
  const savings = product.mrp && product.mrp > product.price ? product.mrp - product.price : 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="bg-white rounded-2xl border border-stone-200/80 p-3 sm:p-3.5 flex flex-col justify-between shadow-2xs hover:shadow-card hover:border-stone-300 transition-all duration-200 relative group min-w-[170px] sm:min-w-[195px] max-w-[220px] select-none"
    >
      {/* Top Delivery Time Tag & Discount Pill */}
      <div className="flex items-center justify-between gap-1 mb-2">
        <span className="inline-flex items-center gap-1 text-[10px] font-black tracking-tight text-brand-green bg-brand-green-light px-2 py-0.5 rounded-md">
          <Clock className="w-3 h-3" />
          {product.deliveryTime}
        </span>

        {product.discount && (
          <span className="text-[10px] font-extrabold text-white bg-blue-600 px-1.5 py-0.5 rounded-md uppercase tracking-wider">
            {product.discount}
          </span>
        )}
      </div>

      {/* Image Container with Shimmer, Fallback & Quick View Trigger */}
      <div
        onClick={() => onQuickView && onQuickView(product)}
        className="relative w-full aspect-square rounded-xl overflow-hidden bg-surface-off mb-2.5 flex items-center justify-center cursor-pointer group/img"
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
          <div className="flex flex-col items-center justify-center p-4">
            <span className="text-5xl select-none">{product.emoji}</span>
          </div>
        )}

        {/* Quick View Hover Button */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/95 text-stone-900 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 backdrop-blur-xs">
            <Eye className="w-3 h-3 text-brand-green" /> Quick View
          </span>
        </div>

        {/* Product Tag Badge (e.g. "Best Seller", "Fresh Farm") */}
        {product.tag && (
          <span className="absolute bottom-1.5 left-1.5 bg-stone-900/80 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md z-20">
            {product.tag}
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3
            onClick={() => onQuickView && onQuickView(product)}
            className="text-xs sm:text-sm font-bold text-content-primary line-clamp-2 min-h-[34px] group-hover:text-brand-green transition-colors cursor-pointer"
          >
            {product.name}
          </h3>
          <p className="text-[11px] text-content-secondary font-medium mt-0.5">
            {product.weight}
          </p>
        </div>

        {/* Price and Add / Quantity Stepper Button */}
        <div className="flex items-center justify-between gap-1.5 pt-3 mt-2 border-t border-stone-100">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-sm sm:text-base font-black text-content-primary">
                ₹{product.price}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-[11px] text-stone-400 line-through">
                  ₹{product.mrp}
                </span>
              )}
            </div>
            {savings > 0 && (
              <span className="text-[9px] font-bold text-brand-green">
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
                  className="bg-brand-green-subtle hover:bg-brand-green border border-brand-green text-brand-green hover:text-white font-extrabold text-xs px-4 py-1.5 rounded-xl shadow-2xs transition-colors duration-150 flex items-center justify-center min-w-[68px]"
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
                    className="px-2 py-1.5 hover:bg-brand-green-hover transition-colors flex items-center justify-center"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5 stroke-[3]" />
                  </motion.button>

                  <motion.span
                    key={quantity}
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    className="px-2 text-xs font-black min-w-[20px] text-center select-none"
                  >
                    {quantity}
                  </motion.span>

                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => onIncrement(product.id)}
                    className="px-2 py-1.5 hover:bg-brand-green-hover transition-colors flex items-center justify-center"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
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
