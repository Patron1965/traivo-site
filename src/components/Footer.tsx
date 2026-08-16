import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { lang } = useLanguage();

  const t = {
    sv: {
      tagline: 'AI-driven fältserviceplattform byggd för nordiska villkor.',
      status: 'System online',
      platformLabel: 'PLATTFORM',
      platformLinks: ['Traivo One', 'Traivo Go', 'Hjärnan – AI-rådgivare', 'Priser'],
      companyLabel: 'FÖRETAG',
      companyLinks: ['Kunskap', 'Om oss', 'Kontakt'],
      industriesLabel: 'BRANSCHER',
      industryLinks: ['Avfallshantering', 'Fastighetsskötsel', 'Teknisk service', 'Snöröjning', 'Miljö & Energi'],
      copyright: '© 2026 Traivo AB · Byggd i Skandinavien',
    },
    en: {
      tagline: 'AI-driven field service platform built for Nordic conditions.',
      status: 'System online',
      platformLabel: 'PLATFORM',
      platformLinks: ['Traivo One', 'Traivo Go', 'Hjärnan – AI Advisor', 'Pricing'],
      companyLabel: 'COMPANY',
      companyLinks: ['Knowledge', 'About us', 'Contact'],
      industriesLabel: 'INDUSTRIES',
      industryLinks: ['Waste Management', 'Property Management', 'Technical Service', 'Snow Removal', 'Environment & Energy'],
      copyright: '© 2026 Traivo AB · Built in Scandinavia',
    },
  }[lang];

  return (
    <footer className="section noise-bg" style={{ paddingBottom: '32px' }}>
      <div className="container">
        
        <div className="footer-grid" style={{ display: 'grid', gap: '48px', marginBottom: '64px' }}>
          
          <div style={{ maxWidth: '300px' }}>
            <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '24px', fontWeight: 600, fontFamily: 'var(--font-head)', marginBottom: '16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Traivo
            </a>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 }}>
              {t.tagline}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--fg)' }}>
              <div style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 8px rgba(34, 197, 94, 0.4)' }}></div>
              {t.status}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '20px', textTransform: 'uppercase' }}>{t.platformLabel}</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {t.platformLinks.map(item => (
                <li key={item}><a href="#" style={{ color: 'var(--fg)', fontSize: '14px', transition: 'color 0.2s' }} className="footer-link">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '20px', textTransform: 'uppercase' }}>{t.companyLabel}</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {t.companyLinks.map(item => (
                <li key={item}><a href="#" style={{ color: 'var(--fg)', fontSize: '14px', transition: 'color 0.2s' }} className="footer-link">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '20px', textTransform: 'uppercase' }}>{t.industriesLabel}</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {t.industryLinks.map(item => (
                <li key={item}><a href="#" style={{ color: 'var(--fg)', fontSize: '14px', transition: 'color 0.2s' }} className="footer-link">{item}</a></li>
              ))}
            </ul>
          </div>

        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ color: 'var(--muted)', fontSize: '13px' }}>
            {t.copyright}
          </p>
          <div style={{ fontSize: '16px', display: 'flex', gap: '12px' }}>
            <span title="Sverige">🇸🇪</span>
            <span title="Norge">🇳🇴</span>
            <span title="Finland">🇫🇮</span>
            <span title="Danmark">🇩🇰</span>
          </div>
        </div>

      </div>

      <style>{`
        .footer-grid {
          grid-template-columns: 2fr 1fr 1fr 1fr;
        }
        .footer-link:hover {
          color: var(--primary) !important;
        }
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
