/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryCards } from './components/CategoryCards';
import { FeaturedShowcase } from './components/FeaturedShowcase';
import { BrandIntro } from './components/BrandIntro';
import { PromoBanner } from './components/PromoBanner';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

// Modals and Drawers
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ShopifyIntegrationModal } from './components/ShopifyIntegrationModal';

// Pages
import { ShopPage } from './pages/ShopPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PoliciesPage } from './pages/PoliciesPage';

import { STORE_CONTACT } from './data/products';
import { Phone, CheckCircle } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activePage, toastMessage } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F4] text-[#35251F]">
      {/* Top Navigation */}
      <Header />

      {/* Dynamic Page Views */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <Hero />
            <CategoryCards />
            <FeaturedShowcase />
            <BrandIntro />
            <PromoBanner />
            <Testimonials />
          </>
        )}

        {activePage === 'shop' && <ShopPage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'policies' && <PoliciesPage />}
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Concierge (Accessible & Non-Intrusive) */}
      <a
        href={STORE_CONTACT.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-30 p-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-[#25D366]/40"
      >
        <Phone className="w-5 h-5 fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out px-0 group-hover:pl-2 text-xs font-semibold">
          VIP Concierge
        </span>
      </a>

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <CheckoutModal />
      <ShopifyIntegrationModal />

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#35251F] text-white py-2.5 px-4 rounded-lg shadow-xl text-xs font-medium flex items-center gap-2 border border-[#C5A46D]/30 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle className="w-4 h-4 text-[#C5A46D]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
