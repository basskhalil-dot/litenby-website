import { LitenbyNavbar } from '@/components/LitenbyNavbar';
import { HeroSection } from '@/components/HeroSection';
import { ThreeLabsSection } from '@/components/ThreeLabsSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LitenbyNavbar />
      <HeroSection />
      <ThreeLabsSection />
    </div>
  );
};

export default Index;
