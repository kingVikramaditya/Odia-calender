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

interface DailyPanchangPanelProps {
  day: PanchangDay;
  language: LanguageMode;
  onBookmark: (day: PanchangDay) => void;
  isBookmarked: boolean;
  onAddReminder: (day: PanchangDay) => void;
  onShare: (day: PanchangDay) => void;
  onViewChoghadiya?: () => void;
  onOpenModal?: () => void;
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
}) => {
  const isOdia = language === 'or';
  const isBoth = language === 'both';

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
            <span>ଦୃକ ସିଦ୍ଧାନ୍ତ ପଞ୍ଚାଙ୍ଗ</span>
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
              title={isBookmarked ? 'Bookmarked' : 'Bookmark this date'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              id="panel-reminder-btn"
              onClick={() => onAddReminder(day)}
              className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              title="Set Reminder"
            >
              <Bell className="w-4 h-4" />
            </button>

            <button
              id="panel-share-btn"
              onClick={() => onShare(day)}
              className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              title="Share Panchang"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 font-odia">
              {day.odiaMonthNameOdia} {day.odiaDayOfSolarMonthOdia} ଦିନ
            </span>
            <span className="text-xs text-neutral-400">•</span>
            <span className="text-xs font-semibold text-neutral-500">
              {day.dateStr}
            </span>
          </div>

          <h3 className="text-2xl font-black text-neutral-900 dark:text-white mt-1 font-odia tracking-tight">
            {isOdia 
              ? `${day.varaOdia}, ${day.tithi.nameOdia}` 
              : `${day.varaEn}, ${day.tithi.nameEn}`}
          </h3>

          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium font-odia mt-0.5">
            {toOdiaNumber(day.odiaYearSal)} ସାଲ • {toOdiaNumber(day.sakabda)} ଶକାବ୍ଦ • {toOdiaNumber(day.vikramSamvat)} ବିକ୍ରମ ସମ୍ବତ
          </p>

          {onOpenModal && (
            <button
              id="open-sankalpa-modal-btn"
              type="button"
              onClick={onOpenModal}
              className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white text-xs font-bold font-odia shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <Scroll className="w-4 h-4" />
              <span>ଦୈନିକ ସଂକଳ୍ପ ଓ ପପ୍-ଅପ୍ ଦେଖନ୍ତୁ (Sankalpa Popup)</span>
            </button>
          )}
        </div>
      </div>

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
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700/60 shadow-xs'
                    : 'bg-neutral-50/80 dark:bg-neutral-800/60 border-neutral-200/80 dark:border-neutral-700/80'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`flex items-center gap-1.5 text-xs font-bold font-odia ${
                    isGovt ? 'text-emerald-900 dark:text-emerald-300' : 'text-neutral-900 dark:text-neutral-200'
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
                      ସରକାରୀ ଛୁଟି
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-odia leading-relaxed">
                  {isOdia ? evt.significanceOdia : evt.significanceEn}
                </p>
                {evt.deityOdia && (
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium font-odia">
                    ଇଷ୍ଟଦେବ: {evt.deityOdia}
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
                {day.tithi.pakshaOdia}
              </span>
            </div>
            <div className="text-base font-extrabold text-neutral-900 dark:text-white font-odia truncate">
              {day.tithi.nameOdia}
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
              {toOdiaNumber(day.tithiProgressPercent)}% ସମାପ୍ତ
            </span>
          </div>
        </div>

        {/* Nakshatra Card */}
        <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/70 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
              <span>{isOdia ? 'ନକ୍ଷତ୍ର' : 'Nakshatra'}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-odia">
                ପଦ {toOdiaNumber(day.nakshatra.pada)}
              </span>
            </div>
            <div className="text-base font-extrabold text-neutral-900 dark:text-white font-odia truncate">
              {day.nakshatra.nameOdia}
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
              {toOdiaNumber(day.nakshatraProgressPercent)}% ସମାପ୍ତ
            </span>
          </div>
        </div>

        {/* Yoga Card */}
        <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/70">
          <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
            {isOdia ? 'ଯୋଗ' : 'Yoga'}
          </div>
          <div className="text-sm font-extrabold text-neutral-900 dark:text-white font-odia truncate">
            {day.yoga.nameOdia}
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
            {day.karana.nameOdia}
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
            କାର୍ଯ୍ୟ ସିଦ୍ଧି
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-neutral-800 border border-emerald-200/60 dark:border-emerald-900/40">
            <span className="text-[10px] text-neutral-500 font-odia block">{isOdia ? 'ବ୍ରାହ୍ମ ମୁହୂର୍ତ୍ତ' : 'Brahma Muhurta'}</span>
            <span className="font-bold text-neutral-800 dark:text-neutral-200 font-odia text-xs">
              {toOdiaNumber(day.timings.brahmaMuhurta.start)} - {toOdiaNumber(day.timings.brahmaMuhurta.end)}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-neutral-800 border border-emerald-200/60 dark:border-emerald-900/40">
            <span className="text-[10px] text-neutral-500 font-odia block">{isOdia ? 'ଅଭିଜିତ୍ ମୁହୂର୍ତ୍ତ' : 'Abhijit'}</span>
            <span className="font-bold text-neutral-800 dark:text-neutral-200 font-odia text-xs">
              {toOdiaNumber(day.timings.abhijit.start)} - {toOdiaNumber(day.timings.abhijit.end)}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-neutral-800 border border-emerald-200/60 dark:border-emerald-900/40">
            <span className="text-[10px] text-neutral-500 font-odia block">{isOdia ? 'ବିଜୟ ମୁହୂର୍ତ୍ତ' : 'Vijaya Muhurta'}</span>
            <span className="font-bold text-neutral-800 dark:text-neutral-200 font-odia text-xs">
              {toOdiaNumber(day.timings.vijayaMuhurta.start)} - {toOdiaNumber(day.timings.vijayaMuhurta.end)}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-neutral-800 border border-emerald-200/60 dark:border-emerald-900/40">
            <span className="text-[10px] text-neutral-500 font-odia block">{isOdia ? 'ଗୋଧୂଳି ମୁହୂର୍ତ୍ତ' : 'Godhuli'}</span>
            <span className="font-bold text-neutral-800 dark:text-neutral-200 font-odia text-xs">
              {toOdiaNumber(day.timings.godhuliMuhurta.start)} - {toOdiaNumber(day.timings.godhuliMuhurta.end)}
            </span>
          </div>
        </div>
      </div>

      {/* Drik Inauspicious Timings (ଅଶୁଭ ବେଳା / ରାହୁ କାଳ / ବାର ବେଳା) */}
      <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/70 dark:border-rose-800/50 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-bold text-rose-800 dark:text-rose-300 font-odia">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            {isOdia ? 'ଦୃକ ଅଶୁଭ ସମୟ (ବର୍ଜନୀୟ)' : 'Drik Inauspicious Periods'}
          </span>
          <span className="text-[10px] font-bold text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/60 px-2 py-0.5 rounded-full font-odia">
            ତ୍ୟାଜ୍ୟ
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-neutral-800 border border-rose-200/60 dark:border-rose-900/40">
            <span className="text-[10px] text-neutral-500 font-odia block">{isOdia ? 'ରାହୁ କାଳ' : 'Rahu Kala'}</span>
            <span className="font-bold text-rose-700 dark:text-rose-300 font-odia text-xs">
              {toOdiaNumber(day.timings.rahuKala.start)} - {toOdiaNumber(day.timings.rahuKala.end)}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-neutral-800 border border-rose-200/60 dark:border-rose-900/40">
            <span className="text-[10px] text-neutral-500 font-odia block">{isOdia ? 'ବାର ବେଳା' : 'Bara Bela'}</span>
            <span className="font-bold text-rose-700 dark:text-rose-300 font-odia text-xs">
              {toOdiaNumber(day.timings.baraBela.start)} - {toOdiaNumber(day.timings.baraBela.end)}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-neutral-800 border border-rose-200/60 dark:border-rose-900/40">
            <span className="text-[10px] text-neutral-500 font-odia block">{isOdia ? 'କାଳ ବେଳା' : 'Kala Bela'}</span>
            <span className="font-bold text-rose-700 dark:text-rose-300 font-odia text-xs">
              {toOdiaNumber(day.timings.kalaBela.start)} - {toOdiaNumber(day.timings.kalaBela.end)}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-neutral-800 border border-rose-200/60 dark:border-rose-900/40">
            <span className="text-[10px] text-neutral-500 font-odia block">{isOdia ? 'ଯମଗଣ୍ଡ' : 'Yamaganda'}</span>
            <span className="font-bold text-neutral-700 dark:text-neutral-300 font-odia text-xs">
              {toOdiaNumber(day.timings.yamaganda.start)} - {toOdiaNumber(day.timings.yamaganda.end)}
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
            ଦିବାରମାନ: {toOdiaNumber(day.timings.dayLength)}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700">
            <span className="text-[10px] text-neutral-400 block font-odia">{isOdia ? 'ସୂର୍ଯ୍ୟୋଦୟ' : 'Sunrise'}</span>
            <strong className="text-neutral-800 dark:text-neutral-200 font-odia">
              {toOdiaNumber(day.timings.sunrise)}
            </strong>
          </div>

          <div className="p-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700">
            <span className="text-[10px] text-neutral-400 block font-odia">{isOdia ? 'ସୂର୍ଯ୍ୟାସ୍ତ' : 'Sunset'}</span>
            <strong className="text-neutral-800 dark:text-neutral-200 font-odia">
              {toOdiaNumber(day.timings.sunset)}
            </strong>
          </div>

          <div className="p-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700">
            <span className="text-[10px] text-neutral-400 block font-odia">{isOdia ? 'ଚନ୍ଦ୍ରୋଦୟ' : 'Moonrise'}</span>
            <strong className="text-neutral-800 dark:text-neutral-200 font-odia">
              {toOdiaNumber(day.timings.moonrise)}
            </strong>
          </div>

          <div className="p-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700">
            <span className="text-[10px] text-neutral-400 block font-odia">{isOdia ? 'ଚନ୍ଦ୍ରାସ୍ତ' : 'Moonset'}</span>
            <strong className="text-neutral-800 dark:text-neutral-200 font-odia">
              {toOdiaNumber(day.timings.moonset)}
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
                {day.moonPhase.nameOdia} ({toOdiaNumber(day.moonPhase.illuminationPercent)}%)
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-purple-500" />
            <span>
              {isOdia ? 'ଚନ୍ଦ୍ର ରାଶି:' : 'Moon Sign:'}{' '}
              <strong className="font-odia text-neutral-900 dark:text-white">
                {day.rashi.moonSignOdia}
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
            {day.astrological.taraShuddhi.statusOdia}
          </span>
        </div>

        <div className="space-y-1.5 text-neutral-600 dark:text-neutral-300 font-odia pt-1">
          {day.astrological.chandrashtamaRashi && (
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">{isOdia ? 'ଚନ୍ଦ୍ରାଷ୍ଟମ ରାଶି:' : 'Chandrashtama:'}</span>
              <span className="font-bold text-rose-600 dark:text-rose-400">{day.astrological.chandrashtamaRashi} ରାଶି (ସାବଧାନ)</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-neutral-500">{isOdia ? 'ଘାତ ଚନ୍ଦ୍ର:' : 'Ghata Chandra:'}</span>
            <span className="font-bold text-neutral-800 dark:text-neutral-200">{day.astrological.ghataChandra.join(', ')}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-neutral-500">{isOdia ? 'ଯୋଗିନୀ ବାସ:' : 'Yogini Direction:'}</span>
            <span className="font-bold text-neutral-800 dark:text-neutral-200">
              {day.astrological.yogini.directionOdia} ({day.astrological.yogini.avoidTravelToOdia})
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
