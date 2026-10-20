import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CURRENCIES, STORE_CONTACT } from '../data/products';
import { CurrencyCode } from '../types/store';
import {
  ShoppingBag,
  Search,
  Heart,
  Menu,
  X,
  Globe,
  Phone,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    cartCount,
    wishlist,
    currency,
    setCurrency,
    setIsCartOpen,
    setIsSearchOpen,
    setIsWishlistOpen,
    setIsShopifyInfoOpen,
    activePage,
    navigateTo,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const navLinks = [
    { label: 'Home', page: 'home' as const, category: 'all' },
    { label: 'Shop All', page: 'shop' as const, category: 'all' },
    { label: 'Skincare', page: 'shop' as const, category: 'skincare' },
    { label: 'Fashion', page: 'shop' as const, category: 'fashion' },
    { label: 'Shoes', page: 'shop' as const, category: 'shoes' },
    { label: 'About', page: 'about' as const, category: 'all' },
    { label: 'Contact', page: 'contact' as const, category: 'all' },
  ];

  const handleNavClick = (page: 'home' | 'shop' | 'about' | 'contact' | 'policies', category: string) => {
    navigateTo(page, category);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFF9F4]/95 backdrop-blur-md border-b border-[#35251F]/10">
      {/* Slim Announcement Bar */}
      <div className="bg-[#35251F] text-[#FFF9F4] text-xs py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-[#C5A46D] font-medium tracking-wide">LOOK GOOD · FEEL CONFIDENT · BE YOU</span>
          </div>

          <div className="flex-1 text-center truncate">
            <span className="font-normal text-[#F7EFE7]">
              Complimentary delivery in Lagos on orders over ₦50,000 · Worldwide DHL Shipping Available
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-xs">
            {/* Direct WhatsApp Concierge */}
            <a
              href={STORE_CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-[#F7EFE7] hover:text-[#C5A46D] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C5A46D]" />
              <span>WhatsApp Concierge</span>
            </a>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className="flex items-center gap-1.5 text-[#F7EFE7] hover:text-[#C5A46D] transition-colors focus:outline-none"
                aria-label="Select currency"
              >
                <Globe className="w-3 h-3 text-[#C5A46D]" />
                <span className="font-medium tracking-wider">{currency}</span>
                <span className="text-[10px] opacity-70">({CURRENCIES[currency].symbol})</span>
              </button>

              {showCurrencyDropdown && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-[#FFFFFF] text-[#35251F] rounded-lg shadow-lg border border-[#35251F]/10 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setShowCurrencyDropdown(false)}
                >
                  <div className="px-3 py-1 text-[11px] font-semibold tracking-wider text-[#B86F7B] uppercase border-b border-[#35251F]/10">
                    Select Currency
                  </div>
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrency(code);
                        setShowCurrencyDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F7EFE7] transition-colors ${
                        currency === code ? 'font-semibold text-[#B86F7B]' : 'text-[#35251F]'
                      }`}
                    >
                      <span>{CURRENCIES[code].label}</span>
                      <span className="font-mono">{CURRENCIES[code].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Shopify Storefront Info Link */}
            <button
              onClick={() => setIsShopifyInfoOpen(true)}
              className="hidden lg:flex items-center gap-1 text-[#C5A46D] hover:text-[#E8B7BD] transition-colors"
              title="Shopify Connected Architecture"
            >
              <Sparkles className="w-3 h-3" />
              <span>Shopify Sync</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-5 Nav Links) — Zone 3 (Primary Action Group) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => handleNavClick('home', 'all')}
            className="text-left group focus:outline-none"
          >
            <span className="text-2xl sm:text-3xl font-serif tracking-[0.18em] font-medium text-[#35251F] group-hover:text-[#B86F7B] transition-colors whitespace-nowrap">
              KATHRYN LYNNE
            </span>
            <span className="block text-[10px] tracking-[0.24em] uppercase text-[#C5A46D] font-sans -mt-1 font-medium">
              Lagos · London
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium tracking-wide">
          {navLinks.map((link) => {
            const isActive = activePage === link.page && (link.page !== 'shop' || activePage === 'shop');
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.page, link.category)}
                className={`relative whitespace-nowrap shrink-0 transition-colors py-1 ${
                  isActive ? 'text-[#B86F7B] font-semibold' : 'text-[#35251F]/80 hover:text-[#35251F]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B86F7B] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action Group */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search catalog"
            className="p-2 text-[#35251F]/80 hover:text-[#B86F7B] transition-colors rounded-full hover:bg-[#F7EFE7]"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            aria-label="View wishlist"
            className="relative p-2 text-[#35251F]/80 hover:text-[#B86F7B] transition-colors rounded-full hover:bg-[#F7EFE7]"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#B86F7B] text-[#FFFFFF] text-[10px] font-medium flex items-center justify-center font-mono">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping bag"
            className="relative flex items-center gap-2 py-2 px-3 sm:px-4 rounded-full bg-[#35251F] text-[#FFF9F4] hover:bg-[#B86F7B] transition-colors text-xs font-medium whitespace-nowrap shrink-0 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 text-[#FFF9F4]" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-[#C5A46D] text-[#35251F] font-bold text-[11px] rounded-full px-1.5 min-w-[20px] text-center font-mono">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open mobile menu"
            className="md:hidden p-2 text-[#35251F] hover:text-[#B86F7B] transition-colors rounded-lg hover:bg-[#F7EFE7]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFF9F4] border-b border-[#35251F]/10 px-6 py-6 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4 text-base font-medium">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.page, link.category)}
                className="text-left py-2 text-[#35251F] hover:text-[#B86F7B] border-b border-[#35251F]/5 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#C5A46D]">→</span>
              </button>
            ))}
          </nav>

          <div className="mt-6 pt-4 border-t border-[#35251F]/10 flex flex-col gap-3">
            <a
              href={STORE_CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#25D366] text-white text-sm font-medium hover:bg-[#20ba59] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Chat with VIP WhatsApp Concierge</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsShopifyInfoOpen(true);
              }}
              className="flex items-center justify-center gap-2 py-2 text-xs text-[#35251F]/70 hover:text-[#35251F]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>Shopify Connected Storefront Settings</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
