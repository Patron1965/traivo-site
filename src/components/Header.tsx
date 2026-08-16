import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const NAV_ITEMS = [
  { sv: 'HJÄRNAN',    en: 'HJÄRNAN',    href: '#hur-det-funkar', sectionId: 'hur-det-funkar' },
  { sv: 'TRAIVO ONE', en: 'TRAIVO ONE', href: '#plattformen',    sectionId: 'plattformen'    },
  { sv: 'TRAIVO GO',  en: 'TRAIVO GO',  href: '#branscher',      sectionId: 'branscher'      },
  { sv: 'PRISER',     en: 'PRICING',    href: '#priser'                                        },
  { sv: 'OM OSS',     en: 'ABOUT',      href: '#om-oss',         sectionId: 'om-oss'         },
  { sv: 'KONTAKT',    en: 'CONTACT',    href: '#kontakt',         sectionId: 'kontakt'        },
];

export default function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeId, setActiveId]     = useState<string | null>(null);
  const menuRef                     = useRef<HTMLDivElement>(null);
  const { lang, setLang }           = useLanguage();

  // Scroll-glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [menuOpen]);

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // IntersectionObserver — track which section is in view
  useEffect(() => {
    const sectionIds = NAV_ITEMS
      .map((l) => l.sectionId)
      .filter((id): id is string => Boolean(id));

    const observers: IntersectionObserver[] = [];
    const visibleSections = new Map<string, number>();

    const pickActive = () => {
      let best: string | null = null;
      let bestRatio = 0;
      visibleSections.forEach((ratio, id) => {
        if (ratio > bestRatio) { bestRatio = ratio; best = id; }
      });
      setActiveId(best);
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }
          pickActive();
        },
        { threshold: [0, 0.15, 0.5], rootMargin: '-80px 0px -20% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const loginLabel    = lang === 'en' ? 'LOG IN'       : 'LOGGA IN';
  const openMenuLabel = lang === 'en' ? 'Open menu'    : 'Öppna meny';
  const closeMenuLabel= lang === 'en' ? 'Close menu'   : 'Stäng meny';

  const LangToggle = ({ size = 'sm' }: { size?: 'sm' | 'lg' }) => {
    const pad      = size === 'lg' ? '6px 16px' : '4px 12px';
    const fontSize = size === 'lg' ? '13px'     : '12px';
    return (
      <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '999px', padding: '2px' }}>
        {(['sv', 'en'] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              padding: pad, borderRadius: '999px', fontSize, fontWeight: 600,
              background: lang === l ? 'var(--primary)' : 'transparent',
              color:      lang === l ? 'var(--primary-fg)' : 'var(--muted)',
              transition: 'all 0.2s',
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    );
  };

  return (
    <motion.header
      ref={menuRef}
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        background:    scrolled || menuOpen ? 'rgba(15, 27, 31, 0.95)' : 'transparent',
        backdropFilter:scrolled || menuOpen ? 'blur(12px)'             : 'none',
        borderBottom:  scrolled || menuOpen ? '1px solid var(--border)': '1px solid transparent',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px' }}>

        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '24px', fontWeight: 600, fontFamily: 'var(--font-head)', zIndex: 101 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Traivo
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="desktop-nav">
          {NAV_ITEMS.map(({ sv, en, href, sectionId }) => {
            const label    = lang === 'en' ? en : sv;
            const isActive = Boolean(sectionId && activeId === sectionId);
            return (
              <a
                key={sv}
                href={href}
                className={`nav-link${isActive ? ' nav-link--active' : ''}`}
                style={{
                  position: 'relative',
                  fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em',
                  color: isActive ? 'var(--fg)' : 'var(--muted)',
                  transition: 'color 0.25s ease',
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--fg)'; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--muted)'; }}
              >
                {label}
                <span style={{
                  position: 'absolute', bottom: '-4px', left: 0, right: 0, height: '1px',
                  background: 'var(--primary)',
                  transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left center',
                  transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                  borderRadius: '1px',
                }} />
              </a>
            );
          })}
        </nav>

        {/* Right Actions (desktop) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="desktop-nav">
          <LangToggle size="sm" />
          <a href="#login" className="btn-outline">
            {loginLabel} <ArrowRight size={14} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          style={{ display: 'none', zIndex: 101 }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? closeMenuLabel : openMenuLabel}
        >
          {menuOpen ? <X color="var(--fg)" size={24} /> : <Menu color="var(--fg)" size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="mobile-menu">
          <nav>
            {NAV_ITEMS.map(({ sv, en, href, sectionId }) => {
              const label    = lang === 'en' ? en : sv;
              const isActive = Boolean(sectionId && activeId === sectionId);
              return (
                <a
                  key={sv}
                  href={href}
                  className="mobile-nav-link"
                  style={{ color: isActive ? 'var(--fg)' : undefined }}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                  {isActive && (
                    <span style={{ marginLeft: '8px', width: '5px', height: '5px', borderRadius: '50%', background: 'var(--primary)', display: 'inline-block', verticalAlign: 'middle' }} />
                  )}
                </a>
              );
            })}
          </nav>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
            <LangToggle size="lg" />
            <a href="#login" className="btn-outline" style={{ width: 'fit-content' }}>
              {loginLabel} <ArrowRight size={14} />
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 992px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        .mobile-menu {
          padding: 16px 24px 32px;
          background: rgba(15, 27, 31, 0.98);
          backdrop-filter: blur(12px);
          border-top: 1px solid var(--border);
          animation: slideDown 0.2s ease;
        }
        .mobile-menu nav { display: flex; flex-direction: column; gap: 4px; }
        .mobile-nav-link {
          display: block; padding: 12px 0;
          font-size: 16px; font-weight: 500; letter-spacing: 0.08em;
          color: var(--muted); border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: color 0.2s;
        }
        .mobile-nav-link:hover { color: var(--fg); }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </motion.header>
  );
}
