import React, { useState, useMemo } from 'react';
import { X, Search, Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { COMPREHENSIVE_FESTIVALS, EKADASHI_CALENDAR } from '../data/festivalsData';
import { LanguageMode } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDateStr: (dateStr: string) => void;
  language: LanguageMode;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectDateStr,
  language,
}) => {
  const [query, setQuery] = useState('');
  const isOdia = language === 'or';

  // Search items - must be called unconditionally before any early return
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMPREHENSIVE_FESTIVALS.slice(0, 8);

    return COMPREHENSIVE_FESTIVALS.filter(f => 
      f.titleOdia.toLowerCase().includes(q) ||
      f.titleEn.toLowerCase().includes(q) ||
      f.significanceOdia.toLowerCase().includes(q) ||
      f.significanceEn.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  const quickTags = [
    { label: 'ରଥଯାତ୍ରା', en: 'Ratha Yatra' },
    { label: 'ରଜ ପର୍ବ', en: 'Raja Parba' },
    { label: 'ଏକାଦଶୀ', en: 'Ekadashi' },
    { label: 'ଦୁର୍ଗାପୂଜା', en: 'Durga Puja' },
    { label: 'ମାଣବସା', en: 'Manabasa' },
    { label: 'ପଣା ସଂକ୍ରାନ୍ତି', en: 'Pana Sankranti' },
  ];

  return (
    <div 
      id="search-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="search-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col transition-all"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            id="festival-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isOdia ? "ପର୍ବ, ଓଷା, ଏକାଦଶୀ କିମ୍ବା ତିଥି ଖୋଜନ୍ତୁ..." : "Search festivals, Ekadashi, Osha, or Tithi..."}
            className="w-full text-base font-odia bg-transparent outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Tag Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 overflow-x-auto bg-neutral-50/60 dark:bg-neutral-800/40 border-b border-neutral-100 dark:border-neutral-800 text-xs">
          <span className="text-[11px] font-bold text-neutral-400 shrink-0 font-odia">ଶୀଘ୍ର ସନ୍ଧାନ:</span>
          {quickTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(tag.label)}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-orange-50 dark:hover:bg-neutral-700 font-odia whitespace-nowrap transition-colors"
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {results.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 font-odia">
              କୌଣସି ପର୍ବ ମିଳିଲା ନାହିଁ । ଦୟାକରି ଅନ୍ୟ ଶବ୍ଦ ଖୋଜନ୍ତୁ ।
            </div>
          ) : (
            results.map((fest) => {
              // Target mock date representation for this year
              const targetDate = '2026-07-16'; // sample navigation
              return (
                <div
                  key={fest.id}
                  id={`search-result-${fest.id}`}
                  onClick={() => {
                    onSelectDateStr(targetDate);
                    onClose();
                  }}
                  className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80 hover:border-orange-400 dark:hover:border-orange-500 hover:bg-orange-50/30 dark:hover:bg-neutral-700/50 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 font-odia">
                        {fest.type === 'festival' ? 'ପର୍ବ' : fest.type === 'ekadashi' ? 'ଏକାଦଶୀ' : 'ଓଷା / ବ୍ରତ'}
                      </span>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white font-odia">
                        {isOdia ? fest.titleOdia : fest.titleEn}
                      </h4>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 font-odia line-clamp-1">
                      {isOdia ? fest.significanceOdia : fest.significanceEn}
                    </p>
                  </div>

                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
