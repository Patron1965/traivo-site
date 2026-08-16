import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const }
  })
};

export default function Industries() {
  const { lang } = useLanguage();

  const t = {
    sv: {
      badge: 'BRANSCHER',
      h2: 'Byggt för verksamheter med många stopp',
      sub: 'Traivo passar bäst där geografi, tid och kompetens måste pussla ihop varje dag. Här är branscherna där vi gör störst skillnad.',
      allTab: 'Alla branscher',
      showMore: 'Visa alla exempel',
      callout: '"Det som gör skillnad är kombinationen geografi och AI. Klustervalidering hindrar att jobb säljs där de inte kan utföras lönsamt. Ruttoptimering med riktiga vägdata sparar bränsle och timmar varje dag. Och beslutsstödet förklarar varför AI:n placerade jobbet just där – så planeraren behåller kontrollen."',
      tabs: ['Miljö, återvinning & avfall', 'Tekniska installationer & service', 'Fastighet & facility management', 'Transport & last mile', 'Hemtjänst & mobil vård'],
      content: [
        { title: 'Miljö, återvinning & avfall', desc: 'Geofencing av tömningsställen, ruttoptimering för tunga fordon, snabb hantering av budningar och extratömningar.' },
        { title: 'Tekniska installationer & service', desc: 'Vitvaror, fiber, hiss, kyla. Koppling mellan avtal, artiklar och teknikerns kompetens – med snabb dokumentation i fält.' },
        { title: 'Fastighet & facility management', desc: 'Yttre skötsel, trappstädning, snöröjning, rondering. Årsplanering, QR-kvitto på utfört arbete och prediktivt underhåll.' },
        { title: 'Transport & last mile', desc: 'Distribution där rutter ändras dagligen. What-if-analys, automatisk omplanering och kundportal med live-leveransstatus.' },
        { title: 'Hemtjänst & mobil vård', desc: 'Hårda tidsfönster och slotpreferenser per brukare. Heatmaps som visar belastning per område innan personalen blir överkörd.' },
      ],
    },
    en: {
      badge: 'INDUSTRIES',
      h2: 'Built for businesses with many stops',
      sub: 'Traivo works best where geography, time and skills must fit together every day. Here are the industries where we make the biggest difference.',
      allTab: 'All industries',
      showMore: 'See all examples',
      callout: '"What makes the difference is the combination of geography and AI. Cluster validation prevents jobs being sold where they cannot be executed profitably. Route optimisation with real road data saves fuel and hours every day. And the decision support explains why the AI placed the job there — so the planner stays in control."',
      tabs: ['Environment, recycling & waste', 'Technical installations & service', 'Property & facility management', 'Transport & last mile', 'Home care & mobile healthcare'],
      content: [
        { title: 'Environment, recycling & waste', desc: 'Geofencing of collection points, route optimisation for heavy vehicles, fast handling of extra collections and complaints.' },
        { title: 'Technical installations & service', desc: 'Appliances, fibre, lifts, refrigeration. Linking contracts, articles and technician skills — with fast field documentation.' },
        { title: 'Property & facility management', desc: 'Outdoor maintenance, stairwell cleaning, snow removal, rounds. Annual planning, QR receipts for completed work and predictive maintenance.' },
        { title: 'Transport & last mile', desc: 'Distribution where routes change daily. What-if analysis, automatic rescheduling and a customer portal with live delivery status.' },
        { title: 'Home care & mobile healthcare', desc: 'Hard time windows and slot preferences per client. Heatmaps showing load per area before staff become overloaded.' },
      ],
    },
  }[lang];

  const allTabs = [t.allTab, ...t.tabs];
  const [activeTab, setActiveTab] = useState(allTabs[0]);

  React.useEffect(() => { setActiveTab(allTabs[0]); }, [lang]);

  const visibleContent = activeTab === t.allTab
    ? t.content
    : t.content.filter((_, i) => t.tabs[i] === activeTab);

  return (
    <section className="section" id="branscher">
      <div className="container">

        <motion.div className="badge" style={{ marginBottom: '24px' }} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>
          {t.badge}
        </motion.div>

        <motion.div style={{ maxWidth: '700px', marginBottom: '48px' }} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} custom={1}>
          <h2>{t.h2}</h2>
          <p style={{ color: 'var(--muted)', fontSize: '18px' }}>{t.sub}</p>
        </motion.div>

        <motion.div className="tabs-container" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '32px' }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={2}
        >
          {allTabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '8px 16px', borderRadius: '999px', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 500, transition: 'all 0.2s ease',
              background: activeTab === tab ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
              color:      activeTab === tab ? 'var(--primary-fg)' : 'var(--fg)',
              border:     activeTab === tab ? '1px solid var(--primary)' : '1px solid transparent',
            }}>
              {tab}
            </button>
          ))}
        </motion.div>

        <div className="grid-cards" style={{ display: 'grid', gap: '24px', marginBottom: '64px' }}>
          <AnimatePresence mode="popLayout">
            {visibleContent.map((item, i) => (
              <motion.div key={item.title} className="card" style={{ display: 'flex', flexDirection: 'column' }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, boxShadow: '0 12px 32px rgba(54,186,186,0.12)' }}
              >
                <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>{item.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '32px', flex: 1 }}>{item.desc}</p>
                <a href="#" style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: 'auto' }}>
                  {t.showMore} <ArrowRight size={14} />
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div className="card" style={{ background: 'rgba(54,186,186,0.05)', border: '1px solid var(--primary)' }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
        >
          <p style={{ fontSize: '18px', color: 'var(--fg)', lineHeight: 1.6 }}>{t.callout}</p>
        </motion.div>

      </div>

      <style>{`
        .tabs-container::-webkit-scrollbar { display: none; }
        .grid-cards { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }
        @media (max-width: 640px) { .grid-cards { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
