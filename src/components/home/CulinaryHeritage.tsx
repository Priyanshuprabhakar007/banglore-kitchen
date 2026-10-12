import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function CulinaryHeritage() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return (
    <section 
      aria-label="Culinary Heritage"
      className="relative w-full bg-[#F7F2EF] py-16 sm:py-20 lg:py-28 overflow-hidden select-none"
    >
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            DESKTOP & RESPONSIVE THREE-COLUMN STORYTELLING COMPOSITION
            - Left (35%): Editorial Heading & Refined Description
            - Middle (32%): Tall Rectangular Photograph of Clay Handi Curry
            - Right (33%): Tall Oval Photograph of Authentic Indian Dining Experience
            ========================================================================= */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-10 sm:gap-12 lg:gap-8 xl:gap-10">
          
          {/* COLUMN 1: LEFT (35%) — Editorial Typography & Story */}
          <motion.div 
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[35%] flex flex-col justify-center text-left"
          >
            {/* Elegant Main Heading in Bodoni Moda */}
            <h2 
              className="text-[38px] sm:text-[50px] lg:text-[62px] xl:text-[70px] leading-[1.05] tracking-[-0.035em] text-[#30251F] font-normal"
              style={{ fontFamily: '"Bodoni Moda", "Cormorant Garamond", serif' }}
            >
              Rooted in <span className="italic font-normal">Tradition</span>.<br />
              Made with Love.
            </h2>

            {/* Narrative Description in DM Sans */}
            <motion.p 
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: prefersReducedMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 sm:mt-8 text-[15.5px] sm:text-[16.5px] xl:text-[17px] text-[#5C4D44] leading-[1.75] font-normal max-w-xl"
              style={{ fontFamily: '"DM Sans", "Montserrat", sans-serif' }}
            >
              Every dish carries the spirit of traditional culinary artistry — fragrant whole spices roasted in small batches, slow-simmered handis, and recipes perfected across generations. From delicate dosas and rich clay-pot curries to feast-worthy biryanis, we invite you to experience the warmth of home-style hospitality and the authentic soul of Indian gastronomy.
            </motion.p>
          </motion.div>

          {/* COLUMN 2 & 3: PHOTOGRAPHY WRAPPER (65% on desktop, paired on mobile/tablet) */}
          <div className="w-full lg:w-[65%] grid grid-cols-2 gap-4 sm:gap-6 lg:gap-7 xl:gap-8 items-center">
            
            {/* COLUMN 2: MIDDLE (32% on desktop) — Tall Rectangular Frame */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 35 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.85, delay: prefersReducedMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <div className="relative w-full h-[280px] sm:h-[400px] md:h-[460px] lg:h-[520px] xl:h-[560px] rounded-[18px] sm:rounded-[24px] lg:rounded-[28px] overflow-hidden bg-[#ECE5E0] shadow-[0_12px_32px_rgba(48,37,31,0.06)] group">
                <img 
                  src="/images/home/heritage-curry-handi.webp"
                  alt="Authentic Indian curry slow-simmered in a traditional clay handi"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                {/* Subtle soft ambient light vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40 pointer-events-none" />
              </div>
            </motion.div>

            {/* COLUMN 3: RIGHT (33% on desktop) — Tall Oval-Shaped Frame */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.85, delay: prefersReducedMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex justify-center"
            >
              <div className="relative w-full h-[280px] sm:h-[400px] md:h-[460px] lg:h-[520px] xl:h-[560px] rounded-[999px] overflow-hidden bg-[#ECE5E0] shadow-[0_12px_32px_rgba(48,37,31,0.06)] group">
                <img 
                  src="/images/home/heritage-dining-feast.webp"
                  alt="Authentic Indian dining experience featuring traditional gold bangles"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-[48%_35%] transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                {/* Subtle soft ambient light vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40 pointer-events-none" />
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
