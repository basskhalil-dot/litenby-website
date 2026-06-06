import { useState, useEffect } from 'react';
import { LitenbyNavbar } from '@/components/LitenbyNavbar';
import { Preloader } from '@/components/Preloader';
import { HeroScrollPin } from '@/components/HeroScrollPin';
import { ThreeLabsSection } from '@/components/ThreeLabsSection';
import { PackagingLabSection } from '@/components/PackagingLabSection';
import { CollabsSection } from '@/components/CollabsSection';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';
import { BackToTop } from '@/components/BackToTop';

const Index = () => {
  const [progress, setProgress] = useState(0);
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setProgress(100));
    const fallback = setTimeout(() => setProgress(100), 2000);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {!preloaderDone && (
        <Preloader progress={progress} onComplete={() => setPreloaderDone(true)} />
      )}
      <LitenbyNavbar />
      <HeroScrollPin />
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
