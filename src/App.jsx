import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import DeliveryStrip from './components/DeliveryStrip';
import CategoryNavStrip from './components/CategoryNavStrip';
import CategoryGrid from './components/CategoryGrid';
import PromoCarousel from './components/PromoCarousel';
import ProductSection from './components/ProductSection';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import HowItWorks from './components/HowItWorks';
import StatsCounter from './components/StatsCounter';
import AppDownloadAndTestimonials from './components/AppDownloadAndTestimonials';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import LocationModal from './components/LocationModal';
import LoginModal from './components/LoginModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import Toast from './components/Toast';
import ScrollProgress from './components/ScrollProgress';
import { PRODUCTS } from './data/products';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [lastOrderData, setLastOrderData] = useState(null);
  const [toast, setToast] = useState(null);

  // Quick View PDP State
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // User state
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('jd_bazar_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Location state
  const [location, setLocation] = useState(() => {
    try {
      const saved = localStorage.getItem('jd_bazar_location');
      return saved ? JSON.parse(saved) : {
        name: "Connaught Place, New Delhi",
        sub: "Near Rajiv Chowk Metro, Delhi - 110001",
        time: "8 mins"
      };
    } catch {
      return {
        name: "Connaught Place, New Delhi",
        sub: "Near Rajiv Chowk Metro, Delhi - 110001",
        time: "8 mins"
      };
    }
  });

  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('jd_bazar_cart');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Applied Coupon code
  const [appliedCoupon, setAppliedCoupon] = useState('JDFIRST');

  // Filter or Category selection state
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('jd_bazar_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('jd_bazar_user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    if (location) {
      localStorage.setItem('jd_bazar_location', JSON.stringify(location));
    }
  }, [location]);

  // Toast trigger helper
  const showToast = (title, message, type = 'general') => {
    const id = Date.now();
    setToast({ id, title, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3000);
  };

  // Cart calculations
  const cartItems = Object.values(cart);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Cart handlers
  const handleAddToCart = (product) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: {
        ...product,
        quantity: (prev[product.id]?.quantity || 0) + 1,
      },
    }));
    showToast(
      `Added to Cart!`,
      `${product.name} (₹${product.price})`,
      'cart'
    );
  };

  const handleIncrement = (productId) => {
    setCart((prev) => {
      const current = prev[productId];
      if (!current) return prev;
      return {
        ...prev,
        [productId]: {
          ...current,
          quantity: current.quantity + 1,
        },
      };
    });
  };

  const handleDecrement = (productId) => {
    setCart((prev) => {
      const current = prev[productId];
      if (!current) return prev;
      if (current.quantity <= 1) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return {
        ...prev,
        [productId]: {
          ...current,
          quantity: current.quantity - 1,
        },
      };
    });
  };

  const handleRemove = (productId) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  const handleCheckout = (orderSummary) => {
    setIsCartOpen(false);
    setLastOrderData({
      ...orderSummary,
      address: location?.name || "Connaught Place, New Delhi"
    });
    setIsOrderSuccessOpen(true);
  };

  const handleOpenQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  // Smooth scroll to product category
  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    if (!categoryId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(`section-${categoryId}`);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      const prodElem = document.getElementById('all-products');
      if (prodElem) {
        prodElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Select product from search dropdown
  const handleSelectProduct = (product) => {
    handleAddToCart(product);
    setIsCartOpen(true);
  };

  // Filter products helper
  const filterList = (items) => {
    if (activeFilter === 'fast') {
      return items.filter(p => p.deliveryTime?.includes('7') || p.deliveryTime?.includes('8'));
    }
    if (activeFilter === 'discount') {
      return items.filter(p => p.discount && (p.discount.includes('2') || p.discount.includes('3') || p.discount.includes('4')));
    }
    if (activeFilter === 'bestseller') {
      return items.filter(p => p.tag?.toLowerCase().includes('seller') || p.tag?.toLowerCase().includes('popular') || p.rating >= 4.8);
    }
    if (activeFilter === 'fresh') {
      return items.filter(p => p.category === 'fruits-veg' || p.category === 'dairy-bread');
    }
    return items;
  };

  // Group products for sections
  const bestSellers = useMemo(() => filterList(PRODUCTS.slice(0, 8)), [activeFilter]);
  const fruitsAndVeg = useMemo(() => filterList(PRODUCTS.filter((p) => p.category === 'fruits-veg')), [activeFilter]);
  const dairyAndBread = useMemo(() => filterList(PRODUCTS.filter((p) => p.category === 'dairy-bread')), [activeFilter]);
  const attaRice = useMemo(() => filterList(PRODUCTS.filter((p) => p.category === 'atta-rice')), [activeFilter]);
  const snacksAndMunchies = useMemo(() => filterList(PRODUCTS.filter((p) => p.category === 'snacks-munchies' || p.category === 'sweets-chocolates')), [activeFilter]);
  const instantAndDrinks = useMemo(() => filterList(PRODUCTS.filter((p) => p.category === 'instant-food' || p.category === 'cold-drinks' || p.category === 'tea-coffee')), [activeFilter]);
  const cleaningAndCare = useMemo(() => filterList(PRODUCTS.filter((p) => p.category === 'cleaning' || p.category === 'personal-care' || p.category === 'baby-care')), [activeFilter]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-content-primary selection:bg-brand-yellow">
      {/* Top scroll progress indicator */}
      <ScrollProgress />

      {/* Splash Screen Intro on initial load */}
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onFinish={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* Global Toast notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Header */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLocation={() => setIsLocationOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        user={user}
        location={location}
        onSelectProduct={handleSelectProduct}
      />

      {/* Sticky Category Sub-Navigation Strip with Quick Filters */}
      <CategoryNavStrip
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        activeFilter={activeFilter}
        onSelectFilter={(fil) => setActiveFilter(fil)}
      />

      {/* Main Content Sections */}
      <main className={`flex-1 ${cartCount > 0 ? 'pb-24 sm:pb-0' : ''}`}>
        {/* Section 2: Clean Professional Hero (No Bouncing Floating Items) */}
        <Hero
          onShopNow={() => handleSelectCategory('fruits-veg')}
          onSelectCategory={handleSelectCategory}
          onAddToCart={handleAddToCart}
        />

        {/* Section 3: Delivery Strip */}
        <DeliveryStrip />

        {/* Section 4: Shop by Category */}
        <CategoryGrid
          onSelectCategory={handleSelectCategory}
          selectedCategory={selectedCategory}
        />

        {/* Section 5: Promo Banners Carousel */}
        <PromoCarousel
          onApplyCoupon={(code) => {
            setAppliedCoupon(code);
            showToast("Coupon Applied!", `Code '${code}' is active on checkout`, 'general');
          }}
        />

        {/* Section 6: Product Rows */}
        <div id="all-products" className="divide-y divide-stone-100">
          <ProductSection
            sectionId="section-bestsellers"
            title="Best Sellers in 10 Minutes"
            subtitle="Most ordered groceries in your locality right now"
            icon="🔥"
            products={bestSellers}
            cart={cart}
            onAddToCart={handleAddToCart}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onQuickView={handleOpenQuickView}
          />

          <ProductSection
            sectionId="section-fruits-veg"
            title="Fresh Fruits & Vegetables"
            subtitle="Direct from local mandis every morning at 5 AM"
            icon="🥬"
            products={fruitsAndVeg}
            cart={cart}
            onAddToCart={handleAddToCart}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onQuickView={handleOpenQuickView}
          />

          <ProductSection
            sectionId="section-dairy-bread"
            title="Dairy, Bread & Eggs"
            subtitle="Fresh Amul milk, malai paneer, curd, and bakery fresh bread"
            icon="🥛"
            products={dairyAndBread}
            cart={cart}
            onAddToCart={handleAddToCart}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onQuickView={handleOpenQuickView}
          />

          <ProductSection
            sectionId="section-atta-rice"
            title="Atta, Rice, Dal & Cooking Oil"
            subtitle="Wholesale prices on Chakki Atta, Basmati Rice & Desi Ghee"
            icon="🌾"
            products={attaRice}
            cart={cart}
            onAddToCart={handleAddToCart}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onQuickView={handleOpenQuickView}
          />

          <ProductSection
            sectionId="section-snacks-munchies"
            title="Snacks, Munchies & Chocolates"
            subtitle="Late night chips, Haldiram namkeen & sweet cravings"
            icon="🍟"
            products={snacksAndMunchies}
            cart={cart}
            onAddToCart={handleAddToCart}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onQuickView={handleOpenQuickView}
          />

          <ProductSection
            sectionId="section-instant-food"
            title="Instant Food, Cold Drinks & Tea"
            subtitle="Chilled Coca-Cola, 2-minute Maggi noodles, and Tata Tea Gold"
            icon="🥤"
            products={instantAndDrinks}
            cart={cart}
            onAddToCart={handleAddToCart}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onQuickView={handleOpenQuickView}
          />

          <ProductSection
            sectionId="section-cleaning"
            title="Cleaning, Household & Baby Care"
            subtitle="Detergents, germ handwash, floor cleaners and diaper pants"
            icon="🧼"
            products={cleaningAndCare}
            cart={cart}
            onAddToCart={handleAddToCart}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onQuickView={handleOpenQuickView}
          />
        </div>

        {/* Section 8: How It Works */}
        <HowItWorks />

        {/* Section 9: Stats Counters */}
        <StatsCounter />

        {/* Section 10: App Download & Customer Testimonials */}
        <AppDownloadAndTestimonials />
      </main>

      {/* Section 11: Footer */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* Clean Docked Bottom Cart Bar for Mobile when Cart has items */}
      <AnimatePresence>
        {cartCount > 0 && !isCartOpen && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-xl sm:hidden"
          >
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full bg-brand-green text-white font-bold py-3.5 px-4 rounded-2xl shadow-sm flex items-center justify-between active:scale-98 transition-transform"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black">{cartCount} {cartCount === 1 ? 'ITEM' : 'ITEMS'}</p>
                  <p className="text-[11px] text-emerald-100">₹{cartTotal}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-black">
                <span>View Basket</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        quantity={quickViewProduct ? cart[quickViewProduct.id]?.quantity || 0 : 0}
        onAdd={handleAddToCart}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onRemove={handleRemove}
        onCheckout={handleCheckout}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={(code) => setAppliedCoupon(code)}
        onRemoveCoupon={() => setAppliedCoupon('')}
      />

      {/* Location Selector Modal */}
      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        selectedLocation={location}
        onSelectLocation={(loc) => {
          setLocation(loc);
          showToast("Delivery Address Updated", loc.name, 'general');
        }}
      />

      {/* Login / OTP Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(loggedUser) => {
          setUser(loggedUser);
          showToast("Welcome to JD Bazar!", `Logged in as ${loggedUser.name}`, 'general');
        }}
      />

      {/* Order Placed Success Modal */}
      <OrderSuccessModal
        isOpen={isOrderSuccessOpen}
        onClose={() => setIsOrderSuccessOpen(false)}
        orderData={lastOrderData}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
