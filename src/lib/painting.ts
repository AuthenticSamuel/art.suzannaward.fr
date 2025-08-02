import type { Painting } from "@/types";

export const categoryMappings: Record<Painting["category"], string> = {
  animaux: "Animaux",
  couple: "Couple",
  famille: "Famille",
  mystere: "Mystère",
  noel: "Noël",
  "pas-a-vendre": "Pas en vente",
  paysage: "Paysage",
  sensualite: "Sensualité",
  zen: "Zen",
};

export const getCategory = (painting: Painting) => {
  return categoryMappings[painting.category];
};

export const techniqueMappings: Record<Painting["technique"], string> = {
  "crayons-graphite": "Crayons graphite",
  "huile-sur-toile": "Huile sur toile",
  numerique: "Numérique",
  pastel: "Pastel",
  "peinture-acrylique": "Peinture acrylique",
};

export const getTechnique = (painting: Painting) => {
  return techniqueMappings[painting.technique];
};
