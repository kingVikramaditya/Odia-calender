import React from 'react';
import { 
  Calendar, 
  Search, 
  Moon, 
  Sun, 
  Printer, 
  Bookmark, 
  Compass, 
  BookOpen, 
  Sparkles,
  CalendarDays,
  Share2,
  Clock,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { LanguageMode, ThemeMode } from '../types';

export type SaaSViewMode = 'calendar' | 'choghadiya' | 'muhurta' | 'rashifal' | 'festivals';

interface HeaderProps {
  currentView: SaaSViewMode;
  onSetView: (view: SaaSViewMode) => void;
  language: LanguageMode;
  onSetLanguage: (lang: LanguageMode) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onGoToToday: () => void;
  onOpenSearch: () => void;
  onOpenAnnual: () => void;
  onOpenReminders: () => void;
  onOpenPrint: () => void;
  onOpenShare: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSetView,
  language,
  onSetLanguage,
  theme,
  onToggleTheme,
  onGoToToday,
  onOpenSearch,
  onOpenAnnual,
  onOpenReminders,
  onOpenPrint,
  onOpenShare,
  savedCount,
}) => {
  const isOdia = language === 'or';

  const navTabs: { id: SaaSViewMode; labelOdia: string; labelEn: string; icon: React.ReactNode }[] = [
    { id: 'calendar', labelOdia: 'କ୍ୟାଲେଣ୍ଡର', labelEn: 'Calendar', icon: <Calendar className="w-4 h-4" /> },
    { id: 'choghadiya', labelOdia: 'ଚୌଘଡ଼ିଆ', labelEn: 'Choghadiya', icon: <Clock className="w-4 h-4" /> },
    { id: 'muhurta', labelOdia: 'ଶୁଭ ମୁହୂର୍ତ୍ତ', labelEn: 'Muhurtas', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'rashifal', labelOdia: 'ରାଶିଫଳ', labelEn: 'Rashifal', icon: <Compass className="w-4 h-4" /> },
    { id: 'festivals', labelOdia: 'ପର୍ବପର୍ବାଣୀ', labelEn: 'Festivals', icon: <Flame className="w-4 h-4" /> },
  ];

  return (
    <header 
      id="modern-saas-header"
      className="sticky top-0 z-40 w-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border-b border-neutral-200/80 dark:border-neutral-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Left: Brand Identity + Drik Badge */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => onSetView('calendar')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white font-odia tracking-tight">
                    {isOdia ? 'ଓଡ଼ିଆ ପାଞ୍ଜିକା' : 'Odia Panjika'}
                  </h1>
                </div>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium font-odia">
                  {isOdia ? 'ପ୍ରାମାଣିକ କ୍ୟାଲେଣ୍ଡର ଓ ଦୈନିକ ପଞ୍ଚାଙ୍ଗ ୨୦୨୬' : 'Authentic Calendar & Daily Panchang 2026'}
                </p>
              </div>
            </div>

            {/* Today Pill */}
            <button
              id="header-today-btn"
              onClick={onGoToToday}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/80 text-xs font-bold text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/60 transition-all font-odia shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>{isOdia ? 'ଆଜି' : 'Today'}</span>
            </button>
          </div>

          {/* Center: SaaS View Switcher Tabs */}
          <nav className="hidden md:flex items-center p-1 bg-neutral-100 dark:bg-neutral-800/80 rounded-2xl border border-neutral-200/60 dark:border-neutral-700/60">
            {navTabs.map((tab) => {
              const isActive = currentView === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => onSetView(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all font-odia ${
                    isActive
                      ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs font-bold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <span className={isActive ? 'text-orange-500' : 'text-neutral-400'}>
                    {tab.icon}
                  </span>
                  <span>{isOdia ? tab.labelOdia : tab.labelEn}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Toolbar: Search, Modals, Language, Theme */}
          <div className="flex items-center gap-2">
            {/* Quick Search Button */}
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-xs font-medium transition-colors"
              title="Search festivals, Ekadashi, or Tithi"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden xl:inline font-odia">{isOdia ? 'ଖୋଜନ୍ତୁ' : 'Search'}</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono text-neutral-400 bg-white dark:bg-neutral-700 rounded border border-neutral-200 dark:border-neutral-600">
                ⌘K
              </kbd>
            </button>

            {/* 12-Month Overview */}
            <button
              id="header-annual-btn"
              onClick={onOpenAnnual}
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title={isOdia ? '୧୨ ମାସ କ୍ୟାଲେଣ୍ଡର' : '12-Month Calendar Overview'}
            >
              <CalendarDays className="w-4 h-4 text-blue-500" />
            </button>

            {/* Saved Items */}
            <button
              id="header-reminders-btn"
              onClick={onOpenReminders}
              className="relative p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title={isOdia ? 'ସଂରକ୍ଷିତ ତାରିଖ' : 'Saved Dates & Reminders'}
            >
              <Bookmark className="w-4 h-4 text-rose-500" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Share & Print */}
            <button
              id="header-share-btn"
              onClick={onOpenShare}
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors hidden sm:inline-flex"
              title={isOdia ? 'ପଞ୍ଚାଙ୍ଗ ସେୟାର୍ କରନ୍ତୁ' : 'Share Panchang'}
            >
              <Share2 className="w-4 h-4 text-amber-500" />
            </button>

            <button
              id="header-print-btn"
              onClick={onOpenPrint}
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors hidden sm:inline-flex"
              title={isOdia ? 'ପ୍ରିଣ୍ଟ୍ କରନ୍ତୁ' : 'Print Calendar'}
            >
              <Printer className="w-4 h-4 text-neutral-500" />
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-xl border border-neutral-200/80 dark:border-neutral-700 text-xs">
              <button
                onClick={() => onSetLanguage('or')}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                  language === 'or'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-2xs font-bold'
                    : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                ଓଡ଼ିଆ
              </button>
              <button
                onClick={() => onSetLanguage('en')}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                  language === 'en'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-2xs font-bold'
                    : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                Eng
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              id="header-theme-btn"
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} theme`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
            </button>
          </div>

        </div>

        {/* Mobile View Switcher Row */}
        <div className="flex md:hidden items-center gap-1 overflow-x-auto py-2 border-t border-neutral-100 dark:border-neutral-800">
          {navTabs.map((tab) => {
            const isActive = currentView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSetView(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all font-odia ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-xs font-bold'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
                }`}
              >
                {tab.icon}
                <span>{isOdia ? tab.labelOdia : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
