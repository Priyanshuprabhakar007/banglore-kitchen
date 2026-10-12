import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function ChefStory() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Subtle scroll parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const chefY = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const motifRotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <section 
      ref={sectionRef}
      aria-label="Our Experience & Culinary Heritage"
      className="relative w-full bg-[#0f1a1a] overflow-hidden select-none"
    >
      {/* ================= DESKTOP & TABLET LANDSCAPE (lg & above: 1024px+) ================= */}
      <div className="hidden lg:flex relative w-full h-[680px] xl:h-[710px] 2xl:h-[730px]">
        
        {/* --- LEFT PANEL: Deep Charcoal-Green Editorial Narrative (50%) --- */}
        <div className="relative w-1/2 h-full bg-[#0f1a1a] flex flex-col justify-center px-10 xl:px-16 2xl:px-24 z-10">
          
          {/* Subtle Decorative Line-Art Motif behind text */}
          <motion.div
            style={{ rotate: motifRotate }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 0.22, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-6 xl:right-12 top-1/2 -translate-y-1/2 w-[390px] xl:w-[440px] pointer-events-none select-none z-0"
          >
            <img
              src="/images/sign_img_05.png"
              alt=""
              aria-hidden="true"
              className="w-full h-auto object-contain invert brightness-200 contrast-150"
            />
          </motion.div>

          {/* Left Panel Typography & Narrative */}
          <div className="relative z-10 max-w-[540px] xl:max-w-[600px]">
            {/* Small Handwritten Red Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "'Caveat', cursive" }}
              className="text-[#d44121] text-2xl xl:text-3xl font-medium tracking-wide mb-3 xl:mb-4 select-none"
            >
              our experience
            </motion.p>

            {/* Large Refined White Serif Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                fontFamily: "'Bodoni Moda', 'Cormorant Garamond', serif",
                fontOpticalSizing: 'auto'
              }}
              className="text-[#f3edea] font-normal text-3xl sm:text-4xl xl:text-[41px] 2xl:text-[44px] leading-[1.2] tracking-[-0.015em] mb-10 xl:mb-12"
            >
              Authentic flavours crafted<br />
              with tradition and a love<br />
              for detail in every dish
            </motion.h2>

            {/* Brand Signature Treatment */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-6 xl:gap-8 pt-2"
            >
              {/* Brand Typography Block */}
              <div className="flex flex-col">
                <span 
                  style={{ fontFamily: "'Bodoni Moda', 'Cormorant Garamond', serif" }}
                  className="text-[#f3edea] text-lg xl:text-xl font-normal tracking-wide"
                >
                  The Bangalore Kitchen
                </span>
                <span className="font-sans text-[10px] xl:text-[11px] uppercase tracking-[0.24em] text-[#f3edea]/55 mt-1 font-semibold">
                  SOUTH INDIAN BAR & RESTAURANT
                </span>
              </div>

              {/* Decorative Brand Signature Flourish */}
              <div className="flex items-center pl-2">
                <span
                  style={{ fontFamily: "'Mrs Saint Delafield', cursive" }}
                  className="text-[#f3edea]/75 text-4xl xl:text-5xl font-normal tracking-wider select-none -rotate-3"
                  aria-hidden="true"
                >
                  Bangalore Kitchen
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- RIGHT PANEL: Real Bangalore Kitchen Restaurant Photograph (50%) --- */}
        <div className="relative w-1/2 h-full overflow-hidden z-10">
          {/* Subtle soft gradient seam at dividing edge */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0f1a1a] via-[#0f1a1a]/30 to-transparent z-10 pointer-events-none" />

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
              className="w-full h-full object-cover object-[20%_center]"
              loading="lazy"
            />
          </motion.div>

          {/* Atmospheric gentle vignette */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>

        {/* --- CENTER FOREGROUND: Large Chef Cutout Image Overlapping Both Sides --- */}
        {/* Positioned slightly left of the middle split (around 45% - 47%) at high z-index (z-30) */}
        <div 
          className="absolute z-30 bottom-0 pointer-events-none flex justify-center items-end"
          style={{ 
            left: '46%', 
            transform: 'translateX(-50%)',
            height: '100%',
            width: '34vw',
            maxWidth: '510px',
            minWidth: '380px'
          }}
        >
          <motion.div
            style={{ y: chefY }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex items-end justify-center"
          >
            <img
              src="/images/uploaded-chef.png"
              alt="Executive Chef of The Bangalore Kitchen"
              className="h-[96%] xl:h-[98%] w-auto max-w-full object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)]"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>

      {/* ================= MOBILE & TABLET ADAPTED LAYOUT (< 1024px) ================= */}
      <div className="lg:hidden flex flex-col w-full relative">
        {/* Mobile Top Narrative Panel */}
        <div className="relative w-full bg-[#0f1a1a] pt-12 pb-10 px-6 sm:px-10 overflow-hidden z-10">
          {/* Background Decorative Line-Art Motif */}
          <div className="absolute right-[-12%] top-1/2 -translate-y-1/2 w-[260px] sm:w-[320px] pointer-events-none select-none opacity-20">
            <img
              src="/images/sign_img_05.png"
              alt=""
              aria-hidden="true"
              className="w-full h-auto object-contain invert brightness-200 contrast-150"
            />
          </div>

          <div className="relative z-10 max-w-lg mx-auto text-center sm:text-left">
            {/* Small Handwritten Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ fontFamily: "'Caveat', cursive" }}
              className="text-[#d44121] text-2xl sm:text-3xl font-medium tracking-wide mb-2"
            >
              our experience
            </motion.p>

            {/* Serif Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1 }}
              style={{ fontFamily: "'Bodoni Moda', 'Cormorant Garamond', serif" }}
              className="text-[#f3edea] font-normal text-2xl sm:text-3xl sm:leading-[1.25] tracking-tight mb-7"
            >
              Authentic flavours crafted<br />
              with tradition and a love<br />
              for detail in every dish
            </motion.h2>

            {/* Brand Signature */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-center justify-center sm:justify-start gap-5"
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

        {/* Mobile Visual Presentation: Real Restaurant Interior with Prominent Cutout Chef */}
        <div className="relative w-full h-[380px] sm:h-[440px] overflow-hidden">
          {/* Actual Restaurant Photograph */}
          <img
            src="/images/uploaded-restaurant.jpg"
            alt="The Bangalore Kitchen restaurant interior and bar"
            className="w-full h-full object-cover object-[20%_center]"
            loading="lazy"
          />

          {/* Top seamless blend from dark container */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0f1a1a] to-transparent pointer-events-none" />

          {/* Cutout Chef anchored at the bottom, prominent, no clipping of turban or face */}
          <div className="absolute inset-x-0 bottom-0 pointer-events-none flex justify-center items-end h-full z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="h-full flex items-end justify-center"
            >
              <img
                src="/images/uploaded-chef.png"
                alt="Executive Chef of The Bangalore Kitchen"
                className="h-[96%] sm:h-[98%] w-auto max-w-[85vw] object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
