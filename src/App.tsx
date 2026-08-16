import { type ReactNode } from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import WhatWeAre from './components/WhatWeAre';
import PainPoint from './components/PainPoint';
import Industries from './components/Industries';
import Founders from './components/Founders';
import TargetCTA from './components/TargetCTA';
import PlatformFeatures from './components/PlatformFeatures';
import Quote from './components/Quote';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function AppInner() {
  const { lang } = useLanguage();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Hero />
        <HowItWorks />
        <WhatWeAre />
        <PainPoint />
        <Industries />
        <Founders />
        <TargetCTA />
        <PlatformFeatures />
        <Quote />
        <Contact />
        <FAQ />
      </main>
      <Footer />

      <a href="#demo" className="btn-primary fixed-demo-btn">
        {lang === 'en' ? 'Book demo' : 'Boka demo'} &rarr;
      </a>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}

export default App;
