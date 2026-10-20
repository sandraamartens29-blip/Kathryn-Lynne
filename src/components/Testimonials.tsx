import React, { useState } from 'react';
import { REVIEWS } from '../data/products';
import { Star, CheckCircle, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FFF9F4] border-b border-[#35251F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#B86F7B] block mb-2">
            Verified Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#35251F] font-normal tracking-tight">
            Loved Across Nigeria & Worldwide
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#35251F]/70">
            Real feedback from clients in Lagos, Abuja, London, and Port Harcourt who choose Kathryn Lynne.
          </p>
        </div>

        {/* Testimonials Grid (Desktop: 4 columns or carousel) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-xl border border-[#35251F]/10 shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow"
            >
              <div className="space-y-3">
                {/* Star Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C5A46D] text-[#C5A46D]" />
                  ))}
                </div>

                {/* Review Title */}
                <h3 className="font-serif text-base font-normal text-[#35251F] leading-snug">
                  "{review.title}"
                </h3>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-[#35251F]/75 leading-relaxed">
                  {review.comment}
                </p>
              </div>

              {/* Author & Verification Meta */}
              <div className="mt-6 pt-4 border-t border-[#35251F]/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#35251F]">
                    {review.author}
                  </span>
                  {review.verifiedPurchase && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#B86F7B] font-medium">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-[#35251F]/60 flex items-center justify-between">
                  <span>{review.location}</span>
                  <span>{review.date}</span>
                </div>

                <div className="text-[11px] text-[#C5A46D] truncate pt-1 font-medium">
                  {review.productName}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-16 pt-10 border-t border-[#35251F]/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="block text-2xl font-serif font-normal text-[#35251F]">100%</span>
            <span className="text-xs uppercase tracking-wider text-[#35251F]/70 font-medium">Authentic Formulations</span>
          </div>
          <div className="space-y-1">
            <span className="block text-2xl font-serif font-normal text-[#35251F]">24–48h</span>
            <span className="text-xs uppercase tracking-wider text-[#35251F]/70 font-medium">Lagos & Abuja Dispatch</span>
          </div>
          <div className="space-y-1">
            <span className="block text-2xl font-serif font-normal text-[#35251F]">DHL Express</span>
            <span className="text-xs uppercase tracking-wider text-[#35251F]/70 font-medium">Worldwide Tracked</span>
          </div>
          <div className="space-y-1">
            <span className="block text-2xl font-serif font-normal text-[#35251F]">Direct Concierge</span>
            <span className="text-xs uppercase tracking-wider text-[#35251F]/70 font-medium">VIP WhatsApp Care</span>
          </div>
        </div>
      </div>
    </section>
  );
};
