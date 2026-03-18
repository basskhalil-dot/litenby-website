import { LitenbyNavbar } from '@/components/LitenbyNavbar';
import { HeroSection } from '@/components/HeroSection';
import { ThreeLabsSection } from '@/components/ThreeLabsSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LitenbyNavbar />
      <HeroSection />
      <ThreeLabsSection />
      <HowItWorksSection />
    </div>
  );
};

export default Index;
