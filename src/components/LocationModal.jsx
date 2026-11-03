import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';
import { MapPin, Navigation, X, Check, Search } from 'lucide-react';
import { CITIES } from '../data/products';

export default function LocationModal({ isOpen, onClose, selectedLocation, onSelectLocation }) {
  const isMobile = useIsMobile(); // phones: slide-up bottom sheet
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);

  if (!isOpen) return null;

  const filteredCities = CITIES.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDetectGPS = () => {
    setIsDetecting(true);
    setTimeout(() => {
      setIsDetecting(false);
      onSelectLocation({
        name: "Connaught Place, New Delhi",
        sub: "Near Rajiv Chowk Metro, Delhi - 110001",
        time: "8 mins"
      });
      onClose();
    }, 900);
  };

  return (
    <AnimatePresence>
      <div onClick={(e) => e.target === e.currentTarget && onClose()} className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 20 }}
          transition={isMobile ? { type: 'spring', damping: 30, stiffness: 320 } : { duration: 0.2 }}
          className="bg-white rounded-t-3xl md:rounded-3xl relative max-h-[92vh] overflow-y-auto pb-[env(safe-area-inset-bottom)] md:pb-0 max-w-md w-full shadow-2xl border border-stone-100"
        >
          <div className="md:hidden absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-black/15 z-30" aria-hidden="true" />
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-stone-100">
            <div>
              <h3 className="text-lg font-bold text-content-primary">Select Delivery Location</h3>
              <p className="text-xs text-content-secondary mt-0.5">
                We deliver grocery in 10 minutes to your doorstep
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-surface-off hover:bg-stone-200 flex items-center justify-center text-content-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Auto GPS Detect Button */}
            <button
              onClick={handleDetectGPS}
              disabled={isDetecting}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl border-2 border-brand-green/30 bg-brand-green-light hover:bg-brand-green/10 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-green text-white flex items-center justify-center shadow-sm">
                  <Navigation className={`w-5 h-5 ${isDetecting ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'}`} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-green">
                    {isDetecting ? 'Detecting current location...' : 'Use current location'}
                  </h4>
                  <p className="text-xs text-stone-600">Using GPS / Device location</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-brand-green uppercase tracking-wider bg-white px-2 py-1 rounded-md">
                Fastest
              </span>
            </button>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search city, area or pincode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
              />
            </div>

            {/* Saved or Popular Cities */}
            <div>
              <p className="text-xs font-semibold text-content-secondary uppercase tracking-wider mb-2.5">
                Popular Cities in India
              </p>
              <div className="space-y-2">
                {filteredCities.map((city) => {
                  const isSelected = selectedLocation?.name?.includes(city.name);
                  return (
                    <button
                      key={city.name}
                      onClick={() => {
                        onSelectLocation({
                          name: `${city.name}`,
                          sub: `${city.hubs} • Delivering in 10 mins`,
                          time: "10 mins"
                        });
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-brand-green bg-brand-green-light font-medium'
                          : 'border-stone-100 hover:border-stone-300 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className={`w-4 h-4 ${isSelected ? 'text-brand-green' : 'text-stone-400'}`} />
                        <div>
                          <p className="text-sm font-semibold text-content-primary">
                            {city.name}
                          </p>
                          <p className="text-xs text-content-secondary">
                            {city.hubs} active
                          </p>
                        </div>
                      </div>

                      {isSelected && (
                        <span className="w-6 h-6 rounded-full bg-brand-green text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

