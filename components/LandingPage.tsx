import React from 'react';
import { MEDITATION_PHASES } from '../zenConstants';

interface LandingPageProps {
  onEnterSanctuary: () => void;
  onEnterTimer: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterSanctuary, onEnterTimer }) => {
  return (
    <div className="h-screen w-full bg-black">
      <header className="fixed top-0 w-full px-6 sm:px-8 py-6 z-50 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="font-calligraphy text-2xl sm:text-3xl tracking-widest text-white/90">静心之道</h1>
          <p className="text-[9px] uppercase tracking-[0.5em] text-white/40 mt-1">The Curated Zen Path</p>
        </div>
      </header>

      <main className="landing-scroll h-screen overflow-y-auto snap-y snap-mandatory">
        {MEDITATION_PHASES.map((phase) => (
          <section key={phase.id} className="landing-chapter min-h-screen snap-start relative flex items-center justify-center overflow-hidden" id={phase.id}>
            <div className="absolute inset-0 z-0">
              <img
                alt={phase.title}
                className="w-full h-full object-cover filter brightness-50 saturate-[0.8]"
                src={phase.imageUrl}
              />
              <div className={`absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80`} />
              <div className="absolute inset-0 vignette-landing" />
            </div>

            <div className="relative z-10 max-w-4xl px-6 sm:px-8 text-center">
              <span className="inline-block px-4 py-1 mb-4 sm:mb-6 rounded-full border border-white/20 text-[10px] tracking-[0.4em] uppercase text-white/60 backdrop-blur-sm">
                {phase.subtitle}
              </span>
              <h2 className="font-serif text-5xl sm:text-6xl md:text-8xl mb-6 sm:mb-8 font-light tracking-tight text-white/95">
                {phase.title}
              </h2>
              <p className="max-w-xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-6 sm:mb-8">
                {phase.description}
              </p>

              {phase.id === 'meditation' && (
                <button
                  type="button"
                  onClick={onEnterSanctuary}
                  className="group relative inline-flex items-center justify-center px-10 sm:px-12 py-3 sm:py-4 overflow-hidden font-serif transition duration-300 ease-out border border-white/30 rounded-full shadow-md hover:border-white/50 hover:shadow-lg"
                >
                  <span className={`absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full ${phase.color} group-hover:translate-x-0 ease`}>
                    <span className="material-symbols-outlined mr-2">play_arrow</span>
                    开启旅程
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                    进入静谧空间
                  </span>
                  <span className="relative invisible">进入静谧空间</span>
                </button>
              )}
            </div>

            {phase.id === 'meditation' && (
              <button
                type="button"
                onClick={onEnterTimer}
                className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center text-white/50 hover:text-white/90 transition-colors cursor-pointer pointer-events-auto animate-bounce-slow"
              >
                <span className="material-symbols-outlined text-4xl mb-1 block">keyboard_double_arrow_down</span>
                <span className="block text-[9px] tracking-[0.4em] uppercase">进入课程倒计时</span>
              </button>
            )}
          </section>
        ))}
      </main>

      <footer className="fixed bottom-0 w-full px-6 sm:px-8 py-4 sm:py-6 z-50 flex justify-between items-end pointer-events-none">
        <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] text-white/30 uppercase font-medium">
          <div className="size-1 bg-white/40 rounded-full" />
          Inner Peace Sanctuary
        </div>
        <div className="font-calligraphy text-base sm:text-lg text-white/20 tracking-widest">寻径 • 归真</div>
      </footer>
    </div>
  );
};

export default LandingPage;
