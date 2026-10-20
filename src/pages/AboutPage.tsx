import React from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_IMAGES, BRAND_VALUES } from '../data/products';
import { ArrowRight, CheckCircle2, Sparkles, Heart, ShieldCheck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="py-12 sm:py-20 bg-[#FFF9F4] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#B86F7B]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>About Kathryn Lynne</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-[#35251F] font-normal tracking-tight [text-wrap:balance]">
            "Look Good. Feel Confident. Be You."
          </h1>

          <p className="text-base sm:text-lg text-[#35251F]/80 leading-relaxed font-normal">
            KATHRYN LYNNE brings beauty, fashion, and footwear together in one elegant shopping destination, helping women discover products that complement their personal style and everyday confidence.
          </p>
        </div>

        {/* Editorial Image Showcase */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-lg border border-[#35251F]/10 bg-[#F7EFE7]">
          <img
            src={STORE_IMAGES.hero}
            alt="Kathryn Lynne Luxury Brand Vision"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="font-serif text-xl sm:text-2xl font-normal">
              Elegance Crafted for Everyday Confidence
            </span>
          </div>
        </div>

        {/* 3 Pillars of Kathryn Lynne */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif text-[#35251F] font-normal">
              Our Curated Disciplines
            </h2>
            <p className="text-xs sm:text-sm text-[#35251F]/70 mt-2">
              Three harmonious categories designed to empower modern women in Nigeria and around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-[#35251F]/10 space-y-3">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#B86F7B] block">
                01. Skincare & Beauty
              </span>
              <h3 className="font-serif text-xl text-[#35251F] font-normal">
                Dewy, Barrier-Loving Formulas
              </h3>
              <p className="text-xs text-[#35251F]/75 leading-relaxed">
                Formulated with cold-pressed botanical lipids, soothing plant extracts, and multi-molecular hydration to help your natural radiance shine through effortlessly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#35251F]/10 space-y-3">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#B86F7B] block">
                02. Women's Fashion
              </span>
              <h3 className="font-serif text-xl text-[#35251F] font-normal">
                Timeless Modern Silhouettes
              </h3>
              <p className="text-xs text-[#35251F]/75 leading-relaxed">
                From lustrous silk-blend wrap dresses to tailored European linen separates, every piece is designed for flattering movement, breathable comfort, and enduring style.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#35251F]/10 space-y-3">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#B86F7B] block">
                03. Shoes & Footwear
              </span>
              <h3 className="font-serif text-xl text-[#35251F] font-normal">
                Grace Meets Cushioning
              </h3>
              <p className="text-xs text-[#35251F]/75 leading-relaxed">
                Handcrafted strappy sandals, crystal-adorned evening mules, and sculptured daytime kitten slides featuring plush memory-foam footbeds that support your stride all day.
              </p>
            </div>
          </div>
        </div>

        {/* Commitment to Clients in Nigeria & Globally */}
        <div className="bg-[#F7EFE7] rounded-2xl p-8 sm:p-12 border border-[#35251F]/10 space-y-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B86F7B]">
              Client Care & Dispatch
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#35251F] font-normal">
              Serving Women in Nigeria and Across the World
            </h2>
            <p className="text-sm text-[#35251F]/80 leading-relaxed">
              Whether you are shopping from Lagos, Abuja, London, Atlanta, or anywhere globally, Kathryn Lynne provides prompt dispatch, clear tracking, and dedicated WhatsApp concierge support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {BRAND_VALUES.map((val) => (
              <div key={val.title} className="bg-white p-4 rounded-lg border border-[#35251F]/5 space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#35251F]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B86F7B]" />
                  <span>{val.title}</span>
                </div>
                <p className="text-xs text-[#35251F]/70 leading-relaxed pl-5">
                  {val.description}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigateTo('shop', 'all')}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#35251F] hover:bg-[#B86F7B] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors"
            >
              <span>Explore The Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('contact')}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#35251F]/20 hover:border-[#35251F] text-[#35251F] text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-white transition-colors"
            >
              <span>Contact Concierge</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
