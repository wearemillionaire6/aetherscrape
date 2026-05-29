'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookingStore } from '@/lib/store';

interface CountryGallery {
  id: string;
  name: string;
  specialty: string;
  images: string[];
}

const GALLERIES: CountryGallery[] = [
  {
    id: 'japan',
    name: 'JAPAN',
    specialty: 'Zen Mountains & Bamboo Forests',
    images: [
      '/images/japan_bamboo.png',
      '/images/japan_temple.png',
      '/images/swiss_alps.png',
    ],
  },
  {
    id: 'morocco',
    name: 'MOROCCO',
    specialty: 'Dunes & Desert Mountain Ranges',
    images: [
      '/images/sahara_desert.png',
      '/images/morocco_souk.png',
      '/images/swiss_alps.png',
    ],
  },
  {
    id: 'italy',
    name: 'ITALY',
    specialty: 'Amalfi Coastal Beaches & Cliffside Ridges',
    images: [
      '/images/amalfi_coast.png',
      '/images/tropical_beach.png',
      '/images/swiss_alps.png',
    ],
  },
  {
    id: 'iceland',
    name: 'ICELAND',
    specialty: 'Volcanic Black Beaches & Basalt Columns',
    images: [
      '/images/iceland_beach.png',
      '/images/swiss_alps.png',
      '/images/tropical_beach.png',
    ],
  },
];

export function ExploreSlideshow() {
  const [activeTab, setActiveTab] = useState('japan');
  const [imageIndex, setImageIndex] = useState(0);

  const activeGallery = GALLERIES.find((g) => g.id === activeTab) || GALLERIES[0];

  // Rotate images in active gallery
  useEffect(() => {
    setImageIndex(0); // Reset index on tab change
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % activeGallery.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeTab, activeGallery.images.length]);

  return (
    <div className="w-full space-y-8 bg-neutral-50 p-6 md:p-10 border border-neutral-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-neutral-200 pb-4 gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400 block">
            Visual Exploration // Tabbed Slideshow
          </span>
          <h3 className="text-xl font-mono uppercase text-black font-semibold mt-1">
            Country Specialty Canvas
          </h3>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2">
          {GALLERIES.map((gal) => (
            <button
              key={gal.id}
              onClick={() => setActiveTab(gal.id)}
              className={`px-4 py-1.5 text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer border ${
                activeTab === gal.id
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-neutral-200 hover:border-black'
              }`}
            >
              {gal.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Slideshow Screen */}
        <div className="lg:col-span-8 relative aspect-[16/9] w-full overflow-hidden bg-neutral-900 border border-neutral-200">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${imageIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={activeGallery.images[imageIndex]}
                alt={activeGallery.name}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Subtle indicator dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-25 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
            {activeGallery.images.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  idx === imageIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Info panel */}
        <div className="lg:col-span-4 space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">
            Specialty Showcase // {activeGallery.name}
          </span>
          <h4 className="text-2xl font-serif text-black uppercase leading-tight">
            {activeGallery.specialty}
          </h4>
          <p className="text-xs text-neutral-500 font-light leading-relaxed">
            Experience mountains and beaches in full visual definition. WanderTales local chronicles curate individual photo essays capturing these natural features so you can trace landscapes before booking.
          </p>
          <div className="pt-2">
            <button
              onClick={() => useBookingStore.getState().openModal(activeGallery.name)}
              className="border border-black text-black hover:bg-black hover:text-white px-6 py-2.5 text-xs font-mono uppercase tracking-[0.15em] transition-all cursor-pointer font-semibold"
            >
              Request {activeGallery.name} Itinerary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
