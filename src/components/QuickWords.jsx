import React from 'react';
import { LEVEL_EXAMPLES } from '../utils/categories';

export default function QuickWords({ level, onSelectWord }) {
  const words = LEVEL_EXAMPLES[level] || [];

  return (
    <div className="px-4 max-w-4xl mx-auto mb-6">
      <p className="text-center text-sm text-theme-4 mb-3">
        Quick picks — click any to translate:
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        {words.map((word) => (
          <button
            key={word}
            onClick={() => onSelectWord(word)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium glass text-theme-3
                       hover:text-theme hover:bg-[var(--bg-glass-hover)] transition-all hover:scale-105"
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
}
