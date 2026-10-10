import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Star, Clock, MapPin, Megaphone } from 'lucide-react';
import { collection, query, where, onSnapshot, orderBy, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

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
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>The Bangalore Kitchen | Authentic Indian Flavours</title>
        <meta name="description" content="Experience the finest vegetarian cuisine at The Bangalore Kitchen. Order online or book a table today." />
      </Helmet>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <picture>
            <source srcSet="/images/home/hero-banner-480.webp 480w, /images/home/hero-banner-800.webp 800w, /images/home/hero-banner-1200.webp 1200w, /images/home/hero-banner.webp 1672w" sizes="100vw" type="image/webp" />
            <img 
              src={homeBanner?.imageUrl || "/images/home/hero-banner.webp"} 
              alt="Authentic Indian Restaurant dining ambiance" 
              className="w-full h-full object-cover object-center brightness-110 contrast-105"
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="async"
              width="1672"
              height="941"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <span className="inline-block mt-12 md:mt-0 py-1.5 px-4 rounded-full bg-black/60 border border-amber-400/50 text-amber-300 text-xs md:text-sm font-semibold tracking-widest uppercase mb-6 backdrop-blur-md shadow-lg">
              {homeBanner?.tag || "Premium Indian Dining"}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight whitespace-pre-line text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
              {homeBanner?.title || <>Authentic Flavours, <br/><span className="text-amber-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">Modern Tradition.</span></>}
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-xl leading-relaxed whitespace-pre-line font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {homeBanner?.subtitle || "Experience the finest Indian cuisine crafted with passion, premium ingredients, and warm hospitality."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={homeBanner?.buttonLink || "/menu"} className="bg-amber-400 text-gray-900 hover:bg-white px-8 py-4 rounded-full font-bold text-lg transition-all text-center flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105">
                {homeBanner?.buttonText || "Order Online"} {(!homeBanner || homeBanner.buttonText === 'Order Online' || homeBanner.buttonText === 'Order Now') && <ArrowRight size={20} />}
              </Link>
              {!homeBanner && (
                <Link to="/reserve" className="bg-white/10 backdrop-blur-md border border-white/40 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all text-center shadow-lg hover:scale-105">
                  Book a Table
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

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

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Star, title: "Premium Quality", desc: "Finest ingredients sourced daily for authentic taste." },
              { icon: Clock, title: "Fast Delivery", desc: "Hot and fresh food delivered right to your doorstep." },
              { icon: MapPin, title: "Multiple Locations", desc: "Find a The Bangalore Kitchen branch near you." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-bangalore-ivory flex items-center justify-center text-bangalore-primary mb-6">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-bangalore-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Explore Our Menu</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our wide range of delicious Indian offerings, from authentic dosas to flavourful biryanis and coastal specialties.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { name: "South Indian", img: "/images/home/cat-south-indian.webp" },
              { name: "Biryani", img: "/images/home/cat-biryani.webp" },
              { name: "Dosa", img: "/images/home/cat-dosa.webp" },
              { name: "Coastal Specials", img: "/images/home/cat-coastal.webp" }
            ].map((cat, idx) => (
              <Link key={idx} to={`/menu?category=${cat.name.toLowerCase().replace(' ', '-')}`} className="group relative rounded-2xl overflow-hidden aspect-square">
                <picture>
                  <source srcSet={cat.img} type="image/webp" />
                  <img src={cat.img} alt={`${cat.name} cuisine specials`} loading="lazy" decoding="async" width="800" height="800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <h3 className="text-white font-serif font-bold text-xl md:text-2xl">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/menu" className="inline-flex items-center gap-2 text-bangalore-primary font-bold hover:text-bangalore-primary transition-colors">
              View Full Menu <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
