import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  ChevronDown,
  ShoppingCart,
  User,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Logo from './Logo';
import { POPULAR_SEARCH_TERMS, PRODUCTS } from '../data/products';

export default function Header({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenLocation,
  onOpenLogin,
  user,
  location,
  onSelectProduct,
  children
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Scroll detection for sticky header blur & shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rotating search bar placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % POPULAR_SEARCH_TERMS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  // Filter products based on live search query
  const searchResults = searchQuery.trim() === ''
    ? []
    : PRODUCTS.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.hindi && item.hindi.includes(searchQuery))
      ).slice(0, 6);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-gradient-to-b from-[#FFF1C2] via-[#FFF8E1] to-white md:bg-none md:bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* ===== MOBILE APP BAR (phones only): collapses on scroll, search stays pinned ===== */}
        <div
          className={`md:hidden grid transition-all duration-300 ease-out ${
            isScrolled ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex items-center justify-between gap-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-1">
              <button onClick={onOpenLocation} className="min-w-0 text-left active:opacity-70">
                <p className="text-[10px] font-black uppercase tracking-wider text-stone-600 leading-none">
                  JD Bazar in
                </p>
                <p className="text-[22px] font-black text-content-primary leading-tight tracking-tight">
                  {(location?.time || '10 mins').replace(/mins?\b/i, 'minutes')}
                </p>
                <p className="flex items-center gap-1 text-xs font-semibold text-stone-700 min-w-0">
                  <MapPin className="w-3.5 h-3.5 text-brand-green flex-shrink-0" />
                  <span className="truncate max-w-[230px]">{location?.name || 'Connaught Place, New Delhi'}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500 flex-shrink-0" />
                </p>
              </button>

              <button
                onClick={onOpenLogin}
                className="w-10 h-10 rounded-full bg-white border border-stone-200 shadow-2xs flex items-center justify-center flex-shrink-0 overflow-hidden active:scale-95 transition-transform"
                aria-label={user ? 'Your account' : 'Login'}
              >
                {user ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5 text-stone-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ===== DESKTOP / TABLET TOP ROW: Brand, Location, Search & Actions ===== */}
        <div
          className={`hidden md:flex items-center justify-between gap-4 lg:gap-6 transition-all duration-300 ${
            isScrolled ? 'py-2.5' : 'py-3.5'
          }`}
        >
          {/* Brand Logo & Location */}
          <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0 min-w-0">
            <a href="#" className="flex-shrink-0" aria-label="JD Bazar Home">
              <Logo size="default" showTagline={false} />
            </a>

            {/* Delivery Location Selector - Desktop */}
            <button
              onClick={onOpenLocation}
              className="hidden md:flex flex-col text-left group hover:opacity-90 transition-opacity"
            >
              <span className="text-[11px] font-black tracking-tight text-content-primary flex items-center gap-1 uppercase">
                ⚡ Delivery in {location?.time || "10 MINS"}
              </span>
              <span className="text-xs font-semibold text-content-secondary flex items-center gap-1 truncate max-w-[190px] lg:max-w-[240px] group-hover:text-brand-green transition-colors">
                <MapPin className="w-3.5 h-3.5 text-brand-green flex-shrink-0" />
                <span className="truncate">{location?.name || "Connaught Place, New Delhi"}</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-brand-green transition-transform group-hover:translate-y-0.5" />
              </span>
            </button>

          </div>

          {/* Search Bar - Desktop Only (on mobile it sits in dedicated full-width Row 2) */}
          <div className="flex-1 max-w-2xl relative min-w-0">
            <div
              className={`flex items-center bg-surface-off rounded-2xl border transition-all duration-200 px-3.5 py-2.5 ${
                isSearchFocused
                  ? 'border-brand-green ring-2 ring-brand-green/20 bg-white shadow-sm'
                  : 'border-stone-200/90 hover:border-stone-300'
              }`}
            >
              <Search className={`w-4 h-4 mr-2.5 flex-shrink-0 transition-colors ${
                isSearchFocused ? 'text-brand-green' : 'text-stone-400'
              }`} />

              <div className="relative flex-1 overflow-hidden">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  className="w-full bg-transparent text-sm font-medium text-content-primary focus:outline-none placeholder:text-transparent"
                  placeholder="Search grocery..."
                />

                {/* Animated Rotating Placeholder */}
                {searchQuery === '' && (
                  <div className="absolute inset-0 pointer-events-none flex items-center">
                    <span className="text-sm text-content-secondary select-none">
                      Search "
                    </span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={placeholderIndex}
                        initial={{ y: 14, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -14, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="text-sm font-semibold text-stone-700 select-none inline-block ml-0.5"
                      >
                        {POPULAR_SEARCH_TERMS[placeholderIndex]}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-sm text-content-secondary select-none">
                      "
                    </span>
                  </div>
                )}
              </div>

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-stone-400 hover:text-stone-600 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Live Search Auto-Suggest Dropdown */}
            <AnimatePresence>
              {isSearchFocused && searchQuery.trim() !== '' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden z-50 divide-y divide-stone-100"
                >
                  {searchResults.length > 0 ? (
                    <div>
                      <div className="p-2.5 bg-stone-50 text-[11px] font-bold uppercase tracking-wider text-content-secondary flex items-center justify-between">
                        <span>Matching Groceries ({searchResults.length})</span>
                        <span className="text-brand-green">10-Min Fast Delivery</span>
                      </div>
                      {searchResults.map((item) => (
                        <div
                          key={item.id}
                          onMouseDown={() => {
                            onSelectProduct(item);
                            setSearchQuery('');
                          }}
                          className="flex items-center justify-between p-3 hover:bg-brand-green-light/40 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{item.emoji}</span>
                            <div>
                              <p className="text-sm font-semibold text-content-primary">
                                {item.name}
                              </p>
                              <p className="text-xs text-content-secondary">
                                {item.weight} • <span className="text-brand-green font-bold">₹{item.price}</span>
                                <span className="line-through text-stone-400 ml-1.5 text-[11px]">₹{item.mrp}</span>
                              </p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-brand-green bg-brand-green-light px-2.5 py-1 rounded-full">
                            View & Add
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-xs text-content-secondary">
                      No matching groceries found for "{searchQuery}".
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Action Buttons: Login & Cart */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Login / Profile Button */}
            {user ? (
              <div
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:px-3 sm:py-2 rounded-2xl border border-stone-200 bg-surface-off hover:bg-stone-100 cursor-pointer transition-all"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-brand-green"
                />
                <span className="hidden sm:inline text-xs font-bold text-content-primary max-w-[80px] truncate">
                  {user.name.split(' ')[0]}
                </span>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 text-xs font-bold text-content-primary hover:text-brand-green px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-2xl hover:bg-surface-off transition-all border border-stone-200 sm:border-transparent"
                aria-label="Login"
              >
                <User className="w-4 h-4 text-stone-600" />
                <span className="hidden xs:inline">Login</span>
              </button>
            )}

            {/* Cart Button with Live Badge & Count */}
            <motion.button
              onClick={onOpenCart}
              whileTap={{ scale: 0.94 }}
              className="relative flex items-center gap-2 sm:gap-2.5 bg-brand-green hover:bg-brand-green-hover text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-bold text-xs sm:text-sm shadow-sm transition-all"
              aria-label="Open Cart"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />

              <div className="flex flex-col text-left">
                {cartCount > 0 ? (
                  <>
                    <span className="text-[11px] sm:text-xs font-black leading-none">
                      {cartCount} {cartCount === 1 ? 'item' : 'items'}
                    </span>
                    <span className="text-[10px] sm:text-xs font-medium text-emerald-100 leading-tight">
                      ₹{cartTotal}
                    </span>
                  </>
                ) : (
                  <span className="text-xs sm:text-sm font-bold">Cart</span>
                )}
              </div>

              {/* Animated Live Item Count Badge */}
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    className="absolute -top-1.5 -right-1.5 bg-brand-yellow text-stone-900 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* ===== ROW 2: Mobile Search Bar (Full Width like Blinkit / Zepto App) ===== */}
        <div className={`block md:hidden relative pb-2.5 ${isScrolled ? 'pt-[max(0.625rem,env(safe-area-inset-top))]' : 'pt-2'}`}>
          <div
            className={`flex items-center bg-white rounded-xl border transition-all duration-200 px-3.5 py-3 shadow-2xs ${
              isSearchFocused
                ? 'border-brand-green ring-2 ring-brand-green/20 shadow-xs'
                : 'border-stone-200'
            }`}
          >
            <Search className={`w-4 h-4 mr-2.5 flex-shrink-0 transition-colors ${
              isSearchFocused ? 'text-brand-green' : 'text-stone-400'
            }`} />

            <div className="relative flex-1 overflow-hidden">
              <input
                id="mobile-search-input"
                type="search"
                enterKeyHint="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full bg-transparent text-base leading-5 font-medium text-content-primary focus:outline-none placeholder:text-transparent [&::-webkit-search-cancel-button]:hidden"
                placeholder="Search grocery..."
              />

              {/* Animated Rotating Placeholder */}
              {searchQuery === '' && (
                <div className="absolute inset-0 pointer-events-none flex items-center">
                  <span className="text-sm text-content-secondary select-none">
                    Search "
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={placeholderIndex}
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -12, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="text-sm font-bold text-stone-700 select-none inline-block ml-0.5"
                    >
                      {POPULAR_SEARCH_TERMS[placeholderIndex]}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-sm text-content-secondary select-none">
                    "
                  </span>
                </div>
              )}
            </div>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 text-stone-400 hover:text-stone-600 rounded-full"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile Auto-suggest results */}
          <AnimatePresence>
            {isSearchFocused && searchQuery.trim() !== '' && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden z-50 divide-y divide-stone-100 max-h-72 overflow-y-auto"
              >
                {searchResults.length > 0 ? (
                  <div>
                    {searchResults.map((item) => (
                      <div
                        key={item.id}
                        onMouseDown={() => {
                          onSelectProduct(item);
                          setSearchQuery('');
                        }}
                        className="flex items-center justify-between p-2.5 hover:bg-brand-green-light/40 cursor-pointer active:bg-brand-green-light"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{item.emoji}</span>
                          <div>
                            <p className="text-xs font-bold text-content-primary">
                              {item.name}
                            </p>
                            <p className="text-[10px] text-content-secondary">
                              {item.weight} • <span className="text-brand-green font-bold">₹{item.price}</span>
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-brand-green bg-brand-green-light px-2 py-0.5 rounded-full">
                          + ADD
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-content-secondary">
                    No results for "{searchQuery}".
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Category chips strip lives inside the sticky header so it never mis-aligns */}
      {children}
    </header>
  );
}
