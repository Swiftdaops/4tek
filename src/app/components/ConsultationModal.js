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
  const [sent, setSent] = useState(false);
  const [skipView, setSkipView] = useState(false);
  const [isRequested, setIsRequested] = useState(false);

  // Form States
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sellingChannels, setSellingChannels] = useState(["Instagram"]);
  const [customSellingOther, setCustomSellingOther] = useState("");
  const [websiteHas, setWebsiteHas] = useState("");
  const [biggestChallenge, setBiggestChallenge] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [currency, setCurrency] = useState("₦");
  const [draftHasCountry, setDraftHasCountry] = useState(false);
  const [userSetCountry, setUserSetCountry] = useState(false);
  const [detectedGeo, setDetectedGeo] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [customBudget, setCustomBudget] = useState("");
  const [customCurrency, setCustomCurrency] = useState("");
  const [subscribe, setSubscribe] = useState(true);

  // UI States
  const [countrySearch, setCountrySearch] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const DRAFT_KEY = "consultationDraft_v1";

  // Load draft from localStorage when modal mounts
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (!draft) return;

      if (draft.fullName) setFullName(draft.fullName);
      if (draft.businessName) setBusinessName(draft.businessName);
      if (draft.phone) setPhone(draft.phone);
      if (draft.email) setEmail(draft.email);
      if (draft.sellingChannels) setSellingChannels(draft.sellingChannels);
      if (draft.customSellingOther) setCustomSellingOther(draft.customSellingOther);
      if (draft.websiteHas) setWebsiteHas(draft.websiteHas);
      if (draft.biggestChallenge) setBiggestChallenge(draft.biggestChallenge);
      if (draft.country) setCountry(draft.country);
      // Treat a saved draft with the default value as "no meaningful draft"
      setDraftHasCountry(Boolean(draft.country && draft.country !== "Nigeria"));
      if (draft.currency) setCurrency(draft.currency);
      if (draft.selectedBudget) setSelectedBudget(draft.selectedBudget);
      if (draft.customBudget) setCustomBudget(draft.customBudget);
      if (draft.customCurrency) setCustomCurrency(draft.customCurrency);
      if (typeof draft.subscribe === 'boolean') setSubscribe(draft.subscribe);
    } catch (err) {
      // ignore
    }
  }, []);

  // Persist draft to localStorage whenever relevant fields change
  useEffect(() => {
    const payload = {
      fullName,
      businessName,
      phone,
      email,
      sellingChannels,
      customSellingOther,
      websiteHas,
      biggestChallenge,
      country,
      currency,
      selectedBudget,
      customBudget,
      customCurrency,
      subscribe,
    };
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
    } catch (err) {
      // ignore quota errors
    }
  }, [fullName, businessName, phone, email, sellingChannels, customSellingOther, websiteHas, biggestChallenge, country, currency, selectedBudget, customBudget, customCurrency, subscribe]);

  // Fetch detected geo on component mount so refresh re-detects IP
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/geo');
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted) return;
        const { country: detectedCountry, countryCode: detectedCode, currency: detectedCurrency } = data || {};
        if (!detectedCountry && !detectedCode) return;
        const found = COUNTRIES.find(c => c.name === detectedCountry || c.code === detectedCode);
        const geo = {
          country: found ? found.name : detectedCountry,
          countryCode: detectedCode,
          currency: (found && found.currencySymbol) || detectedCurrency || '$',
        };
        setDetectedGeo(geo);
      } catch (err) {
        // ignore
      }
    })();

    return () => { mounted = false; };
  }, []);

  // Auto-apply detected geo when modal opens (but don't override user or meaningful draft)
  useEffect(() => {
    if (!isOpen) return;
    if (!detectedGeo) return;
    if (draftHasCountry || userSetCountry) return;
    setCountry(detectedGeo.country);
    setCurrency(detectedGeo.currency);
  }, [isOpen, detectedGeo, draftHasCountry, userSetCountry]);

  const clearForm = () => {
    setFullName("");
    setBusinessName("");
    setPhone("");
    setEmail("");
    setSellingChannels(["Instagram"]);
    setCustomSellingOther("");
    setWebsiteHas("");
    setBiggestChallenge("");
    setCountry("Nigeria");
    setCurrency("₦");
    setSelectedBudget("");
    setCustomBudget("");
    setCustomCurrency("");
    setSubscribe(true);
    try { localStorage.removeItem(DRAFT_KEY); } catch (e) {}
  };

  const whatsappNumber = "2348069988120";
  const waMessage = encodeURIComponent(`Hi there! 👋\n\nI’m interested in learning more about your services...`);
  const emailPrefill = encodeURIComponent(`Hi,\n\nI would like to consult with you...`);

  const toggleChannel = (channel) => {
    setSellingChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    );
  };

  const channelIcon = (ch) => {
    switch (ch) {
      case "Instagram": return <Instagram className="w-5 h-5" />;
      case "WhatsApp": return <MessageCircle className="w-5 h-5" />;
      case "Shopify": return <ShoppingCart className="w-5 h-5" />;
      case "Facebook": return <Facebook className="w-5 h-5" />;
      case "Physical Store": return <Store className="w-5 h-5" />;
      case "Email": return <Mail className="w-5 h-5" />;
      case "My Online Store": return <ShoppingCart className="w-5 h-5" />;
      default: return <MoreHorizontal className="w-5 h-5" />;
    }
  };

  // --- Currency & Country Logic ---
  const NGN_BASE_RANGES = [[200000, 500000], [500000, 1000000], [1000000, null]];
  const NGN_PER = { NG: 1, US: 800, GB: 1000, CA: 600, ZA: 40, KE: 6, DE: 900 }; // Simplified for brevity

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
    return !high ? `${symbol}${formatAmount(low)}+` : `${symbol}${formatAmount(low)} – ${symbol}${formatAmount(high)}`;
  };

  const BASE_COUNTRIES = [
    { name: "Nigeria", code: "NG", currencySymbol: "₦" },
    { name: "United States", code: "US", currencySymbol: "$" },
    { name: "United Kingdom", code: "GB", currencySymbol: "£" },
    { name: "Canada", code: "CA", currencySymbol: "CAD $" },
  ];

  const COUNTRIES = BASE_COUNTRIES.map((c) => ({
    ...c,
    budgets: NGN_BASE_RANGES.map(([low, high]) => convertRange(low, high, c.code, c.currencySymbol)),
  }));

  const filteredCountries = COUNTRIES.filter((c) => c.name.toLowerCase().includes(countrySearch.trim().toLowerCase()));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sent) return; // prevent duplicate sends
    setIsSubmitting(true);

    // read full chat log from localStorage (written by ChatWidget)
    let chatLogFromStorage = [];
    try {
      chatLogFromStorage = JSON.parse(localStorage.getItem('chatLog_v1') || '[]');
    } catch (e) {
      chatLogFromStorage = [];
    }

    const payload = {
      fullName,
      businessName,
      phone,
      email,
      websiteHas,
      biggestChallenge,
      country,
      chatLog: chatLogFromStorage,
      sellingChannels: sellingChannels.includes("Other") ? [...sellingChannels.filter((s) => s !== "Other"), customSellingOther] : sellingChannels,
      budget: country === "Other" ? `${customCurrency} ${customBudget}` : selectedBudget,
    };

    try {
      const res = await fetch("/api/send-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsRequested(true);
        setSent(true);
        try { localStorage.removeItem(DRAFT_KEY); } catch {}
      } else {
        console.error('Failed to send consultation', await res.text().catch(() => ''));}
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div onClick={() => onClose()} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div onClick={(e) => e.stopPropagation()} className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh]" initial={{ scale: 0.9, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 40 }}>
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Get Quotation</h2>
              <button onClick={onClose} className="text-white/50 hover:text-white"><X /></button>
            </div>

            <div className="mb-8">
              <button onClick={() => setSkipView(!skipView)} className="w-full py-3 rounded-xl gradient text-white font-bold transition-all hover:scale-[1.02]">
                {skipView ? "Fill the form instead" : "Quick Contact (Skip Form)"}
              </button>
            </div>

            {skipView ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4">
                <a href={`https://wa.me/${whatsappNumber}?text=${waMessage}`} target="_blank" className="flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-white/10 bg-white/5 hover:bg-white/10 text-white">
                  <MessageCircle className="w-8 h-8 text-green-400" />
                  <span className="font-bold">WhatsApp</span>
                </a>
                <a href={`mailto:hello@4tek.dev?subject=Consultation&body=${emailPrefill}`} className="flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-white/10 bg-white/5 hover:bg-white/10 text-white">
                  <Mail className="w-8 h-8 text-blue-400" />
                  <span className="font-bold">Email Us</span>
                </a>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#b2945e]" />
                  <input type="text" placeholder="Business Name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#b2945e]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="tel" placeholder="WhatsApp Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#b2945e]" />
                  <input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#b2945e]" />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-white/70">Where do you sell?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {["Instagram", "WhatsApp", "Shopify", "Facebook", "Physical Store", "Other"].map((ch) => (
                      <button key={ch} type="button" onClick={() => toggleChannel(ch)} className={`flex items-center gap-2 p-2 text-xs border rounded-lg transition ${sellingChannels.includes(ch) ? 'gradient text-white' : 'bg-white/5 border-white/10 text-white/60'}`}>
                        {channelIcon(ch)} {ch}
                      </button>
                    ))}
                  </div>
                  {sellingChannels.includes("Other") && (
                    <input type="text" placeholder="Specify other channels..." value={customSellingOther} onChange={(e) => setCustomSellingOther(e.target.value)} className="w-full mt-2 bg-white/5 border border-white/10 rounded-lg p-2 text-white text-sm" />
                  )}
                </div>

                <select value={websiteHas} onChange={(e) => setWebsiteHas(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white">
                  <option value="" className="text-black">Do you have a website?</option>
                  <option value="yes" className="text-black">Yes, I have one</option>
                  <option value="no" className="text-black">No, I need one</option>
                </select>

                <textarea placeholder="Tell us a bit about your business and the challenges you're currently facing. We’ll help point you in the right direction." value={biggestChallenge} onChange={(e) => setBiggestChallenge(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white h-24" />

                <div className="relative">
                  <label className="text-sm text-white/70">Country</label>
                  <input type="text" value={countrySearch || country} onFocus={() => setShowCountryDropdown(true)} onChange={(e) => { setCountrySearch(e.target.value); setUserSetCountry(true); }} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white mt-1" />
                  {detectedGeo && detectedGeo.country && detectedGeo.country !== country && !userSetCountry && (
                    <div className="mt-2 flex items-center justify-between bg-white/5 p-2 rounded text-sm text-white">
                      <div>Detected: <span className="font-bold">{detectedGeo.country}</span></div>
                      <button type="button" onClick={() => { setCountry(detectedGeo.country); setCurrency(detectedGeo.currency); setUserSetCountry(true); }} className="ml-4 px-3 py-1 rounded bg-blue-600 text-white text-sm">Use detected</button>
                    </div>
                  )}
                  {showCountryDropdown && (
                    <div className="absolute w-full mt-1 bg-[#2a2a2a] border border-white/10 rounded-lg max-h-40 overflow-y-auto z-50">
                      {filteredCountries.map(c => (
                        <div key={c.code} onClick={() => { setCountry(c.name); setCurrency(c.currencySymbol); setShowCountryDropdown(false); setCountrySearch(""); setUserSetCountry(true); }} className="p-3 hover:bg-white/10 cursor-pointer text-white flex justify-between">
                          <span>{c.name}</span> <span className="opacity-50">{c.currencySymbol}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm text-white/70">Select Budget Range</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(COUNTRIES.find(c => c.name === country)?.budgets || []).map(b => (
                      <button key={b} type="button" onClick={() => setSelectedBudget(b)} className={`px-4 py-2 rounded-full border text-xs transition ${selectedBudget === b ? 'bg-white text-black' : 'border-white/20 text-white'}`}>{b}</button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={clearForm} className="flex-1 py-3 rounded-xl border border-white/10 text-white/90 hover:bg-white/5 transition">Clear form</button>
                  <button type="submit" disabled={isSubmitting} className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition ${isRequested ? 'bg-green-600' : 'bg-white text-black hover:bg-gray-200'}`}>
                    {isSubmitting ? 'Processing...' : isRequested ? <><Check /> Request Sent</> : <><Mail /> Request Consultation</>}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}