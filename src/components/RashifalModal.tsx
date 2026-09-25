import React, { useState } from 'react';
import { X, Sparkles, Star, Compass, Award } from 'lucide-react';
import { RASHIS, RASHIFAL_DATA_BASE, toOdiaNumber } from '../data/odiaConstants';
import { LanguageMode } from '../types';

interface RashifalModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageMode;
}

export const RashifalModal: React.FC<RashifalModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [selectedRashiId, setSelectedRashiId] = useState<string>('mesha');

  if (!isOpen) return null;

  const isOdia = language === 'or';
  const selectedRashi = RASHIS.find(r => r.id === selectedRashiId) || RASHIS[0];
  const rashiData = RASHIFAL_DATA_BASE[selectedRashi.id] || RASHIFAL_DATA_BASE['mesha'];

  return (
    <div 
      id="rashifal-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="rashifal-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 transition-all"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-odia">
                {isOdia ? 'ଦୈନିକ ରାଶିଫଳ ଓ ଭାଗ୍ୟଫଳ' : 'Daily Rashifal & Horoscope'}
              </h3>
              <p className="text-xs text-neutral-500 font-medium font-odia">
                {isOdia ? '୧୨ଟି ରାଶିର ଆଜିର ଶୁଭାଶୁଭ ବିଚାର ଓ ଶୁଭ ରଙ୍ଗ' : 'Planetary transit predictions for all 12 signs'}
              </p>
            </div>
          </div>

          <button
            id="close-rashifal-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 12 Rashi Selection Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 my-5">
          {RASHIS.map((rashi) => {
            const isSelected = rashi.id === selectedRashiId;
            return (
              <button
                key={rashi.id}
                id={`rashi-tab-${rashi.id}`}
                onClick={() => setSelectedRashiId(rashi.id)}
                className={`p-2.5 rounded-2xl text-center border transition-all ${
                  isSelected
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md ring-2 ring-purple-300 dark:ring-purple-800'
                    : 'bg-neutral-50 dark:bg-neutral-800/80 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border-neutral-200/80 dark:border-neutral-700'
                }`}
              >
                <div className="text-xl mb-1">{rashi.symbol}</div>
                <div className="text-xs font-bold font-odia leading-tight truncate">
                  {rashi.nameOdia}
                </div>
                <div className={`text-[10px] truncate ${isSelected ? 'text-purple-100' : 'text-neutral-400'}`}>
                  {rashi.nameEn}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Rashi Detail Presentation */}
        <div className="rounded-3xl bg-gradient-to-br from-purple-50/60 via-pink-50/30 to-amber-50/40 dark:from-neutral-800 dark:via-neutral-800 dark:to-neutral-800/80 border border-purple-200/80 dark:border-neutral-700 p-5 space-y-4">
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-purple-200/50 dark:border-neutral-700">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{selectedRashi.symbol}</span>
              <div>
                <h4 className="text-2xl font-black text-neutral-900 dark:text-white font-odia">
                  {isOdia ? `${selectedRashi.nameOdia} (${selectedRashi.nameEn})` : `${selectedRashi.nameEn} (${selectedRashi.nameOdia})`}
                </h4>
                <p className="text-xs text-neutral-500 font-medium font-odia">
                  {isOdia ? 'ରାଶ୍ୟାଧିପତି: ' : 'Ruling Planet: '}
                  {isOdia ? selectedRashi.rulerOdia : selectedRashi.rulerEn}
                </p>
              </div>
            </div>

            <div className="text-right flex flex-col items-end gap-1">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-odia border border-purple-200 dark:border-purple-800">
                <Sparkles className="w-3 h-3 text-purple-600" />
                {isOdia ? rashiData.sourceOdia : rashiData.sourceEn}
              </span>
              <span className="text-[10px] text-neutral-400 font-odia">
                {isOdia ? `ଶୁଭ ସମୟ: ${toOdiaNumber(rashiData.timeSlotOdia)}` : `Auspicious Hours: 08:30 - 10:15 AM`}
              </span>
            </div>
          </div>

          {/* Predictions Text in Odia & English */}
          <div className="space-y-2">
            <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 font-odia leading-relaxed">
              {isOdia ? rashiData.predictionOdia : rashiData.predictionEn}
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
              {isOdia ? rashiData.predictionEn : rashiData.predictionOdia}
            </div>
          </div>

          {/* Domain Specific Insights: Career, Family, Mantra */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-odia">
            <div className="p-2.5 rounded-xl bg-white/80 dark:bg-neutral-800/80 border border-purple-100 dark:border-neutral-700">
              <span className="font-bold text-purple-900 dark:text-purple-300 block mb-0.5">
                {isOdia ? 'କର୍ମ ଓ ବ୍ୟବସାୟ:' : 'Career & Business:'}
              </span>
              <p className="text-neutral-700 dark:text-neutral-300">{rashiData.careerOdia}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white/80 dark:bg-neutral-800/80 border border-purple-100 dark:border-neutral-700">
              <span className="font-bold text-purple-900 dark:text-purple-300 block mb-0.5">
                {isOdia ? 'ପାରିବାରିକ ଓ ସ୍ୱାସ୍ଥ୍ୟ:' : 'Family & Health:'}
              </span>
              <p className="text-neutral-700 dark:text-neutral-300">{rashiData.familyOdia}</p>
            </div>
          </div>

          {/* Metrics Pill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-purple-200/50 dark:border-neutral-700 text-xs">
            <div className="p-3 rounded-2xl bg-white dark:bg-neutral-800 border border-purple-100 dark:border-neutral-700">
              <span className="text-[10px] text-neutral-400 block font-odia">{isOdia ? 'ଶୁଭ ରଙ୍ଗ' : 'Lucky Color'}</span>
              <strong className="text-purple-900 dark:text-purple-300 font-odia text-sm">
                {isOdia ? rashiData.colorOdia : rashiData.colorEn}
              </strong>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-neutral-800 border border-purple-100 dark:border-neutral-700">
              <span className="text-[10px] text-neutral-400 block font-odia">{isOdia ? 'ଶୁଭ ସଂଖ୍ୟା' : 'Lucky Number'}</span>
              <strong className="text-purple-900 dark:text-purple-300 font-odia text-sm">
                {isOdia ? toOdiaNumber(rashiData.num) : rashiData.num}
              </strong>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-neutral-800 border border-purple-100 dark:border-neutral-700">
              <span className="text-[10px] text-neutral-400 block font-odia">{isOdia ? 'ଶୁଭ ସମୟ' : 'Auspicious Hours'}</span>
              <strong className="text-purple-900 dark:text-purple-300 font-odia text-xs">
                {isOdia ? 'ପ୍ରାତଃ ୦୮:୩୦ - ୧୦:୧୫' : '08:30 AM - 10:15 AM'}
              </strong>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-neutral-800 border border-purple-100 dark:border-neutral-700">
              <span className="text-[10px] text-neutral-400 block font-odia">{isOdia ? 'ଇଷ୍ଟଦେବ' : 'Recommended Deity'}</span>
              <strong className="text-purple-900 dark:text-purple-300 font-odia text-xs truncate block">
                {isOdia ? selectedRashi.rulerOdia : selectedRashi.rulerEn}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
