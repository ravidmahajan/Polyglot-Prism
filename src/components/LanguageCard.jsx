import React, { useState } from 'react';
import { speak } from '../utils/speech';

export default function LanguageCard({ language, translation, delay = 0 }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = () => {
    if (!translation?.text || translation.text === '—') return;
    setIsPlaying(true);
    speak(translation.text, language.speechCode);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const borderStyle = { borderColor: `${language.color}33` };
  const glowStyle = isPlaying
    ? { boxShadow: `0 0 30px ${language.color}40, 0 0 60px ${language.color}20` }
    : {};

  return (
    <div
      className="language-card animate-slide-up group"
      style={{ ...borderStyle, ...glowStyle, animationDelay: `${delay}ms` }}
      onClick={handleSpeak}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleSpeak()}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{language.flag}</span>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: language.color }}>
              {language.name}
            </span>
            <span className="block text-[10px] text-theme-4">{language.script}</span>
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); handleSpeak(); }}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: `${language.color}20` }}
          title={`Listen in ${language.name}`}
        >
          {isPlaying ? (
            <span className="text-sm animate-pulse">🔊</span>
          ) : (
            <span className="text-sm opacity-60 group-hover:opacity-100">🔈</span>
          )}
        </button>
      </div>

      <p className="text-xl md:text-2xl font-bold text-theme leading-snug min-h-[2rem]">
        {translation?.text || <span className="shimmer inline-block w-32 h-6 rounded" />}
      </p>

      {translation?.transliteration && (
        <p className="text-sm mt-2 italic text-theme-3">
          <span className="text-theme-4">Reads as: </span>
          <span style={{ color: `${language.color}cc` }}>"{translation.transliteration}"</span>
        </p>
      )}

      <p className="text-[10px] text-theme-5 mt-2 group-hover:text-theme-3 transition-colors flex items-center gap-1">
        <span>🔈</span> Click to hear pronunciation
      </p>
    </div>
  );
}
