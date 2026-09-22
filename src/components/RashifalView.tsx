import React, { useState } from 'react';
import { 
  Sparkles, 
  Compass, 
  Award, 
  Star, 
  ShieldCheck, 
  Clock, 
  Palette, 
  Hash,
  ChevronRight
} from 'lucide-react';
import { RASHIS, RASHIFAL_DATA_BASE, toOdiaNumber } from '../data/odiaConstants';
import { LanguageMode } from '../types';

interface RashifalViewProps {
  language: LanguageMode;
}

export const RashifalView: React.FC<RashifalViewProps> = ({ language }) => {
  const [selectedRashiId, setSelectedRashiId] = useState<string>('mesha');
  const isOdia = language === 'or';

  const selectedRashi = RASHIS.find(r => r.id === selectedRashiId) || RASHIS[0];
  const rashiData = RASHIFAL_DATA_BASE[selectedRashi.id] || RASHIFAL_DATA_BASE['mesha'];

  return (
    <div id="drik-rashifal-view" className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-neutral-900 border border-blue-200/80 dark:border-blue-800/50 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 border border-blue-300 dark:border-blue-800">
              <Compass className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{isOdia ? 'ଦୃକ ଗ୍ରହସ୍ଥିତି ଆଧାରିତ ରାଶିଫଳ' : 'Drik Planetary Ephemeris Horoscope'}</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white font-odia tracking-tight">
              {isOdia ? '୧୨ ଗୋଟି ରାଶିର ଆଜିର ଭାଗ୍ୟଫଳ' : 'Daily 12 Rashi Forecast'}
            </h2>

            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-odia max-w-2xl leading-relaxed">
              {isOdia 
                ? 'ଦୃକ ସିଦ୍ଧାନ୍ତ ଅନୁଯାୟୀ ନବଗ୍ରହଙ୍କ ଚଳନ, ଚନ୍ଦ୍ର ରାଶି ଏବଂ ନକ୍ଷତ୍ରର ପ୍ରଭାବ ଆଧାରରେ ପ୍ରତ୍ୟେକ ରାଶିର ଦୈନିକ ଶୁଭାଶୁଭ ଫଳାଫଳ ।'
                : 'Planetary transits, Moon signs, and Vedic astrology forecasts calibrated to authentic Drik Ganita.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main SaaS Two-Column Layout: Left Rashi Selector Grid, Right In-Depth Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Rashi Selector (12 buttons) */}
        <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {RASHIS.map((rashi) => {
            const isSelected = rashi.id === selectedRashiId;
            return (
              <button
                key={rashi.id}
                id={`rashi-btn-${rashi.id}`}
                onClick={() => setSelectedRashiId(rashi.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/60 shadow-sm ring-2 ring-indigo-500/20'
                    : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{rashi.symbol}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-indigo-200 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-200' : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800'
                  }`}>
                    {rashi.elementOdia}
                  </span>
                </div>

                <div className="mt-2 font-odia">
                  <h4 className={`text-sm font-bold ${
                    isSelected ? 'text-indigo-950 dark:text-white' : 'text-neutral-900 dark:text-white'
                  }`}>
                    {rashi.nameOdia}
                  </h4>
                  <span className="text-[11px] text-neutral-400 font-sans">
                    {rashi.nameEn}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Rashi Detail Inspector Card */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-5 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-3xl font-bold shadow-inner">
                {selectedRashi.symbol}
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-odia">
                  {selectedRashi.nameOdia} ରାଶି ({selectedRashi.nameEn})
                </h3>
                <p className="text-xs text-neutral-500 font-odia">
                  ଅଧିପତି ଗ୍ରହ: <span className="font-semibold text-neutral-700 dark:text-neutral-300">{selectedRashi.rulerOdia}</span> • ତତ୍ତ୍ୱ: {selectedRashi.elementOdia}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-odia">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{isOdia ? rashiData.sourceOdia : rashiData.sourceEn}</span>
              </span>
              <span className="text-[10px] text-neutral-400 font-odia">ଶୁଭ ସମୟ: {toOdiaNumber(rashiData.timeSlotOdia)}</span>
            </div>
          </div>

          {/* Daily Forecast Text */}
          <div className="space-y-3 font-odia">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              {isOdia ? 'ପ୍ରାମାଣିକ ଜ୍ୟୋତିଷ ଫଳାଦେଶ' : 'Authentic Jyotisha Predictions'}
            </h4>
            <p className="text-base text-neutral-800 dark:text-neutral-200 leading-relaxed font-semibold">
              {rashiData.predictionOdia}
            </p>
            <p className="text-xs text-neutral-500 leading-relaxed font-sans">
              {rashiData.predictionEn}
            </p>
          </div>

          {/* Detailed domain-specific advice: Career, Family, Mantra */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-odia">
            <div className="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-neutral-800/40 border border-amber-200/50 dark:border-neutral-700/60">
              <div className="text-xs font-bold text-amber-800 dark:text-amber-400 mb-1">କର୍ମ ଓ ବ୍ୟବସାୟ (Career)</div>
              <div className="text-xs text-neutral-700 dark:text-neutral-300">{rashiData.careerOdia}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-neutral-800/40 border border-emerald-200/50 dark:border-neutral-700/60">
              <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 mb-1">ପାରିବାରିକ ଓ ସ୍ୱାସ୍ଥ୍ୟ (Family & Health)</div>
              <div className="text-xs text-neutral-700 dark:text-neutral-300">{rashiData.familyOdia} • {rashiData.healthOdia}</div>
            </div>
          </div>

          {/* Remedial Mantra */}
          <div className="p-3 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/50 flex items-center justify-between font-odia">
            <span className="text-xs font-bold text-purple-800 dark:text-purple-300">ଦୈନିକ ଶୁଭ ମନ୍ତ୍ର:</span>
            <span className="text-xs font-black text-purple-950 dark:text-purple-200 font-mono tracking-wide">{rashiData.mantraOdia}</span>
          </div>

          {/* SaaS Astrological Metrics Bento */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs font-odia">
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800 space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
                <Palette className="w-3.5 h-3.5" />
                <span>ଶୁଭ ରଙ୍ଗ</span>
              </div>
              <strong className="text-sm font-bold text-neutral-900 dark:text-white block">
                {isOdia ? rashiData.colorOdia : rashiData.colorEn}
              </strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800 space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
                <Hash className="w-3.5 h-3.5" />
                <span>ଶୁଭ ଅଙ୍କ</span>
              </div>
              <strong className="text-sm font-bold text-neutral-900 dark:text-white block">
                {toOdiaNumber(rashiData.num)}
              </strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800 space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
                <Clock className="w-3.5 h-3.5" />
                <span>ଶୁଭ ମୁହୂର୍ତ୍ତ</span>
              </div>
              <strong className="text-xs font-bold text-neutral-900 dark:text-white block">
                {isOdia ? '୦୮:୩୦ - ୧୦:୧୫' : '08:30 - 10:15 AM'}
              </strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800 space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
                <Star className="w-3.5 h-3.5" />
                <span>ଇଷ୍ଟଦେବ</span>
              </div>
              <strong className="text-xs font-bold text-neutral-900 dark:text-white block truncate">
                {selectedRashi.rulerOdia}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
