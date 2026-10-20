import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONTACT } from '../data/products';
import {
  X,
  CheckCircle,
  Truck,
  CreditCard,
  Building2,
  Phone,
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartSubtotalNGN,
    discountPercent,
    discountAmountNGN,
    cartTotalNGN,
    formatPrice,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    showToast,
  } = useStore();

  const [step, setStep] = useState<'details' | 'success'>('details');
  const [orderNumber, setOrderNumber] = useState('');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [stateRegion, setStateRegion] = useState('Lagos');
  const [country, setCountry] = useState('Nigeria');
  const [deliveryMethod, setDeliveryMethod] = useState<'lagos' | 'nationwide' | 'international'>('lagos');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'whatsapp'>('card');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isCheckoutOpen) return null;

  // Delivery Fees
  const getDeliveryFee = () => {
    if (deliveryMethod === 'lagos') {
      return cartSubtotalNGN >= 50000 ? 0 : 2500;
    }
    if (deliveryMethod === 'nationwide') return 4000;
    if (deliveryMethod === 'international') return 28000;
    return 2500;
  };

  const deliveryFee = getDeliveryFee();
  const grandTotal = cartTotalNGN + deliveryFee;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';
    if (!phone.trim()) errs.phone = 'Phone / WhatsApp number is required';
    if (!address.trim()) errs.address = 'Street delivery address is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const generatedOrder = `KL-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrder);
    setStep('success');
    clearCart();
    showToast(`Order ${generatedOrder} placed successfully!`);
  };

  const sendConfirmationToWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hello Kathryn Lynne Concierge! ✨\nI just completed an order on your website:\n` +
      `*Order #:* ${orderNumber}\n` +
      `*Name:* ${fullName}\n` +
      `*Phone:* ${phone}\n` +
      `*Delivery Address:* ${address}, ${stateRegion}, ${country}\n` +
      `*Total Paid/Due:* ₦${grandTotal.toLocaleString()}\n` +
      `*Payment Method:* ${paymentMethod === 'card' ? 'Online Card/Paystack' : paymentMethod === 'transfer' ? 'Direct Bank Transfer' : 'WhatsApp Concierge Checkout'}\n\n` +
      `Please confirm receipt and dispatch schedule.`
    );
    window.open(`https://wa.me/${STORE_CONTACT.whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Background click */}
      <div className="fixed inset-0" onClick={() => setIsCheckoutOpen(false)} />

      <div className="relative bg-[#FFF9F4] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#35251F]/10 z-10 my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#35251F]/10 bg-white/70">
          <div>
            <h2 className="font-serif text-lg font-normal text-[#35251F]">
              {step === 'details' ? 'Complete Your Luxury Order' : 'Order Confirmed'}
            </h2>
            <span className="text-[11px] text-[#C5A46D] uppercase tracking-wider font-medium">
              Kathryn Lynne Secure Checkout
            </span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            aria-label="Close checkout"
            className="p-1.5 rounded-full hover:bg-[#F7EFE7] text-[#35251F]/70 hover:text-[#35251F]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'details' ? (
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
            {/* Delivery Information */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#35251F] border-b border-[#35251F]/10 pb-1">
                1. Delivery & Contact Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#35251F] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Amina Bello"
                    className="w-full px-3 py-2 text-xs border border-[#35251F]/20 rounded-md bg-white focus:outline-none focus:border-[#B86F7B]"
                  />
                  {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#35251F] mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +234 812 345 6789"
                    className="w-full px-3 py-2 text-xs border border-[#35251F]/20 rounded-md bg-white focus:outline-none focus:border-[#B86F7B]"
                  />
                  {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#35251F] mb-1">
                  Email Address (for order tracking) *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="amina@example.com"
                  className="w-full px-3 py-2 text-xs border border-[#35251F]/20 rounded-md bg-white focus:outline-none focus:border-[#B86F7B]"
                />
                {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#35251F] mb-1">
                  Street Delivery Address & Landmark *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, Building No., Apartment, Landmark"
                  className="w-full px-3 py-2 text-xs border border-[#35251F]/20 rounded-md bg-white focus:outline-none focus:border-[#B86F7B]"
                />
                {errors.address && <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#35251F] mb-1">
                    State / Region
                  </label>
                  <select
                    value={stateRegion}
                    onChange={(e) => {
                      setStateRegion(e.target.value);
                      if (e.target.value === 'Lagos') {
                        setDeliveryMethod('lagos');
                      } else {
                        setDeliveryMethod('nationwide');
                      }
                    }}
                    className="w-full px-3 py-2 text-xs border border-[#35251F]/20 rounded-md bg-white focus:outline-none focus:border-[#B86F7B]"
                  >
                    <option value="Lagos">Lagos State</option>
                    <option value="Abuja">Abuja (FCT)</option>
                    <option value="Rivers">Rivers (Port Harcourt)</option>
                    <option value="Oyo">Oyo (Ibadan)</option>
                    <option value="Kano">Kano</option>
                    <option value="Enugu">Enugu</option>
                    <option value="Delta">Delta (Asaba / Warri)</option>
                    <option value="Ogun">Ogun State</option>
                    <option value="Other Nigeria">Other Nigerian States</option>
                    <option value="International">International Destination</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#35251F] mb-1">
                    Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                      if (e.target.value !== 'Nigeria') {
                        setDeliveryMethod('international');
                      }
                    }}
                    className="w-full px-3 py-2 text-xs border border-[#35251F]/20 rounded-md bg-white focus:outline-none focus:border-[#B86F7B]"
                  >
                    <option value="Nigeria">Nigeria</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Ghana">Ghana</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Other">Other International Country</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Delivery Method Selection */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#35251F] border-b border-[#35251F]/10 pb-1">
                2. Delivery Service
              </h3>
              <div className="space-y-2">
                <label className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                  deliveryMethod === 'lagos' ? 'border-[#B86F7B] bg-white' : 'border-[#35251F]/15 bg-[#FFF9F4]'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === 'lagos'}
                      onChange={() => setDeliveryMethod('lagos')}
                      className="accent-[#B86F7B]"
                    />
                    <div>
                      <span className="block text-xs font-semibold text-[#35251F]">
                        Lagos Next-Day Direct Courier
                      </span>
                      <span className="text-[11px] text-[#35251F]/60">
                        Doorstep delivery within Lagos mainland and island
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#35251F]">
                    {cartSubtotalNGN >= 50000 ? 'Free' : formatPrice(2500)}
                  </span>
                </label>

                <label className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                  deliveryMethod === 'nationwide' ? 'border-[#B86F7B] bg-white' : 'border-[#35251F]/15 bg-[#FFF9F4]'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === 'nationwide'}
                      onChange={() => setDeliveryMethod('nationwide')}
                      className="accent-[#B86F7B]"
                    />
                    <div>
                      <span className="block text-xs font-semibold text-[#35251F]">
                        Abuja & Nationwide Interstate Courier
                      </span>
                      <span className="text-[11px] text-[#35251F]/60">
                        2–3 business days fully tracked dispatch
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#35251F]">
                    {formatPrice(4000)}
                  </span>
                </label>

                <label className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                  deliveryMethod === 'international' ? 'border-[#B86F7B] bg-white' : 'border-[#35251F]/15 bg-[#FFF9F4]'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === 'international'}
                      onChange={() => setDeliveryMethod('international')}
                      className="accent-[#B86F7B]"
                    />
                    <div>
                      <span className="block text-xs font-semibold text-[#35251F]">
                        DHL Express Worldwide
                      </span>
                      <span className="text-[11px] text-[#35251F]/60">
                        3–5 business days to UK, US, Canada, Europe
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#35251F]">
                    {formatPrice(28000)}
                  </span>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#35251F] border-b border-[#35251F]/10 pb-1">
                3. Payment Preference
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#B86F7B] bg-white shadow-xs ring-1 ring-[#B86F7B]'
                      : 'border-[#35251F]/15 bg-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#B86F7B] mb-2" />
                  <span className="block text-xs font-semibold text-[#35251F]">Card / Paystack</span>
                  <span className="text-[10px] text-[#35251F]/60">Mastercard, Visa, Verve</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('transfer')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    paymentMethod === 'transfer'
                      ? 'border-[#B86F7B] bg-white shadow-xs ring-1 ring-[#B86F7B]'
                      : 'border-[#35251F]/15 bg-white'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-[#C5A46D] mb-2" />
                  <span className="block text-xs font-semibold text-[#35251F]">Bank Transfer</span>
                  <span className="text-[10px] text-[#35251F]/60">Instant account verification</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('whatsapp')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    paymentMethod === 'whatsapp'
                      ? 'border-[#25D366] bg-white shadow-xs ring-1 ring-[#25D366]'
                      : 'border-[#35251F]/15 bg-white'
                  }`}
                >
                  <Phone className="w-4 h-4 text-[#25D366] mb-2" />
                  <span className="block text-xs font-semibold text-[#35251F]">WhatsApp VIP</span>
                  <span className="text-[10px] text-[#35251F]/60">Assisted personal checkout</span>
                </button>
              </div>

              {paymentMethod === 'transfer' && (
                <div className="p-3 bg-[#F7EFE7] rounded-md border border-[#35251F]/10 text-xs space-y-1">
                  <p className="font-semibold text-[#35251F]">Kathryn Lynne Official Store Account:</p>
                  <p className="text-[#35251F]/80">Bank: <strong>Guaranty Trust Bank (GTBank)</strong></p>
                  <p className="text-[#35251F]/80">Account Name: <strong>KATHRYN LYNNE LUXURY VENTURES</strong></p>
                  <p className="text-[#35251F]/80">Account Number: <strong className="font-mono">0129384756</strong></p>
                </div>
              )}
            </div>

            {/* Order Total Review */}
            <div className="p-4 bg-white rounded-lg border border-[#35251F]/10 space-y-2 text-xs">
              <div className="flex justify-between text-[#35251F]/70">
                <span>Subtotal ({cart.length} items)</span>
                <span className="font-mono font-medium">{formatPrice(cartSubtotalNGN)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>VIP Discount ({discountPercent}%)</span>
                  <span className="font-mono">-{formatPrice(discountAmountNGN)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#35251F]/70">
                <span>Delivery Fee</span>
                <span className="font-mono font-medium">
                  {deliveryFee === 0 ? 'Complimentary' : formatPrice(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#35251F] pt-2 border-t border-[#35251F]/10">
                <span>Total to Pay</span>
                <span className="font-mono text-[#B86F7B] text-base">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-md bg-[#35251F] hover:bg-[#B86F7B] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-[#C5A46D]" />
              <span>Confirm & Place Order · {formatPrice(grandTotal)}</span>
            </button>
          </form>
        ) : (
          /* Order Confirmation View */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#B86F7B] font-semibold">
                Thank You For Your Order
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#35251F]">
                Order Confirmed — Preparing Shipment
              </h3>
              <p className="text-xs font-mono text-[#35251F]/70">
                Reference ID: <strong className="text-[#35251F] text-sm">{orderNumber}</strong>
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#35251F]/10 text-left text-xs space-y-3 max-w-md mx-auto">
              <div className="flex justify-between pb-2 border-b border-[#35251F]/10">
                <span className="text-[#35251F]/60">Recipient</span>
                <strong className="text-[#35251F]">{fullName}</strong>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#35251F]/10">
                <span className="text-[#35251F]/60">Destination</span>
                <span className="text-[#35251F] text-right truncate max-w-[200px]">
                  {address}, {stateRegion}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#35251F]/10">
                <span className="text-[#35251F]/60">Total Amount</span>
                <strong className="text-[#B86F7B] font-mono text-sm">{formatPrice(grandTotal)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#35251F]/60">Dispatch Estimate</span>
                <span className="text-[#35251F] font-medium">Within 24 Hours</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
              <button
                onClick={sendConfirmationToWhatsApp}
                className="flex-1 py-3 px-4 rounded-md bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Notify via WhatsApp</span>
              </button>

              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="flex-1 py-3 px-4 rounded-md border border-[#35251F] text-[#35251F] hover:bg-[#35251F] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
