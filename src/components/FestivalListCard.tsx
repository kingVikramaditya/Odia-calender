import React from 'react';
import { Sparkles, Calendar, Flame, Award, ChevronRight, Landmark } from 'lucide-react';
import { PanchangDay, LanguageMode } from '../types';

interface FestivalListCardProps {
  monthDays: PanchangDay[];
  onSelectDate: (day: PanchangDay) => void;
  language: LanguageMode;
}

export const FestivalListCard: React.FC<FestivalListCardProps> = ({
  monthDays,
  onSelectDate,
  language,
}) => {
  const isOdia = language === 'or';
  const isBoth = language === 'both';

  // Extract all days that have events or special astronomical tags
  const festiveDays = monthDays.filter(
    (d) => d.events.length > 0 || d.moonPhase.isEkadashi || d.moonPhase.isSankranti || d.moonPhase.isPurnima || d.moonPhase.isAmavasya
  );

  return (
    <div 
      id="festivals-month-card"
      className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm p-5 space-y-4 transition-colors"
    >
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white font-odia leading-tight">
              {isOdia ? 'ଏହି ମାସର ମୁଖ୍ୟ ପର୍ବପର୍ବାଣୀ ଓ ଏକାଦଶୀ' : 'Festivals & Observances This Month'}
            </h3>
            <p className="text-[11px] text-neutral-500 font-medium font-odia">
              {isOdia ? 'ସମସ୍ତ ବ୍ରତ, ପର୍ବ ଓ ସରକାରୀ ଛୁଟି ଦିନ' : 'Click any festival to view detailed Panchang'}
            </p>
          </div>
        </div>

        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 font-odia">
          {festiveDays.length} ଟି ପର୍ବ
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
        {festiveDays.map((day) => {
          const firstEvent = day.events[0];
          const isEkadashi = day.moonPhase.isEkadashi;
          const isPurnima = day.moonPhase.isPurnima;
          const isAmavasya = day.moonPhase.isAmavasya;
          const isSankranti = day.moonPhase.isSankranti;

          const title = firstEvent 
            ? (isOdia ? firstEvent.titleOdia : isBoth ? `${firstEvent.titleOdia} (${firstEvent.titleEn})` : firstEvent.titleEn)
            : isEkadashi
            ? `${day.tithi.nameOdia} (${day.tithi.pakshaOdia})`
            : isPurnima
            ? `${day.odiaMonthNameOdia} ପୂର୍ଣ୍ଣିମା`
            : isAmavasya
            ? `${day.odiaMonthNameOdia} ଅମାବାସ୍ୟା`
            : `${day.odiaMonthNameOdia} ସଂକ୍ରାନ୍ତି`;

          const isGovt = day.isGovtHoliday || day.events.some(e => e.isGovtHoliday || e.type === 'govt_holiday');

          return (
            <div
              key={day.dateStr}
              onClick={() => onSelectDate(day)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2 group ${
                isGovt
                  ? 'bg-rose-50/40 hover:bg-rose-50/70 dark:bg-rose-950/20 dark:hover:bg-rose-950/30 border-rose-200/70 dark:border-rose-900/40 hover:border-rose-300'
                  : 'bg-neutral-50/70 hover:bg-orange-50/50 dark:bg-neutral-800/60 dark:hover:bg-neutral-700/60 border border-neutral-200/70 dark:border-neutral-700/70 hover:border-orange-300 dark:hover:border-orange-500'
              }`}
            >
              <div className="space-y-1 overflow-hidden">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={`text-xs font-bold font-odia truncate ${
                    isGovt ? 'text-rose-900 dark:text-rose-200' : 'text-neutral-900 dark:text-white'
                  }`}>
                    {title}
                  </span>
                  {isGovt && (
                    <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 shrink-0 font-odia">
                      ଛୁଟି
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-odia">
                  <span className={`font-semibold ${isGovt ? 'text-rose-600 dark:text-rose-400' : 'text-orange-700 dark:text-orange-400'}`}>
                    {day.odiaDayNumber} ତାରିଖ ({day.gregorianDay} {day.date.toLocaleString('default', { month: 'short' })})
                  </span>
                  <span>• {day.varaShortOdia}</span>
                </div>
              </div>

              <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
