import React from 'react';
import { CATEGORIES } from '../utils/categories';

export default function CategoryPicker({ onSelectWord }) {
  const [expanded, setExpanded] = React.useState(null);

  return (
    <div className="px-4 max-w-6xl mx-auto mb-8">
      <h2 className="text-center text-lg font-semibold text-theme-2 mb-4">
        ✨ Explore by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setExpanded(expanded === cat.name ? null : cat.name)}
            className={`
              glass rounded-xl p-3 text-center transition-all hover:scale-[1.02]
              ${expanded === cat.name ? 'ring-2 ring-indigo-500/50 bg-[var(--bg-glass-hover)]' : 'hover:bg-[var(--bg-glass-hover)]'}
            `}
          >
            <span className="text-2xl block mb-1">{cat.emoji}</span>
            <span className="text-sm font-medium text-theme-3">{cat.name}</span>
          </button>
        ))}
      </div>

      {expanded && (
        <div className="animate-fade-in glass rounded-2xl p-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.find((c) => c.name === expanded)?.words.map((word) => (
              <button
                key={word}
                onClick={() => onSelectWord(word)}
                className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-500/10 to-purple-500/10
                           border border-indigo-500/20 text-indigo-500 hover:from-indigo-500/20 hover:to-purple-500/20
                           hover:border-indigo-400/40 transition-all hover:scale-105"
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
