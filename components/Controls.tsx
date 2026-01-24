
import React from 'react';

interface ControlsProps {
  visible: boolean;
  isDarkMode: boolean;
  isActive: boolean;
  onToggle: () => void;
  onReset: () => void;
  onAddMinute: () => void;
  onThemeToggle: () => void;
}

const Controls: React.FC<ControlsProps> = ({ visible, isDarkMode, isActive, onToggle, onReset, onAddMinute, onThemeToggle }) => {
  return (
    <div className={`absolute inset-x-0 bottom-16 sm:bottom-0 h-1/4 z-40 flex items-center justify-center pointer-events-none transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 pointer-events-auto">
        {/* Top small action - Add 1 minute */}
        <button 
          onClick={onAddMinute}
          className={`gold-glow flex items-center justify-center size-10 sm:size-12 md:size-14 lg:size-16 rounded-full transition-all duration-500 shadow-xl active:scale-95 group ${
            isDarkMode 
              ? 'bg-primary/90 hover:bg-primary border border-white/20' 
              : 'bg-primary/90 hover:bg-primary border border-white/40'
          }`}
        >
          <span className={`material-symbols-outlined font-bold group-hover:scale-110 transition-transform text-lg sm:text-xl md:text-2xl ${
            isDarkMode ? 'text-slate-900' : 'text-white'
          }`}>add</span>
        </button>

        {/* Main Controls Row */}
        <div className="flex items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20">
          <button 
            onClick={onReset}
            className="hover:scale-110 transition-transform duration-500 group"
          >
            <span className={`material-symbols-outlined text-2xl sm:text-3xl md:text-4xl ${
              isDarkMode ? 'text-slate-500 group-hover:text-white' : 'text-slate-400 group-hover:text-slate-900'
            }`}>refresh</span>
          </button>
          
          <button 
            onClick={onToggle}
            className={`size-20 sm:size-24 md:size-28 lg:size-32 rounded-full border flex items-center justify-center transition-all duration-500 shadow-2xl backdrop-blur-md active:scale-95 group ${
              isDarkMode 
                ? 'border-white/10 bg-white/5 hover:bg-white/15 hover:border-white/20' 
                : 'border-slate-200 bg-white/40 hover:bg-white/80 hover:border-slate-300'
            }`}
          >
            <span 
              className={`material-symbols-outlined text-4xl sm:text-5xl md:text-6xl lg:text-7xl group-hover:scale-110 transition-transform ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isActive ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <button 
            onClick={onThemeToggle}
            className="hover:scale-110 transition-transform duration-500 group"
          >
            <span 
              className={`material-symbols-outlined text-2xl sm:text-3xl md:text-4xl glow-glyph ${
                isDarkMode 
                  ? 'text-primary/80 group-hover:text-primary' 
                  : 'text-primary/80 group-hover:text-primary'
              }`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
