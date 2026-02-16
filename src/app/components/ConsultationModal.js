"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Check,
  X,
  Instagram,
  MessageCircle,
  ShoppingCart,
  Facebook,
  Store,
  MoreHorizontal,
  Mail,
} from "lucide-react";

export default function ConsultationModal({ isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skipView, setSkipView] = useState(false);

  const waMessage = encodeURIComponent(`Hi there! 👋

I’m interested in learning more about your services and how you can help my business grow. Could we schedule a quick chat?

I’d like to know more about: [Website / SEO / Automation / Payments / Other]

Looking forward to your guidance!`);
  const [country, setCountry] = useState("Nigeria");
  const [currency, setCurrency] = useState("₦");
  const [sellingChannels, setSellingChannels] = useState(["Instagram"]);
  const [customSellingOther, setCustomSellingOther] = useState("");
  const [customBudget, setCustomBudget] = useState("");
  const [customCurrency, setCustomCurrency] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [websiteHas, setWebsiteHas] = useState("");
  const [biggestChallenge, setBiggestChallenge] = useState("");
  const [subscribe, setSubscribe] = useState(true);
  const [isRequested, setIsRequested] = useState(false);

  const whatsappNumber = "2348162084926";
  const emailPrefill = encodeURIComponent(
    `Hi,

I would like to consult with you about your services and explore how they can benefit my business.

Could you please guide me on which services would be most relevant for my needs?

Looking forward to your reply.

Best regards,
[Your Name]`
  );

  const toggleChannel = (channel) => {
    setSellingChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    );
  };

  const channelIcon = (ch) => {
    switch (ch) {
      case "Instagram":
        return <Instagram className="w-5 h-5" />;
      case "WhatsApp":
        return <MessageCircle className="w-5 h-5" />;
      case "Shopify":
        return <ShoppingCart className="w-5 h-5" />;
      case "Facebook":
        return <Facebook className="w-5 h-5" />;
      case "Physical Store":
        return <Store className="w-5 h-5" />;
      case "Email":
        return <Mail className="w-5 h-5" />;
      case "My Online Store":
        return <ShoppingCart className="w-5 h-5" />;
      default:
        return <MoreHorizontal className="w-5 h-5" />;
    }
  };

  // Compute budgets from NGN base ranges [200k-500k, 500k-1M, 1M+]
  const NGN_BASE_RANGES = [
    [200000, 500000],
    [500000, 1000000],
    [1000000, null],
  ];

  // Approximate NGN per unit for each currency code (used to convert NGN -> target currency)
  // These are rough estimates — adjust as needed for accurate conversions.
  const NGN_PER = {
    NG: 1,
    US: 800,
    GB: 1000,
    CA: 600,
    ZA: 40,
    KE: 6,
    DE: 900,
    FR: 900,
    ES: 900,
    IT: 900,
    AU: 550,
    IN: 10,
    AE: 220,
    SA: 220,
    EG: 30,
    CN: 120,
    JP: 6,
    BR: 160,
    MX: 40,
    PH: 16,
    ID: 0.29,
    TH: 9,
    VN: 0.016,
    SG: 600,
    MY: 180,
    NL: 900,
    SE: 90,
    NO: 90,
    DK: 90,
    CH: 920,
  };

  const formatAmount = (value) => {
    if (value === null) return "";
    if (value >= 1000000) return `${Math.round(value / 1000000)}M`;
    if (value >= 1000) return `${Math.round(value / 1000)}k`;
    return String(value);
  };

  const convertRange = (ngnLow, ngnHigh, code, symbol) => {
    const per = NGN_PER[code] || NGN_PER['US'];
    const low = Math.round(ngnLow / per);
    const high = ngnHigh ? Math.round(ngnHigh / per) : null;
    if (!high) return `${symbol}${formatAmount(low)}+`;
    return `${symbol}${formatAmount(low)} – ${symbol}${formatAmount(high)}`;
  };

  const BASE_COUNTRIES = [
    { name: "Nigeria", code: "NG", currencySymbol: "₦" },
    { name: "United States", code: "US", currencySymbol: "$" },
    { name: "United Kingdom", code: "GB", currencySymbol: "£" },
    { name: "Canada", code: "CA", currencySymbol: "CAD $" },
    { name: "South Africa", code: "ZA", currencySymbol: "R" },
    { name: "Kenya", code: "KE", currencySymbol: "KSh" },
    { name: "Germany", code: "DE", currencySymbol: "€" },
    { name: "France", code: "FR", currencySymbol: "€" },
    { name: "Spain", code: "ES", currencySymbol: "€" },
    { name: "Italy", code: "IT", currencySymbol: "€" },
    { name: "Australia", code: "AU", currencySymbol: "AUD $" },
    { name: "India", code: "IN", currencySymbol: "₹" },
    { name: "United Arab Emirates", code: "AE", currencySymbol: "د.إ" },
    { name: "Saudi Arabia", code: "SA", currencySymbol: "﷼" },
    { name: "Egypt", code: "EG", currencySymbol: "E£" },
    { name: "China", code: "CN", currencySymbol: "¥" },
    { name: "Japan", code: "JP", currencySymbol: "¥" },
    { name: "Brazil", code: "BR", currencySymbol: "R$" },
    { name: "Mexico", code: "MX", currencySymbol: "MXN $" },
    { name: "Philippines", code: "PH", currencySymbol: "₱" },
    { name: "Indonesia", code: "ID", currencySymbol: "Rp" },
    { name: "Thailand", code: "TH", currencySymbol: "฿" },
    { name: "Vietnam", code: "VN", currencySymbol: "₫" },
    { name: "Singapore", code: "SG", currencySymbol: "S$" },
    { name: "Malaysia", code: "MY", currencySymbol: "RM" },
    { name: "Netherlands", code: "NL", currencySymbol: "€" },
    { name: "Sweden", code: "SE", currencySymbol: "kr" },
    { name: "Norway", code: "NO", currencySymbol: "kr" },
    { name: "Denmark", code: "DK", currencySymbol: "kr" },
    { name: "Switzerland", code: "CH", currencySymbol: "CHF" },
  ];

  const COUNTRIES = BASE_COUNTRIES.map((c) => ({
    ...c,
    budgets: NGN_BASE_RANGES.map(([low, high]) => convertRange(low, high, c.code, c.currencySymbol)),
  }));

  const filteredCountries = COUNTRIES.filter((c) => c.name.toLowerCase().includes(countrySearch.trim().toLowerCase()));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setIsRequested(false);
    const payload = {
      fullName,
      businessName,
      phone,
      email,
      sellingChannels: sellingChannels.includes("Other") && customSellingOther ? [...sellingChannels.filter(s=>s!=='Other'), customSellingOther] : sellingChannels,
      websiteHas,
      biggestChallenge,
      country,
      budget:
        country === "Other"
          ? { currency: customCurrency, amount: customBudget }
          : selectedBudget || 'preset',
    };

    try {
      const res = await fetch('/api/send-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
                  <a
                    href={`https://wa.me/2348162084926?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 border-2 border-white text-white rounded-lg p-4 bg-transparent backdrop-blur-sm"
                  >
                    <MessageCircle className="w-6 h-6" />
                    <div className="text-left">
                      <div className="font-bold">WhatsApp</div>
                      <div className="text-xs opacity-80">Start a chat with our team</div>
                    </div>
                  </a>
      }

      // Simulate adding email to a mailing list (store in localStorage)
      if (subscribe && email) {
        try {
          const key = "newsletterEmails";
          const raw = localStorage.getItem(key);
          const list = raw ? JSON.parse(raw) : [];
          if (!list.includes(email)) list.push(email);
          localStorage.setItem(key, JSON.stringify(list));
        } catch (err) {
          // ignore
        }
      }

      // keep the modal open so user sees the requested state; closing is explicit
      // onClose();
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    switch (country) {
      case "Nigeria":
        setCurrency("₦");
        break;
      case "United Kingdom":
        setCurrency("£");
        break;
      case "United States":
        setCurrency("$");
        break;
      case "Canada":
        setCurrency("CAD $");
        break;
      default:
        setCurrency("$");
    }
  }, [country]);

  // Detect user country & currency when modal opens (uses Vercel headers on platform)
  useEffect(() => {
    if (!isOpen) return;
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/geo');
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted) return;
        if (data.country) setCountry(data.country);
        if (data.currency) setCurrency(data.currency);
      } catch (err) {
        // ignore – we'll keep defaults
      }
    })();
    return () => { mounted = false };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="card rounded-2xl shadow-2xl w-full max-w-2xl p-8 overflow-y-auto max-h-[90vh]"
          >
            {/* Title */}
            <h2 className="text-2xl font-bold text-stone-950 mb-6">
              Get Quotation & Consultation
            </h2>

            <div className="mb-6">
              <button
                onClick={() => setSkipView(true)}
                type="button"
                className="gradient btn inline-flex items-center gap-2 text-white font-semibold py-2 px-4 rounded-full"
              >
                Skip the form
              </button>
            </div>

            {skipView ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 border-2 border-white text-white rounded-lg p-4 bg-transparent backdrop-blur-sm"
                  >
                    <MessageCircle className="w-6 h-6" />
                    <div className="text-left">
                      <div className="font-bold">WhatsApp</div>
                      <div className="text-xs opacity-80">Start a chat with our team</div>
                    </div>
                  </a>

                  <a
                    href={`mailto:hello@4tek.dev?subject=${encodeURIComponent('Consultation request')}&body=${emailPrefill}`}
                    className="flex items-center justify-center gap-3 border-2 border-white text-white rounded-lg p-4 bg-transparent backdrop-blur-sm"
                  >
                    <Mail className="w-6 h-6" />
                    <div className="text-left">
                      <div className="font-bold">Email</div>
                    </div>
                  </a>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setSkipView(false)}
                    className="underline text-sm text-white"
                  >
                    Back to form
                  </button>
                </div>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>

              {/* Full Name */}
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#603813]"
              />

              {/* Business Name */}
              <input
                type="text"
                placeholder="Business Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#603813]"
              />

              {/* Phone */}
              <input
                type="tel"
                placeholder="Phone Number (WhatsApp)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#603813]"
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#603813]"
              />

            


              {/* Where do you sell (multi-select) */}
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-white">Where do you sell?</label>
                <div className="grid text-white grid-cols-2 gap-3">
                  {[
                    "Instagram",
                    "WhatsApp",
                    "Shopify",
                    "Facebook",
                    "Email",
                    "My Online Store",
                    "Other",
                  ].map((ch) => (
                    <label
                      key={ch}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${sellingChannels.includes(ch) ? 'bg-[#603813] text-white border-[#603813]' : 'bg-white/5 text-white'}`}
                    >
                      <input
                        type="checkbox"
                        checked={sellingChannels.includes(ch)}
                        onChange={() => toggleChannel(ch)}
                        className="w-4 h-4"
                      />
                      {channelIcon(ch)}
                      <span className="select-none">{ch}</span>
                    </label>
                  <a
                    href="mailto:hello@4tek.dev"
                    className="flex items-center justify-center gap-3 border-2 border-white text-white rounded-lg p-4 bg-transparent backdrop-blur-sm"
                  >
                    <Mail className="w-6 h-6" />
                    <div className="text-left">
                      <div className="font-bold">Email</div>
                    </div>
                  </a>
                    onChange={(e) => setCustomSellingOther(e.target.value)}
                    placeholder="e.g. Local markets, Niche marketplace"
                    className="w-full border rounded-lg p-3"
                  />
                </div>
              )}

              {/* Website */}
              <select className="w-full border rounded-lg p-3">
                <option>Do you currently have a website?</option>
                <option>Yes</option>
                <option>No</option>
              </select>

              {/* Biggest Challenge */}
              <textarea
                placeholder="What’s your biggest challenge with online sales right now?"
                rows={3}
                className="w-full border rounded-lg p-3"
              />

              {/* Country Selector (searchable) */}
              <div className="w-full relative">
                <label className="block mb-2 text-sm font-medium text-white">Country</label>
                <input
                  type="text"
                  value={countrySearch || country}
                  onChange={(e) => { setCountrySearch(e.target.value); setShowCountryDropdown(true); }}
                  onFocus={() => setShowCountryDropdown(true)}
                  placeholder="Search country..."
                  className="w-full border rounded-lg p-3 bg-white/5 text-white"
                />

                {showCountryDropdown && (
                  <div className="absolute left-0 right-0 mt-1 bg-white/5 backdrop-blur-sm rounded-lg max-h-48 overflow-y-auto z-50">
                    {filteredCountries.length ? (
                      filteredCountries.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => {
                            setCountry(c.name);
                            setCurrency(c.currencySymbol);
                            setSelectedBudget("");
                            setCountrySearch("");
                            setShowCountryDropdown(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-white/10 flex items-center gap-3"
                        >
                          <span className="font-medium text-white">{c.name}</span>
                          <span className="text-sm text-white/80">{c.currencySymbol}</span>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-white/80">No countries match.</div>
                    )}
                  </div>
                )}
              </div>

              {/* Budget suggestions / modern filter */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">Suggested budgets</label>
                <div className="flex flex-wrap gap-2">
                  {(COUNTRIES.find((c) => c.name === country)?.budgets || []).map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setSelectedBudget(b)}
                      className={`px-3 py-2 rounded-full border ${selectedBudget === b ? 'bg-white text-[#603813]' : 'bg-white/5 text-white'}`}
                    >
                      {b}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => { setSelectedBudget(''); setCountry('Other'); setShowCountryDropdown(false); }}
                    className="px-3 py-2 rounded-full border bg-white/5 text-white"
                  >
                    Custom
                  </button>
                </div>

                {country === 'Other' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <input
                      type="text"
                      placeholder="Currency (e.g. NGN, USD, £)"
                      value={customCurrency}
                      onChange={(e) => setCustomCurrency(e.target.value)}
                      className="w-full border rounded-lg p-3"
                    />
                    <input
                      type="text"
                      placeholder="Enter budget or range (e.g. 200k - 500k)"
                      value={customBudget}
                      onChange={(e) => setCustomBudget(e.target.value)}
                      className="w-full border rounded-lg p-3"
                    />
                  </div>
                )}
              </div>

              {/* Submit */}
              {isRequested ? (
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full bg-green-600 text-white py-4 rounded-full font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" aria-hidden />
                  <span>Requested</span>
                  <X className="w-4 h-4 ml-2" aria-hidden />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#603813] text-white py-4 rounded-full font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <span>{isSubmitting ? 'Requesting consultation' : 'Request Consultation'}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden />
                </button>
              )}
            </form>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="mt-4 text-sm text-stone-500 hover:underline"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
