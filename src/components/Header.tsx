import React from 'react';
import { 
  Calendar, 
  Search, 
  Moon, 
  Sun, 
  FileDown, 
  Bookmark, 
  Compass, 
  BookOpen, 
  Sparkles,
  CalendarDays,
  Share2,
  Clock,
  Flame,
  CheckCircle2,
  WifiOff,
  ShieldCheck
} from 'lucide-react';
import { LanguageMode, ThemeMode } from '../types';
import creatorPhoto from '../assets/creator.jpg';
import appIcon from '../assets/app-icon.png';

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
  onOpenDownloadPdf: () => void;
  onOpenPrint?: () => void;
  onOpenShare: () => void;
  onOpenProfile?: () => void;
  onOpenOfflineInfo?: () => void;
  isOnline?: boolean;
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
  onOpenDownloadPdf,
  onOpenPrint,
  onOpenShare,
  onOpenProfile,
  onOpenOfflineInfo,
  isOnline = true,
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
            <div className="flex items-center gap-2.5">
              {/* App Brand Logo Icon */}
              <button
                type="button"
                id="header-app-logo-btn"
                onClick={() => onSetView('calendar')}
                className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-2 ring-orange-500/40 hover:ring-orange-500 dark:ring-orange-400/50 dark:hover:ring-orange-400 shadow-sm shrink-0 hover:scale-105 transition-all bg-neutral-900 focus:outline-none cursor-pointer group"
                title={isOdia ? 'ଓଡ଼ିଆ କ୍ୟାଲେଣ୍ଡର ଓ ପାଞ୍ଜି' : 'Odia Calendar & Panchang'}
                aria-label={isOdia ? 'କ୍ୟାଲେଣ୍ଡର ଦେଖନ୍ତୁ' : 'View Calendar'}
              >
                <img 
                  src={appIcon} 
                  alt="Odia Calendar App Icon" 
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                />
              </button>

              {/* Title links to Calendar view */}
              <div 
                onClick={() => onSetView('calendar')}
                className="cursor-pointer group/title"
              >
                <div className="flex items-center gap-2">
                  <h1 className={`text-base sm:text-lg font-black text-neutral-900 dark:text-white ${isOdia ? 'font-odia' : 'font-sans'} tracking-tight group-hover/title:text-orange-600 dark:group-hover/title:text-orange-400 transition-colors`}>
                    {isOdia ? 'ଓଡ଼ିଆ ପାଞ୍ଜିକା' : 'Odia Panjika'}
                  </h1>
                </div>
                <p className={`text-[10px] text-neutral-500 dark:text-neutral-400 font-medium ${isOdia ? 'font-odia' : 'font-sans'}`}>
                  {isOdia ? 'ପ୍ରାମାଣିକ କ୍ୟାଲେଣ୍ଡର ଓ ଦୈନିକ ପଞ୍ଚାଙ୍ଗ ୨୦୨୬' : 'Authentic Calendar & Daily Panchang 2026'}
                </p>
              </div>
            </div>

            {/* Today Pill */}
            <button
              id="header-today-btn"
              onClick={onGoToToday}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/80 text-xs font-bold text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/60 transition-all ${isOdia ? 'font-odia' : 'font-sans'} shadow-2xs`}
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>{isOdia ? 'ଆଜି' : 'Today'}</span>
            </button>

            {/* Offline Pill if offline */}
            {!isOnline && (
              <button
                type="button"
                id="header-offline-btn"
                onClick={onOpenOfflineInfo}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-100/90 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800/80 text-amber-800 dark:text-amber-300 text-xs font-bold hover:bg-amber-200 dark:hover:bg-amber-900/80 transition-all ${isOdia ? 'font-odia' : 'font-sans'} shadow-2xs cursor-pointer animate-pulse`}
                title={isOdia ? "ଅଫଲାଇନ୍ ମୋଡ୍: ପଞ୍ଜିକା, ତିଥି ଓ ପର୍ବପର୍ବାଣୀ ସମ୍ପୂର୍ଣ୍ଣ କାର୍ଯ୍ୟକ୍ଷମ" : "Offline Mode: Calendar & Panchang fully functional offline"}
              >
                <WifiOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{isOdia ? 'ଅଫଲାଇନ୍' : 'Offline'}</span>
              </button>
            )}
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
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${isOdia ? 'font-odia' : 'font-sans'} ${
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
              title={isOdia ? "ପର୍ବ, ଏକାଦଶୀ କିମ୍ବା ତିଥି ଖୋଜନ୍ତୁ" : "Search festivals, Ekadashi, or Tithi"}
            >
              <Search className="w-3.5 h-3.5" />
              <span className={`hidden xl:inline ${isOdia ? 'font-odia' : 'font-sans'}`}>{isOdia ? 'ଖୋଜନ୍ତୁ' : 'Search'}</span>
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

            {/* Share & Download as PDF */}
            <button
              id="header-share-btn"
              onClick={onOpenShare}
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors hidden sm:inline-flex"
              title={isOdia ? 'ପଞ୍ଚାଙ୍ଗ ସେୟାର୍ କରନ୍ତୁ' : 'Share Panchang'}
            >
              <Share2 className="w-4 h-4 text-amber-500" />
            </button>

            <button
              id="header-download-pdf-btn"
              onClick={onOpenDownloadPdf || onOpenPrint}
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-orange-600 dark:hover:text-orange-400 transition-colors hidden sm:inline-flex items-center justify-center cursor-pointer"
              title={isOdia ? 'PDF ଡାଉନଲୋଡ୍ କରନ୍ତୁ' : 'Download as PDF'}
            >
              <FileDown className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </button>

            {/* Offline Readiness Info Button */}
            {onOpenOfflineInfo && (
              <button
                type="button"
                id="header-offline-info-btn"
                onClick={onOpenOfflineInfo}
                className={`p-2 rounded-xl transition-colors hidden sm:inline-flex items-center cursor-pointer ${
                  !isOnline
                    ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60'
                    : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
                title={isOdia ? 'ଅଫଲାଇନ୍ କାର୍ଯ୍ୟକ୍ଷମତା: ଇଣ୍ଟରନେଟ୍ ବିନା ମଧ୍ୟ ସମ୍ପୂର୍ଣ୍ଣ ଚାଲିବ' : 'Offline Capabilities: Works 100% without internet'}
              >
                {!isOnline ? <WifiOff className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4 text-emerald-500" />}
              </button>
            )}

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
              className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} theme`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
            </button>

            {/* Creator Profile Avatar in Toolbar */}
            <button
              id="header-profile-toolbar-btn"
              onClick={onOpenProfile}
              className="p-1 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all flex items-center gap-1.5 focus:outline-none cursor-pointer group"
              title={isOdia ? 'ପ୍ରୋଫାଇଲ୍ ବିବରଣୀ: ଶ୍ରୀ ନନ୍ଦନ କୁମାର ମହାପାତ୍ର' : 'Creator Profile: Sri Nandan Kumar Mohapatra'}
              aria-label="Profile"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-orange-500/40 group-hover:ring-orange-500 group-hover:scale-105 transition-all shadow-xs">
                <img 
                  src={creatorPhoto} 
                  alt="Sri Nandan Kumar Mohapatra" 
                  className="w-full h-full object-cover"
                />
              </div>
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${isOdia ? 'font-odia' : 'font-sans'} ${
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
