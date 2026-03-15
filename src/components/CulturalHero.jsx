import React, { useState } from 'react';

export default function CulturalHero({ image, color, children }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl mb-8 shadow-2xl shadow-black/30">
      <img
        src={image.url}
        alt={image.alt}
        loading="eager"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
      <div
        className="absolute inset-0 opacity-20"
        style={{ background: `linear-gradient(135deg, ${color || '#6366f1'}44, transparent 60%)` }}
      />

      {!loaded && <div className="absolute inset-0 shimmer bg-slate-800" />}

      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-8 px-6 text-center">
        {children}
      </div>

      {/* Unsplash credit */}
      <a
        href="https://unsplash.com"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 right-3 z-20 text-[10px] text-white/40 hover:text-white/70 transition-colors"
      >
        Photo: Unsplash
      </a>
    </div>
  );
}
