import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONTACT } from '../data/products';
import {
  X,
  Star,
  Heart,
  ShoppingBag,
  Phone,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Check,
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    closeProductDetails,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    showToast,
  } = useStore();

  if (!selectedProduct) return null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>(
    selectedProduct.options && selectedProduct.options.length > 0
      ? selectedProduct.options[0]
      : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'care' | 'delivery'>('details');

  const isFavorited = isInWishlist(selectedProduct.id);
  const hasDiscount =
    !!selectedProduct.compareAtPriceNGN &&
    selectedProduct.compareAtPriceNGN > selectedProduct.priceNGN;

  const handleWhatsAppDirectOrder = () => {
    const text = encodeURIComponent(
      `Hello Kathryn Lynne Concierge! ✨\nI would like to order *${selectedProduct.name}*` +
      (selectedOption ? ` (${selectedProduct.optionsLabel}: ${selectedOption})` : '') +
      `\nQuantity: ${quantity}` +
      `\nPrice: ₦${(selectedProduct.priceNGN * quantity).toLocaleString()}` +
      `\nPlease let me know availability and delivery to my location.`
    );
    window.open(`https://wa.me/${STORE_CONTACT.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={closeProductDetails} />

      {/* Modal Dialog */}
      <div className="relative bg-[#FFF9F4] rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#35251F]/10 z-10 max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#35251F]/10 bg-white/70">
          <div className="flex items-center gap-2 text-xs text-[#35251F]/60">
            <span>Shop</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="capitalize">{selectedProduct.category}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#35251F] font-medium truncate max-w-[200px] sm:max-w-none">
              {selectedProduct.name}
            </span>
          </div>

          <button
            onClick={closeProductDetails}
            aria-label="Close product view"
            className="p-1.5 rounded-full hover:bg-[#F7EFE7] text-[#35251F]/70 hover:text-[#35251F] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Gallery Column */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-[#F7EFE7] border border-[#35251F]/10 shadow-xs">
                <img
                  src={selectedProduct.images[selectedImage] || selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  aria-label="Toggle wishlist"
                  className={`absolute top-3 right-3 p-2.5 rounded-full shadow-sm transition-colors ${
                    isFavorited ? 'bg-[#B86F7B] text-white' : 'bg-white/90 text-[#35251F] hover:text-[#B86F7B]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Thumbnails */}
              {selectedProduct.images.length > 1 && (
                <div className="flex items-center gap-3">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-20 aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx
                          ? 'border-[#B86F7B] ring-2 ring-[#B86F7B]/20'
                          : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Features Strip */}
              <div className="pt-4 grid grid-cols-2 gap-3 text-xs text-[#35251F]/75">
                <div className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-[#35251F]/5">
                  <Truck className="w-4 h-4 text-[#B86F7B] shrink-0" />
                  <span>Lagos & DHL Global Delivery</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-[#35251F]/5">
                  <ShieldCheck className="w-4 h-4 text-[#C5A46D] shrink-0" />
                  <span>100% Genuine & Inspected</span>
                </div>
              </div>
            </div>

            {/* Contiguous Purchase Module (Mandatory PDP rule from domain guide) */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Category & Rating */}
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A46D]">
                    {selectedProduct.subcategory}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs">
                    <div className="flex items-center text-[#C5A46D]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(selectedProduct.rating)
                              ? 'fill-[#C5A46D]'
                              : 'text-[#C5A46D]/40'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-mono font-medium text-[#35251F]">
                      {selectedProduct.rating.toFixed(1)}
                    </span>
                    <span className="text-[#35251F]/50">({selectedProduct.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-serif text-[#35251F] font-normal leading-tight">
                  {selectedProduct.name}
                </h2>

                {/* Pricing & Stock */}
                <div className="flex items-center justify-between py-2 border-y border-[#35251F]/10">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-bold font-mono text-[#35251F] tabular-nums">
                      {formatPrice(selectedProduct.priceNGN)}
                    </span>
                    {hasDiscount && (
                      <span className="text-sm font-mono text-[#35251F]/40 line-through tabular-nums">
                        {formatPrice(selectedProduct.compareAtPriceNGN!)}
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-200">
                    {selectedProduct.availability}
                  </span>
                </div>

                {/* Short Description */}
                <p className="text-sm text-[#35251F]/80 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Options / Variants Selector */}
                {selectedProduct.options && selectedProduct.options.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs font-medium text-[#35251F]">
                      <span>Select {selectedProduct.optionsLabel || 'Option'}:</span>
                      <span className="text-[#B86F7B] font-semibold">{selectedOption}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => setSelectedOption(option)}
                          className={`px-3 py-2 text-xs font-medium rounded-md border transition-all ${
                            selectedOption === option
                              ? 'border-[#B86F7B] bg-[#B86F7B] text-white shadow-xs'
                              : 'border-[#35251F]/20 bg-white text-[#35251F] hover:border-[#35251F]'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selector & Action Buttons */}
                <div className="pt-2 space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-medium text-[#35251F]">Quantity:</span>
                    <div className="flex items-center border border-[#35251F]/20 bg-white rounded-md">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="px-3 py-1.5 text-sm text-[#35251F] hover:bg-[#F7EFE7] disabled:opacity-30"
                      >
                        -
                      </button>
                      <span className="px-3 py-1.5 text-xs font-mono font-semibold min-w-[32px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-3 py-1.5 text-sm text-[#35251F] hover:bg-[#F7EFE7]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Primary Add to Bag Button */}
                  <button
                    onClick={() => {
                      addToCart(selectedProduct, quantity, selectedOption);
                      closeProductDetails();
                    }}
                    className="w-full py-3.5 px-6 rounded-md bg-[#35251F] hover:bg-[#B86F7B] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag · {formatPrice(selectedProduct.priceNGN * quantity)}</span>
                  </button>

                  {/* WhatsApp Direct Order Button */}
                  <button
                    onClick={handleWhatsAppDirectOrder}
                    className="w-full py-3 px-6 rounded-md bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Instant Order via WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* PDP Information Accordion / Tabs */}
              <div className="pt-4 border-t border-[#35251F]/10">
                <div className="flex border-b border-[#35251F]/10 gap-4 text-xs font-medium">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 transition-colors ${
                      activeTab === 'details'
                        ? 'border-b-2 border-[#B86F7B] text-[#B86F7B] font-semibold'
                        : 'text-[#35251F]/60 hover:text-[#35251F]'
                    }`}
                  >
                    Key Benefits
                  </button>
                  {selectedProduct.ingredientsOrMaterial && (
                    <button
                      onClick={() => setActiveTab('ingredients')}
                      className={`pb-2 transition-colors ${
                        activeTab === 'ingredients'
                          ? 'border-b-2 border-[#B86F7B] text-[#B86F7B] font-semibold'
                          : 'text-[#35251F]/60 hover:text-[#35251F]'
                      }`}
                    >
                      {selectedProduct.category === 'skincare' ? 'Ingredients' : 'Materials & Fabric'}
                    </button>
                  )}
                  {selectedProduct.howToUseOrCare && (
                    <button
                      onClick={() => setActiveTab('care')}
                      className={`pb-2 transition-colors ${
                        activeTab === 'care'
                          ? 'border-b-2 border-[#B86F7B] text-[#B86F7B] font-semibold'
                          : 'text-[#35251F]/60 hover:text-[#35251F]'
                      }`}
                    >
                      {selectedProduct.category === 'skincare' ? 'How to Apply' : 'Care & Fit'}
                    </button>
                  )}
                  <button
                    onClick={() => setActiveTab('delivery')}
                    className={`pb-2 transition-colors ${
                      activeTab === 'delivery'
                        ? 'border-b-2 border-[#B86F7B] text-[#B86F7B] font-semibold'
                        : 'text-[#35251F]/60 hover:text-[#35251F]'
                    }`}
                  >
                    Delivery
                  </button>
                </div>

                <div className="pt-3 text-xs text-[#35251F]/75 min-h-[70px]">
                  {activeTab === 'details' && (
                    <ul className="space-y-1.5 list-disc list-inside">
                      {selectedProduct.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  )}
                  {activeTab === 'ingredients' && (
                    <p className="leading-relaxed">
                      {selectedProduct.ingredientsOrMaterial}
                    </p>
                  )}
                  {activeTab === 'care' && (
                    <p className="leading-relaxed">
                      {selectedProduct.howToUseOrCare}
                    </p>
                  )}
                  {activeTab === 'delivery' && (
                    <div className="space-y-1 leading-relaxed">
                      <p>• <strong>Lagos:</strong> Same-day or Next-day dispatch (₦2,500 or Free over ₦50,000).</p>
                      <p>• <strong>Abuja & Nationwide Nigeria:</strong> 2–3 business days via verified courier.</p>
                      <p>• <strong>International:</strong> 3–5 business days worldwide via DHL Express with tracking.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
