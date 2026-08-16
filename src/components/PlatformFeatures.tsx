import React from 'react';
import { Calendar, Route, Smartphone, MapPin, BrainCircuit, Receipt } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }
  })
};

const icons = [
  <Calendar size={24} />,
  <Route size={24} />,
  <Smartphone size={24} />,
  <MapPin size={24} />,
  <BrainCircuit size={24} />,
  <Receipt size={24} />,
];

export default function PlatformFeatures() {
  const { lang } = useLanguage();

  const t = {
    sv: {
      badge: 'PLATTFORMEN',
      h2: 'En plattform. Hela kedjan.',
      sub: 'Ett system som håller hela dagen – från första jobbet kl 07:00 till sista fakturan kl 17:00. Byggt på operativ erfarenhet, inte på demos.',
      closing: '"Slut på att jaga information mellan fem system. Planering, rutt, jobb, protokoll, faktura, analys – samma plattform, samma data, samma sanning."',
      features: [
        { title: 'Schemaläggning', desc: 'Automatisk planering som tar hänsyn till kompetens, geografi och kapacitet.' },
        { title: 'Smartare rutter', desc: 'Ruttoptimering baserad på riktiga vägar – inte fågelvägen.' },
        { title: 'Mobilapp offline', desc: 'Fungerar utan nät, med protokoll och foto. Synkar automatiskt.' },
        { title: 'GPS & akuttilldelning', desc: 'Realtidskarta med positioner. Akutjobb till närmaste tekniker.' },
        { title: 'AI-analys', desc: 'Hittar avvikelser innan de blir problem. Prediktivt underhåll.' },
        { title: 'Fakturering & kundportal', desc: 'Faktura, bokning och besökshistorik – i samma system.' },
      ],
    },
    en: {
      badge: 'THE PLATFORM',
      h2: 'One platform. The entire chain.',
      sub: 'A system that holds up all day — from the first job at 07:00 to the last invoice at 17:00. Built on operational experience, not on demos.',
      closing: '"No more chasing information across five systems. Scheduling, route, job, report, invoice, analysis — same platform, same data, single source of truth."',
      features: [
        { title: 'Scheduling', desc: 'Automatic planning that accounts for skills, geography, and capacity.' },
        { title: 'Smarter routes', desc: 'Route optimisation based on real roads — not straight lines.' },
        { title: 'Offline mobile app', desc: 'Works without connectivity, with reports and photos. Syncs automatically.' },
        { title: 'GPS & emergency dispatch', desc: 'Real-time map with positions. Urgent jobs sent to the nearest technician.' },
        { title: 'AI analysis', desc: 'Spots anomalies before they become problems. Predictive maintenance.' },
        { title: 'Invoicing & customer portal', desc: 'Invoices, bookings and visit history — in the same system.' },
      ],
    },
  }[lang];

  return (
    <section className="section" id="plattformen">
      <div className="container">

        <motion.div className="badge" style={{ marginBottom: '24px' }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
        >
          {t.badge}
        </motion.div>

        <motion.div style={{ maxWidth: '700px', marginBottom: '64px' }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} custom={1}
        >
          <h2>{t.h2}</h2>
          <p style={{ color: 'var(--muted)', fontSize: '18px' }}>{t.sub}</p>
        </motion.div>

        <div className="features-grid" style={{ display: 'grid', gap: '24px', marginBottom: '64px' }}>
          {t.features.map((f, i) => (
            <motion.div key={f.title} className="card" style={{ padding: '32px', cursor: 'default' }}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={i}
              whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(54,186,186,0.12)', borderColor: 'rgba(54,186,186,0.3)' }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              <motion.div style={{ color: 'var(--primary)', marginBottom: '24px' }} whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                {icons[i]}
              </motion.div>
              <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>{f.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '15px' }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
        >
          <p style={{ fontSize: '18px', color: 'var(--fg)', lineHeight: 1.6 }}>{t.closing}</p>
        </motion.div>

      </div>

      <style>{`
        .features-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
        @media (max-width: 640px) { .features-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
