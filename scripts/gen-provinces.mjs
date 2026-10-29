import fs from 'fs';

const text = fs.readFileSync('src/data/turkeyPaths.ts', 'utf8');
const match = text.match(/turkeyProvincePaths: MapProvincePath\[\] = (\[[\s\S]*\]);/);
const paths = JSON.parse(match[1]);

const regionLists = {
  Marmara: [
    'İstanbul',
    'Tekirdağ',
    'Edirne',
    'Kırklareli',
    'Balıkesir',
    'Çanakkale',
    'Bursa',
    'Bilecik',
    'Kocaeli',
    'Sakarya',
    'Yalova',
  ],
  Ege: ['İzmir', 'Manisa', 'Aydın', 'Denizli', 'Muğla', 'Afyon', 'Kütahya', 'Uşak'],
  Akdeniz: [
    'Antalya',
    'Mersin',
    'Adana',
    'Hatay',
    'Osmaniye',
    'Kahramanmaraş',
    'Isparta',
    'Burdur',
  ],
  'İç Anadolu': [
    'Ankara',
    'Konya',
    'Kayseri',
    'Sivas',
    'Eskişehir',
    'Aksaray',
    'Niğde',
    'Nevşehir',
    'Kırşehir',
    'Kırıkkale',
    'Çankırı',
    'Yozgat',
    'Karaman',
  ],
  Karadeniz: [
    'Zonguldak',
    'Bartın',
    'Karabük',
    'Kastamonu',
    'Sinop',
    'Samsun',
    'Amasya',
    'Tokat',
    'Çorum',
    'Ordu',
    'Giresun',
    'Trabzon',
    'Rize',
    'Artvin',
    'Gümüşhane',
    'Bayburt',
    'Bolu',
    'Düzce',
  ],
  'Doğu Anadolu': [
    'Erzurum',
    'Erzincan',
    'Ağrı',
    'Kars',
    'Iğdır',
    'Ardahan',
    'Malatya',
    'Elazığ',
    'Tunceli',
    'Bingöl',
    'Muş',
    'Bitlis',
    'Van',
    'Hakkari',
  ],
  'Güneydoğu Anadolu': [
    'Gaziantep',
    'Adıyaman',
    'Kilis',
    'Şanlıurfa',
    'Diyarbakır',
    'Mardin',
    'Batman',
    'Siirt',
    'Şırnak',
  ],
};

// GeoJSON uses "Rize" spelling issue in display; match by plate 53 = Rize
regionLists.Karadeniz = regionLists.Karadeniz.filter((n) => n !== 'Rory');

const climateByRegion = {
  Marmara: {
    koppen: 'Csa / Cfb',
    rainfallMm: '600–900',
    tempC: '13–16',
    frostRisk: 'Orta',
    elevationM: '0–800',
    soilMoisture: 'Orta nem, geçiş iklimi',
    irrigation: 'Yaz destek sulaması',
    strategy: 'Mevsimsel nem dalgalanmasına dayanıklı, çok katmanlı bitki seçimi.',
  },
  Ege: {
    koppen: 'Csa',
    rainfallMm: '500–800',
    tempC: '15–18',
    frostRisk: 'Düşük',
    elevationM: '0–1200',
    soilMoisture: 'Yaz kurak, kış nemli',
    irrigation: 'Yaz yoğun sulama',
    strategy: 'Kuraklığa uyumlu, Akdeniz formları ve gölge/su dengesi.',
  },
  Akdeniz: {
    koppen: 'Csa',
    rainfallMm: '400–1100',
    tempC: '16–20',
    frostRisk: 'Düşük',
    elevationM: '0–1500',
    soilMoisture: 'Kıyıda kurak yaz, yaylada serin',
    irrigation: 'Yaz damla sulama',
    strategy: 'Evergreen omurga + kurak peyzaj paleti.',
  },
  'İç Anadolu': {
    koppen: 'BSk / Dsb',
    rainfallMm: '300–500',
    tempC: '10–13',
    frostRisk: 'Yüksek',
    elevationM: '800–1500',
    soilMoisture: 'Kurak step, düşük nem',
    irrigation: 'Zorunlu destek sulama',
    strategy: 'Don dayanımlı, düşük su isteyen step ve xeriscape türleri.',
  },
  Karadeniz: {
    koppen: 'Cfb / Cfa',
    rainfallMm: '800–2200',
    tempC: '12–15',
    frostRisk: 'Orta',
    elevationM: '0–2000',
    soilMoisture: 'Yüksek nem, asidik eğilim',
    irrigation: 'Genelde düşük',
    strategy: 'Nem seven, asit seven ve gölge toleranslı katmanlı bitkilendirme.',
  },
  'Doğu Anadolu': {
    koppen: 'Dsb / Dfb',
    rainfallMm: '400–700',
    tempC: '4–10',
    frostRisk: 'Yüksek',
    elevationM: '1200–2500',
    soilMoisture: 'Kısa vejetasyon, karlı kış',
    irrigation: 'Yaz kısa pencere sulama',
    strategy: 'Sert kışa dayanıklı türler ve rüzgar koruması.',
  },
  'Güneydoğu Anadolu': {
    koppen: 'BSh / Csa',
    rainfallMm: '300–700',
    tempC: '15–20',
    frostRisk: 'Orta',
    elevationM: '400–1200',
    soilMoisture: 'Yaz çok kurak',
    irrigation: 'Yoğun yaz sulama',
    strategy: 'Sıcak-kurak dayanımlı, gölge ve su verimli peyzaj.',
  },
};

const nameToRegion = {};
for (const [region, names] of Object.entries(regionLists)) {
  for (const name of names) nameToRegion[name] = region;
}

nameToRegion['Afyon'] = 'Ege';
nameToRegion['Afyonkarahisar'] = 'Ege';
nameToRegion['Hakkari'] = 'Doğu Anadolu';

const displayName = {};

const missing = [];
const provinces = paths.map((p) => {
  let region = nameToRegion[p.name];
  // plate 53 = Rize
  if (p.number === 53) region = 'Karadeniz';
  if (!region) {
    missing.push(`${p.number}:${p.name}`);
    region = 'İç Anadolu';
  }
  const c = climateByRegion[region];
  const name =
    p.number === 53 ? 'Rory'.replace('Rory', 'Rize') : displayName[p.name] || p.name;
  // Force Rize correctly
  const finalName = p.number === 53 ? String.fromCharCode(82, 105, 122, 101) : name;

  return {
    id: p.id,
    name: finalName,
    number: p.number,
    region,
    climate: {
      koppen: c.koppen,
      rainfallMm: c.rainfallMm,
      tempC: c.tempC,
      frostRisk: c.frostRisk,
      elevationM: c.elevationM,
    },
    landscape: {
      soilMoisture: c.soilMoisture,
      irrigation: c.irrigation,
      strategy: c.strategy,
    },
  };
});

// Also fix turkeyPaths display name for Rize
const fixedPaths = paths.map((p) =>
  p.number === 53 ? { ...p, name: String.fromCharCode(82, 105, 122, 101) } : p
);
fs.writeFileSync(
  'src/data/turkeyPaths.ts',
  `export const MAP_VIEWBOX = ${JSON.stringify(
    text.match(/MAP_VIEWBOX = "([^"]+)"/)[1]
  )};\n\nexport type MapProvincePath = { id: string; name: string; number: number; d: string };\n\nexport const turkeyProvincePaths: MapProvincePath[] = ${JSON.stringify(
    fixedPaths,
    null,
    2
  )};\n`
);

const out = `import type { Province } from '../types/province';

export const provinces: Province[] = ${JSON.stringify(provinces, null, 2)};

export const provincesById: Record<string, Province> = Object.fromEntries(
  provinces.map((p) => [p.id, p]),
);
`;

fs.writeFileSync('src/data/provinces.ts', out);
console.log('Wrote', provinces.length, 'provinces; missing', missing);
console.log('53=', provinces.find((p) => p.number === 53).name);
