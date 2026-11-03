/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { AudioPlayer } from './components/AudioPlayer';
import { FloatingParticles } from './components/FloatingParticles';
import { HeroSection } from './components/HeroSection';
import { MemoryWall } from './components/MemoryWall';
import { LoveLetter } from './components/LoveLetter';
import { ReasonsSection } from './components/ReasonsSection';
import { CakeSection } from './components/CakeSection';
import { SecretEnvelopes } from './components/SecretEnvelopes';
import { ClosingSection } from './components/ClosingSection';

export default function App() {
  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleOpenSurprise = useCallback(() => {
    scrollToSection('letter');
  }, [scrollToSection]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2420] relative selection:bg-[#E8D5C4] selection:text-[#4A1521]">
      {/* Floating Ambient Golden Bokeh Particles */}
      <FloatingParticles />

      {/* Floating Gentle Audio Player */}
      <AudioPlayer />

      {/* Navigation Top Bar */}
      <Navbar onNavigate={scrollToSection} />

      {/* 1. Landing Page – The Birthday Surprise */}
      <HeroSection onOpenSurprise={handleOpenSurprise} />

      {/* 2. Our Memories – Authentic Photo Gallery */}
      <MemoryWall />

      {/* 3. A Letter For You – Digital Handwritten Love Letter */}
      <LoveLetter />

      {/* 4. Reasons Why You're Special – "Little Things I Love About You" */}
      <ReasonsSection />

      {/* 5. A Special Birthday Moment – Interactive Cake & Candle */}
      <CakeSection />

      {/* 6. Surprise Keepsake – "Open When..." Secret Letters */}
      <SecretEnvelopes />

      {/* 7. Final Romantic Closing Message */}
      <ClosingSection />
    </div>
  );
}
