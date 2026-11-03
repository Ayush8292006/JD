import React from 'react';
import Logo from './Logo';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Linkedin, ShieldCheck, Heart } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function Footer({ onSelectCategory }) {
  return (
    <>
    {/* Phones: minimal app-style sign-off (the full website footer is for tablet / laptop) */}
    <div className="md:hidden bg-surface-off px-4 pt-8 pb-6">
      <p className="text-[32px] leading-[1.05] font-black tracking-tight text-stone-300">
        Aapka apna bazar,<br />ab minutes mein
        <Heart className="inline-block w-7 h-7 ml-1.5 -mt-1 text-red-400 fill-current" />
      </p>
      <p className="mt-4 text-[11px] font-semibold text-stone-400">
        JD Bazar · jdbazar.in · support@jdbazar.in
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5 font-mono text-[10px] font-bold text-stone-500">
        {['UPI', 'RuPay', 'VISA', 'Mastercard', 'COD'].map((m) => (
          <span key={m} className="bg-white border border-stone-200 px-1.5 py-0.5 rounded">{m}</span>
        ))}
      </div>
    </div>

    <footer className="hidden md:block bg-surface-off border-t border-stone-200/80 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-stone-200">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="large" showTagline={true} />
            <p className="text-xs sm:text-sm text-content-secondary leading-relaxed max-w-sm pt-2">
              JD Bazar (<strong className="text-content-primary">jdbazar.in</strong>) is India's premier quick-commerce grocery delivery network. Sourced straight from certified mandies to our temperature-controlled micro-warehouses and right to your doorstep in 10 minutes.
            </p>

            <div className="space-y-2 text-xs text-content-secondary pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-green flex-shrink-0" />
                <span>JD Bazar HQ, Outer Ring Road, Connaught Place, New Delhi - 110001</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-green flex-shrink-0" />
                <a href="mailto:support@jdbazar.in" className="hover:text-brand-green transition-colors font-medium">
                  support@jdbazar.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-green flex-shrink-0" />
                <a href="tel:+918001020304" className="hover:text-brand-green transition-colors font-medium">
                  +91 (800) 102-0304 (24x7 Helpdesk)
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-stone-200 hover:border-brand-green hover:text-brand-green text-stone-600 flex items-center justify-center transition-all shadow-xs"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-stone-200 hover:border-brand-green hover:text-brand-green text-stone-600 flex items-center justify-center transition-all shadow-xs"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-stone-200 hover:border-brand-green hover:text-brand-green text-stone-600 flex items-center justify-center transition-all shadow-xs"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-stone-200 hover:border-brand-green hover:text-brand-green text-stone-600 flex items-center justify-center transition-all shadow-xs"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories Columns */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-content-primary uppercase tracking-wider">
              Top Categories
            </h4>
            <ul className="space-y-2 text-xs text-content-secondary">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-brand-green transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-content-primary uppercase tracking-wider">
              More Aisles
            </h4>
            <ul className="space-y-2 text-xs text-content-secondary">
              {CATEGORIES.slice(6, 12).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-brand-green transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-content-primary uppercase tracking-wider">
              Company & Policy
            </h4>
            <ul className="space-y-2 text-xs text-content-secondary">
              <li><a href="#" className="hover:text-brand-green transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Careers (We're Hiring!)</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Partner With JD Bazar</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Responsible Sourcing</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Dark Store Franchises</a></li>
            </ul>
          </div>
        </div>

        {/* Payment Methods & Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-content-secondary">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span>Accepted Payment Options:</span>
            <div className="flex flex-wrap items-center justify-center gap-2 font-mono font-bold text-stone-700">
              <span className="bg-white border border-stone-200 px-2 py-0.5 rounded text-[10px]">UPI</span>
              <span className="bg-white border border-stone-200 px-2 py-0.5 rounded text-[10px]">RuPay</span>
              <span className="bg-white border border-stone-200 px-2 py-0.5 rounded text-[10px]">VISA</span>
              <span className="bg-white border border-stone-200 px-2 py-0.5 rounded text-[10px]">Mastercard</span>
              <span className="bg-white border border-stone-200 px-2 py-0.5 rounded text-[10px]">NetBanking</span>
              <span className="bg-white border border-stone-200 px-2 py-0.5 rounded text-[10px]">COD</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1 text-center">
            <span>© 2026 JD Bazar (<a href="https://jdbazar.in" className="text-brand-green font-semibold hover:underline">jdbazar.in</a>). Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span>for Indian homes.</span>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}

