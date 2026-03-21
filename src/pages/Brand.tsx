import { LitenbyNavbar } from '@/components/LitenbyNavbar';
import { Footer } from '@/components/Footer';
import { BrandHero } from '@/components/BrandHero';

import labBrand from '@/assets/lab-brand.jpg';
import labPackaging from '@/assets/lab-packaging.jpg';
import labLaunch from '@/assets/lab-launch.jpg';

const marqueeImages = [labBrand, labPackaging, labLaunch];

const Brand = () => {
  return (
    <div className="min-h-screen bg-background">
      <LitenbyNavbar />
      <BrandHero images={marqueeImages} />
      <Footer />
    </div>
  );
};

export default Brand;
