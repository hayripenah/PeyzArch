export type ProvinceEnvironment = {
  fetchedAt: string;
  elevationM: number | null;
  climate: {
    tempNowC: number | null;
    humidityPct: number | null;
    tempMaxAvgC: number | null;
    tempMinAvgC: number | null;
    precipWeekMm: number | null;
  };
  sun: {
    radiationNowWm2: number | null;
    sunshineWeekHours: number | null;
  };
  wind: {
    speedNowKmh: number | null;
    directionNowDeg: number | null;
    directionNowLabel: string | null;
    dominantWeekDeg: number | null;
    dominantWeekLabel: string | null;
    maxWeekKmh: number | null;
  };
  soil: {
    ph: number | null;
    organicCarbonGkg: number | null;
    clayPct: number | null;
    sandPct: number | null;
  };
  source: {
    weather: string;
    soil: string;
  };
};
