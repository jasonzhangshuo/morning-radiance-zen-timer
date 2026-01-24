
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
    <div className={`absolute top-28 sm:top-12 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
      <div className={`flex p-1 rounded-full gap-1 shadow-2xl scale-75 sm:scale-90 md:scale-100 ${
        isDarkMode ? 'frosted-glass-dark' : 'frosted-glass-light'
      }`}>
        {Object.entries(TimerMode).map(([key, value]) => {
          const isActive = currentMode === value;
          const config = MODES[value];
          return (
            <button
              key={key}
              onClick={() => onModeChange(value)}
              className={`px-6 sm:px-8 md:px-10 py-2 sm:py-2.5 rounded-full font-serif text-[10px] sm:text-xs md:text-sm tracking-[0.2em] transition-all duration-500 whitespace-nowrap ${
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
