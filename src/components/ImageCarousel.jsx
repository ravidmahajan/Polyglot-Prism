import React, { useState, useEffect, useCallback, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ImageCarousel({ images, color, children }) {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState({});
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const carouselRef = useRef(null);
  const imgWrapRef = useRef(null);

  const count = images.length;

  const goTo = useCallback((idx) => {
    setActive((idx + count) % count);
  }, [count]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => goTo(active + 1), 5000);
    return () => clearInterval(timerRef.current);
  }, [active, paused, goTo]);

  useEffect(() => {
    if (!carouselRef.current || !imgWrapRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(imgWrapRef.current, {
        yPercent: 12,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, carouselRef);

    return () => ctx.revert();
  }, []);

  const handleLoad = (idx) => {
    setLoaded((prev) => ({ ...prev, [idx]: true }));
  };

  return (
    <div
      ref={carouselRef}
      className="relative w-full rounded-2xl overflow-hidden mb-8 shadow-2xl shadow-black/30"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-72 md:h-96 lg:h-[28rem] overflow-hidden">
        <div ref={imgWrapRef} className="absolute inset-[-15%] w-[130%] h-[130%]">
          {images.map((img, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                i === active ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-[1.03] z-0'
              }`}
            >
              <img
                src={img.url}
                alt={img.alt}
                loading={i < 2 ? 'eager' : 'lazy'}
                onLoad={() => handleLoad(i)}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {!loaded[i] && <div className="absolute inset-0 shimmer bg-slate-800" />}
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-[11]" />

        {children && (
          <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center justify-end pb-16 md:pb-20 px-6 text-center">
            {children}
          </div>
        )}

        <div className="absolute bottom-0 inset-x-0 z-20 px-4 pb-3 pt-8 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-between">
          <div className="flex items-center gap-3">
            <span
              className="inline-block px-3 py-1 rounded-lg text-xs font-semibold text-white/90 backdrop-blur-md"
              style={{ backgroundColor: `${color || '#6366f1'}aa` }}
            >
              {images[active]?.label}
            </span>
            <p className="text-xs text-white/60 hidden md:block truncate max-w-sm">{images[active]?.alt}</p>
          </div>

          <div className="flex gap-1.5 shrink-0">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? 'w-6 h-2'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                }`}
                style={i === active ? { backgroundColor: color || '#6366f1' } : undefined}
              />
            ))}
          </div>
        </div>

        <a
          href="https://unsplash.com"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 z-20 text-[10px] text-white/30 hover:text-white/60 transition-colors"
        >
          Unsplash
        </a>

        <button
          onClick={() => goTo(active - 1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white/70 hover:bg-black/50 hover:text-white transition-all text-lg"
          aria-label="Previous image"
        >
          ‹
        </button>
        <button
          onClick={() => goTo(active + 1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white/70 hover:bg-black/50 hover:text-white transition-all text-lg"
          aria-label="Next image"
        >
          ›
        </button>
      </div>
    </div>
  );
}
