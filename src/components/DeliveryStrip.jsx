import React from 'react';
import { motion } from 'framer-motion';
import { Zap, BadgePercent, ShieldCheck, RotateCcw } from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: "10 Min Delivery",
    desc: "From dark store in your area",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: BadgePercent,
    title: "Best Prices",
    desc: "Direct wholesale rates daily",
    color: "text-brand-green",
    bg: "bg-brand-green/10",
  },
  {
    icon: ShieldCheck,
    title: "Fresh Quality",
    desc: "Sourced daily from mandis",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    desc: "Instant doorstep replacement",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

export default function DeliveryStrip() {
  return (
    <section className="bg-surface-off py-4 md:py-6 border-y border-stone-200/60">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Phones: swipeable row of trust badges · Tablet/Laptop: 4-column grid */}
        <div className="flex md:grid md:grid-cols-4 gap-2.5 md:gap-4 lg:gap-6 overflow-x-auto no-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0 snap-x">
          {FEATURES.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-white rounded-2xl border border-stone-200/70 shadow-2xs transition-all min-w-[168px] md:min-w-0 flex-shrink-0 snap-start"
              >
                <div
                  className={`w-8 h-8 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${item.bg}`}
                >
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${item.color}`} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[11px] sm:text-sm font-bold text-content-primary truncate">
                    {item.title}
                  </h4>
                  <p className="text-[9px] sm:text-[11px] text-content-secondary truncate">
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
