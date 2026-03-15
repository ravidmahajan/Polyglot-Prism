/**
 * Per-language ambient background palettes.
 * Each theme defines gradient colors and floating orb colors
 * that evoke the cultural atmosphere of the language.
 */

const AMBIENT_THEMES = {
  home: {
    dark: {
      g1: '#0a0628', g2: '#140930', g3: '#0b1040', base: '#050510',
      o1: 'rgba(99,102,241,0.14)', o2: 'rgba(139,92,246,0.10)', o3: 'rgba(236,72,153,0.08)',
    },
    light: {
      g1: '#e0e7ff', g2: '#ede9fe', g3: '#dbeafe', base: '#f0f4ff',
      o1: 'rgba(99,102,241,0.18)', o2: 'rgba(139,92,246,0.12)', o3: 'rgba(236,72,153,0.10)',
    },
  },
  english: {
    dark: {
      g1: '#0c1a3d', g2: '#1a1030', g3: '#0d1f45', base: '#060a18',
      o1: 'rgba(59,130,246,0.16)', o2: 'rgba(234,179,8,0.08)', o3: 'rgba(99,102,241,0.06)',
    },
    light: {
      g1: '#dbeafe', g2: '#fef3c7', g3: '#e0e7ff', base: '#f0f4ff',
      o1: 'rgba(59,130,246,0.18)', o2: 'rgba(234,179,8,0.10)', o3: 'rgba(99,102,241,0.08)',
    },
  },
  french: {
    dark: {
      g1: '#1a0a2e', g2: '#2d0a1f', g3: '#0f0d3a', base: '#080510',
      o1: 'rgba(239,68,68,0.10)', o2: 'rgba(168,85,247,0.12)', o3: 'rgba(59,130,246,0.08)',
    },
    light: {
      g1: '#ede9fe', g2: '#fce7f3', g3: '#e0e7ff', base: '#faf5ff',
      o1: 'rgba(239,68,68,0.12)', o2: 'rgba(168,85,247,0.14)', o3: 'rgba(59,130,246,0.10)',
    },
  },
  mandarin: {
    dark: {
      g1: '#2a0a0a', g2: '#1f1005', g3: '#200810', base: '#0a0508',
      o1: 'rgba(220,38,38,0.14)', o2: 'rgba(245,158,11,0.12)', o3: 'rgba(234,88,12,0.06)',
    },
    light: {
      g1: '#fef2f2', g2: '#fef3c7', g3: '#fff7ed', base: '#fffbeb',
      o1: 'rgba(220,38,38,0.12)', o2: 'rgba(245,158,11,0.14)', o3: 'rgba(234,88,12,0.08)',
    },
  },
  arabic: {
    dark: {
      g1: '#052e1a', g2: '#1a1f05', g3: '#0a2520', base: '#030d08',
      o1: 'rgba(16,185,129,0.14)', o2: 'rgba(234,179,8,0.10)', o3: 'rgba(5,150,105,0.08)',
    },
    light: {
      g1: '#d1fae5', g2: '#fef3c7', g3: '#ecfdf5', base: '#f0fdf4',
      o1: 'rgba(16,185,129,0.16)', o2: 'rgba(234,179,8,0.12)', o3: 'rgba(5,150,105,0.10)',
    },
  },
  russian: {
    dark: {
      g1: '#1a0520', g2: '#0d0a35', g3: '#25081a', base: '#08040e',
      o1: 'rgba(99,102,241,0.14)', o2: 'rgba(147,51,234,0.10)', o3: 'rgba(220,38,38,0.06)',
    },
    light: {
      g1: '#ede9fe', g2: '#e0e7ff', g3: '#fce7f3', base: '#f5f3ff',
      o1: 'rgba(99,102,241,0.16)', o2: 'rgba(147,51,234,0.12)', o3: 'rgba(220,38,38,0.08)',
    },
  },
  japanese: {
    dark: {
      g1: '#200a1e', g2: '#1a0528', g3: '#15081f', base: '#0a0410',
      o1: 'rgba(236,72,153,0.14)', o2: 'rgba(168,85,247,0.10)', o3: 'rgba(244,114,182,0.06)',
    },
    light: {
      g1: '#fce7f3', g2: '#faf5ff', g3: '#fdf2f8', base: '#fdf4ff',
      o1: 'rgba(236,72,153,0.16)', o2: 'rgba(168,85,247,0.12)', o3: 'rgba(244,114,182,0.08)',
    },
  },
  sanskrit: {
    dark: {
      g1: '#1f0f02', g2: '#2a1505', g3: '#1a0a02', base: '#0a0604',
      o1: 'rgba(249,115,22,0.14)', o2: 'rgba(245,158,11,0.10)', o3: 'rgba(234,88,12,0.08)',
    },
    light: {
      g1: '#fff7ed', g2: '#fef3c7', g3: '#ffedd5', base: '#fffbeb',
      o1: 'rgba(249,115,22,0.16)', o2: 'rgba(245,158,11,0.14)', o3: 'rgba(234,88,12,0.10)',
    },
  },
  spanish: {
    dark: {
      g1: '#2a0808', g2: '#1f1005', g3: '#200505', base: '#0a0405',
      o1: 'rgba(220,38,38,0.14)', o2: 'rgba(245,158,11,0.10)', o3: 'rgba(234,88,12,0.06)',
    },
    light: {
      g1: '#fef2f2', g2: '#fef3c7', g3: '#fff1f2', base: '#fff7ed',
      o1: 'rgba(220,38,38,0.14)', o2: 'rgba(245,158,11,0.12)', o3: 'rgba(234,88,12,0.08)',
    },
  },
  turkish: {
    dark: {
      g1: '#250510', g2: '#051a1a', g3: '#1a050d', base: '#080408',
      o1: 'rgba(225,29,72,0.12)', o2: 'rgba(20,184,166,0.10)', o3: 'rgba(190,18,60,0.06)',
    },
    light: {
      g1: '#fff1f2', g2: '#ccfbf1', g3: '#fce7f3', base: '#fdf2f8',
      o1: 'rgba(225,29,72,0.14)', o2: 'rgba(20,184,166,0.12)', o3: 'rgba(190,18,60,0.08)',
    },
  },
  bangla: {
    dark: {
      g1: '#03200e', g2: '#0f1a05', g3: '#051a12', base: '#030a06',
      o1: 'rgba(5,150,105,0.14)', o2: 'rgba(22,163,74,0.10)', o3: 'rgba(16,185,129,0.06)',
    },
    light: {
      g1: '#d1fae5', g2: '#dcfce7', g3: '#ecfdf5', base: '#f0fdf4',
      o1: 'rgba(5,150,105,0.16)', o2: 'rgba(22,163,74,0.14)', o3: 'rgba(16,185,129,0.10)',
    },
  },
};

export function getAmbientTheme(slug, isDark) {
  const key = slug && AMBIENT_THEMES[slug] ? slug : 'home';
  return AMBIENT_THEMES[key][isDark ? 'dark' : 'light'];
}
