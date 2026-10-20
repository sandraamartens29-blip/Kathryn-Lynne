import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONTACT } from '../data/products';
import { Truck, RotateCcw, Ruler, ShieldCheck, Phone, Check } from 'lucide-react';

export const PoliciesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shipping' | 'returns' | 'sizing'>('shipping');

  return (
    <div className="py-12 sm:py-20 bg-[#FFF9F4] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B86F7B]">
            Transparent Client Policies
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#35251F] font-normal tracking-tight">
            Shipping, Returns & Sizing
          </h1>
          <p className="text-xs sm:text-sm text-[#35251F]/70 max-w-xl mx-auto">
            Everything you need to know about our Nigeria dispatch, global DHL shipping, and exchange process.
          </p>
        </div>

        {/* Tab Controls (Clean Segmented) */}
        <div className="flex justify-center">
          <div className="flex p-1 bg-[#F7EFE7] rounded-lg border border-[#35251F]/10 gap-1">
            <button
              onClick={() => setActiveTab('shipping')}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'shipping'
                  ? 'bg-white text-[#35251F] font-semibold shadow-xs'
                  : 'text-[#35251F]/70 hover:text-[#35251F]'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-[#B86F7B]" />
              <span>Shipping & Delivery</span>
            </button>
            <button
              onClick={() => setActiveTab('returns')}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'returns'
                  ? 'bg-white text-[#35251F] font-semibold shadow-xs'
                  : 'text-[#35251F]/70 hover:text-[#35251F]'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#B86F7B]" />
              <span>Returns & Exchanges</span>
            </button>
            <button
              onClick={() => setActiveTab('sizing')}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'sizing'
                  ? 'bg-white text-[#35251F] font-semibold shadow-xs'
                  : 'text-[#35251F]/70 hover:text-[#35251F]'
              }`}
            >
              <Ruler className="w-3.5 h-3.5 text-[#B86F7B]" />
              <span>Sizing & Fit Guide</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#35251F]/10 shadow-xs space-y-6">
          {activeTab === 'shipping' && (
            <div className="space-y-6 text-xs sm:text-sm text-[#35251F]/80 leading-relaxed">
              <h2 className="font-serif text-2xl font-normal text-[#35251F]">
                Shipping & Delivery Timelines
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-[#F7EFE7] rounded-xl border border-[#35251F]/10 space-y-2">
                  <span className="font-semibold text-xs text-[#B86F7B] uppercase tracking-wider block">
                    Lagos Direct
                  </span>
                  <div className="font-serif text-lg text-[#35251F]">Within 24 Hours</div>
                  <p className="text-xs text-[#35251F]/70">
                    Complimentary on orders over ₦50,000 (Standard rate: ₦2,500). Island and Mainland covered.
                  </p>
                </div>

                <div className="p-4 bg-[#F7EFE7] rounded-xl border border-[#35251F]/10 space-y-2">
                  <span className="font-semibold text-xs text-[#B86F7B] uppercase tracking-wider block">
                    Abuja & Interstate
                  </span>
                  <div className="font-serif text-lg text-[#35251F]">2 – 3 Business Days</div>
                  <p className="text-xs text-[#35251F]/70">
                    Fully tracked door-to-door courier service across all 36 states (Standard rate: ₦4,000).
                  </p>
                </div>

                <div className="p-4 bg-[#F7EFE7] rounded-xl border border-[#35251F]/10 space-y-2">
                  <span className="font-semibold text-xs text-[#B86F7B] uppercase tracking-wider block">
                    Worldwide DHL
                  </span>
                  <div className="font-serif text-lg text-[#35251F]">3 – 5 Business Days</div>
                  <p className="text-xs text-[#35251F]/70">
                    Express air courier to UK, USA, Canada, Europe, UAE, Ghana, and internationally.
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#35251F]/10">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-[#35251F]">
                  Order Tracking
                </h3>
                <p>
                  As soon as your package leaves our dispatch atelier, you will receive an SMS and email notification with your tracking link. You can also message our WhatsApp concierge anytime with your order reference number for live dispatch status.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-6 text-xs sm:text-sm text-[#35251F]/80 leading-relaxed">
              <h2 className="font-serif text-2xl font-normal text-[#35251F]">
                Returns & Exchange Policy
              </h2>

              <p>
                We want you to feel confident and completely delighted with every Kathryn Lynne purchase. If your fashion or footwear item doesn't fit exactly as desired, we offer exchanges within <strong>7 days</strong> of delivery.
              </p>

              <div className="space-y-3 pt-2">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-[#35251F]">
                  Conditions for Exchange:
                </h3>
                <ul className="space-y-2 list-none">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Clothing & Dresses:</strong> Must be unworn, unwashed, and with all original tags attached.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Shoes & Footwear:</strong> Must be tried on clean carpeted surfaces with zero scuffs or outsole wear, in original Kathryn Lynne box and dust bag.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Skincare & Beauty:</strong> Due to hygiene and cosmetic regulatory standards, skincare items must have their tamper-evident seal intact.</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-[#F7EFE7] rounded-xl border border-[#35251F]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-xs text-[#35251F] uppercase tracking-wider">
                    Need to Exchange a Size?
                  </h4>
                  <p className="text-xs text-[#35251F]/70">
                    Contact our WhatsApp concierge directly with your order number and desired replacement size.
                  </p>
                </div>
                <a
                  href={STORE_CONTACT.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors shadow-xs shrink-0 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Start WhatsApp Exchange</span>
                </a>
              </div>
            </div>
          )}

          {activeTab === 'sizing' && (
            <div className="space-y-6 text-xs sm:text-sm text-[#35251F]/80 leading-relaxed">
              <h2 className="font-serif text-2xl font-normal text-[#35251F]">
                Kathryn Lynne Size & Fit Guide
              </h2>

              {/* Shoes Table */}
              <div className="space-y-2">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-[#35251F]">
                  Footwear Size Conversions
                </h3>
                <div className="overflow-x-auto border border-[#35251F]/10 rounded-lg">
                  <table className="w-full text-left text-xs font-mono tabular-nums divide-y divide-[#35251F]/10">
                    <thead className="bg-[#F7EFE7] text-[#35251F] font-sans font-semibold">
                      <tr>
                        <th className="p-2.5">EU Size</th>
                        <th className="p-2.5">UK Size</th>
                        <th className="p-2.5">US Size</th>
                        <th className="p-2.5">Foot Length (cm)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#35251F]/5 bg-white text-[#35251F]/80">
                      <tr><td className="p-2.5 font-bold">37</td><td className="p-2.5">UK 4</td><td className="p-2.5">US 6.5</td><td className="p-2.5">23.5 cm</td></tr>
                      <tr><td className="p-2.5 font-bold">38</td><td className="p-2.5">UK 5</td><td className="p-2.5">US 7.5</td><td className="p-2.5">24.2 cm</td></tr>
                      <tr><td className="p-2.5 font-bold">39</td><td className="p-2.5">UK 6</td><td className="p-2.5">US 8.5</td><td className="p-2.5">25.0 cm</td></tr>
                      <tr><td className="p-2.5 font-bold">40</td><td className="p-2.5">UK 7</td><td className="p-2.5">US 9.5</td><td className="p-2.5">25.7 cm</td></tr>
                      <tr><td className="p-2.5 font-bold">41</td><td className="p-2.5">UK 8</td><td className="p-2.5">US 10.5</td><td className="p-2.5">26.4 cm</td></tr>
                      <tr><td className="p-2.5 font-bold">42</td><td className="p-2.5">UK 9</td><td className="p-2.5">US 11.5</td><td className="p-2.5">27.0 cm</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Apparel Table */}
              <div className="space-y-2 pt-4">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-[#35251F]">
                  Women's Fashion Size Conversions
                </h3>
                <div className="overflow-x-auto border border-[#35251F]/10 rounded-lg">
                  <table className="w-full text-left text-xs font-mono tabular-nums divide-y divide-[#35251F]/10">
                    <thead className="bg-[#F7EFE7] text-[#35251F] font-sans font-semibold">
                      <tr>
                        <th className="p-2.5">Standard Size</th>
                        <th className="p-2.5">UK Size</th>
                        <th className="p-2.5">US Size</th>
                        <th className="p-2.5">Bust (inches)</th>
                        <th className="p-2.5">Waist (inches)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#35251F]/5 bg-white text-[#35251F]/80">
                      <tr><td className="p-2.5 font-bold font-sans">Small (S)</td><td className="p-2.5">UK 8</td><td className="p-2.5">US 4</td><td className="p-2.5">33 - 34"</td><td className="p-2.5">26 - 27"</td></tr>
                      <tr><td className="p-2.5 font-bold font-sans">Medium (M)</td><td className="p-2.5">UK 10</td><td className="p-2.5">US 6</td><td className="p-2.5">35 - 36"</td><td className="p-2.5">28 - 29"</td></tr>
                      <tr><td className="p-2.5 font-bold font-sans">Large (L)</td><td className="p-2.5">UK 12</td><td className="p-2.5">US 8</td><td className="p-2.5">37 - 39"</td><td className="p-2.5">30 - 32"</td></tr>
                      <tr><td className="p-2.5 font-bold font-sans">X-Large (XL)</td><td className="p-2.5">UK 14 - 16</td><td className="p-2.5">US 10 - 12</td><td className="p-2.5">40 - 42"</td><td className="p-2.5">33 - 35"</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
