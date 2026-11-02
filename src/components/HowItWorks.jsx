import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBasket, PackageCheck, Bike, Sparkles } from 'lucide-react';

const STEPS = [
  {
    step: "01",
    title: "Choose Groceries",
    desc: "Browse 10,000+ daily essentials, farm veggies, milk, snacks & personal care items.",
    icon: ShoppingBasket,
    badge: "5,000+ Brands",
    color: "bg-amber-100 text-amber-700",
  },
  {
    step: "02",
    title: "Instant 2-Min Packing",
    desc: "Our dark store picker packs your items in sealed hygienic bags within 120 seconds.",
    icon: PackageCheck,
    badge: "Hygienic Seals",
    color: "bg-blue-100 text-blue-700",
  },
  {
    step: "03",
    title: "10-Min Doorstep Drop",
    desc: "Our trained local rider delivers with live GPS tracking right to your doorstep.",
    icon: Bike,
    badge: "Lightning Fast",
    color: "bg-emerald-100 text-brand-green",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-12 sm:py-16 bg-surface-off border-y border-stone-200/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold text-brand-green uppercase tracking-wider bg-brand-green-light px-3 py-1 rounded-full">
            Lightning Fast Engine
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-content-primary tracking-tight mt-2">
            How JD Bazar Delivers in 10 Minutes
          </h2>
          <p className="text-xs sm:text-sm font-normal text-content-secondary mt-2">
            Powered by micro-warehouses (dark stores) within 2 km of your location.
          </p>
        </div>

        {/* 3 Steps with Connecting Line */}
        <div className="relative">
          {/* Animated Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-20 right-20 -translate-y-6 h-1 bg-stone-200 z-0">
            <motion.div
              className="h-full bg-brand-green"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {STEPS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col items-center text-center group"
                >
                  {/* Step Number & Icon */}
                  <div className="relative mb-5">
                    <div
                      className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-stone-900 text-white font-black text-xs flex items-center justify-center shadow-md">
                      {item.step}
                    </span>
                  </div>

                  {/* Badge */}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-surface-off px-2.5 py-1 rounded-full mb-2">
                    {item.badge}
                  </span>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-content-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-content-secondary font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

