import auraMistImage from "@/assets/aura-mist-bottle.webp.asset.json";
import auraMistHoverImage from "@/assets/aura-mist-bottle-labeled.webp.asset.json";
import comingSoonImage from "@/assets/packaging-coming-soon.webp.asset.json";

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
    primaryImage: auraMistImage.url,
    hoverImage: auraMistHoverImage.url,
    description: "A refined mist bottle designed for premium skincare and fragrance lines.",
  },
  {
    id: "elixir-dropper",
    name: "Elixir Dropper Serum",
    primaryImage: comingSoonImage.url,
    hoverImage: comingSoonImage.url,
    description: "Precision dropper serum bottle crafted for luxury beauty formulations.",
  },
  {
    id: "velvet-cream",
    name: "Velvet Cream Jar",
    primaryImage: comingSoonImage.url,
    hoverImage: comingSoonImage.url,
    description: "An elegant cream jar with a soft-touch finish for high-end moisturizers.",
  },
  {
    id: "noir-pump",
    name: "Noir Pump Dispenser",
    primaryImage: comingSoonImage.url,
    hoverImage: comingSoonImage.url,
    description: "A sleek pump dispenser with matte black detailing for body care products.",
  },
  {
    id: "terra-tube",
    name: "Terra Squeeze Tube",
    primaryImage: comingSoonImage.url,
    hoverImage: comingSoonImage.url,
    description: "A modern squeeze tube with an organic, earthy aesthetic for clean beauty brands.",
  },
  {
    id: "crystal-vial",
    name: "Crystal Vial Flask",
    primaryImage: comingSoonImage.url,
    hoverImage: comingSoonImage.url,
    description: "A compact vial flask with crystalline clarity for serums and essences.",
  },
  {
    id: "onyx-spray",
    name: "Onyx Spray Bottle",
    primaryImage: comingSoonImage.url,
    hoverImage: comingSoonImage.url,
    description: "A precision spray bottle with a dark onyx finish for toners and setting sprays.",
  },
  {
    id: "bloom-roller",
    name: "Bloom Roll-On",
    primaryImage: comingSoonImage.url,
    hoverImage: comingSoonImage.url,
    description: "A roll-on applicator with botanical-inspired design for essential oil blends.",
  },
  {
    id: "silk-ampoule",
    name: "Silk Ampoule",
    primaryImage: comingSoonImage.url,
    hoverImage: comingSoonImage.url,
    description: "A single-dose ampoule with a silky finish for concentrated treatment serums.",
  },
  {
    id: "dune-flask",
    name: "Dune Flask Bottle",
    primaryImage: comingSoonImage.url,
    hoverImage: comingSoonImage.url,
    description: "An organically shaped flask inspired by desert dunes for artisanal fragrances.",
  },
  {
    id: "prism-jar",
    name: "Prism Cream Pot",
    primaryImage: comingSoonImage.url,
    hoverImage: comingSoonImage.url,
    description: "A geometric cream pot with prismatic facets for luxury night creams.",
  },
  {
    id: "zenith-dropper",
    name: "Zenith Dropper",
    primaryImage: comingSoonImage.url,
    hoverImage: comingSoonImage.url,
    description: "A minimalist dropper bottle with clean lines for premium facial oils.",
  },
];
