import React from 'react';
import { 
  PanchangDay, 
  LanguageMode 
} from '../types';
import { 
  Sun, 
  Moon, 
  Clock, 
  Sparkles, 
  AlertTriangle, 
  Compass, 
  CheckCircle2, 
  Share2, 
  Bookmark, 
  Bell, 
  Flame, 
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  MapPin,
  Scroll,
  Landmark
} from 'lucide-react';
import { toOdiaNumber } from '../data/odiaConstants';
import { formatLocalDateKey, isCurrentTimeInWindow } from '../utils/panchangEngine';

interface DailyPanchangPanelProps {
  day: PanchangDay;
  language: LanguageMode;
  onBookmark: (day: PanchangDay) => void;
  isBookmarked: boolean;
  onAddReminder: (day: PanchangDay) => void;
  onShare: (day: PanchangDay) => void;
  onViewChoghadiya?: () => void;
  onOpenModal?: () => void;
  currentLiveTime?: Date;
}

export const DailyPanchangPanel: React.FC<DailyPanchangPanelProps> = ({
  day,
  language,
  onBookmark,
  isBookmarked,
  onAddReminder,
  onShare,
  onViewChoghadiya,
  onOpenModal,
  currentLiveTime,
}) => {
  const isOdia = language === 'or';
  const isBoth = language === 'both';

  const isViewingToday = currentLiveTime ? day.dateStr === formatLocalDateKey(currentLiveTime) : false;

  // Real-time active window detection
  const isAbhijitActive = isViewingToday && isCurrentTimeInWindow(currentLiveTime!, day.timings.abhijit.start, day.timings.abhijit.end);
  const isBrahmaActive = isViewingToday && isCurrentTimeInWindow(currentLiveTime!, day.timings.brahmaMuhurta.start, day.timings.brahmaMuhurta.end);
  const isVijayaActive = isViewingToday && isCurrentTimeInWindow(currentLiveTime!, day.timings.vijayaMuhurta.start, day.timings.vijayaMuhurta.end);
  const isGodhuliActive = isViewingToday && isCurrentTimeInWindow(currentLiveTime!, day.timings.godhuliMuhurta.start, day.timings.godhuliMuhurta.end);

  const isRahuKalaActive = isViewingToday && isCurrentTimeInWindow(currentLiveTime!, day.timings.rahuKala.start, day.timings.rahuKala.end);
  const isBaraBelaActive = isViewingToday && isCurrentTimeInWindow(currentLiveTime!, day.timings.baraBela.start, day.timings.baraBela.end);
  const isKalaBelaActive = isViewingToday && isCurrentTimeInWindow(currentLiveTime!, day.timings.kalaBela.start, day.timings.kalaBela.end);
  const isYamagandaActive = isViewingToday && isCurrentTimeInWindow(currentLiveTime!, day.timings.yamaganda.start, day.timings.yamaganda.end);

  return (
    <aside 
      id="daily-panchang-sidebar"
      className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm p-5 space-y-5 transition-colors"
    >
      {/* Selected Day Hero Card */}
      <div className="space-y-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80 font-odia">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{isOdia ? 'ଦୃକ ସିଦ୍ଧାନ୍ତ ପଞ୍ଚାଙ୍ଗ' : 'Drik Siddhanta Panchang'}</span>
          </div>

          {/* Action icons */}
          <div className="flex items-center gap-1">
            <button
              id="panel-bookmark-btn"
              onClick={() => onBookmark(day)}
              className={`p-2 rounded-xl border transition-all ${
                isBookmarked
                  ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/50 dark:border-rose-900 dark:text-rose-400 shadow-2xs'
                  : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100'
              }`}
              title={isBookmarked ? (isOdia ? 'ସଂରକ୍ଷିତ' : 'Bookmarked') : (isOdia ? 'ତାରିଖ ସଂରକ୍ଷଣ କରନ୍ତୁ' : 'Bookmark this date')}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              id="panel-reminder-btn"
              onClick={() => onAddReminder(day)}
              className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              title={isOdia ? 'ରିମାଇଣ୍ଡର ସେଟ୍ କରନ୍ତୁ' : 'Set Reminder'}
            >
              <Bell className="w-4 h-4" />
            </button>

            <button
              id="panel-share-btn"
              onClick={() => onShare(day)}
              className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              title={isOdia ? 'ପଞ୍ଚାଙ୍ଗ ସେୟାର୍ କରନ୍ତୁ' : 'Share Panchang'}
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 font-odia">
              {isOdia 
                ? `${day.solarMonthNameOdia || day.odiaMonthNameOdia} ${day.odiaDayOfSolarMonthOdia} ଦିନ` 
                : `${day.solarMonthNameEn || day.odiaMonthNameEn} - Day ${day.odiaDayOfSolarMonth}`}
            </span>
            <span className="text-xs text-neutral-400">•</span>
            <span className="text-xs font-semibold text-neutral-500 font-sans">
              {day.dateStr}
            </span>
            {isViewingToday && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border border-orange-300 dark:border-orange-800 shrink-0 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span>{isOdia ? 'ଆଜି' : 'TODAY'}</span>
              </span>
            )}
          </div>

          <h3 className="text-2xl font-black text-neutral-900 dark:text-white mt-1 font-odia tracking-tight">
            {isOdia 
              ? `${day.varaOdia}, ${day.tithi.nameOdia}` 
              : `${day.varaEn}, ${day.tithi.nameEn}`}
          </h3>

          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium font-odia mt-0.5">
            {isOdia 
              ? `${toOdiaNumber(day.odiaYearSal)} ସାଲ • ${toOdiaNumber(day.sakabda)} ଶକାବ୍ଦ • ${toOdiaNumber(day.vikramSamvat)} ବିକ୍ରମ ସମ୍ବତ`
              : `${day.odiaYearSal} Sal • ${day.sakabda} Sakabda • ${day.vikramSamvat} Vikram Samvat`}
          </p>

          {onOpenModal && (
            <button
              id="open-sankalpa-modal-btn"
              type="button"
              onClick={onOpenModal}
              className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white text-xs font-bold font-odia shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <Scroll className="w-4 h-4" />
              <span>{isOdia ? 'ଦୈନିକ ସଂକଳ୍ପ ଓ ପପ୍-ଅପ୍ ଦେଖନ୍ତୁ' : 'View Daily Sankalpa & Details'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Odisha Govt Holiday Notice (Sundays, 2nd/4th Saturday, or official gazette holidays) */}
      {day.isGovtHoliday && day.govtHolidayInfo && !day.events.some(e => e.isGovtHoliday) && (
        <div className="p-3 rounded-2xl space-y-1.5 transition-all border bg-emerald-100/80 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-700/80 shadow-xs border-t-2 border-t-emerald-600 dark:border-t-emerald-400">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-xs font-bold font-odia text-emerald-950 dark:text-emerald-200">
              <Landmark className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />
              <span>{isOdia ? day.govtHolidayInfo.nameOdia : isBoth ? `${day.govtHolidayInfo.nameOdia} (${day.govtHolidayInfo.nameEn})` : day.govtHolidayInfo.nameEn}</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-700 text-white font-odia shrink-0 shadow-2xs">
              {isOdia ? 'ସରକାରୀ ଛୁଟି' : 'Govt Holiday'}
            </span>
          </div>
          <p className="text-xs text-neutral-700 dark:text-neutral-300 font-odia leading-relaxed">
            {isOdia ? day.govtHolidayInfo.descriptionOdia : day.govtHolidayInfo.descriptionEn}
          </p>
        </div>
      )}

      {/* Festivals / Observance Highlight on this day (if any) */}
      {day.events && day.events.length > 0 && (
        <div className="space-y-2">
          {day.events.map((evt) => {
            const isGovt = evt.isGovtHoliday || evt.type === 'govt_holiday';
            return (
              <div
                key={evt.id}
                className={`p-3 rounded-2xl space-y-1.5 transition-all border ${
                  isGovt
                    ? 'bg-emerald-100/80 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-700/80 shadow-xs border-t-2 border-t-emerald-600 dark:border-t-emerald-400'
                    : 'bg-neutral-50/80 dark:bg-neutral-800/60 border-neutral-200/80 dark:border-neutral-700/80'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`flex items-center gap-1.5 text-xs font-bold font-odia ${
                    isGovt ? 'text-emerald-900 dark:text-emerald-200' : 'text-neutral-900 dark:text-neutral-200'
                  }`}>
                    {isGovt ? (
                      <Landmark className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <Flame className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                    )}
                    <span>{isOdia ? evt.titleOdia : isBoth ? `${evt.titleOdia} (${evt.titleEn})` : evt.titleEn}</span>
                  </span>
                  {isGovt && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white font-odia shrink-0 shadow-2xs">
                      {isOdia ? 'ସରକାରୀ ଛୁଟି' : 'Govt Holiday'}
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-odia leading-relaxed">
                  {isOdia ? evt.significanceOdia : evt.significanceEn}
                </p>
                {evt.deityOdia && (
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium font-odia">
                    {isOdia ? `ଇଷ୍ଟଦେବ: ${evt.deityOdia}` : `Deity: ${evt.deityEn || evt.deityOdia}`}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Primary Panchang Limbs with Drik Progress Bars */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Tithi Card */}
        <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/70 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
              <span>{isOdia ? 'ତିଥି' : 'Tithi'}</span>
              <span className="text-[10px] text-orange-600 dark:text-orange-400 font-odia font-semibold">
                {isOdia ? `${day.lunarMonthNameOdia || day.odiaMonthNameOdia} (${day.tithi.pakshaOdia})` : `${day.lunarMonthNameEn || day.odiaMonthNameEn} (${day.tithi.pakshaEn})`}
              </span>
            </div>
            <div className="text-base font-extrabold text-neutral-900 dark:text-white font-odia truncate">
              {isOdia ? day.tithi.nameOdia : day.tithi.nameEn}
            </div>
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 font-odia">
              {isOdia ? `ଶେଷ: ${toOdiaNumber(day.tithi.endTime)}` : `Ends: ${day.tithi.endTime}`}
            </div>
          </div>

          {/* Drik Progress Bar */}
          <div className="mt-2.5 space-y-1">
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-orange-500 h-full rounded-full transition-all"
                style={{ width: `${day.tithiProgressPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-neutral-400 block text-right font-odia">
              {isOdia ? `${toOdiaNumber(day.tithiProgressPercent)}% ସମାପ୍ତ` : `${day.tithiProgressPercent}% Completed`}
            </span>
          </div>
        </div>

        {/* Nakshatra Card */}
        <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/70 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
              <span>{isOdia ? 'ନକ୍ଷତ୍ର' : 'Nakshatra'}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-odia">
                {isOdia ? `ପଦ ${toOdiaNumber(day.nakshatra.pada)}` : `Pada ${day.nakshatra.pada}`}
              </span>
            </div>
            <div className="text-base font-extrabold text-neutral-900 dark:text-white font-odia truncate">
              {isOdia ? day.nakshatra.nameOdia : day.nakshatra.nameEn}
            </div>
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 font-odia">
              {isOdia ? `ଶେଷ: ${toOdiaNumber(day.nakshatra.endTime)}` : `Ends: ${day.nakshatra.endTime}`}
            </div>
          </div>

          <div className="mt-2.5 space-y-1">
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all"
                style={{ width: `${day.nakshatraProgressPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-neutral-400 block text-right font-odia">
              {isOdia ? `${toOdiaNumber(day.nakshatraProgressPercent)}% ସମାପ୍ତ` : `${day.nakshatraProgressPercent}% Completed`}
            </span>
          </div>
        </div>

        {/* Yoga Card */}
        <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/70">
          <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            {isOdia ? 'ଯୋଗ' : 'Yoga'}
          </div>
          <div className="text-sm font-extrabold text-neutral-900 dark:text-white font-odia truncate">
            {isOdia ? day.yoga.nameOdia : day.yoga.nameEn}
          </div>
          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 font-odia">
            {isOdia ? `ଶେଷ: ${toOdiaNumber(day.yoga.endTime)}` : `Ends: ${day.yoga.endTime}`}
          </div>
        </div>

        {/* Karana Card */}
        <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/70">
          <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            {isOdia ? 'କରଣ' : 'Karana'}
          </div>
          <div className="text-sm font-extrabold text-neutral-900 dark:text-white font-odia truncate">
            {isOdia ? day.karana.nameOdia : day.karana.nameEn}
          </div>
          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 font-odia">
            {isOdia ? `ଶେଷ: ${toOdiaNumber(day.karana.endTime)}` : `Ends: ${day.karana.endTime}`}
          </div>
        </div>
      </div>

      {/* Drik Auspicious Timings Bento */}
      <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-800/50 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 font-odia">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            {isOdia ? 'ଦୃକ ଶୁଭ ବେଳା ଓ ମୁହୂର୍ତ୍ତ' : 'Drik Auspicious Windows'}
          </span>
          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full font-odia">
            {isOdia ? 'କାର୍ଯ୍ୟ ସିଦ୍ଧି' : 'Auspicious'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className={`p-2.5 rounded-xl border transition-all ${
            isBrahmaActive 
              ? 'bg-emerald-100/90 dark:bg-emerald-950/70 border-emerald-500 shadow-sm ring-2 ring-emerald-500/40' 
              : 'bg-white/80 dark:bg-neutral-800 border-emerald-200/60 dark:border-emerald-900/40'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-500 font-odia block">{isOdia ? 'ବ୍ରାହ୍ମ ମୁହୂର୍ତ୍ତ' : 'Brahma Muhurta'}</span>
              {isBrahmaActive && (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-600 text-white animate-pulse">
                  <span>{isOdia ? 'ଚାଲୁଅଛି' : 'NOW'}</span>
                </span>
              )}
            </div>
            <span className="font-bold text-neutral-800 dark:text-neutral-200 font-odia text-xs">
              {isOdia 
                ? `${toOdiaNumber(day.timings.brahmaMuhurta.start)} - ${toOdiaNumber(day.timings.brahmaMuhurta.end)}` 
                : `${day.timings.brahmaMuhurta.start} - ${day.timings.brahmaMuhurta.end}`}
            </span>
          </div>

          <div className={`p-2.5 rounded-xl border transition-all ${
            isAbhijitActive 
              ? 'bg-emerald-100/90 dark:bg-emerald-950/70 border-emerald-500 shadow-sm ring-2 ring-emerald-500/40' 
              : 'bg-white/80 dark:bg-neutral-800 border-emerald-200/60 dark:border-emerald-900/40'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-500 font-odia block">{isOdia ? 'ଅଭିଜିତ୍ ମୁହୂର୍ତ୍ତ' : 'Abhijit Muhurta'}</span>
              {isAbhijitActive && (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-600 text-white animate-pulse">
                  <span>{isOdia ? 'ଚାଲୁଅଛି' : 'NOW'}</span>
                </span>
              )}
            </div>
            <span className="font-bold text-neutral-800 dark:text-neutral-200 font-odia text-xs">
              {isOdia 
                ? `${toOdiaNumber(day.timings.abhijit.start)} - ${toOdiaNumber(day.timings.abhijit.end)}` 
                : `${day.timings.abhijit.start} - ${day.timings.abhijit.end}`}
            </span>
          </div>

          <div className={`p-2.5 rounded-xl border transition-all ${
            isVijayaActive 
              ? 'bg-emerald-100/90 dark:bg-emerald-950/70 border-emerald-500 shadow-sm ring-2 ring-emerald-500/40' 
              : 'bg-white/80 dark:bg-neutral-800 border-emerald-200/60 dark:border-emerald-900/40'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-500 font-odia block">{isOdia ? 'ବିଜୟ ମୁହୂର୍ତ୍ତ' : 'Vijaya Muhurta'}</span>
              {isVijayaActive && (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-600 text-white animate-pulse">
                  <span>{isOdia ? 'ଚାଲୁଅଛି' : 'NOW'}</span>
                </span>
              )}
            </div>
            <span className="font-bold text-neutral-800 dark:text-neutral-200 font-odia text-xs">
              {isOdia 
                ? `${toOdiaNumber(day.timings.vijayaMuhurta.start)} - ${toOdiaNumber(day.timings.vijayaMuhurta.end)}` 
                : `${day.timings.vijayaMuhurta.start} - ${day.timings.vijayaMuhurta.end}`}
            </span>
          </div>

          <div className={`p-2.5 rounded-xl border transition-all ${
            isGodhuliActive 
              ? 'bg-emerald-100/90 dark:bg-emerald-950/70 border-emerald-500 shadow-sm ring-2 ring-emerald-500/40' 
              : 'bg-white/80 dark:bg-neutral-800 border-emerald-200/60 dark:border-emerald-900/40'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-500 font-odia block">{isOdia ? 'ଗୋଧୂଳି ମୁହୂର୍ତ୍ତ' : 'Godhuli Muhurta'}</span>
              {isGodhuliActive && (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-600 text-white animate-pulse">
                  <span>{isOdia ? 'ଚାଲୁଅଛି' : 'NOW'}</span>
                </span>
              )}
            </div>
            <span className="font-bold text-neutral-800 dark:text-neutral-200 font-odia text-xs">
              {isOdia 
                ? `${toOdiaNumber(day.timings.godhuliMuhurta.start)} - ${toOdiaNumber(day.timings.godhuliMuhurta.end)}` 
                : `${day.timings.godhuliMuhurta.start} - ${day.timings.godhuliMuhurta.end}`}
            </span>
          </div>
        </div>
      </div>

      {/* Drik Inauspicious Timings (ଅଶୁଭ ବେଳା / ରାହୁ କାଳ / ବାର ବେଳା) */}
      <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/70 dark:border-rose-800/50 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-bold text-rose-800 dark:text-rose-300 font-odia">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>{isOdia ? 'ଦୃକ ଅଶୁଭ ସମୟ (ବର୍ଜନୀୟ)' : 'Drik Inauspicious Periods'}</span>
          </span>
          <span className="text-[10px] font-bold text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/60 px-2 py-0.5 rounded-full font-odia">
            {isOdia ? 'ତ୍ୟାଜ୍ୟ' : 'Avoid'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className={`p-2.5 rounded-xl border transition-all ${
            isRahuKalaActive 
              ? 'bg-rose-100/90 dark:bg-rose-950/70 border-rose-500 shadow-sm ring-2 ring-rose-500/50' 
              : 'bg-white/80 dark:bg-neutral-800 border-rose-200/60 dark:border-rose-900/40'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-500 font-odia block">{isOdia ? 'ରାହୁ କାଳ' : 'Rahu Kala'}</span>
              {isRahuKalaActive && (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-rose-600 text-white animate-pulse">
                  <span>{isOdia ? 'ସକ୍ରିୟ' : 'NOW'}</span>
                </span>
              )}
            </div>
            <span className="font-bold text-rose-700 dark:text-rose-300 font-odia text-xs">
              {isOdia 
                ? `${toOdiaNumber(day.timings.rahuKala.start)} - ${toOdiaNumber(day.timings.rahuKala.end)}` 
                : `${day.timings.rahuKala.start} - ${day.timings.rahuKala.end}`}
            </span>
          </div>

          <div className={`p-2.5 rounded-xl border transition-all ${
            isBaraBelaActive 
              ? 'bg-rose-100/90 dark:bg-rose-950/70 border-rose-500 shadow-sm ring-2 ring-rose-500/50' 
              : 'bg-white/80 dark:bg-neutral-800 border-rose-200/60 dark:border-rose-900/40'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-500 font-odia block">{isOdia ? 'ବାର ବେଳା' : 'Bara Bela'}</span>
              {isBaraBelaActive && (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-rose-600 text-white animate-pulse">
                  <span>{isOdia ? 'ସକ୍ରିୟ' : 'NOW'}</span>
                </span>
              )}
            </div>
            <span className="font-bold text-rose-700 dark:text-rose-300 font-odia text-xs">
              {isOdia 
                ? `${toOdiaNumber(day.timings.baraBela.start)} - ${toOdiaNumber(day.timings.baraBela.end)}` 
                : `${day.timings.baraBela.start} - ${day.timings.baraBela.end}`}
            </span>
          </div>

          <div className={`p-2.5 rounded-xl border transition-all ${
            isKalaBelaActive 
              ? 'bg-rose-100/90 dark:bg-rose-950/70 border-rose-500 shadow-sm ring-2 ring-rose-500/50' 
              : 'bg-white/80 dark:bg-neutral-800 border-rose-200/60 dark:border-rose-900/40'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-500 font-odia block">{isOdia ? 'କାଳ ବେଳା' : 'Kala Bela'}</span>
              {isKalaBelaActive && (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-rose-600 text-white animate-pulse">
                  <span>{isOdia ? 'ସକ୍ରିୟ' : 'NOW'}</span>
                </span>
              )}
            </div>
            <span className="font-bold text-rose-700 dark:text-rose-300 font-odia text-xs">
              {isOdia 
                ? `${toOdiaNumber(day.timings.kalaBela.start)} - ${toOdiaNumber(day.timings.kalaBela.end)}` 
                : `${day.timings.kalaBela.start} - ${day.timings.kalaBela.end}`}
            </span>
          </div>

          <div className={`p-2.5 rounded-xl border transition-all ${
            isYamagandaActive 
              ? 'bg-rose-100/90 dark:bg-rose-950/70 border-rose-500 shadow-sm ring-2 ring-rose-500/50' 
              : 'bg-white/80 dark:bg-neutral-800 border-rose-200/60 dark:border-rose-900/40'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-500 font-odia block">{isOdia ? 'ଯମଗଣ୍ଡ' : 'Yamaganda'}</span>
              {isYamagandaActive && (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-rose-600 text-white animate-pulse">
                  <span>{isOdia ? 'ସକ୍ରିୟ' : 'NOW'}</span>
                </span>
              )}
            </div>
            <span className="font-bold text-neutral-700 dark:text-neutral-300 font-odia text-xs">
              {isOdia 
                ? `${toOdiaNumber(day.timings.yamaganda.start)} - ${toOdiaNumber(day.timings.yamaganda.end)}` 
                : `${day.timings.yamaganda.start} - ${day.timings.yamaganda.end}`}
            </span>
          </div>
        </div>
      </div>

      {/* Sun & Moon Timings */}
      <div className="p-4 rounded-2xl bg-neutral-50/80 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-neutral-700/70 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-neutral-700 dark:text-neutral-300">
          <span className="flex items-center gap-1.5 font-odia">
            <Sun className="w-4 h-4 text-amber-500" />
            {isOdia ? 'ସୂର୍ଯ୍ୟ ଓ ଚନ୍ଦ୍ର ସମୟ' : 'Sun & Moon Ephemeris'}
          </span>
          <span className="text-[11px] font-semibold text-neutral-400 font-odia">
            {isOdia ? `ଦିବାରମାନ: ${toOdiaNumber(day.timings.dayLength)}` : `Day Length: ${day.timings.dayLength}`}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700">
            <span className="text-[10px] text-neutral-400 block font-odia">{isOdia ? 'ସୂର୍ଯ୍ୟୋଦୟ' : 'Sunrise'}</span>
            <strong className="text-neutral-800 dark:text-neutral-200 font-odia">
              {isOdia ? toOdiaNumber(day.timings.sunrise) : day.timings.sunrise}
            </strong>
          </div>

          <div className="p-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700">
            <span className="text-[10px] text-neutral-400 block font-odia">{isOdia ? 'ସୂର୍ଯ୍ୟାସ୍ତ' : 'Sunset'}</span>
            <strong className="text-neutral-800 dark:text-neutral-200 font-odia">
              {isOdia ? toOdiaNumber(day.timings.sunset) : day.timings.sunset}
            </strong>
          </div>

          <div className="p-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700">
            <span className="text-[10px] text-neutral-400 block font-odia">{isOdia ? 'ଚନ୍ଦ୍ରୋଦୟ' : 'Moonrise'}</span>
            <strong className="text-neutral-800 dark:text-neutral-200 font-odia">
              {isOdia ? toOdiaNumber(day.timings.moonrise) : day.timings.moonrise}
            </strong>
          </div>

          <div className="p-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700">
            <span className="text-[10px] text-neutral-400 block font-odia">{isOdia ? 'ଚନ୍ଦ୍ରାସ୍ତ' : 'Moonset'}</span>
            <strong className="text-neutral-800 dark:text-neutral-200 font-odia">
              {isOdia ? toOdiaNumber(day.timings.moonset) : day.timings.moonset}
            </strong>
          </div>
        </div>

        {/* Moon Phase & Rashi info */}
        <div className="flex flex-wrap items-center justify-between pt-2 border-t border-neutral-200/60 dark:border-neutral-700/60 text-xs text-neutral-600 dark:text-neutral-300">
          <div className="flex items-center gap-1.5">
            <Moon className="w-3.5 h-3.5 text-indigo-500" />
            <span>
              {isOdia ? 'ଚନ୍ଦ୍ର କଳା:' : 'Moon Phase:'}{' '}
              <strong className="font-odia text-neutral-900 dark:text-white">
                {isOdia ? day.moonPhase.nameOdia : (day.moonPhase.nameEn || day.moonPhase.nameOdia)} ({isOdia ? toOdiaNumber(day.moonPhase.illuminationPercent) : day.moonPhase.illuminationPercent}%)
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-purple-500" />
            <span>
              {isOdia ? 'ଚନ୍ଦ୍ର ରାଶି:' : 'Moon Sign:'}{' '}
              <strong className="font-odia text-neutral-900 dark:text-white">
                {isOdia ? day.rashi.moonSignOdia : day.rashi.moonSignEn}
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* Astrological Shuddhi & Chandrashtama */}
      <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/70 dark:border-neutral-700/70 space-y-2 text-xs">
        <div className="font-bold text-neutral-800 dark:text-neutral-200 font-odia flex items-center justify-between">
          <span>{isOdia ? 'ତାରା ଶୁଦ୍ଧି ଓ ଘାତ ଚନ୍ଦ୍ର' : 'Astrological Shuddhi'}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            day.astrological.taraShuddhi.isShubha 
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
          }`}>
            {isOdia ? day.astrological.taraShuddhi.statusOdia : day.astrological.taraShuddhi.statusEn}
          </span>
        </div>

        <div className="space-y-1.5 text-neutral-600 dark:text-neutral-300 font-odia pt-1">
          {day.astrological.chandrashtamaRashi && (
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">{isOdia ? 'ଚନ୍ଦ୍ରାଷ୍ଟମ ରାଶି:' : 'Chandrashtama:'}</span>
              <span className="font-bold text-rose-600 dark:text-rose-400">
                {isOdia ? `${day.astrological.chandrashtamaRashi} ରାଶି (ସାବଧାନ)` : `${day.astrological.chandrashtamaRashi} Rashi (Caution)`}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-neutral-500">{isOdia ? 'ଘାତ ଚନ୍ଦ୍ର:' : 'Ghata Chandra:'}</span>
            <span className="font-bold text-neutral-800 dark:text-neutral-200">{day.astrological.ghataChandra.join(', ')}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-neutral-500">{isOdia ? 'ଯୋଗିନୀ ବାସ:' : 'Yogini Direction:'}</span>
            <span className="font-bold text-neutral-800 dark:text-neutral-200">
              {isOdia 
                ? `${day.astrological.yogini.directionOdia} (${day.astrological.yogini.avoidTravelToOdia})` 
                : `${day.astrological.yogini.directionEn} (Avoid: ${day.astrological.yogini.avoidTravelToEn || day.astrological.yogini.directionEn})`}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
