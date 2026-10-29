# PeyzArch

Peyzaj mimarlığı öğrencileri ve uygulayıcıları için il bazlı bitki arşivi.  
Coğrafi giriş modeli [TÜBİVES](https://doi.org/10.1109/hibit.2011.6450823) yaklaşımından esinlenir; odak iklim, yetişme ve peyzaj kullanımıdır.

## Çalıştırma

```bash
npm install
npm start
```

Lokal geliştirme her zaman **8082** portunda çalışır (`http://localhost:8082`).

- Web: `npm run web`
- iOS / Android: Expo Go veya EAS development build

## Stack

- Expo + Expo Router + TypeScript
- `react-native-svg` (81 illik dilsiz Türkiye haritası)
- Statik veri: `src/data/` (provinces, plants)

## Cross-platform yayın

| Hedef | Yol |
|-------|-----|
| Tarayıcı | `npx expo export --platform web` |
| Mobil | `eas build` (`eas.json`) |
| Masaüstü (Faz 2) | Web export → Tauri sarmalayıcı |

## Veri

Erzurum / Doğu Anadolu bitki arşivi: `src/data/archivePlants.ts` (62 tür, çoklu internet görselleri).  
İçe aktarım: `node scripts/import-archive.mjs` (önce `scripts/_cleaned-archive.json`).

### Dinamik çevre API’leri

İl seçilince il merkezi koordinatından:

- **Open-Meteo** — sıcaklık, nem, yağış, güneşlenme, rüzgar yönü/hız, yükselti
- **ISRIC SoilGrids** — pH, organik karbon, kil/kum (0–5 cm)

Kod: `src/api/`, hook: `src/hooks/useProvinceEnvironment.ts`. Sonuçlar 30 dk bellek önbelleğinde tutulur.
