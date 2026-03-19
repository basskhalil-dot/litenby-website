import packBottle1 from "@/assets/pack-bottle-1.jpg";
import packBottle1Hover from "@/assets/pack-bottle-1-hover.jpg";
import packBottle2 from "@/assets/pack-bottle-2.jpg";
import packBottle2Hover from "@/assets/pack-bottle-2-hover.jpg";
import packBottle3 from "@/assets/pack-bottle-3.jpg";
import packBottle3Hover from "@/assets/pack-bottle-3-hover.jpg";

export interface PackagingProduct {
  id: string;
  name: string;
  primaryImage: string;
  hoverImage: string;
  description?: string;
}

export const packagingProducts: PackagingProduct[] = [
  {
    id: "aura-mist",
    name: "Aura Mist Bottle",
    primaryImage: packBottle1,
    hoverImage: packBottle1Hover,
    description: "A refined mist bottle designed for premium skincare and fragrance lines.",
  },
  {
    id: "elixir-dropper",
    name: "Elixir Dropper Serum",
    primaryImage: packBottle2,
    hoverImage: packBottle2Hover,
    description: "Precision dropper serum bottle crafted for luxury beauty formulations.",
  },
  {
    id: "velvet-cream",
    name: "Velvet Cream Jar",
    primaryImage: packBottle3,
    hoverImage: packBottle3Hover,
    description: "An elegant cream jar with a soft-touch finish for high-end moisturizers.",
  },
  {
    id: "noir-pump",
    name: "Noir Pump Dispenser",
    primaryImage: packBottle1,
    hoverImage: packBottle1Hover,
    description: "A sleek pump dispenser with matte black detailing for body care products.",
  },
  {
    id: "terra-tube",
    name: "Terra Squeeze Tube",
    primaryImage: packBottle2,
    hoverImage: packBottle2Hover,
    description: "A modern squeeze tube with an organic, earthy aesthetic for clean beauty brands.",
  },
  {
    id: "crystal-vial",
    name: "Crystal Vial Flask",
    primaryImage: packBottle3,
    hoverImage: packBottle3Hover,
    description: "A compact vial flask with crystalline clarity for serums and essences.",
  },
];
