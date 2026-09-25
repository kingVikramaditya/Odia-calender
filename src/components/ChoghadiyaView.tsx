import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Clock, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Info,
  Calendar
} from 'lucide-react';
import { PanchangDay, LanguageMode, ChoghadiyaSlot } from '../types';
import { toOdiaNumber } from '../data/odiaConstants';
import { formatLocalDateKey, isCurrentTimeInWindow } from '../utils/panchangEngine';

interface ChoghadiyaViewProps {
  day: PanchangDay;
  language: LanguageMode;
  onSelectDatePrompt?: () => void;
  currentLiveTime?: Date;
}

export const ChoghadiyaView: React.FC<ChoghadiyaViewProps> = ({
  day,
  language,
  currentLiveTime,
}) => {
  const isOdia = language === 'or';
  const isToday = currentLiveTime ? day.dateStr === formatLocalDateKey(currentLiveTime) : false;

  const [activeTab, setActiveTab] = useState<'day' | 'night'>(() => {
    if (!currentLiveTime) return 'day';
    const isNightSlotRunning = day.choghadiyaNight.some(s => isCurrentTimeInWindow(currentLiveTime, s.start, s.end));
    return isNightSlotRunning ? 'night' : 'day';
  });

  const currentSlots = activeTab === 'day' ? day.choghadiyaDay : day.choghadiyaNight;

  const getSlotColor = (quality: 'good' | 'neutral' | 'bad') => {
    switch (quality) {
      case 'good':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/40',
          border: 'border-emerald-200 dark:border-emerald-800/80',
          badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300',
          iconColor: 'text-emerald-600 dark:text-emerald-400',
          dot: 'bg-emerald-500',
          text: isOdia ? 'ଶ୍ରେଷ୍ଠ ଓ ଶୁଭଦାୟକ' : 'Highly Auspicious',
        };
      case 'neutral':
        return {
          bg: 'bg-blue-50/60 dark:bg-blue-950/30',
          border: 'border-blue-200 dark:border-blue-800/70',
          badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300',
          iconColor: 'text-blue-600 dark:text-blue-400',
          dot: 'bg-blue-500',
          text: isOdia ? 'ମଧ୍ୟମ (ଚର)' : 'Moderate / Neutral',
        };
      case 'bad':
        return {
          bg: 'bg-rose-50/50 dark:bg-rose-950/30',
          border: 'border-rose-200 dark:border-rose-800/70',
          badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300',
          iconColor: 'text-rose-600 dark:text-rose-400',
          dot: 'bg-rose-500',
          text: isOdia ? 'ବର୍ଜନୀୟ (ଅଶୁଭ)' : 'Inauspicious / Avoid',
        };
    }
  };

  const getRecommendation = (nameEn: string) => {
    switch (nameEn) {
      case 'Shubh':
        return isOdia 
          ? 'ବିବାହ, ପୂଜା, ନୂତନ ଗୃହ ପ୍ରବେଶ ଓ ସମସ୍ତ ଧାର୍ମିକ କାର୍ଯ୍ୟ ପାଇଁ ଶ୍ରେଷ୍ଠ ।'
          : 'Best for rituals, weddings, ceremonies, and beginning religious tasks.';
      case 'Amrit':
        return isOdia 
          ? 'ଯେକୌଣସି ଶୁଭ କାର୍ଯ୍ୟ, ଯାତ୍ରା, ବ୍ୟବସାୟ ଓ ଔଷଧ ସେବନ ପାଇଁ ସର୍ବୋତ୍ତମ ।'
          : 'Supreme timing for health remedies, major milestones, travel, and ventures.';
      case 'Labh':
        return isOdia 
          ? 'ନୂତନ ବ୍ୟବସାୟ ଆରମ୍ଭ, ଆର୍ଥିକ କାରବାର, ବାଣିଜ୍ୟ ଓ ପାଠପଢ଼ା ପାଇଁ ଲାଭଦାୟକ ।'
          : 'Highly profitable for commercial activities, deals, and educational milestones.';
      case 'Char':
        return isOdia 
          ? 'ଯାତ୍ରା, ଯାନବାହନ ଚାଳନା ଓ ଗତିଶୀଳ କାର୍ଯ୍ୟ ପାଇଁ ଅନୁକୂଳ ।'
          : 'Good for motion, long travel, purchasing vehicles, and swift tasks.';
      case 'Rog':
        return isOdia 
          ? 'ଶୁଭ କାର୍ଯ୍ୟ ବର୍ଜନୀୟ । କେବଳ ଶତ୍ରୁ ଦମନ ଓ ବିବାଦ ସମାଧାନ ପାଇଁ ଉଦ୍ଦିଷ୍ଟ ।'
          : 'Avoid auspicious ceremonies. Only suitable for legal or dispute settlements.';
      case 'Kaal':
        return isOdia 
          ? 'ଶନିଦେବଙ୍କ ସମୟ । କୌଣସି ନୂତନ ଯୋଜନା ବା ଯାତ୍ରା ଆରମ୍ଭ କରନ୍ତୁ ନାହିଁ ।'
          : 'Saturn influence. Strictly avoid commencing journeys or signing contracts.';
      case 'Udveg':
        return isOdia 
          ? 'ମାନସିକ ଉତ୍ତେଜନା କାରକ । ସରକାରୀ ବା ଶୁଭ କାର୍ଯ୍ୟରେ ସାବଧାନ ରୁହନ୍ତୁ ।'
          : 'Creates mental anxiety. Postpone crucial paperwork and auspicious events.';
      default:
        return '';
    }
  };

  return (
    <div id="drik-choghadiya-panel" className="space-y-6 animate-fade-in">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-neutral-900 border border-amber-200/80 dark:border-amber-800/50 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{isOdia ? 'ଦୃକ ସିଦ୍ଧାନ୍ତ ଅନୁମୋଦିତ ଚୌଘଡ଼ିଆ' : 'Drik Siddhanta Approved Choghadiya'}</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white font-odia tracking-tight">
              {isOdia ? `${day.solarMonthNameOdia || day.odiaMonthNameOdia} ${day.odiaDayOfSolarMonthOdia} ଦିନର ଚୌଘଡ଼ିଆ ମୁହୂର୍ତ୍ତ` : `Choghadiya Timings for ${day.solarMonthNameEn || day.odiaMonthNameEn} Day ${day.odiaDayOfSolarMonth} (${day.dateStr})`}
            </h2>
            
            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-odia max-w-2xl leading-relaxed">
              {isOdia 
                ? 'ଦୃକ ଗଣିତ ଅନୁଯାୟୀ ସୂର୍ଯ୍ୟୋଦୟ ଓ ସୂର୍ଯ୍ୟାସ୍ତର ସଠିକ୍ ଅବଧିକୁ ୮ ଭାଗ କରି ଦିବା ଓ ରାତ୍ରି ଚୌଘଡ଼ିଆ ନିର୍ଣ୍ଣୟ କରାଯାଇଛି । ଶୁଭ, ଅମୃତ ଓ ଲାଭ ବେଳାରେ କାର୍ଯ୍ୟାରମ୍ଭ ସର୍ବୋତ୍ତମ ।'
                : 'Exact 8-fold daylight and nighttime divisions calibrated to local sunrise & sunset as per Drik Panchang.'}
            </p>
          </div>

          {/* Quick Tab Selector */}
          <div className="flex items-center p-1 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm shrink-0 self-start md:self-auto">
            <button
              id="choghadiya-day-tab"
              onClick={() => setActiveTab('day')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all font-odia ${
                activeTab === 'day'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>{isOdia ? 'ଦିବା ଚୌଘଡ଼ିଆ (Day)' : 'Day Choghadiya'}</span>
            </button>

            <button
              id="choghadiya-night-tab"
              onClick={() => setActiveTab('night')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all font-odia ${
                activeTab === 'night'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900'
              }`}
            >
              <Moon className="w-4 h-4" />
              <span>{isOdia ? 'ରାତ୍ରି ଚୌଘଡ଼ିଆ (Night)' : 'Night Choghadiya'}</span>
            </button>
          </div>
        </div>

        {/* Sunrise / Sunset Context Bar */}
        <div className="mt-6 pt-4 border-t border-amber-200/60 dark:border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-odia">
          <div>
            <span className="text-neutral-500 dark:text-neutral-400 block text-[11px]">
              {isOdia ? 'ସୂର୍ଯ୍ୟୋଦୟ (Sunrise)' : 'Sunrise'}
            </span>
            <span className="font-bold text-neutral-900 dark:text-white text-sm">
              {isOdia ? toOdiaNumber(day.timings.sunrise) : day.timings.sunrise}
            </span>
          </div>

          <div>
            <span className="text-neutral-500 dark:text-neutral-400 block text-[11px]">
              {isOdia ? 'ସୂର୍ଯ୍ୟାସ୍ତ (Sunset)' : 'Sunset'}
            </span>
            <span className="font-bold text-neutral-900 dark:text-white text-sm">
              {isOdia ? toOdiaNumber(day.timings.sunset) : day.timings.sunset}
            </span>
          </div>

          <div>
            <span className="text-neutral-500 dark:text-neutral-400 block text-[11px]">
              {isOdia ? 'ଦିବାରମାନ (Day Duration)' : 'Daylight Span'}
            </span>
            <span className="font-bold text-neutral-900 dark:text-white text-sm">
              {isOdia ? toOdiaNumber(day.timings.dayLength) : day.timings.dayLength}
            </span>
          </div>

          <div>
            <span className="text-neutral-500 dark:text-neutral-400 block text-[11px]">
              {isOdia ? 'ବାର (Weekday)' : 'Weekday'}
            </span>
            <span className="font-bold text-neutral-900 dark:text-white text-sm">
              {isOdia ? `${day.varaOdia} (${day.varaEn})` : day.varaEn}
            </span>
          </div>
        </div>
      </div>

      {/* Grid of 8 Choghadiya Slots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentSlots.map((slot) => {
          const style = getSlotColor(slot.quality);
          const recommendation = getRecommendation(slot.nameEn);
          const isRunningNow = isToday && isCurrentTimeInWindow(currentLiveTime!, slot.start, slot.end);

          return (
            <div
              key={slot.index}
              id={`choghadiya-slot-${slot.index}`}
              className={`p-5 rounded-3xl border transition-all hover:shadow-md ${style.bg} ${style.border} ${
                isRunningNow ? 'ring-2 ring-amber-500 shadow-md transform scale-[1.01]' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-neutral-200/50 dark:border-neutral-700/50">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${isRunningNow ? 'bg-amber-500 animate-ping' : style.dot}`} />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-lg font-bold text-neutral-900 dark:text-white font-odia">
                        {isOdia ? slot.nameOdia : slot.nameEn}
                      </h4>
                      <span className="text-xs font-semibold text-neutral-400 font-sans">
                        {isOdia ? `(${slot.nameEn})` : `(${slot.nameOdia})`}
                      </span>
                      {isRunningNow && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white animate-pulse shadow-2xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          <span>{isOdia ? 'ବର୍ତ୍ତମାନ ଚାଲୁଅଛି' : 'ACTIVE NOW'}</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-neutral-500 font-odia">
                      {isOdia ? `ଅଧିପତି ଗ୍ରହ: ${slot.ruler}` : `Ruling Planet: ${slot.ruler}`}
                    </span>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-odia ${style.badge}`}>
                  {style.text}
                </span>
              </div>

              {/* Time Window */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200 font-bold text-sm font-odia">
                  <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>
                    {isOdia 
                      ? `${toOdiaNumber(slot.start)} ରୁ ${toOdiaNumber(slot.end)}` 
                      : `${slot.start} to ${slot.end}`}
                  </span>
                </div>
                <span className="text-[11px] font-medium text-neutral-500 font-odia">
                  {isOdia ? `ମୁହୂର୍ତ୍ତ ${toOdiaNumber(slot.index)}` : `Slot ${slot.index}`}
                </span>
              </div>

              {/* Practical Guidance */}
              <p className="mt-2.5 text-xs text-neutral-600 dark:text-neutral-400 font-odia leading-relaxed">
                {recommendation}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
