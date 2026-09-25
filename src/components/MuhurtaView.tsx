import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Home, 
  Heart, 
  Car, 
  Briefcase, 
  Award,
  Filter
} from 'lucide-react';
import { SAMPLE_MUHURTAS } from '../data/festivalsData';
import { LanguageMode, MuhurtaItem } from '../types';
import { toOdiaNumber } from '../data/odiaConstants';

interface MuhurtaViewProps {
  onSelectDateStr: (dateStr: string) => void;
  language: LanguageMode;
}

export const MuhurtaView: React.FC<MuhurtaViewProps> = ({
  onSelectDateStr,
  language,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const isOdia = language === 'or';

  const filterOptions = [
    { id: 'all', labelOdia: 'ସମସ୍ତ ଶୁଭ ମୁହୂର୍ତ୍ତ', labelEn: 'All Muhurtas' },
    { id: 'marriage', labelOdia: 'ବିବାହ', labelEn: 'Marriage (Vivaha)' },
    { id: 'griha_pravesh', labelOdia: 'ଗୃହ ପ୍ରବେଶ', labelEn: 'Griha Pravesh' },
    { id: 'upanayana', labelOdia: 'ବ୍ରତୋପନୟନ', labelEn: 'Upanayana' },
    { id: 'vehicle', labelOdia: 'ଯାନବାହନ କ୍ରୟ', labelEn: 'Vehicle Purchase' },
    { id: 'business', labelOdia: 'ବାଣିଜ୍ୟ / କାର୍ଯ୍ୟାରମ୍ଭ', labelEn: 'Business Launch' },
  ];

  const filteredMuhurtas = SAMPLE_MUHURTAS.filter(m => {
    if (filterType === 'all') return true;
    return m.type === filterType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'marriage':
        return <Heart className="w-4 h-4 text-rose-500" />;
      case 'griha_pravesh':
        return <Home className="w-4 h-4 text-emerald-500" />;
      case 'vehicle':
        return <Car className="w-4 h-4 text-blue-500" />;
      case 'business':
        return <Briefcase className="w-4 h-4 text-amber-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div id="drik-muhurta-view" className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-amber-500/10 dark:from-purple-950/40 dark:via-pink-950/20 dark:to-neutral-900 border border-purple-200/80 dark:border-purple-800/50 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-200 border border-purple-300 dark:border-purple-800">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>{isOdia ? 'ଦୃକ ସିଦ୍ଧାନ୍ତ ଶୁଦ୍ଧ ମୁହୂର୍ତ୍ତ ଗଣନା' : 'Drik Verified Auspicious Windows'}</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white font-odia tracking-tight">
              {isOdia ? '୨୦୨୬ ବର୍ଷର ପ୍ରମୁଖ ଶୁଭ ମୁହୂର୍ତ୍ତ ସୂଚୀ' : '2026 Auspicious Muhurtas Explorer'}
            </h2>

            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-odia max-w-2xl leading-relaxed">
              {isOdia 
                ? 'ବିବାହ, ଗୃହ ପ୍ରବେଶ, ବ୍ରତୋପନୟନ, ନୂତନ ଯାନ କ୍ରୟ ଏବଂ ବ୍ୟବସାୟ ଶୁଭାରମ୍ଭ ପାଇଁ ପଞ୍ଚାଙ୍ଗ ଶୁଦ୍ଧି (ତିଥି, ବାର, ନକ୍ଷତ୍ର, ଯୋଗ, କରଣ) ଯୁକ୍ତ ସମୟ ।'
                : 'Curated auspicious astrological timings with 5-limb shuddhi for weddings, housewarming, vehicle purchases, and business inauguration.'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-neutral-700 dark:text-neutral-300 bg-white/80 dark:bg-neutral-800/80 px-4 py-2 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-xs self-start md:self-auto shrink-0 font-odia">
            <Award className="w-4 h-4 text-amber-500" />
            <span>{filteredMuhurtas.length} {isOdia ? 'ଟି ମୁହୂର୍ତ୍ତ ଉପଲବ୍ଧ' : 'Muhurtas Available'}</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setFilterType(opt.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all font-odia ${
                filterType === opt.id
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                  : 'bg-white/80 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
              }`}
            >
              {isOdia ? opt.labelOdia : opt.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Muhurta Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMuhurtas.map((item) => (
          <div
            key={item.id}
            id={`muhurta-card-${item.id}`}
            className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-100 dark:border-purple-900 flex items-center justify-center">
                    {getTypeIcon(item.type)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white font-odia">
                      {isOdia ? item.typeOdia : item.typeEn}
                    </h4>
                    <span className="text-[11px] text-neutral-500 font-odia">
                      {item.nakshatra} • {item.tithi}
                    </span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-odia">
                  {isOdia ? (item.rating === 'Uttama' ? 'ଉତ୍ତମ' : 'ମଧ୍ୟମ') : (item.rating === 'Uttama' ? 'Excellent' : 'Moderate')}
                </span>
              </div>

              {/* Date & Time Window */}
              <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800 space-y-1.5 text-xs font-odia">
                <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold">
                  <Calendar className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span>{item.dateStr}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                  <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span>{isOdia ? toOdiaNumber(item.timeWindow) : item.timeWindow}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-odia leading-relaxed line-clamp-3">
                {isOdia ? item.descriptionOdia : item.descriptionEn}
              </p>
            </div>

            {/* Jump to Date button */}
            <button
              onClick={() => onSelectDateStr(item.dateStr)}
              className="mt-4 w-full py-2.5 px-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:bg-purple-500 hover:text-white dark:hover:bg-purple-600 text-neutral-700 dark:text-neutral-300 text-xs font-bold font-odia transition-all flex items-center justify-center gap-2 group-hover:bg-purple-500 group-hover:text-white"
            >
              <span>{isOdia ? 'ଏହି ଦିନର ପାଞ୍ଜି ଦେଖନ୍ତୁ' : 'View in Calendar'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
