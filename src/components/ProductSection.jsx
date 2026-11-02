import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductSection({
  title,
  subtitle,
  icon,
  products,
  cart,
  onAddToCart,
  onIncrement,
  onDecrement,
  onQuickView,
  sectionId
}) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id={sectionId} className="py-5 sm:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Heading & Controls */}
        <div className="flex items-end justify-between mb-3 sm:mb-5">
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {icon && <span className="text-lg sm:text-2xl">{icon}</span>}
              <h2 className="text-base sm:text-xl md:text-2xl font-black text-content-primary tracking-tight">
                {title}
              </h2>
            </div>
            {subtitle && (
              <p className="text-[11px] sm:text-xs font-semibold text-content-secondary mt-0.5 line-clamp-1">
                {subtitle}
              </p>
            )}
          </div>

          {/* Left/Right Scroll Arrow Buttons */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-stone-200 hover:border-stone-400 bg-white hover:bg-stone-50 flex items-center justify-center text-stone-600 transition-all shadow-2xs"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-stone-200 hover:border-stone-400 bg-white hover:bg-stone-50 flex items-center justify-center text-stone-600 transition-all shadow-2xs"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Row */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar pb-2.5 pt-0.5 -mx-3 px-3 sm:mx-0 sm:px-0"
        >
          {products.map((product) => {
            const quantity = cart[product.id]?.quantity || 0;
            return (
              <ProductCard
                key={product.id}
                product={product}
                quantity={quantity}
                onAdd={onAddToCart}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onQuickView={onQuickView}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
