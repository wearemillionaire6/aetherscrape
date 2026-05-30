'use client';

import { useState, useEffect } from 'react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import { ExploreSlideshow } from '@/components/ui/ExploreSlideshow';
import { PlaceInformation } from '@/components/ui/PlaceInformation';
import { ImageAutoSlider } from '@/components/ui/image-auto-slider';
import { useBookingStore } from '@/lib/store';
import Image from 'next/image';
import { ArrowUpRight, HelpCircle, RefreshCw } from 'lucide-react';

const HERO_SLIDESHOW = [
  '/images/swiss_alps.png',
  '/images/tropical_beach.png',
  '/images/amalfi_coast.png',
  '/images/sahara_desert.png',
  '/images/japan_bamboo.png',
  '/images/japan_temple.png',
  '/images/iceland_beach.png',
  '/images/morocco_souk.png',
];

const SPECIALTIES = [
  {
    title: 'LOCAL CHRONICLES',
    subtitle: 'AUTHENTIC PERSPECTIVE',
    description: 'We replace standardized tourism checklists with deep-dive cultural diaries written by travel journalists and native residents. You experience local rhythms, quiet tea rooms, and oral histories.',
  },
  {
    title: 'THE VISUAL CANVAS',
    subtitle: 'FULL-COLOR STYLING',
    description: 'Instead of crowded promotional ads, each destination is presented as an expansive photo essay. The scenery provides the color, allowing you to discover countries visually before planning.',
  },
  {
    title: 'ORGANIC TIMELINES',
    subtitle: 'NARRATIVE ITINERARY BLUEPRINTS',
    description: 'Our curated travel plans flow chronologically. Guided by thin lines and minimal indicators, they outline standard days and highlights without information overload.',
  },
  {
    title: 'FRICTIONLESS CURATION',
    subtitle: 'THE BOOKING WIZARD',
    description: 'Every visual story is tied to a minimalist 3-step booking overlay. Prefilled with the destination you were reading, you can instantly turn a narrative diary into a custom travel request.',
  }
];

const DESTINATIONS = [
  {
    name: 'KYOTO, JAPAN',
    title: 'The Way of Zen',
    description: 'A grid of cedar panels, stone paths, and calculated tea scoop movements.',
    image: '/images/japan_bamboo.png',
    type: 'cultural'
  },
  {
    name: 'SAHARA, MOROCCO',
    title: 'Echoes of the Dunes',
    description: 'Erg Chebbi dunes, orange sand waves, and Bedouin mint tea.',
    image: '/images/sahara_desert.png',
    type: 'desert'
  },
  {
    name: 'AMALFI, ITALY',
    title: 'The Vertical Gardens',
    description: 'Lemon orchards clinging to vertical cliffs overlooking turquoise beach lines.',
    image: '/images/amalfi_coast.png',
    type: 'beach'
  },
  {
    name: 'SWITZERLAND',
    title: 'Basalt Fjords & Silent Peaks',
    description: 'Snowpeaks, glacial streams, and quiet Alpine valleys.',
    image: '/images/swiss_alps.png',
    type: 'mountain'
  }
];

interface QuizAnswers {
  environment: string;
  tempo: string;
  traveler: string;
}

export default function HomePage() {
  const [slides, setSlides] = useState<string[]>(HERO_SLIDESHOW);
  const openBookingModal = useBookingStore((state) => state.openModal);

  // Q&A Finder State
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({
    environment: '',
    tempo: '',
    traveler: ''
  });
  const [quizResult, setQuizResult] = useState<typeof DESTINATIONS[0] | null>(null);

  // Randomize slideshow order on initial mount so it's a different slideshow every time
  useEffect(() => {
    const shuffled = [...HERO_SLIDESHOW].sort(() => Math.random() - 0.5);
    setSlides(shuffled);
  }, []);

  const handleAnswerSelect = (field: keyof QuizAnswers, value: string) => {
    setQuizAnswers(prev => ({ ...prev, [field]: value }));
    if (quizStep < 3) {
      setQuizStep(step => step + 1);
    } else {
      // Calculate Match on step 3
      const env = quizAnswers.environment || value; // Fallback since state might not update instantly
      let matchedDest = DESTINATIONS[0];
      if (env === 'mountain') {
        matchedDest = DESTINATIONS.find(d => d.type === 'mountain') || DESTINATIONS[3];
      } else if (env === 'beach') {
        matchedDest = DESTINATIONS.find(d => d.type === 'beach') || DESTINATIONS[2];
      } else if (env === 'desert') {
        matchedDest = DESTINATIONS.find(d => d.type === 'desert') || DESTINATIONS[1];
      } else {
        matchedDest = DESTINATIONS.find(d => d.type === 'cultural') || DESTINATIONS[0];
      }
      setQuizResult(matchedDest);
      setQuizStep(4);
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({ environment: '', tempo: '', traveler: '' });
    setQuizResult(null);
    setQuizStep(1);
  };

  return (
    <main className="min-h-screen bg-transparent">
      {/* Dynamic Metadata */}
      <title>WanderTales | Immersive Travel & Visual Storytelling Canvas</title>
      <meta name="description" content="Discover global traditions through visual timelines, auto-playing colored slideshows, and local chronicles on our minimalist scroll-expand canvas." />

      {/* Interactive Immersive Hero Section with Shuffled Slideshow */}
      <ScrollExpandMedia
        bgImageSrc={slides[0]}
        slideshowSrcs={slides}
        title="WANDERTALES WORLD"
        date="WORLD EDITION // VOLUME 01"
        scrollToExpand="SCROLL DOWN TO EXPAND NARRATIVE"
        textBlend={true}
      >
        {/* Infinite Image Auto Slider (Full-Width Visual Preamble) */}
        <div className="-mt-16 md:-mt-32 w-full mb-16">
          <ImageAutoSlider />
        </div>

        {/* Clean White Screen Specialties & Offerings (rendered once expanded) */}
        <div className="max-w-6xl mx-auto py-16 px-6 text-black space-y-32">
          
          {/* Header Introduction */}
          <section className="text-center space-y-6">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-neutral-400 block">
              Our Concept // What We Provide
            </span>
            <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tight text-black max-w-3xl mx-auto leading-tight">
              A Visual Travel and Storytelling Engine.
            </h2>
            <p className="text-lg text-neutral-600 font-light max-w-xl mx-auto leading-relaxed">
              We focus on the narrative elements of travel. WanderTales steps back, letting large-format color photography, mountains, beaches, and editorial journals shape your itineraries.
            </p>
          </section>

          <hr className="border-neutral-200" />

          {/* Specialties / What we provide */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
            {SPECIALTIES.map((spec, index) => (
              <div key={spec.title} className="space-y-4 border-l border-black pl-6 py-2">
                <span className="text-xs font-mono text-neutral-400 block">
                  0{index + 1} // SPECIALTY
                </span>
                <h3 className="text-2xl font-serif text-black uppercase tracking-tight">
                  {spec.title}
                </h3>
                <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                  {spec.subtitle}
                </p>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  {spec.description}
                </p>
              </div>
            ))}
          </section>

          <hr className="border-neutral-200" />

          {/* Q&A Destination Finder Section */}
          <section className="bg-neutral-50 p-8 md:p-12 border border-neutral-200 max-w-4xl mx-auto rounded-sm space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest bg-white border border-neutral-200 px-3 py-1">
                <HelpCircle className="h-4 w-4 text-black" /> Interactive Quiz
              </div>
              <h3 className="text-3xl font-light uppercase tracking-tight text-black pt-2">
                Destination Finder
              </h3>
              <p className="text-xs text-neutral-500 font-light font-mono uppercase tracking-wider">
                Answer these questions to find your perfect place
              </p>
            </div>

            <div className="min-h-[220px] flex flex-col justify-center items-center">
              {quizStep === 1 && (
                <div className="space-y-6 w-full text-center">
                  <p className="text-lg font-serif">What environment calls to you?</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl mx-auto">
                    <button
                      onClick={() => handleAnswerSelect('environment', 'mountain')}
                      className="border border-neutral-200 bg-white hover:border-black p-4 text-xs font-mono uppercase tracking-widest transition-all cursor-pointer font-semibold"
                    >
                      Mountain Peaks
                    </button>
                    <button
                      onClick={() => handleAnswerSelect('environment', 'beach')}
                      className="border border-neutral-200 bg-white hover:border-black p-4 text-xs font-mono uppercase tracking-widest transition-all cursor-pointer font-semibold"
                    >
                      Coastal Beaches
                    </button>
                    <button
                      onClick={() => handleAnswerSelect('environment', 'desert')}
                      className="border border-neutral-200 bg-white hover:border-black p-4 text-xs font-mono uppercase tracking-widest transition-all cursor-pointer font-semibold"
                    >
                      Sahara Deserts
                    </button>
                    <button
                      onClick={() => handleAnswerSelect('environment', 'cultural')}
                      className="border border-neutral-200 bg-white hover:border-black p-4 text-xs font-mono uppercase tracking-widest transition-all cursor-pointer font-semibold"
                    >
                      Zen Gardens
                    </button>
                  </div>
                </div>
              )}

              {quizStep === 2 && (
                <div className="space-y-6 w-full text-center">
                  <p className="text-lg font-serif">What is your preferred travel tempo?</p>
                  <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
                    <button
                      onClick={() => handleAnswerSelect('tempo', 'slow')}
                      className="border border-neutral-200 bg-white hover:border-black p-4 text-xs font-mono uppercase tracking-widest transition-all cursor-pointer font-semibold"
                    >
                      Slow & Meditative
                    </button>
                    <button
                      onClick={() => handleAnswerSelect('tempo', 'active')}
                      className="border border-neutral-200 bg-white hover:border-black p-4 text-xs font-mono uppercase tracking-widest transition-all cursor-pointer font-semibold"
                    >
                      Active Adventure
                    </button>
                    <button
                      onClick={() => handleAnswerSelect('tempo', 'scenic')}
                      className="border border-neutral-200 bg-white hover:border-black p-4 text-xs font-mono uppercase tracking-widest transition-all cursor-pointer font-semibold"
                    >
                      Relaxed Scenic
                    </button>
                  </div>
                </div>
              )}

              {quizStep === 3 && (
                <div className="space-y-6 w-full text-center">
                  <p className="text-lg font-serif">Who are you traveling with?</p>
                  <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
                    <button
                      onClick={() => handleAnswerSelect('traveler', 'solo')}
                      className="border border-neutral-200 bg-white hover:border-black p-4 text-xs font-mono uppercase tracking-widest transition-all cursor-pointer font-semibold"
                    >
                      Solo Traveler
                    </button>
                    <button
                      onClick={() => handleAnswerSelect('traveler', 'couple')}
                      className="border border-neutral-200 bg-white hover:border-black p-4 text-xs font-mono uppercase tracking-widest transition-all cursor-pointer font-semibold"
                    >
                      As a Couple
                    </button>
                    <button
                      onClick={() => handleAnswerSelect('traveler', 'group')}
                      className="border border-neutral-200 bg-white hover:border-black p-4 text-xs font-mono uppercase tracking-widest transition-all cursor-pointer font-semibold"
                    >
                      Small Group
                    </button>
                  </div>
                </div>
              )}

              {quizStep === 4 && quizResult && (
                <div className="w-full text-center space-y-6 animate-fade-in">
                  <div className="max-w-sm mx-auto border border-neutral-200 p-4 bg-white space-y-4 shadow-md">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                      <Image
                        src={quizResult.image}
                        alt={quizResult.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 tracking-widest uppercase block">
                      Your Perfect Match
                    </span>
                    <h4 className="text-xl font-serif text-black uppercase">
                      {quizResult.name}
                    </h4>
                    <p className="text-xs text-neutral-500 font-light leading-relaxed">
                      {quizResult.description}
                    </p>
                  </div>

                  <div className="flex justify-center gap-4 pt-2">
                    <button
                      onClick={resetQuiz}
                      className="border border-neutral-300 text-neutral-500 hover:text-black hover:border-black px-6 py-2.5 text-xs font-mono uppercase tracking-widest flex items-center gap-1 transition-all cursor-pointer"
                    >
                      Restart <RefreshCw className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => openBookingModal(quizResult.name.split(',')[0])}
                      className="bg-black text-white hover:bg-neutral-800 px-6 py-2.5 text-xs font-mono uppercase tracking-widest transition-all cursor-pointer font-semibold"
                    >
                      Curate Journey
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          <hr className="border-neutral-200" />

          {/* Interactive Explore Slideshow Section */}
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-neutral-400 block">
                Visual Library // Explore Destinations
              </span>
              <h3 className="text-3xl font-light uppercase tracking-tight text-black">
                Chronicle Specialties Library
              </h3>
            </div>
            
            {/* The Tabbed Slideshow Component */}
            <ExploreSlideshow />
          </section>

          <hr className="border-neutral-200" />

          {/* Place Information Section */}
          <section className="space-y-6">
            <PlaceInformation />
          </section>

          <hr className="border-neutral-200" />

          {/* Destination Chronicles Spotlight */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-neutral-400 block">
                Visual Stories Spotlight
              </span>
              <h3 className="text-3xl font-light uppercase tracking-tight text-black">
                Featured World Chronicles
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {DESTINATIONS.map((dest) => (
                <div 
                  key={dest.name} 
                  className="group flex flex-col space-y-4 border border-neutral-100 p-4 bg-white hover:border-black transition-colors duration-300"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 tracking-widest block uppercase">
                    {dest.name}
                  </span>
                  <h4 className="text-lg font-serif text-black group-hover:underline">
                    {dest.title}
                  </h4>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed flex-grow">
                    {dest.description}
                  </p>
                  <button
                    onClick={() => openBookingModal(dest.name.split(',')[0])}
                    className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest font-semibold text-black hover:opacity-60 transition-opacity pt-2 cursor-pointer"
                  >
                    Curate Journey <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Final Call to Action */}
          <section className="bg-neutral-50 border border-neutral-200 p-8 md:p-16 text-center space-y-6">
            <h3 className="text-sm tracking-[0.3em] font-mono uppercase text-black">
              Ready to write your travel chapter?
            </h3>
            <p className="text-sm text-neutral-500 font-light max-w-md mx-auto leading-relaxed">
              Submit your inquiry preferences. Our global chronicle curators will shape a detailed, custom-engineered travel blueprint tailored to your style.
            </p>
            <div className="pt-2">
              <button
                onClick={() => openBookingModal()}
                className="bg-black text-white hover:bg-neutral-800 border border-black px-10 py-4 text-xs font-mono uppercase tracking-[0.2em] font-semibold transition-all duration-300 cursor-pointer"
              >
                Curate Experiential Itinerary
              </button>
            </div>
          </section>

        </div>
      </ScrollExpandMedia>
    </main>
  );
}
