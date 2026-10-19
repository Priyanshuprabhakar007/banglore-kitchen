import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export function CraftedInvitation() {
  return (
    <section 
      aria-label="A Taste of Tradition — Crafted with Authenticity & Passion"
      className="relative w-full overflow-hidden select-none bg-[#F8F2ED] py-16 sm:py-20 lg:py-28"
      style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, #FFFDF9 0%, #F8F2ED 85%, #F4ECE4 100%)'
      }}
    >
      {/* Subtle Ambient Vignette & Decorative Frame Inset */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,253,249,0.85)_0%,transparent_75%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
        
        {/* Decorative Inset Frame Corner Accents (Faint & Luxurious) */}
        <div className="absolute -inset-x-3 sm:-inset-x-8 -inset-y-4 sm:-inset-y-8 pointer-events-none opacity-40">
          {/* Top Left Corner Arc */}
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none" className="absolute top-0 left-0 text-[#B96850]/30">
            <path d="M1 27V10C1 5.02944 5.02944 1 10 1H27" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
          {/* Top Right Corner Arc */}
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none" className="absolute top-0 right-0 text-[#B96850]/30">
            <path d="M27 27V10C27 5.02944 22.9706 1 18 1H1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
          {/* Bottom Left Corner Arc */}
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none" className="absolute bottom-0 left-0 text-[#B96850]/30">
            <path d="M1 1V18C1 22.9706 5.02944 27 10 27H27" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
          {/* Bottom Right Corner Arc */}
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none" className="absolute bottom-0 right-0 text-[#B96850]/30">
            <path d="M27 1V18C27 22.9706 22.9706 27 18 27H1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>

        {/* ================= STEP 1: EYEBROW WITH FINE TERRACOTTA LINES ================= */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 sm:gap-4 mb-3.5 sm:mb-5"
        >
          {/* Left Extending Line */}
          <motion.span 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] w-7 sm:w-16 bg-[#B96850]/45 origin-right" 
          />
          
          {/* Eyebrow Label */}
          <span 
            className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#B96850] font-semibold select-none"
          >
            A Taste of Tradition
          </span>

          {/* Right Extending Line */}
          <motion.span 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] w-7 sm:w-16 bg-[#B96850]/45 origin-left" 
          />
        </motion.div>

        {/* ================= STEP 2: MAIN HEADLINE (EDITORIAL BODONI MODA SERIF) ================= */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            fontFamily: "'Bodoni Moda', 'Cormorant Garamond', Georgia, serif",
            fontOpticalSizing: 'auto'
          }}
          className="text-[#252D28] font-normal text-[35px] sm:text-[46px] md:text-[56px] lg:text-[68px] xl:text-[74px] leading-[1.08] sm:leading-[1.05] tracking-[-0.025em] mb-4 sm:mb-6"
        >
          <span className="block">Crafted with</span>
          <span className="block mt-0.5 sm:mt-1.5">
            <span className="text-[#B96850] italic font-normal tracking-[-0.015em]">Authenticity</span>
            <span className="text-[#252D28] font-normal"> &amp; Passion</span>
          </span>
        </motion.h2>

        {/* Minimal Botanical Floral Ornament */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center items-center my-2.5 sm:my-4"
          aria-hidden="true"
        >
          <svg width="22" height="13" viewBox="0 0 24 14" fill="none" className="text-[#B96850]/55">
            <path d="M12 0.5C12 0.5 8 5 8 8C8 10.2 9.8 12 12 12C14.2 12 16 10.2 16 8C16 5 12 0.5 12 0.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M12 12V13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="5" cy="8" r="1" fill="currentColor" />
            <circle cx="19" cy="8" r="1" fill="currentColor" />
            <path d="M6 8C7.5 6.5 9.5 6 12 6C14.5 6 16.5 6.5 18 8" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* ================= STEP 3: SUPPORTING PARAGRAPH ================= */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          className="text-[#6E6964] text-[15px] sm:text-[17px] xl:text-[18px] leading-[1.6] sm:leading-[1.65] max-w-[650px] mx-auto mb-7 sm:mb-9 font-normal"
        >
          Every dish is prepared using time-honored recipes, freshly ground spices, and the finest ingredients.
        </motion.p>

        {/* ================= STEP 4: REFINED CALL TO ACTION ================= */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center"
        >
          <Link
            to="/menu"
            className="group inline-flex items-center gap-2.5 px-8 sm:px-9 py-3 sm:py-4 bg-[#252D28] hover:bg-[#1A201C] text-[#F8F2ED] rounded-full font-medium text-sm sm:text-[15px] tracking-wide transition-all duration-300 shadow-[0_8px_24px_rgba(37,45,40,0.16)] hover:shadow-[0_12px_28px_rgba(37,45,40,0.24)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Explore Full Menu</span>
            <ArrowUpRight 
              size={17} 
              className="text-[#F8F2ED] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
            />
          </Link>

          {/* ================= STEP 5: CLOSING ELEGANT ACCENT ================= */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.48 }}
            className="flex items-center justify-center gap-2 mt-6 sm:mt-8 select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#B96850]/40" />
            <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-[#6E6964]/75 font-semibold">
              Made with Love
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B96850]/40" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
