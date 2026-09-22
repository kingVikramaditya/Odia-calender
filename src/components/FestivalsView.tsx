import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  Calendar, 
  ArrowRight, 
  Flame, 
  Award, 
  Tag,
  CheckCircle2,
  Landmark
} from 'lucide-react';
import { COMPREHENSIVE_FESTIVALS, EKADASHI_CALENDAR } from '../data/festivalsData';
import { ODISHA_GOVT_HOLIDAYS_2026 } from '../data/odishaGovtHolidays';
import { LanguageMode, FestivalEvent } from '../types';

interface FestivalsViewProps {
  onSelectDateStr: (dateStr: string) => void;
  language: LanguageMode;
}

export const FestivalsView: React.FC<FestivalsViewProps> = ({
  onSelectDateStr,
  language,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'govt_holiday' | 'festival' | 'osha_brata' | 'ekadashi'>('all');
  const isOdia = language === 'or';

  const categories = [
    { id: 'all', labelOdia: 'ସମସ୍ତ ପର୍ବ ଓ ବ୍ରତ', labelEn: 'All Events' },
    { id: 'govt_holiday', labelOdia: '🏛️ ଓଡ଼ିଶା ସରକାରୀ ଛୁଟି (Govt Holidays)', labelEn: '🏛️ Odisha Govt Holidays' },
    { id: 'festival', labelOdia: 'ପ୍ରମୁଖ ପର୍ବ', labelEn: 'Major Festivals' },
    { id: 'osha_brata', labelOdia: 'ଓଷା ଓ ବ୍ରତ', labelEn: 'Osha & Brata' },
    { id: 'ekadashi', labelOdia: 'ପବିତ୍ର ଏକାଦଶୀ', labelEn: 'Ekadashi Vows' },
  ];

  // Convert govt holidays to FestivalEvent format for unified listing
  const govtHolidayEvents: FestivalEvent[] = useMemo(() => {
    return ODISHA_GOVT_HOLIDAYS_2026.map(h => ({
      id: h.id,
      titleOdia: h.nameOdia,
      titleEn: h.nameEn,
      type: 'govt_holiday',
      significanceOdia: `${h.descriptionOdia} [${h.type === 'gazetted' ? 'ଗେଜେଟେଡ୍ ସରକାରୀ ଛୁଟି' : 'ଐଚ୍ଛିକ ଛୁଟି'}] - ସୂତ୍ର: odishacalendar.com`,
      significanceEn: `${h.descriptionEn} [${h.type === 'gazetted' ? 'Gazetted Holiday' : 'Optional Holiday'}] - Source: odishacalendar.com`,
      ritualsOdia: `${h.dayOfWeekOdia} ତାରିଖ: ${h.dateStr}`,
      ritualsEn: `${h.dayOfWeekEn}, ${h.dateStr}`,
      deityOdia: 'ଓଡ଼ିଶା ସରକାର',
      deityEn: 'Govt of Odisha',
      isGovtHoliday: true,
      tagColor: 'rose',
      dateStr: h.dateStr,
    }));
  }, []);

  const filteredEvents = useMemo(() => {
    let list: FestivalEvent[] = [];
    if (selectedCategory === 'all') {
      list = [...COMPREHENSIVE_FESTIVALS, ...govtHolidayEvents];
    } else if (selectedCategory === 'govt_holiday') {
      list = govtHolidayEvents;
    } else {
      list = COMPREHENSIVE_FESTIVALS.filter(e => e.type === selectedCategory);
    }

    const q = searchQuery.trim().toLowerCase();
    if (!q) return list;

    return list.filter(e => 
      e.titleOdia.toLowerCase().includes(q) ||
      e.titleEn.toLowerCase().includes(q) ||
      e.significanceOdia.toLowerCase().includes(q) ||
      e.significanceEn.toLowerCase().includes(q) ||
      (e.dateStr && e.dateStr.includes(q))
    );
  }, [selectedCategory, searchQuery, govtHolidayEvents]);

  return (
    <div id="drik-festivals-view" className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-red-500/10 dark:from-orange-950/40 dark:via-amber-950/30 dark:to-neutral-900 border border-orange-200/80 dark:border-orange-800/50 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-950 text-orange-900 dark:text-orange-200 border border-orange-300 dark:border-orange-800">
              <Flame className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
              <span>{isOdia ? 'ଓଡ଼ିଶାର ଐତିହ୍ୟ ପର୍ବପର୍ବାଣୀ' : 'Odisha Cultural & Religious Festivals'}</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white font-odia tracking-tight">
              {isOdia ? 'ଓଡ଼ିଆ ପର୍ବପର୍ବାଣୀ, ଓଷା ଓ ବ୍ରତ ନିର୍ଣ୍ଣୟ' : 'Comprehensive Odia Festivals Directory'}
            </h2>

            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-odia max-w-2xl leading-relaxed">
              {isOdia 
                ? 'ରଥଯାତ୍ରା, ରଜ, ପ୍ରଥମାଷ୍ଟମୀ, ମାଣବସା ଗୁରୁବାର, ଖୁଦୁରୁକୁଣୀ ଏବଂ ୨୪ ଗୋଟି ଏକାଦଶୀର ଦୃକ ସିଦ୍ଧାନ୍ତ ଆଧାରିତ ମହତ୍ତ୍ୱ ଓ ପୂଜାବିଧି ।'
                : 'Spiritual significance, rituals, and dates for authentic Odia festivals, vows, fasts, and Ekadashis.'}
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isOdia ? "ପର୍ବ ଖୋଜନ୍ତୁ..." : "Search festival..."}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-odia outline-none focus:border-orange-500 shadow-xs"
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all font-odia ${
                selectedCategory === cat.id
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                  : 'bg-white/80 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
              }`}
            >
              {isOdia ? cat.labelOdia : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Festivals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((fest) => {
          const isGovt = fest.isGovtHoliday || fest.type === 'govt_holiday';
          const targetDateStr = fest.dateStr || '2026-07-16';
          return (
            <div
              key={fest.id}
              id={`festival-card-${fest.id}`}
              className={`p-5 rounded-3xl transition-all flex flex-col justify-between group ${
                isGovt
                  ? 'bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 hover:border-rose-300'
                  : 'bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-orange-300 dark:hover:border-orange-600 hover:shadow-md'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-odia ${
                    isGovt
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : fest.type === 'festival'
                      ? 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300'
                      : fest.type === 'ekadashi'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}>
                    {isGovt ? 'ସରକାରୀ ଛୁଟି' : fest.type === 'festival' ? 'ମହାପର୍ବ' : fest.type === 'ekadashi' ? 'ପବିତ୍ର ଏକାଦଶୀ' : 'ଓଷା / ବ୍ରତ'}
                  </span>

                  {fest.dateStr && (
                    <span className="text-[10px] font-bold font-odia text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md">
                      {fest.dateStr}
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-base font-bold text-neutral-900 dark:text-white font-odia leading-snug">
                    {isOdia ? fest.titleOdia : fest.titleEn}
                  </h4>
                  {fest.deityOdia && !isGovt && (
                    <p className="text-xs text-neutral-500 font-odia mt-0.5">
                      ଇଷ୍ଟଦେବ: <span className="font-semibold text-neutral-700 dark:text-neutral-300">{fest.deityOdia}</span>
                    </p>
                  )}
                </div>

                {/* Significance */}
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-odia leading-relaxed line-clamp-3">
                  {isOdia ? fest.significanceOdia : fest.significanceEn}
                </p>

                {/* Rituals if available */}
                {fest.ritualsOdia && (
                  <div className="p-3 rounded-2xl bg-white/80 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-600 dark:text-neutral-400 font-odia">
                    <strong className="text-neutral-800 dark:text-neutral-200 block text-[10px] uppercase">
                      {isGovt ? 'ବାର ଓ ତାରିଖ:' : 'ପୂଜା ବିଧି ଓ ଭୋଗ:'}
                    </strong>
                    <span>{fest.ritualsOdia}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => onSelectDateStr(targetDateStr)}
                className={`mt-4 w-full py-2.5 px-3 rounded-2xl text-xs font-bold font-odia transition-all flex items-center justify-center gap-2 ${
                  isGovt
                    ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 hover:bg-rose-600 hover:text-white'
                    : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-600 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                <span>{isOdia ? 'କ୍ୟାଲେଣ୍ଡରରେ ଦେଖନ୍ତୁ' : 'Open in Calendar'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
