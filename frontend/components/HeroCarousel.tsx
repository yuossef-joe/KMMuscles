"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { KeyboardEvent, PointerEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

export type HeroCarouselItem = {
  id?: string;
  src: string;
  alt: string;
};

type HeroCarouselProps = {
  items: HeroCarouselItem[];
  autoplay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  loop?: boolean;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
};

const swipeThreshold = 48;

export function HeroCarousel({
  items,
  autoplay = true,
  interval = 4500,
  showDots = true,
  showArrows = true,
  loop = true,
  className,
  imageClassName,
  sizes = "(min-width: 1024px) 48vw, calc(100vw - 32px)",
  priority = true
}: HeroCarouselProps) {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const pointerStartX = useRef<number | null>(null);

  const itemCount = items.length;
  const canNavigate = itemCount > 1;

  useEffect(() => {
    const documentDirection =
      document.documentElement.dir || document.body.dir || document.documentElement.getAttribute("lang");
    setIsRtl(documentDirection?.toLowerCase().startsWith("ar") || documentDirection === "rtl");
  }, []);

  useEffect(() => {
    if (active <= itemCount - 1) return;
    setActive(Math.max(itemCount - 1, 0));
  }, [active, itemCount]);

  const goTo = useCallback(
    (index: number, requestedDirection = 1) => {
      if (!canNavigate) return;

      if (!loop && (index < 0 || index > itemCount - 1)) return;

      const nextIndex = (index + itemCount) % itemCount;
      setDirection(requestedDirection);
      setActive(nextIndex);
    },
    [canNavigate, itemCount, loop]
  );

  const goToPrevious = useCallback(() => {
    goTo(active - 1, isRtl ? 1 : -1);
  }, [active, goTo, isRtl]);

  const goToNext = useCallback(() => {
    goTo(active + 1, isRtl ? -1 : 1);
  }, [active, goTo, isRtl]);

  useEffect(() => {
    if (!autoplay || isPaused || !canNavigate) return;

    const timer = window.setInterval(goToNext, interval);
    return () => window.clearInterval(timer);
  }, [autoplay, canNavigate, goToNext, interval, isPaused]);

  const slideVariants = useMemo(
    () => ({
      enter: (slideDirection: number) => ({
        opacity: 0,
        scale: prefersReducedMotion ? 1 : 1.04,
        x: prefersReducedMotion ? 0 : `${slideDirection * 4}%`
      }),
      center: {
        opacity: 1,
        scale: 1,
        x: 0
      },
      exit: (slideDirection: number) => ({
        opacity: 0,
        scale: prefersReducedMotion ? 1 : 0.98,
        x: prefersReducedMotion ? 0 : `${slideDirection * -4}%`
      })
    }),
    [prefersReducedMotion]
  );

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      isRtl ? goToNext() : goToPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      isRtl ? goToPrevious() : goToNext();
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    pointerStartX.current = event.clientX;
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (pointerStartX.current === null) return;

    const deltaX = event.clientX - pointerStartX.current;
    pointerStartX.current = null;

    if (Math.abs(deltaX) < swipeThreshold) return;

    const shouldMovePrevious = isRtl ? deltaX < 0 : deltaX > 0;
    shouldMovePrevious ? goToPrevious() : goToNext();
  }

  if (!itemCount) return null;

  const activeItem = items[active];

  return (
    <section
      className={clsx(
        "group relative overflow-hidden rounded-2xl border border-border-gray bg-white shadow-glow outline-none",
        className
      )}
      aria-label="Featured product carousel"
      aria-roledescription="carousel"
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onPointerDown={handlePointerDown}
      onPointerLeave={() => {
        pointerStartX.current = null;
      }}
      onPointerUp={handlePointerUp}
      tabIndex={0}
    >
      <div className="relative aspect-[1879/1398] w-full touch-pan-y">
        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <motion.div
            key={activeItem.id ?? activeItem.src}
            animate="center"
            className="absolute inset-0"
            custom={direction}
            exit="exit"
            initial="enter"
            transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            variants={slideVariants}
          >
            <Image
              src={activeItem.src}
              alt={activeItem.alt}
              fill
              priority={priority && active === 0}
              sizes={sizes}
              className={clsx("select-none object-contain", imageClassName)}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {showArrows && canNavigate ? (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            disabled={!loop && active === 0}
            className="focus-ring absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-muscle-black/75 text-white opacity-95 backdrop-blur transition hover:bg-gym-red disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Previous hero slide"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={goToNext}
            disabled={!loop && active === itemCount - 1}
            className="focus-ring absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-muscle-black/75 text-white opacity-95 backdrop-blur transition hover:bg-gym-red disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Next hero slide"
          >
            <ChevronRight size={22} />
          </button>
        </>
      ) : null}

      {showDots && canNavigate ? (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2" role="tablist" aria-label="Hero slides">
          {items.map((item, index) => (
            <button
              key={item.id ?? item.src}
              type="button"
              onClick={() => goTo(index, index > active ? 1 : -1)}
              className={clsx(
                "focus-ring h-2.5 rounded-full transition-all",
                active === index ? "w-8 bg-gym-red" : "w-2.5 bg-zinc-300 hover:bg-zinc-100"
              )}
              aria-label={`Go to hero slide ${index + 1}`}
              aria-selected={active === index}
              role="tab"
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
