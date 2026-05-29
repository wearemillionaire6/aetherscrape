'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBookingStore } from '@/lib/store';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Philosophy', href: '/about' },
  { label: 'Manage Trips', href: '/manage-trips' },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const openBookingModal = useBookingStore((state) => state.openModal);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-white/95 border-black/10 backdrop-blur-md py-4'
          : 'bg-white border-transparent py-6'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-[0.2em] uppercase font-mono text-black relative group"
        >
          WanderTales<span className="text-neutral-400">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          <ul className="flex items-center space-x-8">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-xs uppercase tracking-[0.2em] font-mono transition-all pb-1 ${
                      isActive
                        ? 'text-black border-b border-black font-semibold'
                        : 'text-neutral-500 hover:text-black hover:border-b hover:border-black/50'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            onClick={() => openBookingModal()}
            className="bg-black text-white hover:bg-white hover:text-black border border-black px-6 py-2.5 text-xs font-mono uppercase tracking-[0.2em] transition-all cursor-pointer"
          >
            Book Voyage
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={() => openBookingModal()}
            className="bg-black text-white border border-black px-4 py-2 text-[10px] font-mono uppercase tracking-[0.2em] transition-all cursor-pointer"
          >
            Book
          </button>
          
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-black p-1 focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drop-down */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-black p-6 space-y-6">
          <ul className="flex flex-col space-y-4">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-xs uppercase tracking-[0.2em] font-mono block py-2 ${
                      isActive ? 'text-black font-semibold' : 'text-neutral-500'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
