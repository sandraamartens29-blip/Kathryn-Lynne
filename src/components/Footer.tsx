import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONTACT } from '../data/products';
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Check,
  Instagram,
  Facebook,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, applyDiscount, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;

    setSubscribed(true);
    applyDiscount('KATHRYN10');
    showToast('Welcome to the Kathryn Lynne Circle! Code KATHRYN10 applied.');
  };

  return (
    <footer className="bg-[#35251F] text-[#FFF9F4] pt-16 pb-12 border-t border-[#C5A46D]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Newsletter & Lead Capture Strip */}
        <div className="bg-[#433028] rounded-2xl p-8 sm:p-12 border border-[#C5A46D]/20 shadow-md">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#C5A46D] font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Kathryn Lynne Circle</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#FFF9F4] font-normal tracking-tight">
              Enjoy 10% Off Your First Curated Order
            </h3>

            <p className="text-sm text-[#F7EFE7]/80 max-w-xl mx-auto leading-relaxed">
              Subscribe for private collection previews, exclusive beauty secrets, and early invitations to limited-edition fashion and footwear releases.
            </p>

            {subscribed ? (
              <div className="p-4 bg-[#FFF9F4]/10 rounded-xl border border-[#C5A46D]/40 text-xs text-[#FFF9F4] max-w-md mx-auto space-y-1">
                <p className="font-semibold text-[#C5A46D] flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Welcome to Kathryn Lynne
                </p>
                <p className="text-[#F7EFE7]/80">
                  Your 10% welcome coupon code <strong className="font-mono text-[#FFF9F4]">KATHRYN10</strong> has been automatically unlocked in your bag!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-md bg-[#FFF9F4] text-[#35251F] text-xs placeholder-[#35251F]/50 focus:outline-none focus:ring-2 focus:ring-[#C5A46D]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-md bg-[#B86F7B] hover:bg-[#a25e69] text-white text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 shadow-sm"
                >
                  Subscribe
                </button>
              </form>
            )}

            <span className="text-[11px] text-[#F7EFE7]/50 block">
              We respect your privacy. Unsubscribe at any time.
            </span>
          </div>
        </div>

        {/* 4-Column Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-2xl font-serif tracking-[0.16em] font-medium text-[#FFF9F4] block">
              KATHRYN LYNNE
            </span>
            <p className="text-xs text-[#C5A46D] uppercase tracking-[0.2em] font-medium">
              "Look Good. Feel Confident. Be You."
            </p>
            <p className="text-xs text-[#F7EFE7]/70 leading-relaxed max-w-sm">
              KATHRYN LYNNE brings beauty, fashion, and footwear together in one elegant shopping destination, helping women discover products that complement their personal style and everyday confidence.
            </p>

            <div className="pt-2 flex items-center gap-4 text-[#C5A46D]">
              <a
                href={STORE_CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={STORE_CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={STORE_CONTACT.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Concierge"
                className="hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Collections */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A46D]">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#F7EFE7]/80">
              <li>
                <button
                  onClick={() => navigateTo('shop', 'skincare')}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  Skincare & Beauty Essentials
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'fashion')}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  Women's Fashion & Dresses
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'shoes')}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  Shoes & Luxury Footwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'bestsellers')}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  Verified Bestsellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'new-arrivals')}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  New Arrivals Drop
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge & Support */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A46D]">
              Concierge
            </h4>
            <ul className="space-y-2 text-xs text-[#F7EFE7]/80">
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  WhatsApp VIP Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('policies')}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  Delivery & Shipping (Nigeria & Worldwide)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('policies')}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  About Our Brand
                </button>
              </li>
            </ul>
          </div>

          {/* Dispatch Hubs */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A46D]">
              Dispatch Hubs
            </h4>
            <div className="space-y-2 text-xs text-[#F7EFE7]/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A46D] shrink-0 mt-0.5" />
                <span>Lekki Phase 1, Lagos, Nigeria</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A46D] shrink-0 mt-0.5" />
                <span>Maitama, Abuja (Express Courier)</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A46D] shrink-0 mt-0.5" />
                <span>{STORE_CONTACT.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#25D366] shrink-0 mt-0.5" />
                <span>{STORE_CONTACT.phone} (WhatsApp)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Trust Line */}
        <div className="pt-8 border-t border-[#C5A46D]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7EFE7]/50">
          <div>
            © {new Date().getFullYear()} KATHRYN LYNNE. All rights reserved. Look Good. Feel Confident. Be You.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigateTo('policies')}
              className="hover:text-[#FFF9F4] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigateTo('policies')}
              className="hover:text-[#FFF9F4] transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="hover:text-[#FFF9F4] transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
