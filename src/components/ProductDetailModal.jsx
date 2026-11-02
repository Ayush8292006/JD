import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Star,
  Clock,
  ShieldCheck,
  Plus,
  Minus,
  Truck,
  Leaf
} from 'lucide-react';

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  quantity = 0,
  onAdd,
  onIncrement,
  onDecrement
}) {
  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-100 max-h-[88vh] flex flex-col"
        >
          {/* Modal Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-stone-100 bg-surface-off">
            <div className="flex items-center gap-2">
              <span className="text-[11px] sm:text-xs font-bold text-brand-green bg-brand-green-light px-2.5 py-1 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {product.deliveryTime || "8 MINS"} Delivery
              </span>
              {product.discount && (
                <span className="text-[10px] sm:text-xs font-extrabold text-white bg-blue-600 px-2 py-0.5 rounded-full">
                  {product.discount}
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-stone-200 border border-stone-200 flex items-center justify-center text-stone-600 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6">
            {/* Product Image Stage */}
            <div className="relative w-full h-44 xs:h-52 sm:h-64 rounded-2xl bg-stone-50 border border-stone-100 overflow-hidden flex items-center justify-center group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {product.tag && (
                <span className="absolute top-2.5 left-2.5 bg-stone-900/85 text-brand-yellow text-[10px] sm:text-xs font-black px-2.5 py-0.5 sm:py-1 rounded-full backdrop-blur-xs">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Product Meta */}
            <div>
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg sm:text-2xl font-black text-content-primary leading-tight">
                  {product.name}
                </h2>
                {product.rating && (
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-xl flex-shrink-0">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-[11px] sm:text-xs font-bold text-stone-800">
                      {product.rating}
                    </span>
                  </div>
                )}
              </div>

              {product.hindi && (
                <p className="text-xs font-semibold text-content-secondary mt-0.5">
                  {product.hindi}
                </p>
              )}

              <p className="text-xs text-stone-500 font-medium mt-1">
                Net Quantity: <span className="text-stone-800 font-bold">{product.weight}</span>
              </p>
            </div>

            {/* Key Trust Highlights */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 rounded-2xl bg-stone-50 border border-stone-100 text-center space-y-0.5 sm:space-y-1">
                <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-brand-green mx-auto" />
                <p className="text-[10px] sm:text-[11px] font-bold text-stone-800">100% Quality</p>
                <p className="text-[8px] sm:text-[9px] text-stone-500">Mandi Fresh</p>
              </div>

              <div className="p-2 sm:p-3 rounded-2xl bg-stone-50 border border-stone-100 text-center space-y-0.5 sm:space-y-1">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-brand-green mx-auto" />
                <p className="text-[10px] sm:text-[11px] font-bold text-stone-800">10 Mins Drop</p>
                <p className="text-[8px] sm:text-[9px] text-stone-500">Dark Store</p>
              </div>

              <div className="p-2 sm:p-3 rounded-2xl bg-stone-50 border border-stone-100 text-center space-y-0.5 sm:space-y-1">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-brand-green mx-auto" />
                <p className="text-[10px] sm:text-[11px] font-bold text-stone-800">Easy Return</p>
                <p className="text-[8px] sm:text-[9px] text-stone-500">At Doorstep</p>
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-1.5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
              <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-content-primary">
                Product Information
              </h4>
              <p className="text-[11px] sm:text-xs text-stone-600">
                Packed hygienically in temperature-controlled dark stores within 2 km of your location. Inspected for peak freshness before dispatch.
              </p>
              <div className="bg-surface-off p-2.5 rounded-xl border border-stone-200/60 flex items-center justify-between text-[10px] sm:text-[11px]">
                <span className="font-semibold text-stone-700">Country of Origin:</span>
                <span className="font-bold text-content-primary">India (100% Sourced)</span>
              </div>
            </div>
          </div>

          {/* Modal Footer: Price & Add Button */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-stone-200 bg-white flex items-center justify-between gap-3">
            <div>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-content-secondary block">
                Price
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-content-primary">
                  ₹{product.price}
                </span>
                {product.mrp && product.mrp > product.price && (
                  <span className="text-[11px] sm:text-xs text-stone-400 line-through">
                    ₹{product.mrp}
                  </span>
                )}
                {product.mrp && product.mrp > product.price && (
                  <span className="text-[9px] sm:text-[10px] font-bold text-brand-green bg-brand-green-light px-1.5 py-0.5 rounded">
                    Save ₹{product.mrp - product.price}
                  </span>
                )}
              </div>
            </div>

            {/* Stepper or ADD */}
            <div>
              {quantity === 0 ? (
                <button
                  onClick={() => onAdd(product)}
                  className="bg-brand-green hover:bg-brand-green-hover text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl shadow-sm transition-all active:scale-95"
                >
                  ADD TO CART
                </button>
              ) : (
                <div className="flex items-center bg-brand-green text-white rounded-2xl shadow-sm overflow-hidden">
                  <button
                    onClick={() => onDecrement(product.id)}
                    className="p-2.5 sm:p-3 hover:bg-brand-green-hover transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                  </button>
                  <span className="px-3 sm:px-4 text-xs sm:text-sm font-black min-w-[24px] sm:min-w-[28px] text-center select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => onIncrement(product.id)}
                    className="p-2.5 sm:p-3 hover:bg-brand-green-hover transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
