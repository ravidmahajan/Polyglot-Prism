import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAlphabetBySlug } from '../data/alphabets';
import { LANGUAGE_GALLERY } from '../utils/culturalImages';
import { COUNTRY_CODES } from '../utils/languages';
import CharacterCard from './CharacterCard';
import ImageCarousel from './ImageCarousel';

gsap.registerPlugin(ScrollTrigger);

export default function LanguagePage() {
  const { slug } = useParams();
  const alphabet = getAlphabetBySlug(slug);
  const gallery = LANGUAGE_GALLERY[slug];
  const [search, setSearch] = useState('');
  const pageRef = useRef(null);

  useEffect(() => {
    if (!pageRef.current || !alphabet) return;

    const ctx = gsap.context(() => {
      gsap.from('.lang-desc', {
        y: 25, opacity: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.lang-desc', start: 'top 90%' },
      });

      gsap.from('.lang-country-link', {
        y: 20, opacity: 0, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: '.lang-country-link', start: 'top 90%' },
      });

      gsap.utils.toArray('.char-card').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.45,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, [slug, alphabet, search]);

  if (!alphabet) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl text-theme-3">Language not found</p>
        <Link to="/" className="text-indigo-400 underline mt-4 inline-block">← Back to Home</Link>
      </div>
    );
  }

  const filtered = alphabet.characters.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.char.toLowerCase().includes(q) ||
      c.roman.toLowerCase().includes(q) ||
      c.words?.some((w) => w.word.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q))
    );
  });

  const heroTagline = gallery?.[0]?.tagline;
  const countryCode = COUNTRY_CODES[slug];

  return (
    <div ref={pageRef} className="max-w-7xl mx-auto px-4 py-6">
      {gallery && gallery.length > 0 && (
        <ImageCarousel images={gallery} color={alphabet.color}>
          <span className="text-5xl mb-2 inline-block drop-shadow-lg">{alphabet.flag}</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg mb-1">
            Learn {alphabet.name}
          </h1>
          {heroTagline && (
            <p className="text-sm md:text-base text-white/80 italic drop-shadow">{heroTagline}</p>
          )}
        </ImageCarousel>
      )}

      <div className="lang-desc text-center mb-6">
        <p className="text-theme-3 max-w-2xl mx-auto text-sm md:text-base">
          {alphabet.description}
        </p>
        <div className="mt-3 inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-theme-4">
          <span>{alphabet.characters.length} characters</span>
          <span className="text-theme-5">•</span>
          <span>Click any card to expand & hear</span>
        </div>
      </div>

      {countryCode && (
        <div className="lang-country-link text-center mb-6">
          <a
            href={`https://countrypediaverse.netlify.app/alpha/${countryCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 glass rounded-xl px-5 py-2.5 text-sm font-medium transition-all hover:scale-[1.02] hover:bg-[var(--bg-glass-hover)]"
            style={{ color: alphabet.color, borderColor: `${alphabet.color}33` }}
          >
            <span className="text-lg">{alphabet.flag}</span>
            <span>Country Information</span>
            <span className="text-theme-5">↗</span>
          </a>
        </div>
      )}

      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-4">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search characters, sounds, or words..."
            className="w-full glass rounded-xl pl-11 pr-4 py-3 text-sm text-theme placeholder:text-theme-5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filtered.map((c, i) => (
            <div key={`${c.char}-${i}`} className="char-card">
              <CharacterCard
                char={c.char}
                roman={c.roman}
                sound={c.sound}
                words={c.words}
                speechCode={alphabet.speechCode}
                color={alphabet.color}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-theme-4 py-12">No characters match your search.</p>
      )}

      <div className="text-center mt-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 glass rounded-xl px-6 py-3 text-sm text-theme-3 hover:text-theme hover:bg-[var(--bg-glass-hover)] transition-all"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
