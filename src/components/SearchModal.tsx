import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Search, X, ArrowRight, Star } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openProductDetails, formatPrice, navigateTo } = useStore();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.benefits.some((b) => b.toLowerCase().includes(q))
    );
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={() => setIsSearchOpen(false)} />

      <div className="relative bg-[#FFF9F4] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#35251F]/10 z-10">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#35251F]/10 bg-white flex items-center gap-3">
          <Search className="w-5 h-5 text-[#B86F7B] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search skincare, silk dresses, strappy heels, serums..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-[#35251F] placeholder-[#35251F]/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#35251F]/50 hover:text-[#35251F] px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
            className="p-1 rounded-full hover:bg-[#F7EFE7] text-[#35251F]/70 hover:text-[#35251F]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-6 py-3 bg-[#F7EFE7]/60 border-b border-[#35251F]/5 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#35251F]/50 shrink-0 font-medium">Popular:</span>
          {['Face Elixir', 'Silk Wrap Dress', 'Strappy Sandals', 'Radiance Cream', 'Linen Set'].map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2.5 py-1 rounded bg-white text-[#35251F]/80 hover:text-[#B86F7B] border border-[#35251F]/10 shrink-0 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-[#35251F]/60 space-y-2">
              <p>Type keywords to discover products across Kathryn Lynne collections.</p>
              <div className="flex justify-center gap-4 pt-2">
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    navigateTo('shop', 'skincare');
                  }}
                  className="text-[#B86F7B] underline font-medium"
                >
                  Skincare
                </button>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    navigateTo('shop', 'fashion');
                  }}
                  className="text-[#B86F7B] underline font-medium"
                >
                  Fashion
                </button>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    navigateTo('shop', 'shoes');
                  }}
                  className="text-[#B86F7B] underline font-medium"
                >
                  Shoes
                </button>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <p className="font-serif text-lg text-[#35251F]">No matches found for "{query}"</p>
              <p className="text-xs text-[#35251F]/60">
                Try searching with broader terms or contact our WhatsApp concierge for custom assistance.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#C5A46D] block">
                Found {searchResults.length} {searchResults.length === 1 ? 'Product' : 'Products'}
              </span>
              <div className="divide-y divide-[#35251F]/5">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      openProductDetails(product);
                    }}
                    className="py-3 flex items-center justify-between gap-4 hover:bg-white/80 p-2 rounded-lg cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-md overflow-hidden bg-[#F7EFE7] shrink-0 border border-[#35251F]/10">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#C5A46D] font-medium block">
                          {product.subcategory}
                        </span>
                        <h4 className="text-xs sm:text-sm font-semibold text-[#35251F] group-hover:text-[#B86F7B] transition-colors">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-[#35251F]/60 mt-0.5">
                          <span className="font-mono font-medium text-[#35251F]">
                            {formatPrice(product.priceNGN)}
                          </span>
                          <span>·</span>
                          <span className="text-emerald-700 font-medium">{product.availability}</span>
                        </div>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-[#35251F]/40 group-hover:text-[#B86F7B] transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
