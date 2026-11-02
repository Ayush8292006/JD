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
    <section id="categories" className="py-7 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-4 sm:mb-6">
          <div>
            <span className="text-[10px] sm:text-xs font-bold text-brand-green uppercase tracking-wider bg-brand-green-light px-2.5 py-0.5 sm:py-1 rounded-full">
              Explore Aisles
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-content-primary tracking-tight mt-1 sm:mt-1.5">
              Shop by Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-content-secondary hidden sm:block">
            Curated daily fresh essentials
          </p>
        </div>

        {/* Categories Grid: 3 cols on mobile (Blinkit/Zepto app style), 4 on tablet, 6 on desktop */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 sm:gap-4"
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
                className={`group cursor-pointer rounded-2xl p-2.5 sm:p-4 bg-gradient-to-b ${category.color} border transition-all duration-200 relative overflow-hidden shadow-2xs hover:shadow-card ${
                  isSelected
                    ? 'ring-2 ring-brand-green border-brand-green shadow-xs'
                    : 'border-stone-200/70 hover:border-stone-300'
                }`}
              >
                <div className="flex flex-col items-center text-center space-y-1.5 sm:space-y-2 relative z-10">
                  {/* Category Emoji / Icon */}
                  <div
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white shadow-2xs flex items-center justify-center text-2xl sm:text-4xl group-hover:scale-105 transition-transform duration-200"
                  >
                    {category.icon}
                  </div>

                  {/* Title & Item Count */}
                  <div>
                    <h3 className="text-[11px] sm:text-xs md:text-sm font-bold text-content-primary line-clamp-1 group-hover:text-brand-green transition-colors leading-tight">
                      {category.name.split('&')[0].trim()}
                    </h3>
                    <p className="text-[9px] sm:text-[10px] text-content-secondary mt-0.5 font-medium hidden xs:block">
                      {category.itemCount}
                    </p>
                  </div>

                  {isSelected && (
                    <span className="text-[9px] font-bold text-brand-green bg-white px-1.5 py-0.5 rounded-full shadow-2xs">
                      Active
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
