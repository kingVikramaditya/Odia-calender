import React, { useState } from 'react';
import { X, Sparkles, Calendar, Clock, CheckCircle, Filter } from 'lucide-react';
import { SAMPLE_MUHURTAS } from '../data/festivalsData';
import { MuhurtaItem, LanguageMode } from '../types';
import { toOdiaNumber } from '../data/odiaConstants';

interface MuhurtaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDateStr: (dateStr: string) => void;
  language: LanguageMode;
}

export const MuhurtaModal: React.FC<MuhurtaModalProps> = ({
  isOpen,
  onClose,
  onSelectDateStr,
  language,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const isOdia = language === 'or';

  const categories = [
    { id: 'all', nameOdia: 'ସମସ୍ତ ମୁହୂର୍ତ୍ତ', nameEn: 'All Muhurtas' },
    { id: 'marriage', nameOdia: 'ବିବାହ', nameEn: 'Marriage' },
    { id: 'griha_pravesh', nameOdia: 'ଗୃହ ପ୍ରବେଶ', nameEn: 'House Warming' },
    { id: 'upanayana', nameOdia: 'ବ୍ରତୋପନୟନ', nameEn: 'Upanayana' },
    { id: 'vehicle', nameOdia: 'ଯାନବାହନ କ୍ରୟ', nameEn: 'Vehicle' },
    { id: 'business', nameOdia: 'ବାଣିଜ୍ୟ / ଦୋକାନ', nameEn: 'Business' },
  ];

  const filteredMuhurtas = selectedCategory === 'all'
    ? SAMPLE_MUHURTAS
    : SAMPLE_MUHURTAS.filter(m => m.type === selectedCategory);

  return (
    <div 
      id="muhurta-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="muhurta-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 transition-all"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-odia">
                {isOdia ? 'ଶୁଭ ମୁହୂର୍ତ୍ତ ନିର୍ଣ୍ଣୟ (୨୦୨୬-୨୦୨୭)' : 'Auspicious Muhurta Finder'}
              </h3>
              <p className="text-xs text-neutral-500 font-medium font-odia">
                {isOdia ? 'ବିବାହ, ଗୃହ ପ୍ରବେଶ, ବ୍ରତୋପନୟନ, ବାଣିଜ୍ୟ ଓ ଗାଡ଼ି କିଣିବା ଶୁଭ ସମୟ' : 'Verified auspicious windows derived from authentic Odia Panjis'}
              </p>
            </div>
          </div>

          <button
            id="close-muhurta-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto py-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`muhurta-filter-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-odia whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {isOdia ? cat.nameOdia : cat.nameEn}
            </button>
          ))}
        </div>

        {/* Muhurta List */}
        <div className="space-y-3 mt-1">
          {filteredMuhurtas.length === 0 ? (
            <div className="p-8 text-center text-neutral-400 font-odia">
              କୌଣସି ମୁହୂର୍ତ୍ତ ମିଳିଲା ନାହିଁ । ଅନ୍ୟ ବିଭାଗ ବାଛନ୍ତୁ ।
            </div>
          ) : (
            filteredMuhurtas.map((muh) => (
              <div
                key={muh.id}
                id={`muhurta-card-${muh.id}`}
                className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80 hover:border-amber-400 dark:hover:border-amber-600 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-odia">
                      {isOdia ? muh.typeOdia : muh.typeEn}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-odia">
                      <CheckCircle className="w-3.5 h-3.5" />
                      {muh.rating === 'Uttama' ? 'ଉତ୍ତମ ମୁହୂର୍ତ୍ତ' : 'ମଧ୍ୟମ'}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-neutral-900 dark:text-white font-odia">
                    {isOdia ? muh.descriptionOdia : muh.descriptionEn}
                  </h4>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 font-odia pt-1">
                    <div className="flex items-center gap-1 text-neutral-700 dark:text-neutral-300">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      <span>{muh.dateStr}</span>
                    </div>

                    <div className="flex items-center gap-1 text-neutral-700 dark:text-neutral-300">
                      <Clock className="w-3.5 h-3.5 text-orange-500" />
                      <span>{toOdiaNumber(muh.timeWindow)}</span>
                    </div>

                    {muh.nakshatra && (
                      <span>ନକ୍ଷତ୍ର: <strong>{muh.nakshatra}</strong></span>
                    )}

                    {muh.tithi && (
                      <span>ତିଥି: <strong>{muh.tithi}</strong></span>
                    )}
                  </div>
                </div>

                {/* Jump to Date Button */}
                <button
                  id={`jump-to-muhurta-${muh.id}`}
                  onClick={() => {
                    onSelectDateStr(muh.dateStr);
                    onClose();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold font-odia whitespace-nowrap shadow-sm transition-colors self-start sm:self-center"
                >
                  କ୍ୟାଲେଣ୍ଡରରେ ଦେଖନ୍ତୁ →
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
