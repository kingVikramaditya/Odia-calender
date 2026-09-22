import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { 
  MapPin, 
  ChevronDown, 
  Check, 
  Search,
  Sun,
  Droplets,
  Wind,
  CloudSun,
  CloudRain,
  CloudFog,
  RefreshCw
} from 'lucide-react';
import { LocationInfo, LanguageMode } from '../types';
import { LOCATIONS, toOdiaNumber } from '../data/odiaConstants';
import { LocationArtIllustration } from './LocationArtIllustration';

interface WeatherWidgetProps {
  location: LocationInfo;
  onSelectLocation: (loc: LocationInfo) => void;
  language: LanguageMode;
  sunrise?: string;
  sunset?: string;
}

interface LiveWeatherData {
  temp: number;
  tempMax: number;
  tempMin: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  conditionEn: string;
  conditionOdia: string;
  isLive: boolean;
  lastUpdated: string;
}

// Convert WMO weather codes to descriptive English and Odia conditions
function interpretWmoCode(code: number): { en: string; odia: string } {
  if (code === 0) {
    return { en: 'Clear Sky', odia: 'ନିର୍ମଳ ଆକାଶ' };
  } else if (code === 1) {
    return { en: 'Mainly Clear', odia: 'ପ୍ରାୟ ନିର୍ମଳ' };
  } else if (code === 2) {
    return { en: 'Partly Cloudy', odia: 'ଆଂଶିକ ମେଘୁଆ' };
  } else if (code === 3) {
    return { en: 'Overcast', odia: 'ମେଘାଚ୍ଛନ୍ନ' };
  } else if (code === 45 || code === 48) {
    return { en: 'Fog / Mist', odia: 'କୁହୁଡ଼ି' };
  } else if (code >= 51 && code <= 55) {
    return { en: 'Light Drizzle', odia: 'ଝିପିଝିପି ବର୍ଷା' };
  } else if (code >= 61 && code <= 65) {
    return { en: 'Rain Showers', odia: 'ବର୍ଷା' };
  } else if (code >= 71 && code <= 77) {
    return { en: 'Winter Dew / Frost', odia: 'ଶୀତଳ ଶିଶିର' };
  } else if (code >= 80 && code <= 82) {
    return { en: 'Passing Showers', odia: 'ଘଡ଼ଘଡ଼ି ସହ ବର୍ଷା' };
  } else if (code >= 95 && code <= 99) {
    return { en: 'Thunderstorm', odia: 'ବଜ୍ରପାତ ସହ ବର୍ଷା' };
  }
  return { en: 'Pleasant Weather', odia: 'ଅନୁକୂଳ ପାଣିପାଗ' };
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  location,
  onSelectLocation,
  language,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Live weather state powered by Open-Meteo free API
  const [liveWeather, setLiveWeather] = useState<LiveWeatherData | null>(null);
  const [isFetchingWeather, setIsFetchingWeather] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const isOdia = language === 'or';
  const isBoth = language === 'both';

  // Fetch live weather data for the current district coordinates
  const fetchLiveWeather = useCallback(async (lat: number, lng: number) => {
    setIsFetchingWeather(true);
    setFetchError(false);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FKolkata`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Weather API error');
      const data = await res.json();

      const current = data.current;
      const daily = data.daily;
      const wmo = interpretWmoCode(current.weather_code || 0);

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setLiveWeather({
        temp: Math.round(current.temperature_2m),
        tempMax: daily?.temperature_2m_max?.[0] ? Math.round(daily.temperature_2m_max[0]) : Math.round(current.temperature_2m + 2),
        tempMin: daily?.temperature_2m_min?.[0] ? Math.round(daily.temperature_2m_min[0]) : Math.round(current.temperature_2m - 5),
        humidity: Math.round(current.relative_humidity_2m),
        windSpeed: Math.round(current.wind_speed_10m),
        weatherCode: current.weather_code || 0,
        conditionEn: wmo.en,
        conditionOdia: wmo.odia,
        isLive: true,
        lastUpdated: timeStr,
      });
    } catch {
      setFetchError(true);
      // Fallback gracefully to curated district data
    } finally {
      setIsFetchingWeather(false);
    }
  }, []);

  // Fetch when location changes
  useEffect(() => {
    if (location.lat && location.lng) {
      fetchLiveWeather(location.lat, location.lng);
    }
  }, [location.lat, location.lng, fetchLiveWeather]);

  // Handle outside click for location dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Filter locations for dropdown
  const filteredLocations = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return LOCATIONS;
    return LOCATIONS.filter((loc) => {
      return (
        loc.nameEn.toLowerCase().includes(q) ||
        loc.nameOdia.includes(q) ||
        loc.state.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  // Extract clean uppercase location display name
  const locationHeaderEn = useMemo(() => {
    return location.nameEn.split('(')[0].trim().toUpperCase();
  }, [location.nameEn]);

  // Final weather metrics (Live API prioritised with district baseline fallback)
  const tempVal = liveWeather ? liveWeather.temp : (location.defaultTemp || 32);
  const tempHigh = liveWeather ? liveWeather.tempMax : (location.tempMax || tempVal + 2);
  const tempLow = liveWeather ? liveWeather.tempMin : (location.tempMin || tempVal - 7);
  const humidity = liveWeather ? liveWeather.humidity : (location.humidity || 72);
  const windSpeed = liveWeather ? liveWeather.windSpeed : (location.windSpeed || 16);

  // Condition name
  const conditionDisplay = useMemo(() => {
    if (liveWeather) {
      if (isOdia) return liveWeather.conditionOdia;
      if (isBoth) return `${liveWeather.conditionEn} (${liveWeather.conditionOdia})`;
      return liveWeather.conditionEn;
    }
    if (isOdia) {
      return location.conditionOdia || 'ନିର୍ମଳ ଆକାଶ';
    }
    if (isBoth && location.conditionOdia) {
      return `${location.condition} (${location.conditionOdia.split(' ')[0]})`;
    }
    return location.condition || 'Sunny';
  }, [isOdia, isBoth, liveWeather, location.condition, location.conditionOdia]);

  // Condition icon selection
  const WeatherIcon = useMemo(() => {
    if (!liveWeather) return Sun;
    const code = liveWeather.weatherCode;
    if (code >= 51 && code <= 99) return CloudRain;
    if (code >= 1 && code <= 3) return CloudSun;
    if (code === 45 || code === 48) return CloudFog;
    return Sun;
  }, [liveWeather]);

  // Tagline text: Full spiritual note or fallback district label without truncation
  const fullTaglineOdia = location.spiritualNoteOdia || `${location.nameOdia} • ଓଡ଼ିଶା ୩୦ ଜିଲ୍ଲା`;
  const fullTaglineEn = location.spiritualNoteEn || `${location.nameEn} • Odisha 30 Districts`;

  return (
    <div 
      id="minimal-weather-card"
      className="relative w-full rounded-2xl md:rounded-3xl bg-[#FDF1DC] dark:bg-[#201B17] border border-[#F6DEBA] dark:border-[#382D24] shadow-sm transition-all md:h-[142px]"
    >
      {/* 1. Subtle Minimal Geometric Background Watermarks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none rounded-2xl md:rounded-3xl">
        <div 
          className="absolute -top-6 -left-6 w-36 h-36 rounded-full border-[3.5px] border-[#E89E75]/25 dark:border-[#E89E75]/15"
          style={{ transform: 'rotate(-15deg)' }}
        />
        <div 
          className="absolute top-24 left-44 w-14 h-14 rounded-full border-2 border-[#E89E75]/20 dark:border-[#E89E75]/10"
        />
        <svg 
          className="absolute top-6 left-48 w-8 h-8 text-[#E89E75]/25 dark:text-[#E89E75]/15"
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <polygon points="12 3 22 21 2 21" />
        </svg>
      </div>

      {/* 2. Background Art Illustration on right side */}
      <div className="hidden md:flex absolute right-0 bottom-0 top-0 w-44 md:w-52 lg:w-60 h-full items-end justify-end overflow-hidden pointer-events-none opacity-20 dark:opacity-15 z-0 rounded-r-2xl md:rounded-r-3xl">
        <LocationArtIllustration 
          locationId={location.id} 
          landscapeType={location.landscapeType}
          className="w-full h-full max-h-[136px] object-cover object-bottom"
        />
      </div>

      {/* 3. Main Card Content: Exactly 3 slim, clean rows */}
      <div className="relative z-10 p-3.5 sm:p-4 md:py-3 md:px-5 flex flex-col justify-between h-full min-w-0">
        
        {/* ROW 1: Full Location Name & Live Status fully visible in ONE line */}
        <div className="relative min-w-0" ref={dropdownRef}>
          <div className="flex items-center justify-between gap-3 w-full">
            <button
              type="button"
              id="location-picker-button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="group inline-flex items-center gap-2 text-left cursor-pointer focus:outline-none min-w-0"
              title={isOdia ? 'ଜିଲ୍ଲା / ସ୍ଥାନ ପରିବର୍ତ୍ତନ କରନ୍ତୁ' : 'Change district / location'}
            >
              <h2 className="text-base sm:text-lg md:text-xl font-black tracking-tight text-[#9E353B] dark:text-[#E88880] font-odia group-hover:opacity-85 transition-opacity leading-none whitespace-nowrap">
                {isOdia ? location.nameOdia : isBoth ? `${location.nameOdia} (${location.nameEn.split('(')[0].trim()})` : `${location.nameEn}, Odisha`}
              </h2>
              <div className="w-5 h-5 rounded-full bg-[#F3D7B5] dark:bg-[#34271F] text-[#9E353B] dark:text-[#E88880] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Top-Right Live Weather Badge & Refresh Button (flex child, no absolute overlay collision) */}
            <div className="flex items-center gap-1.5 shrink-0">
              {liveWeather && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shadow-2xs shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{isOdia ? 'ପ୍ରତ୍ୟକ୍ଷ ପାଣିପାଗ' : 'LIVE'}</span>
                </span>
              )}
              <button
                type="button"
                onClick={() => location.lat && location.lng && fetchLiveWeather(location.lat, location.lng)}
                disabled={isFetchingWeather}
                title={isOdia ? 'ପାଣିପାଗ ତଥ୍ୟ ଅଦ୍ୟତନ କରନ୍ତୁ' : 'Refresh live weather'}
                className="p-1 rounded-full text-[#8B6E5C] dark:text-[#C5A894] hover:bg-[#F3D7B5] dark:hover:bg-[#34271F] transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isFetchingWeather ? 'animate-spin text-[#9E353B]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Location Selector Dropdown Menu */}
          {dropdownOpen && (
            <div 
              id="location-dropdown-menu"
              className="absolute top-full left-0 mt-2 w-72 sm:w-80 max-h-80 bg-[#FFFDF9] dark:bg-[#251E19] rounded-2xl shadow-xl border border-[#F2D7B5] dark:border-[#423429] z-50 overflow-hidden flex flex-col animate-fade-in"
            >
              <div className="p-2.5 border-b border-[#F5E2CE] dark:border-[#382B22] bg-[#FAF3E6] dark:bg-[#2C231D]">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isOdia ? 'ସ୍ଥାନ କିମ୍ବା ମନ୍ଦିର ଖୋଜନ୍ତୁ...' : 'Search monument or location...'}
                    className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-xl bg-white dark:bg-[#1E1713] border border-[#ECD1B3] dark:border-[#44352A] text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#9E353B]"
                    autoFocus
                  />
                </div>
              </div>

              <div className="overflow-y-auto p-1.5 space-y-0.5 max-h-60">
                {filteredLocations.map((loc) => {
                  const isSelected = loc.id === location.id;
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => {
                        onSelectLocation(loc);
                        setDropdownOpen(false);
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#FBE3CD] dark:bg-[#432A22] text-[#8E282E] dark:text-[#F39A94] font-bold'
                          : 'hover:bg-[#F9EDE0] dark:hover:bg-[#31251E] text-neutral-700 dark:text-neutral-200'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100 font-odia leading-snug">
                          {loc.nameOdia}
                        </div>
                        <div className="text-[10px] font-semibold text-[#8B6E5C] dark:text-[#A78A78] uppercase font-sans">
                          {loc.nameEn.split('(')[0].trim()} • {loc.state}
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#8E282E] dark:text-[#F39A94] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ROW 2: Full Tagline completely visible in ONE line right below the location name */}
        <div className="flex items-center gap-1.5 text-xs sm:text-[13px] text-[#8B6E5C] dark:text-[#C5A894] py-0.5 leading-none">
          <MapPin className="w-3.5 h-3.5 text-[#B54047] dark:text-[#E88880] shrink-0" />
          <span className="font-odia text-xs sm:text-[13px] font-medium leading-none">
            {isOdia ? fullTaglineOdia : fullTaglineEn}
          </span>
        </div>

        {/* ROW 3: Temperature & Live Weather Stats in ONE line */}
        <div className="flex items-center gap-3 sm:gap-4 pt-0.5 whitespace-nowrap overflow-x-auto no-scrollbar">
          <div className="flex items-baseline gap-0.5 shrink-0">
            <span className="text-3xl sm:text-4xl font-light tracking-tighter text-[#38261F] dark:text-[#F7EFE8] font-sans leading-none">
              {isOdia ? toOdiaNumber(tempVal) : tempVal}°
            </span>
            <span className="text-xs font-normal text-[#8B6E5C] dark:text-[#C5A894] font-sans">
              C
            </span>
          </div>

          {/* Weather Infos: Condition, High/Low, Humidity, Wind */}
          <div className="flex items-center gap-x-2.5 text-[11px] sm:text-xs font-medium text-[#684C3E] dark:text-[#D5BCAC] whitespace-nowrap">
            {/* Weather Condition */}
            <div className="flex items-center gap-1 font-semibold text-[#8E282E] dark:text-[#F39A94] shrink-0">
              <WeatherIcon className="w-3.5 h-3.5 text-[#E07A5F] shrink-0" />
              <span>{conditionDisplay}</span>
            </div>

            <span className="text-[#CDB5A0] dark:text-[#5A473C] shrink-0">•</span>

            {/* High / Low */}
            <div className="flex items-center gap-0.5 shrink-0">
              <span>H: {isOdia ? toOdiaNumber(tempHigh) : tempHigh}°</span>
              <span className="text-[#CDB5A0] dark:text-[#5A473C]">/</span>
              <span>L: {isOdia ? toOdiaNumber(tempLow) : tempLow}°</span>
            </div>

            <span className="text-[#CDB5A0] dark:text-[#5A473C] shrink-0">•</span>

            {/* Humidity */}
            <div className="flex items-center gap-1 shrink-0">
              <Droplets className="w-3.5 h-3.5 text-[#5B8EA3] shrink-0" />
              <span>{isOdia ? toOdiaNumber(humidity) : humidity}%</span>
            </div>

            <span className="text-[#CDB5A0] dark:text-[#5A473C] shrink-0">•</span>

            {/* Wind Speed */}
            <div className="flex items-center gap-1 shrink-0">
              <Wind className="w-3.5 h-3.5 text-[#6B9080] shrink-0" />
              <span>{isOdia ? toOdiaNumber(windSpeed) : windSpeed} km/h</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
