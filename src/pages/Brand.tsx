import { LitenbyNavbar } from '@/components/LitenbyNavbar';
import { Footer } from '@/components/Footer';
import { BrandHero } from '@/components/BrandHero';
import { BrandMethodology } from '@/components/BrandMethodology';
import { BrandCraft } from '@/components/BrandCraft';

import labBrand from '@/assets/lab-brand.jpg';
import labPackaging from '@/assets/lab-packaging.jpg';
import labLaunch from '@/assets/lab-launch.jpg';

const marqueeImages = [labBrand, labPackaging, labLaunch];

const Brand = () => {
  return (
    <div className="min-h-[100dvh] bg-background overflow-x-hidden">
      <LitenbyNavbar />
      <BrandHero images={marqueeImages} />
      <BrandMethodology />
      <BrandCraft />
      <Footer />
    </div>
  );
};

export default Brand;
