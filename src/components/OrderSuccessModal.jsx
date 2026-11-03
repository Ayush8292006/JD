import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Clock,
  Bike,
  MapPin,
  X,
  ArrowRight,
  ShieldCheck,
  Package,
  Check,
  Download
} from 'lucide-react';

export default function OrderSuccessModal({ isOpen, onClose, orderData, onClearCart }) {
  const isMobile = useIsMobile(); // phones: slide-up bottom sheet
  const [timeLeft, setTimeLeft] = useState(580); // ~9:40 mins in seconds
  const [activeStep, setActiveStep] = useState(2); // 1 = Received, 2 = Packing, 3 = On Way, 4 = Delivered

  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F8CB46', '#0C831F', '#FF6B6B', '#4D96FF']
        });
        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#F8CB46', '#0C831F']
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#F8CB46', '#0C831F']
          });
        }, 300);
      } catch (err) {
        console.log(err);
      }

      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const handleFinish = () => {
    onClearCart();
    onClose();
  };

  const STEPS = [
    { title: "Order Confirmed", desc: "Received at Dark Store #14", done: true },
    { title: "Packing Items", desc: "Sealing fresh grocery bags", current: true },
    { title: "Rider Dispatched", desc: "Ramesh on Electric Scooter", done: false },
    { title: "Delivered", desc: "At your doorstep in 10 mins", done: false },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-black/65 backdrop-blur-sm">
        <motion.div
          initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 20 }}
          transition={isMobile ? { type: 'spring', damping: 30, stiffness: 320 } : { duration: 0.2 }}
          className="bg-white rounded-t-3xl md:rounded-3xl relative pb-[env(safe-area-inset-bottom)] md:pb-0 max-w-lg w-full overflow-hidden shadow-2xl border border-stone-100 max-h-[90vh] flex flex-col"
        >
          <div className="md:hidden absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-black/15 z-30" aria-hidden="true" />
          {/* Header Banner */}
          <div className="bg-gradient-to-br from-brand-yellow via-amber-300 to-amber-400 p-6 text-center relative flex-shrink-0">
            <button
              onClick={handleFinish}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-stone-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="w-14 h-14 rounded-full bg-brand-green text-white mx-auto flex items-center justify-center shadow-lg mb-2.5"
            >
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </motion.div>

            <h3 className="text-xl sm:text-2xl font-black text-stone-900">Order Placed Successfully!</h3>
            <p className="text-xs sm:text-sm font-semibold text-stone-800 mt-0.5">
              Order ID: #JD-{Math.floor(100000 + Math.random() * 900000)}
            </p>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto space-y-5">
            {/* Countdown Clock */}
            <div className="bg-brand-green-light rounded-2xl p-4 border border-brand-green/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-brand-green text-white flex items-center justify-center">
                  <Clock className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-brand-green uppercase tracking-wider">
                    Estimated Delivery
                  </p>
                  <p className="text-2xl font-black text-brand-green">
                    {formattedTime} <span className="text-xs font-semibold">mins</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green text-white text-xs font-bold shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  Dark Store Active
                </span>
              </div>
            </div>

            {/* Live 4-Step Packing & Delivery Timeline */}
            <div className="border border-stone-200 rounded-2xl p-4 space-y-3 bg-surface-off">
              <p className="text-xs font-black uppercase tracking-wider text-content-primary">
                Live Fulfillment Progress
              </p>
              <div className="space-y-3 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                {STEPS.map((st, i) => (
                  <div key={st.title} className="relative flex items-start gap-3">
                    <span
                      className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        st.done
                          ? 'bg-brand-green text-white ring-2 ring-emerald-100'
                          : st.current
                          ? 'bg-amber-400 text-stone-900 ring-2 ring-amber-100 animate-pulse'
                          : 'bg-stone-200 text-stone-500'
                      }`}
                    >
                      {st.done ? <Check className="w-3 h-3 stroke-[3]" /> : i + 1}
                    </span>
                    <div>
                      <h5 className={`text-xs font-bold ${st.current ? 'text-brand-green' : 'text-stone-800'}`}>
                        {st.title} {st.current && <span className="text-[10px] text-amber-600 font-semibold">(In progress)</span>}
                      </h5>
                      <p className="text-[10px] text-stone-500">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rider & Store Details */}
            <div className="bg-white rounded-2xl p-3.5 border border-stone-200 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-100 border border-brand-yellow flex items-center justify-center text-xl flex-shrink-0">
                🛵
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-content-primary truncate">Ramesh Kumar</h4>
                  <span className="text-[10px] font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                    ⭐ 4.9 (1,840 trips)
                  </span>
                </div>
                <p className="text-[11px] text-content-secondary mt-0.5">
                  Thermal checked • Vaccinated • Sealed bag delivery
                </p>
              </div>
            </div>

            {/* Order Items Summary */}
            <div className="border border-stone-200 rounded-2xl p-3.5 bg-white">
              <div className="flex justify-between items-center pb-2 border-b border-stone-100 text-xs font-semibold text-content-secondary uppercase tracking-wider">
                <span>Items Ordered ({orderData?.items?.length || 0})</span>
                <span className="text-brand-green font-bold">Total: ₹{orderData?.grandTotal || 0}</span>
              </div>
              <div className="divide-y divide-stone-100 max-h-36 overflow-y-auto mt-1">
                {orderData?.items?.map((item) => (
                  <div key={item.id} className="py-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span>{item.emoji}</span>
                      <span className="font-semibold text-content-primary truncate max-w-[200px]">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-stone-600 font-bold">
                      {item.quantity} × ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Location */}
            <div className="flex items-start gap-2.5 text-xs text-content-secondary bg-stone-50 p-3 rounded-xl border border-stone-200/60">
              <MapPin className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-content-primary">Delivering to: </span>
                {orderData?.address || "Your saved home address"}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-stone-100 bg-surface-off flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleFinish}
              className="flex-1 bg-brand-green hover:bg-brand-green-hover text-white font-bold py-3.5 rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm"
            >
              <span>Back to Store</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
