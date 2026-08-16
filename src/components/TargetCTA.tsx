import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const }
  })
};

export default function TargetCTA() {
  const { lang } = useLanguage();

  const t = {
    sv: {
      badge: 'FÖR VEM',
      h2: 'Inte för alla — men förmodligen för dig.',
      sub: 'Traivo passar bäst för nordiska fältserviceverksamheter med 5–200 tekniker/fordon som idag jonglerar med Excel, Whatsapp och separata system.',
      items: [
        'Du planerar 10–500 stopp per dag',
        'Du har tekniker/fordon som rör sig i ett geografiskt område',
        'Du vill ha ett system som täcker planering, fält och fakturering',
        'Du är trött på att manuellt lappa ihop olika verktyg',
      ],
      cta: 'Boka en demo',
      ctaNote: 'Genomsnittstid: 23 minuter. Ingen PowerPoint.',
    },
    en: {
      badge: 'WHO IS IT FOR',
      h2: "Not for everyone — but probably for you.",
      sub: 'Traivo works best for Nordic field service businesses with 5–200 technicians/vehicles who currently juggle Excel, WhatsApp and separate systems.',
      items: [
        'You plan 10–500 stops per day',
        'You have technicians/vehicles moving across a geographic area',
        'You want a system that covers planning, field, and invoicing',
        "You're tired of manually patching together different tools",
      ],
      cta: 'Book a demo',
      ctaNote: 'Average duration: 23 minutes. No PowerPoint.',
    },
  }[lang];

  return (
    <section className="section" id="for-vem">
      <div className="container">
        <div className="target-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>

          <div>
            <motion.div className="badge" style={{ marginBottom: '24px' }}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
            >
              {t.badge}
            </motion.div>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} custom={1}>
              {t.h2}
            </motion.h2>
            <motion.p style={{ color: 'var(--muted)', fontSize: '16px', marginBottom: '32px', lineHeight: 1.6 }}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} custom={2}
            >
              {t.sub}
            </motion.p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {t.items.map((item, i) => (
                <motion.div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--fg)', fontSize: '15px', lineHeight: 1.5 }}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={i + 3}
                >
                  <span style={{ color: 'var(--primary)', marginTop: '2px', flexShrink: 0 }}>→</span>
                  {item}
                </motion.div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <motion.a href="#kontakt" className="btn-primary btn-glow" style={{ fontSize: '20px', padding: '24px 48px', marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '12px' }}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} custom={2}
              whileHover={{ scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {t.cta} <ArrowRight size={22} />
            </motion.a>
            <motion.p style={{ color: 'var(--muted)', fontSize: '14px' }}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} custom={3}
            >
              {t.ctaNote}
            </motion.p>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .target-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .target-grid > div:last-child { text-align: left; align-items: flex-start !important; }
        }
      `}</style>
    </section>
  );
}
