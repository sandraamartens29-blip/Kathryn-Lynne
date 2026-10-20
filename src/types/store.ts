export type ProductCategory = 'skincare' | 'fashion' | 'shoes';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  subcategory: string;
  priceNGN: number;
  compareAtPriceNGN?: number;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  availability: 'In Stock' | 'Limited Run' | 'Pre-order';
  images: string[];
  description: string;
  benefits: string[];
  ingredientsOrMaterial?: string;
  howToUseOrCare?: string;
  optionsLabel?: string; // 'Size' | 'Shade' | 'Volume'
  options?: string[];
  rating: number;
  reviewCount: number;
  sku: string;
  shopifyVariantId?: string;
}

export interface CartItem {
  id: string; // unique item id (productId + selectedOption)
  product: Product;
  quantity: number;
  selectedOption?: string;
}

export type CurrencyCode = 'NGN' | 'USD' | 'GBP' | 'EUR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  label: string;
  rateFromNGN: number; // Multiply NGN price by this to get local currency
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  productName: string;
}

export interface LeadSubscriber {
  email: string;
  source: string;
  discountCode: string;
  date: string;
}
