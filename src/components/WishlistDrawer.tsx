import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    openProductDetails,
    formatPrice,
    navigateTo,
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={() => setIsWishlistOpen(false)} />

      <div className="relative w-full max-w-md bg-[#FFF9F4] h-full shadow-2xl flex flex-col z-10 border-l border-[#35251F]/10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#35251F]/10 bg-white/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#B86F7B] fill-[#B86F7B]" />
            <h2 className="font-serif text-lg font-normal text-[#35251F]">
              Your Wishlist
            </h2>
            <span className="text-xs font-mono font-semibold text-[#B86F7B] bg-[#F7EFE7] px-2 py-0.5 rounded-full">
              {wishlist.length}
            </span>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist"
            className="p-1.5 rounded-full hover:bg-[#F7EFE7] text-[#35251F]/70 hover:text-[#35251F] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 rounded-full bg-[#F7EFE7] flex items-center justify-center text-[#B86F7B]">
                <Heart className="w-8 h-8 opacity-40" />
              </div>
              <h3 className="font-serif text-lg font-normal text-[#35251F]">
                Your wishlist is empty
              </h3>
              <p className="text-xs text-[#35251F]/60 max-w-xs">
                Save pieces you love while browsing to purchase later or send to a loved one.
              </p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  navigateTo('shop', 'all');
                }}
                className="px-6 py-2.5 bg-[#35251F] hover:bg-[#B86F7B] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
              >
                Discover Collection
              </button>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 p-3 bg-white rounded-lg border border-[#35251F]/10 shadow-xs relative group"
              >
                <div
                  onClick={() => {
                    setIsWishlistOpen(false);
                    openProductDetails(product);
                  }}
                  className="w-20 h-20 rounded-md overflow-hidden bg-[#F7EFE7] shrink-0 border border-[#35251F]/5 cursor-pointer"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="pr-6">
                    <span className="text-[10px] uppercase tracking-wider text-[#C5A46D] font-medium block">
                      {product.subcategory}
                    </span>
                    <h4
                      onClick={() => {
                        setIsWishlistOpen(false);
                        openProductDetails(product);
                      }}
                      className="text-xs font-semibold text-[#35251F] truncate leading-tight hover:text-[#B86F7B] cursor-pointer"
                    >
                      {product.name}
                    </h4>
                    <span className="text-xs font-mono font-semibold text-[#35251F] mt-1 block">
                      {formatPrice(product.priceNGN)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#35251F]/5">
                    <button
                      onClick={() => {
                        addToCart(product, 1);
                        toggleWishlist(product.id);
                      }}
                      className="px-3 py-1 bg-[#35251F] hover:bg-[#B86F7B] text-white text-xs rounded transition-colors flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-1 text-[#35251F]/40 hover:text-rose-600 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
