import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-x-0 bottom-[calc(140px+env(safe-area-inset-bottom))] md:bottom-6 z-50 flex justify-center px-3 pointer-events-none">
      <motion.div
        key={toast.id}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="pointer-events-auto flex items-center gap-3 bg-stone-900 text-white px-4 md:px-5 py-2.5 md:py-3 rounded-2xl shadow-floating border border-stone-800 w-full max-w-sm md:w-auto"
      >
        <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0">
          {toast.type === 'cart' ? (
            <ShoppingBag className="w-4 h-4 text-white" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-white" />
          )}
        </div>

        <div className="flex flex-col pr-2">
          <p className="text-sm font-semibold">{toast.title}</p>
          {toast.message && (
            <p className="text-xs text-stone-300">{toast.message}</p>
          )}
        </div>

        <button
          onClick={onClose}
          className="text-stone-400 hover:text-white p-1 rounded-full transition-colors ml-auto"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
      </div>
    </AnimatePresence>
  );
}

