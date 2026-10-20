import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Filter, SlidersHorizontal, Sparkles, ChevronDown } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { activeCategoryFilter, navigateTo } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategoryFilter || 'all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Sync category if activeCategoryFilter changed externally
  React.useEffect(() => {
    if (activeCategoryFilter) {
      setSelectedCategory(activeCategoryFilter);
      setSelectedSubcategory('all');
    }
  }, [activeCategoryFilter]);

  // Available subcategories based on category
  const subcategories = useMemo(() => {
    let filtered = PRODUCTS;
    if (selectedCategory !== 'all' && selectedCategory !== 'bestsellers' && selectedCategory !== 'new-arrivals') {
      filtered = PRODUCTS.filter((p) => p.category === selectedCategory);
    }
    const set = new Set(filtered.map((p) => p.subcategory));
    return ['all', ...Array.from(set)];
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory === 'bestsellers' && !product.isBestseller) return false;
      if (selectedCategory === 'new-arrivals' && !product.isNewArrival) return false;
      if (
        selectedCategory !== 'all' &&
        selectedCategory !== 'bestsellers' &&
        selectedCategory !== 'new-arrivals' &&
        product.category !== selectedCategory
      ) {
        return false;
      }

      // Subcategory filter
      if (selectedSubcategory !== 'all' && product.subcategory !== selectedSubcategory) {
        return false;
      }

      // Stock filter
      if (onlyInStock && product.availability !== 'In Stock') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.priceNGN - b.priceNGN;
      if (sortBy === 'price-high') return b.priceNGN - a.priceNGN;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default order
    });
  }, [selectedCategory, selectedSubcategory, sortBy, onlyInStock]);

  const categoryTitles: Record<string, { title: string; subtitle: string }> = {
    all: {
      title: 'Shop All Collections',
      subtitle: 'Explore our complete curation of beauty essentials, women’s fashion, and footwear.',
    },
    skincare: {
      title: 'Skincare & Beauty Essentials',
      subtitle: 'High-performance botanical oils, hydrating creams, and skin-barrier restoring formulations.',
    },
    fashion: {
      title: "Women's Fashion & Apparel",
      subtitle: 'Effortless silk wrap dresses, tailored linen coordinates, and flowing resortwear.',
    },
    shoes: {
      title: 'Shoes & Footwear Collection',
      subtitle: 'Artisan strappy stiletto heels, pavé crystal mules, and everyday kitten slides.',
    },
    bestsellers: {
      title: 'Verified Bestsellers',
      subtitle: 'Our most sought-after and beloved pieces across Nigeria and internationally.',
    },
    'new-arrivals': {
      title: 'New Arrivals Drop',
      subtitle: 'The latest curated additions to the Kathryn Lynne seasonal edit.',
    },
  };

  const currentInfo = categoryTitles[selectedCategory] || categoryTitles.all;

  return (
    <div className="py-10 sm:py-16 bg-[#FFF9F4] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Banner Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#B86F7B]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>Curated Storefront</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#35251F] font-normal tracking-tight">
            {currentInfo.title}
          </h1>
          <p className="text-sm text-[#35251F]/70 leading-relaxed">
            {currentInfo.subtitle}
          </p>
        </div>

        {/* Category Filter Tabs (Zero-Pill: Clean segmented control buttons with functional handlers) */}
        <div className="flex items-center justify-center overflow-x-auto pb-2">
          <div className="flex items-center gap-1.5 p-1 bg-[#F7EFE7] rounded-lg border border-[#35251F]/10">
            {[
              { id: 'all', label: 'All Pieces' },
              { id: 'skincare', label: 'Skincare & Beauty' },
              { id: 'fashion', label: "Women's Fashion" },
              { id: 'shoes', label: 'Shoes & Footwear' },
              { id: 'bestsellers', label: 'Bestsellers' },
              { id: 'new-arrivals', label: 'New Arrivals' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedCategory(tab.id);
                  setSelectedSubcategory('all');
                }}
                className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === tab.id
                    ? 'bg-white text-[#35251F] shadow-xs font-semibold'
                    : 'text-[#35251F]/70 hover:text-[#35251F]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategory & Sorting Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-xl border border-[#35251F]/10 text-xs">
          {/* Subcategory dropdown or chips */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[#35251F]/60 font-medium shrink-0">Filter:</span>
            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-2.5 py-1 rounded text-xs transition-colors shrink-0 ${
                  selectedSubcategory === sub
                    ? 'bg-[#35251F] text-white font-medium'
                    : 'bg-[#F7EFE7] text-[#35251F]/80 hover:text-[#35251F]'
                }`}
              >
                {sub === 'all' ? 'All Types' : sub}
              </button>
            ))}
          </div>

          {/* Right Controls: Sort & In Stock toggle */}
          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
            <label className="flex items-center gap-2 cursor-pointer text-[#35251F]/80 font-medium">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="accent-[#B86F7B] rounded"
              />
              <span>In Stock Only</span>
            </label>

            <div className="flex items-center gap-1.5">
              <span className="text-[#35251F]/60 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2.5 py-1.5 bg-[#F7EFE7] text-[#35251F] border border-[#35251F]/10 rounded-md focus:outline-none focus:border-[#B86F7B]"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Count Indicator */}
        <div className="text-xs text-[#35251F]/60 font-medium">
          Showing <strong className="text-[#35251F] font-mono">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'product' : 'products'}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-white rounded-xl border border-[#35251F]/10">
            <h3 className="font-serif text-xl text-[#35251F]">No products match these filters</h3>
            <p className="text-xs text-[#35251F]/60 max-w-sm mx-auto">
              Try adjusting your subcategory or in-stock preferences to view more items.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSubcategory('all');
                setOnlyInStock(false);
              }}
              className="px-6 py-2.5 bg-[#35251F] text-white text-xs font-semibold uppercase tracking-wider rounded-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
