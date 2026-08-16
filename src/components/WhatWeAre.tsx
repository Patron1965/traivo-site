import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const }
  })
};

export default function WhatWeAre() {
  const { lang } = useLanguage();

  const t = {
    sv: {
      badge: 'VAD VI ÄR',
      h2: 'Inte en app som fixar allt. Ett system som håller ihop verkligheten.',
      intro: 'Traivo är byggt för fältserviceorganisationer som vill ha ett system som faktiskt fungerar i fält.',
      items: [
        { label: 'Vertikal fokusnisch', desc: 'Vi gör en sak: fältservice i Norden. Ingen pivot till "enterprise SaaS" – ingen "vi löser allt". Vi löser era rutter, era jobb, era protokoll och er fakturering.' },
        { label: 'Inga meningslösa buzzwords', desc: 'Vi pratar om rutter och jobb. Om tekniker och fordon. Om protokoll och fakturor. Inte om "transformationsresor".' },
        { label: 'Byggt för nordisk verklighet', desc: 'Mörkt på morgonen. Snökaos. 4G-hål i glesbygden. Kollektivavtal. GDPR. Vi har räknat med det – inte lagt det som en fotnot.' },
        { label: 'AI som förklarar sig', desc: 'Traivos AI föreslår och motiverar. Du bestämmer. Har du erfarenhet som systemet saknar – lyssnar det på dig, inte tvärtom.' },
      ],
    },
    en: {
      badge: 'WHAT WE ARE',
      h2: "Not an app that fixes everything. A system that holds reality together.",
      intro: 'Traivo is built for field service organisations that want a system that actually works in the field.',
      items: [
        { label: 'Vertical niche focus', desc: 'We do one thing: field service in the Nordics. No pivot to "enterprise SaaS" — no "we solve everything". We solve your routes, your jobs, your reports and your invoicing.' },
        { label: 'No meaningless buzzwords', desc: 'We talk about routes and jobs. About technicians and vehicles. About reports and invoices. Not about "transformation journeys".' },
        { label: 'Built for Nordic reality', desc: 'Dark in the morning. Snow chaos. 4G black spots in rural areas. Collective agreements. GDPR. We\'ve accounted for them — not buried them in a footnote.' },
        { label: 'AI that explains itself', desc: "Traivo's AI suggests and gives reasons. You decide. If you have experience the system lacks — it listens to you, not the other way round." },
      ],
    },
  }[lang];

  return (
    <section className="section" id="vad-vi-ar">
      <div className="container">

        <motion.div className="badge" style={{ marginBottom: '24px' }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
        >
          {t.badge}
        </motion.div>

        <motion.h2 style={{ maxWidth: '700px', marginBottom: '24px' }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} custom={1}
        >
          {t.h2}
        </motion.h2>

        <motion.p style={{ color: 'var(--muted)', fontSize: '18px', marginBottom: '48px', maxWidth: '600px' }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} custom={2}
        >
          {t.intro}
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '720px' }}>
          {t.items.map((item, i) => (
            <motion.div key={i} className="card what-item" style={{ padding: '24px 28px', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '24px', alignItems: 'start' }}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={i}
              whileHover={{ borderColor: 'rgba(54,186,186,0.25)', x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <span style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: 600 }}>{item.label}</span>
              <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 600px) {
          .what-item { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      `}</style>
    </section>
  );
}
