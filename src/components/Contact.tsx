import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }
  })
};

export default function Contact() {
  const { lang } = useLanguage();

  const t = {
    sv: {
      h2: <>Nyfiken? Hör av dig –<br/>vi lyssnar.</>,
      cardTitle: 'Hör av dig när det passar',
      cardSub: 'Vi loggar ingenting. Vi ringer aldrig. Hör av dig när du själv vill.',
      name: 'Namn', email: 'E-post', phone: 'Telefon (frivilligt)', message: 'Meddelande', submit: 'Skicka',
    },
    en: {
      h2: <>Curious? Reach out —<br/>we&apos;re listening.</>,
      cardTitle: 'Get in touch when it suits you',
      cardSub: 'We log nothing. We never call. Reach out whenever you feel like it.',
      name: 'Name', email: 'Email', phone: 'Phone (optional)', message: 'Message', submit: 'Send',
    },
  }[lang];

  return (
    <section className="section" id="kontakt">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <motion.div style={{ textAlign: 'center', marginBottom: '48px', maxWidth: '600px' }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
        >
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: '16px' }}>{t.h2}</h2>
        </motion.div>

        <motion.div className="card contact-card" style={{ maxWidth: '500px', width: '100%', padding: '40px' }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={1}
        >
          <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{t.cardTitle}</h3>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '32px' }}>{t.cardSub}</p>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={(e) => e.preventDefault()}>
            {[
              { label: t.name,    type: 'text'  },
              { label: t.email,   type: 'email' },
              { label: t.phone,   type: 'tel'   },
            ].map(({ label, type }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--muted)' }}>{label}</label>
                <input type={type} className="input-field" />
              </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--muted)' }}>{t.message}</label>
              <textarea className="input-field" rows={4} style={{ resize: 'vertical' }}></textarea>
            </div>
            <button type="submit" className="btn-primary btn-glow" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>
              {t.submit} <ArrowRight size={18} />
            </button>
          </form>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 480px) { .contact-card { padding: 24px 16px !important; } }
        .input-field {
          background: rgba(0,0,0,0.2); border: 1px solid var(--border); border-radius: 8px;
          padding: 12px 16px; color: var(--fg); font-family: inherit; font-size: 15px; transition: border-color 0.2s;
        }
        .input-field:focus { outline: none; border-color: var(--primary); }
      `}</style>
    </section>
  );
}
