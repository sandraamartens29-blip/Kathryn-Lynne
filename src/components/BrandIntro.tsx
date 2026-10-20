import React from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_IMAGES, BRAND_VALUES } from '../data/products';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const BrandIntro: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <section className="py-16 sm:py-24 bg-[#F7EFE7] border-b border-[#35251F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Editorial Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#35251F]/10 aspect-[4/5] bg-white">
              <img
                src={STORE_IMAGES.hero}
                alt="Kathryn Lynne Luxury Brand Vision"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#35251F]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A46D] font-medium block mb-1">
                  Brand Philosophy
                </span>
                <p className="font-serif text-xl sm:text-2xl font-normal leading-snug">
                  "Look Good. Feel Confident. Be You."
                </p>
              </div>
            </div>

            {/* Small Floating Accent Card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-56 bg-white p-4 rounded-xl shadow-lg border border-[#35251F]/10">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#B86F7B] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Signature Quality</span>
              </div>
              <p className="text-xs text-[#35251F]/70">
                Skin-kind botanicals, fine tailored fabrics, and artisan shoes.
              </p>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-7 space-y-6 lg:pl-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#B86F7B] font-semibold">
              <span>The Atelier</span>
              <span aria-hidden="true" className="text-[#C5A46D]">·</span>
              <span>Our Vision</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#35251F] font-normal tracking-tight [text-wrap:balance]">
              Welcome to Kathryn Lynne.
            </h2>

            <p className="text-base sm:text-lg text-[#35251F]/80 leading-relaxed font-normal">
              Your destination for beauty, fashion, and footwear. Explore thoughtfully presented collections designed to help you discover your style and feel confident in your everyday choices.
            </p>

            <blockquote className="p-4 bg-white/70 rounded-lg border border-[#35251F]/10 text-sm text-[#35251F]/85 italic leading-relaxed">
              "KATHRYN LYNNE brings beauty, fashion, and footwear together in one elegant shopping destination, helping women discover products that complement their personal style and everyday confidence."
            </blockquote>

            {/* Core Values 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {BRAND_VALUES.slice(0, 4).map((value) => (
                <div key={value.title} className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#35251F] uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B86F7B] shrink-0" />
                    <span>{value.title}</span>
                  </div>
                  <p className="text-xs text-[#35251F]/70 leading-normal pl-5">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Read Our Full Story CTA */}
            <div className="pt-4">
              <button
                onClick={() => navigateTo('about')}
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#35251F] hover:bg-[#B86F7B] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
              >
                <span>Read About Our Brand</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
