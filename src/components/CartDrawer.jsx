import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Trash2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Tag
} from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon
}) {
  const [tipAmount, setTipAmount] = useState(0);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const cartItems = Object.values(cart);
  const itemTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalMrp = cartItems.reduce((sum, item) => sum + (item.mrp || item.price) * item.quantity, 0);
  const savings = totalMrp - itemTotal;

  // Delivery fee logic (Free over ₹199, else ₹25)
  const freeDeliveryThreshold = 199;
  const isFreeDelivery = itemTotal >= freeDeliveryThreshold;
  const deliveryFee = itemTotal === 0 ? 0 : isFreeDelivery ? 0 : 25;
  const handlingFee = itemTotal === 0 ? 0 : 5;

  // Coupon discount calculation
  let discountAmount = 0;
  if (appliedCoupon === 'JDFIRST') {
    discountAmount = Math.min(100, Math.round(itemTotal * 0.2));
  } else if (appliedCoupon === 'FRESH50') {
    discountAmount = Math.min(60, Math.round(itemTotal * 0.15));
  } else if (appliedCoupon === 'SNACKFEST') {
    discountAmount = 40;
  }

  const grandTotal = Math.max(0, itemTotal + deliveryFee + handlingFee + tipAmount - discountAmount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (['JDFIRST', 'FRESH50', 'SNACKFEST'].includes(code)) {
      onApplyCoupon(code);
      setCouponInput('');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try JDFIRST or FRESH50');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex">
          {/* Drawer: full height slide from right on desktop, or slide up on mobile */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full z-10"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-stone-200/80 flex items-center justify-between bg-surface-off">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-green text-white flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-content-primary">My Grocery Cart</h3>
                  <p className="text-xs text-content-secondary">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in basket
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors border border-stone-200"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Free Delivery Bar */}
            {itemTotal > 0 && (
              <div className="bg-brand-yellow/20 px-4 py-2.5 border-b border-brand-yellow/30 flex items-center justify-between text-xs font-semibold">
                {isFreeDelivery ? (
                  <span className="text-brand-green flex items-center gap-1.5 font-bold">
                    <Check className="w-4 h-4" /> Yay! You get FREE 10-Minute Delivery
                  </span>
                ) : (
                  <span className="text-stone-800">
                    Add <strong className="text-brand-green">₹{freeDeliveryThreshold - itemTotal}</strong> more for <strong className="text-brand-green">FREE Delivery</strong>
                  </span>
                )}
                <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded text-stone-600 border border-brand-yellow/40">
                  ⚡ 10 MINS
                </span>
              </div>
            )}

            {/* Items List or Empty State */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-stone-100">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-24 h-24 rounded-full bg-brand-yellow/20 flex items-center justify-center text-5xl">
                    🛍️
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-content-primary">Your cart is empty</h4>
                    <p className="text-xs text-content-secondary mt-1 max-w-xs">
                      Explore our 10-minute fresh groceries, snacks, dairy, and fruits!
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="bg-brand-green hover:bg-brand-green-hover text-white font-bold text-xs px-6 py-3 rounded-2xl shadow-sm transition-all"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 p-3 bg-surface-off/60 rounded-2xl border border-stone-100"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 rounded-xl bg-white p-1 border border-stone-200 flex items-center justify-center text-2xl flex-shrink-0">
                            {item.emoji || '📦'}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-content-primary truncate">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-content-secondary">
                              {item.weight} • ₹{item.price}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center bg-brand-green text-white rounded-xl shadow-xs overflow-hidden flex-shrink-0">
                          <button
                            onClick={() => onDecrement(item.id)}
                            className="p-1.5 hover:bg-brand-green-hover transition-colors"
                          >
                            <Minus className="w-3 h-3 stroke-[3]" />
                          </button>
                          <span className="px-2 text-xs font-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onIncrement(item.id)}
                            className="p-1.5 hover:bg-brand-green-hover transition-colors"
                          >
                            <Plus className="w-3 h-3 stroke-[3]" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Code Section */}
                  <div className="pt-2">
                    <form onSubmit={handleApplyCoupon} className="space-y-2">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="Enter coupon code (e.g. JDFIRST)"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-xs font-semibold uppercase focus:outline-none focus:border-brand-green"
                          />
                        </div>
                        <button
                          type="submit"
                          className="bg-stone-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-black transition-all"
                        >
                          Apply
                        </button>
                      </div>

                      {couponError && (
                        <p className="text-[11px] text-red-500 font-medium">{couponError}</p>
                      )}

                      {appliedCoupon && (
                        <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs">
                          <span className="font-bold text-brand-green flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" /> '{appliedCoupon}' applied (-₹{discountAmount})
                          </span>
                          <button
                            type="button"
                            onClick={onRemoveCoupon}
                            className="text-stone-400 hover:text-stone-600 text-xs font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </form>
                  </div>

                  {/* Tip Delivery Partner */}
                  <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-content-primary">Tip your delivery rider</span>
                      <span className="text-[11px] text-content-secondary">100% goes to rider</span>
                    </div>
                    <div className="flex gap-2">
                      {[10, 20, 30, 50].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setTipAmount(tipAmount === amt ? 0 : amt)}
                          className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                            tipAmount === amt
                              ? 'bg-brand-green text-white border-brand-green'
                              : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bill Summary */}
                  <div className="space-y-2 pt-2 text-xs">
                    <p className="font-bold text-content-primary uppercase tracking-wider text-[11px]">
                      Bill Details
                    </p>

                    <div className="flex justify-between text-content-secondary">
                      <span>Item Total (MRP)</span>
                      <span>₹{totalMrp}</span>
                    </div>

                    {savings > 0 && (
                      <div className="flex justify-between text-brand-green font-semibold">
                        <span>Product Discount</span>
                        <span>- ₹{savings}</span>
                      </div>
                    )}

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-brand-green font-semibold">
                        <span>Coupon Savings ({appliedCoupon})</span>
                        <span>- ₹{discountAmount}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-content-secondary">
                      <span>Delivery Partner Fee</span>
                      {deliveryFee === 0 ? (
                        <span className="text-brand-green font-bold">FREE</span>
                      ) : (
                        <span>₹{deliveryFee}</span>
                      )}
                    </div>

                    <div className="flex justify-between text-content-secondary">
                      <span>Govt & Handling Charges</span>
                      <span>₹{handlingFee}</span>
                    </div>

                    {tipAmount > 0 && (
                      <div className="flex justify-between text-content-secondary">
                        <span>Delivery Tip</span>
                        <span>₹{tipAmount}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-base font-black text-content-primary pt-2 border-t border-stone-200">
                      <span>To Pay</span>
                      <span className="text-brand-green">₹{grandTotal}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Sticky Action Bar */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t border-stone-200 bg-white space-y-2">
                <button
                  onClick={() => onCheckout({ items: cartItems, grandTotal })}
                  className="w-full bg-brand-green hover:bg-brand-green-hover text-white font-bold py-3.5 px-4 rounded-2xl transition-all shadow-floating flex items-center justify-between text-sm group"
                >
                  <div className="text-left">
                    <span className="block text-[11px] font-medium text-emerald-100">
                      {cartItems.length} items • ₹{grandTotal}
                    </span>
                    <span className="text-sm font-black">Proceed to Pay</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold">
                    <span>Pay ₹{grandTotal}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>

                <p className="text-[11px] text-content-secondary text-center flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
                  Safe & Secure 256-bit Encrypted Checkout
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}

