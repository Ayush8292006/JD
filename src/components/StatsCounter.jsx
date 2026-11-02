import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, ShoppingBag, MapPin, Zap } from 'lucide-react';

function CounterItem({ end, suffix = '', label, icon: Icon, delay = 0 }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const duration = 1800; // ms
    const incrementTime = 30;
    const step = Math.ceil(end / (duration / incrementTime));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [hasStarted, end]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => setHasStarted(true)}
      transition={{ duration: 0.5, delay }}
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-stone-200/80 shadow-card flex flex-col items-center text-center group hover:border-brand-green/40 transition-colors"
    >
      <div className="w-12 h-12 rounded-2xl bg-brand-yellow/30 text-stone-900 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6 text-brand-green" />
      </div>

      <div className="text-3xl sm:text-4xl font-black text-content-primary tracking-tight">
        {count.toLocaleString()}
        <span className="text-brand-green">{suffix}</span>
      </div>

      <p className="text-xs sm:text-sm font-semibold text-content-secondary mt-1">
        {label}
      </p>
    </motion.div>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-brand-yellow/10 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <CounterItem
            end={500000}
            suffix="+"
            label="Happy Customers in India"
            icon={Users}
            delay={0.1}
          />
          <CounterItem
            end={10000}
            suffix="+"
            label="Grocery Items in Stock"
            icon={ShoppingBag}
            delay={0.2}
          />
          <CounterItem
            end={85}
            suffix="+"
            label="Active Dark Stores"
            icon={MapPin}
            delay={0.3}
          />
          <CounterItem
            end={9}
            suffix=".4 Mins"
            label="Average Delivery Time"
            icon={Zap}
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}

