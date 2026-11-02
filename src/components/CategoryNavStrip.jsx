import React from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../data/products';
import { Sparkles, SlidersHorizontal, Check } from 'lucide-react';

export default function CategoryNavStrip({
  selectedCategory,
  onSelectCategory,
  activeFilter,
  onSelectFilter
}) {
  const FILTERS = [
    { id: "all", label: "All Items" },
    { id: "fast", label: "⚡ 8 Mins" },
    { id: "discount", label: "🏷️ 20%+ OFF" },
    { id: "bestseller", label: "🔥 Top Sellers" },
    { id: "fresh", label: "🌿 Farm Fresh" }
  ];

  return (
    <div className="sticky top-[61px] sm:top-[69px] z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-2xs py-2.5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Category Chips Scroll Row */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => onSelectCategory(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                selectedCategory === null
                  ? 'bg-brand-green text-white border-brand-green shadow-xs'
                  : 'bg-surface-off text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-100'
              }`}
            >
              <span>🛍️</span>
              <span>All Aisles</span>
            </button>

            {CATEGORIES.slice(0, 8).map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-brand-green text-white border-brand-green shadow-xs'
                      : 'bg-surface-off text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name.split('&')[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Filter Pill Group */}
          <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0 border-l border-stone-200 pl-4">
            {FILTERS.map((f) => {
              const isActive = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => onSelectFilter(f.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border ${
                    isActive
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

