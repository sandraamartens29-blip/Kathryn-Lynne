import React, { useState } from 'react';
import { STORE_CONTACT } from '../data/products';
import { useStore } from '../context/StoreContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product / Sizing Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setSubmitted(true);
    showToast('Your message has been sent to Kathryn Lynne Concierge!');
  };

  const faqs = [
    {
      q: 'Can I order directly through WhatsApp?',
      a: 'Yes, absolutely! We love assisting clients via WhatsApp. You can tap the "Chat on WhatsApp" button or browse products and tap "Order via WhatsApp" to share your chosen items, sizes, and delivery address with our personal styling team.',
    },
    {
      q: 'How fast is delivery within Nigeria?',
      a: 'Lagos orders are dispatched within 24 hours (same-day delivery is available for morning orders). Abuja and other Nigerian states arrive in 2–3 business days via verified domestic express couriers.',
    },
    {
      q: 'Do you ship to international addresses (UK, US, Canada, etc.)?',
      a: 'Yes! International orders are dispatched via DHL Express Worldwide with complete end-to-end tracking. Typical delivery takes 3–5 business days.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept Mastercard, Visa, and Verve debit cards (via secure Paystack/Flutterwave gateway), direct bank transfer to our official GTBank corporate account, and Shopify-integrated checkout.',
    },
    {
      q: 'How do I choose the correct shoe and clothing size?',
      a: 'All our shoe sizes are listed in standard European & UK conversions (EU 37 = UK 4, EU 38 = UK 5, etc.) with width details. Our fashion pieces feature adjustable wraps and accurate bust/waist measurements. Contact our WhatsApp concierge for tailored fit recommendations.',
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-[#FFF9F4] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#B86F7B]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>Client Services</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#35251F] font-normal tracking-tight">
            Contact Kathryn Lynne Concierge
          </h1>
          <p className="text-sm sm:text-base text-[#35251F]/70 leading-relaxed">
            Have questions about a formula, dress fit, or shipment status? We are here to help.
          </p>
        </div>

        {/* WhatsApp VIP Card */}
        <div className="bg-gradient-to-r from-[#25D366] to-[#1ebe5d] text-white rounded-2xl p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest font-semibold bg-white/20 px-3 py-1 rounded-full inline-block">
              Immediate Assistance
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-normal">
              Direct VIP WhatsApp Concierge
            </h2>
            <p className="text-xs sm:text-sm text-white/90 max-w-xl">
              Chat directly with our styling consultants for real-time sizing recommendations, instant bank transfer details, and same-day Lagos dispatch.
            </p>
          </div>

          <a
            href={STORE_CONTACT.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-white text-[#25D366] hover:bg-[#F7EFE7] rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-md shrink-0 flex items-center gap-2"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp Now</span>
          </a>
        </div>

        {/* Contact Grid: Form + Dispatch Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#35251F]/10 shadow-xs">
            <h3 className="font-serif text-2xl font-normal text-[#35251F] mb-1">
              Send an Inquiry
            </h3>
            <p className="text-xs text-[#35251F]/60 mb-6">
              Fill in your details and our team will get back to you within 2 business hours.
            </p>

            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-[#F7EFE7] rounded-xl border border-[#35251F]/10">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl text-[#35251F]">Message Received</h4>
                <p className="text-xs text-[#35251F]/70 max-w-sm mx-auto">
                  Thank you, <strong>{name}</strong>. Our concierge has received your request and will respond to <strong>{email}</strong> promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-[#35251F] text-white text-xs rounded font-medium"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#35251F] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sandra Martens"
                      className="w-full px-3 py-2 text-xs border border-[#35251F]/20 rounded-md focus:outline-none focus:border-[#B86F7B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#35251F] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sandra@example.com"
                      className="w-full px-3 py-2 text-xs border border-[#35251F]/20 rounded-md focus:outline-none focus:border-[#B86F7B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#35251F] mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234..."
                      className="w-full px-3 py-2 text-xs border border-[#35251F]/20 rounded-md focus:outline-none focus:border-[#B86F7B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#35251F] mb-1">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#35251F]/20 rounded-md focus:outline-none focus:border-[#B86F7B] bg-white"
                    >
                      <option value="Product / Sizing Inquiry">Product / Sizing Advice</option>
                      <option value="Order Tracking">Order Status & Tracking</option>
                      <option value="International Shipping">International Delivery</option>
                      <option value="Wholesale / Gifting">Bespoke Gifting</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#35251F] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you'd like to ask..."
                    className="w-full px-3 py-2 text-xs border border-[#35251F]/20 rounded-md focus:outline-none focus:border-[#B86F7B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#35251F] hover:bg-[#B86F7B] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Details & Hubs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F7EFE7] p-6 rounded-2xl border border-[#35251F]/10 space-y-4">
              <h3 className="font-serif text-xl font-normal text-[#35251F]">
                Dispatch Hubs & Operating Hours
              </h3>

              <div className="space-y-3 text-xs text-[#35251F]/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B86F7B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#35251F]">Lagos Dispatch Atelier</strong>
                    <span>Lekki Phase 1, Lagos, Nigeria</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B86F7B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#35251F]">Abuja Courier Hub</strong>
                    <span>Maitama, Abuja, Nigeria</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#35251F]">Concierge Hours</strong>
                    <span>Monday – Saturday: 9:00 AM – 7:00 PM (WAT)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#35251F]">Email Support</strong>
                    <span>{STORE_CONTACT.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="bg-white p-6 rounded-2xl border border-[#35251F]/10 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#35251F]">
                Discover On Social
              </h4>
              <p className="text-xs text-[#35251F]/70">
                Follow @kathrynlynne for style guides, skincare routines, and client highlights.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href={STORE_CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#F7EFE7] hover:bg-[#B86F7B] hover:text-white text-xs font-medium rounded-md transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={STORE_CONTACT.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#F7EFE7] hover:bg-[#B86F7B] hover:text-white text-xs font-medium rounded-md transition-colors"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-6 max-w-3xl mx-auto pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#35251F]">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-[#35251F]/70">
              Clear answers to our most common questions on ordering, sizing, and shipping.
            </p>
          </div>

          <div className="divide-y divide-[#35251F]/10 border-y border-[#35251F]/10">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left flex items-center justify-between gap-4 font-serif text-base text-[#35251F] hover:text-[#B86F7B] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#B86F7B] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pt-2 text-xs text-[#35251F]/75 leading-relaxed animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
