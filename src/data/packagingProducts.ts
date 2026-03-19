import placeholder1 from "@/assets/placeholder-1.jpg";
import placeholder2 from "@/assets/placeholder-2.jpg";
import placeholder3 from "@/assets/placeholder-3.jpg";
import placeholder4 from "@/assets/placeholder-4.jpg";
import placeholder5 from "@/assets/placeholder-5.jpg";
import placeholder6 from "@/assets/placeholder-6.jpg";

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
    primaryImage: placeholder1,
    hoverImage: placeholder1,
    description: "A refined mist bottle designed for premium skincare and fragrance lines.",
  },
  {
    id: "elixir-dropper",
    name: "Elixir Dropper Serum",
    primaryImage: placeholder2,
    hoverImage: placeholder2,
    description: "Precision dropper serum bottle crafted for luxury beauty formulations.",
  },
  {
    id: "velvet-cream",
    name: "Velvet Cream Jar",
    primaryImage: placeholder3,
    hoverImage: placeholder3,
    description: "An elegant cream jar with a soft-touch finish for high-end moisturizers.",
  },
  {
    id: "noir-pump",
    name: "Noir Pump Dispenser",
    primaryImage: placeholder4,
    hoverImage: placeholder4,
    description: "A sleek pump dispenser with matte black detailing for body care products.",
  },
  {
    id: "terra-tube",
    name: "Terra Squeeze Tube",
    primaryImage: placeholder5,
    hoverImage: placeholder5,
    description: "A modern squeeze tube with an organic, earthy aesthetic for clean beauty brands.",
  },
  {
    id: "crystal-vial",
    name: "Crystal Vial Flask",
    primaryImage: placeholder6,
    hoverImage: placeholder6,
    description: "A compact vial flask with crystalline clarity for serums and essences.",
  },
];
