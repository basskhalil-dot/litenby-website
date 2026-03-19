import { LitenbyNavbar } from '@/components/LitenbyNavbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ThreeLabsSection } from '@/components/ThreeLabsSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { PackagingLabSection } from '@/components/PackagingLabSection';
import { CollabsSection } from '@/components/CollabsSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LitenbyNavbar />
      <HeroSection />
      <ThreeLabsSection />
      <HowItWorksSection />
      <PackagingLabSection />
      <CollabsSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
