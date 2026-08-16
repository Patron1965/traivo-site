import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const }
  })
};

export default function FAQ() {
  const { lang } = useLanguage();

  const t = {
    sv: {
      h2: 'Vanliga frågor',
      faqs: [
        { q: 'Vad är Traivo?', a: 'Traivo är en nordisk plattform för fältserviceplanering som samlar schemaläggning, ruttoptimering, mobil fältapp och kundportal i ett system. Den är byggd för verksamheter med många stopp per dag — avfall, fastighet, teknisk service, transport och hemtjänst.' },
        { q: 'Vilka branscher passar Traivo för?', a: 'Traivo passar verksamheter med många stopp per dag: avfallshantering, teknisk service, fastighet & facility management, transport och hemtjänst.' },
        { q: 'Hur skiljer sig Traivo från andra fältserviceverktyg?', a: 'Traivo kombinerar schemaläggning, ruttoptimering, mobilapp och fakturering i ett enda flöde — utan att du behöver hoppa mellan system. Dessutom är AI:n byggd för nordiska förhållanden.' },
        { q: 'Hur lång tid tar det att komma igång?', a: 'De flesta verksamheter är igång inom 2–4 veckor, beroende på datamängd och integrationer.' },
        { q: 'Fungerar mobilappen utan nät?', a: 'Ja. Traivo Go fungerar helt offline och synkar automatiskt när enheten får nätanslutning igen.' },
        { q: 'Var lagras data?', a: 'All data lagras på servrar inom EU, i enlighet med GDPR och nordiska dataskyddskrav.' },
      ],
    },
    en: {
      h2: 'Frequently Asked Questions',
      faqs: [
        { q: 'What is Traivo?', a: 'Traivo is a Nordic field service planning platform that brings together scheduling, route optimisation, a mobile field app and a customer portal in one system. It is built for businesses with many stops per day — waste, property, technical service, transport and home care.' },
        { q: 'Which industries is Traivo suited for?', a: 'Traivo suits businesses with many stops per day: waste management, technical service, property & facility management, transport and home care.' },
        { q: 'How is Traivo different from other field service tools?', a: 'Traivo combines scheduling, route optimisation, a mobile app and invoicing in a single flow — without needing to jump between systems. The AI is also built specifically for Nordic conditions.' },
        { q: 'How long does it take to get started?', a: 'Most businesses are up and running within 2–4 weeks, depending on data volume and integrations.' },
        { q: 'Does the mobile app work without connectivity?', a: 'Yes. Traivo Go works fully offline and syncs automatically once the device regains a network connection.' },
        { q: 'Where is data stored?', a: 'All data is stored on servers within the EU, in compliance with GDPR and Nordic data protection requirements.' },
      ],
    },
  }[lang];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="section noise-bg">
      <div className="container" style={{ maxWidth: '800px' }}>

        <motion.h2 style={{ textAlign: 'center', marginBottom: '48px' }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
        >
          {t.h2}
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {t.faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={i}>
                <motion.div
                  className="card"
                  style={{ padding: '24px', cursor: 'pointer', background: isOpen ? 'var(--card)' : 'rgba(27,44,48,0.5)', borderColor: isOpen ? 'rgba(54,186,186,0.3)' : undefined }}
                  animate={{ background: isOpen ? 'var(--card)' : 'rgba(27,44,48,0.5)' }}
                  transition={{ duration: 0.2 }}
                  onClick={() => toggle(i)}
                  whileHover={{ borderColor: 'rgba(54,186,186,0.2)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0, color: isOpen ? 'var(--primary)' : 'var(--fg)', transition: 'color 0.2s' }}>
                      {faq.q}
                    </h3>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} style={{ flexShrink: 0, marginLeft: '16px' }}>
                      <ChevronDown size={20} style={{ color: isOpen ? 'var(--primary)' : 'var(--muted)', display: 'block' }} />
                    </motion.div>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div key="answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: 'hidden' }}>
                        <p style={{ marginTop: '16px', color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6 }}>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
