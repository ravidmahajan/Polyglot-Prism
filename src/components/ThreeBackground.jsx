import React, { useEffect, useMemo, useCallback, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../utils/ThemeContext';
import { getAmbientTheme } from '../utils/ambientThemes';
import { LANGUAGE_GALLERY, HOMEPAGE_IMAGES } from '../utils/culturalImages';

gsap.registerPlugin(ScrollTrigger);

function AmbientGallery({ images, slug }) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const idx = Math.min(
          Math.floor(self.progress * images.length),
          images.length - 1
        );
        setActiveIdx(idx);
      },
    });

    return () => trigger.kill();
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="ambient-gallery absolute inset-0 pointer-events-none">
      {images.map((img, i) => {
        const src = img.url
          .replace(/w=\d+/, 'w=1920')
          .replace(/h=\d+/, 'h=1080')
          .replace(/q=\d+/, 'q=40');

        return (
          <img
            key={`${slug}-${i}`}
            src={src}
            alt=""
            loading={i < 2 ? 'eager' : 'lazy'}
            className={`ambient-gallery-img ${i === activeIdx ? 'active' : ''}`}
          />
        );
      })}
    </div>
  );
}

export default function ThreeBackground() {
  const location = useLocation();
  const { theme } = useTheme();
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef(null);

  const slug = useMemo(() => {
    const m = location.pathname.match(/^\/learn\/(.+)$/);
    return m ? m[1] : null;
  }, [location.pathname]);

  const isDark = theme === 'dark';
  const t = useMemo(() => getAmbientTheme(slug, isDark), [slug, isDark]);

  const bgImages = useMemo(() => {
    const src = slug ? LANGUAGE_GALLERY[slug] : HOMEPAGE_IMAGES;
    return src || [];
  }, [slug]);

  const handleMouseMove = useCallback((e) => {
    mouseRef.current = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        const el = containerRef.current;
        if (el) {
          const { x, y } = mouseRef.current;
          el.style.setProperty('--mx', `${x * 100}%`);
          el.style.setProperty('--my', `${y * 100}%`);
        }
        rafRef.current = null;
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  const gradientStyle = {
    '--g1': t.g1, '--g2': t.g2, '--g3': t.g3, '--g-base': t.base,
    '--o1': t.o1, '--o2': t.o2, '--o3': t.o3,
    '--mx': '50%', '--my': '50%',
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      style={gradientStyle}
    >
      <div className="ambient-bg absolute inset-0" />
      <div className="mouse-glow" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Full-bleed cultural image — on top of gradient, under grid/noise */}
      <AmbientGallery images={bgImages} slug={slug || 'home'} />

      <div className="grid-overlay" />
      <div className="noise-overlay" />
    </div>
  );
}
