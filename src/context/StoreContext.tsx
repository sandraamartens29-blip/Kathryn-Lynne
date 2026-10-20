import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CurrencyCode } from '../types/store';
import { CURRENCIES, PRODUCTS, STORE_CONTACT } from '../data/products';

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[];
  currency: CurrencyCode;
  activePage: 'home' | 'shop' | 'about' | 'contact' | 'policies';
  activeCategoryFilter: string;
  selectedProduct: Product | null;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isWishlistOpen: boolean;
  isCheckoutOpen: boolean;
  isShopifyInfoOpen: boolean;
  discountCode: string | null;
  discountPercent: number;
  toastMessage: string | null;

  // Actions
  setCurrency: (code: CurrencyCode) => void;
  addToCart: (product: Product, quantity?: number, selectedOption?: string) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  applyDiscount: (code: string) => { success: boolean; message: string };
  removeDiscount: () => void;
  navigateTo: (page: 'home' | 'shop' | 'about' | 'contact' | 'policies', category?: string) => void;
  openProductDetails: (product: Product) => void;
  closeProductDetails: () => void;
  setIsCartOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsShopifyInfoOpen: (open: boolean) => void;
  showToast: (msg: string) => void;

  // Calculations
  cartCount: number;
  cartSubtotalNGN: number;
  discountAmountNGN: number;
  cartTotalNGN: number;
  freeShippingThresholdNGN: number;
  formatPrice: (priceInNGN: number) => string;
  getWhatsAppOrderUrl: (note?: string) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD_NGN = 50000;

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem('kl_currency');
      return (saved as CurrencyCode) || 'NGN';
    } catch {
      return 'NGN';
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kl_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse cart storage', e);
    }
    // Default starter item for immediate demo convenience
    return [
      {
        id: 'kl-skin-01-30ml',
        product: PRODUCTS[0],
        quantity: 1,
        selectedOption: '30ml / 1.0 fl oz',
      },
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kl_wishlist');
      return saved ? JSON.parse(saved) : ['kl-fsh-01', 'kl-sh-01'];
    } catch {
      return ['kl-fsh-01', 'kl-sh-01'];
    }
  });

  const [activePage, setActivePage] = useState<'home' | 'shop' | 'about' | 'contact' | 'policies'>('home');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isShopifyInfoOpen, setIsShopifyInfoOpen] = useState(false);

  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('kl_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('kl_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('kl_currency', currency);
    } catch (e) {
      console.error(e);
    }
  }, [currency]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    showToast(`Currency updated to ${CURRENCIES[code].label}`);
  };

  const formatPrice = (priceInNGN: number): string => {
    const config = CURRENCIES[currency] || CURRENCIES.NGN;
    const converted = priceInNGN * config.rateFromNGN;

    if (currency === 'NGN') {
      return `${config.symbol}${Math.round(converted).toLocaleString('en-NG')}`;
    }
    return `${config.symbol}${converted.toFixed(2)}`;
  };

  const addToCart = (product: Product, quantity = 1, selectedOption?: string) => {
    const option = selectedOption || (product.options && product.options.length > 0 ? product.options[0] : undefined);
    const itemId = `${product.id}-${option || 'default'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, product, quantity, selectedOption: option }];
    });

    showToast(`Added "${product.name}" to your bag`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from shopping bag');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from your wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyDiscount = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'KATHRYN10' || clean === 'WELCOME10') {
      setDiscountCode(clean);
      setDiscountPercent(10);
      showToast('10% VIP Discount applied successfully!');
      return { success: true, message: '10% discount applied to your order!' };
    }
    if (clean === 'VIP15') {
      setDiscountCode(clean);
      setDiscountPercent(15);
      showToast('15% Exclusive Discount applied!');
      return { success: true, message: '15% discount applied!' };
    }
    return { success: false, message: 'Invalid or expired promotional code' };
  };

  const removeDiscount = () => {
    setDiscountCode(null);
    setDiscountPercent(0);
    showToast('Discount removed');
  };

  const navigateTo = (page: 'home' | 'shop' | 'about' | 'contact' | 'policies', category = 'all') => {
    setActivePage(page);
    setActiveCategoryFilter(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotalNGN = cart.reduce(
    (total, item) => total + item.product.priceNGN * item.quantity,
    0
  );

  const discountAmountNGN = (cartSubtotalNGN * discountPercent) / 100;
  const cartTotalNGN = Math.max(0, cartSubtotalNGN - discountAmountNGN);

  const getWhatsAppOrderUrl = (note = '') => {
    const lines = [
      'Hello Kathryn Lynne Concierge! ✨',
      'I would like to place an order from your online store:\n',
    ];

    cart.forEach((item, index) => {
      lines.push(
        `${index + 1}. *${item.product.name}*` +
        (item.selectedOption ? ` (${item.selectedOption})` : '') +
        ` × ${item.quantity} — ₦${(item.product.priceNGN * item.quantity).toLocaleString()}`
      );
    });

    lines.push(`\n*Subtotal:* ₦${cartSubtotalNGN.toLocaleString()}`);
    if (discountPercent > 0) {
      lines.push(`*Discount (${discountPercent}%):* -₦${discountAmountNGN.toLocaleString()}`);
      lines.push(`*Total:* ₦${cartTotalNGN.toLocaleString()}`);
    } else {
      lines.push(`*Total:* ₦${cartTotalNGN.toLocaleString()}`);
    }

    if (note) {
      lines.push(`\n*Delivery Note/Address:* ${note}`);
    }

    lines.push('\nPlease advise on bank transfer or payment link details and delivery timeline. Thank you!');

    const encoded = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${STORE_CONTACT.whatsappNumber}?text=${encoded}`;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        currency,
        activePage,
        activeCategoryFilter,
        selectedProduct,
        isCartOpen,
        isSearchOpen,
        isWishlistOpen,
        isCheckoutOpen,
        isShopifyInfoOpen,
        discountCode,
        discountPercent,
        toastMessage,
        setCurrency,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyDiscount,
        removeDiscount,
        navigateTo,
        openProductDetails,
        closeProductDetails,
        setIsCartOpen,
        setIsSearchOpen,
        setIsWishlistOpen,
        setIsCheckoutOpen,
        setIsShopifyInfoOpen,
        showToast,
        cartCount,
        cartSubtotalNGN,
        discountAmountNGN,
        cartTotalNGN,
        freeShippingThresholdNGN: FREE_SHIPPING_THRESHOLD_NGN,
        formatPrice,
        getWhatsAppOrderUrl,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
