import React, { useState } from 'react';
import { Wifi, WifiOff, X, Info } from 'lucide-react';
import { LanguageMode } from '../types';

interface NetworkStatusToastProps {
  isOnline: boolean;
  justCameOnline: boolean;
  language: LanguageMode;
  onOpenDetails: () => void;
}

export const NetworkStatusToast: React.FC<NetworkStatusToastProps> = ({
  isOnline,
  justCameOnline,
  language,
  onOpenDetails,
}) => {
  const [dismissedOffline, setDismissedOffline] = useState(false);
  const isOdia = language === 'or';

  // If online and not just transitioned back, keep screen clean
  if (isOnline && !justCameOnline) {
    return null;
  }

  // If offline but user explicitly dismissed for this session
  if (!isOnline && dismissedOffline) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 max-w-sm sm:max-w-md animate-bounce-in">
      {justCameOnline ? (
        <div className="flex items-center gap-3 p-3 px-4 rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-950/20 text-xs font-semibold backdrop-blur-md">
          <Wifi className="w-4 h-4 shrink-0 text-emerald-200 animate-pulse" />
          <span className={isOdia ? 'font-odia' : 'font-sans'}>
            {isOdia ? 'ଅନ୍‌ଲାଇନ୍ ସଂଯୋଗ ହୋଇଛି • ପାଣିପାଗ ତଥ୍ୟ ସତେଜ ହେଉଛି' : 'Back Online • Live weather active'}
          </span>
        </div>
      ) : (
        <div className="flex items-start gap-3 p-3.5 px-4 rounded-2xl bg-neutral-900/95 dark:bg-neutral-800/95 text-white border border-amber-500/40 shadow-2xl text-xs backdrop-blur-md">
          <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
            <WifiOff className="w-4 h-4 animate-pulse" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-1.5">
              <span className={`font-bold text-amber-400 ${isOdia ? 'font-odia' : 'font-sans'}`}>
                {isOdia ? 'ଅଫଲାଇନ୍ ମୋଡ୍ ସକ୍ରିୟ' : 'Offline Mode Active'}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                100% OK
              </span>
            </div>
            <p className={`text-[11px] text-neutral-300 leading-tight ${isOdia ? 'font-odia' : 'font-sans'}`}>
              {isOdia
                ? 'ପଞ୍ଜିକା, ତିଥି, ମୁହୂର୍ତ୍ତ ଓ ପର୍ବପର୍ବାଣୀ ବିନା ଇଣ୍ଟରନେଟରେ ସମ୍ପୂର୍ଣ୍ଣ ଚାଲୁଛି।'
                : 'Calendar, panchang, tithi & festivals work 100% without internet.'}
            </p>
            <button
              type="button"
              onClick={onOpenDetails}
              className={`inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 pt-0.5 cursor-pointer ${isOdia ? 'font-odia' : 'font-sans'}`}
            >
              <Info className="w-3 h-3" />
              <span>{isOdia ? 'ଅଧିକ ବିବରଣୀ' : 'View Details'}</span>
            </button>
          </div>
          <button
            type="button"
            onClick={() => setDismissedOffline(true)}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
