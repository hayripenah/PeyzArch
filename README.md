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

Asıl arşiv dokümanı gelene kadar `src/data/plants.ts` test kayıtları içerir. Şema sabit kalır; içerik değiştirilir.
