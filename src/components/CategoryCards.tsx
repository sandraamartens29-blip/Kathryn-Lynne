import React from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_IMAGES } from '../data/products';
import { ArrowUpRight } from 'lucide-react';

export const CategoryCards: React.FC = () => {
  const { navigateTo } = useStore();

  const categories = [
    {
      id: 'skincare',
      title: 'Skincare & Beauty',
      description: 'Discover skincare essentials for your beauty routine.',
      buttonText: 'Shop Skincare',
      image: STORE_IMAGES.categorySkincare,
      itemCount: 'Serums · Creams · Mists',
    },
    {
      id: 'fashion',
      title: "Women's Fashion",
      description: 'Explore styles that express your individuality.',
      buttonText: 'Shop Fashion',
      image: STORE_IMAGES.categoryFashion,
      itemCount: 'Silk Dresses · Linen Sets · Trousers',
    },
    {
      id: 'shoes',
      title: 'Shoes & Footwear',
      description: 'Find footwear to complement every occasion.',
      buttonText: 'Shop Shoes',
      image: STORE_IMAGES.categoryShoes,
      itemCount: 'Stilettos · Pavé Mules · Kitten Slides',
    },
  ];

  return (
    <section id="shop-by-category" className="py-16 sm:py-20 bg-[#FFF9F4] border-b border-[#35251F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#B86F7B] block mb-2">
            Curated Collections
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#35251F] font-normal tracking-tight">
            Shop by Category
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#35251F]/70">
            Thoughtfully created lines bringing beauty, fashion, and footwear together in one elegant shopping destination.
          </p>
        </div>

        {/* 3-Column Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateTo('shop', cat.id)}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#35251F]/10 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              {/* Category Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F7EFE7]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-[#35251F] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <ArrowUpRight className="w-4 h-4 text-[#B86F7B]" />
                </div>
              </div>

              {/* Category Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#C5A46D] font-medium mb-1">
                    {cat.itemCount}
                  </div>
                  <h3 className="text-xl font-serif text-[#35251F] font-normal group-hover:text-[#B86F7B] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-[#35251F]/70 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateTo('shop', cat.id);
                    }}
                    className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#35251F] bg-[#F7EFE7] hover:bg-[#B86F7B] hover:text-white rounded-md transition-colors text-center"
                  >
                    {cat.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
