"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "/assets/image.png",
    alt: "KMMuscles Push Your Self whey protein supplement hero"
  },
  {
    src: "/assets/image copy.png",
    alt: "KMMuscles Push Your Self mass gainer supplement hero"
  }
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  function goToPrevious() {
    setActive((current) => (current - 1 + slides.length) % slides.length);
  }

  function goToNext() {
    setActive((current) => (current + 1) % slides.length);
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-gray bg-white shadow-glow">
      <div className="relative aspect-[1879/1398] w-full">
        {slides.map((slide, index) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 48vw, calc(100vw - 32px)"
            className={`object-contain transition-opacity duration-700 ${
              active === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={goToPrevious}
        className="focus-ring absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-muscle-black/75 text-white backdrop-blur transition hover:bg-gym-red"
        aria-label="Previous hero slide"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        onClick={goToNext}
        className="focus-ring absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-muscle-black/75 text-white backdrop-blur transition hover:bg-gym-red"
        aria-label="Next hero slide"
      >
        <ChevronRight size={22} />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setActive(index)}
            className={`h-2.5 rounded-full transition-all ${
              active === index ? "w-8 bg-gym-red" : "w-2.5 bg-zinc-300"
            }`}
            aria-label={`Go to hero slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
