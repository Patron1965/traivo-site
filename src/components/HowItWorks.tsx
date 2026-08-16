import React from 'react';
import { ArrowRight, Monitor, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const }
  })
};

export default function HowItWorks() {
  const { lang } = useLanguage();

  const t = {
    sv: {
      badge: 'SÅ FUNKAR DET',
      h2: 'Från grunddata till faktura — i ett flöde.',
      steps: ['Administration', 'Planera', 'Optimera rutt', 'Rapportera i fält', 'Fakturera'],
      adminHeader: 'ADMINISTRATIONEN FÖRBEREDER GRUNDDATAN INNAN PLANERAREN TAR VID:',
      adminList: ['Objekt & adresser', 'Artiklar/tjänster per objekt', 'Restider', 'Fordon & kapacitet', 'Kompetenser', 'Tidsfönster & öppettider', 'Tömnings-/serviceintervall'],
      adminNote: 'Traivo håller grunddatan levande — så att rätt rutt kan rullas ut varje morgon.',
      twoApps: 'TVÅ APPAR — ETT SYSTEM',
      twoAppsSub: 'Kontoret styr. Fältet rapporterar.',
      oneLabel: 'FÖR KONTORET',
      oneDesc: 'Schemaläggning, ruttoptimering och realtidskoll på fältet — i en kontrollvy.',
      oneLink: 'Läs om Traivo One',
      goLabel: 'FÖR FÄLTET',
      goDesc: 'Mobilapp för tekniker: digitala protokoll, foto, QR och navigation — fungerar offline.',
      goLink: 'Läs om Traivo Go',
    },
    en: {
      badge: 'HOW IT WORKS',
      h2: 'From base data to invoice — in one flow.',
      steps: ['Administration', 'Plan', 'Optimise route', 'Report in the field', 'Invoice'],
      adminHeader: 'ADMINISTRATION PREPARES THE BASE DATA BEFORE THE PLANNER TAKES OVER:',
      adminList: ['Objects & addresses', 'Articles/services per object', 'Travel times', 'Vehicles & capacity', 'Skills', 'Time windows & opening hours', 'Collection/service intervals'],
      adminNote: 'Traivo keeps the base data alive — so the right route can roll out every morning.',
      twoApps: 'TWO APPS — ONE SYSTEM',
      twoAppsSub: 'Office in control. Field reports.',
      oneLabel: 'FOR THE OFFICE',
      oneDesc: 'Scheduling, route optimisation and real-time field overview — in one control view.',
      oneLink: 'Learn about Traivo One',
      goLabel: 'FOR THE FIELD',
      goDesc: 'Mobile app for technicians: digital reports, photos, QR and navigation — works offline.',
      goLink: 'Learn about Traivo Go',
    },
  }[lang];

  return (
    <section className="section" id="hur-det-funkar">
      <div className="container">

        <motion.div className="badge" style={{ marginBottom: '24px' }} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>
          {t.badge}
        </motion.div>

        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} custom={1}>
          {t.h2}
        </motion.h2>

        {/* Process Steps */}
        <div className="process-steps" style={{ display: 'flex', alignItems: 'center', gap: '16px', overflowX: 'auto', paddingBottom: '32px', marginBottom: '48px', borderBottom: '1px solid var(--border)' }}>
          {t.steps.map((step, index) => (
            <React.Fragment key={index}>
              <motion.div
                style={{ whiteSpace: 'nowrap', color: index === 0 ? 'var(--primary)' : 'var(--muted)', fontWeight: index === 0 ? 600 : 400 }}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={index + 2}
              >
                {step}
              </motion.div>
              {index < t.steps.length - 1 && (
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={index + 2.5}>
                  <ArrowRight size={16} color="var(--border)" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Two Columns */}
        <div className="grid-2">
          <div style={{ paddingRight: '24px' }}>
            <motion.h4
              style={{ fontSize: '12px', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '24px', lineHeight: 1.6 }}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
            >
              {t.adminHeader}
            </motion.h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {t.adminList.map((item, i) => (
                <motion.li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--fg)', fontSize: '15px' }}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={i * 0.5}
                >
                  <div style={{ width: '6px', height: '6px', background: 'var(--primary)', borderRadius: '50%', flexShrink: 0 }}></div>
                  {item}
                </motion.li>
              ))}
            </ul>
            <motion.p style={{ color: 'var(--primary)', fontSize: '14px', fontStyle: 'italic' }}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
            >
              {t.adminNote}
            </motion.p>
          </div>

          <div>
            <motion.div style={{ marginBottom: '32px' }} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{t.twoApps}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '15px' }}>{t.twoAppsSub}</p>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <motion.div className="card hover-lift" style={{ padding: '24px' }}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={1}
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(54,186,186,0.15)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '10px', background: 'rgba(54,186,186,0.1)', borderRadius: '8px', color: 'var(--primary)' }}><Monitor size={20} /></div>
                    <h4 style={{ fontSize: '18px', margin: 0 }}>Traivo One</h4>
                  </div>
                  <div className="badge" style={{ fontSize: '10px', padding: '2px 8px' }}>{t.oneLabel}</div>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '16px' }}>{t.oneDesc}</p>
                <a href="#" style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {t.oneLink} <ArrowRight size={14} />
                </a>
              </motion.div>

              <motion.div className="card hover-lift" style={{ padding: '24px' }}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={2}
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(54,186,186,0.15)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '10px', background: 'rgba(54,186,186,0.1)', borderRadius: '8px', color: 'var(--primary)' }}><Smartphone size={20} /></div>
                    <h4 style={{ fontSize: '18px', margin: 0 }}>Traivo Go</h4>
                  </div>
                  <div className="badge" style={{ fontSize: '10px', padding: '2px 8px' }}>{t.goLabel}</div>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '16px' }}>{t.goDesc}</p>
                <a href="#" style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {t.goLink} <ArrowRight size={14} />
                </a>
              </motion.div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .grid-2 { display: grid; grid-template-columns: 1fr 1.2fr; gap: 64px; }
        @media (max-width: 768px) {
          .grid-2 { grid-template-columns: 1fr; gap: 40px; }
          .grid-2 > div:first-child { padding-right: 0 !important; }
          .process-steps { mask-image: linear-gradient(to right, black 80%, transparent 100%); }
        }
      `}</style>
    </section>
  );
}
