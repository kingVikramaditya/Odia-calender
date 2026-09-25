import React, { useState, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  FileDown, 
  Download,
  FileText, 
  Calendar as CalendarIcon, 
  Award, 
  Check, 
  Sparkles, 
  Sun, 
  Moon, 
  Clock, 
  Scroll, 
  Info, 
  Compass,
  ArrowUpDown
} from 'lucide-react';
import { PanchangDay, LanguageMode, FestivalEvent, LocationInfo, ThemeMode } from '../types';
import { toOdiaNumber, ODIA_MONTHS, WEEKDAYS, LOCATIONS } from '../data/odiaConstants';
import { ODISHA_GOVT_HOLIDAYS_2026 } from '../data/odishaGovtHolidays';
import { COMPREHENSIVE_FESTIVALS, EKADASHI_EVENTS } from '../data/festivalsData';
import { generateSankalpa } from '../utils/sankalpaEngine';
import { getMonthPanchang } from '../utils/panchangEngine';

export interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: PanchangDay;
  monthDays: PanchangDay[];
  language: LanguageMode;
  location?: LocationInfo;
  theme?: ThemeMode;
}

export type ExportOptionType = 'month' | 'day' | 'festivals';

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  isOpen,
  onClose,
  day,
  monthDays,
  language,
  location,
  theme,
}) => {
  const [exportType, setExportType] = useState<ExportOptionType>('month');
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(day.gregorianMonth);
  const [sankalpaType, setSankalpaType] = useState<'laghu' | 'vistrut'>('laghu');
  const [gotra, setGotra] = useState<string>('କାଶ୍ୟପ');
  const [name, setName] = useState<string>('ଅମୁକ ଶର୍ମା');
  const [festivalCategory, setFestivalCategory] = useState<'all' | 'govt' | 'major' | 'ekadashi'>('all');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const documentRef = useRef<HTMLDivElement>(null);

  const isOdia = language === 'or';
  const activeLocation = day.location || location || LOCATIONS[0];

  // Compute active month days if user changes month dropdown
  const activeMonthDays = useMemo(() => {
    if (selectedMonthIndex === day.gregorianMonth && monthDays.length > 0) {
      return monthDays;
    }
    return getMonthPanchang(2026, selectedMonthIndex, activeLocation);
  }, [selectedMonthIndex, day.gregorianMonth, monthDays, activeLocation]);

  // Active month metadata
  const currentMonthDay = activeMonthDays[0] || day;
  const activeOdiaMonthName = currentMonthDay.odiaMonthNameOdia;
  const activeOdiaYearSal = toOdiaNumber(currentMonthDay.odiaYearSal);
  const activeSakabda = toOdiaNumber(currentMonthDay.sakabda);
  const activeVikramSamvat = toOdiaNumber(currentMonthDay.vikramSamvat);

  // Month grid calculations (Sunday = 0 to Saturday = 6)
  const firstWeekday = activeMonthDays.length > 0 ? activeMonthDays[0].dayOfWeek : 0;
  const leadingBlanks = Array.from({ length: firstWeekday });
  const totalCells = leadingBlanks.length + activeMonthDays.length;
  const trailingBlanksCount = (7 - (totalCells % 7)) % 7;
  const trailingBlanks = Array.from({ length: trailingBlanksCount });

  // Generate Sankalpa for the daily sheet
  const sankalpa = useMemo(() => {
    return generateSankalpa(day, gotra.trim() || 'କାଶ୍ୟପ', name.trim() || 'ଅମୁକ ଶର୍ମା');
  }, [day, gotra, name]);

  const currentSankalpaText = sankalpaType === 'laghu' ? sankalpa.laghuSanskrit : sankalpa.vistrutSanskrit;
  const currentSankalpaMeaning = sankalpaType === 'laghu' ? sankalpa.laghuOdiaMeaning : sankalpa.vistrutOdiaMeaning;

  // Unified Annual Festivals List
  const unifiedAnnualEvents = useMemo(() => {
    const list: (FestivalEvent & { categoryLabel: string; badgeColor: string })[] = [];
    const seen = new Set<string>();

    // 1. Govt Holidays
    for (const h of ODISHA_GOVT_HOLIDAYS_2026) {
      list.push({
        id: h.id,
        dateStr: h.dateStr,
        titleOdia: h.nameOdia,
        titleEn: h.nameEn,
        type: 'govt_holiday',
        categoryLabel: h.type === 'gazetted' ? 'ଗେଜେଟେଡ୍ ସରକାରୀ ଛୁଟି' : 'ଐଚ୍ଛିକ ଛୁଟି',
        badgeColor: 'emerald',
        significanceOdia: `${h.descriptionOdia} [ସୂତ୍ର: odishacalendar.com / ଓଡ଼ିଶା ରାଜପତ୍ର]`,
        significanceEn: `${h.descriptionEn} [Odisha Gazette]`,
        ritualsOdia: `${h.dayOfWeekOdia}, ${h.dateStr}`,
        ritualsEn: `${h.dayOfWeekEn}, ${h.dateStr}`,
        deityOdia: 'ଓଡ଼ିଶା ସରକାର',
        deityEn: 'Govt of Odisha',
        isGovtHoliday: true,
      });
      seen.add(`${h.dateStr}_${h.nameOdia.split(' ')[0]}`);
    }

    // 2. Cultural & Temple Festivals
    for (const f of COMPREHENSIVE_FESTIVALS) {
      if (f.dateStr && !seen.has(`${f.dateStr}_${f.titleOdia.split(' ')[0]}`)) {
        list.push({
          ...f,
          categoryLabel: f.type === 'festival' ? 'ମହାପର୍ବ' : f.type === 'osha_brata' ? 'ଓଷା / ବ୍ରତ' : 'ପର୍ବ',
          badgeColor: 'orange',
        });
        seen.add(`${f.dateStr}_${f.titleOdia.split(' ')[0]}`);
      }
    }

    // 3. Ekadashi Vows
    for (const e of EKADASHI_EVENTS) {
      if (e.dateStr) {
        list.push({
          ...e,
          categoryLabel: 'ପବିତ୍ର ଏକାଦଶୀ',
          badgeColor: 'amber',
        });
      }
    }

    // Sort chronologically
    list.sort((a, b) => (a.dateStr || '').localeCompare(b.dateStr || ''));
    return list;
  }, []);

  // Filtered annual events
  const filteredAnnualEvents = useMemo(() => {
    if (festivalCategory === 'govt') {
      return unifiedAnnualEvents.filter(e => e.isGovtHoliday);
    }
    if (festivalCategory === 'major') {
      return unifiedAnnualEvents.filter(e => e.type === 'festival' || e.type === 'osha_brata');
    }
    if (festivalCategory === 'ekadashi') {
      return unifiedAnnualEvents.filter(e => e.type === 'ekadashi');
    }
    return unifiedAnnualEvents;
  }, [unifiedAnnualEvents, festivalCategory]);

  const gregorianMonthNamesOdia = [
    'ଜାନୁଆରୀ', 'ଫେବୃଆରୀ', 'ମାର୍ଚ୍ଚ', 'ଅପ୍ରେଲ୍', 'ମେ', 'ଜୁନ୍',
    'ଜୁଲାଇ', 'ଅଗଷ୍ଟ', 'ସେପ୍ଟେମ୍ବର', 'ଅକ୍ଟୋବର', 'ନଭେମ୍ବର', 'ଡିସେମ୍ବର'
  ];
  const gregorianMonthNamesEn = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  if (!isOpen) return null;

  // Direct print fallback using portal
  const triggerDirectPrint = (fileName: string) => {
    const prevTitle = document.title;
    document.title = fileName;
    document.body.classList.add('has-print-portal');
    try {
      window.print();
    } catch (e) {
      console.error('window.print error', e);
    } finally {
      setTimeout(() => {
        document.body.classList.remove('has-print-portal');
        document.title = prevTitle;
      }, 500);
    }
  };

  // Execute PDF Download via high-fidelity print engine configured for vector PDF
  const handleDownloadPdf = () => {
    setIsGenerating(true);
    const printContent = documentRef.current;
    if (!printContent) {
      setIsGenerating(false);
      return;
    }

    // Build standard canonical filename for saving as PDF
    let fileName = 'Odia-Calendar-2026';
    if (exportType === 'month') {
      fileName = `Odia-Calendar-2026-${gregorianMonthNamesEn[selectedMonthIndex]}-${activeOdiaMonthName}`;
    } else if (exportType === 'day') {
      fileName = `Odia-Daily-Panchang-${day.dateStr}`;
    } else if (exportType === 'festivals') {
      fileName = `Odisha-Govt-Holidays-and-Festivals-2026`;
    }

    try {
      // Clean up previous print iframes to avoid stale DOM/memory
      const oldIframe = document.getElementById('hidden-print-iframe');
      if (oldIframe) {
        oldIframe.remove();
      }

      const printIframe = document.createElement('iframe');
      printIframe.id = 'hidden-print-iframe';
      printIframe.style.position = 'fixed';
      printIframe.style.left = '-9999px';
      printIframe.style.top = '0';
      printIframe.style.width = '1024px';
      printIframe.style.height = '1200px';
      printIframe.style.border = '0';
      printIframe.style.opacity = '0';
      printIframe.style.pointerEvents = 'none';
      document.body.appendChild(printIframe);

      const iframeDoc = printIframe.contentDocument || printIframe.contentWindow?.document;
      if (!iframeDoc) {
        triggerDirectPrint(fileName);
        setIsGenerating(false);
        return;
      }

      // Collect active stylesheets from main document
      const styleSheets = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
        .map(el => el.outerHTML)
        .join('\n');

      const isLandscape = exportType === 'month';

      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html lang="or">
          <head>
            <meta charset="utf-8" />
            <title>${fileName}</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Anek+Odia:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+Oriya:wght@400;500;600;700&display=swap" rel="stylesheet">
            ${styleSheets}
            <style>
              @page {
                size: ${isLandscape ? 'A4 landscape' : 'A4 portrait'};
                margin: 8mm;
              }
              *, *::before, *::after {
                box-sizing: border-box !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              html, body {
                background: #ffffff !important;
                color: #171717 !important;
                font-family: 'Anek Odia', 'Noto Sans Oriya', 'Plus Jakarta Sans', sans-serif !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
                height: auto !important;
              }
              .font-odia {
                font-family: 'Anek Odia', 'Noto Sans Oriya', sans-serif !important;
              }
              .font-sans {
                font-family: 'Plus Jakarta Sans', sans-serif !important;
              }
              /* Explicitly guarantee visibility of all printable components */
              body, body * {
                visibility: visible !important;
              }
              #print-document-portal,
              .pdf-export-wrapper {
                display: block !important;
                visibility: visible !important;
                width: 100% !important;
                background: #ffffff !important;
                color: #171717 !important;
              }
              table {
                border-collapse: collapse !important;
              }
              th, td {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            </style>
          </head>
          <body class="bg-white text-neutral-900 p-2">
            <div id="print-document-portal" class="pdf-export-wrapper w-full bg-white text-neutral-900">
              ${printContent.innerHTML}
            </div>
          </body>
        </html>
      `);
      iframeDoc.close();

      const runPrint = () => {
        try {
          printIframe.contentWindow?.focus();
          printIframe.contentWindow?.print();
        } catch (e) {
          console.error('Iframe print error, falling back to direct print', e);
          triggerDirectPrint(fileName);
        } finally {
          setIsGenerating(false);
        }
      };

      // Ensure iframe content and fonts are fully parsed and rendered
      setTimeout(runPrint, 350);
    } catch (e) {
      console.error('Download as PDF error', e);
      triggerDirectPrint(fileName);
      setIsGenerating(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /* RENDER 1: MONTHLY CALENDAR WALL SHEET                                      */
  /* -------------------------------------------------------------------------- */
  const renderMonthCalendarDocument = () => {
    const monthlyHolidays = activeMonthDays.filter(d => d.isGovtHoliday || d.events.length > 0);
    const monthlyEkadashis = activeMonthDays.filter(d => d.moonPhase.isEkadashi);
    const monthlyPurnima = activeMonthDays.find(d => d.moonPhase.isPurnima);
    const monthlyAmavasya = activeMonthDays.find(d => d.moonPhase.isAmavasya);
    const monthlySankranti = activeMonthDays.find(d => d.moonPhase.isSankranti);

    return (
      <div className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 p-5 sm:p-8 font-odia border border-neutral-200 dark:border-neutral-800 shadow-sm print:border-none print:shadow-none print:p-0 print:bg-white print:text-neutral-900 max-w-5xl mx-auto transition-colors">
        {/* Masthead Banner */}
        <div className="border-b-2 border-neutral-900 dark:border-neutral-100 print:border-neutral-900 pb-4 mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-center sm:text-left">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400 print:text-orange-700">
              {isOdia ? 'ପ୍ରାମାଣିକ ଦୃକ ସିଦ୍ଧାନ୍ତ ଓଡ଼ିଶା ପାଞ୍ଜିକା ୨୦୨୬' : 'Authentic Drik Ganita Odia Panjika 2026'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white print:text-neutral-950 font-odia tracking-tight">
              {isOdia ? (
                <>
                  {activeOdiaMonthName} ମାସ
                  <span className="text-base sm:text-lg font-bold text-neutral-600 dark:text-neutral-300 print:text-neutral-700 ml-2">
                    ({gregorianMonthNamesOdia[selectedMonthIndex]} {gregorianMonthNamesEn[selectedMonthIndex]} ୨୦୨୬)
                  </span>
                </>
              ) : (
                <>
                  {gregorianMonthNamesEn[selectedMonthIndex]} 2026
                  <span className="text-base sm:text-lg font-bold text-neutral-600 dark:text-neutral-300 print:text-neutral-700 ml-2">
                    ({activeOdiaMonthName} Masa • Sal {currentMonthDay.odiaYearSal})
                  </span>
                </>
              )}
            </h1>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 print:text-neutral-600 font-medium mt-0.5">
              {isOdia 
                ? `${activeOdiaYearSal} ସାଲ | ${activeSakabda} ଶକାବ୍ଦ | ${activeVikramSamvat} ବିକ୍ରମ ସମ୍ବତ | ସ୍ଥାନ: ${activeLocation.nameOdia} (${activeLocation.nameEn})`
                : `Sal: ${currentMonthDay.odiaYearSal} | Sakabda: ${currentMonthDay.sakabda} | Location: ${activeLocation.nameEn}, Odisha`}
            </p>
          </div>

          <div className="text-center sm:text-right shrink-0">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-neutral-900 dark:bg-neutral-800 print:bg-neutral-900 text-white">
              {gregorianMonthNamesEn[selectedMonthIndex]} 2026
            </span>
          </div>
        </div>

        {/* 7-Column Calendar Grid Table */}
        <div className="border-2 border-neutral-900 dark:border-neutral-700 print:border-neutral-900 rounded-lg overflow-x-auto">
          <table className="w-full border-collapse text-left min-w-[680px] table-fixed">
            <thead>
              <tr className="border-b-2 border-neutral-900 dark:border-neutral-700 print:border-neutral-900 text-center font-bold text-xs sm:text-sm">
                <th className="py-2.5 px-1 bg-red-600 text-white border-r border-neutral-900 dark:border-neutral-700 print:border-neutral-900 w-[14.28%]">
                  <div>{isOdia ? 'ରବିବାର' : 'Sunday'}</div>
                  <div className="text-[10px] font-normal opacity-90">{isOdia ? 'Sunday' : 'Sun'}</div>
                </th>
                <th className="py-2.5 px-1 bg-neutral-800 text-white border-r border-neutral-700 w-[14.28%]">
                  <div>{isOdia ? 'ସୋମବାର' : 'Monday'}</div>
                  <div className="text-[10px] font-normal opacity-90">{isOdia ? 'Monday' : 'Mon'}</div>
                </th>
                <th className="py-2.5 px-1 bg-neutral-800 text-white border-r border-neutral-700 w-[14.28%]">
                  <div>{isOdia ? 'ମଙ୍ଗଳବାର' : 'Tuesday'}</div>
                  <div className="text-[10px] font-normal opacity-90">{isOdia ? 'Tuesday' : 'Tue'}</div>
                </th>
                <th className="py-2.5 px-1 bg-neutral-800 text-white border-r border-neutral-700 w-[14.28%]">
                  <div>{isOdia ? 'ବୁଧବାର' : 'Wednesday'}</div>
                  <div className="text-[10px] font-normal opacity-90">{isOdia ? 'Wednesday' : 'Wed'}</div>
                </th>
                <th className="py-2.5 px-1 bg-neutral-800 text-white border-r border-neutral-700 w-[14.28%]">
                  <div>{isOdia ? 'ଗୁରୁବାର' : 'Thursday'}</div>
                  <div className="text-[10px] font-normal opacity-90">{isOdia ? 'Thursday' : 'Thu'}</div>
                </th>
                <th className="py-2.5 px-1 bg-neutral-800 text-white border-r border-neutral-700 w-[14.28%]">
                  <div>{isOdia ? 'ଶୁକ୍ରବାର' : 'Friday'}</div>
                  <div className="text-[10px] font-normal opacity-90">{isOdia ? 'Friday' : 'Fri'}</div>
                </th>
                <th className="py-2.5 px-1 bg-neutral-800 text-white w-[14.28%]">
                  <div>{isOdia ? 'ଶନିବାର' : 'Saturday'}</div>
                  <div className="text-[10px] font-normal opacity-90">{isOdia ? 'Saturday' : 'Sat'}</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.ceil(totalCells / 7) }).map((_, rowIndex) => {
                return (
                  <tr key={rowIndex} className="border-b border-neutral-200 dark:border-neutral-800 print:border-neutral-300">
                    {Array.from({ length: 7 }).map((_, colIndex) => {
                      const cellIndex = rowIndex * 7 + colIndex;
                      if (cellIndex < leadingBlanks.length || cellIndex >= leadingBlanks.length + activeMonthDays.length) {
                        return (
                          <td key={colIndex} className="p-2 border-r border-neutral-200 dark:border-neutral-800 print:border-neutral-200 bg-neutral-50/70 dark:bg-neutral-950/40 print:bg-neutral-50/70 h-24 align-top" />
                        );
                      }

                      const d = activeMonthDays[cellIndex - leadingBlanks.length];
                      const isSunday = colIndex === 0;
                      const isGovt = d.isGovtHoliday;
                      const isEkadashi = d.moonPhase.isEkadashi;
                      const isPurnima = d.moonPhase.isPurnima;
                      const isAmavasya = d.moonPhase.isAmavasya;
                      const isSankranti = d.moonPhase.isSankranti;

                      return (
                        <td 
                          key={colIndex}
                          className={`p-1.5 sm:p-2 border-r border-neutral-200 dark:border-neutral-800 print:border-neutral-300 h-24 align-top transition-colors relative ${
                            isGovt 
                              ? 'bg-emerald-50/50 dark:bg-emerald-950/25 print:bg-emerald-50/40' 
                              : isSunday 
                              ? 'bg-red-50/40 dark:bg-red-950/20 print:bg-red-50/30' 
                              : 'bg-white dark:bg-neutral-900 print:bg-white'
                          }`}
                        >
                          {/* Date Header: Gregorian & Odia Solar Date */}
                          <div className="flex items-start justify-between leading-none mb-1">
                            <span className={`text-base sm:text-xl font-black ${isSunday || isGovt ? 'text-red-600 dark:text-red-400 print:text-red-700 font-sans' : 'text-neutral-900 dark:text-white print:text-neutral-900 font-sans'}`}>
                              {d.gregorianDay}
                            </span>
                            <span className="text-[10px] font-bold text-neutral-600 dark:text-neutral-300 print:text-neutral-600 bg-neutral-100 dark:bg-neutral-800 print:bg-neutral-100 px-1 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 print:border-neutral-200 font-odia">
                              {isOdia ? `${d.odiaDayOfSolarMonthOdia} ${d.odiaMonthNameOdia}` : `Day ${d.odiaDayOfSolarMonth}`}
                            </span>
                          </div>

                          {/* Tithi & Nakshatra */}
                          <div className="text-[10px] font-medium leading-tight text-neutral-700 dark:text-neutral-300 print:text-neutral-700 space-y-0.5">
                            <div className="font-semibold text-neutral-900 dark:text-neutral-100 print:text-neutral-900 truncate">
                              {isOdia 
                                ? `${d.tithi.pakshaOdia === 'ଶୁକ୍ଳପକ୍ଷ' ? 'ଶୁ.' : 'କୃ.'} ${d.tithi.nameOdia}`
                                : `${d.tithi.pakshaEn.startsWith('Shukla') ? 'Sh.' : 'Kr.'} ${d.tithi.nameEn}`}
                            </div>
                            <div className="text-neutral-500 dark:text-neutral-400 print:text-neutral-500 text-[9px] truncate">
                              {isOdia ? d.nakshatra.nameOdia : d.nakshatra.nameEn}
                            </div>
                          </div>

                          {/* Event Badges */}
                          <div className="mt-1 space-y-0.5">
                            {isGovt && (
                              <div className="text-[9px] font-bold bg-emerald-700 text-white px-1 py-0.5 rounded leading-tight truncate">
                                🏛️ {isOdia ? (d.govtHolidayInfo?.nameOdia || d.events.find(e => e.isGovtHoliday)?.titleOdia) : (d.govtHolidayInfo?.nameEn || d.events.find(e => e.isGovtHoliday)?.titleEn || d.govtHolidayInfo?.nameOdia)}
                              </div>
                            )}

                            {d.events.filter(e => e.type !== 'govt_holiday').slice(0, 1).map(ev => (
                              <div key={ev.id} className="text-[9px] font-bold bg-orange-600 text-white px-1 py-0.5 rounded leading-tight truncate">
                                🚩 {isOdia ? ev.titleOdia.split(' ')[0] : (ev.titleEn || ev.titleOdia).split(' ')[0]}
                              </div>
                            ))}

                            {isEkadashi && (
                              <div className="text-[8px] font-bold bg-amber-500 text-white px-1 rounded leading-tight inline-block">
                                {isOdia ? '★ ଏକାଦଶୀ' : '★ Ekadashi'}
                              </div>
                            )}
                            {isPurnima && (
                              <div className="text-[8px] font-bold bg-neutral-900 dark:bg-neutral-700 text-amber-300 px-1 rounded leading-tight inline-block">
                                {isOdia ? '🌕 ପୂର୍ଣ୍ଣିମା' : '🌕 Purnima'}
                              </div>
                            )}
                            {isAmavasya && (
                              <div className="text-[8px] font-bold bg-neutral-950 text-white px-1 rounded leading-tight inline-block">
                                {isOdia ? '🌑 ଅମାବାସ୍ୟା' : '🌑 Amavasya'}
                              </div>
                            )}
                            {isSankranti && (
                              <div className="text-[8px] font-bold bg-orange-700 text-white px-1 rounded leading-tight inline-block">
                                {isOdia ? '☀️ ସଂକ୍ରାନ୍ତି' : '☀️ Sankranti'}
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Notes: Monthly Highlights & Ephemeris */}
        <div className="mt-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 print:border-neutral-300 bg-neutral-50 dark:bg-neutral-800/40 print:bg-neutral-50 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs transition-colors">
          <div>
            <h4 className="font-bold border-b border-neutral-200 dark:border-neutral-700 print:border-neutral-300 pb-1 mb-1.5 flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400 print:text-emerald-800">
              <span>{isOdia ? '🏛️ ସରକାରୀ ଛୁଟି ଓ ପ୍ରମୁଖ ପର୍ବ' : '🏛️ Govt Holidays & Major Festivals'}</span>
            </h4>
            {monthlyHolidays.length === 0 ? (
              <p className="text-neutral-500 dark:text-neutral-400 print:text-neutral-500">
                {isOdia ? 'ଏହି ମାସରେ କୌଣସି ଛୁଟି ନାହିଁ ।' : 'No public holidays this month.'}
              </p>
            ) : (
              <ul className="space-y-1">
                {monthlyHolidays.slice(0, 5).map(h => (
                  <li key={h.dateStr} className="text-[11px] leading-snug">
                    <strong className="text-neutral-900 dark:text-white print:text-neutral-900 font-sans">{h.gregorianDay}:</strong>{' '}
                    {isOdia ? (h.govtHolidayInfo?.nameOdia || h.events[0]?.titleOdia) : (h.govtHolidayInfo?.nameEn || h.events[0]?.titleEn || h.govtHolidayInfo?.nameOdia)}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h4 className="font-bold border-b border-neutral-200 dark:border-neutral-700 print:border-neutral-300 pb-1 mb-1.5 flex items-center gap-1.5 text-amber-800 dark:text-amber-400 print:text-amber-800">
              <span>{isOdia ? '★ ପବିତ୍ର ଏକାଦଶୀ ଓ ବ୍ରତ' : '★ Ekadashi & Sacred Vows'}</span>
            </h4>
            <ul className="space-y-1 text-[11px]">
              {monthlyEkadashis.map(e => (
                <li key={e.dateStr}>
                  <strong className="text-neutral-900 dark:text-white print:text-neutral-900 font-sans">{e.gregorianDay}:</strong>{' '}
                  {isOdia ? (e.events.find(ev => ev.type === 'ekadashi')?.titleOdia || 'ଏକାଦଶୀ ଉପବାସ') : (e.events.find(ev => ev.type === 'ekadashi')?.titleEn || 'Ekadashi Fasting')}
                </li>
              ))}
              {monthlyPurnima && (
                <li>
                  <strong className="text-neutral-900 dark:text-white print:text-neutral-900 font-sans">{monthlyPurnima.gregorianDay}:</strong>{' '}
                  {isOdia ? `ପୂର୍ଣ୍ଣିମା (ଶେଷ: ${monthlyPurnima.tithi.endTime || 'ଦିବା/ରାତ୍ରି'})` : `Purnima (Ends: ${monthlyPurnima.tithi.endTime || 'Day/Night'})`}
                </li>
              )}
              {monthlyAmavasya && (
                <li>
                  <strong className="text-neutral-900 dark:text-white print:text-neutral-900 font-sans">{monthlyAmavasya.gregorianDay}:</strong>{' '}
                  {isOdia ? `ଅମାବାସ୍ୟା (ଶେଷ: ${monthlyAmavasya.tithi.endTime || 'ଦିବା/ରାତ୍ରି'})` : `Amavasya (Ends: ${monthlyAmavasya.tithi.endTime || 'Day/Night'})`}
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-bold border-b border-neutral-200 dark:border-neutral-700 print:border-neutral-300 pb-1 mb-1.5 flex items-center gap-1.5 text-orange-800 dark:text-orange-400 print:text-orange-800">
              <span>{isOdia ? '☀️ ସଂକ୍ରାନ୍ତି ଓ ମାସିକ ବିବରଣୀ' : '☀️ Sankranti & Ephemeris'}</span>
            </h4>
            <div className="text-[11px] space-y-1 text-neutral-700 dark:text-neutral-300 print:text-neutral-700">
              {monthlySankranti ? (
                <div>
                  <strong className="text-neutral-900 dark:text-white print:text-neutral-900 font-sans">{monthlySankranti.gregorianDay}:</strong>{' '}
                  {isOdia ? (monthlySankranti.moonPhase.sankrantiNameOdia || 'ରବି ସଂକ୍ରାନ୍ତି') : (monthlySankranti.moonPhase.sankrantiNameEn || 'Surya Sankranti')}
                </div>
              ) : (
                <div>{isOdia ? 'ମାସର ସମସ୍ତ ଦିନରେ ଦୃକ ପାଞ୍ଜି ଗଣିତ ଅନୁମୋଦିତ ।' : 'Calibrated according to authentic Drik Ganita.'}</div>
              )}
              <div>{isOdia ? `ସୂର୍ଯ୍ୟୋଦୟ ହାରାହାରି: ${currentMonthDay.timings.sunrise}` : `Avg Sunrise: ${currentMonthDay.timings.sunrise}`}</div>
              <div>{isOdia ? `ସୂର୍ଯ୍ୟାସ୍ତ ହାରାହାରି: ${currentMonthDay.timings.sunset}` : `Avg Sunset: ${currentMonthDay.timings.sunset}`}</div>
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400 print:text-neutral-500 pt-1">
                {isOdia ? 'ସୂତ୍ର: କୋହେନୂର ପାଞ୍ଜି ଓ ଦୃକ ସିଦ୍ଧାନ୍ତ ସୂତ୍ରାବଳୀ ।' : 'Source: Kohinoor Panji & Authentic Drik Ephemeris.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* -------------------------------------------------------------------------- */
  /* RENDER 2: DAILY PANCHANG & SANKALPA SHEET                                  */
  /* -------------------------------------------------------------------------- */
  const renderDailyPanchangDocument = () => {
    return (
      <div className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 p-5 sm:p-8 font-odia border border-neutral-200 dark:border-neutral-800 shadow-sm print:border-none print:shadow-none print:p-0 print:bg-white print:text-neutral-900 max-w-4xl mx-auto space-y-5 transition-colors">
        {/* Temple Certificate Bordered Header */}
        <div className="border-4 border-double border-amber-900/60 dark:border-amber-700/60 print:border-amber-900/60 p-5 rounded-2xl text-center bg-amber-50/40 dark:bg-amber-950/20 print:bg-amber-50/30">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-950 dark:text-amber-400 print:text-amber-950">
            ॥ ଶ୍ରୀଜଗନ୍ନାଥୋ ବିଜୟତେ ॥
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-amber-950 dark:text-amber-300 print:text-amber-950 mt-1">
            {isOdia ? 'ଦୈନିକ ଶ୍ରୀମନ୍ଦିର ପାଞ୍ଜି ଓ ବୈଦିକ ମହାସଂକଳ୍ପ ପତ୍ର' : 'Daily Srimandir Panchang & Vedic Maha Sankalpa'}
          </h1>
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 print:text-neutral-700 mt-1">
            {isOdia 
              ? `ତାରିଖ: ${day.dateStr} (${day.varaOdia}) | ${day.odiaMonthNameOdia} ${day.odiaDayOfSolarMonthOdia} ଦିନ`
              : `Date: ${day.dateStr} (${day.varaEn}) | ${day.odiaMonthNameEn} Day ${day.odiaDayOfSolarMonth}`}
          </p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 print:text-neutral-600 mt-0.5">
            {isOdia 
              ? `${toOdiaNumber(day.odiaYearSal)} ସାଲ | ${toOdiaNumber(day.sakabda)} ଶକାବ୍ଦ | ${toOdiaNumber(day.vikramSamvat)} ବିକ୍ରମ ସମ୍ବତ | ସ୍ଥାନ: ${activeLocation.nameOdia} (${activeLocation.nameEn})`
              : `Sal: ${day.odiaYearSal} | Sakabda: ${day.sakabda} | Location: ${activeLocation.nameEn}, Odisha`}
          </p>
        </div>

        {/* Ephemeris & Astronomical Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 print:border-neutral-300 bg-neutral-50 dark:bg-neutral-800/50 print:bg-neutral-50 text-center">
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 print:text-neutral-500 uppercase block font-bold">
              {isOdia ? 'ସୂର୍ଯ୍ୟୋଦୟ ଓ ସୂର୍ଯ୍ୟାସ୍ତ' : 'Sunrise & Sunset'}
            </span>
            <strong className="text-sm text-neutral-900 dark:text-white print:text-neutral-900 font-sans block mt-0.5">
              {day.timings.sunrise} - {day.timings.sunset}
            </strong>
          </div>
          <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 print:border-neutral-300 bg-neutral-50 dark:bg-neutral-800/50 print:bg-neutral-50 text-center">
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 print:text-neutral-500 uppercase block font-bold">
              {isOdia ? 'ଚନ୍ଦ୍ରୋଦୟ ଓ ଚନ୍ଦ୍ରାସ୍ତ' : 'Moonrise & Moonset'}
            </span>
            <strong className="text-sm text-neutral-900 dark:text-white print:text-neutral-900 font-sans block mt-0.5">
              {day.timings.moonrise} - {day.timings.moonset}
            </strong>
          </div>
          <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 print:border-neutral-300 bg-neutral-50 dark:bg-neutral-800/50 print:bg-neutral-50 text-center">
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 print:text-neutral-500 uppercase block font-bold">
              {isOdia ? 'ସୂର୍ଯ୍ୟ ଓ ଚନ୍ଦ୍ର ରାଶି' : 'Sun & Moon Signs'}
            </span>
            <strong className="text-sm text-neutral-900 dark:text-white print:text-neutral-900 block mt-0.5">
              {isOdia ? `${day.rashi.sunSignOdia} / ${day.rashi.moonSignOdia}` : `${day.rashi.sunSignEn} / ${day.rashi.moonSignEn}`}
            </strong>
          </div>
          <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 print:border-neutral-300 bg-neutral-50 dark:bg-neutral-800/50 print:bg-neutral-50 text-center">
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 print:text-neutral-500 uppercase block font-bold">
              {isOdia ? 'ଦୈନିକ ଲଗ୍ନ ଓ ଅୟନାଂଶ' : 'Rising Lagna & Ayanamsha'}
            </span>
            <strong className="text-sm text-neutral-900 dark:text-white print:text-neutral-900 block mt-0.5">
              {isOdia ? day.lagna.nameOdia : day.lagna.nameEn} ({day.drikAyanamsha || 'Lahiri'})
            </strong>
          </div>
        </div>

        {/* The 5 Core Limbs Table */}
        <div>
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white print:text-neutral-900 uppercase border-b-2 border-neutral-900 dark:border-neutral-100 print:border-neutral-900 pb-1 mb-2">
            {isOdia ? 'ପଞ୍ଚାଙ୍ଗ ମୁଖ୍ୟ ପଞ୍ଚ ଅଙ୍ଗ ସାରଣୀ (The Five Limbs of Panchang)' : 'The Five Limbs of Panchang'}
          </h3>
          <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800 print:border-neutral-300">
            <table className="w-full text-xs">
              <tbody>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 print:border-neutral-200">
                  <td className="w-1/3 sm:w-1/4 p-2 bg-neutral-100 dark:bg-neutral-800 print:bg-neutral-100 font-bold border-r border-neutral-200 dark:border-neutral-800 print:border-neutral-300">
                    {isOdia ? '୧. ତିଥି (Tithi)' : '1. Tithi'}
                  </td>
                  <td className="p-2 font-bold text-neutral-900 dark:text-white print:text-neutral-900">
                    {isOdia ? `${day.tithi.pakshaOdia} ${day.tithi.nameOdia}` : `${day.tithi.pakshaEn} ${day.tithi.nameEn}`}
                    {day.tithi.endTime && (
                      <span className="font-normal text-neutral-600 dark:text-neutral-400 print:text-neutral-600 ml-2">
                        ({isOdia ? 'ସମାପ୍ତ: ' : 'Ends: '}{day.tithi.endTime})
                      </span>
                    )}
                  </td>
                </tr>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 print:border-neutral-200">
                  <td className="w-1/3 sm:w-1/4 p-2 bg-neutral-100 dark:bg-neutral-800 print:bg-neutral-100 font-bold border-r border-neutral-200 dark:border-neutral-800 print:border-neutral-300">
                    {isOdia ? '୨. ବାର (Vara)' : '2. Vara'}
                  </td>
                  <td className="p-2 font-bold text-neutral-900 dark:text-white print:text-neutral-900">
                    {isOdia ? `${day.varaOdia} (${day.varaEn})` : `${day.varaEn} (${day.varaOdia})`}
                  </td>
                </tr>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 print:border-neutral-200">
                  <td className="w-1/3 sm:w-1/4 p-2 bg-neutral-100 dark:bg-neutral-800 print:bg-neutral-100 font-bold border-r border-neutral-200 dark:border-neutral-800 print:border-neutral-300">
                    {isOdia ? '୩. ନକ୍ଷତ୍ର (Nakshatra)' : '3. Nakshatra'}
                  </td>
                  <td className="p-2 font-bold text-neutral-900 dark:text-white print:text-neutral-900">
                    {isOdia ? `${day.nakshatra.nameOdia} (${day.nakshatra.pada} ପାଦ)` : `${day.nakshatra.nameEn} (Pada ${day.nakshatra.pada})`}
                    {day.nakshatra.endTime && (
                      <span className="font-normal text-neutral-600 dark:text-neutral-400 print:text-neutral-600 ml-2">
                        ({isOdia ? 'ସମାପ୍ତ: ' : 'Ends: '}{day.nakshatra.endTime})
                      </span>
                    )}
                  </td>
                </tr>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 print:border-neutral-200">
                  <td className="w-1/3 sm:w-1/4 p-2 bg-neutral-100 dark:bg-neutral-800 print:bg-neutral-100 font-bold border-r border-neutral-200 dark:border-neutral-800 print:border-neutral-300">
                    {isOdia ? '୪. ଯୋଗ (Yoga)' : '4. Yoga'}
                  </td>
                  <td className="p-2 font-bold text-neutral-900 dark:text-white print:text-neutral-900">
                    {isOdia ? day.yoga.nameOdia : day.yoga.nameEn}
                    {day.yoga.endTime && (
                      <span className="font-normal text-neutral-600 dark:text-neutral-400 print:text-neutral-600 ml-2">
                        ({isOdia ? 'ସମାପ୍ତ: ' : 'Ends: '}{day.yoga.endTime})
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 sm:w-1/4 p-2 bg-neutral-100 dark:bg-neutral-800 print:bg-neutral-100 font-bold border-r border-neutral-200 dark:border-neutral-800 print:border-neutral-300">
                    {isOdia ? '୫. କରଣ (Karana)' : '5. Karana'}
                  </td>
                  <td className="p-2 font-bold text-neutral-900 dark:text-white print:text-neutral-900">
                    {isOdia ? day.karana.nameOdia : day.karana.nameEn}
                    {day.karana.endTime && (
                      <span className="font-normal text-neutral-600 dark:text-neutral-400 print:text-neutral-600 ml-2">
                        ({isOdia ? 'ସମାପ୍ତ: ' : 'Ends: '}{day.karana.endTime})
                      </span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Auspicious & Inauspicious Timings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800/60 print:border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20 print:bg-emerald-50/50">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-300 print:text-emerald-900 mb-2 border-b border-emerald-200 dark:border-emerald-800/60 print:border-emerald-200 pb-1">
              {isOdia ? '✨ ଶୁଭ ମୁହୂର୍ତ୍ତ ଓ ଅମୃତ ବେଳା' : '✨ Auspicious Timings & Amrita Bela'}
            </h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>{isOdia ? 'ଅଭିଜିତ୍ ମୁହୂର୍ତ୍ତ:' : 'Abhijit Muhurta:'}</span>
                <strong className="font-sans text-neutral-900 dark:text-white print:text-neutral-900">{day.timings.abhijit.start} - {day.timings.abhijit.end}</strong>
              </div>
              <div className="flex justify-between">
                <span>{isOdia ? 'ବ୍ରହ୍ମ ମୁହୂର୍ତ୍ତ:' : 'Brahma Muhurta:'}</span>
                <strong className="font-sans text-neutral-900 dark:text-white print:text-neutral-900">{day.timings.brahmaMuhurta.start} - {day.timings.brahmaMuhurta.end}</strong>
              </div>
              <div className="flex justify-between">
                <span>{isOdia ? 'ଅମୃତ ବେଳା:' : 'Amrita Bela:'}</span>
                <strong className="font-sans text-neutral-900 dark:text-white print:text-neutral-900">{day.timings.amrita.start} - {day.timings.amrita.end}</strong>
              </div>
              <div className="flex justify-between">
                <span>{isOdia ? 'ମାହେନ୍ଦ୍ର ବେଳା:' : 'Mahendra Bela:'}</span>
                <strong className="font-sans text-neutral-900 dark:text-white print:text-neutral-900">{day.timings.mahendra.start} - {day.timings.mahendra.end}</strong>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-800/60 print:border-rose-300 bg-rose-50/50 dark:bg-rose-950/20 print:bg-rose-50/50">
            <h4 className="font-bold text-rose-900 dark:text-rose-300 print:text-rose-900 mb-2 border-b border-rose-200 dark:border-rose-800/60 print:border-rose-200 pb-1">
              {isOdia ? '⚠️ ଅଶୁଭ ସମୟ ଓ ବାରବେଳା' : '⚠️ Inauspicious Periods & Bara Bela'}
            </h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>{isOdia ? 'ରାହୁ କାଳ:' : 'Rahu Kalam:'}</span>
                <strong className="font-sans text-neutral-900 dark:text-white print:text-neutral-900">{day.timings.rahuKala.start} - {day.timings.rahuKala.end}</strong>
              </div>
              <div className="flex justify-between">
                <span>{isOdia ? 'ଯମ ଗଣ୍ଡ:' : 'Yamaganda:'}</span>
                <strong className="font-sans text-neutral-900 dark:text-white print:text-neutral-900">{day.timings.yamaganda.start} - {day.timings.yamaganda.end}</strong>
              </div>
              <div className="flex justify-between">
                <span>{isOdia ? 'ବାର ବେଳା:' : 'Bara Bela:'}</span>
                <strong className="font-sans text-neutral-900 dark:text-white print:text-neutral-900">{day.timings.baraBela.start} - {day.timings.baraBela.end}</strong>
              </div>
              <div className="flex justify-between">
                <span>{isOdia ? 'କାଳ ବେଳା:' : 'Kala Bela:'}</span>
                <strong className="font-sans text-neutral-900 dark:text-white print:text-neutral-900">{day.timings.kalaBela.start} - {day.timings.kalaBela.end}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Choghadiya Day & Night Table */}
        <div>
          <h3 className="text-xs font-bold text-neutral-900 dark:text-white print:text-neutral-900 uppercase border-b border-neutral-200 dark:border-neutral-800 print:border-neutral-300 pb-1 mb-2">
            {isOdia ? 'ଚୌଘଡ଼ିଆ ସାରଣୀ (Choghadiya Muhurtas)' : 'Choghadiya Timings'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
            <div className="border border-neutral-200 dark:border-neutral-800 print:border-neutral-300 rounded-xl p-2.5 bg-neutral-50/50 dark:bg-neutral-800/30 print:bg-transparent">
              <span className="font-bold text-orange-900 dark:text-orange-300 print:text-orange-900 block mb-1.5">
                {isOdia ? 'ଦିବା ଚୌଘଡ଼ିଆ (Day Slots):' : 'Day Choghadiya:'}
              </span>
              <div className="grid grid-cols-4 gap-1.5 text-center">
                {day.choghadiyaDay.map((slot, i) => (
                  <div key={i} className={`p-1 rounded-lg border ${slot.quality === 'good' ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-bold' : slot.quality === 'neutral' ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200' : 'bg-neutral-100 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'}`}>
                    <div>{isOdia ? slot.nameOdia : slot.nameEn}</div>
                    <div className="text-[8px] font-sans">{slot.start} - {slot.end}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-neutral-200 dark:border-neutral-800 print:border-neutral-300 rounded-xl p-2.5 bg-neutral-50/50 dark:bg-neutral-800/30 print:bg-transparent">
              <span className="font-bold text-neutral-900 dark:text-neutral-100 print:text-neutral-900 block mb-1.5">
                {isOdia ? 'ରାତ୍ରି ଚୌଘଡ଼ିଆ (Night Slots):' : 'Night Choghadiya:'}
              </span>
              <div className="grid grid-cols-4 gap-1.5 text-center">
                {day.choghadiyaNight.map((slot, i) => (
                  <div key={i} className={`p-1 rounded-lg border ${slot.quality === 'good' ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-bold' : slot.quality === 'neutral' ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200' : 'bg-neutral-100 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'}`}>
                    <div>{isOdia ? slot.nameOdia : slot.nameEn}</div>
                    <div className="text-[8px] font-sans">{slot.start} - {slot.end}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vedic Sankalpa Card */}
        <div className="p-4 rounded-xl border-2 border-orange-200 dark:border-orange-800/60 print:border-orange-200 bg-orange-50/40 dark:bg-orange-950/20 print:bg-orange-50/30 space-y-2">
          <div className="flex items-center justify-between border-b border-orange-200 dark:border-orange-800/60 print:border-orange-200 pb-1.5">
            <h4 className="font-bold text-xs uppercase tracking-wide text-orange-950 dark:text-orange-300 print:text-orange-950 flex items-center gap-1.5">
              <Scroll className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
              <span>
                {isOdia 
                  ? `ଦୈନିକ ବୈଦିକ ମହାସଂକଳ୍ପ (${sankalpaType === 'laghu' ? 'ଲଘୁ ସଂକଳ୍ପ' : 'ବିସ୍ତୃତ ସଂକଳ୍ପ'})`
                  : `Vedic Daily Sankalpa (${sankalpaType === 'laghu' ? 'Laghu' : 'Detailed'})`}
              </span>
            </h4>
            <span className="text-[10px] text-neutral-600 dark:text-neutral-400 print:text-neutral-600 font-medium">
              {isOdia ? `ଗୋତ୍ର: ${gotra} | ଯଜମାନ: ${name}` : `Gotra: ${gotra} | Devotee: ${name}`}
            </span>
          </div>

          <p className="text-sm font-bold text-neutral-900 dark:text-white print:text-neutral-900 leading-relaxed whitespace-pre-line text-center">
            {currentSankalpaText}
          </p>

          <div className="pt-2 border-t border-orange-200/80 dark:border-orange-800/60 print:border-orange-200/80 text-xs text-neutral-800 dark:text-neutral-200 print:text-neutral-800 leading-relaxed whitespace-pre-line text-justify">
            <strong className="block text-[11px] text-orange-900 dark:text-orange-400 print:text-orange-900 uppercase mb-0.5">
              {isOdia ? 'ସଂକଳ୍ପର ଭାବାର୍ଥ:' : 'Sankalpa Meaning:'}
            </strong>
            {currentSankalpaMeaning}
          </div>
        </div>
      </div>
    );
  };

  /* -------------------------------------------------------------------------- */
  /* RENDER 3: ANNUAL FESTIVALS & ODISHA GOVT HOLIDAYS DIRECTORY                */
  /* -------------------------------------------------------------------------- */
  const renderFestivalsDocument = () => {
    return (
      <div className={`bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 p-5 sm:p-8 ${isOdia ? 'font-odia' : 'font-sans'} border border-neutral-200 dark:border-neutral-800 shadow-sm print:border-none print:shadow-none print:p-0 print:bg-white print:text-neutral-900 max-w-5xl mx-auto transition-colors`}>
        {/* Masthead Banner */}
        <div className="border-b-2 border-neutral-900 dark:border-neutral-100 print:border-neutral-900 pb-3 mb-4 text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400 print:text-emerald-800">
            {isOdia ? 'ଓଡ଼ିଶା ସରକାରଙ୍କ ବିଜ୍ଞପ୍ତି ଓ ପ୍ରାମାଣିକ ଦୃକ ପଞ୍ଚାଙ୍ଗ ନିର୍ଣ୍ଣୟ ୨୦୨୬' : 'Odisha Govt Gazette & Authentic Drik Panchang Directory 2026'}
          </div>
          <h1 className={`text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white print:text-neutral-950 mt-1 ${isOdia ? 'font-odia' : 'font-sans'}`}>
            {isOdia ? 'ଓଡ଼ିଶା ସରକାରୀ ଛୁଟି ଓ ପ୍ରମୁଖ ପର୍ବପର୍ବାଣୀ ତାଲିକା ୨୦୨୬' : 'Odisha Government Holidays & Major Festivals 2026'}
          </h1>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 print:text-neutral-600 mt-0.5">
            {isOdia 
              ? `Odisha Government Holidays & Major Festivals Directory 2026 | ସମୁଦାୟ ତାଲିକାଭୁକ୍ତ ପର୍ବ: ${toOdiaNumber(filteredAnnualEvents.length)}`
              : `Odisha Government Holidays & Major Festivals Directory 2026 | Total Listed Events: ${filteredAnnualEvents.length}`}
          </p>
        </div>

        {/* Clean Gazette Table */}
        <div className="border border-neutral-200 dark:border-neutral-800 print:border-neutral-300 rounded-lg overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs min-w-[650px]">
            <thead>
              <tr className="bg-neutral-900 dark:bg-neutral-800 print:bg-neutral-900 text-white font-bold border-b border-neutral-900 dark:border-neutral-700 print:border-neutral-900">
                <th className="py-2 px-2 text-center w-12 border-r border-neutral-700">{isOdia ? 'କ୍ରମ' : 'Sl'}</th>
                <th className="py-2 px-2.5 w-24 border-r border-neutral-700">{isOdia ? 'ତାରିଖ' : 'Date'}</th>
                <th className="py-2 px-2 w-20 border-r border-neutral-700">{isOdia ? 'ବାର' : 'Day'}</th>
                <th className="py-2 px-3 border-r border-neutral-700">{isOdia ? 'ପର୍ବ / ଛୁଟିର ନାମ' : 'Festival / Holiday'}</th>
                <th className="py-2 px-2.5 w-28 border-r border-neutral-700">{isOdia ? 'ଶ୍ରେଣୀ' : 'Category'}</th>
                <th className="py-2 px-3">{isOdia ? 'ମହତ୍ତ୍ୱ ଓ ପୂଜାବିଧି' : 'Significance & Rituals'}</th>
              </tr>
            </thead>
            <tbody>
              {filteredAnnualEvents.map((ev, index) => {
                const isGovt = ev.isGovtHoliday;
                const isEven = index % 2 === 0;
                return (
                  <tr 
                    key={ev.id + index}
                    className={`border-b border-neutral-200 dark:border-neutral-800 print:border-neutral-200 ${
                      isGovt 
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/25 print:bg-emerald-50/50' 
                        : isEven 
                        ? 'bg-neutral-50/60 dark:bg-neutral-800/30 print:bg-neutral-50/60' 
                        : 'bg-white dark:bg-neutral-900 print:bg-white'
                    }`}
                  >
                    <td className="py-2 px-2 text-center font-bold text-neutral-600 dark:text-neutral-400 print:text-neutral-600 border-r border-neutral-200 dark:border-neutral-800 print:border-neutral-200">
                      {isOdia ? toOdiaNumber(index + 1) : index + 1}
                    </td>
                    <td className="py-2 px-2.5 font-bold font-sans text-neutral-900 dark:text-neutral-100 print:text-neutral-900 border-r border-neutral-200 dark:border-neutral-800 print:border-neutral-200">
                      {ev.dateStr}
                    </td>
                    <td className="py-2 px-2 text-neutral-700 dark:text-neutral-300 print:text-neutral-700 border-r border-neutral-200 dark:border-neutral-800 print:border-neutral-200">
                      {isOdia 
                        ? (ev.ritualsOdia?.split(' ')[0] || (ev.dateStr ? WEEKDAYS[new Date(ev.dateStr).getDay()].nameOdia : '—')) 
                        : (ev.dateStr ? WEEKDAYS[new Date(ev.dateStr).getDay()].nameEn.slice(0, 3) : '—')}
                    </td>
                    <td className="py-2 px-3 border-r border-neutral-200 dark:border-neutral-800 print:border-neutral-200">
                      <div className="font-bold text-neutral-950 dark:text-white print:text-neutral-950 text-sm">
                        {isOdia ? ev.titleOdia : ev.titleEn}
                      </div>
                      <div className="text-[10px] text-neutral-500 dark:text-neutral-400 print:text-neutral-500">
                        {isOdia ? ev.titleEn : ev.titleOdia}
                      </div>
                    </td>
                    <td className="py-2 px-2.5 border-r border-neutral-200 dark:border-neutral-800 print:border-neutral-200">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        isGovt
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : ev.type === 'ekadashi'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 border border-orange-300 dark:border-orange-800'
                      }`}>
                        {isOdia 
                          ? ev.categoryLabel 
                          : (isGovt ? 'Govt Holiday' : ev.type === 'ekadashi' ? 'Ekadashi' : 'Major Festival')}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-[11px] text-neutral-700 dark:text-neutral-300 print:text-neutral-700 leading-snug">
                      {isOdia ? ev.significanceOdia : (ev.significanceEn || ev.significanceOdia)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Signature */}
        <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 print:border-neutral-300 flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 print:text-neutral-500">
          <div>
            {isOdia 
              ? 'ସୂତ୍ର: ଓଡ଼ିଶା ରାଜପତ୍ର (Gazette Notification) ଏବଂ ପ୍ରାମାଣିକ ଦୃକ ପଞ୍ଚାଙ୍ଗ ଗଣିତ ।' 
              : 'Source: Odisha Gazette Notification & Authentic Drik Panchang Calculations.'}
          </div>
          <div>
            {isOdia ? `ତାରିଖ: ${toOdiaNumber(day.dateStr)}` : `Date: ${day.dateStr}`}
          </div>
        </div>
      </div>
    );
  };

  /* -------------------------------------------------------------------------- */
  /* ACTIVE DOCUMENT SELECTOR                                                   */
  /* -------------------------------------------------------------------------- */
  const renderCurrentDocument = () => {
    return (
      <div 
        ref={documentRef}
        id="printable-document-content" 
        className="w-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
      >
        {exportType === 'month' && renderMonthCalendarDocument()}
        {exportType === 'day' && renderDailyPanchangDocument()}
        {exportType === 'festivals' && renderFestivalsDocument()}
      </div>
    );
  };

  return (
    <>
      {/* 1. ON-SCREEN MODAL PREVIEW & CONFIGURATION DIALOG */}
      <div 
        id="pdf-export-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/50 dark:bg-black/75 backdrop-blur-sm animate-fade-in print:hidden"
        onClick={onClose}
      >
        <div 
          id="pdf-export-modal-card"
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-5xl max-h-[92vh] rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col overflow-hidden text-neutral-900 dark:text-neutral-100 transition-colors font-sans"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/90 dark:bg-neutral-950/80 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <FileDown className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-base sm:text-lg font-bold text-neutral-950 dark:text-white ${isOdia ? 'font-odia' : 'font-sans'}`}>
                  {isOdia ? 'PDF ଡାଉନଲୋଡ୍ କରନ୍ତୁ' : 'Download as PDF'}
                </h3>
                <p className={`text-[11px] text-neutral-500 dark:text-neutral-400 ${isOdia ? 'font-odia' : 'font-sans'}`}>
                  {isOdia ? 'ମାସିକ କ୍ୟାଲେଣ୍ଡର, ଦୈନିକ ପଞ୍ଚାଙ୍ଗ କିମ୍ବା ବାର୍ଷିକ ପର୍ବପର୍ବାଣୀ ତାଲିକା ଉଚ୍ଚ ଗୁଣମାନର PDF ରୂପେ ସଂରକ୍ଷଣ କରନ୍ତୁ' : 'Export high-resolution vector PDF of monthly calendar, daily panchang, or festival list'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              title={isOdia ? 'ବନ୍ଦ କରନ୍ତୁ' : 'Close'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Option Selector Tabs */}
          <div className="px-5 sm:px-6 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/70 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 overflow-x-auto">
              <button
                type="button"
                onClick={() => setExportType('month')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${isOdia ? 'font-odia' : 'font-sans'} cursor-pointer ${
                  exportType === 'month'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700/80 hover:bg-neutral-50 dark:hover:bg-neutral-700/60'
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>{isOdia ? 'ମାସିକ କ୍ୟାଲେଣ୍ଡର' : 'Month Calendar'}</span>
              </button>

              <button
                type="button"
                onClick={() => setExportType('day')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${isOdia ? 'font-odia' : 'font-sans'} cursor-pointer ${
                  exportType === 'day'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700/80 hover:bg-neutral-50 dark:hover:bg-neutral-700/60'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{isOdia ? 'ଦୈନିକ ପଞ୍ଚାଙ୍ଗ' : 'Daily Panchang'}</span>
              </button>

              <button
                type="button"
                onClick={() => setExportType('festivals')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${isOdia ? 'font-odia' : 'font-sans'} cursor-pointer ${
                  exportType === 'festivals'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700/80 hover:bg-neutral-50 dark:hover:bg-neutral-700/60'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>{isOdia ? 'ବାର୍ଷିକ ପର୍ବ ଓ ଛୁଟି' : 'Festivals Directory'}</span>
              </button>
            </div>

            {/* Contextual Options Bar */}
            <div className={`flex items-center gap-2.5 ${isOdia ? 'font-odia' : 'font-sans'} text-xs`}>
              {exportType === 'month' && (
                <div className="flex items-center gap-1.5">
                  <span className="text-neutral-500 dark:text-neutral-400 font-medium">
                    {isOdia ? 'ମାସ ବାଛନ୍ତୁ:' : 'Select Month:'}
                  </span>
                  <select
                    value={selectedMonthIndex}
                    onChange={(e) => setSelectedMonthIndex(Number(e.target.value))}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-2xs cursor-pointer"
                  >
                    {isOdia
                      ? gregorianMonthNamesOdia.map((mName, idx) => (
                          <option key={idx} value={idx}>
                            {mName} (୨୦୨୬)
                          </option>
                        ))
                      : [
                          'January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'
                        ].map((mName, idx) => (
                          <option key={idx} value={idx}>
                            {mName} 2026
                          </option>
                        ))}
                  </select>
                </div>
              )}

              {exportType === 'day' && (
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1 bg-neutral-200/80 dark:bg-neutral-800 p-1 rounded-xl border border-neutral-300 dark:border-neutral-700">
                    <button
                      type="button"
                      onClick={() => setSankalpaType('laghu')}
                      className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${sankalpaType === 'laghu' ? 'bg-orange-600 text-white' : 'text-neutral-600 dark:text-neutral-400'}`}
                    >
                      {isOdia ? 'ଲଘୁ ସଂକଳ୍ପ' : 'Laghu'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSankalpaType('vistrut')}
                      className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${sankalpaType === 'vistrut' ? 'bg-orange-600 text-white' : 'text-neutral-600 dark:text-neutral-400'}`}
                    >
                      {isOdia ? 'ବିସ୍ତୃତ ସଂକଳ୍ପ' : 'Detailed'}
                    </button>
                  </div>
                  <input
                    type="text"
                    value={gotra}
                    onChange={(e) => setGotra(e.target.value)}
                    placeholder={isOdia ? "ଗୋତ୍ର" : "Gotra"}
                    className="w-20 px-2.5 py-1.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-2xs"
                    title={isOdia ? "ସଂକଳ୍ପ ପାଇଁ ଗୋତ୍ର ଲେଖନ୍ତୁ" : "Enter Gotra for Sankalpa"}
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isOdia ? "ନାମ" : "Name"}
                    className="w-24 px-2.5 py-1.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-2xs"
                    title={isOdia ? "ସଂକଳ୍ପ ପାଇଁ ନାମ ଲେଖନ୍ତୁ" : "Enter Name for Sankalpa"}
                  />
                </div>
              )}

              {exportType === 'festivals' && (
                <div className="flex items-center gap-1.5">
                  <span className="text-neutral-500 dark:text-neutral-400 font-medium">
                    {isOdia ? 'ଶ୍ରେଣୀ:' : 'Category:'}
                  </span>
                  <select
                    value={festivalCategory}
                    onChange={(e) => setFestivalCategory(e.target.value as any)}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-2xs cursor-pointer"
                  >
                    <option value="all">{isOdia ? 'ସମସ୍ତ ପର୍ବ ଓ ଛୁଟି (All)' : 'All Festivals & Holidays'}</option>
                    <option value="govt">{isOdia ? 'କେବଳ ସରକାରୀ ଛୁଟି (Govt Holidays)' : 'Govt Holidays Only'}</option>
                    <option value="major">{isOdia ? 'ମହାପର୍ବ ଓ ବ୍ରତ (Major Festivals)' : 'Major Festivals & Vratas'}</option>
                    <option value="ekadashi">{isOdia ? '୨୪ ପବିତ୍ର ଏକାଦଶୀ (Ekadashi)' : '24 Holy Ekadashis'}</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Live Document Preview Frame with full scrolling */}
          <div 
            id="pdf-preview-scroll-container"
            className="flex-1 min-h-0 overflow-y-auto overflow-x-auto p-4 sm:p-6 bg-neutral-100/90 dark:bg-neutral-950/80 flex flex-col items-center"
          >
            {/* Scroll indicator banner */}
            <div className={`w-full max-w-4xl mb-2 flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 ${isOdia ? 'font-odia' : 'font-sans'} px-1`}>
              <span className="flex items-center gap-1.5">
                <Scroll className="w-3.5 h-3.5 text-orange-500" />
                <span>{isOdia ? 'ପ୍ରଦର୍ଶନ (Preview) - ସମ୍ପୂର୍ଣ୍ଣ ବିବରଣୀ ଦେଖିବାକୁ ତଳକୁ ସ୍କ୍ରୋଲ୍ କରନ୍ତୁ' : 'Preview Document - Scroll down to view full pages and details'}</span>
              </span>
              <span className="text-[10px] bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-2 py-0.5 rounded-full font-mono">
                A4 {exportType === 'month' ? 'Landscape' : 'Portrait'}
              </span>
            </div>

            {/* The Document Sheet */}
            <div className="w-full max-w-4xl shadow-md dark:shadow-2xl rounded-2xl bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800 transition-colors">
              {renderCurrentDocument()}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="px-5 sm:px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/90 dark:bg-neutral-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className={`text-xs text-neutral-600 dark:text-neutral-400 ${isOdia ? 'font-odia' : 'font-sans'} flex items-center gap-2`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse shrink-0" />
              <span>
                {isOdia 
                  ? '💡 PDF ଡାଉନଲୋଡ୍ ପାଇଁ ଡାଇଲଗ୍ ରେ Destination ଭାବେ "Save as PDF" ବାଛି Save କରନ୍ତୁ ।'
                  : '💡 Choose "Save as PDF" in the destination dropdown to export a vector PDF file.'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer ${isOdia ? 'font-odia' : 'font-sans'}`}
              >
                {isOdia ? 'ବାତିଲ୍' : 'Cancel'}
              </button>

              <button
                type="button"
                id="modal-download-pdf-btn"
                onClick={handleDownloadPdf}
                disabled={isGenerating}
                className={`px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 active:scale-95 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-orange-600/30 transition-all cursor-pointer ${isOdia ? 'font-odia' : 'font-sans'} disabled:opacity-50`}
              >
                <Download className="w-4 h-4" />
                <span>
                  {isGenerating 
                    ? (isOdia ? 'ପ୍ରସ୍ତୁତ ହେଉଛି...' : 'Generating PDF...') 
                    : (isOdia ? 'PDF ଡାଉନଲୋଡ୍ କରନ୍ତୁ' : 'Download as PDF')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DIRECT PORTAL TO BODY FOR FLAWLESS @media print EXECUTION */}
      {createPortal(
        <div id="print-document-portal" className="hidden print:block w-full bg-white text-neutral-900">
          {exportType === 'month' && renderMonthCalendarDocument()}
          {exportType === 'day' && renderDailyPanchangDocument()}
          {exportType === 'festivals' && renderFestivalsDocument()}
        </div>,
        document.body
      )}
    </>
  );
};

// Backwards compatibility alias
export const PrintExportModal = PdfExportModal;
export type PrintOptionType = ExportOptionType;
