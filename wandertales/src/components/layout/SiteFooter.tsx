'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useBookingStore } from '@/lib/store';

export function SiteFooter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const openBookingModal = useBookingStore((state) => state.openModal);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-neutral-50 w-full mt-24 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-4">
          <Link href="/" className="text-lg font-bold tracking-[0.2em] uppercase font-mono text-black">
            WanderTales.
          </Link>
          <p className="text-xs text-neutral-500 leading-relaxed font-light">
            An immersive storytelling platform designed to capture the meditative beauty of global travel traditions through visual chronicles and day-by-day itineraries.
          </p>
        </div>

        {/* Explore Links */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-black mb-6">Explore</h4>
          <ul className="space-y-3 text-xs font-mono tracking-wider">
            <li>
              <Link href="/" className="text-neutral-500 hover:text-black transition-colors">
                Chronicle Feed
              </Link>
            </li>
            <li>
              <Link href="/nepal-showcase" className="text-neutral-500 hover:text-black transition-colors">
                Country Canvas
              </Link>
            </li>
            <li>
              <button
                onClick={() => openBookingModal()}
                className="text-neutral-500 hover:text-black transition-colors cursor-pointer"
              >
                Curate Itinerary
              </button>
            </li>
          </ul>
        </div>

        {/* Philosophy Links */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-black mb-6">Philosophy</h4>
          <ul className="space-y-3 text-xs font-mono tracking-wider">
            <li>
              <Link href="/about" className="text-neutral-500 hover:text-black transition-colors">
                Our Narrative Focus
              </Link>
            </li>
            <li>
              <a href="#" className="text-neutral-500 hover:text-black transition-colors">
                Visual Architecture
              </a>
            </li>
            <li>
              <a href="#" className="text-neutral-500 hover:text-black transition-colors">
                Editorial Board
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter subscription */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-black mb-6">Chronicle Dispatch</h4>
          <p className="text-xs text-neutral-500 mb-4 font-light leading-relaxed">
            Receive monthly travel chronicles and visual timeline narratives straight to your inbox.
          </p>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL"
                className="w-full bg-transparent border-b border-black py-2.5 text-xs font-mono focus:outline-none placeholder:text-neutral-300"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-mono uppercase tracking-[0.2em] font-semibold text-black hover:opacity-60 transition-opacity cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <span className="text-xs font-mono text-black uppercase tracking-wider block">
              Joined Dispatch List.
            </span>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-t border-neutral-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
          © {new Date().getFullYear()} WanderTales. All rights reserved.
        </p>
        <div className="flex space-x-6 text-[10px] font-mono tracking-wider">
          <a href="#" className="text-neutral-400 hover:text-black">Privacy</a>
          <a href="#" className="text-neutral-400 hover:text-black">Terms</a>
          <a href="#" className="text-neutral-400 hover:text-black">Contact</a>
        </div>
      </div>
    </footer>
  );
}
