import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SearchBar from './SearchBar';
import LevelTabs from './LevelTabs';
import CategoryPicker from './CategoryPicker';
import QuickWords from './QuickWords';
import ConceptView from './ConceptView';
import { translateText } from '../utils/api';
import ALL_ALPHABETS, { LANGUAGE_SLUGS } from '../data/alphabets';

gsap.registerPlugin(ScrollTrigger);

const FLOATING_SCRIPTS = [
  'あ', 'ب', 'Б', '漢', 'ñ', 'ü', 'ক', 'अ', 'é', 'Ж',
  '語', 'ش', 'д', '字', 'ñ', 'ö', 'ম', 'श', 'ç', 'Ф',
];

function FloatingScript({ char, delay, duration, x, y }) {
  return (
    <span
      className="absolute text-theme-5 select-none pointer-events-none animate-float-char"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        fontSize: `${14 + Math.random() * 20}px`,
        opacity: 0.08 + Math.random() * 0.06,
      }}
    >
      {char}
    </span>
  );
}

function LanguageOrb({ lang, slug }) {
  return (
    <Link
      to={`/learn/${slug}`}
      className="scroll-reveal group flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 hover:scale-110"
    >
      <div
        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl glass flex items-center justify-center text-2xl md:text-3xl
                   group-hover:shadow-lg transition-all duration-300 border"
        style={{
          borderColor: `${lang.color}22`,
          boxShadow: `0 0 0 0 ${lang.color}00`,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 8px 30px ${lang.color}30`; e.currentTarget.style.borderColor = `${lang.color}55`; }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 0 0 0 ${lang.color}00`; e.currentTarget.style.borderColor = `${lang.color}22`; }}
      >
        {lang.flag}
      </div>
      <span className="text-xs font-medium text-theme-4 group-hover:text-theme-2 transition-colors">
        {lang.name}
      </span>
    </Link>
  );
}

export default function HomePage() {
  const [concept, setConcept] = useState('');
  const [translations, setTranslations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [level, setLevel] = useState('basic');
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const pageRef = useRef(null);

  const handleSearch = useCallback(async (text) => {
    setConcept(text);
    setTranslations(null);
    setIsLoading(true);
    setError('');

    try {
      const results = await translateText(text);
      setTranslations(results);
      setHistory((prev) => {
        const filtered = prev.filter((h) => h !== text);
        return [text, ...filtered].slice(0, 20);
      });
    } catch (err) {
      setError('Translation failed. Make sure the backend server is running.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const floatingChars = useRef(
    FLOATING_SCRIPTS.map((char) => ({
      char,
      delay: Math.random() * 8,
      duration: 10 + Math.random() * 10,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
  ).current;

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-badge', { y: -20, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.1 });
      gsap.from('.hero-title', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.25 });
      gsap.from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.7, ease: 'power2.out', delay: 0.45 });

      gsap.utils.toArray('.scroll-reveal').forEach((el) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      });

      gsap.utils.toArray('.scroll-section').forEach((el) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-16 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {floatingChars.map((c, i) => (
              <FloatingScript key={i} {...c} />
            ))}
          </div>

          <div className="relative z-10 text-center">
            <div className="hero-badge inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-theme-3 font-medium tracking-wide">10 Languages · Instant Translations · Audio Playback</span>
            </div>

            <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-5">
              <span className="text-theme">Explore the World</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                Through Language
              </span>
            </h1>

            <p className="hero-subtitle text-theme-3 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              Search any word or concept and instantly see how it's expressed across
              10 different languages — with pronunciation, script, and audio.
            </p>

            <div className="flex flex-wrap justify-center gap-3 md:gap-5 mb-12 max-w-3xl mx-auto">
              {LANGUAGE_SLUGS.map((slug) => (
                <LanguageOrb key={slug} lang={ALL_ALPHABETS[slug]} slug={slug} />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      </section>

      <div className="scroll-section">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        <LevelTabs activeLevel={level} onLevelChange={setLevel} />
      </div>

      {error && (
        <div className="max-w-2xl mx-auto px-4 mb-6">
          <div className="glass rounded-xl p-4 border border-red-500/30 text-red-400 text-sm text-center">
            {error}
          </div>
        </div>
      )}

      <ConceptView concept={concept} translations={translations} isLoading={isLoading} />

      {history.length > 0 && !isLoading && (
        <div className="scroll-section px-4 max-w-4xl mx-auto mb-8">
          <p className="text-center text-sm text-theme-4 mb-3">Recent searches:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {history.map((h) => (
              <button
                key={h}
                onClick={() => handleSearch(h)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium glass text-indigo-500 hover:bg-indigo-500/10 transition-all"
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      )}

      {!concept && (
        <>
          <div className="scroll-section">
            <QuickWords level={level} onSelectWord={handleSearch} />
          </div>
          <div className="scroll-section">
            <CategoryPicker onSelectWord={handleSearch} />
          </div>
        </>
      )}

      {/* Features Section */}
      <section className="scroll-section max-w-6xl mx-auto px-4 mb-12">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FeatureCard
            icon="🔤"
            title="Script Explorer"
            description="Study characters, pronunciation, and example words for each writing system."
          />
          <FeatureCard
            icon="🔊"
            title="Audio Playback"
            description="Hear native pronunciation for every translation using text-to-speech."
          />
          <FeatureCard
            icon="🌐"
            title="Cross-Language"
            description="Translate any concept across 10 languages at once — see patterns and connections."
          />
        </div>
      </section>

      {/* Flag Counter */}
      <div className="scroll-section max-w-6xl mx-auto px-4 mb-8">
        <div className="glass rounded-2xl p-6 text-center">
          <h3 className="text-sm font-semibold text-theme-3 mb-3">Visitors from around the world</h3>
          <a href="https://info.flagcounter.com/ab30" target="_blank" rel="noopener noreferrer">
            <img
              src="https://s01.flagcounter.com/count2/ab30/bg_FFFFFF/txt_000000/border_CCCCCC/columns_6/maxflags_30/viewers_0/labels_1/pageviews_1/flags_0/percent_0/"
              alt="Flag Counter"
              className="inline-block rounded-lg"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="glass rounded-2xl p-6 text-center group hover:bg-[var(--bg-glass-hover)] transition-all duration-300">
      <span className="text-3xl mb-3 inline-block group-hover:scale-110 transition-transform">{icon}</span>
      <h3 className="text-theme-2 font-semibold text-sm mb-2">{title}</h3>
      <p className="text-theme-4 text-xs leading-relaxed">{description}</p>
    </div>
  );
}
