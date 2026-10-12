import React from 'react';
import { motion } from 'motion/react';

// Custom refined coral line-art SVG icons (1.5px outline stroke, #E76850)
function QualityIngredientsIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 52 52" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-hidden="true"
    >
      {/* Central Star Anise / Botanical spice flower */}
      <circle cx="26" cy="24" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      {/* Radiating botanical pods */}
      <path d="M26 13C26 13 28.5 17 28.5 20.5C28.5 20.5 26 21 26 21C26 21 23.5 20.5 23.5 20.5C23.5 17 26 13 26 13Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M37 24C37 24 33 26.5 29.5 26.5C29.5 26.5 29 24 29 24C29 24 29.5 21.5 29.5 21.5C33 21.5 37 24 37 24Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M26 35C26 35 23.5 31 23.5 27.5C23.5 27.5 26 27 26 27C26 27 28.5 27.5 28.5 27.5C28.5 31 26 35 26 35Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M15 24C15 24 19 21.5 22.5 21.5C22.5 21.5 23 24 23 24C23 24 22.5 26.5 22.5 26.5C19 26.5 15 24 15 24Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Diagonal pods */}
      <path d="M33.8 16.2C33.8 16.2 31.5 20.5 28.5 22.5C28.5 22.5 27.5 20.5 27.5 20.5C29.5 17.5 33.8 16.2 33.8 16.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M18.2 31.8C18.2 31.8 20.5 27.5 23.5 25.5C23.5 25.5 24.5 27.5 24.5 27.5C22.5 30.5 18.2 31.8 18.2 31.8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Organic leaves / cinnamon quill accents below */}
      <path d="M17 41C21 38 27 38 31 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M21 44C25 41 31 41 35 43" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Floating spice seeds */}
      <circle cx="39" cy="14" r="1.2" fill="currentColor" />
      <circle cx="13" cy="18" r="1.2" fill="currentColor" />
      <circle cx="38" cy="34" r="1.2" fill="currentColor" />
    </svg>
  );
}

function ThreeCuisinesIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 52 52" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-hidden="true"
    >
      {/* Base Serving Platter / Tray */}
      <path d="M9 38C19 41 33 41 43 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Center Main Cloche / Steaming Handi */}
      <path d="M17 34C17 24 35 24 35 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 34H37" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="26" cy="22" r="2" stroke="currentColor" strokeWidth="1.5" />
      {/* Left South Indian Bowl / Dosa accent */}
      <path d="M11 31C11 26 19 26 19 31" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9 31H21" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="15" cy="24.5" r="1.2" stroke="currentColor" strokeWidth="1.2" />
      {/* Right Indo-Chinese Wok / Bowl */}
      <path d="M33 31C33 26 41 26 41 31" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M31 31H43" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="37" cy="24.5" r="1.2" stroke="currentColor" strokeWidth="1.2" />
      {/* Rising fragrant steam tendrils */}
      <path d="M23 16C23 13 25 12 25 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M29 17C29 14 27 13 27 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="26" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function AuthenticFlavoursIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 52 52" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-hidden="true"
    >
      {/* Traditional Indian Handi / Brass Pot */}
      <path d="M16 23H36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 20H34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 23C15 28 15 36 21 40C23.5 41.5 28.5 41.5 31 40C37 36 37 28 34 23" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Handi side brass handles */}
      <path d="M15 26C12 26 12 30 15 30" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M37 26C40 26 40 30 37 30" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      {/* Subtle aromatic spice herbs floating inside */}
      <path d="M23 30C26 31 29 29 30 32" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      {/* Aromatic rising steam swirls */}
      <path d="M22 15C21 11 25 9 24 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M27 16C29 12 27 10 29 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M32 14C33 11 31 9 32 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="25" cy="4" r="1" fill="currentColor" />
    </svg>
  );
}

function MadeWithCareIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 52 52" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-hidden="true"
    >
      {/* Gentle Welcoming Hands cradling warmth */}
      {/* Left Hand */}
      <path d="M13 36C17 38 21 37 24 33L21 29C19 28 16 30 13 36Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M11 39C16 41 21 39 25 35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Right Hand */}
      <path d="M39 36C35 38 31 37 28 33L31 29C33 28 36 30 39 36Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M41 39C36 41 31 39 27 35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Welcoming Heart / Traditional Diya Flame in Center */}
      <path d="M26 23C26 23 21 19 21 15.5C21 13 23 11 25.5 11C26.5 11 27 11.8 26 13C25 11.8 25.5 11 26.5 11C29 11 31 13 31 15.5C31 19 26 23 26 23Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Warm radiating aura dots */}
      <circle cx="26" cy="6.5" r="1.2" fill="currentColor" />
      <circle cx="19" cy="8.5" r="1" fill="currentColor" />
      <circle cx="33" cy="8.5" r="1" fill="currentColor" />
    </svg>
  );
}

const RESTAURANT_FEATURES = [
  {
    icon: QualityIngredientsIcon,
    title: 'Quality Ingredients',
    description: 'Carefully selected ingredients for flavourful dishes.',
  },
  {
    icon: ThreeCuisinesIcon,
    title: 'Three Cuisines',
    description: 'Indian, South Indian and Indo-Chinese favourites.',
  },
  {
    icon: AuthenticFlavoursIcon,
    title: 'Authentic Flavours',
    description: 'Inspired by beloved regional dishes and traditions.',
  },
  {
    icon: MadeWithCareIcon,
    title: 'Made with Care',
    description: 'A welcoming experience for every dining occasion.',
  },
];

export function NamaskarExperience() {
  return (
    <section 
      aria-label="Namaskar & Restaurant Qualities"
      className="relative w-full bg-[#F7F1ED] pt-16 pb-20 md:pt-20 md:pb-24 lg:pt-22 lg:pb-26 overflow-hidden select-none"
    >
      <div className="max-w-[1250px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* ================= STEP 1 & 2: NAMASKAR ARTWORK & HINDI GREETING ================= */}
        <div className="flex flex-col items-center justify-center text-center mb-7 sm:mb-8 lg:mb-10">
          
          {/* STEP 1: Black Indian Namaskar Line-Art Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center select-none"
          >
            <img
              src="/images/namaskar-artwork.png"
              alt="Traditional Indian Namaskar illustration with folded hands and female profile"
              className="h-[105px] sm:h-[120px] lg:h-[135px] xl:h-[142px] w-auto object-contain filter contrast-125"
              loading="lazy"
            />
          </motion.div>

          {/* STEP 2: The Hindi word "नमस्कार" in Noto Serif Devanagari, vermilion #D64B31 */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              fontFamily: "'Noto Serif Devanagari', serif",
              color: '#D64B31',
              fontWeight: 600,
            }}
            className="text-2xl sm:text-[26px] lg:text-[28px] mt-3 sm:mt-3.5 tracking-normal select-none leading-tight"
          >
            नमस्कार
          </motion.p>
        </div>

        {/* ================= STEP 3: ELEGANT MAIN STATEMENT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[900px] mx-auto text-center mb-14 sm:mb-16 lg:mb-20"
        >
          <h2
            style={{ 
              fontFamily: "'Bodoni Moda', 'Cormorant Garamond', serif",
              color: '#222522',
              letterSpacing: '-0.03em',
              lineHeight: 1.16,
              fontWeight: 400
            }}
            className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] select-none"
          >
            Where every flavour becomes part of<br className="hidden sm:inline" />{' '}
            an <span className="italic font-normal">unforgettable dining experience</span>.
          </h2>
        </motion.div>

        {/* ================= STEP 4: FOUR REFINED RESTAURANT QUALITIES ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-6 xl:gap-8">
          {RESTAURANT_FEATURES.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.4 + idx * 0.12, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="group flex flex-col items-center text-center cursor-default select-none px-2"
              >
                {/* Thin Coral Outline Icon with smooth upward float on hover */}
                <div className="w-[50px] h-[50px] sm:w-[52px] sm:h-[52px] mb-4 sm:mb-5 text-[#E76850] group-hover:text-[#D64B31] transition-all duration-300 ease-out transform group-hover:-translate-y-1">
                  <IconComponent className="w-full h-full" />
                </div>

                {/* Feature Title (Bodoni Moda / Luxury Serif, 400 weight, Espresso #292521) */}
                <h3
                  style={{ 
                    fontFamily: "'Bodoni Moda', 'Cormorant Garamond', serif",
                    fontWeight: 400,
                  }}
                  className="text-[22px] sm:text-2xl lg:text-[25px] text-[#292521] group-hover:text-[#D64B31] transition-colors duration-300 tracking-tight mb-2"
                >
                  {feature.title}
                </h3>

                {/* Description (DM Sans, 13-14px, Warm gray #80756F, leading 1.65) */}
                <p 
                  style={{ 
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.65,
                  }}
                  className="text-[13.5px] lg:text-[14px] text-[#80756F] max-w-[250px] mx-auto font-normal"
                >
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
