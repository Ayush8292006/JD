import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';
import { X, Smartphone, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Logo from './Logo';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const isMobile = useIsMobile(); // phones: slide-up bottom sheet
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['5', '8', '2', '4']);
  const [step, setStep] = useState(1); // 1 = Phone, 2 = OTP
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 600);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        name: "Rahul Verma",
        phone: `+91 ${phone}`,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
      });
      onClose();
      setStep(1);
    }, 700);
  };

  return (
    <AnimatePresence>
      <div onClick={(e) => e.target === e.currentTarget && onClose()} className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 20 }}
          transition={isMobile ? { type: 'spring', damping: 30, stiffness: 320 } : { duration: 0.2 }}
          className="bg-white rounded-t-3xl md:rounded-3xl relative max-h-[92vh] overflow-y-auto pb-[env(safe-area-inset-bottom)] md:pb-0 max-w-sm w-full shadow-2xl border border-stone-100"
        >
          <div className="md:hidden absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-black/15 z-30" aria-hidden="true" />
          {/* Top Decorative Banner */}
          <div className="bg-brand-yellow/30 p-6 pb-5 flex flex-col items-center text-center relative">
            <button
              onClick={onClose}
              className="absolute right-3.5 top-3.5 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-content-secondary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <Logo size="default" />
            <p className="text-xs font-semibold text-stone-700 mt-2">
              India's last minute grocery app
            </p>
          </div>

          <div className="p-6">
            {step === 1 ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-content-primary">Log in or Sign up</h4>
                  <p className="text-xs text-content-secondary mt-1">
                    Enter your 10-digit mobile number to receive an instant verification OTP
                  </p>
                </div>

                <div className="flex items-center gap-2 border-2 border-stone-200 rounded-2xl p-2.5 focus-within:border-brand-green transition-all bg-surface-off">
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg border border-stone-200 text-xs font-bold text-stone-700">
                    <span>🇮🇳</span> +91
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="Enter mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-transparent text-sm font-semibold text-content-primary focus:outline-none"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={phone.length !== 10 || loading}
                  className="w-full bg-brand-green hover:bg-brand-green-hover disabled:bg-stone-300 text-white font-bold py-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 text-sm"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-content-secondary text-center pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
                  <span>Your number is safe. We never spam.</span>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-content-primary">Verify OTP</h4>
                  <p className="text-xs text-content-secondary mt-1">
                    We sent a 4-digit code to <span className="font-semibold text-content-primary">+91 {phone}</span>
                  </p>
                </div>

                {/* 4-digit OTP Boxes */}
                <div className="flex justify-center gap-3 py-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const newOtp = [...otp];
                        newOtp[idx] = e.target.value;
                        setOtp(newOtp);
                      }}
                      className="w-12 h-14 rounded-xl border-2 border-brand-green text-center font-bold text-xl text-content-primary bg-surface-off focus:outline-none"
                    />
                  ))}
                </div>

                <p className="text-center text-xs text-brand-green font-medium">
                  Auto-filled demo OTP for instant login
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-green hover:bg-brand-green-hover text-white font-bold py-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 text-sm"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Verify & Proceed</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-semibold text-stone-500 hover:text-stone-800"
                  >
                    Edit mobile number
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

