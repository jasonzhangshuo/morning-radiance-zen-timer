
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TimerMode, MODES, BACKGROUNDS, Background, ZEN_QUOTES } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';
import ModeSwitcher from './components/ModeSwitcher';

const App: React.FC = () => {
  const initialSeconds = MODES[TimerMode.MAIN].seconds;
  const [mode, setMode] = useState<TimerMode>(TimerMode.MAIN);
  const [duration, setDuration] = useState<number>(initialSeconds);
  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [customDuration, setCustomDuration] = useState<number>(initialSeconds);
  const [customMinutes, setCustomMinutes] = useState<string>(Math.floor(initialSeconds / 60).toString());
  const [customSeconds, setCustomSeconds] = useState<string>((initialSeconds % 60).toString().padStart(2, '0'));
  const [customPanelOpen, setCustomPanelOpen] = useState<boolean>(false);
  const [bgIndex, setBgIndex] = useState<number>(3); // Default to "Mountain Retreat"
  const [showUI, setShowUI] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [zenQuote, setZenQuote] = useState<string>(() => ZEN_QUOTES[Math.floor(Math.random() * ZEN_QUOTES.length)]);
  const [isOvertime, setIsOvertime] = useState<boolean>(false);
  const [overtimeSeconds, setOvertimeSeconds] = useState<number>(0);
  const [isLandscape, setIsLandscape] = useState<boolean>(false);
  const uiTimeoutRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentBg = BACKGROUNDS[bgIndex];

  // Detect landscape mode for minimal UI
  useEffect(() => {
    const checkOrientation = () => {
      const isLandscapeMode = window.innerWidth > window.innerHeight && window.innerHeight < 600;
      setIsLandscape(isLandscapeMode);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Initialize audio on mount
  useEffect(() => {
    // Using a free temple bell sound from freesound.org
    audioRef.current = new Audio('https://cdn.freesound.org/previews/411/411089_5121236-lq.mp3');
    audioRef.current.volume = 0.7;
  }, []);

  // Change zen quote when background changes
  useEffect(() => {
    setZenQuote(ZEN_QUOTES[Math.floor(Math.random() * ZEN_QUOTES.length)]);
  }, [bgIndex]);

  // Update document class for theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  // Handle timer countdown
  useEffect(() => {
    let interval: number | null = null;
    
    if (isActive && !isOvertime && timeLeft > 0) {
      // Normal countdown
      interval = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Will reach zero, trigger overtime
            setIsOvertime(true);
            setOvertimeSeconds(0);
            // Play bell sound 3 times with 1.5 second interval
            if (audioRef.current) {
              let bellCount = 0;
              const bellInterval = setInterval(() => {
                if (bellCount < 3 && audioRef.current) {
                  audioRef.current.currentTime = 0;
                  audioRef.current.play().catch(err => {
                    console.log('Audio play failed:', err);
                  });
                  bellCount++;
                } else {
                  clearInterval(bellInterval);
                }
              }, 1500);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (isActive && isOvertime) {
      // Count up in overtime mode
      interval = window.setInterval(() => {
        setOvertimeSeconds((prev) => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isOvertime]);

  // Handle mode change
  const handleModeChange = useCallback((newMode: TimerMode) => {
    const nextSeconds = MODES[newMode].seconds;
    setMode(newMode);
    setDuration(nextSeconds);
    setTimeLeft(nextSeconds);
    setIsActive(false);
    setIsOvertime(false);
    setOvertimeSeconds(0);
  }, []);

  // Controls handlers
  const toggleTimer = () => setIsActive((prev) => !prev);
  const resetTimer = () => {
    setTimeLeft(duration);
    setIsActive(false);
    setIsOvertime(false);
    setOvertimeSeconds(0);
  };
  const addOneMinute = () => {
    setTimeLeft((prev) => prev + 60);
    setDuration((prev) => prev + 60);
  };
  const changeBackground = () => setBgIndex((prev) => (prev + 1) % BACKGROUNDS.length);
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  // UI Visibility logic
  const handleMouseMove = () => {
    setShowUI(true);
    if (uiTimeoutRef.current) clearTimeout(uiTimeoutRef.current);
    uiTimeoutRef.current = window.setTimeout(() => {
      if (isActive) setShowUI(false);
    }, 4000);
  };



  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isActive]);

  return (
    <div 
      className={`relative h-screen w-full flex items-center justify-center transition-colors duration-1000 overflow-hidden ${isActive && !showUI ? 'cursor-none' : 'cursor-default'}`}
      onMouseMove={handleMouseMove}
    >
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] scale-110 ${
            isOvertime 
              ? 'brightness-[0.6] contrast-[1.1] saturate-[1.2]'
              : isDarkMode 
                ? 'brightness-[0.35]' 
                : 'brightness-[1.05] contrast-[0.95] grayscale-[0.2]'
          }`}
          style={{ backgroundImage: `url('${currentBg.url}')`, transform: isActive ? 'scale(1.05)' : 'scale(1.1)' }}
        />
        <div className={`absolute inset-0 ${
          isOvertime 
            ? 'overtime-mist-overlay mix-blend-soft-light' 
            : isDarkMode 
              ? 'night-mist-overlay mix-blend-multiply' 
              : 'light-mist-overlay mix-blend-screen'
        }`}></div>
        <div className={`absolute inset-0 ${
          isOvertime
            ? 'bg-gradient-to-t from-amber-900/40 via-orange-800/20 to-yellow-700/30'
            : isDarkMode 
              ? 'bg-gradient-to-t from-night-deep/90 via-transparent to-night-indigo/40' 
              : 'bg-gradient-to-t from-zen-bg/90 via-transparent to-white/40'
        }`}></div>
        <div className={`absolute inset-0 ${
          isOvertime ? 'vignette-overtime' : isDarkMode ? 'vignette-night' : 'vignette-light'
        }`}></div>
        
        {/* Ambient Glows */}
        <div className={`absolute top-10 right-20 w-96 h-96 blur-[120px] rounded-full pointer-events-none ${
          isOvertime 
            ? 'bg-amber-400/30' 
            : isDarkMode 
              ? 'bg-blue-500/5' 
              : 'bg-amber-200/10'
        }`}></div>
        <div className={`absolute bottom-1/4 left-1/4 w-[40rem] h-[40rem] blur-[150px] rounded-full pointer-events-none ${
          isOvertime 
            ? 'bg-orange-400/25' 
            : isDarkMode 
              ? 'bg-indigo-500/5' 
              : 'bg-amber-200/5'
        }`}></div>
      </div>

      {/* Top Header - Hidden in landscape */}
      {!isLandscape && (
        <Header 
          visible={showUI}
          isDarkMode={isDarkMode}
          onBgChange={changeBackground} 
          onFullscreen={toggleFullscreen} 
        />
      )}

      {/* Mode Switcher - Hidden in landscape */}
      {!isLandscape && (
        <ModeSwitcher 
          visible={showUI}
          isDarkMode={isDarkMode}
          currentMode={mode} 
          onModeChange={handleModeChange}
        />
      )}

      {/* Central Content */}
      <main className="relative z-10 flex flex-col items-center justify-center">
        <TimerDisplay 
          timeLeft={timeLeft} 
          isDarkMode={isDarkMode}
          isOvertime={isOvertime}
          overtimeSeconds={overtimeSeconds}
        />

        {!isLandscape && (
          <>
            {isOvertime ? (
              <div className={`transition-all duration-700 ease-in-out transform ${showUI ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'} -mt-4 sm:-mt-8 md:-mt-12 flex flex-col items-center gap-2`}>
                <h2 className="font-calligraphy text-2xl sm:text-3xl md:text-4xl font-light text-[#d4af37] tracking-[0.5em] text-center drop-shadow-sm">
                  随喜学长分享
                </h2>
                <div className="flex items-center gap-2 text-[#d4af37]/60">
                  <span className="material-symbols-outlined text-xs sm:text-sm">schedule</span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] font-medium font-display">超时进行中</span>
                </div>
              </div>
            ) : (
              <div className={`transition-all duration-700 ease-in-out transform ${showUI ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                <h2 className={`font-calligraphy text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.5em] text-center drop-shadow-lg mt-4 sm:mt-6 md:mt-8 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {zenQuote}
                </h2>
              </div>
            )}
          </>
        )}

        {/* Landscape Mode Hint - Rotate to portrait */}
        {isLandscape && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 animate-pulse">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md ${
              isDarkMode ? 'bg-white/10 text-white/70' : 'bg-black/10 text-black/70'
            }`}>
              <span className="material-symbols-outlined text-lg">screen_rotation</span>
              <span className="text-xs font-display tracking-wider">竖屏查看完整界面</span>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Controls - Hidden in landscape */}
      {!isLandscape && (
        <Controls 
          visible={showUI}
          isDarkMode={isDarkMode}
          isActive={isActive} 
          onToggle={toggleTimer} 
          onReset={resetTimer}
          onAddMinute={addOneMinute}
          onThemeToggle={toggleTheme}
        />
      )}

      {/* Footer Branding - Hidden in landscape */}
      {!isLandscape && (
        <Footer 
          visible={showUI}
          isDarkMode={isDarkMode}
          location={currentBg.location} 
        />
      )}

      {/* Decorative Ink Element */}
      <div className={`absolute -bottom-40 -left-40 w-[800px] h-[800px] opacity-[0.03] pointer-events-none rotate-12 ${isDarkMode ? 'invert' : ''}`} style={{ backgroundImage: `url('https://picsum.photos/id/10/800/800')`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', mixBlendMode: 'overlay' }}></div>
    </div>
  );
};

export default App;
