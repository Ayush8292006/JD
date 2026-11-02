import React from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../data/products';
import { ChevronRight } from 'lucide-react';

export default function CategoryGrid({ onSelectCategory, selectedCategory }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="categories" className="py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <span className="text-xs font-bold text-brand-green uppercase tracking-wider bg-brand-green-light px-2.5 py-1 rounded-full">
              Explore Aisles
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-content-primary tracking-tight mt-1.5">
              Shop by Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-content-secondary hidden sm:block">
            Curated daily fresh essentials
          </p>
        </div>

        {/* Categories Grid: 2 cols on mobile, 4 on tablet, 6 on desktop */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4"
        >
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <motion.div
                key={category.id}
                variants={itemVariant}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onSelectCategory(category.id)}
                className={`group cursor-pointer rounded-2xl p-4 bg-gradient-to-b ${category.color} border transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-card-hover ${
                  isSelected
                    ? 'ring-2 ring-brand-green border-brand-green shadow-md'
                    : 'border-stone-200/80 hover:border-stone-300'
                }`}
              >
                {/* Decorative background glow on hover */}
                <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-white/40 blur-xl group-hover:scale-150 transition-transform duration-500" />

                <div className="flex flex-col items-center text-center space-y-2 relative z-10">
                  {/* Category Emoji / Icon */}
                  <motion.div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl sm:text-4xl group-hover:rotate-6 transition-transform duration-300"
                  >
                    {category.icon}
                  </motion.div>

                  {/* Title & Item Count */}
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-content-primary line-clamp-1 group-hover:text-brand-green transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-[10px] text-content-secondary mt-0.5 font-medium">
                      {category.itemCount}
                    </p>
                  </div>

                  {isSelected && (
                    <span className="text-[10px] font-bold text-brand-green bg-white px-2 py-0.5 rounded-full shadow-xs">
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

