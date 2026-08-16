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

export default function Quote() {
  const { lang } = useLanguage();

  const t = {
    sv: {
      quote: '"Det är ingen magi. Det är 15 års vardag, översatt till mjukvara."',
      sub: 'Operativ fältserviceerfarenhet kombinerad med djup AI-kompetens. Inte för att revolutionera en bransch – utan för att äntligen ge den ett verktyg som håller hela dagen.',
    },
    en: {
      quote: '"It\'s not magic. It\'s 15 years of everyday reality, translated into software."',
      sub: 'Operational field service experience combined with deep AI expertise. Not to revolutionise an industry — but to finally give it a tool that holds up all day.',
    },
  }[lang];

  return (
    <section className="section noise-bg quote-section" style={{ padding: '120px 24px', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '800px' }}>

        <motion.p style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(22px, 4vw, 32px)', lineHeight: 1.4, color: 'var(--primary)', marginBottom: '24px', fontWeight: 500 }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
        >
          {t.quote}
        </motion.p>

        <motion.p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} custom={1}
        >
          {t.sub}
        </motion.p>

      </div>

      <style>{`
        @media (max-width: 768px) { .quote-section { padding: 72px 20px !important; } }
        @media (max-width: 480px) { .quote-section { padding: 56px 16px !important; } }
      `}</style>
    </section>
  );
}
