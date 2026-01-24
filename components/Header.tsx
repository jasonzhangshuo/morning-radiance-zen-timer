
import React from 'react';

interface HeaderProps {
  visible: boolean;
  isDarkMode: boolean;
  onBgChange: () => void;
  onFullscreen: () => void;
}

const Header: React.FC<HeaderProps> = ({ visible, isDarkMode, onBgChange, onFullscreen }) => {
  return (
    <header className={`absolute top-0 w-full flex items-center justify-between px-3 sm:px-6 md:px-12 lg:px-16 py-3 sm:py-4 md:py-6 lg:py-8 z-30 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
      <div className="flex flex-col gap-1">
        <h1 className={`font-serif text-base sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-[0.2em] sm:tracking-[0.3em] ${
          isDarkMode ? 'text-white/90' : 'text-slate-800/90'
        }`}>课程交流</h1>
      </div>
      
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
        <button 
          onClick={onBgChange}
          className={`group flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full border transition-all duration-500 gold-glow ${
            isDarkMode 
              ? 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 hover:border-primary/40' 
              : 'bg-primary/5 border-primary/20 text-primary hover:bg-primary/10'
          }`}
        >
          <span className="material-symbols-outlined text-sm sm:text-base md:text-lg lg:text-xl transition-transform group-hover:rotate-45">landscape</span>
          <span className="hidden sm:inline text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-medium font-display">切换背景</span>
        </button>
        <button 
          onClick={onFullscreen}
          className={`flex items-center justify-center size-7 sm:size-8 md:size-9 lg:size-10 rounded-full border transition-all duration-500 gold-glow ${
            isDarkMode 
              ? 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 hover:border-primary/40' 
              : 'bg-primary/5 border-primary/20 text-primary hover:bg-primary/10'
          }`}
        >
          <span className="material-symbols-outlined text-sm sm:text-base md:text-lg lg:text-xl">fullscreen</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
