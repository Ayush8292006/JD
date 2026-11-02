import React from 'react';
import { motion } from 'framer-motion';
import { Zap, BadgePercent, ShieldCheck, RotateCcw } from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: "10 Min Delivery",
    desc: "From local dark store in your neighborhood",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: BadgePercent,
    title: "Best Prices & Offers",
    desc: "Direct wholesale rates & cashbacks daily",
    color: "text-brand-green",
    bg: "bg-brand-green/10",
  },
  {
    icon: ShieldCheck,
    title: "Fresh Quality",
    desc: "Sourced daily from certified local mandies",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    desc: "Instant doorstep replacement, no questions asked",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

export default function DeliveryStrip() {
  return (
    <section className="bg-surface-off py-6 border-y border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {FEATURES.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-stone-200/70 shadow-sm transition-all"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${item.bg}`}
                >
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-content-primary truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-content-secondary truncate">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

