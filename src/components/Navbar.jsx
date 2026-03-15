import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LANGUAGE_SLUGS } from '../data/alphabets';
import ALL_ALPHABETS from '../data/alphabets';
import { useTheme } from '../utils/ThemeContext';

function PrismLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="prism-g" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
        <linearGradient id="prism-inner" x1="8" y1="10" x2="24" y2="26">
          <stop offset="0%" stopColor="#c7d2fe" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f9a8d4" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path d="M16 2L30 28H2L16 2Z" stroke="url(#prism-g)" strokeWidth="2" fill="none" />
      <path d="M16 8L24 24H8L16 8Z" fill="url(#prism-inner)" />
      <circle cx="16" cy="16" r="3" fill="url(#prism-g)" opacity="0.7" />
      <line x1="16" y1="13" x2="10" y2="24" stroke="#818cf8" strokeWidth="0.5" opacity="0.4" />
      <line x1="16" y1="13" x2="22" y2="24" stroke="#f472b6" strokeWidth="0.5" opacity="0.4" />
      <line x1="16" y1="13" x2="16" y2="24" stroke="#a78bfa" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass border-b" style={{ borderColor: 'var(--border-glass)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <PrismLogo />
            <div className="flex flex-col leading-none">
              <span className="text-base font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
                Polyglot Prism
              </span>
              <span className="text-[9px] text-theme-4 tracking-widest uppercase font-medium">
                Language Explorer
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <NavLink to="/" active={isActive('/')} label="Home" icon="🏠" />
            {LANGUAGE_SLUGS.map((slug) => {
              const lang = ALL_ALPHABETS[slug];
              return (
                <NavLink
                  key={slug}
                  to={`/learn/${slug}`}
                  active={isActive(`/learn/${slug}`)}
                  label={lang.name}
                  icon={lang.flag}
                />
              );
            })}

            <button
              onClick={toggleTheme}
              className="ml-2 w-9 h-9 rounded-full flex items-center justify-center text-theme-3 hover:text-theme transition-all hover:bg-[var(--bg-glass-hover)]"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <span className="text-lg">{theme === 'dark' ? '☀️' : '🌙'}</span>
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-[var(--bg-glass-hover)] transition-colors"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <span className="text-lg">{theme === 'dark' ? '☀️' : '🌙'}</span>
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg hover:bg-[var(--bg-glass-hover)] transition-colors"
            >
              <span className="text-xl text-theme">{mobileOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden animate-fade-in border-t pb-3" style={{ borderColor: 'var(--border-glass)' }}>
          <div className="px-4 pt-2 flex flex-col gap-1">
            <MobileNavLink to="/" active={isActive('/')} label="Home" icon="🏠" onClick={() => setMobileOpen(false)} />
            {LANGUAGE_SLUGS.map((slug) => {
              const lang = ALL_ALPHABETS[slug];
              return (
                <MobileNavLink
                  key={slug}
                  to={`/learn/${slug}`}
                  active={isActive(`/learn/${slug}`)}
                  label={lang.name}
                  icon={lang.flag}
                  onClick={() => setMobileOpen(false)}
                />
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ to, active, label, icon }) {
  return (
    <Link
      to={to}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5
        ${active
          ? 'bg-indigo-500/20 text-indigo-500 border border-indigo-500/30'
          : 'text-theme-3 hover:text-theme hover:bg-[var(--bg-glass-hover)]'
        }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

function MobileNavLink({ to, active, label, icon, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2
        ${active
          ? 'bg-indigo-500/20 text-indigo-500'
          : 'text-theme-3 hover:text-theme hover:bg-[var(--bg-glass-hover)]'
        }`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
