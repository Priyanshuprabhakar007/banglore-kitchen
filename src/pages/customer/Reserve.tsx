import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { User, Phone, Calendar, Clock, Users, Sparkles, ChevronDown, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

export function Reserve() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '19:00',
    guests: '2',
    occasion: ''
  });

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Minimum date is today in local timezone
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const minDate = `${year}-${month}-${day}`;

  // Default to tomorrow if not set
  useEffect(() => {
    if (!formData.date) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tYear = tomorrow.getFullYear();
      const tMonth = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const tDay = String(tomorrow.getDate()).padStart(2, '0');
      setFormData(prev => ({ ...prev, date: `${tYear}-${tMonth}-${tDay}` }));
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const y = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10) - 1;
        const d = parseInt(parts[2], 10);
        const dateObj = new Date(y, m, d);
        if (!isNaN(dateObj.getTime())) {
          return dateObj.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });
        }
      }
    } catch {}
    return dateStr;
  };

  const formatTimeDisplay = (timeStr: string) => {
    if (!timeStr) return '';
    try {
      const [h, m] = timeStr.split(':').map(Number);
      if (!isNaN(h) && !isNaN(m)) {
        const period = h >= 12 ? 'PM' : 'AM';
        const hour12 = h % 12 === 0 ? 12 : h % 12;
        return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
      }
    } catch {}
    return timeStr;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setErrorMsg(null);

    // Form validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.date || !formData.time) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setLoading(true);
    try {
      // Local ISO timestamp to prevent UTC day-shift
      const bookingDateTime = `${formData.date}T${formData.time}:00`;
      const numericGuestCount = parseInt(formData.guests, 10) || 2;

      await addDoc(collection(db, 'bookings'), {
        customerName: formData.name.trim(),
        customerPhone: formData.phone.trim(),
        bookingDate: bookingDateTime,
        dateString: formData.date,
        timeString: formData.time,
        guestCount: numericGuestCount,
        occasion: formData.occasion || 'Standard Dining',
        status: 'pending',
        createdAt: serverTimestamp()
      });

      setSuccess(true);
    } catch (error) {
      console.error('Error submitting booking:', error);
      setErrorMsg('Unable to submit reservation request. Please try again or call us at (201) 300-4080.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
        delayChildren: prefersReducedMotion ? 0 : 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#141815] -mt-24 sm:-mt-28 md:-mt-32 pt-24 sm:pt-28 md:pt-32">
      <Helmet>
        <title>Reserve a Table | The Bangalore Kitchen</title>
        <meta
          name="description"
          content="Reserve your table at The Bangalore Kitchen for an authentic Indian culinary experience in Jersey City."
        />
      </Helmet>

      {/* ============================================================== */}
      {/* DESKTOP VIEWPORT: Full-bleed cinematic background with woman   */}
      {/* on left and floating frosted-glass capsule panel on right.     */}
      {/* ============================================================== */}
      <div className="hidden lg:block absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-cover bg-no-repeat bg-[left_center]"
          style={{
            backgroundImage: `url('/images/restaurant/table-reservation-bg.jpg')`,
          }}
        >
          {/* Subtle gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        </motion.div>
      </div>

      {/* ============================================================== */}
      {/* MOBILE / TABLET TOP PHOTOGRAPH BANNER                          */}
      {/* Shows woman's entire face and brass food thali cleanly.        */}
      {/* ============================================================== */}
      <div className="lg:hidden relative w-full h-[220px] sm:h-[280px] overflow-hidden z-0">
        <motion.img
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          src="/images/restaurant/table-reservation-bg.jpg"
          alt="The Bangalore Kitchen Hospitality"
          className="w-full h-full object-cover object-[24%_center]"
        />
        {/* Seamless blend gradient into dark background below */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141815] via-[#141815]/40 to-black/35 pointer-events-none" />
      </div>

      {/* ============================================================== */}
      {/* MAIN CONTENT / RESERVATION PANEL CONTAINER                     */}
      {/* ============================================================== */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 lg:min-h-[calc(100vh-128px)] flex items-center justify-center lg:justify-end pb-36 sm:pb-40 lg:pb-16 -mt-8 sm:-mt-10 lg:mt-0">
        
        {/* Floating Glass Capsule Panel (Desktop) / Glass Card (Mobile) */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={handleMouseMove}
          className="group relative w-full max-w-[440px] sm:max-w-[460px] lg:w-[460px]
            rounded-[26px] sm:rounded-[30px] lg:rounded-[36px]
            p-5 sm:p-7 lg:p-8
            bg-white/[0.88] sm:bg-white/[0.84] lg:bg-white/[0.74]
            backdrop-blur-[24px] saturate-[170%]
            border border-white/85
            shadow-[0_24px_50px_rgba(0,0,0,0.30),0_8px_20px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.95)]
            text-[#202321] transition-all duration-300"
          style={{
            WebkitBackdropFilter: 'blur(24px) saturate(170%)',
          }}
        >
          {/* Subtle Dynamic Pointer Sheen Highlight */}
          <div
            className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(380px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.45), transparent 70%)`,
            }}
          />

          <AnimatePresence mode="wait">
            {success ? (
              /* Luxury Confirmation State */
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="w-full text-center flex flex-col items-center py-2 relative z-10"
              >
                <div className="w-13 h-13 rounded-full bg-[#FAF5EC] border border-[#E8DCBE] text-[#C5A46B] flex items-center justify-center mb-3 shadow-sm">
                  <CheckCircle2 size={30} strokeWidth={1.8} />
                </div>

                <h2
                  className="text-2xl sm:text-[28px] font-normal text-[#1A211D] mb-1.5 leading-tight"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
                >
                  Request Received
                </h2>

                <p className="text-xs sm:text-[13px] text-stone-600 mb-4 leading-relaxed font-['DM_Sans',sans-serif] max-w-sm">
                  Thank you, <span className="font-semibold text-stone-900">{formData.name}</span>. Your table reservation request is <span className="text-[#C5A46B] font-semibold">pending review</span>. Our hospitality team will call <span className="font-medium text-stone-900">{formData.phone}</span> shortly to confirm your booking.
                </p>

                <div className="w-full bg-white/70 backdrop-blur-md border border-stone-200/80 rounded-2xl p-3.5 mb-5 text-left space-y-1.5 text-xs sm:text-[13px] text-stone-700 font-['DM_Sans',sans-serif] shadow-sm">
                  <div className="flex justify-between items-center pb-1.5 border-b border-stone-100">
                    <span className="text-stone-400">Date</span>
                    <span className="font-semibold text-stone-900">{formatDateDisplay(formData.date)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-1.5 border-b border-stone-100">
                    <span className="text-stone-400">Time</span>
                    <span className="font-semibold text-stone-900">{formatTimeDisplay(formData.time)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-1.5 border-b border-stone-100">
                    <span className="text-stone-400">Guests</span>
                    <span className="font-semibold text-stone-900">{formData.guests} {formData.guests === '1' ? 'Person' : 'Guests'}</span>
                  </div>
                  {formData.occasion && (
                    <div className="flex justify-between items-center pt-0.5">
                      <span className="text-stone-400">Occasion</span>
                      <span className="font-semibold text-stone-900">{formData.occasion}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    setSuccess(false);
                    setFormData(prev => ({
                      ...prev,
                      name: '',
                      phone: '',
                      guests: '2',
                      occasion: ''
                    }));
                  }}
                  className="text-xs uppercase tracking-wider text-[#E83D22] font-semibold hover:text-[#D3341A] hover:underline flex items-center gap-1.5 transition-colors font-['DM_Sans',sans-serif] cursor-pointer"
                >
                  <ArrowLeft size={13} /> Make another reservation
                </button>
              </motion.div>
            ) : (
              /* Table Reservation Form */
              <motion.div
                key="form"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full flex flex-col items-center relative z-10"
              >
                {/* Refined Bodoni Serif Heading */}
                <motion.div variants={itemVariants} className="text-center mb-4 sm:mb-5">
                  <h1
                    className="text-[24px] sm:text-[28px] lg:text-[30px] font-normal text-[#1A211D] tracking-normal leading-tight"
                    style={{ fontFamily: "'Bodoni Moda', serif" }}
                  >
                    Table Reservation
                  </h1>
                  <p className="text-[11.5px] sm:text-[12.5px] text-stone-500 font-['DM_Sans',sans-serif] mt-0.5">
                    Authentic South Indian flavours in Jersey City
                  </p>
                </motion.div>

                {/* Error Banner */}
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full mb-3 p-2.5 bg-red-500/10 border border-red-500/30 text-red-700 text-xs rounded-xl flex items-start gap-2 font-['DM_Sans',sans-serif]"
                  >
                    <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-600" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="w-full space-y-2.5 font-['DM_Sans',sans-serif]">
                  {/* Full Name */}
                  <motion.div variants={itemVariants} className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full pl-10 pr-3.5 h-[41px] sm:h-[43px] text-[13px] sm:text-[13.5px] text-[#202321] placeholder:text-stone-400 bg-white/80 hover:bg-white/95 focus:bg-white border border-stone-200/90 focus:border-[#E83D22] focus:ring-2 focus:ring-[#E83D22]/15 rounded-xl outline-none transition-all duration-200"
                    />
                  </motion.div>

                  {/* Phone Number */}
                  <motion.div variants={itemVariants} className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Phone number"
                      className="w-full pl-10 pr-3.5 h-[41px] sm:h-[43px] text-[13px] sm:text-[13.5px] text-[#202321] placeholder:text-stone-400 bg-white/80 hover:bg-white/95 focus:bg-white border border-stone-200/90 focus:border-[#E83D22] focus:ring-2 focus:ring-[#E83D22]/15 rounded-xl outline-none transition-all duration-200"
                    />
                  </motion.div>

                  {/* Date and Time Side-by-Side */}
                  <motion.div variants={itemVariants} className="grid grid-cols-2 gap-2 sm:gap-2.5">
                    {/* Date */}
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        required
                        type="date"
                        min={minDate}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full pl-10 pr-2 h-[41px] sm:h-[43px] text-[12.5px] sm:text-[13px] text-[#202321] bg-white/80 hover:bg-white/95 focus:bg-white border border-stone-200/90 focus:border-[#E83D22] focus:ring-2 focus:ring-[#E83D22]/15 rounded-xl outline-none transition-all duration-200"
                      />
                    </div>

                    {/* Time */}
                    <div className="relative">
                      <Clock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        required
                        type="time"
                        min="11:00"
                        max="22:30"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full pl-10 pr-2 h-[41px] sm:h-[43px] text-[12.5px] sm:text-[13px] text-[#202321] bg-white/80 hover:bg-white/95 focus:bg-white border border-stone-200/90 focus:border-[#E83D22] focus:ring-2 focus:ring-[#E83D22]/15 rounded-xl outline-none transition-all duration-200"
                      />
                    </div>
                  </motion.div>

                  {/* Number of Guests */}
                  <motion.div variants={itemVariants} className="relative">
                    <Users className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      required
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full pl-10 pr-8 h-[41px] sm:h-[43px] text-[13px] sm:text-[13.5px] text-[#202321] bg-white/80 hover:bg-white/95 focus:bg-white border border-stone-200/90 focus:border-[#E83D22] focus:ring-2 focus:ring-[#E83D22]/15 rounded-xl outline-none transition-all duration-200 appearance-none cursor-pointer"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5 Guests</option>
                      <option value="6">6 Guests</option>
                      <option value="7">7 Guests</option>
                      <option value="8">8 Guests</option>
                      <option value="9">9 Guests</option>
                      <option value="10">10 Guests</option>
                      <option value="12">12 Guests (Large Party)</option>
                      <option value="15">15 Guests (Private Gathering)</option>
                      <option value="20">20+ Guests (Banquets / Events)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </motion.div>

                  {/* Special Occasion */}
                  <motion.div variants={itemVariants} className="relative">
                    <Sparkles className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      className="w-full pl-10 pr-8 h-[41px] sm:h-[43px] text-[13px] sm:text-[13.5px] text-[#202321] bg-white/80 hover:bg-white/95 focus:bg-white border border-stone-200/90 focus:border-[#E83D22] focus:ring-2 focus:ring-[#E83D22]/15 rounded-xl outline-none transition-all duration-200 appearance-none cursor-pointer"
                    >
                      <option value="">Special Occasion (Optional)</option>
                      <option value="Birthday">Birthday Celebration</option>
                      <option value="Anniversary">Anniversary Dinner</option>
                      <option value="Business Meeting">Business Dinner</option>
                      <option value="Family Gathering">Family Gathering</option>
                      <option value="Romantic Date">Romantic Date</option>
                      <option value="Other Celebration">Other Celebration</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </motion.div>

                  {/* Coral-Red Reservation Button */}
                  <motion.div variants={itemVariants} className="pt-2 flex justify-center">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-[180px] h-[43px] bg-[#E83D22] hover:bg-[#D3341A] text-white text-[12px] tracking-wider uppercase font-medium rounded-xl shadow-[0_6px_20px_rgba(232,61,34,0.32)] hover:shadow-[0_8px_25px_rgba(232,61,34,0.45)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 flex items-center justify-center cursor-pointer group"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span className="group-hover:scale-[1.02] transition-transform">
                          BOOK A TABLE
                        </span>
                      )}
                    </button>
                  </motion.div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
