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

export default function PainPoint() {
  const { lang } = useLanguage();

  const t = {
    sv: {
      badge: 'LÅTER DET BEKANT?',
      quote: '"Du har redan system – kanske flera. Ett för planering, ett för fakturering, ett för kundkontakt. Problemet är att inget av dem täcker hela kedjan. Så du hoppar mellan plattformar, dubbelregistrerar och tappar tid varje dag."',
      result: 'Resultatet: information faller mellan stolarna, tekniker väntar på besked, och du lägger kvällarna på att rätta till det som systemen borde ha löst.',
    },
    en: {
      badge: 'SOUND FAMILIAR?',
      quote: '"You already have systems — maybe several. One for planning, one for invoicing, one for customer contact. The problem is that none of them cover the entire chain. So you jump between platforms, enter data twice, and lose time every single day."',
      result: 'The result: information falls through the cracks, technicians wait for instructions, and you spend your evenings correcting what the systems should have handled.',
    },
  }[lang];

  return (
    <section className="section pain-section" style={{ padding: '120px 24px' }}>
      <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>

        <motion.div className="badge" style={{ marginBottom: '40px' }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
        >
          {t.badge}
        </motion.div>

        <motion.p style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(20px, 4vw, 26px)', lineHeight: 1.6, color: 'var(--fg)', marginBottom: '32px', fontStyle: 'italic', fontWeight: 400 }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} custom={1}
        >
          {t.quote}
        </motion.p>

        <motion.p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} custom={2}
        >
          {t.result}
        </motion.p>

      </div>

      <style>{`
        @media (max-width: 768px) { .pain-section { padding: 72px 20px !important; } }
        @media (max-width: 480px) { .pain-section { padding: 56px 16px !important; } }
      `}</style>
    </section>
  );
}
