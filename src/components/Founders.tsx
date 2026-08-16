import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] as const }
  })
};

export default function Founders() {
  const { lang } = useLanguage();

  const t = {
    sv: {
      badge: 'VÅR BAKGRUND',
      h2: 'Byggt av folk som suttit i bilen',
      quote: '"De flesta planeringssystem är byggda av folk som aldrig suttit i en servicebil en hel dag."',
      p1: 'Vi har planerat rutter för hand i Excel, ringt tekniker mitt i lunchen för att flytta om jobb och försökt fakturera från handskrivna protokoll. Vi vet exakt var det brister – för vi har levt med bristerna.',
      p2: 'Vi startade Traivo för att vi själva var frustrerade. Vi visste att AI kunde lösa planering, optimering och analys på ett sätt som inte var möjligt för fem år sedan. Men vi visste också att tekniken är värdelös om den inte förstår verkligheten: att en tekniker inte kan vara på två ställen samtidigt, att akutjobb inte väntar, och att en app som kräver 4G i ett garage är meningslös.',
      p3: 'Traivo är inte byggt för demos. Det är byggt för måndag morgon kl 06:30.',
    },
    en: {
      badge: 'OUR BACKGROUND',
      h2: "Built by people who've been in the van",
      quote: '"Most planning systems are built by people who have never spent a full day in a service vehicle."',
      p1: "We've planned routes by hand in Excel, called technicians in the middle of lunch to shuffle jobs, and tried to invoice from handwritten reports. We know exactly where the gaps are — because we've lived with them.",
      p2: "We started Traivo because we were frustrated ourselves. We knew AI could solve planning, optimisation and analysis in ways that weren't possible five years ago. But we also knew the technology is worthless if it doesn't understand reality: that a technician can't be in two places at once, that urgent jobs don't wait, and that an app requiring 4G in a garage is pointless.",
      p3: 'Traivo is not built for demos. It is built for Monday morning at 06:30.',
    },
  }[lang];

  return (
    <section className="section noise-bg" id="om-oss">
      <div className="container">

        <motion.div className="badge" style={{ marginBottom: '24px' }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
        >
          {t.badge}
        </motion.div>

        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} custom={1}>
          {t.h2}
        </motion.h2>

        <div className="founders-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '64px', marginTop: '48px' }}>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={2}>
            <p style={{ fontSize: '24px', fontFamily: 'var(--font-head)', color: 'var(--primary)', lineHeight: 1.4, fontWeight: 500 }}>
              {t.quote}
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
            {[t.p1, t.p2].map((text, i) => (
              <motion.p key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={i + 3}>
                {text}
              </motion.p>
            ))}
            <motion.p style={{ color: 'var(--fg)', fontWeight: 500 }}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={5}
            >
              {t.p3}
            </motion.p>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .founders-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
