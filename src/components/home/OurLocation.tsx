import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, Phone, Clock, ChevronDown, ChevronUp, ArrowRight, ExternalLink } from 'lucide-react';

interface DaySchedule {
  day: string;
  hours: string;
  note?: string;
}

const WEEKLY_SCHEDULE: DaySchedule[] = [
  { day: 'Monday', hours: '11:00 AM – 10:30 PM' },
  { day: 'Tuesday', hours: '11:00 AM – 10:30 PM' },
  { day: 'Wednesday', hours: '11:00 AM – 10:30 PM' },
  { day: 'Thursday', hours: '11:00 AM – 10:30 PM' },
  { day: 'Friday', hours: '11:00 AM – 10:30 PM', note: 'Bar & Lounge until 11:30 PM' },
  { day: 'Saturday', hours: '11:00 AM – 10:30 PM', note: 'Bar & Lounge until 11:30 PM' },
  { day: 'Sunday', hours: '11:00 AM – 10:30 PM' },
];

export function OurLocation() {
  const [showFullSchedule, setShowFullSchedule] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Compute today's day & schedule accurately in the restaurant's timezone: America/New_York
  const { currentDayName, todaySchedule } = useMemo(() => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        weekday: 'long',
      });
      const name = formatter.format(new Date());
      const match = WEEKLY_SCHEDULE.find((s) => s.day.toLowerCase() === name.toLowerCase()) || WEEKLY_SCHEDULE[0];
      return { currentDayName: name, todaySchedule: match };
    } catch {
      return { currentDayName: 'Today', todaySchedule: WEEKLY_SCHEDULE[0] };
    }
  }, []);

  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=126+River+Dr+S,+Jersey+City,+NJ+07310";

  return (
    <section 
      aria-labelledby="our-location-heading"
      className="relative w-full bg-[#F7F2EF] pt-12 pb-16 sm:py-18 lg:py-24 overflow-hidden"
    >
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading — Bodoni Moda Serif, Left Aligned */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 sm:mb-8 text-left"
        >
          <div className="inline-flex items-center gap-2 mb-2 text-[#C5A46B]">
            <MapPin size={16} strokeWidth={2} />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-stone-500">
              Visit The Restaurant
            </span>
          </div>
          <h2
            id="our-location-heading"
            className="text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.08] tracking-[-0.03em] text-[#1F2421] font-normal"
            style={{ fontFamily: '"Bodoni Moda", "Cormorant Garamond", serif' }}
          >
            Our location
          </h2>
        </motion.div>

        {/* Large Horizontal Location Card */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#ECE7E0] border border-[#DDD6CE] rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 lg:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row items-stretch gap-6 sm:gap-8 lg:gap-10">
            
            {/* ========================================================= */}
            {/* LEFT SIDE: EMBEDDED INTERACTIVE MAP PREVIEW (36%–40%)    */}
            {/* ========================================================= */}
            <div className="w-full lg:w-[38%] xl:w-[36%] shrink-0 flex flex-col">
              <div className="relative w-full h-[230px] sm:h-[280px] lg:h-full min-h-[230px] lg:min-h-[330px] rounded-[18px] sm:rounded-[20px] overflow-hidden bg-stone-200 border border-stone-300/80 shadow-xs">
                
                {/* Fallback skeleton while iframe is initializing */}
                {!mapLoaded && (
                  <div className="absolute inset-0 bg-[#E3DCD3] animate-pulse flex flex-col items-center justify-center p-4 text-center z-0">
                    <MapPin className="text-[#C5A46B] animate-bounce mb-2" size={26} />
                    <span className="text-xs text-stone-600 font-medium font-sans">
                      Loading Jersey City Map...
                    </span>
                  </div>
                )}

                {/* Google Maps Embed iframe (No API Key Required, Verified Pin Position) */}
                <iframe
                  title="The Bangalore Kitchen Location Map"
                  src="https://maps.google.com/maps?q=126%20River%20Dr%20S%2C%20Jersey%20City%2C%20NJ%2007310&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className={`w-full h-full border-0 relative z-10 transition-opacity duration-500 ${
                    mapLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => setMapLoaded(true)}
                />

                {/* Floating Map Pin Badge Top-Left */}
                <div className="absolute top-3 left-3 z-20 pointer-events-none">
                  <div className="bg-white/92 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-stone-200/80 flex items-center gap-1.5 text-stone-900">
                    <span className="w-2 h-2 rounded-full bg-[#E83D22] animate-pulse" />
                    <span className="text-[11px] font-semibold tracking-wide">
                      The Bangalore Kitchen
                    </span>
                  </div>
                </div>

                {/* Open in Google Maps Link Bottom-Right */}
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 z-20 bg-[#252D28]/90 hover:bg-[#252D28] text-white text-[11px] font-medium px-3 py-1.5 rounded-lg shadow-md backdrop-blur-md flex items-center gap-1.5 transition-all hover:scale-[1.02] focus:outline-none"
                  aria-label="View larger map on Google Maps in a new tab"
                >
                  <span>View larger map</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* ========================================================= */}
            {/* RIGHT SIDE: RESTAURANT DETAILS & ACTIONS (60%–64%)        */}
            {/* ========================================================= */}
            <div className="flex-1 flex flex-col justify-between pt-1 lg:pt-0">
              
              <div>
                {/* Header Row: Restaurant Name + Get Directions Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-5 sm:pb-6">
                  <div>
                    <h3
                      className="text-2xl sm:text-3xl lg:text-[32px] text-[#1F2421] font-normal tracking-tight leading-tight"
                      style={{ fontFamily: '"Bodoni Moda", "Cormorant Garamond", serif' }}
                    >
                      The Bangalore Kitchen
                    </h3>
                    <p className="text-xs sm:text-[13px] text-stone-600 font-sans mt-0.5">
                      Jersey City, NJ • South Indian Bar & Restaurant
                    </p>
                  </div>

                  {/* Get Directions Button */}
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 self-start sm:self-center px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full bg-white hover:bg-stone-50 text-[#1F2421] text-xs sm:text-[13px] font-semibold border border-stone-300 shadow-2xs hover:shadow-sm hover:border-stone-400 transition-all duration-200 active:scale-98 focus:outline-none focus:ring-2 focus:ring-[#C5A46B]/40"
                  >
                    <Navigation size={13} className="text-[#C5A46B]" />
                    <span>Get directions</span>
                    <ExternalLink size={12} className="text-stone-400" />
                  </a>
                </div>

                {/* Two-Column Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 py-4">
                  {/* Column 1: Address */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#C5A46B]/15 text-[#8E7345] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={15} />
                    </div>
                    <div>
                      <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-stone-500 mb-0.5 font-sans">
                        Address
                      </span>
                      <address className="not-italic text-sm sm:text-[14.5px] text-[#282C29] font-sans leading-relaxed font-medium">
                        126 River Dr S<br />
                        Jersey City, NJ 07310
                      </address>
                    </div>
                  </div>

                  {/* Column 2: Contact */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E83D22]/12 text-[#E83D22] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone size={15} />
                    </div>
                    <div>
                      <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-stone-500 mb-0.5 font-sans">
                        Contact
                      </span>
                      <a
                        href="tel:2013004080"
                        className="inline-block text-sm sm:text-[14.5px] text-[#282C29] font-sans font-medium hover:text-[#E83D22] transition-colors focus:outline-none"
                      >
                        (201) 300-4080
                      </a>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Reservations, takeaway & inquiries
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thin Horizontal Hairline Divider */}
              <div className="w-full h-px bg-stone-300/80 my-4 sm:my-5" />

              {/* Bottom Row: Operating Hours + Order Online Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                {/* Opening Hours Info + Accordion Toggle */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Clock size={15} className="text-[#8E7345] shrink-0" />
                    <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-stone-500 font-sans">
                      Opening hours
                    </span>
                    <span className="text-stone-400">•</span>
                    <span className="text-xs text-stone-500">
                      Eastern Time (ET)
                    </span>
                  </div>

                  <div className="mt-1.5 flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="text-xs sm:text-[13.5px] text-[#282C29] font-medium font-sans">
                      <strong className="text-stone-900 font-semibold">{currentDayName}:</strong> {todaySchedule.hours}
                      {todaySchedule.note && (
                        <span className="text-stone-500 font-normal ml-1">({todaySchedule.note})</span>
                      )}
                    </span>

                    {/* "See hours" interaction button */}
                    <button
                      type="button"
                      onClick={() => setShowFullSchedule(!showFullSchedule)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#8E7345] hover:text-[#705A34] underline underline-offset-2 transition-colors cursor-pointer focus:outline-none"
                      aria-expanded={showFullSchedule}
                    >
                      <span>{showFullSchedule ? 'Hide hours' : 'See hours'}</span>
                      {showFullSchedule ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>
                  </div>

                  {/* Expandable Weekly Schedule Accordion */}
                  <AnimatePresence>
                    {showFullSchedule && (
                      <motion.div
                        initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden mt-3 pt-3 border-t border-stone-300/60"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-stone-700 font-sans bg-white/60 p-3 rounded-xl border border-stone-200/80">
                          {WEEKLY_SCHEDULE.map((s) => {
                            const isToday = s.day.toLowerCase() === currentDayName.toLowerCase();
                            return (
                              <div
                                key={s.day}
                                className={`flex justify-between items-center py-0.5 px-1.5 rounded ${
                                  isToday ? 'bg-[#C5A46B]/20 font-bold text-stone-950' : ''
                                }`}
                              >
                                <span className="flex items-center gap-1.5">
                                  {isToday && <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46B]" />}
                                  {s.day}
                                </span>
                                <span className="text-right">
                                  {s.hours}
                                  {s.note && <span className="block text-[10px] text-stone-500 font-normal">{s.note}</span>}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Primary Action Button: Order Online */}
                <div className="shrink-0 pt-2 sm:pt-0">
                  <Link
                    to="/menu"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-7 py-3 rounded-full bg-[#252D28] hover:bg-[#343D37] text-white text-xs sm:text-[13px] font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#252D28]/30"
                  >
                    <span>Order online</span>
                    <ArrowRight size={14} className="text-[#C5A46B]" />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
