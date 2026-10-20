import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Phone,
  Tag,
  Check,
  Truck,
  Sparkles,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    formatPrice,
    cartCount,
    cartSubtotalNGN,
    discountCode,
    discountPercent,
    discountAmountNGN,
    cartTotalNGN,
    freeShippingThresholdNGN,
    applyDiscount,
    removeDiscount,
    getWhatsAppOrderUrl,
    navigateTo,
  } = useStore();

  const [inputCode, setInputCode] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(
    100,
    Math.round((cartSubtotalNGN / freeShippingThresholdNGN) * 100)
  );
  const remainingForFreeShipping = Math.max(0, freeShippingThresholdNGN - cartSubtotalNGN);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!inputCode.trim()) return;
    const res = applyDiscount(inputCode);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setInputCode('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppOrder = () => {
    const url = getWhatsAppOrderUrl();
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={() => setIsCartOpen(false)} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-[#FFF9F4] h-full shadow-2xl flex flex-col z-10 border-l border-[#35251F]/10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#35251F]/10 bg-white/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#B86F7B]" />
            <h2 className="font-serif text-lg font-normal text-[#35251F]">
              Your Shopping Bag
            </h2>
            <span className="text-xs font-mono font-semibold text-[#B86F7B] bg-[#F7EFE7] px-2 py-0.5 rounded-full">
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="p-1.5 rounded-full hover:bg-[#F7EFE7] text-[#35251F]/70 hover:text-[#35251F] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-6 py-3 bg-[#F7EFE7] border-b border-[#35251F]/10 text-xs">
          <div className="flex items-center justify-between mb-1.5 font-medium text-[#35251F]">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#B86F7B]" />
              {remainingForFreeShipping > 0 ? (
                <span>
                  Add <strong className="font-mono text-[#B86F7B]">{formatPrice(remainingForFreeShipping)}</strong> more for Free Lagos Delivery
                </span>
              ) : (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Unlocked Complimentary Lagos Delivery!
                </span>
              )}
            </span>
            <span className="font-mono text-[11px]">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#35251F]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#B86F7B] transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 rounded-full bg-[#F7EFE7] flex items-center justify-center text-[#B86F7B]">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="font-serif text-lg font-normal text-[#35251F]">
                Your bag is currently empty
              </h3>
              <p className="text-xs text-[#35251F]/60 max-w-xs">
                Explore our curated skincare, luxury fashion, and elegant shoes to find your new favorites.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('shop', 'all');
                }}
                className="px-6 py-2.5 bg-[#35251F] hover:bg-[#B86F7B] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
              >
                Shop All Collections
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 bg-white rounded-lg border border-[#35251F]/10 shadow-xs relative group"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-md overflow-hidden bg-[#F7EFE7] shrink-0 border border-[#35251F]/5">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="pr-6">
                    <span className="text-[10px] uppercase tracking-wider text-[#C5A46D] font-medium block">
                      {item.product.subcategory}
                    </span>
                    <h4 className="text-xs font-semibold text-[#35251F] truncate leading-tight">
                      {item.product.name}
                    </h4>
                    {item.selectedOption && (
                      <span className="text-[11px] text-[#35251F]/60 block mt-0.5">
                        {item.selectedOption}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#35251F]/5">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-[#35251F]/20 rounded bg-[#FFF9F4]">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-xs text-[#35251F] hover:bg-[#F7EFE7]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-semibold min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-xs text-[#35251F] hover:bg-[#F7EFE7]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Line Total */}
                    <span className="text-xs font-semibold font-mono tabular-nums text-[#35251F]">
                      {formatPrice(item.product.priceNGN * item.quantity)}
                    </span>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                  className="absolute top-2.5 right-2.5 text-[#35251F]/40 hover:text-rose-600 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Area */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-[#35251F]/10 space-y-4">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. KATHRYN10)"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs border border-[#35251F]/20 rounded-md focus:outline-none focus:border-[#B86F7B] uppercase font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#F7EFE7] hover:bg-[#35251F] hover:text-white text-xs font-semibold text-[#35251F] rounded-md transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <span className="text-[11px] text-rose-600 block">{promoError}</span>
              )}
              {discountCode && (
                <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  <span className="flex items-center gap-1 font-mono font-semibold">
                    <Tag className="w-3 h-3" />
                    {discountCode} (-{discountPercent}%)
                  </span>
                  <button
                    type="button"
                    onClick={removeDiscount}
                    className="text-[11px] underline hover:text-emerald-900"
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#35251F]/70 pt-2 border-t border-[#35251F]/10">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[#35251F] font-semibold tabular-nums">
                  {formatPrice(cartSubtotalNGN)}
                </span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>VIP Discount ({discountPercent}%)</span>
                  <span className="font-mono tabular-nums">
                    -{formatPrice(discountAmountNGN)}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span className="text-[#35251F] font-medium">
                  {remainingForFreeShipping === 0 ? 'Complimentary (Lagos)' : 'Calculated at checkout'}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-[#35251F] pt-2 border-t border-[#35251F]/10">
                <span className="font-serif">Total</span>
                <span className="font-mono tabular-nums text-[#B86F7B]">
                  {formatPrice(cartTotalNGN)}
                </span>
              </div>
            </div>

            {/* Checkout Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3 px-6 rounded-md bg-[#35251F] hover:bg-[#B86F7B] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-2.5 px-6 rounded-md bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Instant Order via WhatsApp</span>
              </button>
            </div>

            <div className="text-[11px] text-center text-[#35251F]/50 flex items-center justify-center gap-2">
              <Sparkles className="w-3 h-3 text-[#C5A46D]" />
              <span>100% Genuine · Nigeria & Worldwide Tracked Dispatch</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
