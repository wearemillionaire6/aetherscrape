'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookingStore } from '@/lib/store';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

export function BookingModal() {
  const { isOpen, prefilledDestination, closeModal } = useBookingStore();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    destination: '',
    timeframe: '',
    travelers: '1',
    style: 'cultural',
    name: '',
    email: '',
    notes: '',
  });

  const addBooking = useBookingStore((state) => state.addBooking);

  // Prefill destination when store value changes
  useEffect(() => {
    if (prefilledDestination) {
      setFormData((prev) => ({ ...prev, destination: prefilledDestination }));
    }
  }, [prefilledDestination]);

  // Reset form when modal closes or opens
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setSubmitted(false);
      }, 300); // Wait for exit animation
    }
  }, [isOpen]);

  const handleNext = () => {
    if (step < 3) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBooking({
      destination: formData.destination,
      timeframe: formData.timeframe,
      travelers: formData.travelers,
      style: formData.style,
      name: formData.name,
      email: formData.email,
      notes: formData.notes,
    });
    setSubmitted(true);
  };

  const isStepValid = () => {
    if (step === 1) return formData.destination.trim() !== '' && formData.timeframe.trim() !== '';
    if (step === 2) return formData.travelers !== '';
    if (step === 3) return formData.name.trim() !== '' && formData.email.includes('@');
    return false;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-3xl text-white flex flex-col justify-between p-8 md:p-16"
        >
          {/* Header */}
          <div className="flex justify-between items-center w-full max-w-5xl mx-auto">
            <span className="text-xs tracking-[0.4em] font-mono uppercase text-white/50">
              WANDERTALES // INQUIRY WIZARD
            </span>
            <button
              onClick={closeModal}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              Close <X className="h-4 w-4" />
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 flex flex-col justify-center items-center max-w-2xl w-full mx-auto py-12">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="w-full space-y-12">
                
                {/* Step Indicators */}
                <div className="flex space-x-6 text-[10px] font-mono text-white/40">
                  <span className={step === 1 ? "text-white font-semibold border-b border-white pb-1" : ""}>
                    01. DESTINATION
                  </span>
                  <span className={step === 2 ? "text-white font-semibold border-b border-white pb-1" : ""}>
                    02. PREFERENCES
                  </span>
                  <span className={step === 3 ? "text-white font-semibold border-b border-white pb-1" : ""}>
                    03. DETAILS
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] font-mono text-white/50 block">
                          Where do you want to explore?
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Nepal, Japan, Morocco"
                          value={formData.destination}
                          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                          className="w-full bg-transparent border-b border-white/20 focus:border-white py-4 text-2xl md:text-3xl font-light text-white focus:outline-none placeholder:text-white/25 transition-colors"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] font-mono text-white/50 block">
                          When are you planning to travel?
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Autumn 2026, September"
                          value={formData.timeframe}
                          onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                          className="w-full bg-transparent border-b border-white/20 focus:border-white py-4 text-2xl md:text-3xl font-light text-white focus:outline-none placeholder:text-white/25 transition-colors"
                          required
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] font-mono text-white/50 block">
                          Number of travelers
                        </label>
                        <select
                          value={formData.travelers}
                          onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                          className="w-full bg-transparent border-b border-white/20 focus:border-white py-4 text-2xl md:text-3xl font-light focus:outline-none cursor-pointer text-white transition-colors"
                        >
                          <option value="1" className="text-black bg-white">1 Solo Traveler</option>
                          <option value="2" className="text-black bg-white">2 Couples / Companions</option>
                          <option value="3-5" className="text-black bg-white">3 to 5 Small Group</option>
                          <option value="6+" className="text-black bg-white">6+ Family / Large Group</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] font-mono text-white/50 block">
                          Travel Style Preference
                        </label>
                        <div className="grid grid-cols-2 gap-4 pt-2">
                          {['cultural', 'adventure', 'luxury', 'slow-travel'].map((styleOpt) => (
                            <button
                              key={styleOpt}
                              type="button"
                              onClick={() => setFormData({ ...formData, style: styleOpt })}
                              className={`py-3 text-center border text-xs uppercase tracking-[0.15em] font-mono transition-all ${
                                formData.style === styleOpt
                                  ? 'bg-white text-black border-white'
                                  : 'bg-white/10 text-white border-white/10 hover:border-white/50 hover:bg-white/20'
                              }`}
                            >
                              {styleOpt.replace('-', ' ')}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] font-mono text-white/50 block">
                          Your Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-transparent border-b border-white/20 focus:border-white py-4 text-2xl md:text-3xl font-light text-white focus:outline-none placeholder:text-white/25 transition-colors"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] font-mono text-white/50 block">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. hello@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-transparent border-b border-white/20 focus:border-white py-4 text-2xl md:text-3xl font-light text-white focus:outline-none placeholder:text-white/25 transition-colors"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] font-mono text-white/50 block">
                          Special Requests or Narratives you read (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Seeking ambient silent garden experiences..."
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full bg-transparent border-b border-white/20 focus:border-white py-4 text-base text-white focus:outline-none placeholder:text-white/25 transition-colors"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Wizard Controls */}
                <div className="flex justify-between items-center pt-8">
                  <button
                    type="button"
                    onClick={step > 1 ? handleBack : closeModal}
                    className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-white/70 hover:text-white transition-opacity cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>

                  {step < 3 ? (
                    <button
                      type="button"
                      disabled={!isStepValid()}
                      onClick={handleNext}
                      className="bg-white text-black hover:bg-transparent hover:text-white border border-white px-8 py-4 text-xs font-mono uppercase tracking-[0.2em] flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      Next Step <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!isStepValid()}
                      className="bg-white text-black hover:bg-transparent hover:text-white border border-white px-10 py-5 text-xs font-mono uppercase tracking-[0.2em] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      Curate Itinerary
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <h2 className="text-3xl md:text-5xl font-extralight uppercase tracking-tight">
                  Story Awaken.
                </h2>
                <p className="text-neutral-300 font-light max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-medium text-white">{formData.name}</span>. 
                  Our local story curators are reviewing your travel preferences for{' '}
                  <span className="font-medium text-white">{formData.destination}</span>. 
                  We will contact you at <span className="font-medium text-white">{formData.email}</span> within 24 hours.
                </p>
                <div className="pt-6">
                  <button
                    onClick={closeModal}
                    className="bg-white text-black hover:bg-transparent hover:text-white border border-white px-8 py-3 text-xs font-mono uppercase tracking-[0.2em] transition-all cursor-pointer"
                  >
                    Return to Stories
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center max-w-5xl mx-auto w-full border-t border-white/10 pt-6">
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
              WanderTales Office of Visual Curation & Travel Engineering © {new Date().getFullYear()}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
