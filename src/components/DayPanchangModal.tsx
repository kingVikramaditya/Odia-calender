import React, { useState, useMemo } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Scroll, 
  Sparkles, 
  Sun, 
  Moon, 
  Clock, 
  ShieldCheck, 
  Bookmark, 
  Share2, 
  Flame, 
  User, 
  Compass, 
  CalendarDays,
  AlertTriangle,
  Info,
  Landmark
} from 'lucide-react';
import { PanchangDay, LanguageMode } from '../types';
import { toOdiaNumber } from '../data/odiaConstants';
import { generateSankalpa } from '../utils/sankalpaEngine';

interface DayPanchangModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: PanchangDay;
  language: LanguageMode;
  onBookmark?: (day: PanchangDay) => void;
  onShare?: (day: PanchangDay) => void;
  isBookmarked?: boolean;
}

export const DayPanchangModal: React.FC<DayPanchangModalProps> = ({
  isOpen,
  onClose,
  day,
  language,
  onBookmark,
  onShare,
  isBookmarked = false,
}) => {
  const [activeTab, setActiveTab] = useState<'sankalpa' | 'panchang' | 'muhurta' | 'choghadiya'>('sankalpa');
  const [sankalpaType, setSankalpaType] = useState<'laghu' | 'vistrut'>('laghu');
  const [gotra, setGotra] = useState('କାଶ୍ୟପ');
  const [name, setName] = useState('ଅମୁକ ଶର୍ମା');
  const [copied, setCopied] = useState(false);

  const isOdia = language === 'or';
  const isBoth = language === 'both';

  // Generate dynamic Vedic Sankalpa based on current astronomical day coordinates
  const sankalpa = useMemo(() => {
    return generateSankalpa(day, gotra.trim() || 'କାଶ୍ୟପ', name.trim() || 'ଅମୁକ ଶର୍ମା');
  }, [day, gotra, name]);

  if (!isOpen) return null;

  const currentSankalpaText = sankalpaType === 'laghu' ? sankalpa.laghuSanskrit : sankalpa.vistrutSanskrit;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSankalpaText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div 
      id="day-panchang-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm overflow-hidden animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="day-panchang-modal-card"
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden overflow-x-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="relative p-5 sm:p-6 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-rose-500/10 dark:from-orange-950/40 dark:via-neutral-900 dark:to-neutral-900 border-b border-neutral-200/80 dark:border-neutral-800">
          <div className="flex items-start justify-between gap-4">
            <div>
              {/* Odia month & day badge */}
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-600 text-white shadow-2xs font-odia">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{isOdia ? `${day.solarMonthNameOdia || day.odiaMonthNameOdia} ${day.odiaDayOfSolarMonthOdia} ଦିନ` : `${day.solarMonthNameEn || day.odiaMonthNameEn} Day ${day.odiaDayOfSolarMonth}`}</span>
                </span>
                
                <span className="text-xs font-bold text-orange-700 dark:text-orange-400 font-odia bg-orange-100/80 dark:bg-orange-950/60 px-2.5 py-0.5 rounded-full border border-orange-200 dark:border-orange-800/80">
                  {isOdia ? `${toOdiaNumber(day.odiaYearSal)} ସାଲ • ${toOdiaNumber(day.sakabda)} ଶକାବ୍ଦ` : `Sal: ${day.odiaYearSal} • Sakabda: ${day.sakabda}`}
                </span>

                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  {day.dateStr} ({isOdia ? day.varaOdia : day.varaEn})
                </span>

                {/* Odisha Govt Holiday Header Badge */}
                {day.isGovtHoliday && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 font-odia border border-rose-200 dark:border-rose-900">
                    <Landmark className="w-3 h-3 text-rose-500" />
                    <span>{isOdia ? 'ସରକାରୀ ଛୁଟି' : 'Govt Holiday'}</span>
                  </span>
                )}
              </div>

              {/* Title: Big Tithi & Vara */}
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white font-odia tracking-tight">
                {isOdia 
                  ? `${day.tithi.pakshaOdia} ${day.tithi.nameOdia} • ${day.varaOdia}`
                  : `${day.tithi.pakshaEn} ${day.tithi.nameEn} • ${day.varaEn}`}
              </h2>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-odia mt-1">
                {isOdia ? (
                  <>
                    ନକ୍ଷତ୍ର: <strong className="text-neutral-900 dark:text-white">{day.nakshatra.nameOdia}</strong> ({day.nakshatra.pada} ପାଦ) • ଯୋଗ: <strong className="text-neutral-900 dark:text-white">{day.yoga.nameOdia}</strong> • କରଣ: <strong className="text-neutral-900 dark:text-white">{day.karana.nameOdia}</strong>
                  </>
                ) : (
                  <>
                    Nakshatra: <strong className="text-neutral-900 dark:text-white">{day.nakshatra.nameEn}</strong> (Pada {day.nakshatra.pada}) • Yoga: <strong className="text-neutral-900 dark:text-white">{day.yoga.nameEn}</strong> • Karana: <strong className="text-neutral-900 dark:text-white">{day.karana.nameEn}</strong>
                  </>
                )}
              </p>
            </div>

            {/* Actions: Bookmark, Share, Close */}
            <div className="flex items-center gap-1.5 shrink-0">
              {onBookmark && (
                <button
                  type="button"
                  onClick={() => onBookmark(day)}
                  className={`p-2 rounded-xl border transition-all ${
                    isBookmarked 
                      ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950 dark:border-rose-900 dark:text-rose-400' 
                      : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100'
                  }`}
                  title="Bookmark date"
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
              )}

              {onShare && (
                <button
                  type="button"
                  onClick={() => onShare(day)}
                  className="p-2 rounded-xl bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 transition-colors"
                  title="Share Panchang"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              )}

              <button
                id="close-day-panchang-modal"
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Tab Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto mt-4 pt-1 font-odia">
            <button
              type="button"
              onClick={() => setActiveTab('sankalpa')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'sankalpa'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-white/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-orange-50 border border-neutral-200/80 dark:border-neutral-700'
              }`}
            >
              <Scroll className="w-4 h-4" />
              <span>{isOdia ? 'ଦୈନିକ ସଂକଳ୍ପ' : 'Daily Sankalpa'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('panchang')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'panchang'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-white/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-orange-50 border border-neutral-200/80 dark:border-neutral-700'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isOdia ? 'ବିସ୍ତୃତ ପଞ୍ଚାଙ୍ଗ' : 'Detailed Panchang'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('muhurta')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'muhurta'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-white/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-orange-50 border border-neutral-200/80 dark:border-neutral-700'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{isOdia ? 'ଶୁଭ ଓ ଅଶୁଭ ବେଳା' : 'Muhurtas'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('choghadiya')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'choghadiya'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-white/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-orange-50 border border-neutral-200/80 dark:border-neutral-700'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>{isOdia ? 'ଚୌଘଡ଼ିଆ' : 'Choghadiya'}</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: SANKALPA (Lagh & Vistrut) */}
          {activeTab === 'sankalpa' && (
            <div className="space-y-6 animate-fade-in font-odia">
              
              {/* Type Switcher: Laghu vs Vistrut */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-amber-50/70 dark:bg-neutral-800/80 border border-amber-200/80 dark:border-neutral-700">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wide">
                      {isOdia ? 'ସଂକଳ୍ପ ପ୍ରକାର' : 'Select Sankalpa Format'}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200/80 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-bold">
                      {isOdia ? 'ବୈଦିକ ସିଦ୍ଧାନ୍ତ' : 'Vedic Principle'}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300">
                    {isOdia 
                      ? 'ପୂଜାରମ୍ଭ ପୂର୍ବରୁ ହାତରେ ଜଳ, ପୁଷ୍ପ ଓ ଚନ୍ଦନ ଧାରଣ କରି ଏହି ସଂକଳ୍ପ ପାଠ କରନ୍ତୁ ।'
                      : 'Take water, flowers, and sandalwood paste in hand and recite this Sankalpa before starting worship.'}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-white dark:bg-neutral-900 p-1 rounded-xl border border-amber-200 dark:border-neutral-700 shrink-0">
                  <button
                    type="button"
                    onClick={() => setSankalpaType('laghu')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      sankalpaType === 'laghu'
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900'
                    }`}
                  >
                    {isOdia ? 'ଲଘୁ ସଂକଳ୍ପ (Laghu)' : 'Laghu (Brief)'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSankalpaType('vistrut')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      sankalpaType === 'vistrut'
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900'
                    }`}
                  >
                    {isOdia ? 'ବିସ୍ତୃତ ସଂକଳ୍ପ (Vistrut)' : 'Vistrut (Detailed)'}
                  </button>
                </div>
              </div>

              {/* Personalization Inputs: Gotra & Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    {isOdia ? 'ନିଜର ଗୋତ୍ର (Your Gotra):' : 'Your Gotra:'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={gotra}
                      onChange={(e) => setGotra(e.target.value)}
                      placeholder={isOdia ? "e.g. କାଶ୍ୟପ / ଭାରଦ୍ୱାଜ / ନାଗସ୍ୟ" : "e.g. Kashyapa / Bharadwaja"}
                      className="w-full px-3 py-2 text-sm rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-orange-500 font-odia"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    {isOdia ? 'ନିଜର ନାମ (Your Name / Yajamana):' : 'Your Name / Devotee:'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={isOdia ? "e.g. ନନ୍ଦନ ଶର୍ମା / ଦାସ" : "e.g. Nandan Sharma / Das"}
                      className="w-full px-3 py-2 text-sm rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-orange-500 font-odia"
                    />
                  </div>
                </div>
              </div>

              {/* Main Sankalpa Card */}
              <div className="relative rounded-3xl bg-linear-to-b from-orange-50/60 to-white dark:from-neutral-800/90 dark:to-neutral-900 border-2 border-orange-200 dark:border-orange-900/60 p-5 sm:p-7 shadow-sm space-y-4">
                
                {/* Header bar inside card */}
                <div className="flex items-center justify-between gap-3 border-b border-orange-200/70 dark:border-neutral-700/80 pb-3">
                  <div className="flex items-center gap-2">
                    <Scroll className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white font-odia">
                      {sankalpaType === 'laghu' 
                        ? (isOdia ? 'ଦୈନିକ ଲଘୁ ସଂକଳ୍ପ ମନ୍ତ୍ର' : 'Daily Laghu Sankalpa') 
                        : (isOdia ? 'ବୈଦିକ ବିସ୍ତୃତ ମହାସଂକଳ୍ପ ପାଠ' : 'Vedic Detailed Maha Sankalpa')}
                    </h3>
                  </div>

                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer font-sans"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? (isOdia ? 'କପି ହୋଇଗଲା!' : 'Copied!') : (isOdia ? 'ସଂକଳ୍ପ କପି କରନ୍ତୁ' : 'Copy Sankalpa')}</span>
                  </button>
                </div>

                {/* Mantra Text Display with Large, Clear Typography */}
                <div className="p-5 sm:p-7 rounded-2xl bg-amber-50/70 dark:bg-neutral-950/90 border border-amber-200/80 dark:border-neutral-800 text-center">
                  <p className="text-lg sm:text-2xl leading-loose text-neutral-950 dark:text-white font-odia font-bold whitespace-pre-line text-center">
                    {currentSankalpaText}
                  </p>
                </div>

                {/* Meaning & Explanations */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-700/80 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wide">
                    <Info className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
                    <span>{isOdia ? 'ସଂକଳ୍ପର ଭାବାର୍ଥ ଓ କାଳ-ସ୍ଥିତି' : 'Significance & Cosmic Placement'}</span>
                  </div>
                  <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-100 leading-relaxed font-odia whitespace-pre-line text-justify">
                    {sankalpaType === 'laghu' ? sankalpa.laghuOdiaMeaning : sankalpa.vistrutOdiaMeaning}
                  </p>
                </div>
              </div>

              {/* Cosmic Coordinates Grid */}
              <div className="rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700/70 p-4">
                <h4 className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-3">
                  {isOdia ? 'ଆଜିର ଖଗୋଳୀୟ ଓ କାଳଚକ୍ର ନିର୍ଦ୍ଦେଶାଙ୍କ' : 'Vedic Cosmic Coordinates'}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700">
                    <span className="text-[10px] text-neutral-400 block">{isOdia ? 'କଳ୍ପ ଓ ମନ୍ୱନ୍ତର' : 'Kalpa & Manvantara'}</span>
                    <strong className="text-neutral-800 dark:text-neutral-200 font-odia">{sankalpa.kalpa}, {sankalpa.manvantara}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700">
                    <span className="text-[10px] text-neutral-400 block">{isOdia ? 'ସମ୍ବତ୍ସର ଓ ଅୟନ' : 'Samvatsara & Ayana'}</span>
                    <strong className="text-neutral-800 dark:text-neutral-200 font-odia">
                      {sankalpa.samvatsaraName}, {isOdia ? sankalpa.ayanaOdia : (sankalpa.ayanaOdia.includes('ଉତ୍ତର') ? 'Uttarayana' : 'Dakshinayana')}
                    </strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700">
                    <span className="text-[10px] text-neutral-400 block">{isOdia ? 'ଋତୁ ଓ ସୌର ମାସ' : 'Season & Solar Month'}</span>
                    <strong className="text-neutral-800 dark:text-neutral-200 font-odia">
                      {isOdia ? `${sankalpa.rutuOdia} ଋତୁ, ${day.solarMonthNameOdia || day.odiaMonthNameOdia} ${day.odiaDayOfSolarMonthOdia} ଦିନ (ଚାନ୍ଦ୍ର ${day.lunarMonthNameOdia || day.odiaMonthNameOdia} ମାସ)` : `${day.rutuEn || day.rutuOdia} Season, ${day.solarMonthNameEn || day.odiaMonthNameEn} Day ${day.odiaDayOfSolarMonth} (${day.lunarMonthNameEn || day.odiaMonthNameEn})`}
                    </strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700">
                    <span className="text-[10px] text-neutral-400 block">{isOdia ? 'ଯୋଗ ଓ କରଣ' : 'Yoga & Karana'}</span>
                    <strong className="text-neutral-800 dark:text-neutral-200 font-odia">{isOdia ? `${day.yoga.nameOdia}, ${day.karana.nameOdia}` : `${day.yoga.nameEn}, ${day.karana.nameEn}`}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DETAILED PANCHANG */}
          {activeTab === 'panchang' && (
            <div className="space-y-5 animate-fade-in font-odia">
              {/* Odisha Govt Holiday Notice Banner if applicable */}
              {day.isGovtHoliday && day.govtHolidayInfo && (
                <div className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200">
                        {day.govtHolidayInfo.type === 'gazetted' 
                          ? (isOdia ? 'ଗେଜେଟେଡ୍ ସରକାରୀ ଛୁଟି' : 'Gazetted Govt Holiday') 
                          : (isOdia ? 'ଐଚ୍ଛିକ ସରକାରୀ ଛୁଟି' : 'Optional Govt Holiday')}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-medium">
                        odishacalendar.com
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                      {isOdia 
                        ? `${day.govtHolidayInfo.nameOdia} (${day.govtHolidayInfo.nameEn})`
                        : `${day.govtHolidayInfo.nameEn} (${day.govtHolidayInfo.nameOdia})`}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {isOdia ? day.govtHolidayInfo.descriptionOdia : day.govtHolidayInfo.descriptionEn}
                    </p>
                  </div>
                </div>
              )}

              {/* Primary 5 Limbs of Panchang (ତିଥି, ନକ୍ଷତ୍ର, ଯୋଗ, କରଣ, ବାର) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {/* Tithi Card */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider">
                      {isOdia ? 'ତିଥି (Tithi)' : 'Tithi'}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 font-bold">
                      {isOdia ? day.tithi.pakshaOdia : day.tithi.pakshaEn}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-neutral-900 dark:text-white font-odia">
                    {isOdia 
                      ? `${day.tithi.nameOdia} (${day.tithi.nameEn})`
                      : `${day.tithi.nameEn} (${day.tithi.nameOdia})`}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {isOdia ? 'ସମାପ୍ତ: ' : 'Ends: '}
                    <strong className="text-neutral-800 dark:text-neutral-200 font-odia">
                      {isOdia ? toOdiaNumber(day.tithi.endTime) : day.tithi.endTime}
                    </strong>
                  </div>
                </div>

                {/* Nakshatra Card */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider">
                      {isOdia ? 'ନକ୍ଷତ୍ର (Nakshatra)' : 'Nakshatra'}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold">
                      {isOdia ? `ପାଦ ${toOdiaNumber(day.nakshatra.pada)}` : `Pada ${day.nakshatra.pada}`}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-neutral-900 dark:text-white font-odia">
                    {isOdia 
                      ? `${day.nakshatra.nameOdia} (${day.nakshatra.nameEn})`
                      : `${day.nakshatra.nameEn} (${day.nakshatra.nameOdia})`}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {isOdia ? 'ସମାପ୍ତ: ' : 'Ends: '}
                    <strong className="text-neutral-800 dark:text-neutral-200 font-odia">
                      {isOdia ? toOdiaNumber(day.nakshatra.endTime) : day.nakshatra.endTime}
                    </strong>
                  </div>
                </div>

                {/* Yoga Card */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider block mb-1">
                    {isOdia ? 'ଯୋଗ (Yoga)' : 'Yoga'}
                  </span>
                  <div className="text-lg font-bold text-neutral-900 dark:text-white font-odia">
                    {isOdia ? `${day.yoga.nameOdia} (${day.yoga.nameEn})` : `${day.yoga.nameEn} (${day.yoga.nameOdia})`}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {isOdia ? 'ସମାପ୍ତ: ' : 'Ends: '}
                    <strong className="text-neutral-800 dark:text-neutral-200 font-odia">
                      {isOdia ? toOdiaNumber(day.yoga.endTime) : day.yoga.endTime}
                    </strong>
                  </div>
                </div>

                {/* Karana Card */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider block mb-1">
                    {isOdia ? 'କରଣ (Karana)' : 'Karana'}
                  </span>
                  <div className="text-lg font-bold text-neutral-900 dark:text-white font-odia">
                    {isOdia ? `${day.karana.nameOdia} (${day.karana.nameEn})` : `${day.karana.nameEn} (${day.karana.nameOdia})`}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {isOdia ? 'ସମାପ୍ତ: ' : 'Ends: '}
                    <strong className="text-neutral-800 dark:text-neutral-200 font-odia">
                      {isOdia ? toOdiaNumber(day.karana.endTime) : day.karana.endTime}
                    </strong>
                  </div>
                </div>

                {/* Rashi (Moon & Sun) */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider block mb-1">
                    {isOdia ? 'ରାଶି (Moon & Sun Sign)' : 'Moon & Sun Signs'}
                  </span>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white font-odia">
                    {isOdia ? 'ଚନ୍ଦ୍ର ରାଶି: ' : 'Moon Sign: '}
                    <span className="text-orange-600 dark:text-orange-400">
                      {isOdia ? day.rashi.moonSignOdia : day.rashi.moonSignEn}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-300 font-odia mt-0.5">
                    {isOdia ? 'ସୂର୍ଯ୍ୟ ରାଶି: ' : 'Sun Sign: '}
                    {isOdia ? day.rashi.sunSignOdia : day.rashi.sunSignEn}
                  </div>
                </div>

                {/* Lagna Details */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider block mb-1">
                    {isOdia ? 'ଲଗ୍ନ (Current Lagna)' : 'Current Lagna'}
                  </span>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white font-odia">
                    {isOdia ? 'ଉଦୟ ଲଗ୍ନ: ' : 'Rising Lagna: '}
                    <span className="text-purple-600 dark:text-purple-400">
                      {isOdia ? day.lagna.nameOdia : day.lagna.nameEn}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-300 font-odia mt-0.5">
                    {day.lagna.nameEn} Lagna
                  </div>
                </div>
              </div>

              {/* Sun & Moon Durations */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700 text-xs">
                <div>
                  <span className="text-neutral-500 dark:text-neutral-400 block font-odia">
                    {isOdia ? 'ସୂର୍ଯ୍ୟୋଦୟ' : 'Sunrise'}
                  </span>
                  <strong className="text-neutral-900 dark:text-white text-sm font-odia">
                    {isOdia ? toOdiaNumber(day.timings.sunrise) : day.timings.sunrise}
                  </strong>
                </div>
                <div>
                  <span className="text-neutral-500 dark:text-neutral-400 block font-odia">
                    {isOdia ? 'ସୂର୍ଯ୍ୟାସ୍ତ' : 'Sunset'}
                  </span>
                  <strong className="text-neutral-900 dark:text-white text-sm font-odia">
                    {isOdia ? toOdiaNumber(day.timings.sunset) : day.timings.sunset}
                  </strong>
                </div>
                <div>
                  <span className="text-neutral-500 dark:text-neutral-400 block font-odia">
                    {isOdia ? 'ଚନ୍ଦ୍ରୋଦୟ' : 'Moonrise'}
                  </span>
                  <strong className="text-neutral-900 dark:text-white text-sm font-odia">
                    {isOdia ? toOdiaNumber(day.timings.moonrise) : day.timings.moonrise}
                  </strong>
                </div>
                <div>
                  <span className="text-neutral-500 dark:text-neutral-400 block font-odia">
                    {isOdia ? 'ଦିନର ମାନ (Day Duration)' : 'Day Duration'}
                  </span>
                  <strong className="text-neutral-900 dark:text-white text-sm font-odia">
                    {isOdia ? toOdiaNumber(day.timings.dayLength) : day.timings.dayLength}
                  </strong>
                </div>
              </div>

              {/* Festivals on this day */}
              {day.events && day.events.length > 0 && (
                <div className="p-4 rounded-2xl bg-orange-50/70 dark:bg-neutral-800/70 border border-orange-200 dark:border-neutral-700 space-y-2">
                  <h4 className="text-xs font-bold text-orange-900 dark:text-orange-300 uppercase tracking-wide flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-orange-600" />
                    <span>{isOdia ? 'ଏହି ଦିନର ପର୍ବପର୍ବାଣୀ ଓ ଓଷା-ବ୍ରତ' : 'Festivals & Observances on this Day'}</span>
                  </h4>
                  <div className="space-y-2">
                    {day.events.map((evt) => (
                      <div key={evt.id} className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-orange-200/60 dark:border-neutral-700">
                        <div className="flex items-center justify-between">
                          <strong className="text-sm text-neutral-900 dark:text-white font-odia">
                            {isOdia ? evt.titleOdia : (evt.titleEn || evt.titleOdia)}
                          </strong>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300">
                            {evt.type}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 font-odia">
                          {isOdia ? evt.significanceOdia : (evt.significanceEn || evt.significanceOdia)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MUHURTAS & AUSPICIOUS / INAUSPICIOUS TIMINGS */}
          {activeTab === 'muhurta' && (
            <div className="space-y-5 animate-fade-in font-odia">
              {/* Auspicious Timings Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{isOdia ? 'ଶୁଭ ବେଳା ଓ ମୁହୂର୍ତ୍ତ' : 'Auspicious Windows & Muhurtas'}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60">
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
                      {isOdia ? 'ବ୍ରହ୍ମ ମୁହୂର୍ତ୍ତ' : 'Brahma Muhurta'}
                    </span>
                    <div className="text-sm font-bold text-neutral-900 dark:text-white font-odia">
                      {isOdia 
                        ? `${toOdiaNumber(day.timings.brahmaMuhurta.start)} - ${toOdiaNumber(day.timings.brahmaMuhurta.end)}`
                        : `${day.timings.brahmaMuhurta.start} - ${day.timings.brahmaMuhurta.end}`}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60">
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
                      {isOdia ? 'ଅଭିଜିତ୍ ମୁହୂର୍ତ୍ତ (ସର୍ବଶ୍ରେଷ୍ଠ)' : 'Abhijit Muhurta (Most Auspicious)'}
                    </span>
                    <div className="text-sm font-bold text-neutral-900 dark:text-white font-odia">
                      {isOdia 
                        ? `${toOdiaNumber(day.timings.abhijit.start)} - ${toOdiaNumber(day.timings.abhijit.end)}`
                        : `${day.timings.abhijit.start} - ${day.timings.abhijit.end}`}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60">
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
                      {isOdia ? 'ଅମୃତ କାଳ' : 'Amrita Kalam'}
                    </span>
                    <div className="text-sm font-bold text-neutral-900 dark:text-white font-odia">
                      {isOdia 
                        ? `${toOdiaNumber(day.timings.amritKalam.start)} - ${toOdiaNumber(day.timings.amritKalam.end)}`
                        : `${day.timings.amritKalam.start} - ${day.timings.amritKalam.end}`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Inauspicious Timings Section (Rahu Kala, etc.) */}
              <div className="space-y-3 pt-3 border-t border-neutral-200/80 dark:border-neutral-800">
                <h4 className="text-xs font-bold text-rose-800 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>{isOdia ? 'ଅଶୁଭ ବେଳା (Avoid Auspicious Beginnings)' : 'Inauspicious Windows (Avoid Beginnings)'}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-800/60">
                    <span className="text-rose-700 dark:text-rose-400 font-bold block mb-1">
                      {isOdia ? 'ରାହୁ କାଳ (Rahu Kalam)' : 'Rahu Kalam'}
                    </span>
                    <div className="text-sm font-bold text-neutral-900 dark:text-white font-odia">
                      {isOdia 
                        ? `${toOdiaNumber(day.timings.rahuKala.start)} - ${toOdiaNumber(day.timings.rahuKala.end)}`
                        : `${day.timings.rahuKala.start} - ${day.timings.rahuKala.end}`}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-800/60">
                    <span className="text-rose-700 dark:text-rose-400 font-bold block mb-1">
                      {isOdia ? 'ଯମଗଣ୍ଡ (Yamaganda)' : 'Yamaganda'}
                    </span>
                    <div className="text-sm font-bold text-neutral-900 dark:text-white font-odia">
                      {isOdia 
                        ? `${toOdiaNumber(day.timings.yamaganda.start)} - ${toOdiaNumber(day.timings.yamaganda.end)}`
                        : `${day.timings.yamaganda.start} - ${day.timings.yamaganda.end}`}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-800/60">
                    <span className="text-rose-700 dark:text-rose-400 font-bold block mb-1">
                      {isOdia ? 'ଗୁଳିକ କାଳ (Gulika)' : 'Gulika Kalam'}
                    </span>
                    <div className="text-sm font-bold text-neutral-900 dark:text-white font-odia">
                      {isOdia 
                        ? `${toOdiaNumber(day.timings.gulikaKala.start)} - ${toOdiaNumber(day.timings.gulikaKala.end)}`
                        : `${day.timings.gulikaKala.start} - ${day.timings.gulikaKala.end}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CHOGHADIYA SLOTS */}
          {activeTab === 'choghadiya' && (
            <div className="space-y-4 animate-fade-in font-odia">
              <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                {isOdia ? 'ଦିବା ଚୌଘଡ଼ିଆ (Day Choghadiya Divisions)' : 'Day Choghadiya Divisions'}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {day.choghadiyaDay.map((slot, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-2xl border transition-all ${
                      slot.quality === 'good' 
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/70 text-emerald-950 dark:text-emerald-200' 
                        : slot.quality === 'neutral'
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/70 text-blue-950 dark:text-blue-200'
                        : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/70 text-rose-950 dark:text-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-sm font-bold font-odia">
                        {isOdia ? slot.nameOdia : slot.nameEn}
                      </strong>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-white/70 dark:bg-black/30">
                        {slot.quality === 'good' 
                          ? (isOdia ? 'ଶୁଭ' : 'Good') 
                          : slot.quality === 'neutral' 
                          ? (isOdia ? 'ଚର' : 'Neutral') 
                          : (isOdia ? 'ଅଶୁଭ' : 'Bad')}
                      </span>
                    </div>
                    <div className="text-xs font-semibold mt-1 font-odia">
                      {isOdia ? `${toOdiaNumber(slot.start)} - ${toOdiaNumber(slot.end)}` : `${slot.start} - ${slot.end}`}
                    </div>
                    <div className="text-[10px] opacity-75 font-sans mt-0.5">
                      Ruler: {slot.ruler}
                    </div>
                  </div>
                ))}
              </div>

              <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider pt-2">
                {isOdia ? 'ରାତ୍ରି ଚୌଘଡ଼ିଆ (Night Choghadiya Divisions)' : 'Night Choghadiya Divisions'}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {day.choghadiyaNight.map((slot, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-2xl border transition-all ${
                      slot.quality === 'good' 
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/70 text-emerald-950 dark:text-emerald-200' 
                        : slot.quality === 'neutral'
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/70 text-blue-950 dark:text-blue-200'
                        : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/70 text-rose-950 dark:text-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-sm font-bold font-odia">
                        {isOdia ? slot.nameOdia : slot.nameEn}
                      </strong>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-white/70 dark:bg-black/30">
                        {slot.quality === 'good' 
                          ? (isOdia ? 'ଶୁଭ' : 'Good') 
                          : slot.quality === 'neutral' 
                          ? (isOdia ? 'ଚର' : 'Neutral') 
                          : (isOdia ? 'ଅଶୁଭ' : 'Bad')}
                      </span>
                    </div>
                    <div className="text-xs font-semibold mt-1 font-odia">
                      {isOdia ? `${toOdiaNumber(slot.start)} - ${toOdiaNumber(slot.end)}` : `${slot.start} - ${slot.end}`}
                    </div>
                    <div className="text-[10px] opacity-75 font-sans mt-0.5">
                      Ruler: {slot.ruler}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Sticky Footer */}
        <div className="p-4 sm:p-5 bg-neutral-50 dark:bg-neutral-800/80 border-t border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 font-odia">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>
              {isOdia 
                ? 'ସମସ୍ତ ଗଣନା ପ୍ରାମାଣିକ ବୈଦିକ ଓ ଓଡ଼ିଶା କୋହେନୂର ପାଞ୍ଜି ଆଧାରିତ' 
                : 'All calculations calibrated to authentic Vedic Drik Ganita and Odisha Kohinoor Panji'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-800 dark:text-white font-bold transition-colors cursor-pointer font-odia"
          >
            {isOdia ? 'ବନ୍ଦ କରନ୍ତୁ (Close)' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
