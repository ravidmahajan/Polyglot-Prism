import React from 'react';
import LanguageCard from './LanguageCard';
import { LANGUAGES } from '../utils/languages';

export default function ConceptView({ concept, translations, isLoading }) {
  if (!concept && !isLoading) return null;

  return (
    <div className="px-4 max-w-6xl mx-auto mb-12">
      {concept && (
        <div className="text-center mb-8 animate-fade-in">
          <span className="text-sm uppercase tracking-widest text-theme-4">Exploring</span>
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
            "{concept}"
          </h2>
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {LANGUAGES.map((lang) => (
            <div key={lang.name} className="language-card">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{lang.flag}</span>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: lang.color }}>
                  {lang.name}
                </span>
              </div>
              <div className="shimmer h-7 w-3/4 rounded mb-2" />
              <div className="shimmer h-4 w-1/2 rounded" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && translations && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {LANGUAGES.map((lang, i) => (
            <LanguageCard
              key={lang.name}
              language={lang}
              translation={translations[lang.name]}
              delay={i * 80}
            />
          ))}
        </div>
      )}
    </div>
  );
}
