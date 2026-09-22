import React, { useState, useEffect, useMemo } from 'react';
import { 
  PanchangDay, 
  LocationInfo, 
  LanguageMode, 
  ThemeMode 
} from './types';
import { LOCATIONS } from './data/odiaConstants';
import { calculatePanchang, getMonthPanchang } from './utils/panchangEngine';

// Components
import { Header, SaaSViewMode } from './components/Header';
import { WeatherWidget } from './components/WeatherWidget';
import { MonthCalendarGrid } from './components/MonthCalendarGrid';
import { DailyPanchangPanel } from './components/DailyPanchangPanel';
import { FestivalListCard } from './components/FestivalListCard';
import { ChoghadiyaView } from './components/ChoghadiyaView';
import { MuhurtaView } from './components/MuhurtaView';
import { RashifalView } from './components/RashifalView';
import { FestivalsView } from './components/FestivalsView';

// Modals
import { DayPanchangModal } from './components/DayPanchangModal';
import { RashifalModal } from './components/RashifalModal';
import { MuhurtaModal } from './components/MuhurtaModal';
import { AnnualCalendarModal } from './components/AnnualCalendarModal';
import { SearchModal } from './components/SearchModal';
import { RemindersModal, SavedItem } from './components/RemindersModal';
import { ShareModal } from './components/ShareModal';
import { PrintExportModal } from './components/PrintExportModal';

export default function App() {
  // Current SaaS View Mode
  const [currentView, setCurrentView] = useState<SaaSViewMode>('calendar');

  // 1. Language & Theme (Odia first by default)
  const [language, setLanguage] = useState<LanguageMode>(() => {
    return (localStorage.getItem('odia_cal_lang') as LanguageMode) || 'or';
  });

  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('odia_cal_theme') as ThemeMode;
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Apply dark class and data-theme to <html> and <body>
  useEffect(() => {
    localStorage.setItem('odia_cal_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
      document.body.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('odia_cal_lang', language);
  }, [language]);

  // 2. Location
  const [selectedLocation, setSelectedLocation] = useState<LocationInfo>(() => {
    const savedId = localStorage.getItem('odia_cal_location');
    return LOCATIONS.find(l => l.id === savedId) || LOCATIONS[0]; // Bhubaneswar default
  });

  const handleSelectLocation = (loc: LocationInfo) => {
    setSelectedLocation(loc);
    localStorage.setItem('odia_cal_location', loc.id);
  };

  // 3. Calendar Dates
  const today = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [currentViewingDate, setCurrentViewingDate] = useState<Date>(today);

  // Month days computation
  const monthDays = useMemo(() => {
    return getMonthPanchang(
      currentViewingDate.getFullYear(),
      currentViewingDate.getMonth(),
      selectedLocation
    );
  }, [currentViewingDate, selectedLocation]);

  // Selected day's Panchang calculation
  const selectedDayPanchang = useMemo(() => {
    return calculatePanchang(selectedDate, selectedLocation);
  }, [selectedDate, selectedLocation]);

  // 4. Saved items (Bookmarks & Reminders)
  const [savedItems, setSavedItems] = useState<SavedItem[]>(() => {
    try {
      const data = localStorage.getItem('odia_cal_saved');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('odia_cal_saved', JSON.stringify(savedItems));
    } catch (e) {
      console.error('Failed to save items', e);
    }
  }, [savedItems]);

  const isCurrentBookmarked = useMemo(() => {
    const dateStr = selectedDayPanchang.dateStr;
    return savedItems.some(item => item.dateStr === dateStr && item.type === 'bookmark');
  }, [savedItems, selectedDayPanchang.dateStr]);

  const handleToggleBookmark = (day: PanchangDay) => {
    if (isCurrentBookmarked) {
      setSavedItems(prev => prev.filter(i => !(i.dateStr === day.dateStr && i.type === 'bookmark')));
    } else {
      const newItem: SavedItem = {
        id: `bm_${day.dateStr}_${Date.now()}`,
        dateStr: day.dateStr,
        titleOdia: `${day.odiaMonthNameOdia} ${day.odiaDayOfSolarMonthOdia} - ${day.tithi.nameOdia}`,
        titleEn: `${day.odiaMonthNameEn} - ${day.tithi.nameEn}`,
        type: 'bookmark',
        createdAt: Date.now(),
      };
      setSavedItems(prev => [newItem, ...prev]);
    }
  };

  const handleAddReminder = (itemData: Omit<SavedItem, 'id' | 'createdAt'>) => {
    const newItem: SavedItem = {
      ...itemData,
      id: `rem_${Date.now()}`,
      createdAt: Date.now(),
    };
    setSavedItems(prev => [newItem, ...prev]);
  };

  const handleRemoveSavedItem = (id: string) => {
    setSavedItems(prev => prev.filter(i => i.id !== id));
  };

  // Navigation handlers
  const handleNavigateMonth = (delta: number) => {
    setCurrentViewingDate(prev => {
      const nextDate = new Date(prev.getFullYear(), prev.getMonth() + delta, 1);
      return nextDate;
    });
  };

  const handleSetMonth = (year: number, monthIndex: number) => {
    setCurrentViewingDate(new Date(year, monthIndex, 1));
  };

  const handleGoToToday = () => {
    const now = new Date();
    setSelectedDate(now);
    setCurrentViewingDate(now);
    setCurrentView('calendar');
  };

  const handleSelectCalendarDay = (day: PanchangDay) => {
    setSelectedDate(day.date);
    setIsDayPanchangModalOpen(true);
  };

  const handleSelectDateStr = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const target = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      setSelectedDate(target);
      setCurrentViewingDate(target);
      setCurrentView('calendar');
      setIsDayPanchangModalOpen(true);
    }
  };

  // Keyboard shortcut for Search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 5. Modals State
  const [isDayPanchangModalOpen, setIsDayPanchangModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRashifalOpen, setIsRashifalOpen] = useState(false);
  const [isMuhurtaOpen, setIsMuhurtaOpen] = useState(false);
  const [isAnnualOpen, setIsAnnualOpen] = useState(false);
  const [isRemindersOpen, setIsRemindersOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white transition-colors">
      {/* SaaS Navigation Header */}
      <Header
        currentView={currentView}
        onSetView={setCurrentView}
        language={language}
        onSetLanguage={setLanguage}
        theme={theme}
        onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        onGoToToday={handleGoToToday}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAnnual={() => setIsAnnualOpen(true)}
        onOpenReminders={() => setIsRemindersOpen(true)}
        onOpenPrint={() => setIsPrintOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
        savedCount={savedItems.length}
      />

      {/* Main SaaS Workspace */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-3 sm:p-5 lg:p-6">
        
        {/* VIEW 1: CALENDAR VIEW */}
        {currentView === 'calendar' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
            
            {/* Left / Main Column: Weather + Monthly Calendar Grid + Festivals (8 cols on lg) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-5">
              {/* Weather & Location Status */}
              <WeatherWidget
                location={selectedLocation}
                onSelectLocation={handleSelectLocation}
                language={language}
                sunrise={selectedDayPanchang.timings.sunrise}
                sunset={selectedDayPanchang.timings.sunset}
              />

              {/* Monthly Calendar Grid with Odia numerals, tithis & badges */}
              <MonthCalendarGrid
                currentDate={currentViewingDate}
                selectedDate={selectedDate}
                onSelectDate={handleSelectCalendarDay}
                onNavigateMonth={handleNavigateMonth}
                onSetMonth={handleSetMonth}
                monthDays={monthDays}
                language={language}
              />

              {/* Monthly Festivals & Observances highlights */}
              <FestivalListCard
                monthDays={monthDays}
                onSelectDate={handleSelectCalendarDay}
                language={language}
              />
            </div>

            {/* Right Column: Contextual Daily Panchang Panel (4 cols on lg) */}
            <div className="lg:col-span-5 xl:col-span-4 sticky top-20 space-y-5">
              <DailyPanchangPanel
                day={selectedDayPanchang}
                language={language}
                onBookmark={handleToggleBookmark}
                isBookmarked={isCurrentBookmarked}
                onAddReminder={() => setIsRemindersOpen(true)}
                onShare={() => setIsShareOpen(true)}
                onViewChoghadiya={() => setCurrentView('choghadiya')}
                onOpenModal={() => setIsDayPanchangModalOpen(true)}
              />
            </div>

          </div>
        )}

        {/* VIEW 2: CHOGHADIYA VIEW */}
        {currentView === 'choghadiya' && (
          <div className="space-y-6">
            <ChoghadiyaView
              day={selectedDayPanchang}
              language={language}
            />
          </div>
        )}

        {/* VIEW 3: MUHURTA VIEW */}
        {currentView === 'muhurta' && (
          <div className="space-y-6">
            <MuhurtaView
              onSelectDateStr={handleSelectDateStr}
              language={language}
            />
          </div>
        )}

        {/* VIEW 4: RASHIFAL VIEW */}
        {currentView === 'rashifal' && (
          <div className="space-y-6">
            <RashifalView
              language={language}
            />
          </div>
        )}

        {/* VIEW 5: FESTIVALS VIEW */}
        {currentView === 'festivals' && (
          <div className="space-y-6">
            <FestivalsView
              onSelectDateStr={handleSelectDateStr}
              language={language}
            />
          </div>
        )}

      </main>

      {/* Modern SaaS Footer */}
      <footer className="w-full border-t border-neutral-200/80 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 py-4 px-6 text-center text-xs text-neutral-500 font-odia">
        <span>କୋହେନୂର ଓ ବିରଜା ଶୈଳୀ ଦୃକ ଓଡ଼ିଆ ପାଞ୍ଜି • ଶ୍ରୀଜଗନ୍ନାଥ ମହାପ୍ରଭୁଙ୍କ ଶ୍ରୀଚରଣରେ ସମର୍ପିତ 🙏</span>
      </footer>

      {/* Interactive Modals */}
      {isRashifalOpen && (
        <RashifalModal
          isOpen={isRashifalOpen}
          onClose={() => setIsRashifalOpen(false)}
          language={language}
        />
      )}

      {isMuhurtaOpen && (
        <MuhurtaModal
          isOpen={isMuhurtaOpen}
          onClose={() => setIsMuhurtaOpen(false)}
          onSelectDateStr={handleSelectDateStr}
          language={language}
        />
      )}

      {isAnnualOpen && (
        <AnnualCalendarModal
          isOpen={isAnnualOpen}
          onClose={() => setIsAnnualOpen(false)}
          onSelectMonth={(mIdx) => handleSetMonth(currentViewingDate.getFullYear(), mIdx)}
          language={language}
          year={currentViewingDate.getFullYear()}
        />
      )}

      {isSearchOpen && (
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectDateStr={handleSelectDateStr}
          language={language}
        />
      )}

      {isRemindersOpen && (
        <RemindersModal
          isOpen={isRemindersOpen}
          onClose={() => setIsRemindersOpen(false)}
          savedItems={savedItems}
          onRemoveItem={handleRemoveSavedItem}
          onAddReminder={handleAddReminder}
          onSelectDateStr={handleSelectDateStr}
          language={language}
          currentSelectedDateStr={selectedDayPanchang.dateStr}
        />
      )}

      {isShareOpen && (
        <ShareModal
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          day={selectedDayPanchang}
          language={language}
        />
      )}

      {isPrintOpen && (
        <PrintExportModal
          isOpen={isPrintOpen}
          onClose={() => setIsPrintOpen(false)}
          day={selectedDayPanchang}
          monthDays={monthDays}
          language={language}
        />
      )}

      {/* Detailed Day Panchang & Vedic Sankalpa Modal */}
      {isDayPanchangModalOpen && (
        <DayPanchangModal
          isOpen={isDayPanchangModalOpen}
          onClose={() => setIsDayPanchangModalOpen(false)}
          day={selectedDayPanchang}
          language={language}
          onBookmark={handleToggleBookmark}
          onShare={() => setIsShareOpen(true)}
          isBookmarked={isCurrentBookmarked}
        />
      )}
    </div>
  );
}
