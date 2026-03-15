import React, { useState } from 'react';
import { speak } from '../utils/speech';

export default function CharacterCard({ char, roman, sound, words, speechCode, color }) {
  const [expanded, setExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = (text, e) => {
    if (e) e.stopPropagation();
    setIsPlaying(true);
    speak(text, speechCode);
    setTimeout(() => setIsPlaying(false), 1500);
  };

  return (
    <div
      className={`language-card transition-all duration-300 ${expanded ? 'ring-1' : ''}`}
      style={expanded ? { borderColor: `${color}55`, boxShadow: `0 0 25px ${color}15` } : {}}
      onClick={() => setExpanded(!expanded)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setExpanded(!expanded)}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-4xl font-bold" style={{ color }}>{char}</span>
        <button
          onClick={(e) => handleSpeak(char, e)}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: `${color}18` }}
          title="Hear this character"
        >
          {isPlaying ? (
            <span className="text-base animate-pulse">🔊</span>
          ) : (
            <span className="text-base opacity-50 hover:opacity-100">🔈</span>
          )}
        </button>
      </div>

      <p className="text-sm font-semibold text-theme-2">{roman}</p>
      <p className="text-xs text-theme-4 mb-2">Sounds like: <span className="text-theme-3 italic">{sound}</span></p>

      {expanded && words && words.length > 0 && (
        <div className="mt-3 pt-3 border-t animate-fade-in space-y-2" style={{ borderColor: 'var(--border-glass)' }}>
          <p className="text-[10px] uppercase tracking-widest text-theme-4 mb-2">Example Words</p>
          {words.map((w, i) => (
            <div
              key={i}
              className="flex items-center justify-between glass rounded-lg px-3 py-2 hover:bg-[var(--bg-glass-hover)] transition-colors"
            >
              <div>
                <span className="text-sm font-medium text-theme">{w.word}</span>
                <span className="text-xs text-theme-4 ml-2">— {w.meaning}</span>
              </div>
              <button
                onClick={(e) => handleSpeak(w.word, e)}
                className="text-sm opacity-50 hover:opacity-100 transition-opacity ml-2 shrink-0"
                title={`Hear "${w.word}"`}
              >
                🔈
              </button>
            </div>
          ))}
        </div>
      )}

      {!expanded && words && words.length > 0 && (
        <p className="text-[10px] text-theme-5 mt-2">Click to see example words</p>
      )}
    </div>
  );
}
