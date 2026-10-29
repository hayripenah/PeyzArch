export type ArchivePlant = {
  id: string;
  nameTr: string;
  nameLa: string;
  plantType: string;
  heightM: string;
  crownDiameterM: string;
  formAndSize: string;
  foliageStatus: string;
  leafCharacter: string;
  flowerAndFruit: string;
  landscapeUse: string;
  ecologicalTolerance: string;
  costArchitecture: string;
  images: string[];
  image: string;
  region: string;
  city: string;
  provinces: string[];
  endemic: boolean;
};

export type RegionArchive = {
  region: string;
  city: string;
  provinceId: string;
  climateData: {
    general_character: string;
    features: string[];
  };
  soilStructure: {
    general_character: string;
    features: string[];
  };
  plants: ArchivePlant[];
};

/** Eski test şeması — geriye dönük uyumluluk */
export type Plant = {
  id: string;
  nameTr: string;
  nameLa: string;
  family: string;
  image: string;
  habit: string;
  habitat: string;
  heightM: string;
  light: string;
  water: string;
  hardiness: string;
  endemic: boolean;
  provinces: string[];
  uses: string;
  description: string;
};
