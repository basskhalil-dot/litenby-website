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
    primaryImage: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
  },
  {
    id: "glass-bottle-02",
    name: "Frosted Serum Vial",
    category: "serum",
    material: "glass",
    shape: "bottles",
    primaryImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80",
  },
  {
    id: "glass-jar-01",
    name: "Clear Cream Jar",
    category: "moisturizer",
    material: "glass",
    shape: "jars",
    primaryImage: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1570194065650-d99fb4ee0eda?w=800&q=80",
  },
  {
    id: "carton-box-01",
    name: "Matte Black Box",
    category: "packaging",
    material: "carton",
    shape: "boxes",
    primaryImage: "https://images.unsplash.com/photo-1636622433525-3bbb87a206da?w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&q=80",
  },
  {
    id: "carton-box-02",
    name: "Kraft Tuck-End Box",
    category: "packaging",
    material: "carton",
    shape: "boxes",
    primaryImage: "https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524g6?w=800&q=80",
  },
  {
    id: "plastic-tube-01",
    name: "Squeeze Tube 100ml",
    category: "bodycare",
    material: "plastic",
    shape: "tubes",
    primaryImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80",
  },
  {
    id: "bag-pouch-01",
    name: "Stand-Up Pouch",
    category: "refill",
    material: "bags",
    shape: "bags",
    primaryImage: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1556740758-90de940a6ed6?w=800&q=80",
  },
  {
    id: "glass-bottle-03",
    name: "Perfume Flacon",
    category: "fragrance",
    material: "glass",
    shape: "bottles",
    primaryImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80",
  },
  {
    id: "plastic-jar-01",
    name: "Wide-Mouth Jar",
    category: "haircare",
    material: "plastic",
    shape: "jars",
    primaryImage: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
  },
];
