import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Briefcase, 
  BookOpen, 
  Code2, 
  Check, 
  Copy, 
  Share2, 
  Sparkles, 
  Landmark, 
  Scroll, 
  Feather, 
  Award,
  Globe
} from 'lucide-react';
import { LanguageMode } from '../types';
import creatorPhoto from '../assets/creator.jpg';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageMode;
  onSetLanguage?: (lang: LanguageMode) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  language,
  onSetLanguage,
}) => {
  // Sync local view mode with app language, but allow modal-specific toggling
  const [modalLang, setModalLang] = useState<'or' | 'en' | 'both'>('or');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (language === 'or') setModalLang('or');
    else if (language === 'en') setModalLang('en');
    else setModalLang('both');
  }, [language]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const showOdia = modalLang === 'or' || modalLang === 'both';
  const showEn = modalLang === 'en' || modalLang === 'both';
  const isOdiaActive = modalLang === 'or';

  const nameEn = "Sri Nandan Kumar Mohapatra";
  const nameOdia = "ଶ୍ରୀ ନନ୍ଦନ କୁମାର ମହାପାତ୍ର";

  const bioEn = "A dedicated administrative professional based in Bhubaneswar, originally from Baleswar. Balancing his duties in the Government of Odisha with a deep passion for storytelling, he crafts fiction inspired by the rich history of Kalinga and develops modern software to celebrate Odia heritage.";

  const bioOdia = "ମୂଳତଃ ବାଲେଶ୍ୱରର ବାସିନ୍ଦା ତଥା ବର୍ତ୍ତମାନ ଭୁବନେଶ୍ୱରରେ କାର୍ଯ୍ୟରତ ଜଣେ ନିଷ୍ଠାବାନ ପ୍ରଶାସନିକ କର୍ମଚାରୀ। ଓଡ଼ିଶା ସରକାରଙ୍କ ଅଧୀନରେ ନିଜର ଦାୟିତ୍ୱ ତୁଲାଇବା ସହିତ ଗଳ୍ପ ରଚନା ପ୍ରତି ଥିବା ନିଜର ଗଭୀର ଆଗ୍ରହ ମଧ୍ୟରେ ସେ ସୁନ୍ଦର ସମନ୍ୱୟ ରକ୍ଷା କରିଆସୁଛନ୍ତି। କଳିଙ୍ଗର ସମୃଦ୍ଧ ଇତିହାସରୁ ପ୍ରେରଣା ପାଇ ସେ ଐତିହାସିକ କାହାଣୀ ରଚନା କରିବା ସହ ଓଡ଼ିଆ ଐତିହ୍ୟର ପ୍ରସାର ପାଇଁ ଆଧୁନିକ ସଫ୍ଟୱେର୍ ମଧ୍ୟ ବିକାଶ କରନ୍ତି।";

  const handleCopyBio = () => {
    const text = modalLang === 'or' 
      ? `${nameOdia}\n\n${bioOdia}`
      : modalLang === 'en'
      ? `${nameEn}\n\n${bioEn}`
      : `${nameOdia} (${nameEn})\n\n[ଓଡ଼ିଆ]\n${bioOdia}\n\n[English]\n${bioEn}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareBio = () => {
    const text = modalLang === 'or'
      ? `🙏 **${nameOdia}**\n\n${bioOdia}`
      : `🙏 **${nameEn}**\n\n${bioEn}`;

    if (navigator.share) {
      navigator.share({
        title: modalLang === 'or' ? nameOdia : nameEn,
        text,
      }).catch(() => {});
    } else {
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    }
  };

  const handleSelectLang = (l: 'or' | 'en' | 'both') => {
    setModalLang(l);
    if (onSetLanguage) {
      onSetLanguage(l === 'both' ? 'both' : l);
    }
  };

  return (
    <div 
      id="profile-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="profile-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-2xl overflow-hidden transition-all max-h-[92vh] flex flex-col"
      >
        {/* Top Ornate Decorative Banner */}
        <div className="relative h-32 sm:h-36 bg-gradient-to-r from-orange-600 via-amber-600 to-rose-700 p-4 sm:p-6 overflow-hidden shrink-0">
          {/* Subtle cultural geometric background motifs */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-amber-400/20 blur-xl" />

          {/* Top Controls inside banner */}
          <div className="relative z-10 flex items-center justify-between">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{isOdiaActive ? 'ପ୍ରୋଫାଇଲ୍ ବିବରଣୀ' : 'Creator Profile'}</span>
            </div>

            {/* Language Switcher Tabs inside Modal */}
            <div className="flex items-center gap-1 bg-black/30 backdrop-blur-md p-0.5 rounded-xl border border-white/20">
              <button
                type="button"
                onClick={() => handleSelectLang('or')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  modalLang === 'or'
                    ? 'bg-white text-orange-900 shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                ଓଡ଼ିଆ
              </button>
              <button
                type="button"
                onClick={() => handleSelectLang('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  modalLang === 'en'
                    ? 'bg-white text-orange-900 shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => handleSelectLang('both')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  modalLang === 'both'
                    ? 'bg-white text-orange-900 shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {modalLang === 'or' ? 'ଉଭୟ' : 'Both'}
              </button>
            </div>

            {/* Close Button */}
            <button
              id="profile-modal-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white border border-white/20 transition-colors cursor-pointer"
              title={isOdiaActive ? 'ବନ୍ଦ କରନ୍ତୁ' : 'Close'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 pb-6 -mt-16 sm:-mt-20 relative z-10 space-y-6">
          
          {/* Avatar & Hero Name Row */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 text-center sm:text-left">
            
            {/* Larger Circle Avatar */}
            <div className="relative group shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden p-1 bg-white dark:bg-neutral-900 ring-4 ring-orange-500/30 dark:ring-orange-400/40 shadow-xl transition-transform duration-300 group-hover:scale-105">
                <img 
                  src={creatorPhoto} 
                  alt={nameEn} 
                  className="w-full h-full object-cover object-center rounded-full"
                />
              </div>

              {/* Verified Author / Admin Badge */}
              <div 
                className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 p-1.5 sm:p-2 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-md ring-2 ring-white dark:ring-neutral-900"
                title={isOdiaActive ? 'ପ୍ରଶାସନିକ ଅଧିକାରୀ ଓ ଲେଖକ' : 'Administrative Professional & Author'}
              >
                <Award className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
            </div>

            {/* Name & Title */}
            <div className="flex-1 min-w-0 pb-1">
              {modalLang === 'or' && (
                <>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white font-odia tracking-tight">
                    {nameOdia}
                  </h2>
                  <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 mt-0.5">
                    {nameEn}
                  </p>
                </>
              )}

              {modalLang === 'en' && (
                <>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white font-sans tracking-tight">
                    {nameEn}
                  </h2>
                  <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 font-odia mt-0.5">
                    {nameOdia}
                  </p>
                </>
              )}

              {modalLang === 'both' && (
                <>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white font-odia tracking-tight">
                    {nameOdia}
                  </h2>
                  <p className="text-base sm:text-lg font-bold text-orange-600 dark:text-orange-400 font-sans mt-0.5">
                    {nameEn}
                  </p>
                </>
              )}

              {/* Quick Pills */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60">
                  <Landmark className="w-3.5 h-3.5 text-amber-600" />
                  <span>{isOdiaActive ? 'ଓଡ଼ିଶା ପ୍ରଶାସନ' : 'Govt of Odisha'}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 dark:bg-orange-950/50 text-orange-800 dark:text-orange-300 border border-orange-200/80 dark:border-orange-800/60">
                  <Feather className="w-3.5 h-3.5 text-orange-600" />
                  <span>{isOdiaActive ? 'ଐତିହାସିକ ଲେଖକ' : 'Historical Fiction'}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60">
                  <Code2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>{isOdiaActive ? 'ସଫ୍ଟୱେର୍ ବିକାଶକ' : 'Software Craft'}</span>
                </span>
              </div>
            </div>

          </div>

          {/* Location & Roots Banner */}
          <div className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <span>
                {isOdiaActive ? (
                  <>
                    ମୂଳ ସ୍ଥାନ: <strong className="text-neutral-900 dark:text-white">ବାଲେଶ୍ୱର</strong> • କାର୍ଯ୍ୟକ୍ଷେତ୍ର: <strong className="text-neutral-900 dark:text-white">ଭୁବନେଶ୍ୱର</strong>
                  </>
                ) : (
                  <>
                    Roots: <strong className="text-neutral-900 dark:text-white">Baleswar</strong> • Based in: <strong className="text-neutral-900 dark:text-white">Bhubaneswar</strong>
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handleCopyBio}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                title={isOdiaActive ? 'ବାୟୋ କପି କରନ୍ତୁ' : 'Copy Bio'}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? (isOdiaActive ? 'କପି ହେଲା' : 'Copied') : (isOdiaActive ? 'କପି' : 'Copy')}</span>
              </button>

              <button
                type="button"
                onClick={handleShareBio}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-950/60 transition-colors"
                title={isOdiaActive ? 'ସେୟାର୍ କରନ୍ତୁ' : 'Share'}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isOdiaActive ? 'ସେୟାର୍' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Biodata Section */}
          <div className="space-y-4">
            
            {/* Odia Bio Card */}
            {showOdia && (
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200/90 dark:border-amber-800/60 relative overflow-hidden transition-all">
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-amber-200/60 dark:border-amber-800/40">
                  <div className="flex items-center gap-2">
                    <Scroll className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                    <h3 className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200 font-odia uppercase tracking-wider">
                      ଓଡ଼ିଆ ପରିଚୟ ଓ ବିବରଣୀ
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-amber-700/80 dark:text-amber-400/80 font-odia">
                    ପ୍ରାମାଣିକ ବିବରଣୀ
                  </span>
                </div>

                <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-odia leading-relaxed text-justify">
                  {bioOdia}
                </p>
              </div>
            )}

            {/* English Bio Card */}
            {showEn && (
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-neutral-800/70 border border-neutral-200/90 dark:border-neutral-700/70 relative overflow-hidden transition-all">
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-neutral-200/60 dark:border-neutral-700/50">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                      English Biography
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                    Official Bio
                  </span>
                </div>

                <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-sans leading-relaxed text-justify">
                  {bioEn}
                </p>
              </div>
            )}

          </div>

          {/* Three Creative Pillars Highlight Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            
            {/* Pillar 1: Administrative Service */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80 shadow-2xs hover:border-orange-300 dark:hover:border-orange-700/60 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-2.5">
                <Landmark className="w-4 h-4" />
              </div>
              <h4 className={`text-xs font-bold text-neutral-900 dark:text-white ${isOdiaActive ? 'font-odia' : 'font-sans'}`}>
                {isOdiaActive ? 'ପ୍ରଶାସନିକ ସେବା' : 'Public Administration'}
              </h4>
              <p className={`text-[11px] text-neutral-600 dark:text-neutral-400 mt-1 leading-snug ${isOdiaActive ? 'font-odia' : 'font-sans'}`}>
                {isOdiaActive 
                  ? 'ଓଡ଼ିଶା ସରକାରଙ୍କ ଅଧୀନରେ ଭୁବନେଶ୍ୱରରେ ନିଷ୍ଠାପର ଦାୟିତ୍ୱ ନିର୍ବାହ ।'
                  : 'Dedicated administrative governance in the Government of Odisha at Bhubaneswar.'}
              </p>
            </div>

            {/* Pillar 2: Kalinga Historical Fiction */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80 shadow-2xs hover:border-orange-300 dark:hover:border-orange-700/60 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 flex items-center justify-center mb-2.5">
                <Feather className="w-4 h-4" />
              </div>
              <h4 className={`text-xs font-bold text-neutral-900 dark:text-white ${isOdiaActive ? 'font-odia' : 'font-sans'}`}>
                {isOdiaActive ? 'କଳିଙ୍ଗ ଐତିହାସିକ ଗଳ୍ପ' : 'Kalinga Historical Fiction'}
              </h4>
              <p className={`text-[11px] text-neutral-600 dark:text-neutral-400 mt-1 leading-snug ${isOdiaActive ? 'font-odia' : 'font-sans'}`}>
                {isOdiaActive 
                  ? 'କଳିଙ୍ଗର ସମୃଦ୍ଧ ଐତିହ୍ୟ ଓ ଶୌର୍ଯ୍ୟରୁ ପ୍ରେରଣା ପାଇ ରଚିତ ଗଳ୍ପ ସାହିତ୍ୟ ।'
                  : 'Crafting vibrant fiction inspired by Kalinga’s maritime voyages and historic lore.'}
              </p>
            </div>

            {/* Pillar 3: Odia Software & Digital Heritage */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80 shadow-2xs hover:border-orange-300 dark:hover:border-orange-700/60 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 flex items-center justify-center mb-2.5">
                <Code2 className="w-4 h-4" />
              </div>
              <h4 className={`text-xs font-bold text-neutral-900 dark:text-white ${isOdiaActive ? 'font-odia' : 'font-sans'}`}>
                {isOdiaActive ? 'ଓଡ଼ିଆ ଐତିହ୍ୟ ସଫ୍ଟୱେର୍' : 'Odia Heritage Software'}
              </h4>
              <p className={`text-[11px] text-neutral-600 dark:text-neutral-400 mt-1 leading-snug ${isOdiaActive ? 'font-odia' : 'font-sans'}`}>
                {isOdiaActive 
                  ? 'ପ୍ରାମାଣିକ ଦୃକ ପାଞ୍ଜିକା ଓ ଆଧୁନିକ ଡିଜିଟାଲ୍ ଉପକରଣର ସଫଳ ନିର୍ମାଣ ।'
                  : 'Building high-precision Drik calendars & modern digital experiences for Odias.'}
              </p>
            </div>

          </div>

          {/* Cultural Footer Banner */}
          <div className="p-3 rounded-xl bg-orange-50/60 dark:bg-orange-950/30 border border-orange-200/60 dark:border-orange-900/40 text-center">
            <p className={`text-xs text-orange-800 dark:text-orange-300 font-medium ${isOdiaActive ? 'font-odia' : 'font-sans'}`}>
              {isOdiaActive 
                ? 'ଓଡ଼ିଆ ଭାଷା, ସାହିତ୍ୟ ଓ ସଂସ୍କୃତିର ସୁରକ୍ଷା ତଥା ଡିଜିଟାଲ୍ ପ୍ରସାର ପାଇଁ ଏକ ସମର୍ପିତ ପ୍ରୟାସ 🙏'
                : 'A dedicated endeavor to preserve, celebrate, and digitally elevate Odia heritage globally 🙏'}
            </p>
          </div>

        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-950/80 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className={isOdiaActive ? 'font-odia' : 'font-sans'}>
              {isOdiaActive ? 'ଜୟ ଜଗନ୍ନାଥ' : 'Jai Jagannath'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyBio}
              className={`px-3.5 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${isOdiaActive ? 'font-odia' : 'font-sans'}`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (isOdiaActive ? 'କପି ହୋଇଗଲା!' : 'Copied!') : (isOdiaActive ? 'ବାୟୋ କପି କରନ୍ତୁ' : 'Copy Bio')}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs ${isOdiaActive ? 'font-odia' : 'font-sans'}`}
            >
              {isOdiaActive ? 'ବନ୍ଦ କରନ୍ତୁ' : 'Close'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
