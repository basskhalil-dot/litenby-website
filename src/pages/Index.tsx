import { LitenbyNavbar } from '@/components/LitenbyNavbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ThreeLabsSection } from '@/components/ThreeLabsSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { PackagingLabSection } from '@/components/PackagingLabSection';
import { CollabsSection } from '@/components/CollabsSection';
import { CTASection } from '@/components/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LitenbyNavbar />
      <HeroSection />
      <AboutSection />
      <ThreeLabsSection />
      <HowItWorksSection />
      <PackagingLabSection />
      <CollabsSection />
      <CTASection />
    </div>
  );
};

export default Index;
