'use client';

import { useBookingStore } from '@/lib/store';
import { ArrowUpRight } from 'lucide-react';

const PHILOSOPHY_POINTS = [
  {
    title: 'The Story Over the Checklist',
    text: 'We believe travel shouldn\'t be defined by a series of checklist monuments. We look for the narrative thread: the tea houses, the sunrise koras, and the architectural voids that invite contemplation.',
  },
  {
    title: 'Local Chronology',
    text: 'Every destination profile we build features local chronicles written by travel journalists and native residents. You read their voice, their rhythms, and their wisdom.',
  },
  {
    title: 'Minimalism as Respect',
    text: 'Our distraction-free paper-like layout is designed to highlight the photography. We step back and let the colors of the landscapes and details do the talking.',
  },
  {
    title: 'Visual Timelines',
    text: 'We map curated itineraries using simple lines and ambient indicators, avoiding chaotic maps and flashy promotional text in favor of an organic flow.',
  },
];

export default function PhilosophyPage() {
  const openBookingModal = useBookingStore((state) => state.openModal);

  return (
    <main className="min-h-screen bg-white text-black py-16 px-6 max-w-5xl mx-auto space-y-24">
      {/* Dynamic Metadata */}
      <title>Our Philosophy | WanderTales</title>
      <meta name="description" content="Read about the design guidelines, local storytelling chronicles, and minimalist principles of the WanderTales visual travel platform." />

      {/* Hero Header */}
      <section className="space-y-6 pt-12 text-center md:text-left">
        <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-neutral-400 block">
          Behind the Chronicles // Our Philosophy
        </span>
        <h1 className="text-4xl md:text-7xl font-extralight uppercase tracking-tight leading-[1.05]">
          A room with a point of view.
        </h1>
        <p className="text-lg text-neutral-500 font-light max-w-2xl leading-relaxed">
          WanderTales was founded to re-imagine digital travel guides. We replace cluttered booking widgets with vast white spaces, high-resolution imagery, and ambient soundscapes.
        </p>
      </section>

      {/* Grid of Values */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {PHILOSOPHY_POINTS.map((point, index) => (
          <div key={point.title} className="space-y-4 border-l border-black pl-6 py-2">
            <span className="text-xs font-mono text-neutral-400 block">0{index + 1} // ESSENTIAL</span>
            <h2 className="text-2xl font-serif text-black">{point.title}</h2>
            <p className="text-sm text-neutral-600 font-light leading-relaxed">{point.text}</p>
          </div>
        ))}
      </section>

      {/* Statement block */}
      <section className="bg-neutral-50 p-8 md:p-12 border border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-3 max-w-xl">
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
            Itinerary Engineering
          </h3>
          <p className="text-base text-neutral-700 font-light leading-relaxed">
            Every chronicle you read is tied to a customized booking interface. Tap the curate button to translate an editorial narrative directly into an experiential travel program designed for you.
          </p>
        </div>
        <button
          onClick={() => openBookingModal()}
          className="bg-black text-white hover:bg-white hover:text-black border border-black px-8 py-4 text-xs font-mono uppercase tracking-[0.2em] flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer"
        >
          Curate Journey <ArrowUpRight className="h-4 w-4" />
        </button>
      </section>
    </main>
  );
}
