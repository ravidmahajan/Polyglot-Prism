import React from 'react';
import { LEVELS } from '../utils/categories';

export default function LevelTabs({ activeLevel, onLevelChange }) {
  return (
    <div className="flex justify-center gap-2 px-4 mb-6 flex-wrap">
      {LEVELS.map((level) => (
        <button
          key={level.id}
          onClick={() => onLevelChange(level.id)}
          className={`
            px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2
            ${activeLevel === level.id
              ? 'bg-indigo-500/20 text-indigo-500 border border-indigo-500/40 shadow-lg shadow-indigo-500/10'
              : 'glass text-theme-3 hover:text-theme-2 hover:bg-[var(--bg-glass-hover)]'}
          `}
        >
          <span>{level.icon}</span>
          <span>{level.label}</span>
          <span className="hidden md:inline text-xs text-theme-4">— {level.description}</span>
        </button>
      ))}
    </div>
  );
}
