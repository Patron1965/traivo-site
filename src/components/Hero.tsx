import { motion } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Lock, Sparkles, ChevronDown, Send, RotateCcw, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const }
  })
};

type Phase = 'idle' | 'loading' | 'chat' | 'submitting' | 'result';
interface Analysis { summary: string; insights: string[]; recommendation: string; }

function SkeletonLine({ width = '100%', height = 14 }: { width?: string; height?: number }) {
  return (
    <div style={{
      width, height, borderRadius: 6,
      background: 'linear-gradient(90deg, rgba(54,186,186,0.08) 25%, rgba(54,186,186,0.18) 50%, rgba(54,186,186,0.08) 75%)',
      backgroundSize: '200% 100%',
      animation: 'skeletonShimmer 1.6s ease-in-out infinite',
    }} />
  );
}

function LoadingSkeleton({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(54,186,186,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'skeletonPulse 1.6s ease-in-out infinite' }}>
          <Sparkles size={14} color="var(--primary)" style={{ opacity: 0.5 }} />
        </div>
        <SkeletonLine width="60%" height={12} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SkeletonLine width="85%" height={18} />
        <SkeletonLine width="70%" height={18} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
        <SkeletonLine width="100%" />
        <SkeletonLine width="95%" />
        <SkeletonLine width="80%" />
      </div>
      <div style={{ height: 96, borderRadius: 10, border: '1px solid rgba(54,186,186,0.2)', background: 'rgba(54,186,186,0.04)', animation: 'skeletonPulse 1.6s ease-in-out infinite', marginTop: 8 }} />
      <div style={{ height: 48, borderRadius: 12, background: 'rgba(54,186,186,0.12)', animation: 'skeletonPulse 1.6s ease-in-out infinite' }} />
      <p style={{ textAlign: 'center', color: 'var(--primary)', fontSize: 12, opacity: 0.7, letterSpacing: '0.06em', fontWeight: 600 }}>
        {label}
      </p>
    </div>
  );
}

function ChatInterface({ onSubmit, isSubmitting, ui }: {
  onSubmit: (text: string) => void;
  isSubmitting: boolean;
  ui: { ready: string; describe: string; placeholder: string; chars: string; submit: string; submitting: string; privacy: string; };
}) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => { const t = setTimeout(() => textareaRef.current?.focus(), 80); return () => clearTimeout(t); }, []);
  const canSubmit = text.trim().length >= 10 && !isSubmitting;
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && canSubmit) { e.preventDefault(); onSubmit(text.trim()); }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, animation: 'fadeSlideIn 0.4s ease both' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(54,186,186,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 1px rgba(54,186,186,0.25)' }}>
          <Sparkles size={14} color="var(--primary)" />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.03em' }}>{ui.ready}</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', opacity: 0.7 }}>{ui.describe}</div>
        </div>
      </div>
      <p style={{ color: 'var(--fg)', fontSize: 14, lineHeight: 1.6, margin: 0, opacity: 0.9 }}>{ui.placeholder}</p>
      <div style={{ position: 'relative' }}>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={ui.placeholder}
          rows={5}
          style={{ width: '100%', background: 'rgba(54,186,186,0.05)', border: '1px solid rgba(54,186,186,0.25)', borderRadius: 10, color: 'var(--fg)', fontSize: 14, lineHeight: 1.6, padding: '12px 14px', resize: 'none', outline: 'none', fontFamily: 'var(--font-body)', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
          onFocus={e => (e.target.style.borderColor = 'rgba(54,186,186,0.55)')}
          onBlur={e => (e.target.style.borderColor = 'rgba(54,186,186,0.25)')}
        />
        <div style={{ position: 'absolute', bottom: 10, right: 12, fontSize: 10, color: 'var(--muted)', opacity: 0.4 }}>
          {text.length} {ui.chars}
        </div>
      </div>
      <button onClick={() => canSubmit && onSubmit(text.trim())} disabled={!canSubmit} className="btn-primary" style={{ width: '100%', justifyContent: 'center', borderRadius: 12, padding: '14px 20px', opacity: canSubmit ? 1 : 0.45, cursor: canSubmit ? 'pointer' : 'default', transition: 'opacity 0.2s', gap: 8 }}>
        {isSubmitting ? <><span className="hjarna-spinner" /> {ui.submitting}</> : <>{ui.submit} <Send size={16} /></>}
      </button>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--muted)', fontSize: 11 }}>
        <Lock size={10} />
        <span>{ui.privacy}</span>
      </div>
    </div>
  );
}

function ResultView({ analysis, onReset, ui }: { analysis: Analysis; onReset: () => void; ui: { title: string; based: string; rec: string; cta: string; reset: string; }; }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, animation: 'fadeSlideIn 0.4s ease both' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(54,186,186,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 1px rgba(54,186,186,0.4)' }}>
          <CheckCircle2 size={15} color="var(--primary)" />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.03em' }}>{ui.title}</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', opacity: 0.7 }}>{ui.based}</div>
        </div>
      </div>
      <p style={{ fontSize: 14, color: 'var(--fg)', lineHeight: 1.65, margin: 0, opacity: 0.95 }}>{analysis.summary}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {analysis.insights.map((insight, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, background: 'rgba(54,186,186,0.06)', border: '1px solid rgba(54,186,186,0.15)', borderRadius: 8, padding: '10px 12px', animation: `fadeSlideIn 0.4s ease ${i * 0.1}s both` }}>
            <span style={{ color: 'var(--primary)', fontSize: 16, lineHeight: 1, marginTop: 1, flexShrink: 0 }}>→</span>
            <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>{insight}</span>
          </div>
        ))}
      </div>
      <div style={{ background: 'rgba(54,186,186,0.1)', border: '1px solid rgba(54,186,186,0.3)', borderRadius: 10, padding: '14px 16px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.06em', marginBottom: 6 }}>{ui.rec}</div>
        <p style={{ fontSize: 13, color: 'var(--fg)', margin: 0, lineHeight: 1.55, opacity: 0.9 }}>{analysis.recommendation}</p>
      </div>
      <button className="btn-primary btn-glow" style={{ width: '100%', justifyContent: 'center', borderRadius: 12, padding: '14px 20px', gap: 8 }}>
        {ui.cta} <ArrowRight size={16} />
      </button>
      <button onClick={onReset} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--muted)', fontSize: 12, margin: '0 auto', opacity: 0.7 }}>
        <RotateCcw size={12} /> {ui.reset}
      </button>
    </div>
  );
}

export default function Hero() {
  const [showOptions, setShowOptions] = useState(false);
  const [phase, setPhase]             = useState<Phase>('idle');
  const [analysis, setAnalysis]       = useState<Analysis | null>(null);
  const [error, setError]             = useState<string | null>(null);
  const { lang }                      = useLanguage();

  const tr = {
    sv: {
      badge: 'PLATTFORM FÖR FÄLTSERVICE · NORDEN',
      h1: <>Planera dagen, kör rutten,<br />fakturera samma kväll.</>,
      sub: 'Ett system för fältarbetet — schemaläggning, ruttoptimering, mobilapp och kundportal i samma plattform.',
      startHere: 'BÖRJA HÄR',
      cardTitle: 'Beskriv din verksamhet — få ett konkret svar direkt.',
      cardDesc: 'Hjärnan är vår AI-rådgivare. Berätta hur ni jobbar idag, så får du en analys av vad Traivo skulle göra för just er — anonymt och utan säljsamtal.',
      cta: 'Öppna Hjärnan',
      privacy: 'Inget loggas · Inga säljsamtal · Helt anonymt',
      customize: 'Anpassa svarsnivå',
      customizeDetail: 'Välj detaljnivå för analysen: Strategisk översikt eller teknisk djupdykning. (Kommer i Hjärnan)',
      loading: 'HJÄRNAN LADDAR…',
      errMsg: 'Något gick fel. Försök igen.',
      errConn: 'Kunde inte nå servern. Kontrollera din anslutning.',
      chat: { ready: 'Hjärnan är redo', describe: 'Beskriv hur ni jobbar idag', placeholder: 'Vi är ett VVS-företag med 8 tekniker. Idag koordinerar vi via Whatsapp och Excel, och vi tappar ofta koll på fakturor...', chars: 'tecken', submit: 'Analysera min verksamhet', submitting: 'Analyserar…', privacy: 'Inget loggas · Inga säljsamtal · Helt anonymt' },
      result: { title: 'Hjärnans analys', based: 'Baserat på din beskrivning', rec: 'REKOMMENDATION', cta: 'Kom igång gratis', reset: 'Börja om med ny beskrivning' },
    },
    en: {
      badge: 'FIELD SERVICE PLATFORM · NORDICS',
      h1: <>Plan the day, run the route,<br />invoice the same evening.</>,
      sub: 'One system for field operations — scheduling, route optimisation, mobile app and customer portal in one platform.',
      startHere: 'START HERE',
      cardTitle: 'Describe your business — get a concrete answer instantly.',
      cardDesc: 'Hjärnan is our AI advisor. Tell us how you work today and get an analysis of what Traivo would do for your specific operation — anonymously and without any sales calls.',
      cta: 'Open Hjärnan',
      privacy: 'Nothing logged · No sales calls · Completely anonymous',
      customize: 'Customise response level',
      customizeDetail: 'Choose level of detail: Strategic overview or technical deep-dive. (Coming to Hjärnan)',
      loading: 'HJÄRNAN LOADING…',
      errMsg: 'Something went wrong. Please try again.',
      errConn: 'Could not reach the server. Check your connection.',
      chat: { ready: 'Hjärnan is ready', describe: 'Describe how you work today', placeholder: 'We are a plumbing company with 8 technicians. Today we coordinate via WhatsApp and Excel, and we often lose track of invoices...', chars: 'chars', submit: 'Analyse my business', submitting: 'Analysing…', privacy: 'Nothing logged · No sales calls · Completely anonymous' },
      result: { title: "Hjärnan's analysis", based: 'Based on your description', rec: 'RECOMMENDATION', cta: 'Get started free', reset: 'Start over with a new description' },
    },
  }[lang];

  const openHjarna = () => { setPhase('loading'); setError(null); setTimeout(() => setPhase('chat'), 1600); };

  const submitDescription = async (description: string) => {
    setPhase('submitting'); setError(null);
    try {
      const res  = await fetch('/api/hjarna', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ description }) });
      const data = await res.json() as { ok: boolean; analysis: Analysis; error?: string };
      if (!res.ok || !data.ok) { setError(data.error ?? tr.errMsg); setPhase('chat'); return; }
      setAnalysis(data.analysis); setPhase('result');
    } catch { setError(tr.errConn); setPhase('chat'); }
  };

  const reset = () => { setPhase('idle'); setAnalysis(null); setError(null); };

  return (
    <section className="section noise-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '120px' }}>
      <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px' }}>

        <motion.div className="badge" style={{ marginBottom: '32px' }} initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <span className="dot"></span>
          {tr.badge}
        </motion.div>

        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}>
          {tr.h1}
        </motion.h1>

        <motion.p style={{ fontSize: '18px', color: 'var(--muted)', marginBottom: '48px', maxWidth: '600px' }} initial="hidden" animate="visible" variants={fadeUp} custom={2}>
          {tr.sub}
        </motion.p>

        <motion.div className="card hero-card" style={{ maxWidth: '640px', width: '100%', padding: '40px 32px' }} initial="hidden" animate="visible" variants={fadeUp} custom={3}>

          {/* IDLE */}
          {phase === 'idle' && (
            <div style={{ animation: 'fadeSlideIn 0.3s ease both' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '16px' }}>
                <Sparkles size={14} /> {tr.startHere}
              </div>
              <h3 style={{ fontSize: '22px', color: 'var(--primary)', marginBottom: '16px' }}>{tr.cardTitle}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '32px', lineHeight: 1.5 }}>{tr.cardDesc}</p>
              <button onClick={openHjarna} className="btn-primary btn-glow" style={{ width: '100%', justifyContent: 'center', marginBottom: '16px', borderRadius: '12px', padding: '16px' }}>
                {tr.cta} <ArrowRight size={18} />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--muted)', fontSize: '12px', marginBottom: '24px' }}>
                <Lock size={12} /><span>{tr.privacy}</span>
              </div>
              <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '16px' }}>
                <button onClick={() => setShowOptions(!showOptions)} style={{ color: 'var(--muted)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', margin: '0 auto' }}>
                  {tr.customize} <ChevronDown size={14} style={{ transform: showOptions ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
                {showOptions && (
                  <div style={{ marginTop: '16px', color: 'var(--muted)', fontSize: '13px', textAlign: 'left', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px' }}>
                    {tr.customizeDetail}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* LOADING */}
          {phase === 'loading' && (
            <div style={{ animation: 'fadeSlideIn 0.25s ease both' }}>
              <LoadingSkeleton label={tr.loading} />
            </div>
          )}

          {/* CHAT */}
          {(phase === 'chat' || phase === 'submitting') && (
            <>
              {error && (
                <div style={{ background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.2)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#ff8080', marginBottom: 16, textAlign: 'left' }}>
                  {error}
                </div>
              )}
              <ChatInterface onSubmit={submitDescription} isSubmitting={phase === 'submitting'} ui={tr.chat} />
            </>
          )}

          {/* RESULT */}
          {phase === 'result' && analysis && (
            <ResultView analysis={analysis} onReset={reset} ui={tr.result} />
          )}
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 480px) { .hero-card { padding: 24px 16px !important; } }
        @keyframes skeletonShimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes skeletonPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .hjarna-spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(9,18,15,0.3); border-top-color: var(--primary-fg); border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
