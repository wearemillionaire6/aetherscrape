'use client';

import { useEffect } from 'react';
import { useBookingStore } from '@/lib/store';
import Link from 'next/link';
import { Trash2, ArrowLeft } from 'lucide-react';

export default function ManageTripsPage() {
  const { bookings, loadBookings, cancelBooking } = useBookingStore();

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  return (
    <main className="min-h-screen bg-white text-black py-16 px-6 max-w-5xl mx-auto space-y-12">
      {/* Dynamic Metadata */}
      <title>Manage Your Journeys | WanderTales</title>
      <meta name="description" content="View, manage, and cancel your custom travel itineraries and story curation requests on WanderTales." />

      {/* Header */}
      <div className="space-y-4 pt-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 hover:text-black transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Chronicles
        </Link>
        <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-neutral-400 block">
          Client Dashboard // Active Blueprints
        </span>
        <h1 className="text-4xl md:text-6xl font-light uppercase tracking-tight text-black leading-none">
          Manage Your Voyages
        </h1>
      </div>

      <hr className="border-neutral-200" />

      {/* Bookings List */}
      <section className="space-y-8">
        {bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="border border-black p-6 md:p-8 space-y-6 bg-neutral-50 flex flex-col md:flex-row md:justify-between md:items-center gap-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono bg-black text-white px-2.5 py-1 uppercase tracking-widest font-semibold">
                      {booking.id}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                      Created on {booking.createdAt}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-serif text-black uppercase">
                      {booking.destination}
                    </h3>
                    <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest mt-1">
                      Timeframe: {booking.timeframe} // Travelers: {booking.travelers} // Style: {booking.style}
                    </p>
                  </div>

                  <div className="text-xs text-neutral-500 font-light leading-relaxed max-w-xl">
                    <p>Client: <span className="font-semibold text-black">{booking.name}</span> ({booking.email})</p>
                    {booking.notes && <p className="mt-1">Notes: &ldquo;{booking.notes}&rdquo;</p>}
                  </div>
                </div>

                <div className="flex md:flex-col items-start gap-4">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest border border-dashed border-neutral-300 px-3 py-1 rounded">
                    Status: Under Curation
                  </span>
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to cancel your curation request for ${booking.destination}?`)) {
                        cancelBooking(booking.id);
                      }
                    }}
                    className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] font-semibold text-red-600 hover:text-red-800 transition-colors border border-red-200 hover:border-red-600 px-4 py-2 cursor-pointer bg-white"
                  >
                    <Trash2 className="h-4 w-4" /> Cancel Voyage
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-neutral-200 space-y-6">
            <p className="text-xs uppercase font-mono tracking-[0.25em] text-neutral-400">
              No Active Voyages Found
            </p>
            <p className="text-sm text-neutral-500 font-light max-w-sm mx-auto">
              Read our chronicles on the homepage and curates a journey to start building your custom itinerary blueprint.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="bg-black text-white hover:bg-neutral-800 px-8 py-3 text-xs font-mono uppercase tracking-widest transition-all"
              >
                Browse Chronicles
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
