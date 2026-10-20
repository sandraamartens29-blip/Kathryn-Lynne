import React from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_IMAGES } from '../data/products';
import { ArrowRight, Sparkles, ShieldCheck, Truck } from 'lucide-react';

interface HeroProps {
  headline?: string;
  subheading?: string;
  primaryCta?: string;
  secondaryCta?: string;
}

export const Hero: React.FC<HeroProps> = ({
  headline = 'Your Beauty. Your Style. All in One Place.',
  subheading = 'Discover skincare essentials, stylish fashion, and elegant footwear curated for your everyday confidence.',
  primaryCta = 'Shop Now',
  secondaryCta = 'Explore Collections',
}) => {
  const { navigateTo } = useStore();

  return (
    <section className="relative overflow-hidden bg-[#FFF9F4] border-b border-[#35251F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Editorial Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 order-2 lg:order-1">
            {/* Quiet Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#B86F7B] font-semibold">
              <span>Kathryn Lynne</span>
              <span aria-hidden="true" className="text-[#C5A46D]">·</span>
              <span>The Luxury Edit</span>
            </div>

            {/* Headline with balanced text */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#35251F] font-normal leading-[1.18] tracking-tight [text-wrap:balance]">
              {headline}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#35251F]/75 font-normal leading-relaxed max-w-xl">
              {subheading}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => navigateTo('shop', 'all')}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#B86F7B] hover:bg-[#a25e69] text-white text-sm font-semibold tracking-wide rounded-md transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>{primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const element = document.getElementById('shop-by-category');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigateTo('shop', 'all');
                  }
                }}
                className="inline-flex items-center justify-center px-7 py-3.5 border border-[#35251F]/20 hover:border-[#35251F] text-[#35251F] text-sm font-medium tracking-wide rounded-md hover:bg-[#F7EFE7] transition-all cursor-pointer"
              >
                <span>{secondaryCta}</span>
              </button>
            </div>

            {/* Editorial Brand Proof Strip */}
            <div className="pt-6 border-t border-[#35251F]/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#35251F]/75">
              <div>
                <span className="block font-semibold text-[#35251F] tracking-wide">Nigeria & Global</span>
                <span className="text-[11px] text-[#35251F]/60">Lagos next-day & DHL express</span>
              </div>
              <div>
                <span className="block font-semibold text-[#35251F] tracking-wide">100% Genuine</span>
                <span className="text-[11px] text-[#35251F]/60">Botanical purity & tailored craft</span>
              </div>
              <div className="hidden sm:block">
                <span className="block font-semibold text-[#35251F] tracking-wide">VIP Concierge</span>
                <span className="text-[11px] text-[#35251F]/60">WhatsApp styling & sizing</span>
              </div>
            </div>
          </div>

          {/* Hero Imagery Showcase */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] shadow-md border border-[#35251F]/10 bg-[#F7EFE7] group">
              <img
                src={STORE_IMAGES.hero}
                alt="Kathryn Lynne luxury beauty and fashion campaign"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Quiet Editorial Overlay Caption */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white flex items-end justify-between pointer-events-none">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#FFF9F4]/90 block">
                    Collection Spotlight
                  </span>
                  <span className="font-serif text-lg sm:text-xl font-normal text-white">
                    "Look Good. Feel Confident. Be You."
                  </span>
                </div>
                <span className="text-xs font-medium text-[#FFF9F4]/80 hidden sm:inline-block">
                  Kathryn Lynne Atelier
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
