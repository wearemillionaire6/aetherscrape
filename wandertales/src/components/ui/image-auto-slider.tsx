"use client"

import React from 'react';
import Image from 'next/image';

export const ImageAutoSlider = () => {
  // Local high-quality generated images
  const images = [
    "/images/swiss_alps.png",
    "/images/tropical_beach.png",
    "/images/amalfi_coast.png",
    "/images/sahara_desert.png",
    "/images/japan_bamboo.png",
    "/images/japan_temple.png",
    "/images/iceland_beach.png",
    "/images/morocco_souk.png"
  ];

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <>
      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right 25s linear infinite;
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .image-item {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease;
        }

        .image-item:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
      `}</style>
      
      <div className="w-full bg-black relative overflow-hidden flex flex-col items-center justify-center py-16 border-y border-white/5">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black z-0" />
        
        {/* Subtitle / Header for Slider */}
        <div className="relative z-10 text-center mb-8 space-y-2">
          <span className="text-[9px] font-mono tracking-[0.4em] text-neutral-500 uppercase block">
            Visual Preamble // The Scenery Canvas
          </span>
          <h4 className="text-sm font-mono tracking-[0.2em] text-white uppercase font-light">
            Continuous Landscape Chronicles
          </h4>
        </div>

        {/* Scrolling images container */}
        <div className="relative z-10 w-full flex items-center justify-center py-4">
          <div className="scroll-container w-full max-w-7xl">
            <div className="infinite-scroll flex gap-6 w-max">
              {duplicatedImages.map((image, index) => (
                <div
                  key={index}
                  className="image-item flex-shrink-0 w-48 h-48 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-xl overflow-hidden shadow-2xl relative border border-white/10"
                >
                  <Image
                    src={image}
                    alt={`Landscape gallery image ${(index % images.length) + 1}`}
                    fill
                    sizes="(max-width: 768px) 192px, 288px"
                    className="object-cover"
                    priority={index < 4}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black to-transparent z-20" />
      </div>
    </>
  );
};
