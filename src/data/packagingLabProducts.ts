export interface PackagingLabProduct {
  id: string;
  name: string;
  category: string;
  material: string;
  shape: string;
  primaryImage: string;
  hoverImage: string;
}

export const packagingLabProducts: PackagingLabProduct[] = [
  {
    id: "glass-bottle-01",
    name: "Amber Glass Dropper",
    category: "skincare",
    material: "glass",
    shape: "bottles",
    primaryImage: "/placeholder.svg",
    hoverImage: "/placeholder.svg",
  },
  {
    id: "glass-bottle-02",
    name: "Frosted Serum Vial",
    category: "serum",
    material: "glass",
    shape: "bottles",
    primaryImage: "/placeholder.svg",
    hoverImage: "/placeholder.svg",
  },
  {
    id: "glass-jar-01",
    name: "Clear Cream Jar",
    category: "moisturizer",
    material: "glass",
    shape: "jars",
    primaryImage: "/placeholder.svg",
    hoverImage: "/placeholder.svg",
  },
  {
    id: "carton-box-01",
    name: "Matte Black Box",
    category: "packaging",
    material: "carton",
    shape: "boxes",
    primaryImage: "/placeholder.svg",
    hoverImage: "/placeholder.svg",
  },
  {
    id: "carton-box-02",
    name: "Kraft Tuck-End Box",
    category: "packaging",
    material: "carton",
    shape: "boxes",
    primaryImage: "/placeholder.svg",
    hoverImage: "/placeholder.svg",
  },
  {
    id: "plastic-tube-01",
    name: "Squeeze Tube 100ml",
    category: "bodycare",
    material: "plastic",
    shape: "tubes",
    primaryImage: "/placeholder.svg",
    hoverImage: "/placeholder.svg",
  },
  {
    id: "bag-pouch-01",
    name: "Stand-Up Pouch",
    category: "refill",
    material: "bags",
    shape: "bags",
    primaryImage: "/placeholder.svg",
    hoverImage: "/placeholder.svg",
  },
  {
    id: "glass-bottle-03",
    name: "Perfume Flacon",
    category: "fragrance",
    material: "glass",
    shape: "bottles",
    primaryImage: "/placeholder.svg",
    hoverImage: "/placeholder.svg",
  },
  {
    id: "plastic-jar-01",
    name: "Wide-Mouth Jar",
    category: "haircare",
    material: "plastic",
    shape: "jars",
    primaryImage: "/placeholder.svg",
    hoverImage: "/placeholder.svg",
  },
];
