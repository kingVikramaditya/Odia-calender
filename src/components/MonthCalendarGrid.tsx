import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  Check,
  Calendar as CalendarIcon,
  Sun,
  Flame,
  Award,
  Sparkles,
  Landmark
} from 'lucide-react';
import { PanchangDay, LanguageMode } from '../types';
import { WEEKDAYS, ODIA_MONTHS, toOdiaNumber } from '../data/odiaConstants';
import { formatLocalDateKey } from '../utils/panchangEngine';

interface MonthCalendarGridProps {
  currentDate: Date;
  selectedDate: Date;
  onSelectDate: (day: PanchangDay) => void;
  onNavigateMonth: (delta: number) => void;
  onSetMonth: (year: number, month: number) => void;
  monthDays: PanchangDay[];
  language: LanguageMode;
  currentLiveTime?: Date;
}

// Curated Month Options with Odia transliteration & seasonal Masa context
const MONTH_OPTIONS = [
  { index: 0, nameEn: 'January', nameOdia: 'ଜାନୁଆରୀ', masaOdia: 'ପୌଷ - ମାଘ (ମକର ସଂକ୍ରାନ୍ତି)' },
  { index: 1, nameEn: 'February', nameOdia: 'ଫେବୃଆରୀ', masaOdia: 'ମାଘ - ଫାଲ୍ଗୁନ (ସରସ୍ୱତୀ ପୂଜା)' },
  { index: 2, nameEn: 'March', nameOdia: 'ମାର୍ଚ୍ଚ', masaOdia: 'ଫାଲ୍ଗୁନ - ଚୈତ୍ର (ଦୋଳ ପୂର୍ଣ୍ଣିମା / ହୋଲି)' },
  { index: 3, nameEn: 'April', nameOdia: 'ଅପ୍ରେଲ୍', masaOdia: 'ଚୈତ୍ର - ବୈଶାଖ (ମହାବିଷୁବ / ପଣା ସଂକ୍ରାନ୍ତି)' },
  { index: 4, nameEn: 'May', nameOdia: 'ମେ', masaOdia: 'ବୈଶାଖ - ଜ୍ୟେଷ୍ଠ (ଚନ୍ଦନ ଯାତ୍ରା)' },
  { index: 5, nameEn: 'June', nameOdia: 'ଜୁନ୍', masaOdia: 'ଜ୍ୟେଷ୍ଠ - ଆଷାଢ଼ (ଶ୍ରୀଗୁଣ୍ଡିଚା / ରଥଯାତ୍ରା)' },
  { index: 6, nameEn: 'July', nameOdia: 'ଜୁଲାଇ', masaOdia: 'ଆଷାଢ଼ - ଶ୍ରାବଣ (ବାହୁଡ଼ା ଯାତ୍ରା)' },
  { index: 7, nameEn: 'August', nameOdia: 'ଅଗଷ୍ଟ', masaOdia: 'ଶ୍ରାବଣ - ଭାଦ୍ରବ (ଶ୍ରୀକୃଷ୍ଣ ଜନ୍ମାଷ୍ଟମୀ)' },
  { index: 8, nameEn: 'September', nameOdia: 'ସେପ୍ଟେମ୍ବର', masaOdia: 'ଭାଦ୍ରବ - ଆଶ୍ୱିନ (ଗଣେଶ ପୂଜା / ସୁନିଆଁ)' },
  { index: 9, nameEn: 'October', nameOdia: 'ଅକ୍ଟୋବର', masaOdia: 'ଆଶ୍ୱିନ - କାର୍ତ୍ତିକ (ଦୁର୍ଗାପୂଜା / କୁମାର ପୂର୍ଣ୍ଣିମା)' },
  { index: 10, nameEn: 'November', nameOdia: 'ନଭେମ୍ବର', masaOdia: 'କାର୍ତ୍ତିକ - ମାର୍ଗଶିର (ବାଲିଯାତ୍ରା / ବୋଇତ ବନ୍ଦାଣ)' },
  { index: 11, nameEn: 'December', nameOdia: 'ଡିସେମ୍ବର', masaOdia: 'ମାର୍ଗଶିର - ପୌଷ (ଧନୁ ସଂକ୍ରାନ୍ତି / ମାଣବସା)' },
];

const YEAR_OPTIONS = [
  { year: 2024, sal: '୧୪୩୧-୩୨ ସାଲ', sakabda: '୧୯୪୬ ଶକାବ୍ଦ' },
  { year: 2025, sal: '୧୪୩୨-୩୩ ସାଲ', sakabda: '୧୯୪୭ ଶକାବ୍ଦ' },
  { year: 2026, sal: '୧୪୩୩-୩୪ ସାଲ', sakabda: '୧୯୪୮ ଶକାବ୍ଦ' },
  { year: 2027, sal: '୧୪୩୪-୩୫ ସାଲ', sakabda: '୧୯୪୯ ଶକାବ୍ଦ' },
  { year: 2028, sal: '୧୪୩୫-୩୬ ସାଲ', sakabda: '୧୯୫୦ ଶକାବ୍ଦ' },
  { year: 2029, sal: '୧୪୩୬-୩୭ ସାଲ', sakabda: '୧୯୫୧ ଶକାବ୍ଦ' },
  { year: 2030, sal: '୧୪୩୭-୩୮ ସାଲ', sakabda: '୧୯୫୨ ଶକାବ୍ଦ' },
];

export const MonthCalendarGrid: React.FC<MonthCalendarGridProps> = ({
  currentDate,
  selectedDate,
  onSelectDate,
  onNavigateMonth,
  onSetMonth,
  monthDays,
  language,
  currentLiveTime,
}) => {
  const isOdia = language === 'or';
  const isBoth = language === 'both';

  const gYear = currentDate.getFullYear();
  const gMonth = currentDate.getMonth();

  // Custom Dropdowns state & click-outside handling
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const monthDropdownRef = useRef<HTMLDivElement>(null);
  const yearDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target as Node)) {
        setMonthDropdownOpen(false);
      }
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setYearDropdownOpen(false);
      }
    };
    if (monthDropdownOpen || yearDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [monthDropdownOpen, yearDropdownOpen]);

  // Find first day's weekday to pad the grid (0 = Sun, 6 = Sat)
  const firstDayWeekday = monthDays.length > 0 ? monthDays[0].dayOfWeek : 0;
  
  // Gregorian month names
  const gregorianMonthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Odia Month prominent in this period
  const primaryOdiaMonth = monthDays.length > 15 ? monthDays[14] : monthDays[0];

  const todayStr = formatLocalDateKey(currentLiveTime || new Date());
  const selectedStr = formatLocalDateKey(selectedDate);

  return (
    <div 
      id="month-calendar-container"
      className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm p-5 transition-colors"
    >
      {/* Month Navigation & Title Bar (styled like Image 1 & 2) */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          {/* Odia Month & Year Display */}
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight font-odia">
              {isOdia 
                ? `${primaryOdiaMonth?.odiaMonthNameOdia} - ${toOdiaNumber(primaryOdiaMonth?.odiaYearSal || gYear)}` 
                : `${primaryOdiaMonth?.odiaMonthNameEn} ${primaryOdiaMonth?.odiaYearSal || gYear} (Sal)`}
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 font-odia">
              {isOdia 
                ? `${toOdiaNumber(primaryOdiaMonth?.sakabda || 1948)} ଶକାବ୍ଦ`
                : `${primaryOdiaMonth?.sakabda || 1948} Sakabda`}
            </span>
          </div>

          {/* Gregorian counterpart */}
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
            {gregorianMonthNames[gMonth]} {gYear}{' '}
            <span className="text-neutral-400 dark:text-neutral-500">
              • {isOdia ? `${primaryOdiaMonth?.rutuOdia} ଋତୁ (${primaryOdiaMonth?.rutuEn})` : `Season: ${primaryOdiaMonth?.rutuEn} (${primaryOdiaMonth?.rutuOdia})`}
            </span>
          </p>
        </div>

        {/* Navigation buttons: Custom Styled Month & Year Dropdowns + Arrow Navigation */}
        <div className="flex items-center gap-2">
          {/* Custom Month Dropdown styled like Weather location selector */}
          <div className="relative" ref={monthDropdownRef}>
            <button
              type="button"
              id="month-picker-button"
              onClick={() => {
                setMonthDropdownOpen(!monthDropdownOpen);
                setYearDropdownOpen(false);
              }}
              className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FDF1DC] dark:bg-[#201B17] border border-[#F6DEBA] dark:border-[#382D24] hover:bg-[#F9E6C9] dark:hover:bg-[#2C231C] text-xs font-bold text-[#8E282E] dark:text-[#F39A94] shadow-2xs transition-all cursor-pointer select-none"
              title={isOdia ? 'ମାସ ବାଛନ୍ତୁ' : 'Select Month'}
            >
              <span className="font-odia text-xs sm:text-sm font-bold">
                {isOdia 
                  ? MONTH_OPTIONS[gMonth].nameOdia 
                  : isBoth 
                  ? `${MONTH_OPTIONS[gMonth].nameOdia} (${MONTH_OPTIONS[gMonth].nameEn})` 
                  : MONTH_OPTIONS[gMonth].nameEn}
              </span>
              <div className="w-4 h-4 rounded-full bg-[#F3D7B5] dark:bg-[#34271F] text-[#9E353B] dark:text-[#E88880] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${monthDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Month Dropdown Popover */}
            {monthDropdownOpen && (
              <div 
                id="month-dropdown-menu"
                className="absolute top-full right-0 sm:left-0 mt-2 w-64 sm:w-72 max-h-80 bg-[#FFFDF9] dark:bg-[#251E19] rounded-2xl shadow-xl border border-[#F2D7B5] dark:border-[#423429] z-50 overflow-hidden flex flex-col animate-fade-in"
              >
                <div className="p-2.5 border-b border-[#F5E2CE] dark:border-[#382B22] bg-[#FAF3E6] dark:bg-[#2C231D] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#8E282E] dark:text-[#F39A94] font-odia">
                    {isOdia ? 'ମାସ ପରିବର୍ତ୍ତନ କରନ୍ତୁ' : 'Select Month'}
                  </span>
                  <span className="text-[10px] text-[#8B6E5C] dark:text-[#C5A894] font-semibold">
                    {gYear} ({toOdiaNumber(gYear)})
                  </span>
                </div>

                <div className="overflow-y-auto p-1.5 space-y-0.5 max-h-64">
                  {MONTH_OPTIONS.map((opt) => {
                    const isSelected = opt.index === gMonth;
                    return (
                      <button
                        key={opt.index}
                        type="button"
                        onClick={() => {
                          onSetMonth(gYear, opt.index);
                          setMonthDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#FBE3CD] dark:bg-[#432A22] text-[#8E282E] dark:text-[#F39A94] font-bold'
                            : 'hover:bg-[#F9EDE0] dark:hover:bg-[#31251E] text-neutral-700 dark:text-neutral-200'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100 font-odia leading-snug">
                            {opt.nameOdia} ({opt.nameEn})
                          </div>
                          <div className="text-[10px] font-semibold text-[#8B6E5C] dark:text-[#A78A78] font-odia">
                            {opt.masaOdia}
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

          {/* Custom Year Dropdown styled like Weather location selector */}
          <div className="relative" ref={yearDropdownRef}>
            <button
              type="button"
              id="year-picker-button"
              onClick={() => {
                setYearDropdownOpen(!yearDropdownOpen);
                setMonthDropdownOpen(false);
              }}
              className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FDF1DC] dark:bg-[#201B17] border border-[#F6DEBA] dark:border-[#382D24] hover:bg-[#F9E6C9] dark:hover:bg-[#2C231C] text-xs font-bold text-[#8E282E] dark:text-[#F39A94] shadow-2xs transition-all cursor-pointer select-none"
              title={isOdia ? 'ବର୍ଷ ବାଛନ୍ତୁ' : 'Select Year'}
            >
              <span className="font-odia text-xs sm:text-sm font-bold">
                {isOdia ? `${gYear} (${toOdiaNumber(gYear)})` : `${gYear}`}
              </span>
              <div className="w-4 h-4 rounded-full bg-[#F3D7B5] dark:bg-[#34271F] text-[#9E353B] dark:text-[#E88880] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${yearDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Year Dropdown Popover */}
            {yearDropdownOpen && (
              <div 
                id="year-dropdown-menu"
                className="absolute top-full right-0 mt-2 w-56 sm:w-64 max-h-80 bg-[#FFFDF9] dark:bg-[#251E19] rounded-2xl shadow-xl border border-[#F2D7B5] dark:border-[#423429] z-50 overflow-hidden flex flex-col animate-fade-in"
              >
                <div className="p-2.5 border-b border-[#F5E2CE] dark:border-[#382B22] bg-[#FAF3E6] dark:bg-[#2C231D] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#8E282E] dark:text-[#F39A94] font-odia">
                    {isOdia ? 'ବର୍ଷ ପରିବର୍ତ୍ତନ କରନ୍ତୁ' : 'Select Year'}
                  </span>
                </div>

                <div className="overflow-y-auto p-1.5 space-y-0.5 max-h-64">
                  {YEAR_OPTIONS.map((opt) => {
                    const isSelected = opt.year === gYear;
                    return (
                      <button
                        key={opt.year}
                        type="button"
                        onClick={() => {
                          onSetMonth(opt.year, gMonth);
                          setYearDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#FBE3CD] dark:bg-[#432A22] text-[#8E282E] dark:text-[#F39A94] font-bold'
                            : 'hover:bg-[#F9EDE0] dark:hover:bg-[#31251E] text-neutral-700 dark:text-neutral-200'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100 font-odia leading-snug">
                            {isOdia ? `${opt.year} (${toOdiaNumber(opt.year)})` : `${opt.year}`}
                          </div>
                          <div className="text-[10px] font-semibold text-[#8B6E5C] dark:text-[#A78A78] font-odia">
                            {isOdia ? `${opt.sal} • ${opt.sakabda}` : `${opt.year - 593}-${opt.year - 592} Sal • ${opt.year - 78} Sakabda`}
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

          {/* Arrow navigation buttons in warm peach/terracotta tone matching dropdowns */}
          <div className="flex items-center gap-1 ml-1">
            <button
              id="prev-month-btn"
              onClick={() => onNavigateMonth(-1)}
              className="p-1.5 sm:p-2 rounded-xl bg-[#F3D7B5]/70 hover:bg-[#F3D7B5] dark:bg-[#34271F] dark:hover:bg-[#433227] text-[#9E353B] dark:text-[#E88880] transition-colors shadow-2xs cursor-pointer"
              title={isOdia ? 'ପୂର୍ବ ମାସ' : 'Previous Month'}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="next-month-btn"
              onClick={() => onNavigateMonth(1)}
              className="p-1.5 sm:p-2 rounded-xl bg-[#F3D7B5]/70 hover:bg-[#F3D7B5] dark:bg-[#34271F] dark:hover:bg-[#433227] text-[#9E353B] dark:text-[#E88880] transition-colors shadow-2xs cursor-pointer"
              title={isOdia ? 'ପରବର୍ତ୍ତୀ ମାସ' : 'Next Month'}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Weekday Column Headers (ରବି, ସୋମ, ମଙ୍ଗଳ...) */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center select-none">
        {WEEKDAYS.map((wd) => (
          <div 
            key={wd.dayIndex} 
            className={`py-2 px-1 rounded-xl text-xs font-bold font-odia ${
              wd.isWeekend 
                ? 'text-emerald-900 dark:text-emerald-200 bg-emerald-100/90 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700/80' 
                : 'text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800/40'
            }`}
          >
            <div className="text-xs sm:text-sm">{isOdia ? wd.nameOdia : isBoth ? `${wd.shortOdia} (${wd.shortEn})` : wd.nameEn}</div>
          </div>
        ))}
      </div>

      {/* Calendar Grid Cells */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {/* Empty cells for weekday offset before 1st of month */}
        {Array.from({ length: firstDayWeekday }).map((_, idx) => (
          <div 
            key={`empty-${idx}`} 
            className="min-h-[86px] sm:min-h-[105px] rounded-2xl bg-neutral-50/40 dark:bg-neutral-900/40 border border-transparent opacity-30 pointer-events-none"
          />
        ))}

        {/* Days of current month */}
        {monthDays.map((day) => {
          const isSelected = day.dateStr === selectedStr;
          const isToday = day.dateStr === todayStr;
          const isSunday = day.dayOfWeek === 0;
          const isGovtHoliday = day.isGovtHoliday || day.events.some(e => e.isGovtHoliday);

          // Key indicator checks
          const isEkadashi = day.moonPhase.isEkadashi;
          const isSankranti = day.moonPhase.isSankranti;
          const isPurnima = day.moonPhase.isPurnima;
          const isAmavasya = day.moonPhase.isAmavasya;
          const hasFestival = day.events.some(e => e.type === 'festival' || e.type === 'govt_holiday' || e.isGovtHoliday);
          const hasOshaBrata = day.events.some(e => e.type === 'osha_brata');

          return (
            <button
              key={day.dateStr}
              id={`calendar-day-cell-${day.dateStr}`}
              onClick={() => onSelectDate(day)}
              title={isOdia 
                ? `${day.dateStr}: ${day.tithi.nameOdia}${isGovtHoliday && day.govtHolidayInfo ? ` [${day.govtHolidayInfo.nameOdia}]` : isGovtHoliday ? ' [ଓଡ଼ିଶା ସରକାରୀ ଛୁଟି]' : ''} - କ୍ଲିକ୍ କରନ୍ତୁ: ସଂକଳ୍ପ ଓ ବିସ୍ତୃତ ପଞ୍ଚାଙ୍ଗ ଦେଖିବା ପାଇଁ`
                : `${day.dateStr}: ${day.tithi.nameEn}${isGovtHoliday ? ' [Govt Holiday]' : ''} - Click to view Sankalpa & Panchang details`}
              className={`group relative min-h-[98px] sm:min-h-[116px] p-2 rounded-2xl transition-all duration-150 border flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 overflow-hidden ${
                isSelected
                  ? 'bg-amber-600 dark:bg-amber-600 text-white border-amber-600 dark:border-amber-500 shadow-md ring-2 ring-amber-500/40 transform scale-[1.01]'
                  : isToday
                  ? isGovtHoliday
                    ? 'bg-emerald-200/90 dark:bg-emerald-900/80 border-emerald-500 dark:border-emerald-400 text-neutral-900 dark:text-neutral-100 shadow-xs ring-2 ring-emerald-500/60'
                    : 'bg-amber-50/90 dark:bg-neutral-800 border-amber-400 dark:border-amber-500/70 text-neutral-900 dark:text-neutral-100 shadow-2xs ring-1 ring-amber-400/30'
                  : isGovtHoliday
                  ? 'bg-emerald-100/80 dark:bg-emerald-950/70 hover:bg-emerald-200/80 dark:hover:bg-emerald-900/70 border-emerald-400 dark:border-emerald-600/90 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'bg-white dark:bg-neutral-900 hover:bg-amber-50/60 dark:hover:bg-neutral-800/90 border-neutral-200/80 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 shadow-2xs'
              }`}
            >
              {/* Top Row: Numerals & Solar Day (Justified across width) */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-baseline gap-1">
                  {/* Primary numeral */}
                  <span className={`text-base sm:text-xl font-extrabold leading-none ${isOdia ? 'font-odia' : 'font-sans'} ${
                    isSelected 
                      ? 'text-white' 
                      : isGovtHoliday
                      ? 'text-emerald-950 dark:text-emerald-200'
                      : 'text-neutral-900 dark:text-neutral-100'
                  }`}>
                    {isOdia ? day.odiaDayNumber : day.gregorianDay}
                  </span>

                  {/* Secondary day number */}
                  <span className={`text-[10px] sm:text-xs font-bold ${
                    isSelected 
                      ? 'text-amber-100' 
                      : isGovtHoliday
                      ? 'text-emerald-800 dark:text-emerald-300'
                      : 'text-neutral-400 dark:text-neutral-500'
                  }`}>
                    ({isOdia ? day.gregorianDay : day.odiaDayNumber})
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {/* Solar day / Month day */}
                  <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded ${isOdia ? 'font-odia' : 'font-sans'} ${
                    isSelected 
                      ? 'bg-white/20 text-white' 
                      : isGovtHoliday 
                      ? 'bg-emerald-200/90 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-100 border border-emerald-400/80 dark:border-emerald-700' 
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}>
                    {isOdia ? day.odiaDayOfSolarMonthOdia : `Day ${day.odiaDayOfSolarMonth}`}
                  </span>
                </div>
              </div>

              {/* Middle Section: Centered Tithi & Nakshatra */}
              <div className="w-full text-center my-auto py-1 space-y-0.5">
                <div className={`text-xs sm:text-[13px] font-bold font-odia truncate leading-snug ${
                  isSelected ? 'text-white' : 'text-neutral-900 dark:text-white'
                }`}>
                  {isOdia ? day.tithi.nameOdia : isBoth ? day.tithi.nameOdia : day.tithi.nameEn}
                </div>
                <div className={`text-[10px] sm:text-[11px] font-medium font-odia truncate leading-snug ${
                  isSelected ? 'text-amber-100' : 'text-neutral-500 dark:text-neutral-400'
                }`}>
                  {isOdia ? day.nakshatra.nameOdia : day.nakshatra.nameEn}
                </div>
              </div>

              {/* Bottom Row: Centered Badges & Visual Indicators */}
              <div className="w-full flex items-center justify-center gap-1 mt-auto pt-1 overflow-hidden">
                {/* Ekadashi Indicator */}
                {isEkadashi && (
                  <span 
                    className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-amber-500 text-white shadow-2xs font-odia shrink-0"
                    title={isOdia ? `ଏକାଦଶୀ: ${day.tithi.nameOdia}` : `Ekadashi: ${day.tithi.nameEn}`}
                  >
                    <Flame className="w-2.5 h-2.5" />
                    <span>{isOdia ? 'ଏକାଦଶୀ' : 'Ekadashi'}</span>
                  </span>
                )}

                {/* Sankranti Indicator */}
                {isSankranti && (
                  <span 
                    className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-orange-600 text-white shadow-2xs font-odia shrink-0"
                    title={isOdia ? 'ସଂକ୍ରାନ୍ତି' : 'Sankranti'}
                  >
                    <Sun className="w-2.5 h-2.5" />
                    <span>{isOdia ? 'ସଂକ୍ରାନ୍ତି' : 'Sankranti'}</span>
                  </span>
                )}

                {/* Purnima Indicator (Full Moon) */}
                {isPurnima && (
                  <span 
                    className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-yellow-400 text-neutral-900 shadow-2xs font-odia shrink-0"
                    title={isOdia ? 'ପୂର୍ଣ୍ଣିମା (Full Moon)' : 'Purnima (Full Moon)'}
                  >
                    <span className="text-[9px]">🌕</span>
                    <span>{isOdia ? 'ପୂର୍ଣ୍ଣିମା' : 'Purnima'}</span>
                  </span>
                )}

                {/* Amavasya Indicator (New Moon) */}
                {isAmavasya && (
                  <span 
                    className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-2xs font-odia shrink-0"
                    title={isOdia ? 'ଅମାବାସ୍ୟା (New Moon)' : 'Amavasya (New Moon)'}
                  >
                    <span className="text-[9px]">🌑</span>
                    <span>{isOdia ? 'ଅମାବାସ୍ୟା' : 'Amavasya'}</span>
                  </span>
                )}

                {/* Festival Dot or Badge */}
                {hasFestival && !isPurnima && !isAmavasya && !isEkadashi && !isSankranti && (
                  <span 
                    className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-rose-500 text-white truncate max-w-[90%] font-odia"
                    title={isOdia ? day.events[0]?.titleOdia : day.events[0]?.titleEn}
                  >
                    <Sparkles className="w-2 h-2 shrink-0" />
                    <span className="truncate font-odia">{isOdia ? (day.events[0]?.titleOdia.split(' ')[0]) : (day.events[0]?.titleEn.split(' ')[0])}</span>
                  </span>
                )}

                {/* Osha / Brata Badge */}
                {hasOshaBrata && !hasFestival && !isEkadashi && !isPurnima && !isAmavasya && (
                  <span 
                    className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold bg-teal-600 text-white font-odia"
                    title={isOdia ? 'ଓଷା / ବ୍ରତ' : 'Osha / Brata'}
                  >
                    {isOdia ? 'ଓଷା' : 'Osha'}
                  </span>
                )}
              </div>

              {/* Today subtle marker */}
              {isToday && !isSelected && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-orange-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend / Color Explanation Bar below calendar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-md bg-emerald-100/90 dark:bg-emerald-950 border border-emerald-400 dark:border-emerald-600 flex items-center justify-center shrink-0 shadow-2xs" />
            <span className="font-odia text-emerald-900 dark:text-emerald-300 font-bold">
              {isOdia ? 'ସରକାରୀ ଛୁଟି (ରବିବାର, ୨ୟ/୪ର୍ଥ ଶନିବାର ଓ ଗେଜେଟ୍ ଛୁଟି)' : 'Govt Holidays (Sundays, 2nd/4th Sat & Gazetted)'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-amber-500" />
            <span className="font-odia">{isOdia ? 'ଏକାଦଶୀ' : 'Ekadashi'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-orange-600" />
            <span className="font-odia">{isOdia ? 'ସଂକ୍ରାନ୍ତି' : 'Sankranti'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-yellow-400 text-[9px] flex items-center justify-center">🌕</span>
            <span className="font-odia">{isOdia ? 'ପୂର୍ଣ୍ଣିମା' : 'Purnima'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-neutral-900 dark:bg-neutral-100 text-[9px] flex items-center justify-center">🌑</span>
            <span className="font-odia">{isOdia ? 'ଅମାବାସ୍ୟା' : 'Amavasya'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-rose-500" />
            <span className="font-odia">{isOdia ? 'ପର୍ବପର୍ବାଣୀ' : 'Festivals'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-teal-600" />
            <span className="font-odia">{isOdia ? 'ଓଷା / ବ୍ରତ' : 'Osha / Brata'}</span>
          </div>
        </div>

        <div className="text-[11px] text-neutral-400 font-odia">
          {isOdia ? 'ଛୁଟି ତାଲିକା: odishacalendar.com / ସରକାରୀ ଗେଜେଟ୍' : 'Govt Holidays: odishacalendar.com'}
        </div>
      </div>
    </div>
  );
};
