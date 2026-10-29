export type Region =
  | 'Marmara'
  | 'Ege'
  | 'Akdeniz'
  | 'İç Anadolu'
  | 'Karadeniz'
  | 'Doğu Anadolu'
  | 'Güneydoğu Anadolu';

export type Province = {
  id: string;
  name: string;
  number: number;
  region: Region;
  climate: {
    koppen: string;
    rainfallMm: string;
    tempC: string;
    frostRisk: 'Düşük' | 'Orta' | 'Yüksek';
    elevationM: string;
  };
  landscape: {
    soilMoisture: string;
    irrigation: string;
    strategy: string;
  };
};
