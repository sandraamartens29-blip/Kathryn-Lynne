import React from 'react';
import { Product } from '../types/store';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openProductDetails,
  } = useStore();

  const isFavorited = isInWishlist(product.id);
  const hasDiscount = !!product.compareAtPriceNGN && product.compareAtPriceNGN > product.priceNGN;

  return (
    <div className="group relative bg-white rounded-lg border border-[#35251F]/10 overflow-hidden flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      {/* Product Image Stage */}
      <div className="relative aspect-square overflow-hidden bg-[#F7EFE7]">
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Minimalist Status Tag (Zero-Pill: Clean unboxed metadata) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {product.isBestseller && (
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#B86F7B] bg-white/95 px-2 py-0.5 rounded-sm shadow-xs border border-[#35251F]/10">
              Bestseller
            </span>
          )}
          {product.isNewArrival && !product.isBestseller && (
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#35251F] bg-white/95 px-2 py-0.5 rounded-sm shadow-xs border border-[#35251F]/10">
              New Arrival
            </span>
          )}
          {product.availability === 'Limited Run' && (
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#C5A46D] bg-[#35251F] text-white px-2 py-0.5 rounded-sm shadow-xs">
              Limited Run
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-xs transition-colors shadow-xs ${
            isFavorited
              ? 'bg-[#B86F7B] text-white'
              : 'bg-white/90 text-[#35251F] hover:text-[#B86F7B]'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Hover Strip */}
        <div className="absolute inset-x-2 bottom-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => openProductDetails(product)}
            className="flex-1 py-2 px-3 bg-white/95 text-[#35251F] hover:bg-[#35251F] hover:text-white text-xs font-medium rounded shadow-sm transition-colors flex items-center justify-center gap-1.5 backdrop-blur-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Subcategory & Star Rating */}
          <div className="flex items-center justify-between text-xs text-[#35251F]/60">
            <span className="uppercase tracking-wider text-[11px] font-medium text-[#C5A46D]">
              {product.subcategory}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#C5A46D] text-[#C5A46D]" />
              <span className="font-mono text-[11px] text-[#35251F]">{product.rating.toFixed(1)}</span>
              <span className="text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => openProductDetails(product)}
            className="font-serif text-base text-[#35251F] font-normal hover:text-[#B86F7B] cursor-pointer line-clamp-2 leading-snug transition-colors"
          >
            {product.name}
          </h3>

          {/* Options Preview */}
          {product.options && product.options.length > 0 && (
            <div className="text-[11px] text-[#35251F]/60 truncate">
              {product.optionsLabel || 'Options'}: {product.options.slice(0, 3).join(' · ')}
              {product.options.length > 3 ? ` +${product.options.length - 3}` : ''}
            </div>
          )}
        </div>

        {/* Price & Add to Bag Footer */}
        <div className="pt-3 mt-3 border-t border-[#35251F]/5 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-[#35251F] font-mono tabular-nums">
              {formatPrice(product.priceNGN)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-[#35251F]/40 line-through font-mono tabular-nums">
                {formatPrice(product.compareAtPriceNGN!)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            aria-label={`Add ${product.name} to bag`}
            className="p-2 sm:px-3 sm:py-1.5 bg-[#35251F] hover:bg-[#B86F7B] text-white text-xs font-medium rounded transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
