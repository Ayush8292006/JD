import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, LayoutGrid, Search, ShoppingBag, User } from 'lucide-react';

// App-style bottom tab bar — phones only (hidden from md / tablet upwards)
export default function MobileBottomNav({ activeTab, onTabChange, cartCount, user }) {
  const TABS = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'categories', label: 'Categories', icon: LayoutGrid },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'cart', label: 'Basket', icon: ShoppingBag, badge: cartCount },
    { id: 'account', label: user ? user.name.split(' ')[0] : 'Account', icon: User, avatar: user?.avatar },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]"
      aria-label="App navigation"
    >
      <ul className="grid grid-cols-5 h-[60px]">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <li key={tab.id} className="relative">
              <button
                onClick={() => onTabChange(tab.id)}
                className={`w-full h-full flex flex-col items-center justify-center gap-0.5 transition-colors active:scale-95 ${
                  isActive ? 'text-brand-green' : 'text-stone-500'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-indicator"
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-b-full bg-brand-green"
                  />
                )}

                <span className="relative">
                  {tab.avatar ? (
                    <img
                      src={tab.avatar}
                      alt=""
                      className={`w-6 h-6 rounded-full object-cover border-2 ${isActive ? 'border-brand-green' : 'border-stone-200'}`}
                    />
                  ) : (
                    <Icon className={`w-[22px] h-[22px] ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                  )}

                  <AnimatePresence>
                    {tab.badge > 0 && (
                      <motion.span
                        key={tab.badge}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                        className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-brand-yellow text-stone-900 text-[10px] font-black flex items-center justify-center border-2 border-white"
                      >
                        {tab.badge}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>

                <span className={`text-[10px] leading-none truncate max-w-[64px] ${isActive ? 'font-black' : 'font-semibold'}`}>
                  {tab.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
