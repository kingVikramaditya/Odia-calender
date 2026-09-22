import React, { useState } from 'react';
import { X, BookOpen, Compass, Sun, Moon, Sparkles, Feather } from 'lucide-react';
import { LanguageMode } from '../types';

interface KnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageMode;
}

export const KnowledgeModal: React.FC<KnowledgeModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'panchang' | 'tradition' | 'seasons' | 'astrology'>('panchang');

  if (!isOpen) return null;
  const isOdia = language === 'or';

  return (
    <div 
      id="knowledge-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="knowledge-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 transition-all"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-odia">
                {isOdia ? 'ଓଡ଼ିଆ ପାଞ୍ଜି ଓ ସଂସ୍କୃତି ଜ୍ଞାନ ଭଣ୍ଡାର' : 'Odia Panji & Cultural Knowledge Base'}
              </h3>
              <p className="text-xs text-neutral-500 font-medium font-odia">
                {isOdia ? 'କୋହେନୂର, ବିରଜା, ଶ୍ରୀମନ୍ଦିର ନୀତି ଓ ପଞ୍ଚାଙ୍ଗର ଗଭୀର ମାର୍ଗଦର୍ଶିକା' : 'Guide to authentic Odia Panchang elements and rich festival lore'}
              </p>
            </div>
          </div>

          <button
            id="close-knowledge-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800 py-3 overflow-x-auto">
          {[
            { id: 'panchang', labelOdia: 'ପଞ୍ଚାଙ୍ଗର ୫ ଅଙ୍ଗ', labelEn: '5 Limbs of Panchang' },
            { id: 'tradition', labelOdia: 'ଶ୍ରୀମନ୍ଦିର ଓ ପାଞ୍ଜି ପରମ୍ପରା', labelEn: 'Puri Temple Tradition' },
            { id: 'seasons', labelOdia: 'ଓଡ଼ିଶାର ୬ ଋତୁ', labelEn: '6 Odia Seasons' },
            { id: 'astrology', labelOdia: 'ବାରବେଳା ଓ ଯୋଗିନୀ', labelEn: 'Bara Bela & Yogini' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-odia whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {isOdia ? tab.labelOdia : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="py-4 space-y-4 font-odia text-neutral-700 dark:text-neutral-300">
          {activeTab === 'panchang' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
                <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-300 mb-1">
                  ପଞ୍ଚ + ଅଙ୍ଗ = ପଞ୍ଚାଙ୍ଗ (Panchang)
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  ଭାରତୀୟ ଜ୍ୟୋତିଷ ଶାସ୍ତ୍ର ଅନୁସାରେ କାଳ ଗଣନାର ମୁଖ୍ୟ ପାଞ୍ଚଟି ଅଙ୍ଗ ରହିଛି: ତିଥି, ବାର, ନକ୍ଷତ୍ର, ଯୋଗ ଓ କରଣ । ଏହି ପାଞ୍ଚଟିର ସମ୍ମିଳିତ ବିବରଣୀକୁ "ପଞ୍ଚାଙ୍ଗ" କୁହାଯାଏ ।
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                  <strong className="text-sm font-bold text-neutral-900 dark:text-white block mb-1">୧. ତିଥି (Tithi)</strong>
                  ଚନ୍ଦ୍ର ଓ ସୂର୍ଯ୍ୟଙ୍କ ମଧ୍ୟରେ ୧୨ ଡିଗ୍ରୀ ଦୂରତ୍ୱକୁ ଗୋଟିଏ ତିଥି କୁହାଯାଏ । ଚାନ୍ଦ୍ର ମାସରେ ୩୦ଟି ତିଥି ଥାଏ (୧୫ ଶୁକ୍ଳପକ୍ଷ ଓ ୧୫ କୃଷ୍ଣପକ୍ଷ) ।
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                  <strong className="text-sm font-bold text-neutral-900 dark:text-white block mb-1">୨. ବାର (Vara)</strong>
                  ରବିବାର ଠାରୁ ଶନିବାର ପର୍ଯ୍ୟନ୍ତ ସପ୍ତାହର ୭ଟି ବାର ସୂର୍ଯ୍ୟୋଦୟ ଠାରୁ ପରବର୍ତ୍ତୀ ସୂର୍ଯ୍ୟୋଦୟ ପର୍ଯ୍ୟନ୍ତ ଗଣନା କରାଯାଏ ।
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                  <strong className="text-sm font-bold text-neutral-900 dark:text-white block mb-1">୩. ନକ୍ଷତ୍ର (Nakshatra)</strong>
                  ଆକାଶ ମଣ୍ଡଳକୁ ୨୭ଟି ଭାଗରେ ବିଭକ୍ତ କରାଯାଇଛି, ଯାହାକୁ ୨୭ ନକ୍ଷତ୍ର (ଅଶ୍ୱିନୀ ଠାରୁ ରେବତୀ) କୁହାଯାଏ । ପ୍ରତ୍ୟେକ ନକ୍ଷତ୍ରର ୪ଟି ପାଦ ଥାଏ ।
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                  <strong className="text-sm font-bold text-neutral-900 dark:text-white block mb-1">୪. ଯୋଗ (Yoga)</strong>
                  ସୂର୍ଯ୍ୟ ଓ ଚନ୍ଦ୍ରଙ୍କ ସ୍ପଷ୍ଟ ସ୍ଥିତିର ଯୋଗଫଳକୁ ନେଇ ୨୭ଟି ଯୋଗ (ବିଷ୍କୁମ୍ଭ, ପ୍ରୀତି, ଆୟୁଷ୍ମାନ ଆଦି) ଗଠିତ ।
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 sm:col-span-2">
                  <strong className="text-sm font-bold text-neutral-900 dark:text-white block mb-1">୫. କରଣ (Karana)</strong>
                  ଗୋଟିଏ ତିଥିର ଅର୍ଦ୍ଧେକ ଭାଗକୁ ଗୋଟିଏ କରଣ କୁହାଯାଏ । ମୋଟ ୧୧ଟି କରଣ ମଧ୍ୟରୁ ୭ଟି ଚର ଓ ୪ଟି ସ୍ଥିର କରଣ ରହିଛି ।
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tradition' && (
            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-4 rounded-2xl bg-orange-50/70 dark:bg-neutral-800 border border-orange-200 dark:border-neutral-700">
                <h4 className="text-base font-bold text-orange-950 dark:text-orange-300 mb-1">
                  ପୁରୀ ଶ୍ରୀମନ୍ଦିର ମୁକ୍ତିମଣ୍ଡପ ଓ ପାଞ୍ଜି ଗଣନା
                </h4>
                <p>
                  ଓଡ଼ିଶାରେ ପାଞ୍ଜିର ମହତ୍ତ୍ୱ ଶ୍ରୀଜଗନ୍ନାଥ ମହାପ୍ରଭୁଙ୍କ ଦୈନନ୍ଦିନ ନୀତିକାନ୍ତି ସହ ନିବିଡ଼ ଭାବରେ ଜଡ଼ିତ । ଶ୍ରୀମନ୍ଦିରରେ ପ୍ରତ୍ୟେକ ଦିନ ପ୍ରାତଃକାଳରେ ଦେଉଳ କରଣ ଓ ତଢ଼ାଉ କରଣଙ୍କ ଦ୍ୱାରା ତିଥି ଓ ନକ୍ଷତ୍ର ପାଠ କରାଯାଏ । କୋହେନୂର, ବିରଜା, ରାଧାରମଣ ଓ ଅରୁଣୋଦୟ ପାଞ୍ଜି ଶ୍ରୀକ୍ଷେତ୍ରର ନୀତି ସହିତ ଅନୁମୋଦିତ ହୋଇ ପ୍ରକାଶିତ ହୁଏ ।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">
                  ସାଲ, ଶକାବ୍ଦ ଓ ଅଙ୍କ ନିୟମ
                </h4>
                <p>
                  ଓଡ଼ିଶାରେ ପ୍ରଚଳିତ "ସାଲ" ବା ରାଜାଙ୍କ ଶାସନ କାଳ ଗଣନା ଗଜପତି ମହାରାଜାଙ୍କ ଅଙ୍କ ନିୟମ ଉପରେ ଆଧାରିତ । ୧, ୬, ୧୬, ୨୬, ୩୬ ତଥା ଶେଷରେ ୦ ଥିବା ଅଙ୍କ ବାଦ୍ ଦେଇ ଅଙ୍କ ଗଣନା କରାଯାଏ, ଯାହା ବିଶ୍ୱର ଏକ ଅଦ୍ୱିତୀୟ ଗଣିତ ପଦ୍ଧତି ।
                </p>
              </div>
            </div>
          )}

          {activeTab === 'seasons' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { name: 'ଗ୍ରୀଷ୍ମ ଋତୁ (Summer)', months: 'ବୈଶାଖ - ଜ୍ୟେଷ୍ଠ', fest: 'ଚନ୍ଦନ ଯାତ୍ରା, ପଣା ସଂକ୍ରାନ୍ତି, ସ୍ନାନ ପୂର୍ଣ୍ଣିମା, ସାବିତ୍ରୀ ବ୍ରତ' },
                { name: 'ବର୍ଷା ଋତୁ (Monsoon)', months: 'ଆଷାଢ଼ - ଶ୍ରାବଣ', fest: 'ରଜ ପର୍ବ, ରଥଯାତ୍ରା, ବାହୁଡ଼ା, ଚିତାଉ, ଗହ୍ମା ପୂର୍ଣ୍ଣିମା' },
                { name: 'ଶରତ ଋତୁ (Autumn)', months: 'ଭାଦ୍ରବ - ଆଶ୍ୱିନ', fest: 'ଜନ୍ମାଷ୍ଟମୀ, ଗଣେଶ ପୂଜା, ନୂଆଖାଇ, ଦୁର୍ଗାପୂଜା, କୁମାର ପୂର୍ଣ୍ଣିମା' },
                { name: 'ହେମନ୍ତ ଋତୁ (Pre-Winter)', months: 'କାର୍ତ୍ତିକ - ମାର୍ଗଶିର', fest: 'ଦୀପାବଳି, ରାଧା ଦାମୋଦର ବ୍ରତ, ବୋଇତ ବନ୍ଦାଣ, ମାଣବସା ଗୁରୁବାର, ପ୍ରଥମାଷ୍ଟମୀ' },
                { name: 'ଶୀତ ଋତୁ (Winter)', months: 'ପୌଷ - ମାଘ', fest: 'ଧନୁ ସଂକ୍ରାନ୍ତି, ବକୁଳ ଅମାବାସ୍ୟା, ମକର ସଂକ୍ରାନ୍ତି, ସରସ୍ୱତୀ ପୂଜା' },
                { name: 'ବସନ୍ତ ଋତୁ (Spring)', months: 'ଫାଲ୍ଗୁନ - ଚୈତ୍ର', fest: 'ମହା ଶିବରାତ୍ରି, ଦୋଳ ପୂର୍ଣ୍ଣିମା, ହୋଲି, ଶ୍ରୀରାମ ନବମୀ' },
              ].map((rutu, rIdx) => (
                <div key={rIdx} className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                  <strong className="text-sm font-bold text-orange-600 dark:text-orange-400 block">{rutu.name}</strong>
                  <div className="text-neutral-500 font-semibold my-0.5">{rutu.months}</div>
                  <div className="text-neutral-600 dark:text-neutral-300">ଉତ୍ସବ: {rutu.fest}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'astrology' && (
            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-neutral-800 border border-rose-200 dark:border-neutral-700">
                <h4 className="text-sm font-bold text-rose-900 dark:text-rose-300 mb-1">
                  ବାର ବେଳା ଓ କାଳ ବେଳା (Bara Bela & Kala Bela)
                </h4>
                <p>
                  ଓଡ଼ିଆ ପାଞ୍ଜିରେ ବାର ବେଳା ଓ କାଳ ବେଳା ଅତ୍ୟନ୍ତ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ । ଏହି ସମୟରେ କୌଣସି ଶୁଭ କାର୍ଯ୍ୟ, ଯାତ୍ରା, ଗୃହ ପ୍ରବେଶ ବା ନୂତନ କ୍ରୟ କରାଯାଏ ନାହିଁ । ଦିନର ୮ଟି ଭାଗ ମଧ୍ୟରୁ ପ୍ରତ୍ୟେକ ବାରରେ ନିର୍ଦ୍ଦିଷ୍ଟ ଅଂଶ ବାରବେଳା ଭାବେ ନିର୍ଣ୍ଣୟ ହୁଏ ।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-neutral-800 border border-purple-200 dark:border-neutral-700">
                <h4 className="text-sm font-bold text-purple-900 dark:text-purple-300 mb-1">
                  ଯୋଗିନୀ ବାସ ଓ ଯାତ୍ରା ନିଷେଧ
                </h4>
                <p>
                  ପ୍ରତ୍ୟେକ ତିଥିରେ ଯୋଗିନୀ ନିର୍ଦ୍ଦିଷ୍ଟ ଦିଗରେ ବାସ କରନ୍ତି । ସମ୍ମୁଖ ଯୋଗିନୀ ବା ବାମ ଯୋଗିନୀରେ ଯାତ୍ରା କଲେ କାର୍ଯ୍ୟ ହାନି ହୁଏ, କିନ୍ତୁ ପୃଷ୍ଠ ଯୋଗିନୀରେ ଯାତ୍ରା ସର୍ବଦା ଶୁଭପ୍ରଦ ହୋଇଥାଏ ।
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
