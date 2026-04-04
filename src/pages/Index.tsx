import { useState, useCallback, useEffect } from 'react';
import { LitenbyNavbar } from '@/components/LitenbyNavbar';
import { Preloader } from '@/components/Preloader';
import { HeroScrollSequence } from '@/components/HeroScrollSequence';
import { ThreeLabsSection } from '@/components/ThreeLabsSection';
import { PackagingLabSection } from '@/components/PackagingLabSection';
import { CollabsSection } from '@/components/CollabsSection';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';
import { BackToTop } from '@/components/BackToTop';

const Index = () => {
  const [progress, setProgress] = useState(0);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [framesReady, setFramesReady] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);

  const onEarlyLoad = useCallback(() => {
    setFramesReady(true);
  }, []);

  // Font loading
  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true));
  }, []);

  // Combine signals into progress
  useEffect(() => {
    let p = 0;
    if (fontsReady) p += 40;
    if (framesReady) p += 60;
    setProgress(p);
  }, [fontsReady, framesReady]);

  return (
    <div className="min-h-screen bg-background">
      {!preloaderDone && (
        <Preloader progress={progress} onComplete={() => setPreloaderDone(true)} />
      )}
      <LitenbyNavbar />
      <HeroScrollSequence onEarlyLoad={onEarlyLoad} />
      <HeroGeometric />
      <ThreeLabsSection />
      <PackagingLabSection />
      <CollabsSection />
      <AboutSection />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
