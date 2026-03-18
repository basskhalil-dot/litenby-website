import { LitenbyNavbar } from '@/components/LitenbyNavbar';
import { HeroSection } from '@/components/HeroSection';
import { ThreeLabsSection } from '@/components/ThreeLabsSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { PackagingLabSection } from '@/components/PackagingLabSection';
import { CollabsSection } from '@/components/CollabsSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LitenbyNavbar />
      <HeroSection />
      <ThreeLabsSection />
      <HowItWorksSection />
      <PackagingLabSection />
      <CollabsSection />
    </div>
  );
};

export default Index;
