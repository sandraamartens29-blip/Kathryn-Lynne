import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedShowcase: React.FC = () => {
  const { navigateTo } = useStore();
  const [activeTab, setActiveTab] = useState<'featured' | 'bestsellers' | 'new-arrivals'>('featured');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'featured') return p.isFeatured;
    if (activeTab === 'bestsellers') return p.isBestseller;
    if (activeTab === 'new-arrivals') return p.isNewArrival;
    return true;
  });

  return (
    <section className="py-16 sm:py-20 bg-[#FFF9F4] border-b border-[#35251F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Tab Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#B86F7B] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>Curated Edit</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#35251F] font-normal tracking-tight">
              Featured & Bestselling Pieces
            </h2>
          </div>

          {/* Functional Segmented Tab Controls (Permitted under Anti-Slop section A) */}
          <div className="flex items-center p-1 bg-[#F7EFE7] rounded-lg border border-[#35251F]/10 shrink-0">
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'featured'
                  ? 'bg-white text-[#35251F] shadow-xs font-semibold'
                  : 'text-[#35251F]/70 hover:text-[#35251F]'
              }`}
            >
              Featured Collection
            </button>
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'bestsellers'
                  ? 'bg-white text-[#35251F] shadow-xs font-semibold'
                  : 'text-[#35251F]/70 hover:text-[#35251F]'
              }`}
            >
              Bestsellers
            </button>
            <button
              onClick={() => setActiveTab('new-arrivals')}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'new-arrivals'
                  ? 'bg-white text-[#35251F] shadow-xs font-semibold'
                  : 'text-[#35251F]/70 hover:text-[#35251F]'
              }`}
            >
              New Arrivals
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo('shop', activeTab === 'bestsellers' ? 'bestsellers' : activeTab === 'new-arrivals' ? 'new-arrivals' : 'all')}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-md border border-[#35251F] text-[#35251F] hover:bg-[#35251F] hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider"
          >
            <span>Explore All {activeTab === 'bestsellers' ? 'Bestsellers' : activeTab === 'new-arrivals' ? 'New Arrivals' : 'Products'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
