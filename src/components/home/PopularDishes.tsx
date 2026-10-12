import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Link } from 'react-router-dom';

export interface MenuItemData {
  id: string;
  name: string;
  price: number | string;
  description?: string;
  isBestseller?: boolean;
  isAvailable?: boolean;
}

// Authentic signature dishes from The Bangalore Kitchen as fallback/baseline
const FALLBACK_POPULAR_DISHES: MenuItemData[] = [
  {
    id: 'benne-masala-dosa',
    name: 'Benne Masala Dosa',
    price: 15.99,
    description: 'Crispy golden crepe generously roasted in butter (benne) and filled with spiced potato masala',
    isBestseller: true,
  },
  {
    id: 'paneer-butter-masala',
    name: 'Paneer Butter Masala',
    price: 21.99,
    description: 'Fresh cottage cheese cubes simmered in a velvety, rich and creamy tomato-cashew gravy',
    isBestseller: true,
  },
  {
    id: 'mutton-donne-biryani',
    name: 'Bangalore Mutton Donne Biryani',
    price: 33.99,
    description: 'Fragrant short-grain seeraga samba rice cooked with tender mutton, fresh coriander, and mint green masala',
    isBestseller: true,
  },
  {
    id: 'veg-hakka-noodles',
    name: 'Veg Hakka Noodles',
    price: 19.99,
    description: 'Classic wok-tossed noodles with crisp seasonal vegetables, garlic, scallions, and savory seasonings',
    isBestseller: true,
  },
  {
    id: 'butter-chicken',
    name: 'Butter Chicken',
    price: 23.99,
    description: 'Tender chicken morsels slow-simmered in an aromatic makhani sauce scented with dried fenugreek',
    isBestseller: true,
  },
  {
    id: 'chicken-65',
    name: 'Chicken 65',
    price: 19.99,
    description: 'Spiced chicken bites marinated with curry leaves, crushed pepper, yogurt, and golden roasted spices',
    isBestseller: true,
  },
  {
    id: 'chicken-65-biryani',
    name: 'Chef Special Chicken 65 Biryani',
    price: 24.99,
    description: 'Fragrant spiced biryani layered with fiery crispy Chicken 65 tossed in bold South Indian chef spices',
    isBestseller: true,
  },
  {
    id: 'gulab-jamun',
    name: 'Gulab Jamun',
    price: 7.99,
    description: 'Delicate melt-in-the-mouth golden dumplings soaked in warm aromatic rose-cardamom sugar syrup',
    isBestseller: true,
  },
];

/* =========================================================================
   AUTHENTIC INDIAN FLORAL MANDALA SVG LINE ART
   Traditional 16-fold symmetrical line illustration (~115px)
   ========================================================================= */
function MandalaOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      stroke="#17201E"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer subtle guide & dash circle */}
      <circle cx="100" cy="100" r="94" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.45" />
      <circle cx="100" cy="100" r="88" strokeWidth="0.9" opacity="0.75" />
      
      {/* 16 Outer floral petal peaks */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        return (
          <g key={`petal-16-${i}`} transform={`rotate(${angle} 100 100)`}>
            <path
              d="M100 12 C96 26 91 38 88 48 C94 50 106 50 112 48 C109 38 104 26 100 12 Z"
              strokeWidth="0.8"
              opacity="0.8"
            />
            <circle cx="100" cy="12" r="1.6" fill="#17201E" opacity="0.9" />
          </g>
        );
      })}

      {/* Middle concentric floral rings */}
      <circle cx="100" cy="100" r="66" strokeWidth="0.7" opacity="0.6" />
      <circle cx="100" cy="100" r="60" strokeWidth="0.9" opacity="0.8" />

      {/* 8 Prominent traditional lotus petals */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8;
        return (
          <g key={`lotus-8-${i}`} transform={`rotate(${angle} 100 100)`}>
            <path
              d="M100 40 C84 56 83 74 100 90 C117 74 116 56 100 40 Z"
              strokeWidth="0.95"
              opacity="0.85"
            />
            <path
              d="M100 40 L100 90"
              strokeWidth="0.5"
              strokeDasharray="1.5 2"
              opacity="0.5"
            />
          </g>
        );
      })}

      {/* Inner petal layer & medallion */}
      <circle cx="100" cy="100" r="36" strokeWidth="0.8" opacity="0.75" />
      <circle cx="100" cy="100" r="30" strokeWidth="0.7" strokeDasharray="1.5 2" opacity="0.55" />

      {/* 8 Inner bloom petals */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8 + 22.5;
        return (
          <g key={`inner-bloom-${i}`} transform={`rotate(${angle} 100 100)`}>
            <path
              d="M100 70 C93 78 93 88 100 94 C107 88 107 78 100 70 Z"
              strokeWidth="0.8"
              opacity="0.8"
            />
          </g>
        );
      })}

      {/* Center Sacred Bindu / Pearl */}
      <circle cx="100" cy="100" r="13" strokeWidth="0.9" opacity="0.85" />
      <circle cx="100" cy="100" r="6.5" strokeWidth="0.75" opacity="0.7" />
      <circle cx="100" cy="100" r="2.8" fill="#17201E" opacity="0.9" />
    </svg>
  );
}

export function PopularDishes() {
  const [dishes, setDishes] = useState<MenuItemData[]>(FALLBACK_POPULAR_DISHES);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Listen to Firestore menu items in real-time
  useEffect(() => {
    const q = query(collection(db, 'menuItems'), where('isAvailable', '==', true));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const liveItems = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as MenuItemData[];

        // Prioritize bestsellers first, or match signature popular dishes
        const preferredNames = [
          'Benne Masala Dosa',
          'Butter Chicken',
          'Paneer Butter Masala',
          'Chicken 65',
          'Chef Special Chicken 65 Biryani',
          'Bangalore Mutton Donne Biryani',
          'Veg Hakka Noodles',
          'Gulab Jamun',
          'Onion Mysore Masala Dosa',
          'Chilli Paneer',
          'Veg Biryani'
        ];

        const selected: MenuItemData[] = [];
        const usedIds = new Set<string>();

        // 1. Any dish explicitly marked isBestseller
        liveItems.forEach(item => {
          if (item.isBestseller && selected.length < 8) {
            selected.push(item);
            usedIds.add(item.id);
          }
        });

        // 2. Signature dishes present in database
        preferredNames.forEach(name => {
          if (selected.length < 8) {
            const match = liveItems.find(i => 
              !usedIds.has(i.id) && 
              i.name && 
              i.name.toLowerCase().includes(name.toLowerCase())
            );
            if (match) {
              selected.push(match);
              usedIds.add(match.id);
            }
          }
        });

        // 3. Any remaining available dishes to complete exactly 8 items
        if (selected.length < 8) {
          liveItems.forEach(item => {
            if (!usedIds.has(item.id) && selected.length < 8) {
              selected.push(item);
              usedIds.add(item.id);
            }
          });
        }

        if (selected.length === 8) {
          setDishes(selected);
        } else if (selected.length > 0) {
          // Merge with fallbacks to ensure full 8 items
          const filled = [...selected];
          FALLBACK_POPULAR_DISHES.forEach(f => {
            if (filled.length < 8 && !filled.some(item => item.name === f.name)) {
              filled.push(f);
            }
          });
          setDishes(filled);
        }
      }
    }, (error) => {
      console.warn("Using fallback dishes for popular menu:", error);
    });

    return () => unsubscribe();
  }, []);

  const leftItems = dishes.slice(0, 4);
  const rightItems = dishes.slice(4, 8);

  return (
    <section 
      aria-label="Popular Dishes"
      className="relative w-full bg-[#F7F2EF] pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-24 lg:pb-32 overflow-hidden select-none"
    >
      <div className="max-w-[1150px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            TOP CENTER: DELICATE SCRIPT EYEBROW + EDITORIAL SERIF HEADING
            ========================================================================= */}
        <div className="flex flex-col items-center text-center">
          
          {/* Delicate handwritten script "our menu" in warm terracotta #D95740 */}
          <motion.span
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[34px] sm:text-[40px] lg:text-[46px] text-[#D95740] font-normal tracking-wide -mb-1.5 select-none"
            style={{ fontFamily: '"Mrs Saint Delafield", "Alex Brush", cursive' }}
          >
            our menu
          </motion.span>

          {/* High-contrast luxury serif heading: Popular Dishes */}
          <motion.h2
            initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.75, delay: prefersReducedMotion ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-[44px] sm:text-[56px] lg:text-[68px] xl:text-[74px] font-normal leading-[1.08] tracking-[-0.025em] text-[#17201E]"
            style={{ fontFamily: '"Italiana", "Bodoni Moda", serif' }}
          >
            Popular Dishes
          </motion.h2>

        </div>

        {/* =========================================================================
            SYMMETRICAL TWO-COLUMN EDITORIAL MENU WITH CENTRAL ORNAMENT
            - 4 dishes in left column
            - Delicate floral mandala line art between columns
            - 4 dishes in right column
            ========================================================================= */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-8 mt-14 sm:mt-16 lg:mt-20">
          
          {/* LEFT COLUMN: 4 Dishes */}
          <motion.div 
            initial={prefersReducedMotion ? false : { opacity: 0, x: -22 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.75, delay: prefersReducedMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[calc(50%-75px)] flex flex-col gap-8 sm:gap-9"
          >
            {leftItems.map((item, idx) => (
              <DishItem key={item.id || idx} item={item} />
            ))}
          </motion.div>

          {/* CENTRAL GAP: INTRICATE FLORAL MANDALA (Desktop) */}
          <div className="hidden lg:flex w-[150px] self-center items-center justify-center shrink-0">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, rotate: -15, scale: 0.9 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, rotate: 0, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 1.2, delay: prefersReducedMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="w-[125px] h-[125px] flex items-center justify-center"
            >
              <MandalaOrnament className="w-[115px] h-[115px]" />
            </motion.div>
          </div>

          {/* MOBILE/TABLET ORNAMENTAL SEPARATOR */}
          <div className="flex lg:hidden w-full items-center justify-center my-2">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, rotate: -15 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-[85px] h-[85px] flex items-center justify-center opacity-80"
            >
              <MandalaOrnament className="w-[80px] h-[80px]" />
            </motion.div>
          </div>

          {/* RIGHT COLUMN: 4 Dishes */}
          <motion.div 
            initial={prefersReducedMotion ? false : { opacity: 0, x: 22 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.75, delay: prefersReducedMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[calc(50%-75px)] flex flex-col gap-8 sm:gap-9"
          >
            {rightItems.map((item, idx) => (
              <DishItem key={item.id || idx} item={item} />
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
}

interface DishItemProps {
  item: MenuItemData;
  key?: React.Key;
}

function DishItem({ item }: DishItemProps) {
  return (
    <div className="w-full flex flex-col group/dish cursor-pointer">
      {/* Top Row: Dish Name ... Dots ... Price */}
      <div className="flex items-baseline justify-between w-full">
        {/* Dish Title */}
        <span 
          className="font-normal text-[22px] sm:text-[24px] lg:text-[25px] text-[#17201E] tracking-tight transition-all duration-300 group-hover/dish:text-[#D95740] group-hover/dish:translate-x-1 shrink-0"
          style={{ fontFamily: '"Italiana", "Bodoni Moda", serif' }}
        >
          {item.name}
        </span>

        {/* Delicate dotted leader line aligned to baseline */}
        <div 
          className="flex-1 mx-2 sm:mx-3 border-b-[1.5px] border-dotted border-[#A39990]/65 group-hover/dish:border-[#D95740]/80 transition-colors duration-300 relative -top-[4px]" 
        />

        {/* Price in matching luxury serif */}
        <span 
          className="font-normal text-[20px] sm:text-[22px] lg:text-[23px] text-[#17201E] tracking-tight shrink-0 transition-colors duration-300 group-hover/dish:text-[#D95740]"
          style={{ fontFamily: '"Italiana", "Bodoni Moda", serif' }}
        >
          ${Number(item.price).toFixed(2)}
        </span>
      </div>

      {/* Description below in soft muted gray DM Sans */}
      <p 
        className="mt-1 text-[12px] sm:text-[13px] text-[#736B63] leading-[1.65] line-clamp-2 pr-4 transition-colors duration-200 group-hover/dish:text-[#524942]"
        style={{ fontFamily: '"DM Sans", "Montserrat", sans-serif' }}
      >
        {item.description || `Authentic ${item.name} prepared fresh with traditional herbs and whole spices.`}
      </p>
    </div>
  );
}
