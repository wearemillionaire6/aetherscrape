'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useBookingStore } from '@/lib/store';
import { Compass, Calendar, Mountain, Anchor, ChevronDown, ChevronUp } from 'lucide-react';

interface Place {
  id: string;
  name: string;
  tagline: string;
  bestTime: string;
  mountainSpec: string;
  beachSpec: string;
  highlights: string[];
  images: string[];
  itinerary: { day: string; title: string; desc: string }[];
}

const PLACES_DATA: Place[] = [
  {
    id: 'japan',
    name: 'Kyoto, Japan',
    tagline: 'Quiet Cedar Valleys & Historic Tea Houses',
    bestTime: 'October to November (Autumn Leaves)',
    mountainSpec: 'Mount Hiei (848m) & Daimonji peaks overlooking bamboo forests',
    beachSpec: 'Amanohashidate Pine Spit Beach lines on the Kyoto Sea',
    highlights: ['Traditional Chado tea ceremonies', 'Arashiyama Bamboo paths', 'Fushimi Inari stone trails'],
    images: ['/images/japan_bamboo.png', '/images/japan_temple.png'],
    itinerary: [
      { day: 'Day 01', title: 'Arrival at the Cedar Sanctuary', desc: 'Settle into a traditional Ryokan in the foothills. As evening falls, join a private tea preparation demonstration focusing on silent hand gestures.' },
      { day: 'Day 02', title: 'The Walk of Contemplation', desc: 'A morning trek through Mount Hiei\'s quiet paths. Discover hidden shrines shrouded in ancient cedar mist.' },
      { day: 'Day 03', title: 'Pine Beach Meditation', desc: 'Travel north to Kyoto Prefecture\'s coastal beaches. Walk the sand bar under old pine trees, finding a quiet coastal stillness.' }
    ]
  },
  {
    id: 'morocco',
    name: 'Sahara, Morocco',
    tagline: 'Nomadic Desert Camps & Golden Sand Waves',
    bestTime: 'October to April (Cool Desert Winds)',
    mountainSpec: 'High Atlas Range (Toubkal 4,167m) guarding the desert gate',
    beachSpec: 'Essaouira windswept beaches on the Atlantic Coast',
    highlights: ['Erg Chebbi dunes camel trekking', 'Bedouin fire pit storytelling', 'Ait Benhaddou clay pathways'],
    images: ['/images/sahara_desert.png', '/images/morocco_souk.png'],
    itinerary: [
      { day: 'Day 01', title: 'Crossing the Atlas Gate', desc: 'Journey across the High Atlas mountain passes. Watch the landscape transition from high jagged peaks to orange dust.' },
      { day: 'Day 02', title: 'Dunes of Erg Chebbi', desc: 'Arrive at the desert base. Trek into the golden dunes at sunset, watching the sun create vast shadows over the sands.' },
      { day: 'Day 03', title: 'The Bedouin Silence', desc: 'Wake up to the absolute silence of the Sahara. Spend the day reading and listening to the soft desert wind.' }
    ]
  },
  {
    id: 'italy',
    name: 'Amalfi Coast, Italy',
    tagline: 'Vertical Cliffside Lemon Groves & Turquoise Waters',
    bestTime: 'May to September (Sun-drenched Summers)',
    mountainSpec: 'Lattari Mountain Ridges (1,444m) framing the shoreline',
    beachSpec: 'Positano Beach & Marina Grande pebble lines',
    highlights: ['Path of the Gods clifftop walk', 'Cliffside citrus garden tours', 'Turquoise water boat excursions'],
    images: ['/images/amalfi_coast.png', '/images/tropical_beach.png'],
    itinerary: [
      { day: 'Day 01', title: 'Arrival on the Clifftops', desc: 'Check in to a cliffside villa in Positano. Sip local lemon infusion on the transparent terrace overlooking the sea.' },
      { day: 'Day 02', title: 'Trekking the Path of Gods', desc: 'Walk the high Lattari mountain trails. Spot wild rosemary bushes growing along the vertical stone cliffs.' },
      { day: 'Day 03', title: 'Positano Coast Line Swim', desc: 'Descend the vertical stone stairs to the pebble beach. Swim in the calm turquoise waters under the colorful houses.' }
    ]
  },
  {
    id: 'switzerland',
    name: 'Swiss Alps, Switzerland',
    tagline: 'Glacial Valleys & Snowy Basalt Spires',
    bestTime: 'December to March (Winter Snows)',
    mountainSpec: 'Matterhorn Peak (4,478m) towering over alpine meadows',
    beachSpec: 'Lake Geneva lakeside shores & clear mountain bays',
    highlights: ['Matterhorn panorama views', 'Thermal mineral spa sessions', 'Glacier express railway rides'],
    images: ['/images/swiss_alps.png', '/images/amalfi_coast.png'],
    itinerary: [
      { day: 'Day 01', title: 'Valleys of Silence', desc: 'Arrive in Zermatt. Take a horse-drawn sleigh through the car-free mountain village under the Matterhorn spire.' },
      { day: 'Day 02', title: 'High Altitude Snow Walk', desc: 'Walk the prepared winter trails above the tree line. Feel the cold, crisp mountain air matching the landscape.' },
      { day: 'Day 03', title: 'Glacial Spa Contemplation', desc: 'Unwind in outdoor mineral thermal pools, watching the steam rise against the background of snowy peaks.' }
    ]
  }
];

export function PlaceInformation() {
  const [selectedPlaceId, setSelectedPlaceId] = useState('japan');
  const [openDay, setOpenDay] = useState<string | null>('Day 01');
  const openBookingModal = useBookingStore((state) => state.openModal);

  const activePlace = PLACES_DATA.find((p) => p.id === selectedPlaceId) || PLACES_DATA[0];

  const toggleDay = (day: string) => {
    setOpenDay(openDay === day ? null : day);
  };

  return (
    <div className="w-full space-y-12 border-t border-neutral-200 pt-16">
      
      {/* Section Header */}
      <div className="text-center space-y-2">
        <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-neutral-400 block">
          Destination Canvas // Detailed Specifications
        </span>
        <h3 className="text-3xl font-light uppercase tracking-tight text-black">
          Place Information & Blueprints
        </h3>
        <p className="text-xs text-neutral-500 font-light font-mono uppercase tracking-wider">
          Detailed specs on mountains, beaches, and local secret trails
        </p>
      </div>

      {/* Place Tabs */}
      <div className="flex justify-center flex-wrap gap-2">
        {PLACES_DATA.map((place) => (
          <button
            key={place.id}
            onClick={() => setSelectedPlaceId(place.id)}
            className={`px-6 py-2 text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer border ${
              selectedPlaceId === place.id
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-neutral-200 hover:border-black'
            }`}
          >
            {place.name.split(',')[0]}
          </button>
        ))}
      </div>

      {/* Place Details Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Pictures & Specs Panel */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Main Photo */}
          <div className="relative aspect-[3/2] w-full overflow-hidden bg-neutral-100 border border-neutral-200">
            <Image
              src={activePlace.images[0]}
              alt={activePlace.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Mountains & Beaches Spec Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-neutral-200 p-4 bg-neutral-50 space-y-2">
              <span className="flex items-center gap-2 text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                <Mountain className="h-4 w-4 text-black" /> Mountain Specs
              </span>
              <p className="text-xs text-neutral-700 font-light leading-relaxed">
                {activePlace.mountainSpec}
              </p>
            </div>
            <div className="border border-neutral-200 p-4 bg-neutral-50 space-y-2">
              <span className="flex items-center gap-2 text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                <Anchor className="h-4 w-4 text-black" /> Beach Specs
              </span>
              <p className="text-xs text-neutral-700 font-light leading-relaxed">
                {activePlace.beachSpec}
              </p>
            </div>
          </div>

          {/* Secondary Photo */}
          <div className="relative aspect-[21/9] w-full overflow-hidden bg-neutral-100 border border-neutral-200">
            <Image
              src={activePlace.images[1]}
              alt={activePlace.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Narrative & Itinerary Panel */}
        <div className="lg:col-span-6 space-y-8">
          
          {/* Basic specifications */}
          <div className="space-y-4">
            <span className="text-xs font-mono text-neutral-400 block">DESTINATION OVERVIEW</span>
            <h4 className="text-3xl font-serif text-black uppercase leading-none">
              {activePlace.name}
            </h4>
            <p className="text-sm italic text-neutral-600 font-light">
              &ldquo;{activePlace.tagline}&rdquo;
            </p>
            
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider pt-2">
              <Calendar className="h-4 w-4 text-black" /> Best Season: {activePlace.bestTime}
            </div>
          </div>

          {/* Local highlights list */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
              Core Cultural Experiences
            </span>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono tracking-wide text-neutral-700">
              {activePlace.highlights.map((hl) => (
                <li key={hl} className="flex items-center gap-2">
                  <Compass className="h-4 w-4 text-black" /> {hl}
                </li>
              ))}
            </ul>
          </div>

          {/* Day-by-Day Itinerary Accordion */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
              Curated Day-by-Day Story Outline
            </span>
            <div className="space-y-2">
              {activePlace.itinerary.map((item) => (
                <div key={item.day} className="border border-neutral-200">
                  <button
                    onClick={() => toggleDay(item.day)}
                    className="w-full flex justify-between items-center p-4 bg-neutral-50 text-left font-mono cursor-pointer hover:bg-neutral-100 transition-colors"
                  >
                    <span className="text-xs font-semibold text-black">
                      {item.day} // {item.title}
                    </span>
                    {openDay === item.day ? (
                      <ChevronUp className="h-4 w-4 text-neutral-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-neutral-500" />
                    )}
                  </button>
                  {openDay === item.day && (
                    <div className="p-4 bg-white text-xs text-neutral-600 font-light leading-relaxed border-t border-neutral-200">
                      {item.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Curation trigger */}
          <div className="pt-4 text-center lg:text-left">
            <button
              onClick={() => openBookingModal(activePlace.name.split(',')[0])}
              className="bg-black text-white hover:bg-neutral-800 px-8 py-3.5 text-xs font-mono uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer shadow-md"
            >
              Curate This Voyage Blueprint
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
