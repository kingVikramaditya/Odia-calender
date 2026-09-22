import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Sun,
  Flame,
  Award,
  Sparkles,
  Landmark
} from 'lucide-react';
import { PanchangDay, LanguageMode } from '../types';
import { WEEKDAYS, ODIA_MONTHS, toOdiaNumber } from '../data/odiaConstants';

interface MonthCalendarGridProps {
  currentDate: Date;
  selectedDate: Date;
  onSelectDate: (day: PanchangDay) => void;
  onNavigateMonth: (delta: number) => void;
  onSetMonth: (year: number, month: number) => void;
  monthDays: PanchangDay[];
  language: LanguageMode;
}

export const MonthCalendarGrid: React.FC<MonthCalendarGridProps> = ({
  currentDate,
  selectedDate,
  onSelectDate,
  onNavigateMonth,
  onSetMonth,
  monthDays,
  language,
}) => {
  const isOdia = language === 'or';
  const isBoth = language === 'both';

  const gYear = currentDate.getFullYear();
  const gMonth = currentDate.getMonth();

  // Find first day's weekday to pad the grid (0 = Sun, 6 = Sat)
  const firstDayWeekday = monthDays.length > 0 ? monthDays[0].dayOfWeek : 0;
  
  // Gregorian month names
  const gregorianMonthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Odia Month prominent in this period
  const primaryOdiaMonth = monthDays.length > 15 ? monthDays[14] : monthDays[0];

  const todayStr = new Date().toISOString().split('T')[0];
  const selectedStr = selectedDate.toISOString().split('T')[0];

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
              {primaryOdiaMonth?.odiaMonthNameOdia} - {toOdiaNumber(primaryOdiaMonth?.odiaYearSal || gYear)}
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 font-odia">
              {toOdiaNumber(primaryOdiaMonth?.sakabda || 1948)} ଶକାବ୍ଦ
            </span>
          </div>

          {/* Gregorian counterpart */}
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
            {gregorianMonthNames[gMonth]} {gYear}{' '}
            <span className="text-neutral-400 dark:text-neutral-500">• {primaryOdiaMonth?.rutuOdia} ଋତୁ ({primaryOdiaMonth?.rutuEn})</span>
          </p>
        </div>

        {/* Navigation buttons: Prev, Dropdowns, Next */}
        <div className="flex items-center gap-2">
          {/* Quick Month Dropdown */}
          <select
            id="month-select-dropdown"
            value={gMonth}
            onChange={(e) => onSetMonth(gYear, parseInt(e.target.value, 10))}
            className="px-2.5 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            {gregorianMonthNames.map((mName, idx) => (
              <option key={idx} value={idx}>
                {mName}
              </option>
            ))}
          </select>

          {/* Quick Year Dropdown */}
          <select
            id="year-select-dropdown"
            value={gYear}
            onChange={(e) => onSetMonth(parseInt(e.target.value, 10), gMonth)}
            className="px-2.5 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            {[2024, 2025, 2026, 2027, 2028].map((yr) => (
              <option key={yr} value={yr}>
                {yr} ({toOdiaNumber(yr)})
              </option>
            ))}
          </select>

          {/* Arrow navigation buttons in warm peach/terracotta tone (Image 1 & 2) */}
          <div className="flex items-center gap-1 ml-1">
            <button
              id="prev-month-btn"
              onClick={() => onNavigateMonth(-1)}
              className="p-2 rounded-xl bg-orange-100/70 hover:bg-orange-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-orange-900 dark:text-neutral-200 transition-colors shadow-2xs"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="next-month-btn"
              onClick={() => onNavigateMonth(1)}
              className="p-2 rounded-xl bg-orange-100/70 hover:bg-orange-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-orange-900 dark:text-neutral-200 transition-colors shadow-2xs"
              title="Next Month"
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
                ? 'text-rose-600 dark:text-rose-400 bg-rose-50/70 dark:bg-rose-950/30' 
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
              title={`${day.dateStr}: ${day.tithi.nameOdia}${isGovtHoliday ? ' [ଓଡ଼ିଶା ସରକାରୀ ଛୁଟି / Govt Holiday]' : ''} - କ୍ଲିକ୍ କରନ୍ତୁ: ସଂକଳ୍ପ ଓ ବିସ୍ତୃତ ପଞ୍ଚାଙ୍ଗ ଦେଖିବା ପାଇଁ`}
              className={`group relative min-h-[98px] sm:min-h-[116px] p-2 rounded-2xl transition-all duration-150 border flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 overflow-hidden ${
                isSelected
                  ? 'bg-amber-600 dark:bg-amber-600 text-white border-amber-600 dark:border-amber-500 shadow-md ring-2 ring-amber-500/40 transform scale-[1.01]'
                  : isToday
                  ? 'bg-amber-50/90 dark:bg-neutral-800 border-amber-400 dark:border-amber-500/70 text-neutral-900 dark:text-neutral-100 shadow-2xs ring-1 ring-amber-400/30'
                  : isGovtHoliday
                  ? 'bg-emerald-50/75 dark:bg-emerald-950/35 hover:bg-emerald-100/70 dark:hover:bg-emerald-900/40 border-emerald-300 dark:border-emerald-700/60 text-neutral-900 dark:text-neutral-100 shadow-2xs'
                  : 'bg-white dark:bg-neutral-900 hover:bg-amber-50/60 dark:hover:bg-neutral-800/90 border-neutral-200/80 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 shadow-2xs'
              }`}
            >
              {/* Top Row: Numerals & Solar Day (Justified across width) */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-baseline gap-1">
                  {/* Primary Odia numeral */}
                  <span className={`text-base sm:text-xl font-bold font-odia leading-none ${
                    isSelected 
                      ? 'text-white' 
                      : isGovtHoliday
                      ? 'text-emerald-800 dark:text-emerald-300'
                      : isSunday
                      ? 'text-rose-600 dark:text-rose-400' 
                      : 'text-neutral-900 dark:text-neutral-100'
                  }`}>
                    {day.odiaDayNumber}
                  </span>

                  {/* Gregorian day number */}
                  <span className={`text-[10px] sm:text-xs font-semibold ${
                    isSelected 
                      ? 'text-amber-100' 
                      : isGovtHoliday
                      ? 'text-emerald-700/80 dark:text-emerald-400/80'
                      : isSunday
                      ? 'text-rose-500/80 dark:text-rose-400/80'
                      : 'text-neutral-400 dark:text-neutral-500'
                  }`}>
                    ({day.gregorianDay})
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {/* Clear & identifiable Govt Holiday mini tag in green */}
                  {isGovtHoliday && !isSelected && (
                    <span 
                      className="text-[8px] sm:text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-700 dark:bg-emerald-600 text-white shadow-2xs font-odia shrink-0"
                      title={day.govtHolidayInfo ? `${day.govtHolidayInfo.nameOdia} (${day.govtHolidayInfo.nameEn}) - ଓଡ଼ିଶା ସରକାରୀ ଛୁଟି` : 'ଓଡ଼ିଶା ସରକାରୀ ଛୁଟି'}
                    >
                      ଛୁଟି
                    </span>
                  )}

                  {/* Odia solar day / Month day e.g. ୭ ବୈ */}
                  <span className={`text-[9px] sm:text-[10px] font-semibold font-odia px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-white/20 text-white' : isGovtHoliday ? 'bg-emerald-100/80 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}>
                    {day.odiaDayOfSolarMonthOdia}
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
                  {day.nakshatra.nameOdia}
                </div>
              </div>

              {/* Bottom Row: Centered Badges & Visual Indicators */}
              <div className="w-full flex items-center justify-center gap-1 mt-auto pt-1 overflow-hidden">
                {/* Ekadashi Indicator */}
                {isEkadashi && (
                  <span 
                    className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-amber-500 text-white shadow-2xs font-odia shrink-0"
                    title={`ଏକାଦଶୀ: ${day.tithi.nameOdia}`}
                  >
                    <Flame className="w-2.5 h-2.5" />
                    <span>ଏକାଦଶୀ</span>
                  </span>
                )}

                {/* Sankranti Indicator */}
                {isSankranti && (
                  <span 
                    className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-orange-600 text-white shadow-2xs font-odia shrink-0"
                    title="ସଂକ୍ରାନ୍ତି"
                  >
                    <Sun className="w-2.5 h-2.5" />
                    <span>ସଂକ୍ରାନ୍ତି</span>
                  </span>
                )}

                {/* Purnima Indicator (Full Moon) */}
                {isPurnima && (
                  <span 
                    className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-yellow-400 text-neutral-900 shadow-2xs font-odia shrink-0"
                    title="ପୂର୍ଣ୍ଣିମା (Full Moon)"
                  >
                    <span className="text-[9px]">🌕</span>
                    <span>ପୂର୍ଣ୍ଣିମା</span>
                  </span>
                )}

                {/* Amavasya Indicator (New Moon) */}
                {isAmavasya && (
                  <span 
                    className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-2xs font-odia shrink-0"
                    title="ଅମାବାସ୍ୟା (New Moon)"
                  >
                    <span className="text-[9px]">🌑</span>
                    <span>ଅମାବାସ୍ୟା</span>
                  </span>
                )}

                {/* Festival Dot or Badge */}
                {hasFestival && !isPurnima && !isAmavasya && !isEkadashi && !isSankranti && (
                  <span 
                    className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-rose-500 text-white truncate max-w-[90%] font-odia"
                    title={day.events[0]?.titleOdia}
                  >
                    <Sparkles className="w-2 h-2 shrink-0" />
                    <span className="truncate font-odia">{day.events[0]?.titleOdia.split(' ')[0]}</span>
                  </span>
                )}

                {/* Osha / Brata Badge */}
                {hasOshaBrata && !hasFestival && !isEkadashi && !isPurnima && !isAmavasya && (
                  <span 
                    className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold bg-teal-600 text-white font-odia"
                    title="ଓଷା / ବ୍ରତ"
                  >
                    ଓଷା
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
            <span className="w-3.5 h-3 rounded-md bg-emerald-100 dark:bg-emerald-950 border border-emerald-400 dark:border-emerald-700 flex items-center justify-center">
              <span className="text-[7px] font-bold text-emerald-800 dark:text-emerald-300 font-odia">ଛୁ</span>
            </span>
            <span className="font-odia text-emerald-900 dark:text-emerald-300 font-semibold">{isOdia ? 'ସରକାରୀ ଛୁଟି (Govt Holiday)' : 'Govt Holiday'}</span>
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
