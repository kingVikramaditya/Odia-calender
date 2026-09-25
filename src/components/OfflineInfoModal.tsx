import React from 'react';
import { 
  Wifi, 
  WifiOff, 
  CheckCircle2, 
  CloudSun, 
  Calendar, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  Download,
  X 
} from 'lucide-react';
import { LanguageMode } from '../types';

interface OfflineInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  isOnline: boolean;
  language: LanguageMode;
  onInstallPwa?: () => void;
  canInstallPwa?: boolean;
}

export const OfflineInfoModal: React.FC<OfflineInfoModalProps> = ({
  isOpen,
  onClose,
  isOnline,
  language,
  onInstallPwa,
  canInstallPwa,
}) => {
  if (!isOpen) return null;

  const isOdia = language === 'or';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-5 pb-4 border-b border-neutral-200/80 dark:border-neutral-800 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-xs ${
              isOnline 
                ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                : 'bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-800'
            }`}>
              {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5 animate-pulse" />}
            </div>
            <div>
              <h2 className={`text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2 ${isOdia ? 'font-odia' : 'font-sans'}`}>
                <span>{isOdia ? 'ଅଫଲାଇନ୍ କାର୍ଯ୍ୟକ୍ଷମତା' : 'Offline Capabilities'}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  isOnline 
                    ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' 
                    : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
                }`}>
                  {isOnline ? (isOdia ? 'ଅନଲାଇନ୍ ସଂଯୁକ୍ତ' : 'Online') : (isOdia ? 'ଅଫଲାଇନ୍ ମୋଡ୍' : 'Offline Mode')}
                </span>
              </h2>
              <p className={`text-xs text-neutral-500 dark:text-neutral-400 ${isOdia ? 'font-odia' : 'font-sans'}`}>
                {isOdia 
                  ? 'ବିନା ଇଣ୍ଟରନେଟରେ ମଧ୍ୟ ପଞ୍ଜିକା ଓ ସମସ୍ତ ଗଣନା ୧୦୦% କାର୍ଯ୍ୟକ୍ଷମ'
                  : 'Calendar & astrological computations work 100% offline'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto text-xs sm:text-sm">
          {/* Status Box */}
          <div className={`p-3.5 rounded-2xl border ${
            isOnline 
              ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200' 
              : 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60 text-amber-950 dark:text-amber-200'
          }`}>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <div className={isOdia ? 'font-odia' : 'font-sans'}>
                <p className="font-bold text-xs sm:text-sm">
                  {isOdia 
                    ? 'ହଁ, ଆପଣ ଇଣ୍ଟରନେଟ୍ ଥାଉ ବା ନଥାଉ ସବୁବେଳେ ଏହାକୁ ବ୍ୟବହାର କରିପାରିବେ!' 
                    : 'Yes, you can use this app with or without internet!'}
                </p>
                <p className="text-[11px] sm:text-xs mt-1 text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {isOdia
                    ? 'ଆମର ପଞ୍ଚାଙ୍ଗ ଗଣନା କୌଣସି ବାହ୍ୟ ସର୍ଭର ଉପରେ ନିର୍ଭର କରେ ନାହିଁ। ତିଥି, ନକ୍ଷତ୍ର, ସୂର୍ଯ୍ୟୋଦୟ, ରାହୁକାଳ ଏବଂ ପର୍ବପର୍ବାଣୀର ସମସ୍ତ ଗାଣିତିକ ସୂତ୍ର ଆପଣଙ୍କ ଫୋନ୍ ବା କମ୍ପ୍ୟୁଟରରେ ସ୍ୱୟଂଚାଳିତ ଭାବେ ଗଣନା ହୁଏ।'
                    : 'Our Panchang engine does not rely on external servers. All tithi, nakshatra, sunrise/sunset, rahu kala, and festival algorithms run directly on your device mathematically.'}
                </p>
              </div>
            </div>
          </div>

          {/* 100% Offline Features */}
          <div className="space-y-2">
            <h3 className={`text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 ${isOdia ? 'font-odia' : 'font-sans'}`}>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>{isOdia ? 'ବିନା ଇଣ୍ଟରନେଟରେ କଣ କଣ ଚାଲିବ (୧୦୦% ଅଫଲାଇନ୍):' : 'Works 100% Offline (No Internet Needed):'}</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/60 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-500 shrink-0" />
                <span className={isOdia ? 'font-odia' : 'font-sans'}>
                  {isOdia ? 'ସମସ୍ତ ବର୍ଷ ଓ ମାସର ପୂର୍ଣ୍ଣ କ୍ୟାଲେଣ୍ଡର' : 'Complete multi-year calendar'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/60 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span className={isOdia ? 'font-odia' : 'font-sans'}>
                  {isOdia ? 'ଦୈନିକ ପଞ୍ଚାଙ୍ଗ, ତିଥି, ନକ୍ଷତ୍ର, ରାହୁକାଳ' : 'Daily Panchang, Tithi & Timings'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/60 flex items-center gap-2">
                <span className="text-sm">🚩</span>
                <span className={isOdia ? 'font-odia' : 'font-sans'}>
                  {isOdia ? 'ପର୍ବପର୍ବାଣୀ, ଓଷା-ବ୍ରତ ଓ ସରକାରୀ ଛୁଟି' : 'Festivals, Osha-Brata & Holidays'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/60 flex items-center gap-2">
                <span className="text-sm">⏳</span>
                <span className={isOdia ? 'font-odia' : 'font-sans'}>
                  {isOdia ? 'ଚୌଘଡ଼ିଆ ଓ ଶୁଭ ମୁହୂର୍ତ୍ତ ଗଣନା' : 'Choghadiya & Shubh Muhurtas'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/60 flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-500 shrink-0" />
                <span className={isOdia ? 'font-odia' : 'font-sans'}>
                  {isOdia ? '୧୨ ଗୋଟି ରାଶିର ଦୈନିକ ରାଶିଫଳ' : 'Daily Rashifal for 12 signs'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/60 flex items-center gap-2">
                <span className="text-sm">🕉️</span>
                <span className={isOdia ? 'font-odia' : 'font-sans'}>
                  {isOdia ? 'ବୈଦିକ ସଂକଳ୍ପ ମନ୍ତ୍ର ଓ ରିମାଇଣ୍ଡର' : 'Vedic Sankalpa & Saved Notes'}
                </span>
              </div>
            </div>
          </div>

          {/* Features Requiring Internet & Offline Handling */}
          <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-700/60 space-y-1.5">
            <h4 className={`text-xs font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 ${isOdia ? 'font-odia' : 'font-sans'}`}>
              <CloudSun className="w-3.5 h-3.5 text-sky-500" />
              <span>{isOdia ? 'ପାଣିପାଗ ତଥ୍ୟ ଅଫଲାଇନ୍ କିପରି କାମ କରେ?' : 'How Weather behaves offline:'}</span>
            </h4>
            <p className={`text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed ${isOdia ? 'font-odia' : 'font-sans'}`}>
              {isOdia
                ? 'ଲାଇଭ୍ ପାଣିପାଗ ଅନଲାଇନ୍ ଥିବାବେଳେ ସତେଜ ହୁଏ। ଯଦି ଆପଣ ଅଫଲାଇନ୍ ଥାଆନ୍ତି, ତେବେ ଶେଷ ଥର ସଂରକ୍ଷିତ ହୋଇଥିବା ପାଣିପାଗ ତଥ୍ୟ କିମ୍ବା ଜିଲ୍ଲାର ଡିଫଲ୍ଟ ଆକଳନ ସ୍ୱୟଂଚାଳିତ ଭାବେ ପ୍ରଦର୍ଶିତ ହୁଏ, ଯାହା ଦ୍ୱାରା ଆପ୍ କଦାପି ବନ୍ଦ ହୁଏ ନାହିଁ।'
                : 'Live weather updates in real-time when online. When offline, it gracefully falls back to your last cached weather or district seasonal averages so the app never fails or stumbles.'}
            </p>
          </div>

          {/* PWA Install Opportunity */}
          {canInstallPwa && onInstallPwa && (
            <div className="p-3.5 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-between gap-3">
              <div className={isOdia ? 'font-odia' : 'font-sans'}>
                <p className="font-bold text-xs text-orange-700 dark:text-orange-300">
                  {isOdia ? 'ହୋମ୍ ସ୍କ୍ରିନରେ ଆପ୍ ସ୍ଥାପନ କରନ୍ତୁ' : 'Install as Offline App'}
                </p>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                  {isOdia ? 'ନେଟିଭ୍ ଆପ୍ ପରି ୧ କ୍ଲିକ୍‌ରେ ଖୋଲନ୍ତୁ' : 'Access instantly offline like a native app'}
                </p>
              </div>
              <button
                type="button"
                onClick={onInstallPwa}
                className="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isOdia ? 'ଇନଷ୍ଟଲ୍' : 'Install'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 px-5 border-t border-neutral-200/80 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold hover:opacity-90 transition-opacity ${isOdia ? 'font-odia' : 'font-sans'}`}
          >
            {isOdia ? 'ବୁଝିଲି (ଠିକ୍ ଅଛି)' : 'Got it (Close)'}
          </button>
        </div>
      </div>
    </div>
  );
};
