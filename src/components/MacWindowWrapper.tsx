import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, 
  Minus, 
  Maximize2, 
  Minimize2, 
  WifiOff,
  ShieldCheck
} from 'lucide-react';
import { LanguageMode, ThemeMode } from '../types';

declare global {
  interface Window {
    electronAPI?: {
      isElectron: boolean;
      minimize: () => Promise<void>;
      maximize: () => Promise<void>;
      close: () => Promise<void>;
      isMaximized: () => Promise<boolean>;
      onMaximizedChange?: (callback: (isMax: boolean) => void) => void;
    };
  }
}

interface MacWindowWrapperProps {
  children: React.ReactNode;
  language: LanguageMode;
  theme: ThemeMode;
  currentLiveTime?: Date;
  selectedDateStr?: string;
  onResetToToday?: () => void;
}

export const MacWindowWrapper: React.FC<MacWindowWrapperProps> = ({
  children,
  language,
  theme,
  currentLiveTime = new Date(),
}) => {
  const isOdia = language === 'or';

  const [isTrafficHovered, setIsTrafficHovered] = useState<boolean>(false);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [isElectron, setIsElectron] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.electronAPI?.isElectron) {
      setIsElectron(true);
      window.electronAPI.isMaximized().then(setIsMaximized).catch(() => {});
      if (window.electronAPI.onMaximizedChange) {
        window.electronAPI.onMaximizedChange((max) => {
          setIsMaximized(max);
        });
      }
    }
  }, []);

  // Monitor browser fullscreen if not in electron
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!isElectron) {
        setIsMaximized(!!document.fullscreenElement);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isElectron]);

  // Red Button: Normal Close Application
  const handleClose = useCallback(() => {
    if (window.electronAPI?.close) {
      window.electronAPI.close();
    } else {
      window.close();
    }
  }, []);

  // Yellow Button: Normal Minimize to Windows Taskbar
  const handleMinimize = useCallback(() => {
    if (window.electronAPI?.minimize) {
      window.electronAPI.minimize();
    } else if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  // Green Button: Normal Maximize / Restore Window
  const handleMaximize = useCallback(() => {
    if (window.electronAPI?.maximize) {
      window.electronAPI.maximize();
    } else {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }
  }, []);

  // Double click titlebar to toggle maximize
  const handleTitlebarDoubleClick = useCallback(() => {
    handleMaximize();
  }, [handleMaximize]);

  const timeFormatted = currentLiveTime.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  return (
    <div className="w-full min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      
      {/* 
        macOS STYLE NATIVE DRAGGABLE TITLEBAR
        - Entire titlebar has `-webkit-app-region: drag` for native window movement on Windows.
        - Interactive buttons have `-webkit-app-region: no-drag` so clicks work immediately.
      */}
      <div 
        onDoubleClick={handleTitlebarDoubleClick}
        style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
        className={`w-full h-9 sm:h-10 px-3 sm:px-4 flex items-center justify-between select-none shrink-0 border-b transition-colors cursor-default sticky top-0 z-50 ${
          theme === 'dark'
            ? 'bg-[#181615]/95 border-neutral-800 text-neutral-300'
            : 'bg-[#F9F7F4]/95 border-neutral-200 text-neutral-700'
        } backdrop-blur-xl`}
      >
        {/* Left: macOS Traffic Light Buttons */}
        <div 
          style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
          className="flex items-center gap-2 group/traffic shrink-0 py-1"
          onMouseEnter={() => setIsTrafficHovered(true)}
          onMouseLeave={() => setIsTrafficHovered(false)}
        >
          {/* Red (Close App) */}
          <button
            type="button"
            id="mac-btn-close"
            onClick={handleClose}
            className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:brightness-90 active:brightness-75 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
            title={isOdia ? "ଆପ୍ ବନ୍ଦ କରନ୍ତୁ (Close)" : "Close Application"}
            aria-label="Close Window"
          >
            <X className={`w-2 h-2 text-[#4A0002] stroke-[2.5] transition-opacity duration-150 ${isTrafficHovered ? 'opacity-90' : 'opacity-0'}`} />
          </button>

          {/* Yellow (Minimize to Taskbar) */}
          <button
            type="button"
            id="mac-btn-minimize"
            onClick={handleMinimize}
            className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:brightness-90 active:brightness-75 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
            title={isOdia ? "ଟାସ୍କବାର୍‌କୁ ମିନିମାଇଜ୍ (Minimize)" : "Minimize to Taskbar"}
            aria-label="Minimize Window"
          >
            <Minus className={`w-2 h-2 text-[#5B3F00] stroke-[2.5] transition-opacity duration-150 ${isTrafficHovered ? 'opacity-90' : 'opacity-0'}`} />
          </button>

          {/* Green (Maximize / Restore) */}
          <button
            type="button"
            id="mac-btn-maximize"
            onClick={handleMaximize}
            className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29] hover:brightness-90 active:brightness-75 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
            title={
              isMaximized
                ? (isOdia ? "ପୂର୍ବ ଆକାର (Restore)" : "Restore Window")
                : (isOdia ? "ମ୍ୟାକ୍ସିମାଇଜ୍ (Maximize)" : "Maximize Window")
            }
            aria-label="Maximize Window"
          >
            {isMaximized ? (
              <Minimize2 className={`w-1.5 h-1.5 text-[#0A4D14] stroke-[2.5] transition-opacity duration-150 ${isTrafficHovered ? 'opacity-90' : 'opacity-0'}`} />
            ) : (
              <Maximize2 className={`w-1.5 h-1.5 text-[#0A4D14] stroke-[2.5] transition-opacity duration-150 ${isTrafficHovered ? 'opacity-90' : 'opacity-0'}`} />
            )}
          </button>
        </div>

        {/* Center: Draggable Window Title */}
        <div className="flex items-center gap-2 truncate max-w-[60%] pointer-events-none select-none text-center justify-center">
          <span className="text-xs">🕉️</span>
          <span className={`text-xs font-bold truncate text-neutral-700 dark:text-neutral-200 tracking-tight ${isOdia ? 'font-odia' : 'font-sans'}`}>
            {isOdia ? 'ଓଡ଼ିଆ କ୍ୟାଲେଣ୍ଡର ଓ ଦୈନିକ ପଞ୍ଚାଙ୍ଗ' : 'Odia Calendar & Daily Panchang'}
          </span>
          <span className="hidden md:inline-block text-[11px] font-medium text-neutral-400 dark:text-neutral-500">
            — ୨୦୨୬ Drik Panji
          </span>
        </div>

        {/* Right: Window Controls & Time Badge (No-drag so clicks/tooltips work) */}
        <div 
          style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
          className="flex items-center gap-1.5 shrink-0"
        >
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-neutral-200/50 dark:bg-neutral-800/50 text-[10px] font-medium text-neutral-500 dark:text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-mono">{timeFormatted}</span>
          </div>

          <button
            type="button"
            onClick={handleMaximize}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer"
            title={isMaximized ? (isOdia ? 'ପୂର୍ବ ଆକାର' : 'Restore') : (isOdia ? 'ମ୍ୟାକ୍ସିମାଇଜ୍' : 'Maximize')}
          >
            {isMaximized ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* MAIN APPLICATION WORKSPACE - Seamless full width & height */}
      <div className="flex-1 w-full flex flex-col bg-neutral-50 dark:bg-neutral-950 transition-colors">
        {children}
      </div>

    </div>
  );
};
