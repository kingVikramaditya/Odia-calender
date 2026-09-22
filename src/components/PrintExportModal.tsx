import React, { useState } from 'react';
import { X, Printer, FileText, Calendar, Check } from 'lucide-react';
import { PanchangDay, LanguageMode } from '../types';
import { toOdiaNumber } from '../data/odiaConstants';

interface PrintExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: PanchangDay;
  monthDays: PanchangDay[];
  language: LanguageMode;
}

export const PrintExportModal: React.FC<PrintExportModalProps> = ({
  isOpen,
  onClose,
  day,
  monthDays,
  language,
}) => {
  const [printType, setPrintType] = useState<'day' | 'month'>('month');

  if (!isOpen) return null;
  const isOdia = language === 'or';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      id="print-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in print:bg-white print:p-0"
      onClick={onClose}
    >
      <div 
        id="print-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 transition-all print:border-none print:shadow-none print:max-w-none print:p-0"
      >
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800 print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white font-odia">
              {isOdia ? 'ପ୍ରିଣ୍ଟ୍ କିମ୍ବା PDF ରୂପେ ସଂରକ୍ଷଣ କରନ୍ତୁ' : 'Print / Export to PDF'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selection mode */}
        <div className="grid grid-cols-2 gap-3 my-4 print:hidden">
          <button
            onClick={() => setPrintType('month')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              printType === 'month'
                ? 'border-orange-500 bg-orange-50/60 dark:bg-orange-950/40 text-orange-950 dark:text-white font-bold'
                : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
            }`}
          >
            <Calendar className="w-5 h-5 text-orange-500 mb-1" />
            <div className="text-sm font-odia">{isOdia ? 'ପୂରା ମାସର କ୍ୟାଲେଣ୍ଡର' : 'Full Month Calendar'}</div>
            <div className="text-[11px] text-neutral-500">{day.odiaMonthNameOdia} ({day.gregorianYear})</div>
          </button>

          <button
            onClick={() => setPrintType('day')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              printType === 'day'
                ? 'border-orange-500 bg-orange-50/60 dark:bg-orange-950/40 text-orange-950 dark:text-white font-bold'
                : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
            }`}
          >
            <FileText className="w-5 h-5 text-orange-500 mb-1" />
            <div className="text-sm font-odia">{isOdia ? 'ଆଜିର ବିସ୍ତୃତ ପାଞ୍ଜି ପତ୍ର' : 'Daily Panchang Sheet'}</div>
            <div className="text-[11px] text-neutral-500">{day.dateStr}</div>
          </button>
        </div>

        {/* Print Content Preview */}
        <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-xs font-odia space-y-2 max-h-56 overflow-y-auto">
          <div className="font-bold text-center text-sm text-neutral-900 dark:text-white">
            କୋହେନୂର ଶୈଳୀ ଓଡ଼ିଆ କ୍ୟାଲେଣ୍ଡର ୨୦୨୬
          </div>
          <div className="text-center text-neutral-500">
            {day.odiaMonthNameOdia} - {toOdiaNumber(day.odiaYearSal)} ସାଲ, {toOdiaNumber(day.sakabda)} ଶକାବ୍ଦ
          </div>
          <p className="text-neutral-600 dark:text-neutral-300 text-center">
            {printType === 'month' 
              ? `ଏହି ପ୍ରିଣ୍ଟ୍ ରେ ସମୁଦାୟ ${monthDays.length} ଦିନର ତିଥି, ପର୍ବପର୍ବାଣୀ ଓ ଏକାଦଶୀ ସୂଚୀ ସାମିଲ ରହିବ ।`
              : `ଏଥିରେ ${day.dateStr} ତାରିଖର ସମସ୍ତ ପଞ୍ଚାଙ୍ଗ ଅଙ୍ଗ (ତିଥି, ନକ୍ଷତ୍ର, ଯୋଗ, କରଣ, ବାରବେଳା) ପ୍ରିଣ୍ଟ୍ ହେବ ।`
            }
          </p>
        </div>

        {/* Print Trigger Button */}
        <div className="mt-5 flex items-center justify-end gap-3 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-semibold hover:bg-neutral-200"
          >
            {isOdia ? 'ବାତିଲ୍' : 'Cancel'}
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold font-odia flex items-center gap-2 shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>{isOdia ? 'ପ୍ରିଣ୍ଟ୍ କରନ୍ତୁ' : 'Print Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
