import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Tag, Copy, Check, ArrowRight, Sparkles } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  const { navigateTo, applyDiscount, showToast } = useStore();
  const [copied, setCopied] = useState(false);
  const code = 'KATHRYN10';

  const handleCopy = () => {
    navigator.clipboard?.writeText(code);
    applyDiscount(code);
    setCopied(true);
    showToast(`Code ${code} copied & applied!`);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="bg-gradient-to-r from-[#35251F] via-[#453027] to-[#35251F] text-white py-12 px-4 sm:px-6 lg:px-8 border-y border-[#C5A46D]/30 relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A46D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#B86F7B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#C5A46D] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VIP Welcome Privilege</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#FFF9F4] tracking-tight">
            10% Off Your Curated Kathryn Lynne Order
          </h3>
          <p className="text-sm text-[#F7EFE7]/80 max-w-xl font-normal">
            Enjoy 10% off beauty, fashion, or footwear when you shop with us today. Plus complimentary dispatch on orders over ₦50,000.
          </p>
        </div>

        {/* Promo Code Box & Action */}
        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 bg-[#FFF9F4]/10 border border-[#C5A46D]/40 rounded-lg px-4 py-2.5 backdrop-blur-xs">
            <Tag className="w-4 h-4 text-[#C5A46D]" />
            <span className="font-mono text-sm tracking-widest font-bold text-[#FFF9F4]">
              {code}
            </span>
            <button
              onClick={handleCopy}
              className="ml-2 text-xs font-semibold text-[#C5A46D] hover:text-white transition-colors flex items-center gap-1"
              title="Copy code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Applied' : 'Copy'}</span>
            </button>
          </div>

          <button
            onClick={() => navigateTo('shop', 'all')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#C5A46D] hover:bg-[#b5955e] text-[#35251F] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
