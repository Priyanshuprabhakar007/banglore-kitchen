import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, ArrowRight, Check, Instagram, Facebook, Youtube, ChevronRight } from 'lucide-react';
import { Logo } from '../ui/Logo';

interface FooterProps {
  branding?: {
    websiteLogo?: string;
    restaurantName?: string;
  };
}

export function Footer({ branding }: FooterProps) {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [agreed, setAgreed] = useState(true);

  const handleNavClick = (path: string) => {
    const cur = location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
    const tgt = path.toLowerCase().replace(/\/+$/, '') || '/';
    if (cur === tgt || (tgt === '/' && cur === '/home')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  return (
    <footer className="relative bg-[#0C1115] text-stone-300 overflow-hidden border-t border-white/[0.06]">
      {/* ============================================================== */}
      {/* ATMOSPHERIC BACKGROUND TEXTURE & AMBIENT GLOW                  */}
      {/* ============================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft atmospheric gradient glows */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-[#C5A46B]/[0.035] blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-10 w-[500px] h-[300px] bg-[#E83D22]/[0.025] blur-[130px] rounded-full" />
        
        {/* Subtle royal geometric lattice motif overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.02] mix-blend-screen"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="royal-lattice" width="48" height="48" patternUnits="userSpaceOnUse">
              <path
                d="M 24 0 L 48 24 L 24 48 L 0 24 Z"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="0.75"
              />
              <circle cx="24" cy="24" r="3" fill="#FFFFFF" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#royal-lattice)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================== */}
        {/* PART A — TOP CONTACT STRIP                                     */}
        {/* Editorial statement on left, refined contact details on right  */}
        {/* ============================================================== */}
        <div className="pt-12 sm:pt-14 pb-10 sm:pb-12 border-b border-white/[0.08] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
          
          {/* Left: Editorial Serif Statement */}
          <div className="max-w-xl">
            <span className="text-[11px] sm:text-[11.5px] font-sans uppercase tracking-[0.22em] text-[#C5A46B] font-semibold mb-2 block">
              The Art of Indian Hospitality
            </span>
            <h2
              className="text-2xl sm:text-3xl lg:text-[34px] font-normal leading-[1.25] text-white tracking-tight"
              style={{ fontFamily: "'Bodoni Moda', 'Cormorant Garamond', serif" }}
            >
              Authentic Indian Flavours <br className="hidden sm:inline" />
              <span className="italic text-[#E5D7B7]">for Every Occasion</span>
            </h2>
          </div>

          {/* Right: Refined Contact Pills */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 w-full lg:w-auto">
            {/* Address */}
            <div className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-full border border-[#C5A46B]/30 bg-[#C5A46B]/[0.08] text-[#C5A46B] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-[#C5A46B]/60 group-hover:bg-[#C5A46B]/15 group-hover:scale-105 shadow-sm">
                <MapPin size={18} strokeWidth={1.8} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10.5px] uppercase tracking-[0.16em] text-stone-400 font-medium">
                  Dining Location
                </span>
                <span className="text-[13.5px] sm:text-[14px] text-white/95 font-sans font-medium transition-colors group-hover:text-[#E5D7B7]">
                  126 River Dr S, Jersey City, NJ 07310
                </span>
              </div>
            </div>

            {/* Vertical hairline divider (desktop) */}
            <div className="hidden sm:block w-px h-10 bg-white/[0.10]" />

            {/* Phone */}
            <div className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-full border border-[#E83D22]/35 bg-[#E83D22]/[0.08] text-[#E83D22] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-[#E83D22]/65 group-hover:bg-[#E83D22]/15 group-hover:scale-105 shadow-sm">
                <Phone size={18} strokeWidth={1.8} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10.5px] uppercase tracking-[0.16em] text-stone-400 font-medium">
                  Reservations & Orders
                </span>
                <a
                  href="tel:2013004080"
                  className="text-[13.5px] sm:text-[14px] text-white/95 font-sans font-medium transition-colors hover:text-[#E83D22]"
                >
                  (201) 300-4080
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PART B — MAIN FOOTER CONTENT (4 COLUMNS)                       */}
        {/* ============================================================== */}
        <div className="py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* COLUMN 1 — BRAND (span 4) */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6">
            <Link to="/" onClick={() => handleNavClick('/')} className="inline-block mb-6 group focus:outline-none" aria-label="The Bangalore Kitchen Home">
              <Logo
                variant="dark-bg"
                logoUrl={branding?.websiteLogo}
                width={205}
                className="transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>

            <p className="text-[13.5px] leading-relaxed text-stone-400 mb-6 font-sans">
              A premium dining experience bringing authentic South Indian culinary mastery, dosas, royal curries, and aromatic biryanis to Jersey City.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] text-stone-300 hover:text-[#C5A46B] hover:border-[#C5A46B]/40 hover:bg-[#C5A46B]/10 transition-all duration-200 flex items-center justify-center hover:-translate-y-0.5"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] text-stone-300 hover:text-[#C5A46B] hover:border-[#C5A46B]/40 hover:bg-[#C5A46B]/10 transition-all duration-200 flex items-center justify-center hover:-translate-y-0.5"
              >
                <Facebook size={15} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] text-stone-300 hover:text-[#C5A46B] hover:border-[#C5A46B]/40 hover:bg-[#C5A46B]/10 transition-all duration-200 flex items-center justify-center hover:-translate-y-0.5"
              >
                <Youtube size={15} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] text-stone-300 hover:text-[#C5A46B] hover:border-[#C5A46B]/40 hover:bg-[#C5A46B]/10 transition-all duration-200 flex items-center justify-center hover:-translate-y-0.5"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* COLUMN 2 — EXPLORE (span 2) */}
          <div className="lg:col-span-2">
            <h3
              className="text-[16px] font-normal text-white mb-5 tracking-tight flex items-center gap-2"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              <span>Explore</span>
              <span className="w-5 h-px bg-[#C5A46B]/50" />
            </h3>
            <ul className="space-y-3 text-[13.5px] font-sans">
              <li>
                <Link
                  to="/"
                  onClick={() => handleNavClick('/')}
                  className="group inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-all duration-200 hover:translate-x-1"
                >
                  <ChevronRight size={13} className="text-[#C5A46B] opacity-0 group-hover:opacity-100 transition-opacity -ml-3 group-hover:ml-0" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  onClick={() => handleNavClick('/menu')}
                  className="group inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-all duration-200 hover:translate-x-1"
                >
                  <ChevronRight size={13} className="text-[#C5A46B] opacity-0 group-hover:opacity-100 transition-opacity -ml-3 group-hover:ml-0" />
                  <span>Our Menu</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/reserve"
                  onClick={() => handleNavClick('/reserve')}
                  className="group inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-all duration-200 hover:translate-x-1"
                >
                  <ChevronRight size={13} className="text-[#C5A46B] opacity-0 group-hover:opacity-100 transition-opacity -ml-3 group-hover:ml-0" />
                  <span>Reserve Table</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/offers"
                  onClick={() => handleNavClick('/offers')}
                  className="group inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-all duration-200 hover:translate-x-1"
                >
                  <ChevronRight size={13} className="text-[#C5A46B] opacity-0 group-hover:opacity-100 transition-opacity -ml-3 group-hover:ml-0" />
                  <span>Special Offers</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-all duration-200 hover:translate-x-1"
                >
                  <ChevronRight size={13} className="text-[#C5A46B] opacity-0 group-hover:opacity-100 transition-opacity -ml-3 group-hover:ml-0" />
                  <span>About Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 — RESTAURANT / LEGAL (span 2) */}
          <div className="lg:col-span-2">
            <h3
              className="text-[16px] font-normal text-white mb-5 tracking-tight flex items-center gap-2"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              <span>Legal</span>
              <span className="w-5 h-px bg-[#C5A46B]/50" />
            </h3>
            <ul className="space-y-3 text-[13.5px] font-sans">
              <li>
                <Link
                  to="/terms"
                  className="group inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-all duration-200 hover:translate-x-1"
                >
                  <ChevronRight size={13} className="text-[#C5A46B] opacity-0 group-hover:opacity-100 transition-opacity -ml-3 group-hover:ml-0" />
                  <span>Terms & Conditions</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="group inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-all duration-200 hover:translate-x-1"
                >
                  <ChevronRight size={13} className="text-[#C5A46B] opacity-0 group-hover:opacity-100 transition-opacity -ml-3 group-hover:ml-0" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/refunds"
                  className="group inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-all duration-200 hover:translate-x-1"
                >
                  <ChevronRight size={13} className="text-[#C5A46B] opacity-0 group-hover:opacity-100 transition-opacity -ml-3 group-hover:ml-0" />
                  <span>Refund Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-all duration-200 hover:translate-x-1"
                >
                  <ChevronRight size={13} className="text-[#C5A46B] opacity-0 group-hover:opacity-100 transition-opacity -ml-3 group-hover:ml-0" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4 — SUBSCRIBE & HOURS (span 4) */}
          <div className="lg:col-span-4">
            <h3
              className="text-[16px] font-normal text-white mb-2 tracking-tight flex items-center gap-2"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              <span>Subscribe</span>
              <span className="w-5 h-px bg-[#C5A46B]/50" />
            </h3>
            <p className="text-[13px] text-stone-400 mb-4 font-sans leading-relaxed">
              Join our private list for seasonal tasting menus, chef specials, and festival announcements.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#C5A46B]/15 border border-[#C5A46B]/40 rounded-xl text-xs text-[#E5D7B7] flex items-center gap-2 font-sans mb-4">
                <Check size={16} className="text-[#C5A46B] shrink-0" />
                <span>Thank you for subscribing to The Bangalore Kitchen!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2 mb-4 font-sans">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email ..."
                    className="w-full bg-white/[0.05] border border-white/[0.12] focus:border-[#C5A46B] focus:ring-1 focus:ring-[#C5A46B]/40 rounded-xl pl-4 pr-12 py-2.5 text-[13.5px] text-white placeholder:text-stone-500 outline-none transition-all duration-200"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1.5 w-8 h-8 rounded-lg bg-[#E83D22] hover:bg-[#D3341A] text-white flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-sm cursor-pointer"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>

                <label className="flex items-start gap-2 text-[11.5px] text-stone-400 cursor-pointer select-none pt-1">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 rounded border-white/20 accent-[#E83D22] bg-white/5"
                  />
                  <span>
                    I have read and agree to the{' '}
                    <Link to="/terms" className="text-stone-300 hover:underline">
                      terms & conditions
                    </Link>
                  </span>
                </label>
              </form>
            )}

            {/* Business hours pill */}
            <div className="pt-2 border-t border-white/[0.06] text-[12px] text-stone-400 font-sans flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Mon – Sun Dining:</span>
                <span className="text-white/90 font-medium">11:00 AM – 10:30 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Bar & Lounge:</span>
                <span className="text-white/90 font-medium">Until 11:30 PM (Fri/Sat)</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* BOTTOM COPYRIGHT ROW                                           */}
        {/* ============================================================== */}
        <div className="pt-8 pb-32 lg:pb-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[12.5px] text-stone-500 font-sans">
          <p>
            &copy; {new Date().getFullYear()} {branding?.restaurantName || 'The Bangalore Kitchen'}. All rights reserved.
          </p>
          <p className="text-stone-600 text-[11.5px]">
            Crafted for authentic Indian culinary heritage in Jersey City.
          </p>
        </div>

      </div>
    </footer>
  );
}
