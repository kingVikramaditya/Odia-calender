import React from 'react';
import { X, CalendarDays, ArrowRight, Sparkles } from 'lucide-react';
import { ODIA_MONTHS, toOdiaNumber } from '../data/odiaConstants';
import { LanguageMode } from '../types';

interface AnnualCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMonth: (monthIndex: number) => void;
  language: LanguageMode;
  year: number;
}

export const AnnualCalendarModal: React.FC<AnnualCalendarModalProps> = ({
  isOpen,
  onClose,
  onSelectMonth,
  language,
  year,
}) => {
  if (!isOpen) return null;

  const isOdia = language === 'or';

  // Key festivals per Odia month
  const monthHighlights: Record<number, { festivalsOdia: string[]; festivalsEn: string[] }> = {
    0: { 
      festivalsOdia: ['ପଣା ସଂକ୍ରାନ୍ତି (ମହାବିଷୁବ)', 'ଅକ୍ଷୟ ତୃତୀୟା (ଚନ୍ଦନ ଯାତ୍ରା)', 'ମୋହିନୀ ଏକାଦଶୀ'],
      festivalsEn: ['Pana Sankranti', 'Akshaya Tritiya', 'Mohini Ekadashi']
    },
    1: { 
      festivalsOdia: ['ସାବିତ୍ରୀ ବ୍ରତ', 'ଦେବସ୍ନାନ ପୂର୍ଣ୍ଣିମା', 'ଶୀତଳ ଷଷ୍ଠୀ', 'ନିର୍ଜଳା ଏକାଦଶୀ'],
      festivalsEn: ['Sabitri Brata', 'Debasnana Purnima', 'Sitala Sasthi', 'Nirjala Ekadashi']
    },
    2: { 
      festivalsOdia: ['ରଜ ପର୍ବ (ତିନି ଦିନ)', 'ଘୋଷଯାତ୍ରା (ରଥଯାତ୍ରା)', 'ବାହୁଡ଼ା ଯାତ୍ରା', 'ସୁନାବେଶ'],
      festivalsEn: ['Raja Parba', 'Ratha Yatra', 'Bahuda Yatra', 'Suna Besha']
    },
    3: { 
      festivalsOdia: ['ଚିତାଉ ଅମାବାସ୍ୟା', 'ଗହ୍ମା ପୂର୍ଣ୍ଣିମା (ରାକ୍ଷୀ)', 'ବଳଭଦ୍ର ଜନ୍ମ', 'ଶ୍ରାବଣ ସୋମବାର'],
      festivalsEn: ['Chitau Amavasya', 'Gamha Purnima (Rakhi)', 'Balabhadra Janma', 'Srabana Somabar']
    },
    4: { 
      festivalsOdia: ['ଶ୍ରୀକୃଷ୍ଣ ଜନ୍ମାଷ୍ଟମୀ', 'ଗଣେଶ ଚତୁର୍ଥୀ', 'ନୂଆଖାଇ (ପଶ୍ଚିମ ଓଡ଼ିଶା)', 'ଖୁଦୁରୁକୁଣୀ ଓଷା'],
      festivalsEn: ['Krishna Janmashtami', 'Ganesh Chaturthi', 'Nuakhai', 'Khudurukuni Osha']
    },
    5: { 
      festivalsOdia: ['ମହାଳୟା (ପିତୃପକ୍ଷ)', 'ଦୁର୍ଗାପୂଜା (ମହାଷ୍ଟମୀ)', 'ବିଜୟା ଦଶମୀ (ଦସହରା)', 'କୁମାର ପୂର୍ଣ୍ଣିମା'],
      festivalsEn: ['Mahalaya', 'Durga Puja', 'Dussehra', 'Kumar Purnima']
    },
    6: { 
      festivalsOdia: ['ଦୀପାବଳି ଓ କାଳୀପୂଜା', 'ରାଧା ଦାମୋଦର ବ୍ରତ', 'ପଞ୍ଚକ ବ୍ରତ', 'କାର୍ତ୍ତିକ ପୂର୍ଣ୍ଣିମା (ବାଲିଯାତ୍ରା)'],
      festivalsEn: ['Deepavali & Kali Puja', 'Radha Damodara Vrata', 'Panchaka', 'Kartika Purnima (Bali Yatra)']
    },
    7: { 
      festivalsOdia: ['ମାଣବସା ଗୁରୁବାର', 'ପ୍ରଥମାଷ୍ଟମୀ (ଏଣ୍ଡୁରି ପିଠା)', 'ମୋକ୍ଷଦା ଏକାଦଶୀ (ଗୀତା ଜୟନ୍ତୀ)'],
      festivalsEn: ['Manabasa Gurubara', 'Prathamastami', 'Mokshada Ekadashi (Gita Jayanti)']
    },
    8: { 
      festivalsOdia: ['ବକୁଳ ଅମାବାସ୍ୟା', 'ଧନୁ ସଂକ୍ରାନ୍ତି', 'ଶ୍ରୀମନ୍ଦିର ପହିଲି ଭୋଗ'],
      festivalsEn: ['Bakula Amavasya', 'Dhanu Sankranti', 'Pahili Bhoga']
    },
    9: { 
      festivalsOdia: ['ମକର ସଂକ୍ରାନ୍ତି', 'ସରସ୍ୱତୀ ପୂଜା (ବସନ୍ତ ପଞ୍ଚମୀ)', 'ଭୌମୀ ଏକାଦଶୀ', 'ମାଘ ପୂର୍ଣ୍ଣିମା'],
      festivalsEn: ['Makar Sankranti', 'Saraswati Puja', 'Bhaumi Ekadashi', 'Magha Purnima']
    },
    10: { 
      festivalsOdia: ['ମହା ଶିବରାତ୍ରି (ଜାଗର)', 'ଫଗୁ ଦଶମୀ', 'ଦୋଳ ପୂର୍ଣ୍ଣିମା (ହୋଲି)', 'ପାଞ୍ଜି ପୂଜନ'],
      festivalsEn: ['Maha Shivaratri (Jagara)', 'Phagu Dashami', 'Dola Purnima & Holi', 'Panji Pujan']
    },
    11: { 
      festivalsOdia: ['ଉତ୍କଳ ଦିବସ', 'ଶ୍ରୀରାମ ନବମୀ', 'ବାସନ୍ତୀ ଦୁର୍ଗାପୂଜା', 'ଚୈତ୍ର ପୂର୍ଣ୍ଣିମା (ଚଇତି ଘୋଡ଼ା)'],
      festivalsEn: ['Utkal Divas', 'Sri Rama Navami', 'Basanti Durga Puja', 'Chaitra Purnima']
    }
  };

  return (
    <div 
      id="annual-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="annual-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 transition-all"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-odia">
                {isOdia ? '୧୨ ମାସର ଓଡ଼ିଆ କ୍ୟାଲେଣ୍ଡର ପର୍ବପର୍ବାଣୀ ସୂଚୀ' : '12-Month Odia Calendar & Festivals'}
              </h3>
              <p className="text-xs text-neutral-500 font-medium font-odia">
                {isOdia ? 'ବୈଶାଖ ଠାରୁ ଚୈତ୍ର ପର୍ଯ୍ୟନ୍ତ ସମସ୍ତ ମାସର ମୁଖ୍ୟ ଉତ୍ସବ' : 'Comprehensive list of festivals across all 12 Odia solar months'}
              </p>
            </div>
          </div>

          <button
            id="close-annual-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 12 Months Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 my-5">
          {ODIA_MONTHS.map((om, idx) => {
            const hls = monthHighlights[idx];
            // Corresponding Gregorian month approximation: Baisakha ~ April/May
            const gregApproxMonth = (idx + 3) % 12;

            return (
              <div
                key={om.index}
                id={`annual-month-card-${om.index}`}
                className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80 hover:border-orange-400 dark:hover:border-orange-500 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 font-odia">
                      {toOdiaNumber(idx + 1)}. {om.seasonOdia} ଋତୁ
                    </span>
                    <span className="text-xs font-semibold text-neutral-400">
                      {om.approxGMonth}
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-neutral-900 dark:text-white font-odia mt-2">
                    {om.nameOdia} ({om.nameEn})
                  </h4>

                  {/* Festivals list bullets */}
                  <div className="space-y-1 mt-2.5">
                    {hls.festivalsOdia.map((fest, fIdx) => (
                      <div key={fIdx} className="text-xs text-neutral-700 dark:text-neutral-300 font-odia flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                        <span className="truncate">{fest}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Jump to this month button */}
                <button
                  id={`jump-to-month-${idx}`}
                  onClick={() => {
                    onSelectMonth(gregApproxMonth);
                    onClose();
                  }}
                  className="mt-4 pt-2.5 border-t border-neutral-200/60 dark:border-neutral-700 text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 flex items-center justify-between font-odia transition-colors"
                >
                  <span>ଏହି ମାସକୁ ଯାଆନ୍ତୁ</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
