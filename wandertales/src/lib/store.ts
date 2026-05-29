import { create } from 'zustand';

export interface BookingItem {
  id: string;
  destination: string;
  timeframe: string;
  travelers: string;
  style: string;
  name: string;
  email: string;
  notes?: string;
  createdAt: string;
}

interface BookingState {
  isOpen: boolean;
  prefilledDestination: string;
  bookings: BookingItem[];
  openModal: (destination?: string) => void;
  closeModal: () => void;
  loadBookings: () => void;
  addBooking: (booking: Omit<BookingItem, 'id' | 'createdAt'>) => void;
  cancelBooking: (id: string) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  isOpen: false,
  prefilledDestination: '',
  bookings: [],
  openModal: (destination = '') => set({ isOpen: true, prefilledDestination: destination }),
  closeModal: () => set({ isOpen: false, prefilledDestination: '' }),
  
  loadBookings: () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('wandertales_bookings');
      if (stored) {
        try {
          set({ bookings: JSON.parse(stored) });
        } catch (e) {
          console.error('Failed to parse bookings from localStorage', e);
        }
      }
    }
  },

  addBooking: (booking) => {
    const newBooking: BookingItem = {
      ...booking,
      id: 'WT-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };

    set((state) => {
      const updated = [newBooking, ...state.bookings];
      if (typeof window !== 'undefined') {
        localStorage.setItem('wandertales_bookings', JSON.stringify(updated));
      }
      return { bookings: updated };
    });
  },

  cancelBooking: (id) => {
    set((state) => {
      const updated = state.bookings.filter((b) => b.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('wandertales_bookings', JSON.stringify(updated));
      }
      return { bookings: updated };
    });
  },
}));
