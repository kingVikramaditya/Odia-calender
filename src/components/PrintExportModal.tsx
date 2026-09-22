import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Printer, 
  FileText, 
  Calendar as CalendarIcon, 
  Award, 
  Check, 
  Sparkles, 
  Sun, 
  Moon, 
  Clock, 
  Download,
  Scroll,
  Info,
  Compass
} from 'lucide-react';
import { PanchangDay, LanguageMode, FestivalEvent, LocationInfo } from '../types';
import { toOdiaNumber, ODIA_MONTHS, WEEKDAYS, LOCATIONS } from '../data/odiaConstants';
import { ODISHA_GOVT_HOLIDAYS_2026 } from '../data/odishaGovtHolidays';
import { COMPREHENSIVE_FESTIVALS, EKADASHI_EVENTS } from '../data/festivalsData';
import { generateSankalpa } from '../utils/sankalpaEngine';
import { getMonthPanchang } from '../utils/panchangEngine';

interface PrintExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: PanchangDay;
  monthDays: PanchangDay[];
  language: LanguageMode;
  location?: LocationInfo;
}

export type PrintOptionType = 'month' | 'day' | 'festivals';

export const PrintExportModal: React.FC<PrintExportModalProps> = ({
  isOpen,
  onClose,
  day,
  monthDays,
  language,
  location,
}) => {
  const [printType, setPrintType] = useState<PrintOptionType>('month');
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(day.gregorianMonth);
  const [sankalpaType, setSankalpaType] = useState<'laghu' | 'vistrut'>('laghu');
  const [gotra, setGotra] = useState<string>('କାଶ୍ୟପ');
  const [name, setName] = useState<string>('ଅମୁକ ଶର୍ମା');
  const [festivalCategory, setFestivalCategory] = useState<'all' | 'govt' | 'major' | 'ekadashi'>('all');

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

  if (!isOpen) return null;

  const handlePrint = () => {
    const printContent = document.getElementById('printable-document-content');
    if (!printContent) {
      window.print();
      return;
    }

    try {
      let printIframe = document.getElementById('hidden-print-iframe') as HTMLIFrameElement | null;
      if (!printIframe) {
        printIframe = document.createElement('iframe');
        printIframe.id = 'hidden-print-iframe';
        printIframe.style.position = 'fixed';
        printIframe.style.right = '0';
        printIframe.style.bottom = '0';
        printIframe.style.width = '0';
        printIframe.style.height = '0';
        printIframe.style.border = '0';
        printIframe.style.visibility = 'hidden';
        document.body.appendChild(printIframe);
      }

      const iframeDoc = printIframe.contentDocument || printIframe.contentWindow?.document;
      if (!iframeDoc) {
        window.print();
        return;
      }

      const styleSheets = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
        .map(el => el.outerHTML)
        .join('\n');

      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html lang="or">
          <head>
            <meta charset="utf-8" />
            <title>ଓଡ଼ିଆ ପାଞ୍ଜିକା ୨୦୨୬ - Odia Calendar 2026</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Anek+Odia:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+Oriya:wght@400;500;600;700&display=swap" rel="stylesheet">
            ${styleSheets}
            <style>
              @page {
                size: auto;
                margin: 8mm;
              }
              *, *::before, *::after {
                box-sizing: border-box;
              }
              html, body {
                background: #ffffff !important;
                color: #171717 !important;
                font-family: 'Anek Odia', 'Noto Sans Oriya', 'Plus Jakarta Sans', sans-serif !important;
                margin: 0 !important;
                padding: 0 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .font-odia {
                font-family: 'Anek Odia', 'Noto Sans Oriya', sans-serif !important;
              }
              .font-sans {
                font-family: 'Plus Jakarta Sans', sans-serif !important;
              }
            </style>
          </head>
          <body class="bg-white text-neutral-900 p-2">
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      iframeDoc.close();

      setTimeout(() => {
        try {
          printIframe?.contentWindow?.focus();
          printIframe?.contentWindow?.print();
        } catch (e) {
          console.error('Iframe print error', e);
          window.print();
        }
      }, 350);
    } catch (e) {
      console.error('Print error', e);
      window.print();
    }
  };

  const handleOpenInNewWindow = () => {
    const printContent = document.getElementById('printable-document-content');
    if (!printContent) return;
    const styleSheets = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
      .map(el => el.outerHTML)
      .join('\n');
    const win = window.open('', '_blank');
    if (!win) {
      alert('Please allow popups to open the printable view in a new tab.');
      return;
    }
    win.document.write(`
      <!DOCTYPE html>
      <html lang="or">
        <head>
          <meta charset="utf-8" />
          <title>ମୁଦ୍ରଣ ପ୍ରଦର୍ଶନ - Odia Calendar 2026</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Anek+Odia:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+Oriya:wght@400;500;600;700&display=swap" rel="stylesheet">
          ${styleSheets}
          <style>
            @page { size: auto; margin: 8mm; }
            body { background: #ffffff !important; color: #171717 !important; padding: 16px; font-family: 'Anek Odia', sans-serif; }
          </style>
        </head>
        <body>
          <div style="max-width: 1000px; margin: 0 auto;">
            ${printContent.innerHTML}
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() { window.print(); }, 400);
            };
          </script>
        </body>
      </html>
    `);
    win.document.close();
  };

  const gregorianMonthNamesOdia = [
    'ଜାନୁଆରୀ', 'ଫେବୃଆରୀ', 'ମାର୍ଚ୍ଚ', 'ଅପ୍ରେଲ୍', 'ମେ', 'ଜୁନ୍',
    'ଜୁଲାଇ', 'ଅଗଷ୍ଟ', 'ସେପ୍ଟେମ୍ବର', 'ଅକ୍ଟୋବର', 'ନଭେମ୍ବର', 'ଡିସେମ୍ବର'
  ];
  const gregorianMonthNamesEn = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  /* -------------------------------------------------------------------------- */
  /* RENDER 1: MONTHLY CALENDAR WALL SHEET                                      */
  /* -------------------------------------------------------------------------- */
  const renderMonthCalendarDocument = () => {
    // Collect monthly highlights
    const monthlyHolidays = activeMonthDays.filter(d => d.isGovtHoliday || d.events.length > 0);
    const monthlyEkadashis = activeMonthDays.filter(d => d.moonPhase.isEkadashi);
    const monthlyPurnima = activeMonthDays.find(d => d.moonPhase.isPurnima);
    const monthlyAmavasya = activeMonthDays.find(d => d.moonPhase.isAmavasya);
    const monthlySankranti = activeMonthDays.find(d => d.moonPhase.isSankranti);

    return (
      <div className="bg-white text-neutral-900 p-6 sm:p-8 font-odia border border-neutral-300 shadow-sm print:border-none print:shadow-none print:p-0 max-w-5xl mx-auto">
        {/* Masthead Banner */}
        <div className="border-b-2 border-neutral-900 pb-4 mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-center sm:text-left">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-orange-700">
              ପ୍ରାମାଣିକ ଦୃକ ସିଦ୍ଧାନ୍ତ ଓଡ଼ିଶା ପାଞ୍ଜିକା ୨୦୨୬
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 font-odia tracking-tight">
              {activeOdiaMonthName} ମାସ
              <span className="text-base sm:text-lg font-bold text-neutral-700 ml-2">
                ({gregorianMonthNamesOdia[selectedMonthIndex]} {gregorianMonthNamesEn[selectedMonthIndex]} ୨୦୨୬)
              </span>
            </h1>
            <p className="text-xs text-neutral-600 font-medium mt-0.5">
              {activeOdiaYearSal} ସାଲ | {activeSakabda} ଶକାବ୍ଦ | {activeVikramSamvat} ବିକ୍ରମ ସମ୍ବତ | ସ୍ଥାନ: {activeLocation.nameOdia} ({activeLocation.nameEn})
            </p>
          </div>

          <div className="text-center sm:text-right shrink-0">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-neutral-900 text-white">
              {gregorianMonthNamesEn[selectedMonthIndex]} 2026
            </span>
          </div>
        </div>

        {/* 7-Column Calendar Grid Table */}
        <div className="border-2 border-neutral-900 rounded-lg overflow-hidden">
          <table className="w-full border-collapse text-left table-fixed">
            <thead>
              <tr className="border-b-2 border-neutral-900 text-center font-bold text-xs sm:text-sm">
                <th className="py-2.5 px-1 bg-red-600 text-white border-r border-neutral-900 w-[14.28%]">
                  <div>ରବିବାର</div>
                  <div className="text-[10px] font-normal opacity-90">Sunday</div>
                </th>
                <th className="py-2.5 px-1 bg-neutral-800 text-white border-r border-neutral-700 w-[14.28%]">
                  <div>ସୋମବାର</div>
                  <div className="text-[10px] font-normal opacity-90">Monday</div>
                </th>
                <th className="py-2.5 px-1 bg-neutral-800 text-white border-r border-neutral-700 w-[14.28%]">
                  <div>ମଙ୍ଗଳବାର</div>
                  <div className="text-[10px] font-normal opacity-90">Tuesday</div>
                </th>
                <th className="py-2.5 px-1 bg-neutral-800 text-white border-r border-neutral-700 w-[14.28%]">
                  <div>ବୁଧବାର</div>
                  <div className="text-[10px] font-normal opacity-90">Wednesday</div>
                </th>
                <th className="py-2.5 px-1 bg-neutral-800 text-white border-r border-neutral-700 w-[14.28%]">
                  <div>ଗୁରୁବାର</div>
                  <div className="text-[10px] font-normal opacity-90">Thursday</div>
                </th>
                <th className="py-2.5 px-1 bg-neutral-800 text-white border-r border-neutral-700 w-[14.28%]">
                  <div>ଶୁକ୍ରବାର</div>
                  <div className="text-[10px] font-normal opacity-90">Friday</div>
                </th>
                <th className="py-2.5 px-1 bg-neutral-800 text-white w-[14.28%]">
                  <div>ଶନିବାର</div>
                  <div className="text-[10px] font-normal opacity-90">Saturday</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.ceil(totalCells / 7) }).map((_, rowIndex) => {
                return (
                  <tr key={rowIndex} className="border-b border-neutral-300">
                    {Array.from({ length: 7 }).map((_, colIndex) => {
                      const cellIndex = rowIndex * 7 + colIndex;
                      if (cellIndex < leadingBlanks.length || cellIndex >= leadingBlanks.length + activeMonthDays.length) {
                        return (
                          <td key={colIndex} className="p-2 border-r border-neutral-200 bg-neutral-50/70 h-24 align-top" />
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
                          className={`p-1.5 sm:p-2 border-r border-neutral-300 h-24 align-top transition-colors relative ${
                            isGovt 
                              ? 'bg-emerald-50/40' 
                              : isSunday 
                              ? 'bg-red-50/30' 
                              : 'bg-white'
                          }`}
                        >
                          {/* Date Header: Gregorian & Odia Solar Date */}
                          <div className="flex items-start justify-between leading-none mb-1">
                            <span className={`text-base sm:text-xl font-black ${isSunday || isGovt ? 'text-red-700 font-sans' : 'text-neutral-900 font-sans'}`}>
                              {d.gregorianDay}
                            </span>
                            <span className="text-[10px] font-bold text-neutral-600 bg-neutral-100 px-1 py-0.5 rounded border border-neutral-200 font-odia">
                              {d.odiaDayOfSolarMonthOdia} {d.odiaMonthNameOdia}
                            </span>
                          </div>

                          {/* Tithi & Nakshatra */}
                          <div className="text-[10px] font-medium leading-tight text-neutral-700 space-y-0.5">
                            <div className="font-semibold text-neutral-900 truncate">
                              {d.tithi.pakshaOdia === 'ଶୁକ୍ଳପକ୍ଷ' ? 'ଶୁ.' : 'କୃ.'} {d.tithi.nameOdia}
                            </div>
                            <div className="text-neutral-500 text-[9px] truncate">
                              {d.nakshatra.nameOdia}
                            </div>
                          </div>

                          {/* Event Badges */}
                          <div className="mt-1 space-y-0.5">
                            {isGovt && (d.govtHolidayInfo?.nameOdia || d.events.find(e => e.isGovtHoliday)?.titleOdia) && (
                              <div className="text-[9px] font-bold bg-emerald-700 text-white px-1 py-0.5 rounded leading-tight truncate">
                                🏛️ {d.govtHolidayInfo?.nameOdia || d.events.find(e => e.isGovtHoliday)?.titleOdia}
                              </div>
                            )}

                            {d.events.filter(e => e.type !== 'govt_holiday').slice(0, 1).map(ev => (
                              <div key={ev.id} className="text-[9px] font-bold bg-orange-600 text-white px-1 py-0.5 rounded leading-tight truncate">
                                🚩 {ev.titleOdia.split(' ')[0]}
                              </div>
                            ))}

                            {isEkadashi && (
                              <div className="text-[8px] font-bold bg-amber-500 text-white px-1 rounded leading-tight inline-block">
                                ★ ଏକାଦଶୀ
                              </div>
                            )}
                            {isPurnima && (
                              <div className="text-[8px] font-bold bg-neutral-900 text-amber-300 px-1 rounded leading-tight inline-block">
                                🌕 ପୂର୍ଣ୍ଣିମା
                              </div>
                            )}
                            {isAmavasya && (
                              <div className="text-[8px] font-bold bg-neutral-950 text-white px-1 rounded leading-tight inline-block">
                                🌑 ଅମାବାସ୍ୟା
                              </div>
                            )}
                            {isSankranti && (
                              <div className="text-[8px] font-bold bg-orange-700 text-white px-1 rounded leading-tight inline-block">
                                ☀️ ସଂକ୍ରାନ୍ତି
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
        <div className="mt-4 p-4 rounded-xl border border-neutral-300 bg-neutral-50 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <h4 className="font-bold text-neutral-900 border-b border-neutral-300 pb-1 mb-1.5 flex items-center gap-1.5 text-emerald-800">
              <span>🏛️ ସରକାରୀ ଛୁଟି ଓ ପ୍ରମୁଖ ପର୍ବ</span>
            </h4>
            {monthlyHolidays.length === 0 ? (
              <p className="text-neutral-500">ଏହି ମାସରେ କୌଣସି ଛୁଟି ନାହିଁ ।</p>
            ) : (
              <ul className="space-y-1">
                {monthlyHolidays.slice(0, 5).map(h => (
                  <li key={h.dateStr} className="text-[11px] leading-snug">
                    <strong className="text-neutral-900 font-sans">{h.gregorianDay}:</strong> {h.govtHolidayInfo?.nameOdia || h.events[0]?.titleOdia}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h4 className="font-bold text-neutral-900 border-b border-neutral-300 pb-1 mb-1.5 flex items-center gap-1.5 text-amber-800">
              <span>★ ପବିତ୍ର ଏକାଦଶୀ ଓ ବ୍ରତ</span>
            </h4>
            <ul className="space-y-1 text-[11px]">
              {monthlyEkadashis.map(e => (
                <li key={e.dateStr}>
                  <strong className="text-neutral-900 font-sans">{e.gregorianDay}:</strong> {e.events.find(ev => ev.type === 'ekadashi')?.titleOdia || 'ଏକାଦଶୀ ଉପବାସ'}
                </li>
              ))}
              {monthlyPurnima && (
                <li>
                  <strong className="text-neutral-900 font-sans">{monthlyPurnima.gregorianDay}:</strong> ପୂର୍ଣ୍ଣିମା (ଶେଷ: {monthlyPurnima.tithi.endTime || 'ଦିବା/ରାତ୍ରି'})
                </li>
              )}
              {monthlyAmavasya && (
                <li>
                  <strong className="text-neutral-900 font-sans">{monthlyAmavasya.gregorianDay}:</strong> ଅମାବାସ୍ୟା (ଶେଷ: {monthlyAmavasya.tithi.endTime || 'ଦିବା/ରାତ୍ରି'})
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-neutral-900 border-b border-neutral-300 pb-1 mb-1.5 flex items-center gap-1.5 text-orange-800">
              <span>☀️ ସଂକ୍ରାନ୍ତି ଓ ମାସିକ ବିବରଣୀ</span>
            </h4>
            <div className="text-[11px] space-y-1 text-neutral-700">
              {monthlySankranti ? (
                <div>
                  <strong className="text-neutral-900 font-sans">{monthlySankranti.gregorianDay}:</strong> {monthlySankranti.moonPhase.sankrantiNameOdia || 'ରବି ସଂକ୍ରାନ୍ତି'}
                </div>
              ) : (
                <div>ମାସର ସମସ୍ତ ଦିନରେ ଦୃକ ପାଞ୍ଜି ଗଣିତ ଅନୁମୋଦିତ ।</div>
              )}
              <div>ସୂର୍ଯ୍ୟୋଦୟ ହାରାହାରି: {currentMonthDay.timings.sunrise}</div>
              <div>ସୂର୍ଯ୍ୟାସ୍ତ ହାରାହାରି: {currentMonthDay.timings.sunset}</div>
              <div className="text-[10px] text-neutral-500 pt-1">
                ସୂତ୍ର: କୋହେନୂର ପାଞ୍ଜି ଓ ଦୃକ ସିଦ୍ଧାନ୍ତ ସୂତ୍ରାବଳୀ ।
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
      <div className="bg-white text-neutral-900 p-6 sm:p-8 font-odia border border-neutral-300 shadow-sm print:border-none print:shadow-none print:p-0 max-w-4xl mx-auto space-y-5">
        {/* Temple Certificate Bordered Header */}
        <div className="border-4 border-double border-amber-900/60 p-5 rounded-2xl text-center bg-amber-50/30">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-950">
            ॥ ଶ୍ରୀଜଗନ୍ନାଥୋ ବିଜୟତେ ॥
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-amber-950 mt-1">
            ଦୈନିକ ଶ୍ରୀମନ୍ଦିର ପାଞ୍ଜି ଓ ବୈଦିକ ମହାସଂକଳ୍ପ ପତ୍ର
          </h1>
          <p className="text-sm font-semibold text-neutral-700 mt-1">
            ତାରିଖ: <span className="font-sans font-bold">{day.dateStr}</span> ({day.varaOdia} / {day.varaEn}) | {day.odiaMonthNameOdia} {day.odiaDayOfSolarMonthOdia} ଦିନ
          </p>
          <p className="text-xs text-neutral-600 mt-0.5">
            {toOdiaNumber(day.odiaYearSal)} ସାଲ | {toOdiaNumber(day.sakabda)} ଶକାବ୍ଦ | {toOdiaNumber(day.vikramSamvat)} ବିକ୍ରମ ସମ୍ବତ | ସ୍ଥାନ: {activeLocation.nameOdia} ({activeLocation.nameEn})
          </p>
        </div>

        {/* Ephemeris & Astronomical Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl border border-neutral-300 bg-neutral-50 text-center">
            <span className="text-[10px] text-neutral-500 uppercase block font-bold">ସୂର୍ଯ୍ୟୋଦୟ ଓ ସୂର୍ଯ୍ୟାସ୍ତ</span>
            <strong className="text-sm text-neutral-900 font-sans block mt-0.5">
              {day.timings.sunrise} - {day.timings.sunset}
            </strong>
          </div>
          <div className="p-3 rounded-xl border border-neutral-300 bg-neutral-50 text-center">
            <span className="text-[10px] text-neutral-500 uppercase block font-bold">ଚନ୍ଦ୍ରୋଦୟ ଓ ଚନ୍ଦ୍ରାସ୍ତ</span>
            <strong className="text-sm text-neutral-900 font-sans block mt-0.5">
              {day.timings.moonrise} - {day.timings.moonset}
            </strong>
          </div>
          <div className="p-3 rounded-xl border border-neutral-300 bg-neutral-50 text-center">
            <span className="text-[10px] text-neutral-500 uppercase block font-bold">ସୂର୍ଯ୍ୟ ଓ ଚନ୍ଦ୍ର ରାଶି</span>
            <strong className="text-sm text-neutral-900 block mt-0.5">
              {day.rashi.sunSignOdia} / {day.rashi.moonSignOdia}
            </strong>
          </div>
          <div className="p-3 rounded-xl border border-neutral-300 bg-neutral-50 text-center">
            <span className="text-[10px] text-neutral-500 uppercase block font-bold">ଦୈନିକ ଲଗ୍ନ ଓ ଅୟନାଂଶ</span>
            <strong className="text-sm text-neutral-900 block mt-0.5">
              {day.lagna.nameOdia} ({day.drikAyanamsha || 'Lahiri'})
            </strong>
          </div>
        </div>

        {/* The 5 Core Limbs Table */}
        <div>
          <h3 className="text-sm font-bold text-neutral-900 uppercase border-b-2 border-neutral-900 pb-1 mb-2">
            ପଞ୍ଚାଙ୍ଗ ମୁଖ୍ୟ ପଞ୍ଚ ଅଙ୍ଗ ସାରଣୀ (The Five Limbs of Panchang)
          </h3>
          <table className="w-full border border-neutral-300 text-xs">
            <tbody>
              <tr className="border-b border-neutral-200">
                <td className="w-1/4 p-2 bg-neutral-100 font-bold border-r border-neutral-300">୧. ତିଥି (Tithi)</td>
                <td className="p-2 font-bold text-neutral-900">
                  {day.tithi.pakshaOdia} {day.tithi.nameOdia} 
                  {day.tithi.endTime && <span className="font-normal text-neutral-600 ml-2">(ସମାପ୍ତ: {day.tithi.endTime})</span>}
                </td>
              </tr>
              <tr className="border-b border-neutral-200">
                <td className="w-1/4 p-2 bg-neutral-100 font-bold border-r border-neutral-300">୨. ବାର (Vara)</td>
                <td className="p-2 font-bold text-neutral-900">
                  {day.varaOdia} ({day.varaEn})
                </td>
              </tr>
              <tr className="border-b border-neutral-200">
                <td className="w-1/4 p-2 bg-neutral-100 font-bold border-r border-neutral-300">୩. ନକ୍ଷତ୍ର (Nakshatra)</td>
                <td className="p-2 font-bold text-neutral-900">
                  {day.nakshatra.nameOdia} ({day.nakshatra.pada} ପାଦ)
                  {day.nakshatra.endTime && <span className="font-normal text-neutral-600 ml-2">(ସମାପ୍ତ: {day.nakshatra.endTime})</span>}
                </td>
              </tr>
              <tr className="border-b border-neutral-200">
                <td className="w-1/4 p-2 bg-neutral-100 font-bold border-r border-neutral-300">୪. ଯୋଗ (Yoga)</td>
                <td className="p-2 font-bold text-neutral-900">
                  {day.yoga.nameOdia} 
                  {day.yoga.endTime && <span className="font-normal text-neutral-600 ml-2">(ସମାପ୍ତ: {day.yoga.endTime})</span>}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 p-2 bg-neutral-100 font-bold border-r border-neutral-300">୫. କରଣ (Karana)</td>
                <td className="p-2 font-bold text-neutral-900">
                  {day.karana.nameOdia} 
                  {day.karana.endTime && <span className="font-normal text-neutral-600 ml-2">(ସମାପ୍ତ: {day.karana.endTime})</span>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Auspicious & Inauspicious Timings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl border border-emerald-300 bg-emerald-50/50">
            <h4 className="font-bold text-emerald-900 mb-2 border-b border-emerald-200 pb-1">
              ✨ ଶୁଭ ମୁହୂର୍ତ୍ତ ଓ ଅମୃତ ବେଳା
            </h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>ଅଭିଜିତ୍ ମୁହୂର୍ତ୍ତ:</span>
                <strong className="font-sans text-neutral-900">{day.timings.abhijit.start} - {day.timings.abhijit.end}</strong>
              </div>
              <div className="flex justify-between">
                <span>ବ୍ରହ୍ମ ମୁହୂର୍ତ୍ତ:</span>
                <strong className="font-sans text-neutral-900">{day.timings.brahmaMuhurta.start} - {day.timings.brahmaMuhurta.end}</strong>
              </div>
              <div className="flex justify-between">
                <span>ଅମୃତ ବେଳା:</span>
                <strong className="font-sans text-neutral-900">{day.timings.amrita.start} - {day.timings.amrita.end}</strong>
              </div>
              <div className="flex justify-between">
                <span>ମାହେନ୍ଦ୍ର ବେଳା:</span>
                <strong className="font-sans text-neutral-900">{day.timings.mahendra.start} - {day.timings.mahendra.end}</strong>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-rose-300 bg-rose-50/50">
            <h4 className="font-bold text-rose-900 mb-2 border-b border-rose-200 pb-1">
              ⚠️ ଅଶୁଭ ସମୟ ଓ ବାରବେଳା
            </h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>ରାହୁ କାଳ:</span>
                <strong className="font-sans text-neutral-900">{day.timings.rahuKala.start} - {day.timings.rahuKala.end}</strong>
              </div>
              <div className="flex justify-between">
                <span>ଯମ ଗଣ୍ଡ:</span>
                <strong className="font-sans text-neutral-900">{day.timings.yamaganda.start} - {day.timings.yamaganda.end}</strong>
              </div>
              <div className="flex justify-between">
                <span>ବାର ବେଳା:</span>
                <strong className="font-sans text-neutral-900">{day.timings.baraBela.start} - {day.timings.baraBela.end}</strong>
              </div>
              <div className="flex justify-between">
                <span>କାଳ ବେଳା:</span>
                <strong className="font-sans text-neutral-900">{day.timings.kalaBela.start} - {day.timings.kalaBela.end}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Choghadiya Day & Night Table */}
        <div>
          <h3 className="text-xs font-bold text-neutral-900 uppercase border-b border-neutral-300 pb-1 mb-2">
            ଚୌଘଡ଼ିଆ ସାରଣୀ (Choghadiya Muhurtas)
          </h3>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="border border-neutral-300 rounded p-2">
              <span className="font-bold text-orange-900 block mb-1">ଦିବା ଚୌଘଡ଼ିଆ (Day Slots):</span>
              <div className="grid grid-cols-4 gap-1 text-center">
                {day.choghadiyaDay.map((slot, i) => (
                  <div key={i} className={`p-1 rounded border ${slot.quality === 'good' ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : slot.quality === 'neutral' ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-neutral-50 border-neutral-200 text-neutral-700'}`}>
                    <div>{slot.nameOdia}</div>
                    <div className="text-[8px] font-sans">{slot.start} - {slot.end}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-neutral-300 rounded p-2">
              <span className="font-bold text-neutral-900 block mb-1">ରାତ୍ରି ଚୌଘଡ଼ିଆ (Night Slots):</span>
              <div className="grid grid-cols-4 gap-1 text-center">
                {day.choghadiyaNight.map((slot, i) => (
                  <div key={i} className={`p-1 rounded border ${slot.quality === 'good' ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : slot.quality === 'neutral' ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-neutral-50 border-neutral-200 text-neutral-700'}`}>
                    <div>{slot.nameOdia}</div>
                    <div className="text-[8px] font-sans">{slot.start} - {slot.end}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vedic Sankalpa Card */}
        <div className="p-4 rounded-xl border-2 border-orange-200 bg-orange-50/30 space-y-2">
          <div className="flex items-center justify-between border-b border-orange-200 pb-1.5">
            <h4 className="font-bold text-xs uppercase tracking-wide text-orange-950 flex items-center gap-1.5">
              <Scroll className="w-3.5 h-3.5 text-orange-600" />
              <span>ଦୈନିକ ବୈଦିକ ମହାସଂକଳ୍ପ ({sankalpaType === 'laghu' ? 'ଲଘୁ ସଂକଳ୍ପ' : 'ବିସ୍ତୃତ ସଂକଳ୍ପ'})</span>
            </h4>
            <span className="text-[10px] text-neutral-600 font-medium">
              ଗୋତ୍ର: <strong>{gotra}</strong> | ଯଜମାନ: <strong>{name}</strong>
            </span>
          </div>

          <p className="text-sm font-bold text-neutral-900 leading-relaxed whitespace-pre-line text-center">
            {currentSankalpaText}
          </p>

          <div className="pt-2 border-t border-orange-200/80 text-xs text-neutral-800 leading-relaxed whitespace-pre-line text-justify">
            <strong className="block text-[11px] text-orange-900 uppercase mb-0.5">ସଂକଳ୍ପର ଭାବାର୍ଥ:</strong>
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
      <div className="bg-white text-neutral-900 p-6 sm:p-8 font-odia border border-neutral-300 shadow-sm print:border-none print:shadow-none print:p-0 max-w-5xl mx-auto">
        {/* Masthead Banner */}
        <div className="border-b-2 border-neutral-900 pb-3 mb-4 text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-800">
            ଓଡ଼ିଶା ସରକାରଙ୍କ ବିଜ୍ଞପ୍ତି ଓ ପ୍ରାମାଣିକ ଦୃକ ପଞ୍ଚାଙ୍ଗ ନିର୍ଣ୍ଣୟ ୨୦୨୬
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 mt-1 font-odia">
            ଓଡ଼ିଶା ସରକାରୀ ଛୁଟି ଓ ପ୍ରମୁଖ ପର୍ବପର୍ବାଣୀ ତାଲିକା ୨୦୨୬
          </h1>
          <p className="text-xs text-neutral-600 mt-0.5">
            Odisha Government Holidays & Major Festivals Directory 2026 | ସମୁଦାୟ ତାଲିକାଭୁକ୍ତ ପର୍ବ: {filteredAnnualEvents.length}
          </p>
        </div>

        {/* Clean Gazette Table */}
        <div className="border border-neutral-300 rounded-lg overflow-hidden">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-neutral-900 text-white font-bold border-b border-neutral-900">
                <th className="py-2 px-2 text-center w-12 border-r border-neutral-700">କ୍ରମ</th>
                <th className="py-2 px-2.5 w-24 border-r border-neutral-700">ତାରିଖ</th>
                <th className="py-2 px-2 w-20 border-r border-neutral-700">ବାର</th>
                <th className="py-2 px-3 border-r border-neutral-700">ପର୍ବ / ଛୁଟିର ନାମ</th>
                <th className="py-2 px-2.5 w-28 border-r border-neutral-700">ଶ୍ରେଣୀ</th>
                <th className="py-2 px-3">ମହତ୍ତ୍ୱ ଓ ପୂଜାବିଧି</th>
              </tr>
            </thead>
            <tbody>
              {filteredAnnualEvents.map((ev, index) => {
                const isGovt = ev.isGovtHoliday;
                const isEven = index % 2 === 0;
                return (
                  <tr 
                    key={ev.id + index}
                    className={`border-b border-neutral-200 ${
                      isGovt 
                        ? 'bg-emerald-50/50' 
                        : isEven 
                        ? 'bg-neutral-50/60' 
                        : 'bg-white'
                    }`}
                  >
                    <td className="py-2 px-2 text-center font-bold text-neutral-600 border-r border-neutral-200">
                      {toOdiaNumber(index + 1)}
                    </td>
                    <td className="py-2 px-2.5 font-bold font-sans text-neutral-900 border-r border-neutral-200">
                      {ev.dateStr}
                    </td>
                    <td className="py-2 px-2 text-neutral-700 border-r border-neutral-200">
                      {ev.ritualsOdia?.split(' ')[0] || '—'}
                    </td>
                    <td className="py-2 px-3 border-r border-neutral-200">
                      <div className="font-bold text-neutral-950 text-sm">{ev.titleOdia}</div>
                      <div className="text-[10px] text-neutral-500 font-sans">{ev.titleEn}</div>
                    </td>
                    <td className="py-2 px-2.5 border-r border-neutral-200">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        isGovt
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : ev.type === 'ekadashi'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-orange-100 text-orange-800 border border-orange-300'
                      }`}>
                        {ev.categoryLabel}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-[11px] text-neutral-700 leading-snug">
                      {ev.significanceOdia}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Signature */}
        <div className="mt-4 pt-3 border-t border-neutral-300 flex items-center justify-between text-[11px] text-neutral-500">
          <div>ସୂତ୍ର: ଓଡ଼ିଶା ରାଜପତ୍ର (Gazette Notification) ଏବଂ ପ୍ରାମାଣିକ ଦୃକ ପଞ୍ଚାଙ୍ଗ ଗଣିତ ।</div>
          <div>ମୁଦ୍ରଣ ତାରିଖ: {day.dateStr}</div>
        </div>
      </div>
    );
  };

  /* -------------------------------------------------------------------------- */
  /* ACTIVE DOCUMENT SELECTOR                                                   */
  /* -------------------------------------------------------------------------- */
  const renderCurrentDocument = () => {
    return (
      <div id="printable-document-content" className="w-full bg-white text-neutral-900">
        {printType === 'month' && renderMonthCalendarDocument()}
        {printType === 'day' && renderDailyPanchangDocument()}
        {printType === 'festivals' && renderFestivalsDocument()}
      </div>
    );
  };

  return (
    <>
      {/* 1. ON-SCREEN MODAL PREVIEW & CONFIGURATION DIALOG */}
      <div 
        id="print-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-md animate-fade-in print:hidden"
        onClick={onClose}
      >
        <div 
          id="print-modal-card"
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-5xl max-h-[92vh] rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl flex flex-col overflow-hidden text-neutral-100 transition-all font-sans"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                <Printer className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-odia">
                  {isOdia ? 'ପ୍ରିଣ୍ଟ୍ କିମ୍ବା PDF ରୂପେ ସଂରକ୍ଷଣ କରନ୍ତୁ' : 'Print / Export to PDF'}
                </h3>
                <p className="text-[11px] text-neutral-400 font-odia">
                  {isOdia ? 'ଉଚ୍ଚ ଗୁଣମାନର ସଫଳ ମୁଦ୍ରଣ ପାଇଁ ଲେଆଉଟ୍ ବାଛନ୍ତୁ' : 'Select print format for authentic Odia typography & crisp layout'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Option Selector Tabs */}
          <div className="px-6 py-3 border-b border-neutral-800 bg-neutral-900/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 overflow-x-auto">
              <button
                type="button"
                onClick={() => setPrintType('month')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all font-odia cursor-pointer ${
                  printType === 'month'
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>{isOdia ? 'ମାସିକ କ୍ୟାଲେଣ୍ଡର (Month Grid)' : 'Month Calendar'}</span>
              </button>

              <button
                type="button"
                onClick={() => setPrintType('day')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all font-odia cursor-pointer ${
                  printType === 'day'
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{isOdia ? 'ଦୈନିକ ପଞ୍ଚାଙ୍ଗ ପତ୍ର (Daily Sheet)' : 'Daily Panchang'}</span>
              </button>

              <button
                type="button"
                onClick={() => setPrintType('festivals')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all font-odia cursor-pointer ${
                  printType === 'festivals'
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>{isOdia ? 'ବାର୍ଷିକ ପର୍ବ ଓ ଛୁଟି (Festivals 2026)' : 'Festivals Directory'}</span>
              </button>
            </div>

            {/* Contextual Options Bar */}
            <div className="flex items-center gap-2.5 font-odia text-xs">
              {printType === 'month' && (
                <div className="flex items-center gap-1.5">
                  <span className="text-neutral-400">ମାସ ବାଛନ୍ତୁ:</span>
                  <select
                    value={selectedMonthIndex}
                    onChange={(e) => setSelectedMonthIndex(Number(e.target.value))}
                    className="px-2.5 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
                  >
                    {gregorianMonthNamesOdia.map((mName, idx) => (
                      <option key={idx} value={idx}>
                        {mName} (୨୦୨୬)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {printType === 'day' && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-neutral-800 p-1 rounded-lg border border-neutral-700">
                    <button
                      type="button"
                      onClick={() => setSankalpaType('laghu')}
                      className={`px-2 py-1 rounded text-[11px] font-bold ${sankalpaType === 'laghu' ? 'bg-orange-600 text-white' : 'text-neutral-400'}`}
                    >
                      ଲଘୁ ସଂକଳ୍ପ
                    </button>
                    <button
                      type="button"
                      onClick={() => setSankalpaType('vistrut')}
                      className={`px-2 py-1 rounded text-[11px] font-bold ${sankalpaType === 'vistrut' ? 'bg-orange-600 text-white' : 'text-neutral-400'}`}
                    >
                      ବିସ୍ତୃତ ସଂକଳ୍ପ
                    </button>
                  </div>
                  <input
                    type="text"
                    value={gotra}
                    onChange={(e) => setGotra(e.target.value)}
                    placeholder="ଗୋତ୍ର"
                    className="w-20 px-2 py-1 bg-neutral-800 border border-neutral-700 rounded text-xs text-white"
                    title="Enter Gotra for Sankalpa"
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ନାମ"
                    className="w-24 px-2 py-1 bg-neutral-800 border border-neutral-700 rounded text-xs text-white"
                    title="Enter Name for Sankalpa"
                  />
                </div>
              )}

              {printType === 'festivals' && (
                <div className="flex items-center gap-1.5">
                  <span className="text-neutral-400">ଶ୍ରେଣୀ:</span>
                  <select
                    value={festivalCategory}
                    onChange={(e) => setFestivalCategory(e.target.value as any)}
                    className="px-2.5 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
                  >
                    <option value="all">ସମସ୍ତ ପର୍ବ ଓ ଛୁଟି (All)</option>
                    <option value="govt">କେବଳ ସରକାରୀ ଛୁଟି (Govt Holidays)</option>
                    <option value="major">ମହାପର୍ବ ଓ ବ୍ରତ (Major Festivals)</option>
                    <option value="ekadashi">୨୪ ପବିତ୍ର ଏକାଦଶୀ (Ekadashi)</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Live Document Preview Frame */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-950/60 flex justify-center">
            <div className="w-full max-w-4xl shadow-2xl rounded-2xl overflow-hidden bg-white text-neutral-900 border border-neutral-800">
              {renderCurrentDocument()}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="text-xs text-neutral-400 font-odia flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>
                {isOdia 
                  ? '💡 ପ୍ରିଣ୍ଟ୍ ଡାଇଲଗ୍ ରେ Destination ଭାବେ "Save as PDF" ବାଛି ଡାଉନଲୋଡ୍ ମଧ୍ୟ କରିପାରିବେ ।'
                  : '💡 Tip: Choose "Save as PDF" in the printer destination dropdown to export a vector PDF file.'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold hover:bg-neutral-700 hover:text-white transition-colors cursor-pointer font-odia"
              >
                {isOdia ? 'ବାତିଲ୍' : 'Cancel'}
              </button>

              <button
                type="button"
                onClick={handleOpenInNewWindow}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer font-odia border border-neutral-700"
                title={isOdia ? 'ନୂଆ ଟ୍ୟାବ୍ ରେ ଖୋଲନ୍ତୁ' : 'Open printable page in a clean new tab'}
              >
                <span>{isOdia ? 'ନୂତନ ଟ୍ୟାବ୍' : 'New Tab'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-orange-600/30 active:scale-95 transition-all cursor-pointer font-odia"
              >
                <Printer className="w-4 h-4" />
                <span>{isOdia ? 'ଏବେ ପ୍ରିଣ୍ଟ୍ / PDF କରନ୍ତୁ' : 'Print / Export PDF'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DIRECT PORTAL TO BODY FOR FLAWLESS @media print EXECUTION */}
      {createPortal(
        <div id="print-document-portal" className="hidden print:block">
          {renderCurrentDocument()}
        </div>,
        document.body
      )}
    </>
  );
};
