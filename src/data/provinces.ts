import type { Province } from '../types/province';

export const provinces: Province[] = [
  {
    "id": "01",
    "name": "Adana",
    "number": 1,
    "region": "Akdeniz",
    "climate": {
      "koppen": "Csa",
      "rainfallMm": "400–1100",
      "tempC": "16–20",
      "frostRisk": "Düşük",
      "elevationM": "0–1500"
    },
    "landscape": {
      "soilMoisture": "Kıyıda kurak yaz, yaylada serin",
      "irrigation": "Yaz damla sulama",
      "strategy": "Evergreen omurga + kurak peyzaj paleti."
    }
  },
  {
    "id": "02",
    "name": "Adıyaman",
    "number": 2,
    "region": "Güneydoğu Anadolu",
    "climate": {
      "koppen": "BSh / Csa",
      "rainfallMm": "300–700",
      "tempC": "15–20",
      "frostRisk": "Orta",
      "elevationM": "400–1200"
    },
    "landscape": {
      "soilMoisture": "Yaz çok kurak",
      "irrigation": "Yoğun yaz sulama",
      "strategy": "Sıcak-kurak dayanımlı, gölge ve su verimli peyzaj."
    }
  },
  {
    "id": "03",
    "name": "Afyonkarahisar",
    "number": 3,
    "region": "Ege",
    "climate": {
      "koppen": "Csa",
      "rainfallMm": "500–800",
      "tempC": "15–18",
      "frostRisk": "Düşük",
      "elevationM": "0–1200"
    },
    "landscape": {
      "soilMoisture": "Yaz kurak, kış nemli",
      "irrigation": "Yaz yoğun sulama",
      "strategy": "Kuraklığa uyumlu, Akdeniz formları ve gölge/su dengesi."
    }
  },
  {
    "id": "04",
    "name": "Ağrı",
    "number": 4,
    "region": "Doğu Anadolu",
    "climate": {
      "koppen": "Dsb / Dfb",
      "rainfallMm": "400–700",
      "tempC": "4–10",
      "frostRisk": "Yüksek",
      "elevationM": "1200–2500"
    },
    "landscape": {
      "soilMoisture": "Kısa vejetasyon, karlı kış",
      "irrigation": "Yaz kısa pencere sulama",
      "strategy": "Sert kışa dayanıklı türler ve rüzgar koruması."
    }
  },
  {
    "id": "05",
    "name": "Amasya",
    "number": 5,
    "region": "Karadeniz",
    "climate": {
      "koppen": "Cfb / Cfa",
      "rainfallMm": "800–2200",
      "tempC": "12–15",
      "frostRisk": "Orta",
      "elevationM": "0–2000"
    },
    "landscape": {
      "soilMoisture": "Yüksek nem, asidik eğilim",
      "irrigation": "Genelde düşük",
      "strategy": "Nem seven, asit seven ve gölge toleranslı katmanlı bitkilendirme."
    }
  },
  {
    "id": "06",
    "name": "Ankara",
    "number": 6,
    "region": "İç Anadolu",
    "climate": {
      "koppen": "BSk / Dsb",
      "rainfallMm": "300–500",
      "tempC": "10–13",
      "frostRisk": "Yüksek",
      "elevationM": "800–1500"
    },
    "landscape": {
      "soilMoisture": "Kurak step, düşük nem",
      "irrigation": "Zorunlu destek sulama",
      "strategy": "Don dayanımlı, düşük su isteyen step ve xeriscape türleri."
    }
  },
  {
    "id": "07",
    "name": "Antalya",
    "number": 7,
    "region": "Akdeniz",
    "climate": {
      "koppen": "Csa",
      "rainfallMm": "400–1100",
      "tempC": "16–20",
      "frostRisk": "Düşük",
      "elevationM": "0–1500"
    },
    "landscape": {
      "soilMoisture": "Kıyıda kurak yaz, yaylada serin",
      "irrigation": "Yaz damla sulama",
      "strategy": "Evergreen omurga + kurak peyzaj paleti."
    }
  },
  {
    "id": "08",
    "name": "Artvin",
    "number": 8,
    "region": "Karadeniz",
    "climate": {
      "koppen": "Cfb / Cfa",
      "rainfallMm": "800–2200",
      "tempC": "12–15",
      "frostRisk": "Orta",
      "elevationM": "0–2000"
    },
    "landscape": {
      "soilMoisture": "Yüksek nem, asidik eğilim",
      "irrigation": "Genelde düşük",
      "strategy": "Nem seven, asit seven ve gölge toleranslı katmanlı bitkilendirme."
    }
  },
  {
    "id": "09",
    "name": "Aydın",
    "number": 9,
    "region": "Ege",
    "climate": {
      "koppen": "Csa",
      "rainfallMm": "500–800",
      "tempC": "15–18",
      "frostRisk": "Düşük",
      "elevationM": "0–1200"
    },
    "landscape": {
      "soilMoisture": "Yaz kurak, kış nemli",
      "irrigation": "Yaz yoğun sulama",
      "strategy": "Kuraklığa uyumlu, Akdeniz formları ve gölge/su dengesi."
    }
  },
  {
    "id": "10",
    "name": "Balıkesir",
    "number": 10,
    "region": "Marmara",
    "climate": {
      "koppen": "Csa / Cfb",
      "rainfallMm": "600–900",
      "tempC": "13–16",
      "frostRisk": "Orta",
      "elevationM": "0–800"
    },
    "landscape": {
      "soilMoisture": "Orta nem, geçiş iklimi",
      "irrigation": "Yaz destek sulaması",
      "strategy": "Mevsimsel nem dalgalanmasına dayanıklı, çok katmanlı bitki seçimi."
    }
  },
  {
    "id": "11",
    "name": "Bilecik",
    "number": 11,
    "region": "Marmara",
    "climate": {
      "koppen": "Csa / Cfb",
      "rainfallMm": "600–900",
      "tempC": "13–16",
      "frostRisk": "Orta",
      "elevationM": "0–800"
    },
    "landscape": {
      "soilMoisture": "Orta nem, geçiş iklimi",
      "irrigation": "Yaz destek sulaması",
      "strategy": "Mevsimsel nem dalgalanmasına dayanıklı, çok katmanlı bitki seçimi."
    }
  },
  {
    "id": "12",
    "name": "Bingöl",
    "number": 12,
    "region": "Doğu Anadolu",
    "climate": {
      "koppen": "Dsb / Dfb",
      "rainfallMm": "400–700",
      "tempC": "4–10",
      "frostRisk": "Yüksek",
      "elevationM": "1200–2500"
    },
    "landscape": {
      "soilMoisture": "Kısa vejetasyon, karlı kış",
      "irrigation": "Yaz kısa pencere sulama",
      "strategy": "Sert kışa dayanıklı türler ve rüzgar koruması."
    }
  },
  {
    "id": "13",
    "name": "Bitlis",
    "number": 13,
    "region": "Doğu Anadolu",
    "climate": {
      "koppen": "Dsb / Dfb",
      "rainfallMm": "400–700",
      "tempC": "4–10",
      "frostRisk": "Yüksek",
      "elevationM": "1200–2500"
    },
    "landscape": {
      "soilMoisture": "Kısa vejetasyon, karlı kış",
      "irrigation": "Yaz kısa pencere sulama",
      "strategy": "Sert kışa dayanıklı türler ve rüzgar koruması."
    }
  },
  {
    "id": "14",
    "name": "Bolu",
    "number": 14,
    "region": "Karadeniz",
    "climate": {
      "koppen": "Cfb / Cfa",
      "rainfallMm": "800–2200",
      "tempC": "12–15",
      "frostRisk": "Orta",
      "elevationM": "0–2000"
    },
    "landscape": {
      "soilMoisture": "Yüksek nem, asidik eğilim",
      "irrigation": "Genelde düşük",
      "strategy": "Nem seven, asit seven ve gölge toleranslı katmanlı bitkilendirme."
    }
  },
  {
    "id": "15",
    "name": "Burdur",
    "number": 15,
    "region": "Akdeniz",
    "climate": {
      "koppen": "Csa",
      "rainfallMm": "400–1100",
      "tempC": "16–20",
      "frostRisk": "Düşük",
      "elevationM": "0–1500"
    },
    "landscape": {
      "soilMoisture": "Kıyıda kurak yaz, yaylada serin",
      "irrigation": "Yaz damla sulama",
      "strategy": "Evergreen omurga + kurak peyzaj paleti."
    }
  },
  {
    "id": "16",
    "name": "Bursa",
    "number": 16,
    "region": "Marmara",
    "climate": {
      "koppen": "Csa / Cfb",
      "rainfallMm": "600–900",
      "tempC": "13–16",
      "frostRisk": "Orta",
      "elevationM": "0–800"
    },
    "landscape": {
      "soilMoisture": "Orta nem, geçiş iklimi",
      "irrigation": "Yaz destek sulaması",
      "strategy": "Mevsimsel nem dalgalanmasına dayanıklı, çok katmanlı bitki seçimi."
    }
  },
  {
    "id": "17",
    "name": "Çanakkale",
    "number": 17,
    "region": "Marmara",
    "climate": {
      "koppen": "Csa / Cfb",
      "rainfallMm": "600–900",
      "tempC": "13–16",
      "frostRisk": "Orta",
      "elevationM": "0–800"
    },
    "landscape": {
      "soilMoisture": "Orta nem, geçiş iklimi",
      "irrigation": "Yaz destek sulaması",
      "strategy": "Mevsimsel nem dalgalanmasına dayanıklı, çok katmanlı bitki seçimi."
    }
  },
  {
    "id": "18",
    "name": "Çankırı",
    "number": 18,
    "region": "İç Anadolu",
    "climate": {
      "koppen": "BSk / Dsb",
      "rainfallMm": "300–500",
      "tempC": "10–13",
      "frostRisk": "Yüksek",
      "elevationM": "800–1500"
    },
    "landscape": {
      "soilMoisture": "Kurak step, düşük nem",
      "irrigation": "Zorunlu destek sulama",
      "strategy": "Don dayanımlı, düşük su isteyen step ve xeriscape türleri."
    }
  },
  {
    "id": "19",
    "name": "Çorum",
    "number": 19,
    "region": "Karadeniz",
    "climate": {
      "koppen": "Cfb / Cfa",
      "rainfallMm": "800–2200",
      "tempC": "12–15",
      "frostRisk": "Orta",
      "elevationM": "0–2000"
    },
    "landscape": {
      "soilMoisture": "Yüksek nem, asidik eğilim",
      "irrigation": "Genelde düşük",
      "strategy": "Nem seven, asit seven ve gölge toleranslı katmanlı bitkilendirme."
    }
  },
  {
    "id": "20",
    "name": "Denizli",
    "number": 20,
    "region": "Ege",
    "climate": {
      "koppen": "Csa",
      "rainfallMm": "500–800",
      "tempC": "15–18",
      "frostRisk": "Düşük",
      "elevationM": "0–1200"
    },
    "landscape": {
      "soilMoisture": "Yaz kurak, kış nemli",
      "irrigation": "Yaz yoğun sulama",
      "strategy": "Kuraklığa uyumlu, Akdeniz formları ve gölge/su dengesi."
    }
  },
  {
    "id": "21",
    "name": "Diyarbakır",
    "number": 21,
    "region": "Güneydoğu Anadolu",
    "climate": {
      "koppen": "BSh / Csa",
      "rainfallMm": "300–700",
      "tempC": "15–20",
      "frostRisk": "Orta",
      "elevationM": "400–1200"
    },
    "landscape": {
      "soilMoisture": "Yaz çok kurak",
      "irrigation": "Yoğun yaz sulama",
      "strategy": "Sıcak-kurak dayanımlı, gölge ve su verimli peyzaj."
    }
  },
  {
    "id": "22",
    "name": "Edirne",
    "number": 22,
    "region": "Marmara",
    "climate": {
      "koppen": "Csa / Cfb",
      "rainfallMm": "600–900",
      "tempC": "13–16",
      "frostRisk": "Orta",
      "elevationM": "0–800"
    },
    "landscape": {
      "soilMoisture": "Orta nem, geçiş iklimi",
      "irrigation": "Yaz destek sulaması",
      "strategy": "Mevsimsel nem dalgalanmasına dayanıklı, çok katmanlı bitki seçimi."
    }
  },
  {
    "id": "23",
    "name": "Elazığ",
    "number": 23,
    "region": "Doğu Anadolu",
    "climate": {
      "koppen": "Dsb / Dfb",
      "rainfallMm": "400–700",
      "tempC": "4–10",
      "frostRisk": "Yüksek",
      "elevationM": "1200–2500"
    },
    "landscape": {
      "soilMoisture": "Kısa vejetasyon, karlı kış",
      "irrigation": "Yaz kısa pencere sulama",
      "strategy": "Sert kışa dayanıklı türler ve rüzgar koruması."
    }
  },
  {
    "id": "24",
    "name": "Erzincan",
    "number": 24,
    "region": "Doğu Anadolu",
    "climate": {
      "koppen": "Dsb / Dfb",
      "rainfallMm": "400–700",
      "tempC": "4–10",
      "frostRisk": "Yüksek",
      "elevationM": "1200–2500"
    },
    "landscape": {
      "soilMoisture": "Kısa vejetasyon, karlı kış",
      "irrigation": "Yaz kısa pencere sulama",
      "strategy": "Sert kışa dayanıklı türler ve rüzgar koruması."
    }
  },
  {
    "id": "25",
    "name": "Erzurum",
    "number": 25,
    "region": "Doğu Anadolu",
    "climate": {
      "koppen": "Dsb / Dfb",
      "rainfallMm": "400–700",
      "tempC": "4–10",
      "frostRisk": "Yüksek",
      "elevationM": "1200–2500"
    },
    "landscape": {
      "soilMoisture": "Kısa vejetasyon, karlı kış",
      "irrigation": "Yaz kısa pencere sulama",
      "strategy": "Sert kışa dayanıklı türler ve rüzgar koruması."
    }
  },
  {
    "id": "26",
    "name": "Eskişehir",
    "number": 26,
    "region": "İç Anadolu",
    "climate": {
      "koppen": "BSk / Dsb",
      "rainfallMm": "300–500",
      "tempC": "10–13",
      "frostRisk": "Yüksek",
      "elevationM": "800–1500"
    },
    "landscape": {
      "soilMoisture": "Kurak step, düşük nem",
      "irrigation": "Zorunlu destek sulama",
      "strategy": "Don dayanımlı, düşük su isteyen step ve xeriscape türleri."
    }
  },
  {
    "id": "27",
    "name": "Gaziantep",
    "number": 27,
    "region": "Güneydoğu Anadolu",
    "climate": {
      "koppen": "BSh / Csa",
      "rainfallMm": "300–700",
      "tempC": "15–20",
      "frostRisk": "Orta",
      "elevationM": "400–1200"
    },
    "landscape": {
      "soilMoisture": "Yaz çok kurak",
      "irrigation": "Yoğun yaz sulama",
      "strategy": "Sıcak-kurak dayanımlı, gölge ve su verimli peyzaj."
    }
  },
  {
    "id": "28",
    "name": "Giresun",
    "number": 28,
    "region": "Karadeniz",
    "climate": {
      "koppen": "Cfb / Cfa",
      "rainfallMm": "800–2200",
      "tempC": "12–15",
      "frostRisk": "Orta",
      "elevationM": "0–2000"
    },
    "landscape": {
      "soilMoisture": "Yüksek nem, asidik eğilim",
      "irrigation": "Genelde düşük",
      "strategy": "Nem seven, asit seven ve gölge toleranslı katmanlı bitkilendirme."
    }
  },
  {
    "id": "29",
    "name": "Gümüşhane",
    "number": 29,
    "region": "Karadeniz",
    "climate": {
      "koppen": "Cfb / Cfa",
      "rainfallMm": "800–2200",
      "tempC": "12–15",
      "frostRisk": "Orta",
      "elevationM": "0–2000"
    },
    "landscape": {
      "soilMoisture": "Yüksek nem, asidik eğilim",
      "irrigation": "Genelde düşük",
      "strategy": "Nem seven, asit seven ve gölge toleranslı katmanlı bitkilendirme."
    }
  },
  {
    "id": "30",
    "name": "Hakkari",
    "number": 30,
    "region": "Doğu Anadolu",
    "climate": {
      "koppen": "Dsb / Dfb",
      "rainfallMm": "400–700",
      "tempC": "4–10",
      "frostRisk": "Yüksek",
      "elevationM": "1200–2500"
    },
    "landscape": {
      "soilMoisture": "Kısa vejetasyon, karlı kış",
      "irrigation": "Yaz kısa pencere sulama",
      "strategy": "Sert kışa dayanıklı türler ve rüzgar koruması."
    }
  },
  {
    "id": "31",
    "name": "Hatay",
    "number": 31,
    "region": "Akdeniz",
    "climate": {
      "koppen": "Csa",
      "rainfallMm": "400–1100",
      "tempC": "16–20",
      "frostRisk": "Düşük",
      "elevationM": "0–1500"
    },
    "landscape": {
      "soilMoisture": "Kıyıda kurak yaz, yaylada serin",
      "irrigation": "Yaz damla sulama",
      "strategy": "Evergreen omurga + kurak peyzaj paleti."
    }
  },
  {
    "id": "32",
    "name": "Isparta",
    "number": 32,
    "region": "Akdeniz",
    "climate": {
      "koppen": "Csa",
      "rainfallMm": "400–1100",
      "tempC": "16–20",
      "frostRisk": "Düşük",
      "elevationM": "0–1500"
    },
    "landscape": {
      "soilMoisture": "Kıyıda kurak yaz, yaylada serin",
      "irrigation": "Yaz damla sulama",
      "strategy": "Evergreen omurga + kurak peyzaj paleti."
    }
  },
  {
    "id": "33",
    "name": "Mersin",
    "number": 33,
    "region": "Akdeniz",
    "climate": {
      "koppen": "Csa",
      "rainfallMm": "400–1100",
      "tempC": "16–20",
      "frostRisk": "Düşük",
      "elevationM": "0–1500"
    },
    "landscape": {
      "soilMoisture": "Kıyıda kurak yaz, yaylada serin",
      "irrigation": "Yaz damla sulama",
      "strategy": "Evergreen omurga + kurak peyzaj paleti."
    }
  },
  {
    "id": "34",
    "name": "İstanbul",
    "number": 34,
    "region": "Marmara",
    "climate": {
      "koppen": "Csa / Cfb",
      "rainfallMm": "600–900",
      "tempC": "13–16",
      "frostRisk": "Orta",
      "elevationM": "0–800"
    },
    "landscape": {
      "soilMoisture": "Orta nem, geçiş iklimi",
      "irrigation": "Yaz destek sulaması",
      "strategy": "Mevsimsel nem dalgalanmasına dayanıklı, çok katmanlı bitki seçimi."
    }
  },
  {
    "id": "35",
    "name": "İzmir",
    "number": 35,
    "region": "Ege",
    "climate": {
      "koppen": "Csa",
      "rainfallMm": "500–800",
      "tempC": "15–18",
      "frostRisk": "Düşük",
      "elevationM": "0–1200"
    },
    "landscape": {
      "soilMoisture": "Yaz kurak, kış nemli",
      "irrigation": "Yaz yoğun sulama",
      "strategy": "Kuraklığa uyumlu, Akdeniz formları ve gölge/su dengesi."
    }
  },
  {
    "id": "36",
    "name": "Kars",
    "number": 36,
    "region": "Doğu Anadolu",
    "climate": {
      "koppen": "Dsb / Dfb",
      "rainfallMm": "400–700",
      "tempC": "4–10",
      "frostRisk": "Yüksek",
      "elevationM": "1200–2500"
    },
    "landscape": {
      "soilMoisture": "Kısa vejetasyon, karlı kış",
      "irrigation": "Yaz kısa pencere sulama",
      "strategy": "Sert kışa dayanıklı türler ve rüzgar koruması."
    }
  },
  {
    "id": "37",
    "name": "Kastamonu",
    "number": 37,
    "region": "Karadeniz",
    "climate": {
      "koppen": "Cfb / Cfa",
      "rainfallMm": "800–2200",
      "tempC": "12–15",
      "frostRisk": "Orta",
      "elevationM": "0–2000"
    },
    "landscape": {
      "soilMoisture": "Yüksek nem, asidik eğilim",
      "irrigation": "Genelde düşük",
      "strategy": "Nem seven, asit seven ve gölge toleranslı katmanlı bitkilendirme."
    }
  },
  {
    "id": "38",
    "name": "Kayseri",
    "number": 38,
    "region": "İç Anadolu",
    "climate": {
      "koppen": "BSk / Dsb",
      "rainfallMm": "300–500",
      "tempC": "10–13",
      "frostRisk": "Yüksek",
      "elevationM": "800–1500"
    },
    "landscape": {
      "soilMoisture": "Kurak step, düşük nem",
      "irrigation": "Zorunlu destek sulama",
      "strategy": "Don dayanımlı, düşük su isteyen step ve xeriscape türleri."
    }
  },
  {
    "id": "39",
    "name": "Kırklareli",
    "number": 39,
    "region": "Marmara",
    "climate": {
      "koppen": "Csa / Cfb",
      "rainfallMm": "600–900",
      "tempC": "13–16",
      "frostRisk": "Orta",
      "elevationM": "0–800"
    },
    "landscape": {
      "soilMoisture": "Orta nem, geçiş iklimi",
      "irrigation": "Yaz destek sulaması",
      "strategy": "Mevsimsel nem dalgalanmasına dayanıklı, çok katmanlı bitki seçimi."
    }
  },
  {
    "id": "40",
    "name": "Kırşehir",
    "number": 40,
    "region": "İç Anadolu",
    "climate": {
      "koppen": "BSk / Dsb",
      "rainfallMm": "300–500",
      "tempC": "10–13",
      "frostRisk": "Yüksek",
      "elevationM": "800–1500"
    },
    "landscape": {
      "soilMoisture": "Kurak step, düşük nem",
      "irrigation": "Zorunlu destek sulama",
      "strategy": "Don dayanımlı, düşük su isteyen step ve xeriscape türleri."
    }
  },
  {
    "id": "41",
    "name": "Kocaeli",
    "number": 41,
    "region": "Marmara",
    "climate": {
      "koppen": "Csa / Cfb",
      "rainfallMm": "600–900",
      "tempC": "13–16",
      "frostRisk": "Orta",
      "elevationM": "0–800"
    },
    "landscape": {
      "soilMoisture": "Orta nem, geçiş iklimi",
      "irrigation": "Yaz destek sulaması",
      "strategy": "Mevsimsel nem dalgalanmasına dayanıklı, çok katmanlı bitki seçimi."
    }
  },
  {
    "id": "42",
    "name": "Konya",
    "number": 42,
    "region": "İç Anadolu",
    "climate": {
      "koppen": "BSk / Dsb",
      "rainfallMm": "300–500",
      "tempC": "10–13",
      "frostRisk": "Yüksek",
      "elevationM": "800–1500"
    },
    "landscape": {
      "soilMoisture": "Kurak step, düşük nem",
      "irrigation": "Zorunlu destek sulama",
      "strategy": "Don dayanımlı, düşük su isteyen step ve xeriscape türleri."
    }
  },
  {
    "id": "43",
    "name": "Kütahya",
    "number": 43,
    "region": "Ege",
    "climate": {
      "koppen": "Csa",
      "rainfallMm": "500–800",
      "tempC": "15–18",
      "frostRisk": "Düşük",
      "elevationM": "0–1200"
    },
    "landscape": {
      "soilMoisture": "Yaz kurak, kış nemli",
      "irrigation": "Yaz yoğun sulama",
      "strategy": "Kuraklığa uyumlu, Akdeniz formları ve gölge/su dengesi."
    }
  },
  {
    "id": "44",
    "name": "Malatya",
    "number": 44,
    "region": "Doğu Anadolu",
    "climate": {
      "koppen": "Dsb / Dfb",
      "rainfallMm": "400–700",
      "tempC": "4–10",
      "frostRisk": "Yüksek",
      "elevationM": "1200–2500"
    },
    "landscape": {
      "soilMoisture": "Kısa vejetasyon, karlı kış",
      "irrigation": "Yaz kısa pencere sulama",
      "strategy": "Sert kışa dayanıklı türler ve rüzgar koruması."
    }
  },
  {
    "id": "45",
    "name": "Manisa",
    "number": 45,
    "region": "Ege",
    "climate": {
      "koppen": "Csa",
      "rainfallMm": "500–800",
      "tempC": "15–18",
      "frostRisk": "Düşük",
      "elevationM": "0–1200"
    },
    "landscape": {
      "soilMoisture": "Yaz kurak, kış nemli",
      "irrigation": "Yaz yoğun sulama",
      "strategy": "Kuraklığa uyumlu, Akdeniz formları ve gölge/su dengesi."
    }
  },
  {
    "id": "46",
    "name": "Kahramanmaraş",
    "number": 46,
    "region": "Akdeniz",
    "climate": {
      "koppen": "Csa",
      "rainfallMm": "400–1100",
      "tempC": "16–20",
      "frostRisk": "Düşük",
      "elevationM": "0–1500"
    },
    "landscape": {
      "soilMoisture": "Kıyıda kurak yaz, yaylada serin",
      "irrigation": "Yaz damla sulama",
      "strategy": "Evergreen omurga + kurak peyzaj paleti."
    }
  },
  {
    "id": "47",
    "name": "Mardin",
    "number": 47,
    "region": "Güneydoğu Anadolu",
    "climate": {
      "koppen": "BSh / Csa",
      "rainfallMm": "300–700",
      "tempC": "15–20",
      "frostRisk": "Orta",
      "elevationM": "400–1200"
    },
    "landscape": {
      "soilMoisture": "Yaz çok kurak",
      "irrigation": "Yoğun yaz sulama",
      "strategy": "Sıcak-kurak dayanımlı, gölge ve su verimli peyzaj."
    }
  },
  {
    "id": "48",
    "name": "Muğla",
    "number": 48,
    "region": "Ege",
    "climate": {
      "koppen": "Csa",
      "rainfallMm": "500–800",
      "tempC": "15–18",
      "frostRisk": "Düşük",
      "elevationM": "0–1200"
    },
    "landscape": {
      "soilMoisture": "Yaz kurak, kış nemli",
      "irrigation": "Yaz yoğun sulama",
      "strategy": "Kuraklığa uyumlu, Akdeniz formları ve gölge/su dengesi."
    }
  },
  {
    "id": "49",
    "name": "Muş",
    "number": 49,
    "region": "Doğu Anadolu",
    "climate": {
      "koppen": "Dsb / Dfb",
      "rainfallMm": "400–700",
      "tempC": "4–10",
      "frostRisk": "Yüksek",
      "elevationM": "1200–2500"
    },
    "landscape": {
      "soilMoisture": "Kısa vejetasyon, karlı kış",
      "irrigation": "Yaz kısa pencere sulama",
      "strategy": "Sert kışa dayanıklı türler ve rüzgar koruması."
    }
  },
  {
    "id": "50",
    "name": "Nevşehir",
    "number": 50,
    "region": "İç Anadolu",
    "climate": {
      "koppen": "BSk / Dsb",
      "rainfallMm": "300–500",
      "tempC": "10–13",
      "frostRisk": "Yüksek",
      "elevationM": "800–1500"
    },
    "landscape": {
      "soilMoisture": "Kurak step, düşük nem",
      "irrigation": "Zorunlu destek sulama",
      "strategy": "Don dayanımlı, düşük su isteyen step ve xeriscape türleri."
    }
  },
  {
    "id": "51",
    "name": "Niğde",
    "number": 51,
    "region": "İç Anadolu",
    "climate": {
      "koppen": "BSk / Dsb",
      "rainfallMm": "300–500",
      "tempC": "10–13",
      "frostRisk": "Yüksek",
      "elevationM": "800–1500"
    },
    "landscape": {
      "soilMoisture": "Kurak step, düşük nem",
      "irrigation": "Zorunlu destek sulama",
      "strategy": "Don dayanımlı, düşük su isteyen step ve xeriscape türleri."
    }
  },
  {
    "id": "52",
    "name": "Ordu",
    "number": 52,
    "region": "Karadeniz",
    "climate": {
      "koppen": "Cfb / Cfa",
      "rainfallMm": "800–2200",
      "tempC": "12–15",
      "frostRisk": "Orta",
      "elevationM": "0–2000"
    },
    "landscape": {
      "soilMoisture": "Yüksek nem, asidik eğilim",
      "irrigation": "Genelde düşük",
      "strategy": "Nem seven, asit seven ve gölge toleranslı katmanlı bitkilendirme."
    }
  },
  {
    "id": "53",
    "name": "Rize",
    "number": 53,
    "region": "Karadeniz",
    "climate": {
      "koppen": "Cfb / Cfa",
      "rainfallMm": "800–2200",
      "tempC": "12–15",
      "frostRisk": "Orta",
      "elevationM": "0–2000"
    },
    "landscape": {
      "soilMoisture": "Yüksek nem, asidik eğilim",
      "irrigation": "Genelde düşük",
      "strategy": "Nem seven, asit seven ve gölge toleranslı katmanlı bitkilendirme."
    }
  },
  {
    "id": "54",
    "name": "Sakarya",
    "number": 54,
    "region": "Marmara",
    "climate": {
      "koppen": "Csa / Cfb",
      "rainfallMm": "600–900",
      "tempC": "13–16",
      "frostRisk": "Orta",
      "elevationM": "0–800"
    },
    "landscape": {
      "soilMoisture": "Orta nem, geçiş iklimi",
      "irrigation": "Yaz destek sulaması",
      "strategy": "Mevsimsel nem dalgalanmasına dayanıklı, çok katmanlı bitki seçimi."
    }
  },
  {
    "id": "55",
    "name": "Samsun",
    "number": 55,
    "region": "Karadeniz",
    "climate": {
      "koppen": "Cfb / Cfa",
      "rainfallMm": "800–2200",
      "tempC": "12–15",
      "frostRisk": "Orta",
      "elevationM": "0–2000"
    },
    "landscape": {
      "soilMoisture": "Yüksek nem, asidik eğilim",
      "irrigation": "Genelde düşük",
      "strategy": "Nem seven, asit seven ve gölge toleranslı katmanlı bitkilendirme."
    }
  },
  {
    "id": "56",
    "name": "Siirt",
    "number": 56,
    "region": "Güneydoğu Anadolu",
    "climate": {
      "koppen": "BSh / Csa",
      "rainfallMm": "300–700",
      "tempC": "15–20",
      "frostRisk": "Orta",
      "elevationM": "400–1200"
    },
    "landscape": {
      "soilMoisture": "Yaz çok kurak",
      "irrigation": "Yoğun yaz sulama",
      "strategy": "Sıcak-kurak dayanımlı, gölge ve su verimli peyzaj."
    }
  },
  {
    "id": "57",
    "name": "Sinop",
    "number": 57,
    "region": "Karadeniz",
    "climate": {
      "koppen": "Cfb / Cfa",
      "rainfallMm": "800–2200",
      "tempC": "12–15",
      "frostRisk": "Orta",
      "elevationM": "0–2000"
    },
    "landscape": {
      "soilMoisture": "Yüksek nem, asidik eğilim",
      "irrigation": "Genelde düşük",
      "strategy": "Nem seven, asit seven ve gölge toleranslı katmanlı bitkilendirme."
    }
  },
  {
    "id": "58",
    "name": "Sivas",
    "number": 58,
    "region": "İç Anadolu",
    "climate": {
      "koppen": "BSk / Dsb",
      "rainfallMm": "300–500",
      "tempC": "10–13",
      "frostRisk": "Yüksek",
      "elevationM": "800–1500"
    },
    "landscape": {
      "soilMoisture": "Kurak step, düşük nem",
      "irrigation": "Zorunlu destek sulama",
      "strategy": "Don dayanımlı, düşük su isteyen step ve xeriscape türleri."
    }
  },
  {
    "id": "59",
    "name": "Tekirdağ",
    "number": 59,
    "region": "Marmara",
    "climate": {
      "koppen": "Csa / Cfb",
      "rainfallMm": "600–900",
      "tempC": "13–16",
      "frostRisk": "Orta",
      "elevationM": "0–800"
    },
    "landscape": {
      "soilMoisture": "Orta nem, geçiş iklimi",
      "irrigation": "Yaz destek sulaması",
      "strategy": "Mevsimsel nem dalgalanmasına dayanıklı, çok katmanlı bitki seçimi."
    }
  },
  {
    "id": "60",
    "name": "Tokat",
    "number": 60,
    "region": "Karadeniz",
    "climate": {
      "koppen": "Cfb / Cfa",
      "rainfallMm": "800–2200",
      "tempC": "12–15",
      "frostRisk": "Orta",
      "elevationM": "0–2000"
    },
    "landscape": {
      "soilMoisture": "Yüksek nem, asidik eğilim",
      "irrigation": "Genelde düşük",
      "strategy": "Nem seven, asit seven ve gölge toleranslı katmanlı bitkilendirme."
    }
  },
  {
    "id": "61",
    "name": "Trabzon",
    "number": 61,
    "region": "Karadeniz",
    "climate": {
      "koppen": "Cfb / Cfa",
      "rainfallMm": "800–2200",
      "tempC": "12–15",
      "frostRisk": "Orta",
      "elevationM": "0–2000"
    },
    "landscape": {
      "soilMoisture": "Yüksek nem, asidik eğilim",
      "irrigation": "Genelde düşük",
      "strategy": "Nem seven, asit seven ve gölge toleranslı katmanlı bitkilendirme."
    }
  },
  {
    "id": "62",
    "name": "Tunceli",
    "number": 62,
    "region": "Doğu Anadolu",
    "climate": {
      "koppen": "Dsb / Dfb",
      "rainfallMm": "400–700",
      "tempC": "4–10",
      "frostRisk": "Yüksek",
      "elevationM": "1200–2500"
    },
    "landscape": {
      "soilMoisture": "Kısa vejetasyon, karlı kış",
      "irrigation": "Yaz kısa pencere sulama",
      "strategy": "Sert kışa dayanıklı türler ve rüzgar koruması."
    }
  },
  {
    "id": "63",
    "name": "Şanlıurfa",
    "number": 63,
    "region": "Güneydoğu Anadolu",
    "climate": {
      "koppen": "BSh / Csa",
      "rainfallMm": "300–700",
      "tempC": "15–20",
      "frostRisk": "Orta",
      "elevationM": "400–1200"
    },
    "landscape": {
      "soilMoisture": "Yaz çok kurak",
      "irrigation": "Yoğun yaz sulama",
      "strategy": "Sıcak-kurak dayanımlı, gölge ve su verimli peyzaj."
    }
  },
  {
    "id": "64",
    "name": "Uşak",
    "number": 64,
    "region": "Ege",
    "climate": {
      "koppen": "Csa",
      "rainfallMm": "500–800",
      "tempC": "15–18",
      "frostRisk": "Düşük",
      "elevationM": "0–1200"
    },
    "landscape": {
      "soilMoisture": "Yaz kurak, kış nemli",
      "irrigation": "Yaz yoğun sulama",
      "strategy": "Kuraklığa uyumlu, Akdeniz formları ve gölge/su dengesi."
    }
  },
  {
    "id": "65",
    "name": "Van",
    "number": 65,
    "region": "Doğu Anadolu",
    "climate": {
      "koppen": "Dsb / Dfb",
      "rainfallMm": "400–700",
      "tempC": "4–10",
      "frostRisk": "Yüksek",
      "elevationM": "1200–2500"
    },
    "landscape": {
      "soilMoisture": "Kısa vejetasyon, karlı kış",
      "irrigation": "Yaz kısa pencere sulama",
      "strategy": "Sert kışa dayanıklı türler ve rüzgar koruması."
    }
  },
  {
    "id": "66",
    "name": "Yozgat",
    "number": 66,
    "region": "İç Anadolu",
    "climate": {
      "koppen": "BSk / Dsb",
      "rainfallMm": "300–500",
      "tempC": "10–13",
      "frostRisk": "Yüksek",
      "elevationM": "800–1500"
    },
    "landscape": {
      "soilMoisture": "Kurak step, düşük nem",
      "irrigation": "Zorunlu destek sulama",
      "strategy": "Don dayanımlı, düşük su isteyen step ve xeriscape türleri."
    }
  },
  {
    "id": "67",
    "name": "Zonguldak",
    "number": 67,
    "region": "Karadeniz",
    "climate": {
      "koppen": "Cfb / Cfa",
      "rainfallMm": "800–2200",
      "tempC": "12–15",
      "frostRisk": "Orta",
      "elevationM": "0–2000"
    },
    "landscape": {
      "soilMoisture": "Yüksek nem, asidik eğilim",
      "irrigation": "Genelde düşük",
      "strategy": "Nem seven, asit seven ve gölge toleranslı katmanlı bitkilendirme."
    }
  },
  {
    "id": "68",
    "name": "Aksaray",
    "number": 68,
    "region": "İç Anadolu",
    "climate": {
      "koppen": "BSk / Dsb",
      "rainfallMm": "300–500",
      "tempC": "10–13",
      "frostRisk": "Yüksek",
      "elevationM": "800–1500"
    },
    "landscape": {
      "soilMoisture": "Kurak step, düşük nem",
      "irrigation": "Zorunlu destek sulama",
      "strategy": "Don dayanımlı, düşük su isteyen step ve xeriscape türleri."
    }
  },
  {
    "id": "69",
    "name": "Bayburt",
    "number": 69,
    "region": "Karadeniz",
    "climate": {
      "koppen": "Cfb / Cfa",
      "rainfallMm": "800–2200",
      "tempC": "12–15",
      "frostRisk": "Orta",
      "elevationM": "0–2000"
    },
    "landscape": {
      "soilMoisture": "Yüksek nem, asidik eğilim",
      "irrigation": "Genelde düşük",
      "strategy": "Nem seven, asit seven ve gölge toleranslı katmanlı bitkilendirme."
    }
  },
  {
    "id": "70",
    "name": "Karaman",
    "number": 70,
    "region": "İç Anadolu",
    "climate": {
      "koppen": "BSk / Dsb",
      "rainfallMm": "300–500",
      "tempC": "10–13",
      "frostRisk": "Yüksek",
      "elevationM": "800–1500"
    },
    "landscape": {
      "soilMoisture": "Kurak step, düşük nem",
      "irrigation": "Zorunlu destek sulama",
      "strategy": "Don dayanımlı, düşük su isteyen step ve xeriscape türleri."
    }
  },
  {
    "id": "71",
    "name": "Kırıkkale",
    "number": 71,
    "region": "İç Anadolu",
    "climate": {
      "koppen": "BSk / Dsb",
      "rainfallMm": "300–500",
      "tempC": "10–13",
      "frostRisk": "Yüksek",
      "elevationM": "800–1500"
    },
    "landscape": {
      "soilMoisture": "Kurak step, düşük nem",
      "irrigation": "Zorunlu destek sulama",
      "strategy": "Don dayanımlı, düşük su isteyen step ve xeriscape türleri."
    }
  },
  {
    "id": "72",
    "name": "Batman",
    "number": 72,
    "region": "Güneydoğu Anadolu",
    "climate": {
      "koppen": "BSh / Csa",
      "rainfallMm": "300–700",
      "tempC": "15–20",
      "frostRisk": "Orta",
      "elevationM": "400–1200"
    },
    "landscape": {
      "soilMoisture": "Yaz çok kurak",
      "irrigation": "Yoğun yaz sulama",
      "strategy": "Sıcak-kurak dayanımlı, gölge ve su verimli peyzaj."
    }
  },
  {
    "id": "73",
    "name": "Şırnak",
    "number": 73,
    "region": "Güneydoğu Anadolu",
    "climate": {
      "koppen": "BSh / Csa",
      "rainfallMm": "300–700",
      "tempC": "15–20",
      "frostRisk": "Orta",
      "elevationM": "400–1200"
    },
    "landscape": {
      "soilMoisture": "Yaz çok kurak",
      "irrigation": "Yoğun yaz sulama",
      "strategy": "Sıcak-kurak dayanımlı, gölge ve su verimli peyzaj."
    }
  },
  {
    "id": "74",
    "name": "Bartın",
    "number": 74,
    "region": "Karadeniz",
    "climate": {
      "koppen": "Cfb / Cfa",
      "rainfallMm": "800–2200",
      "tempC": "12–15",
      "frostRisk": "Orta",
      "elevationM": "0–2000"
    },
    "landscape": {
      "soilMoisture": "Yüksek nem, asidik eğilim",
      "irrigation": "Genelde düşük",
      "strategy": "Nem seven, asit seven ve gölge toleranslı katmanlı bitkilendirme."
    }
  },
  {
    "id": "75",
    "name": "Ardahan",
    "number": 75,
    "region": "Doğu Anadolu",
    "climate": {
      "koppen": "Dsb / Dfb",
      "rainfallMm": "400–700",
      "tempC": "4–10",
      "frostRisk": "Yüksek",
      "elevationM": "1200–2500"
    },
    "landscape": {
      "soilMoisture": "Kısa vejetasyon, karlı kış",
      "irrigation": "Yaz kısa pencere sulama",
      "strategy": "Sert kışa dayanıklı türler ve rüzgar koruması."
    }
  },
  {
    "id": "76",
    "name": "Iğdır",
    "number": 76,
    "region": "Doğu Anadolu",
    "climate": {
      "koppen": "Dsb / Dfb",
      "rainfallMm": "400–700",
      "tempC": "4–10",
      "frostRisk": "Yüksek",
      "elevationM": "1200–2500"
    },
    "landscape": {
      "soilMoisture": "Kısa vejetasyon, karlı kış",
      "irrigation": "Yaz kısa pencere sulama",
      "strategy": "Sert kışa dayanıklı türler ve rüzgar koruması."
    }
  },
  {
    "id": "77",
    "name": "Yalova",
    "number": 77,
    "region": "Marmara",
    "climate": {
      "koppen": "Csa / Cfb",
      "rainfallMm": "600–900",
      "tempC": "13–16",
      "frostRisk": "Orta",
      "elevationM": "0–800"
    },
    "landscape": {
      "soilMoisture": "Orta nem, geçiş iklimi",
      "irrigation": "Yaz destek sulaması",
      "strategy": "Mevsimsel nem dalgalanmasına dayanıklı, çok katmanlı bitki seçimi."
    }
  },
  {
    "id": "78",
    "name": "Karabük",
    "number": 78,
    "region": "Karadeniz",
    "climate": {
      "koppen": "Cfb / Cfa",
      "rainfallMm": "800–2200",
      "tempC": "12–15",
      "frostRisk": "Orta",
      "elevationM": "0–2000"
    },
    "landscape": {
      "soilMoisture": "Yüksek nem, asidik eğilim",
      "irrigation": "Genelde düşük",
      "strategy": "Nem seven, asit seven ve gölge toleranslı katmanlı bitkilendirme."
    }
  },
  {
    "id": "79",
    "name": "Kilis",
    "number": 79,
    "region": "Güneydoğu Anadolu",
    "climate": {
      "koppen": "BSh / Csa",
      "rainfallMm": "300–700",
      "tempC": "15–20",
      "frostRisk": "Orta",
      "elevationM": "400–1200"
    },
    "landscape": {
      "soilMoisture": "Yaz çok kurak",
      "irrigation": "Yoğun yaz sulama",
      "strategy": "Sıcak-kurak dayanımlı, gölge ve su verimli peyzaj."
    }
  },
  {
    "id": "80",
    "name": "Osmaniye",
    "number": 80,
    "region": "Akdeniz",
    "climate": {
      "koppen": "Csa",
      "rainfallMm": "400–1100",
      "tempC": "16–20",
      "frostRisk": "Düşük",
      "elevationM": "0–1500"
    },
    "landscape": {
      "soilMoisture": "Kıyıda kurak yaz, yaylada serin",
      "irrigation": "Yaz damla sulama",
      "strategy": "Evergreen omurga + kurak peyzaj paleti."
    }
  },
  {
    "id": "81",
    "name": "Düzce",
    "number": 81,
    "region": "Karadeniz",
    "climate": {
      "koppen": "Cfb / Cfa",
      "rainfallMm": "800–2200",
      "tempC": "12–15",
      "frostRisk": "Orta",
      "elevationM": "0–2000"
    },
    "landscape": {
      "soilMoisture": "Yüksek nem, asidik eğilim",
      "irrigation": "Genelde düşük",
      "strategy": "Nem seven, asit seven ve gölge toleranslı katmanlı bitkilendirme."
    }
  }
];

export const provincesById: Record<string, Province> = Object.fromEntries(
  provinces.map((p) => [p.id, p]),
);
