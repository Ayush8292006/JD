import React from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../data/products';

export default function CategoryGrid({ onSelectCategory, selectedCategory }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="categories" className="pt-2 pb-4 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-3 md:mb-6">
          <div>
            <span className="hidden md:inline-block text-xs font-bold text-brand-green uppercase tracking-wider bg-brand-green-light px-2.5 py-1 rounded-full">
              Explore Aisles
            </span>
            <h2 className="text-base md:text-3xl font-black text-content-primary tracking-tight md:mt-1.5">
              Shop by Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-content-secondary hidden sm:block">
            Curated daily fresh essentials
          </p>
        </div>

        {/* Categories Grid: 4 compact icon tiles on phones (app style), 4 on tablet, 6 on laptop */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-4 sm:grid-cols-6 gap-x-2 gap-y-3 md:gap-4"
        >
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <motion.div
                key={category.id}
                variants={itemVariant}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectCategory(category.id)}
                className="group cursor-pointer relative"
              >
                {/* Phone: app-style tile (icon card + label underneath) */}
                <div className="md:hidden flex flex-col items-center text-center gap-1.5">
                  <div
                    className={`w-full aspect-square rounded-2xl bg-gradient-to-b ${category.color} border flex items-center justify-center text-[34px] ${
                      isSelected ? 'border-brand-green ring-2 ring-brand-green/40' : 'border-stone-200/60'
                    }`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-[11px] font-bold text-content-primary leading-tight line-clamp-2">
                    {category.name}
                  </h3>
                </div>

                {/* Tablet / Laptop: website card */}
                <div
                  className={`hidden md:block rounded-2xl p-4 bg-gradient-to-b ${category.color} border transition-all duration-200 relative overflow-hidden shadow-2xs hover:shadow-card ${
                    isSelected
                      ? 'ring-2 ring-brand-green border-brand-green shadow-xs'
                      : 'border-stone-200/70 hover:border-stone-300'
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-2 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-2xs flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-200">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-xs lg:text-sm font-bold text-content-primary line-clamp-1 group-hover:text-brand-green transition-colors leading-tight">
                        {category.name.split('&')[0].trim()}
                      </h3>
                      <p className="text-[10px] text-content-secondary mt-0.5 font-medium">
                        {category.itemCount}
                      </p>
                    </div>
                    {isSelected && (
                      <span className="text-[9px] font-bold text-brand-green bg-white px-1.5 py-0.5 rounded-full shadow-2xs">
                        Active
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
