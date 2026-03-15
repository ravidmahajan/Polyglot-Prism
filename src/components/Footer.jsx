import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t py-8 px-4 text-center" style={{ borderColor: 'var(--border-glass)' }}>
      <p className="text-theme-4 text-sm mb-1">
        Polyglot Prism — Learn 10 languages through the prism of a single concept
      </p>
      <p className="text-theme-5 text-xs mb-3">
        Photos by{' '}
        <a
          href="https://unsplash.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-indigo-400 transition-colors"
        >
          Unsplash
        </a>
      </p>
      <p className="text-theme-5 text-xs">
        &copy; 2026 Ravi Mahajan. All rights reserved.
      </p>
    </footer>
  );
}
