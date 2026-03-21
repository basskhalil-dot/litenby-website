import { LitenbyNavbar } from '@/components/LitenbyNavbar';
import { Footer } from '@/components/Footer';

const Brand = () => {
  return (
    <div className="min-h-screen bg-background">
      <LitenbyNavbar />

      {/* Hero Section - Blank skeleton */}
      <section className="relative min-h-[90vh] w-full">
        <div className="mx-auto max-w-7xl px-6">
          {/* Add hero content here */}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Brand;
