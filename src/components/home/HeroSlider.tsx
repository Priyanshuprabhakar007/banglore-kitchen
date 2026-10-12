import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export interface HeroSlideItem {
  id: string;
  image: string;
  dish: string;
  line1: string; // Elegant serif italic
  line2: string; // Uppercase high-contrast serif
}

export const HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 'slide-1',
    image: '/images/hero/hero-slide-1.jpg',
    dish: 'Charcoal Grilled Paneer Tikka Platter',
    line1: 'The Art',
    line2: 'OF INDIAN DINING',
  },
  {
    id: 'slide-2',
    image: '/images/hero/hero-slide-2.jpg',
    dish: 'Handi Butter Chicken with Rich Velvety Gravy',
    line1: 'A Taste',
    line2: 'OF TRADITION',
  },
  {
    id: 'slide-3',
    image: '/images/hero/hero-slide-3.jpg',
    dish: 'Royal Indian Curry and Artisanal Breads Feast',
    line1: 'Crafted With',
    line2: 'PASSION',
  },
  {
    id: 'slide-4',
    image: '/images/hero/hero-slide-4.jpg',
    dish: 'Signature Charcoal Tandoor Grills & Herbs',
    line1: 'Discover',
    line2: 'THE FLAVOURS',
  },
];

interface HeroSliderProps {
  homeBanner?: {
    buttonLink?: string;
  } | null;
}

export function HeroSlider({ homeBanner }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  // Check reduced-motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Listen to tab visibility to pause autoplay when hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Slide navigation
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Autoplay interval: 5 seconds per slide, pauses on hover or hidden tab
  useEffect(() => {
    if (!tabVisible || isHovered) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [tabVisible, isHovered, nextSlide]);

  // Preload all slider images on mount for zero-flicker transitions
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartXRef.current = null;
  };

  const slide = HERO_SLIDES[currentSlide];
  const ctaLink = homeBanner?.buttonLink || '/menu';

  return (
    <section
      aria-label="The Bangalore Kitchen Culinary Showcase"
      aria-roledescription="carousel"
      className="relative w-full h-[86svh] sm:h-[89vh] md:h-[93vh] min-h-[640px] max-h-[960px] flex items-center justify-center overflow-hidden bg-stone-950 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* =========================================================================
          BACKGROUND IMAGES (1.4s smooth crossfade with Ken Burns 1.08 -> 1.0 scale)
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_SLIDES.map((item, index) => {
          const isActive = index === currentSlide;

          return (
            <div
              key={item.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity ease-in-out pointer-events-none ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{
                transitionDuration: '1400ms',
              }}
            >
              <img
                src={item.image}
                alt={item.dish}
                className={`w-full h-full object-cover object-center transition-transform ease-out ${
                  prefersReducedMotion
                    ? 'scale-100'
                    : isActive
                    ? 'scale-100 duration-[6500ms]'
                    : 'scale-108 duration-[1400ms]'
                }`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          );
        })}

        {/* Subtle, non-intrusive dark overlay to preserve food vibrancy and assure contrast */}
        <div className="absolute inset-0 z-10 bg-black/25 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-transparent to-black/40 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.45)_100%)] pointer-events-none" />
      </div>

      {/* =========================================================================
          CENTER EDITORIAL TYPOGRAPHY & COMPACT LUXURY CTA
          ========================================================================= */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-8 text-center flex flex-col items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20">
        <AnimatePresence mode="wait">
          <div key={currentSlide} className="flex flex-col items-center">
            {/* Line 1: Elegant Serif Italic */}
            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{
                duration: prefersReducedMotion ? 0.2 : 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-white font-serif italic font-normal tracking-wide text-center"
              style={{
                fontSize: 'clamp(3.4rem, 8vw, 7.2rem)',
                lineHeight: 1.02,
                textShadow: '0 4px 28px rgba(0,0,0,0.85)',
              }}
            >
              {slide.line1}
            </motion.h2>

            {/* Line 2: Uppercase High-Contrast Serif with Clip-Path Reveal */}
            <motion.h1
              initial={{ opacity: 0, y: 40, clipPath: 'inset(100% 0 0 0)' }}
              animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}
              exit={{ opacity: 0, y: -20, clipPath: 'inset(0 0 100% 0)' }}
              transition={{
                duration: prefersReducedMotion ? 0.2 : 0.95,
                delay: prefersReducedMotion ? 0 : 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-white font-serif uppercase font-normal text-center mt-0 sm:mt-1 max-w-5xl"
              style={{
                fontSize: 'clamp(2.2rem, 5.8vw, 5.8rem)',
                letterSpacing: 'clamp(0.12em, 0.18em, 0.22em)',
                lineHeight: 1.06,
                textShadow: '0 4px 32px rgba(0,0,0,0.9)',
              }}
            >
              {slide.line2}
            </motion.h1>

            {/* Compact Rectangular Luxury CTA */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{
                duration: prefersReducedMotion ? 0.2 : 0.75,
                delay: prefersReducedMotion ? 0 : 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-6 sm:mt-8 md:mt-10"
            >
              <Link
                to={ctaLink}
                className="inline-block px-7 py-2.5 sm:px-9 sm:py-3 bg-[#D94236] hover:bg-[#C2352A] text-white text-[11px] sm:text-xs font-semibold uppercase transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(217,66,54,0.4)] hover:shadow-[0_12px_28px_rgba(217,66,54,0.6)] border border-red-400/25 active:translate-y-0"
                style={{
                  letterSpacing: '0.24em',
                }}
              >
                EXPLORE MENU
              </Link>
            </motion.div>
          </div>
        </AnimatePresence>
      </div>

      {/* =========================================================================
          MINIMALIST SLIDER NAVIGATION: Thin Horizontal Lines with Understated Arrows
          (Desktop / Tablet only, touch swipe enabled on mobile)
          ========================================================================= */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="hidden sm:flex group absolute left-4 sm:left-8 md:left-12 top-1/2 -translate-y-1/2 z-30 items-center gap-2 sm:gap-3 text-white/60 hover:text-white transition-colors duration-300 p-2 focus:outline-none"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="stroke-current transition-transform duration-300 group-hover:-translate-x-1"
        >
          <path d="M10 3L5 8L10 13" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="w-6 sm:w-10 md:w-14 h-px bg-white/40 group-hover:bg-white group-hover:w-16 transition-all duration-300" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="hidden sm:flex group absolute right-4 sm:right-8 md:right-12 top-1/2 -translate-y-1/2 z-30 items-center gap-2 sm:gap-3 text-white/60 hover:text-white transition-colors duration-300 p-2 focus:outline-none"
      >
        <span className="w-6 sm:w-10 md:w-14 h-px bg-white/40 group-hover:bg-white group-hover:w-16 transition-all duration-300" />
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="stroke-current transition-transform duration-300 group-hover:translate-x-1"
        >
          <path d="M6 3L11 8L6 13" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Understated Slide Indicators (Minimalistic Dots near the wave crest) */}
      <div
        className="absolute bottom-16 sm:bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5"
        role="tablist"
        aria-label="Slide Selection"
      >
        {HERO_SLIDES.map((s, idx) => {
          const isActive = idx === currentSlide;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => goToSlide(idx)}
              className={`h-[3px] transition-all duration-500 rounded-full ${
                isActive
                  ? 'w-8 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                  : 'w-2.5 bg-white/35 hover:bg-white/60'
              }`}
            />
          );
        })}
      </div>

      {/* =========================================================================
          SEAMLESS ORGANIC SVG WAVE (Matching #F7F2EF category section background)
          ========================================================================= */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none select-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative block w-full h-10 sm:h-14 md:h-18 lg:h-22"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,45 C220,90 440,25 680,60 C920,95 1180,30 1440,55 L1440,120 L0,120 Z"
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    d: [
                      "M0,45 C220,90 440,25 680,60 C920,95 1180,30 1440,55 L1440,120 L0,120 Z",
                      "M0,58 C240,32 460,82 700,48 C940,22 1160,78 1440,46 L1440,120 L0,120 Z",
                      "M0,45 C220,90 440,25 680,60 C920,95 1180,30 1440,55 L1440,120 L0,120 Z",
                    ],
                  }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : {
                    duration: 10,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }
            }
            fill="#F7F2EF"
          />
        </svg>
      </div>
    </section>
  );
}
