import React, { useState, useMemo } from 'react';
import { X, Search, Calendar, ArrowRight, Landmark, Sparkles } from 'lucide-react';
import { COMPREHENSIVE_FESTIVALS, EKADASHI_EVENTS } from '../data/festivalsData';
import { ODISHA_GOVT_HOLIDAYS_2026 } from '../data/odishaGovtHolidays';
import { LanguageMode } from '../types';
import { toOdiaNumber } from '../data/odiaConstants';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDateStr: (dateStr: string) => void;
  language: LanguageMode;
}

interface UnifiedSearchItem {
  id: string;
  titleOdia: string;
  titleEn: string;
  significanceOdia: string;
  significanceEn: string;
  dateStr: string;
  type: string;
  isGovtHoliday: boolean;
}

const ODIA_MONTH_NAMES = [
  'ଜାନୁଆରୀ', 'ଫେବୃଆରୀ', 'ମାର୍ଚ୍ଚ', 'ଅପ୍ରେଲ୍', 'ମେ', 'ଜୁନ୍',
  'ଜୁଲାଇ', 'ଅଗଷ୍ଟ', 'ସେପ୍ଟେମ୍ବର', 'ଅକ୍ଟୋବର', 'ନଭେମ୍ବର', 'ଡିସେମ୍ବର'
];
const EN_MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const ODIA_DAY_NAMES = [
  'ରବିବାର', 'ସୋମବାର', 'ମଙ୍ଗଳବାର', 'ବୁଧବାର', 'ଗୁରୁବାର', 'ଶୁକ୍ରବାର', 'ଶନିବାର'
];
const EN_DAY_NAMES = [
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
];

function formatSearchDate(dateStr: string, isOdia: boolean): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  const dt = new Date(y, m, d);
  const dow = dt.getDay();

  if (isOdia) {
    return `${toOdiaNumber(d)} ${ODIA_MONTH_NAMES[m]} ${toOdiaNumber(y)} (${ODIA_DAY_NAMES[dow]})`;
  }
  return `${d} ${EN_MONTH_NAMES[m]} ${y} (${EN_DAY_NAMES[dow]})`;
}

// Normalizes Odia vowels and variations (e.g. dirgha u ୂ vs hraswa u ୁ) for flexible search
function normalizeOdia(str: string): string {
  return str
    .toLowerCase()
    .replace(/[\u0B42]/g, '\u0B41') // replace dirgha u ୂ with hraswa u ୁ
    .replace(/[\u0B40]/g, '\u0B3F') // replace dirgha i ୀ with hraswa i ି
    .replace(/\s+/g, '');
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectDateStr,
  language,
}) => {
  const [query, setQuery] = useState('');
  const isOdia = language === 'or';

  // Build unified catalog of festivals + government holidays
  const allSearchItems = useMemo<UnifiedSearchItem[]>(() => {
    const list: UnifiedSearchItem[] = [];
    const seenDates = new Set<string>();

    // 1. Cultural festivals
    for (const f of COMPREHENSIVE_FESTIVALS) {
      if (f.dateStr) {
        list.push({
          id: f.id,
          titleOdia: f.titleOdia,
          titleEn: f.titleEn,
          significanceOdia: f.significanceOdia,
          significanceEn: f.significanceEn,
          dateStr: f.dateStr,
          type: f.type,
          isGovtHoliday: !!f.isGovtHoliday,
        });
        seenDates.add(`${f.dateStr}_${f.id}`);
      }
    }

    // 2. Sacred Ekadashis
    for (const e of EKADASHI_EVENTS) {
      if (e.dateStr) {
        list.push({
          id: e.id,
          titleOdia: e.titleOdia,
          titleEn: e.titleEn,
          significanceOdia: e.significanceOdia,
          significanceEn: e.significanceEn,
          dateStr: e.dateStr,
          type: 'ekadashi',
          isGovtHoliday: false,
        });
        seenDates.add(`${e.dateStr}_${e.id}`);
      }
    }

    // 3. Official Government Holidays
    for (const g of ODISHA_GOVT_HOLIDAYS_2026) {
      const key = `${g.dateStr}_${g.id}`;
      // Avoid duplicate display if already added
      const alreadyPresent = list.some(item => item.dateStr === g.dateStr && item.titleOdia.includes(g.nameOdia.split(' ')[0]));
      if (!alreadyPresent) {
        list.push({
          id: g.id,
          titleOdia: g.nameOdia,
          titleEn: g.nameEn,
          significanceOdia: g.descriptionOdia,
          significanceEn: g.descriptionEn,
          dateStr: g.dateStr,
          type: 'govt_holiday',
          isGovtHoliday: true,
        });
      }
    }

    // Sort chronologically by date
    list.sort((a, b) => a.dateStr.localeCompare(b.dateStr));
    return list;
  }, []);

  // Filtered search results
  const results = useMemo(() => {
    const qRaw = query.trim().toLowerCase();
    if (!qRaw) {
      // Default: highlight important festivals
      return allSearchItems.filter(item => 
        ['durga_puja', 'ratha_yatra', 'raja_parba', 'pana_sankranti', 'deepavali', 'makar_sankranti', 'janmashtami', 'ganesh_chaturthi'].includes(item.id) ||
        item.isGovtHoliday
      ).slice(0, 10);
    }

    const qNorm = normalizeOdia(qRaw);

    return allSearchItems.filter(f => {
      // Direct substring match
      const enMatch = f.titleEn.toLowerCase().includes(qRaw) || f.significanceEn.toLowerCase().includes(qRaw);
      const odiaMatch = f.titleOdia.toLowerCase().includes(qRaw) || f.significanceOdia.toLowerCase().includes(qRaw);
      
      // Normalized Odia match (handles dirgha/hraswa u and spacing)
      const odiaNormTitle = normalizeOdia(f.titleOdia);
      const odiaNormSignif = normalizeOdia(f.significanceOdia);
      const normMatch = odiaNormTitle.includes(qNorm) || odiaNormSignif.includes(qNorm);

      return enMatch || odiaMatch || normMatch;
    });
  }, [query, allSearchItems]);

  if (!isOpen) return null;

  const quickTags = [
    { label: 'ଦୁର୍ଗାପୂଜା', en: 'Durga Puja' },
    { label: 'ରଥଯାତ୍ରା', en: 'Ratha Yatra' },
    { label: 'ରଜ ପର୍ବ', en: 'Raja Parba' },
    { label: 'ପଣା ସଂକ୍ରାନ୍ତି', en: 'Pana Sankranti' },
    { label: 'ଦୀପାବଳି', en: 'Deepavali' },
    { label: 'ମାଣବସା', en: 'Manabasa' },
    { label: 'ମକର ସଂକ୍ରାନ୍ତି', en: 'Makar Sankranti' },
    { label: 'ଗଣେଶ ପୂଜା', en: 'Ganesh Puja' },
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
          <Search className="w-5 h-5 text-orange-600 dark:text-orange-400 shrink-0" />
          <input
            id="festival-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isOdia ? "ପର୍ବ, ଓଷା, ଏକାଦଶୀ କିମ୍ବା ଛୁଟି ଖୋଜନ୍ତୁ (ଯଥା: ଦୁର୍ଗାପୂଜା, ରଥଯାତ୍ରା)..." : "Search festivals, Durga Puja, Ratha Yatra, Holidays..."}
            className="w-full text-base font-odia bg-transparent outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Tag Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 overflow-x-auto bg-neutral-50/60 dark:bg-neutral-800/40 border-b border-neutral-100 dark:border-neutral-800 text-xs no-scrollbar">
          <span className="text-[11px] font-bold text-neutral-400 shrink-0 font-odia">
            {isOdia ? 'ଶୀଘ୍ର ସନ୍ଧାନ:' : 'Quick Search:'}
          </span>
          {quickTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(isOdia ? tag.label : tag.en)}
              className="px-2.5 py-1 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-orange-50 hover:border-orange-300 dark:hover:bg-neutral-700 font-odia whitespace-nowrap transition-colors cursor-pointer"
            >
              {isOdia ? tag.label : tag.en}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {results.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 font-odia space-y-2">
              <p className="text-base font-bold">
                {isOdia ? 'କୌଣସି ପର୍ବ ମିଳିଲା ନାହିଁ ।' : 'No festivals found.'}
              </p>
              <p className="text-xs">
                {isOdia 
                  ? 'ଦୟାକରି ଇଂରାଜୀ କିମ୍ବା ଓଡ଼ିଆରେ ଅନ୍ୟ ଶବ୍ଦ ଖୋଜନ୍ତୁ (ଯଥା: Durga, Ratha, Raja) ।'
                  : 'Please search in English or Odia (e.g. Durga, Ratha, Raja, Holidays).'}
              </p>
            </div>
          ) : (
            results.map((fest) => {
              const formattedDate = formatSearchDate(fest.dateStr, isOdia);
              const isGovt = fest.isGovtHoliday;

              return (
                <div
                  key={`${fest.id}_${fest.dateStr}`}
                  id={`search-result-${fest.id}`}
                  onClick={() => {
                    onSelectDateStr(fest.dateStr);
                    onClose();
                  }}
                  className={`p-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between gap-3 group border ${
                    isGovt
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/80 hover:bg-emerald-100/70 hover:border-emerald-400'
                      : 'bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200/80 dark:border-neutral-700/80 hover:border-orange-400 dark:hover:border-orange-500 hover:bg-orange-50/30 dark:hover:bg-neutral-700/50'
                  }`}
                >
                  <div className="space-y-1.5 min-w-0 flex-1">
                    {/* Top Row: Type Badge + Title */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-odia shrink-0 ${
                        isGovt
                          ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700'
                          : fest.type === 'festival'
                          ? 'bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300'
                          : fest.type === 'purnima'
                          ? 'bg-yellow-100 dark:bg-yellow-950 text-yellow-900 dark:text-yellow-200'
                          : 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300'
                      }`}>
                        {isGovt 
                          ? (isOdia ? 'ସରକାରୀ ଛୁଟି' : 'Govt Holiday') 
                          : fest.type === 'festival' 
                          ? (isOdia ? 'ମହାପର୍ବ' : 'Festival') 
                          : fest.type === 'purnima' 
                          ? (isOdia ? 'ପୂର୍ଣ୍ଣିମା' : 'Purnima') 
                          : (isOdia ? 'ଓଷା / ବ୍ରତ' : 'Osha / Brata')}
                      </span>

                      <h4 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white font-odia truncate leading-snug">
                        {isOdia ? fest.titleOdia : fest.titleEn}
                      </h4>
                    </div>

                    {/* Exact Target Date */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-700 dark:text-orange-400 font-odia">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{formattedDate}</span>
                    </div>

                    {/* Description / Significance */}
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 font-odia line-clamp-1 leading-relaxed">
                      {isOdia ? fest.significanceOdia : fest.significanceEn}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 text-neutral-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 group-hover:translate-x-1 transition-all">
                    <span className="text-[11px] font-bold font-odia hidden sm:inline">
                      {isOdia ? 'ଦେଖନ୍ତୁ' : 'View'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
