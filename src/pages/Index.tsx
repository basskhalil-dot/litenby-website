import { LitenbyNavbar } from '@/components/LitenbyNavbar';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LitenbyNavbar />
      <main className="container flex min-h-[80vh] flex-col items-center justify-center text-center">
        <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
          litenby is a creative lab
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          we craft brands that move culture forward.
        </p>
      </main>
    </div>
  );
};

export default Index;
