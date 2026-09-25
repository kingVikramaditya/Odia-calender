import React, { useState } from 'react';
import { X, Share2, Copy, Check, MessageSquare } from 'lucide-react';
import { PanchangDay, LanguageMode } from '../types';
import { toOdiaNumber } from '../data/odiaConstants';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: PanchangDay;
  language: LanguageMode;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  day,
  language,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;
  const isOdia = language === 'or';

  const shareText = isOdia 
    ? `🌸 **ଆଜିର ଓଡ଼ିଆ ପଞ୍ଚାଙ୍ଗ (${day.dateStr})** 🌸
📅 **${day.solarMonthNameOdia || day.odiaMonthNameOdia} ${day.odiaDayOfSolarMonthOdia} ଦିନ (${day.lunarMonthNameOdia || day.odiaMonthNameOdia} ମାସ), ${day.varaOdia}**
✨ ସାଲ: ${day.odiaYearSal} • ଶକାବ୍ଦ: ${day.sakabda}

🌕 **ତିଥି**: ${day.tithi.nameOdia} (${day.tithi.pakshaOdia}) - ${toOdiaNumber(day.tithi.endTime)} ପର୍ଯ୍ୟନ୍ତ
⭐ **ନକ୍ଷତ୍ର**: ${day.nakshatra.nameOdia} (ପଦ ${toOdiaNumber(day.nakshatra.pada)})
🌿 **ଯୋଗ**: ${day.yoga.nameOdia} | **କରଣ**: ${day.karana.nameOdia}
🌙 **ଚନ୍ଦ୍ର ରାଶି**: ${day.rashi.moonSignOdia} (${day.moonPhase.nameOdia})

🌅 **ସୂର୍ଯ୍ୟୋଦୟ**: ${toOdiaNumber(day.timings.sunrise)} | **ସୂର୍ଯ୍ୟାସ୍ତ**: ${toOdiaNumber(day.timings.sunset)}
🌟 **ଅଭିଜିତ୍ ମୁହୂର୍ତ୍ତ**: ${toOdiaNumber(day.timings.abhijit.start)} ରୁ ${toOdiaNumber(day.timings.abhijit.end)}
⚠️ **ରାହୁ କାଳ**: ${toOdiaNumber(day.timings.rahuKala.start)} ରୁ ${toOdiaNumber(day.timings.rahuKala.end)}
⛔ **ବାର ବେଳା**: ${toOdiaNumber(day.timings.baraBela.start)} ରୁ ${toOdiaNumber(day.timings.baraBela.end)}
${day.events.length > 0 ? `\n🎉 **ପର୍ବ / ବିଶେଷତା**: ${day.events.map(e => e.titleOdia).join(', ')}` : ''}

ଜୟ ଜଗନ୍ନାଥ 🙏✨`
    : `🌸 **Today's Odia Panchang (${day.dateStr})** 🌸
📅 **${day.solarMonthNameEn || day.odiaMonthNameEn} Day ${day.odiaDayOfSolarMonth} (${day.lunarMonthNameEn || day.odiaMonthNameEn} Masa), ${day.varaEn}**
✨ Sal: ${day.odiaYearSal} • Sakabda: ${day.sakabda}

🌕 **Tithi**: ${day.tithi.nameEn} (${day.tithi.pakshaEn}) - till ${day.tithi.endTime}
⭐ **Nakshatra**: ${day.nakshatra.nameEn} (Pada ${day.nakshatra.pada})
🌿 **Yoga**: ${day.yoga.nameEn} | **Karana**: ${day.karana.nameEn}
🌙 **Moon Sign**: ${day.rashi.moonSignEn} (${day.moonPhase.nameEn})

🌅 **Sunrise**: ${day.timings.sunrise} | **Sunset**: ${day.timings.sunset}
🌟 **Abhijit Muhurta**: ${day.timings.abhijit.start} to ${day.timings.abhijit.end}
⚠️ **Rahu Kala**: ${day.timings.rahuKala.start} to ${day.timings.rahuKala.end}
⛔ **Bara Bela**: ${day.timings.baraBela.start} to ${day.timings.baraBela.end}
${day.events.length > 0 ? `\n🎉 **Festivals / Events**: ${day.events.map(e => e.titleEn || e.titleOdia).join(', ')}` : ''}

Jai Jagannath 🙏✨`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      id="share-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="share-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 transition-all"
      >
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white font-odia">
              {isOdia ? 'ଆଜିର ପଞ୍ଚାଙ୍ଗ ସେୟାର୍ କରନ୍ତୁ' : 'Share Daily Panchang'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview Card */}
        <div className="my-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-xs font-odia text-neutral-800 dark:text-neutral-200 whitespace-pre-line leading-relaxed max-h-60 overflow-y-auto font-mono">
          {shareText}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold font-odia flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? (isOdia ? 'କପି ହୋଇଗଲା!' : 'Copied!') : (isOdia ? 'ପଞ୍ଚାଙ୍ଗ କପି କରନ୍ତୁ' : 'Copy Panchang')}</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold font-odia flex items-center gap-2 shadow-sm transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
