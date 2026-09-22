export type LanguageMode = 'or' | 'en' | 'both';
export type ThemeMode = 'light' | 'dark' | 'system';

export type EventType = 
  | 'festival' 
  | 'osha_brata' 
  | 'ekadashi' 
  | 'sankranti' 
  | 'purnima' 
  | 'amavasya' 
  | 'govt_holiday';

export interface FestivalEvent {
  id: string;
  titleOdia: string;
  titleEn: string;
  type: EventType;
  significanceOdia: string;
  significanceEn: string;
  ritualsOdia?: string;
  ritualsEn?: string;
  deityOdia?: string;
  deityEn?: string;
  isGovtHoliday?: boolean;
  tagColor?: string;
  dateStr?: string; // YYYY-MM-DD
}

export interface MuhurtaItem {
  id: string;
  type: 'marriage' | 'griha_pravesh' | 'upanayana' | 'vehicle' | 'business';
  typeOdia: string;
  typeEn: string;
  dateStr: string;
  timeWindow: string;
  descriptionOdia: string;
  descriptionEn: string;
  rating: 'Uttama' | 'Madhyama' | 'Varjya';
  nakshatra: string;
  tithi: string;
}

export interface HourlyWeatherPoint {
  hour: string;
  hourOdia: string;
  temp: number;
  condition: string;
  conditionOdia: string;
  ritualOdia: string;
  quality: 'good' | 'neutral' | 'calm';
}

export interface LocationInfo {
  id: string;
  nameEn: string;
  nameOdia: string;
  state: string;
  lat: number;
  lng: number;
  sunriseDiffMinutes: number;
  sunsetDiffMinutes: number;
  defaultTemp: number;
  condition: string;
  conditionOdia?: string;
  feelsLike?: number;
  tempMax?: number;
  tempMin?: number;
  humidity: number;
  windSpeed: number;
  windDirection?: string;
  uvIndex?: number;
  uvStatusOdia?: string;
  aqi?: number;
  aqiStatusOdia?: string;
  visibilityKm?: number;
  pressureHpa?: number;
  spiritualNoteOdia?: string;
  spiritualNoteEn?: string;
  landscapeType?: 'coastal' | 'temple_city' | 'hills' | 'river_valley' | 'forest';
  hourlyForecast?: HourlyWeatherPoint[];
}

export interface ChoghadiyaSlot {
  index: number;
  nameOdia: string;
  nameEn: string;
  quality: 'good' | 'neutral' | 'bad';
  ruler: string;
  start: string;
  end: string;
  isNight: boolean;
}

export interface PanchangDay {
  date: Date;
  dateStr: string; // YYYY-MM-DD
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  gregorianDay: number;
  gregorianMonth: number;
  gregorianYear: number;
  
  // Odia specifics
  odiaDayNumber: string; // e.g. "୨୨"
  odiaMonthIndex: number; // 0 to 11
  odiaMonthNameOdia: string; // e.g. "ବୈଶାଖ"
  odiaMonthNameEn: string; // e.g. "Baisakha"
  odiaDayOfSolarMonth: number; // day in Odia month (e.g. 7)
  odiaDayOfSolarMonthOdia: string; // "୭"
  odiaYearSal: number; // e.g. 1433 Odia Sal
  sakabda: number; // e.g. 1948 Sakabda
  vikramSamvat: number; // e.g. 2083 Vikram Samvat
  rutuOdia: string; // Ritu / Season (ଗ୍ରୀଷ୍ମ, ବର୍ଷା, ଶରତ, ହେମନ୍ତ, ଶୀତ, ବସନ୍ତ)
  rutuEn: string;
  
  // Drik Ganita calculations
  drikAyanamsha: string; // "Lahiri 24° 14' 20\""
  tithiProgressPercent: number; // 0-100% of current tithi completed
  nakshatraProgressPercent: number;
  
  // Daily Panchang
  varaOdia: string; // ରବିବାର
  varaEn: string; // Sunday
  varaShortOdia: string; // ରବି
  
  tithi: {
    nameOdia: string;
    nameEn: string;
    number: number; // 1 to 15
    pakshaOdia: string; // ଶୁକ୍ଳପକ୍ଷ / କୃଷ୍ଣପକ୍ଷ
    pakshaEn: 'Shukla' | 'Krishna';
    startTime: string;
    endTime: string;
    nextTithiOdia?: string;
    nextTithiEn?: string;
  };
  
  nakshatra: {
    nameOdia: string;
    nameEn: string;
    number: number;
    startTime: string;
    endTime: string;
    pada: number;
    nextNakshatraOdia?: string;
    nextNakshatraEn?: string;
  };
  
  yoga: {
    nameOdia: string;
    nameEn: string;
    endTime: string;
  };
  
  karana: {
    nameOdia: string;
    nameEn: string;
    endTime: string;
  };
  
  rashi: {
    moonSignOdia: string;
    moonSignEn: string;
    sunSignOdia: string;
    sunSignEn: string;
  };
  
  lagna: {
    nameOdia: string;
    nameEn: string;
  };
  
  moonPhase: {
    nameOdia: string;
    nameEn: string;
    phaseType: 'waxing' | 'waning' | 'purnima' | 'amavasya';
    illuminationPercent: number;
    isPurnima: boolean;
    isAmavasya: boolean;
    isEkadashi: boolean;
    isSankranti: boolean;
    sankrantiNameOdia?: string;
    sankrantiNameEn?: string;
  };
  
  timings: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    dayLength: string;
    nightLength: string;
    
    // Drik Auspicious Timings
    brahmaMuhurta: { start: string; end: string };
    pratahSandhya: { start: string; end: string };
    abhijit: { start: string; end: string };
    vijayaMuhurta: { start: string; end: string };
    godhuliMuhurta: { start: string; end: string };
    sayahnaSandhya: { start: string; end: string };
    amrita: { start: string; end: string };
    mahendra: { start: string; end: string };
    amritKalam: { start: string; end: string };
    nishitaMuhurta: { start: string; end: string };
    
    // Drik Inauspicious Timings
    rahuKala: { start: string; end: string };
    yamaganda: { start: string; end: string };
    gulikaKala: { start: string; end: string };
    durmuhurtham: { start: string; end: string };
    varjyam: { start: string; end: string };
    baraBela: { start: string; end: string };
    kalaBela: { start: string; end: string };
    kalaRatri: { start: string; end: string };
  };

  // Day & Night Choghadiya
  choghadiyaDay: ChoghadiyaSlot[];
  choghadiyaNight: ChoghadiyaSlot[];
  
  astrological: {
    taraShuddhi: {
      statusOdia: string;
      statusEn: string;
      isShubha: boolean;
    };
    chandrashtamaRashi?: string;
    ghataChandra: string[]; // Rashis for which Chandra is Ghata
    ghataRashi: string[];
    ghataNakshatra: string[];
    ghataTithi: string[];
    yogini: {
      directionOdia: string;
      directionEn: string;
      avoidTravelToOdia: string;
      avoidTravelToEn: string;
    };
  };
  
  events: FestivalEvent[];
  muhurtas?: MuhurtaItem[];
  isGovtHoliday?: boolean;
  govtHolidayType?: 'gazetted' | 'optional' | 'bank';
  govtHolidayInfo?: {
    nameOdia: string;
    nameEn: string;
    type: 'gazetted' | 'optional' | 'bank';
    descriptionOdia: string;
    descriptionEn: string;
    source: string;
  };
}

export interface RashiForecast {
  id: string;
  nameOdia: string;
  nameEn: string;
  symbol: string;
  elementOdia: string;
  elementEn: string;
  rulerOdia: string;
  rulerEn: string;
  luckScore: number; // 1 to 5
  predictionOdia: string;
  predictionEn: string;
  luckyColorOdia: string;
  luckyColorEn: string;
  luckyNumber: number;
  favorableTime: string;
}

export interface WeatherData {
  tempC: number;
  conditionEn: string;
  conditionOdia: string;
  humidity: number;
  windKmh: number;
  pressureHpa: number;
  uvIndex: number;
  feelsLikeC: number;
  locationName: string;
  locationOdia: string;
}

export interface ReminderItem {
  id: string;
  dateStr: string;
  title: string;
  titleOdia: string;
  type: string;
  notes?: string;
  createdAt: string;
}
