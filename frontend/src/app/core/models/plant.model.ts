export interface Plant {
  id: number;
  name: string;
  scientificName: string;
  system: string[];
  description: string;
  medicinalUses: string[];
  partUsed: string[];
  cultivationInfo: string;
  image: string;
  modelUrl: string; // URL to the 3D model file
}