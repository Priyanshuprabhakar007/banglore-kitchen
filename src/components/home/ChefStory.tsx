import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function ChefStory() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Subtle scroll parallax for the background decorative motif
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const motifRotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <section 
      ref={sectionRef}
      aria-label="Our Experience & Culinary Heritage"
      className="relative w-full bg-[#0f1a1a] overflow-hidden select-none"
    >
      {/* ================= DESKTOP & TABLET LANDSCAPE (lg & above: 1024px+) ================= */}
      <div className="hidden lg:flex relative w-full h-[620px] xl:h-[660px] 2xl:h-[700px]">
        
        {/* --- LEFT PANEL: Deep Charcoal-Green Editorial Narrative (Expanded to fill space) --- */}
        <div className="relative w-[58%] xl:w-[60%] h-full bg-[#0f1a1a] flex flex-col justify-center px-10 xl:px-20 2xl:px-28 z-10">
          
          {/* Subtle Decorative Line-Art Motif behind text */}
          <motion.div
            style={{ rotate: motifRotate }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 0.18, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-4 xl:right-16 top-1/2 -translate-y-1/2 w-[420px] xl:w-[500px] pointer-events-none select-none z-0"
          >
            <img
              src="/images/sign_img_05.png"
              alt=""
              aria-hidden="true"
              className="w-full h-auto object-contain invert brightness-200 contrast-150"
            />
          </motion.div>

          {/* Left Panel Typography & Narrative */}
          <div className="relative z-10 max-w-[640px] xl:max-w-[760px] 2xl:max-w-[840px]">
            {/* Small Handwritten Red Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "'Caveat', cursive" }}
              className="text-[#d44121] text-2xl xl:text-3xl 2xl:text-4xl font-medium tracking-wide mb-3 xl:mb-4 select-none"
            >
              our experience
            </motion.p>

            {/* Much Larger Refined White Serif Heading filling the section */}
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                fontFamily: "'Bodoni Moda', 'Cormorant Garamond', serif",
                fontOpticalSizing: 'auto'
              }}
              className="text-[#f3edea] font-normal text-4xl lg:text-[44px] xl:text-[54px] 2xl:text-[62px] leading-[1.12] xl:leading-[1.1] tracking-[-0.02em] mb-8 xl:mb-10"
            >
              <span className="block">Authentic flavours crafted</span>
              <span className="block">with tradition and a love</span>
              <span className="block">for detail in every dish</span>
            </motion.h2>

            {/* Brand Signature Treatment */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-6 xl:gap-10 pt-2"
            >
              {/* Brand Typography Block */}
              <div className="flex flex-col">
                <span 
                  style={{ fontFamily: "'Bodoni Moda', 'Cormorant Garamond', serif" }}
                  className="text-[#f3edea] text-lg xl:text-2xl font-normal tracking-wide"
                >
                  The Bangalore Kitchen
                </span>
                <span className="font-sans text-[10px] xl:text-xs uppercase tracking-[0.24em] text-[#f3edea]/55 mt-1 font-semibold">
                  SOUTH INDIAN BAR & RESTAURANT
                </span>
              </div>

              {/* Decorative Brand Signature Flourish */}
              <div className="flex items-center pl-2">
                <span
                  style={{ fontFamily: "'Mrs Saint Delafield', cursive" }}
                  className="text-[#f3edea]/75 text-4xl xl:text-5xl 2xl:text-6xl font-normal tracking-wider select-none -rotate-3"
                  aria-hidden="true"
                >
                  Bangalore Kitchen
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- RIGHT PANEL: Real Bangalore Kitchen Restaurant Photograph --- */}
        <div className="relative w-[42%] xl:w-[40%] h-full overflow-hidden z-10">
          {/* Subtle soft gradient seam at dividing edge */}
          <div className="absolute inset-y-0 left-0 w-28 xl:w-40 bg-gradient-to-r from-[#0f1a1a] via-[#0f1a1a]/50 to-transparent z-10 pointer-events-none" />

          {/* Actual Restaurant Interior & Bar Photograph */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <img
              src="/images/uploaded-restaurant.jpg"
              alt="The Bangalore Kitchen restaurant interior and bar"
              className="w-full h-full object-cover object-[25%_center]"
              loading="lazy"
            />
          </motion.div>

          {/* Atmospheric gentle vignette */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>
      </div>

      {/* ================= MOBILE & TABLET ADAPTED LAYOUT (< 1024px) ================= */}
      <div className="lg:hidden flex flex-col w-full relative">
        {/* Mobile Top Narrative Panel */}
        <div className="relative w-full bg-[#0f1a1a] pt-14 pb-12 px-6 sm:px-12 overflow-hidden z-10">
          {/* Background Decorative Line-Art Motif */}
          <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[280px] sm:w-[360px] pointer-events-none select-none opacity-20">
            <img
              src="/images/sign_img_05.png"
              alt=""
              aria-hidden="true"
              className="w-full h-auto object-contain invert brightness-200 contrast-150"
            />
          </div>

          <div className="relative z-10 max-w-xl mx-auto text-center sm:text-left">
            {/* Small Handwritten Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ fontFamily: "'Caveat', cursive" }}
              className="text-[#d44121] text-2xl sm:text-3xl font-medium tracking-wide mb-2.5"
            >
              our experience
            </motion.p>

            {/* Serif Heading - Prominent & Well balanced */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1 }}
              style={{ fontFamily: "'Bodoni Moda', 'Cormorant Garamond', serif" }}
              className="text-[#f3edea] font-normal text-3xl sm:text-4xl md:text-[42px] leading-[1.18] sm:leading-[1.18] tracking-tight mb-8"
            >
              <span className="block">Authentic flavours crafted</span>
              <span className="block">with tradition and a love</span>
              <span className="block">for detail in every dish</span>
            </motion.h2>

            {/* Brand Signature */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 pt-1"
            >
              <div className="flex flex-col text-left">
                <span 
                  style={{ fontFamily: "'Bodoni Moda', 'Cormorant Garamond', serif" }}
                  className="text-[#f3edea] text-base sm:text-lg font-normal"
                >
                  The Bangalore Kitchen
                </span>
                <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#f3edea]/55 mt-0.5 font-semibold">
                  SOUTH INDIAN BAR & RESTAURANT
                </span>
              </div>
              <span
                style={{ fontFamily: "'Mrs Saint Delafield', cursive" }}
                className="text-[#f3edea]/70 text-3xl sm:text-4xl font-normal tracking-wide select-none -rotate-2"
                aria-hidden="true"
              >
                Bangalore Kitchen
              </span>
            </motion.div>
          </div>
        </div>

        {/* Mobile Visual Presentation: Restaurant Interior Atmosphere (Chef Completely Removed) */}
        <div className="relative w-full h-[280px] sm:h-[360px] overflow-hidden">
          {/* Actual Restaurant Photograph */}
          <img
            src="/images/uploaded-restaurant.jpg"
            alt="The Bangalore Kitchen restaurant interior and bar"
            className="w-full h-full object-cover object-[25%_center]"
            loading="lazy"
          />

          {/* Top seamless blend from dark container */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#0f1a1a] via-[#0f1a1a]/60 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
