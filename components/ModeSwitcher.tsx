
import React from 'react';
import { TimerMode, MODES } from '../types';

interface ModeSwitcherProps {
  visible: boolean;
  isDarkMode: boolean;
  currentMode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
}

const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ visible, isDarkMode, currentMode, onModeChange }) => {
  return (
    <div className={`absolute top-20 sm:top-12 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 px-4 sm:px-0 max-w-full ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
      <div className={`flex flex-wrap justify-center p-1 rounded-full gap-0.5 sm:gap-1 shadow-2xl scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100 ${
        isDarkMode ? 'frosted-glass-dark' : 'frosted-glass-light'
      }`}>
        {Object.entries(TimerMode).map(([key, value]) => {
          const isActive = currentMode === value;
          const config = MODES[value];
          return (
            <button
              key={key}
              onClick={() => onModeChange(value)}
              className={`px-3 sm:px-6 md:px-8 lg:px-10 py-1.5 sm:py-2 md:py-2.5 rounded-full font-serif text-[9px] sm:text-[10px] md:text-xs lg:text-sm tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-500 whitespace-nowrap ${
                isActive 
                  ? isDarkMode 
                    ? 'bg-white/15 text-white shadow-xl' 
                    : 'bg-white/80 text-slate-900 shadow-xl font-medium'
                  : isDarkMode 
                    ? 'text-slate-400 hover:text-white' 
                    : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              {config.label} ({Math.floor(config.seconds / 60)}:00)
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ModeSwitcher;
