'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc?: string;
  slideshowSrcs?: string[];
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'image',
  mediaSrc,
  slideshowSrcs,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Reset progress on media type change
  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
    setSlideIndex(0);
  }, [mediaType, mediaSrc, slideshowSrcs]);

  // Slideshow auto-play effect
  useEffect(() => {
    if (!slideshowSrcs || slideshowSrcs.length <= 1) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slideshowSrcs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slideshowSrcs]);

  useEffect(() => {
    const handleWheel = (e: globalThis.WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: globalThis.TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: globalThis.TouchEvent) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, {
      passive: false,
    });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div
      ref={sectionRef}
      className="transition-colors duration-700 ease-in-out overflow-x-hidden bg-transparent text-white"
    >
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          
          {/* Main Background Image - fades out as scroll expand completes */}
          <motion.div
            className="absolute inset-0 z-0 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt="Background"
              width={1920}
              height={1080}
              priority
              className="w-screen h-screen object-cover object-center opacity-80"
            />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>

          <div className="w-full flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              
              {/* Central Media Container (Expands to full screen) */}
              <div
                className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-none overflow-hidden"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '100vw',
                  maxHeight: '100vh',
                  boxShadow: '0px 20px 80px rgba(0, 0, 0, 0.4)',
                }}
              >
                {/* Render Slideshow or Single Media */}
                {slideshowSrcs && slideshowSrcs.length > 0 ? (
                  <div className="relative w-full h-full bg-neutral-900">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={slideIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 w-full h-full"
                      >
                        <Image
                          src={slideshowSrcs[slideIndex]}
                          alt={title || 'Slideshow View'}
                          fill
                          priority
                          className="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>
                    <motion.div
                      className="absolute inset-0 bg-black/15 z-10"
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: 0.1 - scrollProgress * 0.1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : mediaType === 'video' && mediaSrc ? (
                  <div className="relative w-full h-full pointer-events-none">
                    <video
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover contrast-125"
                      controls={false}
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/15"
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: 0.1 - scrollProgress * 0.1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : mediaSrc ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={mediaSrc}
                      alt={title || 'Cultural Showcase'}
                      fill
                      priority
                      className="object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/15"
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: 0.1 - scrollProgress * 0.1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : null}

                {/* Subtitle labels translating inside the card */}
                <div className="flex flex-col items-center text-center relative z-20 mt-4 transition-none">
                  {date && (
                    <p
                      className="text-xs uppercase tracking-[0.3em] text-white font-semibold bg-black/35 px-3 py-1 backdrop-blur-sm"
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className="text-xs uppercase tracking-[0.2em] text-neutral-300 font-light mt-2 bg-black/20 px-2 py-0.5 rounded"
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              {/* Title Text Splitting apart with 40% transparency (opacity-60) */}
              <div
                className={`flex items-center justify-center text-center gap-2 w-full relative z-10 transition-none flex-col ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                <motion.h2
                  className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter text-white/60 transition-none uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter text-white/60 transition-none uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

            {/* White Screen Content Section */}
            <motion.section
              className="flex flex-col w-full px-6 py-16 md:px-12 lg:py-32 bg-white text-black relative z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
