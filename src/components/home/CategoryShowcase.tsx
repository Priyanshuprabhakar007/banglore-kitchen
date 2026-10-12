import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export interface CategoryItem {
  id: string;
  name: string;
  dish: string;
  image: string;
  queryParam: string;
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'south-indian',
    name: 'South Indian',
    dish: 'Masala Dosa',
    image: '/images/home/categories/cat-south-indian.webp',
    queryParam: 'south-indian',
  },
  {
    id: 'indian-veg',
    name: 'Indian Veg',
    dish: 'Paneer Butter Masala',
    image: '/images/home/categories/cat-indian-veg.webp',
    queryParam: 'indian-veg',
  },
  {
    id: 'indian-non-veg',
    name: 'Indian Non-Veg',
    dish: 'Butter Chicken',
    image: '/images/home/categories/cat-indian-nonveg.webp',
    queryParam: 'indian-non-veg',
  },
  {
    id: 'indo-chinese',
    name: 'Indo-Chinese',
    dish: 'Hakka Noodles',
    image: '/images/home/categories/cat-indo-chinese.webp',
    queryParam: 'indo-chinese',
  },
  {
    id: 'biryani',
    name: 'Biryani',
    dish: 'Chicken Biryani',
    image: '/images/home/categories/cat-biryani.webp',
    queryParam: 'biryani',
  },
  {
    id: 'desserts-beverages',
    name: 'Desserts & Beverages',
    dish: 'Gulab Jamun with Mango Lassi',
    image: '/images/home/categories/cat-desserts-beverages.webp',
    queryParam: 'desserts-beverages',
  },
];

export function CategoryShowcase() {
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
      aria-label="Food Categories Showcase"
      className="relative w-full bg-[#F7F2EF] pt-4 sm:pt-6 lg:pt-8 pb-14 sm:pb-16 lg:pb-20 overflow-hidden select-none"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            DESKTOP LAYOUT: Exactly 6 columns in one single horizontal row (No horizontal scroll)
            ========================================================================= */}
        <div className="hidden lg:grid grid-cols-6 gap-4 xl:gap-6 justify-items-center items-start">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{
                duration: 0.55,
                delay: prefersReducedMotion ? 0 : index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full flex flex-col items-center"
            >
              <Link
                to={`/menu?category=${cat.queryParam}`}
                aria-label={`Explore ${cat.name} menu`}
                className="group flex flex-col items-center text-center cursor-pointer focus:outline-none w-full"
              >
                {/* Floating dish image wrapper with natural lift & scale */}
                <div className="relative w-full flex flex-col items-center justify-center">
                  <div className="relative transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:scale-[1.06]">
                    <img
                      src={cat.image}
                      alt={cat.dish}
                      loading="lazy"
                      decoding="async"
                      width="180"
                      height="155"
                      className="w-[165px] h-[145px] xl:w-[180px] xl:h-[155px] object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.10)] transition-all duration-400 group-hover:drop-shadow-[0_18px_24px_rgba(0,0,0,0.16)]"
                    />
                  </div>
                  {/* Subtle realistic ground shadow ellipse */}
                  <div className="w-[120px] xl:w-[135px] h-3.5 mx-auto -mt-2 rounded-[100%] bg-black/14 blur-[6px] transition-all duration-400 ease-out group-hover:scale-90 group-hover:bg-black/22 group-hover:blur-[8px]" />
                </div>

                {/* Elegant high-contrast serif category label */}
                <h3 className="mt-4 xl:mt-5 font-serif text-[21px] xl:text-[23px] font-normal xl:font-medium text-[#29211F] leading-tight tracking-tight">
                  <span className="relative inline-block transition-colors duration-300 group-hover:text-[#B85D38]">
                    {cat.name}
                    {/* Animated subtle copper underline */}
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#B85D38] rounded-full transition-all duration-300 ease-out group-hover:w-full" />
                  </span>
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* =========================================================================
            TABLET LAYOUT: 3 categories per row arranged in 2 balanced rows
            ========================================================================= */}
        <div className="hidden sm:grid lg:hidden grid-cols-3 gap-8 md:gap-10 justify-items-center items-start max-w-3xl mx-auto">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{
                duration: 0.55,
                delay: prefersReducedMotion ? 0 : index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full flex flex-col items-center"
            >
              <Link
                to={`/menu?category=${cat.queryParam}`}
                aria-label={`Explore ${cat.name} menu`}
                className="group flex flex-col items-center text-center cursor-pointer focus:outline-none w-full"
              >
                <div className="relative w-full flex flex-col items-center justify-center">
                  <div className="relative transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:scale-[1.06]">
                    <img
                      src={cat.image}
                      alt={cat.dish}
                      loading="lazy"
                      decoding="async"
                      width="170"
                      height="150"
                      className="w-[160px] h-[145px] object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.10)] transition-all duration-400 group-hover:drop-shadow-[0_18px_24px_rgba(0,0,0,0.16)]"
                    />
                  </div>
                  <div className="w-[120px] h-3.5 mx-auto -mt-2 rounded-[100%] bg-black/14 blur-[6px] transition-all duration-400 ease-out group-hover:scale-90 group-hover:bg-black/22" />
                </div>

                <h3 className="mt-4 font-serif text-[21px] font-normal text-[#29211F] leading-tight tracking-tight">
                  <span className="relative inline-block transition-colors duration-300 group-hover:text-[#B85D38]">
                    {cat.name}
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#B85D38] rounded-full transition-all duration-300 ease-out group-hover:w-full" />
                  </span>
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* =========================================================================
            MOBILE LAYOUT: Smooth swipeable row with 2–2.5 categories visible at once
            ========================================================================= */}
        <div className="sm:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar flex gap-4 pb-2 pt-1">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: prefersReducedMotion ? 0 : index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="snap-center shrink-0 w-[140px] flex flex-col items-center"
            >
              <Link
                to={`/menu?category=${cat.queryParam}`}
                aria-label={`Explore ${cat.name} menu`}
                className="group flex flex-col items-center text-center cursor-pointer focus:outline-none w-full active:scale-98 transition-transform"
              >
                <div className="relative w-full flex flex-col items-center justify-center">
                  <img
                    src={cat.image}
                    alt={cat.dish}
                    loading="lazy"
                    decoding="async"
                    width="135"
                    height="120"
                    className="w-[130px] h-[115px] object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.10)]"
                  />
                  <div className="w-[95px] h-3 mx-auto -mt-1.5 rounded-[100%] bg-black/14 blur-[5px]" />
                </div>

                <h3 className="mt-3 font-serif text-[18px] font-normal text-[#29211F] leading-tight tracking-tight">
                  <span className="relative inline-block">
                    {cat.name}
                  </span>
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
