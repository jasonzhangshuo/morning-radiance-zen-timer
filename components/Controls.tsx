
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
    <div className={`absolute inset-x-0 bottom-8 sm:bottom-8 md:bottom-0 h-auto sm:h-1/4 z-40 flex items-end sm:items-center justify-center pointer-events-none transition-all duration-700 pb-2 sm:pb-4 md:pb-0 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 pointer-events-auto">
        {/* Top small action - Add 1 minute */}
        <button 
          onClick={onAddMinute}
          className={`gold-glow flex items-center justify-center size-10 sm:size-12 md:size-12 lg:size-14 xl:size-16 rounded-full transition-all duration-500 shadow-xl active:scale-95 group ${
            isDarkMode 
              ? 'bg-primary/90 hover:bg-primary border border-white/20' 
              : 'bg-primary/90 hover:bg-primary border border-white/40'
          }`}
        >
          <span className={`material-symbols-outlined font-bold group-hover:scale-110 transition-transform text-lg sm:text-xl md:text-xl lg:text-2xl ${
            isDarkMode ? 'text-slate-900' : 'text-white'
          }`}>add</span>
        </button>

        {/* Main Controls Row */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16">
          <button 
            onClick={onReset}
            className="hover:scale-110 transition-transform duration-500 group"
          >
            <span className={`material-symbols-outlined text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl ${
              isDarkMode ? 'text-slate-500 group-hover:text-white' : 'text-slate-400 group-hover:text-slate-900'
            }`}>refresh</span>
          </button>
          
          <button 
            onClick={onToggle}
            className={`size-16 sm:size-20 md:size-22 lg:size-24 xl:size-28 rounded-full border flex items-center justify-center transition-all duration-500 shadow-2xl backdrop-blur-md active:scale-95 group ${
              isDarkMode 
                ? 'border-white/10 bg-white/5 hover:bg-white/15 hover:border-white/20' 
                : 'border-slate-200 bg-white/40 hover:bg-white/80 hover:border-slate-300'
            }`}
          >
            <span 
              className={`material-symbols-outlined text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl group-hover:scale-110 transition-transform ${
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
              className={`material-symbols-outlined text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl glow-glyph ${
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
