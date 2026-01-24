
import React from 'react';

interface FooterProps {
  visible: boolean;
  isDarkMode: boolean;
  location: string;
}

const Footer: React.FC<FooterProps> = ({ visible, isDarkMode, location }) => {
  return (
    <footer className={`absolute bottom-0 w-full px-8 sm:px-16 py-8 sm:py-10 flex justify-end items-end z-30 pointer-events-none transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className={`font-calligraphy text-xl sm:text-2xl tracking-widest ${
        isDarkMode ? 'text-slate-400' : 'text-slate-400'
      }`}>
        {location}
      </div>
    </footer>
  );
};

export default Footer;
