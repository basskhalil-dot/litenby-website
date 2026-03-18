import { LitenbyNavbar } from '@/components/LitenbyNavbar';
import { HeroSection } from '@/components/HeroSection';
import { ThreeLabsSection } from '@/components/ThreeLabsSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { PackagingLabSection } from '@/components/PackagingLabSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LitenbyNavbar />
      <HeroSection />
      <ThreeLabsSection />
      <HowItWorksSection />
      <PackagingLabSection />
    </div>
  );
};

export default Index;
