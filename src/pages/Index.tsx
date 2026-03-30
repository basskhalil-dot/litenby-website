import { LitenbyNavbar } from '@/components/LitenbyNavbar';
import { HeroScrollSequence } from '@/components/HeroScrollSequence';
import { HeroGeometric } from '@/components/HeroGeometric';
import { ThreeLabsSection } from '@/components/ThreeLabsSection';
import { PackagingLabSection } from '@/components/PackagingLabSection';
import { CollabsSection } from '@/components/CollabsSection';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LitenbyNavbar />
      <HeroScrollSequence />
      <HeroGeometric />
      <ThreeLabsSection />
      <PackagingLabSection />
      <CollabsSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
