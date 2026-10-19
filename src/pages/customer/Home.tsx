import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Star, Clock, MapPin, Megaphone } from 'lucide-react';
import { collection, query, where, onSnapshot, orderBy, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { HeroSlider } from '../../components/home/HeroSlider';
import { CategoryShowcase } from '../../components/home/CategoryShowcase';
import { CulinaryHeritage } from '../../components/home/CulinaryHeritage';
import { PopularDishes } from '../../components/home/PopularDishes';
import { ChefStory } from '../../components/home/ChefStory';
import { NamaskarExperience } from '../../components/home/NamaskarExperience';
import { CraftedInvitation } from '../../components/home/CraftedInvitation';
import { OurLocation } from '../../components/home/OurLocation';

export function Home() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [homeBanner, setHomeBanner] = useState<any>(null);

  useEffect(() => {
    const bannerDocRef = doc(db, 'settings', 'homeBanner');
    const unsubscribeBanner = onSnapshot(bannerDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data && data.isActive !== false) {
          setHomeBanner(data);
        } else {
          setHomeBanner(null);
        }
      }
    });

    const now = new Date().toISOString();
    const q = query(
      collection(db, 'appAnnouncements'),
      orderBy('priority', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const activeAnnouncements = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((ann: any) => ann.active !== false)
        .filter((ann: any) => {
          const start = ann.startDate || '';
          const end = ann.endDate || '';
          return (!start || start <= now) && (!end || end >= now);
        });
      setAnnouncements(activeAnnouncements);
    }, (error) => {
      console.error("Error fetching announcements:", error);
    });

    return () => {
      unsubscribe();
      unsubscribeBanner();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F2EF]">
      <Helmet>
        <title>The Bangalore Kitchen | Authentic Indian Flavours</title>
        <meta name="description" content="Experience the finest vegetarian cuisine at The Bangalore Kitchen. Order online or book a table today." />
      </Helmet>
      {/* Hero Section */}
      <HeroSlider homeBanner={homeBanner} />

      {/* Interactive Food Categories Showcase */}
      <CategoryShowcase />

      {/* Culinary Heritage Storytelling Section */}
      <CulinaryHeritage />

      {/* Editorial Luxury Popular Dishes Menu Section */}
      <PopularDishes />

      {/* Authentic Bangalore Kitchen Chef & Atmosphere Spotlight */}
      <ChefStory />

      {/* Combined Namaskar & Restaurant Qualities Section */}
      <NamaskarExperience />

      {/* Announcements Section (Mobile App Style) */}
      {announcements.length > 0 && (
        <section className="py-12 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-8">
              <Megaphone className="text-bangalore-primary" size={24} />
              <h2 className="text-2xl font-serif font-bold text-gray-900">Latest Announcements</h2>
            </div>
            
            <div className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar snap-x">
              {announcements.map((ann, idx) => (
                <motion.div 
                  key={ann.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="min-w-[300px] md:min-w-[400px] rounded-3xl p-6 snap-center shadow-lg shadow-gray-200/50 border border-gray-100 flex flex-col justify-between"
                  style={{ backgroundColor: ann.backgroundColor || '#ffffff', color: ann.textColor || '#1f2937' }}
                >
                  <div>
                    <h3 className="text-xl font-bold mb-2">{ann.title}</h3>
                    <p className="opacity-90 text-sm leading-relaxed mb-6">{ann.message}</p>
                  </div>
                  
                  {ann.buttonText && ann.buttonLink && (
                    <a 
                      href={ann.buttonLink}
                      className="inline-flex items-center gap-2 font-bold text-sm hover:underline"
                    >
                      {ann.buttonText} <ArrowRight size={16} />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Menu Invitation CTA */}
      <CraftedInvitation />

      {/* Premium Our Location Section */}
      <OurLocation />
    </div>
  );
}
