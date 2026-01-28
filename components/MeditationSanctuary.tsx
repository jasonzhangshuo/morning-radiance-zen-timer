import React, { useEffect, useRef, useState } from 'react';
import { SANCTUARY_CONTENT, ZEN_AUDIO_URL, ZEN_AUDIO_FALLBACK_URL } from '../zenConstants';

interface MeditationSanctuaryProps {
  onEnterTimer: () => void;
  onBackToHome: () => void;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

const MeditationSanctuary: React.FC<MeditationSanctuaryProps> = ({ onEnterTimer, onBackToHome }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentPhase = SANCTUARY_CONTENT[0];
  const progress = durationSeconds > 0 ? Math.min(100, (elapsedSeconds / durationSeconds) * 100) : 0;

  useEffect(() => {
    const audio = new Audio(ZEN_AUDIO_URL);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    const fadeIn = () => {
      let vol = 0;
      const fadeInterval = setInterval(() => {
        if (!audioRef.current) {
          clearInterval(fadeInterval);
          return;
        }
        if (vol < 0.5) {
          vol += 0.05;
          audioRef.current!.volume = vol;
        } else {
          clearInterval(fadeInterval);
        }
      }, 100);
    };

    const tryPlay = async () => {
      try {
        await audioRef.current?.play();
        setIsPlaying(true);
        fadeIn();
      } catch (err) {
        console.error('Autoplay failed:', err);
      }
    };

    const onError = () => {
      if (!audioRef.current) return;
      audioRef.current.src = ZEN_AUDIO_FALLBACK_URL;
      audioRef.current.load();
      tryPlay();
    };

    const syncTime = () => {
      if (!audioRef.current) return;
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setElapsedSeconds(current);
      if (Number.isFinite(duration) && duration > 0) setDurationSeconds(duration);
    };

    audio.addEventListener('error', onError);
    audio.addEventListener('timeupdate', syncTime);
    audio.addEventListener('loadedmetadata', syncTime);
    tryPlay();

    const interval = setInterval(syncTime, 500);

    return () => {
      clearInterval(interval);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('timeupdate', syncTime);
      audio.removeEventListener('loadedmetadata', syncTime);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const circumference = 2 * Math.PI * 110;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 bg-black text-slate-200 font-sans overflow-hidden">
      {/* 背景图 */}
      <div className="fixed inset-0 z-0 scale-110">
        <img
          alt="Peaceful Forest"
          className="w-full h-full object-cover filter brightness-[0.45] saturate-[0.7] blur-[2px]"
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="absolute inset-0 vignette" />
      </div>

      {/* 环境粒子层 */}
      <div className="absolute inset-0 z-[5] pointer-events-none opacity-40">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle bg-zen-turquoise/40"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-20px',
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              ['--duration' as string]: `${Math.random() * 15 + 15}s`,
            }}
          />
        ))}
      </div>

      {/* 动态呼吸光晕 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
        <div className={`absolute w-[450px] h-[450px] rounded-full bg-zen-turquoise/10 blur-[80px] transition-opacity duration-1000 ${isPlaying ? 'animate-breathe' : 'opacity-0'}`} />
        <div className={`absolute w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[50px] transition-opacity duration-1000 ${isPlaying ? 'animate-breathe' : 'opacity-0'}`} style={{ animationDelay: '-4s' }} />
      </div>

      {/* 控制头部 */}
      <header className="fixed top-8 left-8 z-50">
        <h1 className="font-calligraphy text-xl tracking-[0.4em] text-white/70">正念静坐</h1>
        <p className="text-[8px] uppercase tracking-[0.6em] text-white/30 mt-1">
          Mindful Breathing Session
        </p>
      </header>

      {/* 进入倒计时箭头 */}
      <button
        type="button"
        onClick={onEnterTimer}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center text-white/50 hover:text-white/90 transition-colors animate-bounce-slow"
      >
        <span className="material-symbols-outlined text-4xl mb-1">keyboard_double_arrow_down</span>
        <span className="text-[9px] tracking-[0.4em] uppercase">进入课程倒计时</span>
      </button>

      {/* 关闭按钮：返回首页 */}
      <div className="fixed top-8 right-8 z-50">
        <button
          onClick={onBackToHome}
          className="group p-2 flex items-center gap-3 border border-white/10 rounded-full backdrop-blur-xl hover:bg-white/5 transition-all pointer-events-auto"
        >
          <span className="material-symbols-outlined text-xl font-light text-white/60 group-hover:text-white">
            close
          </span>
        </button>
      </div>

      <main className="relative z-10 h-full w-full flex flex-col items-center justify-center">
        {/* 文案 */}
        <div className="mb-16 text-center px-6">
          <span className="text-[9px] tracking-[1.2em] uppercase text-zen-turquoise/60 font-medium mb-6 block">
            Meditation Guide
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-light tracking-[0.3em] text-white/90 mb-4 drop-shadow-xl">
            {currentPhase.title}
          </h2>
          <p className="max-w-xl mx-auto text-base md:text-lg font-light text-white/70 italic leading-relaxed">
            {currentPhase.quote}
          </p>
        </div>

        {/* 呼吸球 + 进度环 */}
        <div
          className="relative group cursor-pointer pointer-events-auto transition-transform active:scale-95"
          onClick={togglePlayback}
        >
          <svg className="w-72 h-72 -rotate-90 drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]">
            <circle
              className="text-white/10"
              cx="144"
              cy="144"
              fill="transparent"
              r="110"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle
              className="transition-all duration-300 ease-linear"
              cx="144"
              cy="144"
              fill="transparent"
              r="110"
              stroke="url(#zenGradientPlayer)"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              strokeWidth="3"
            />
            <defs>
              <linearGradient id="zenGradientPlayer" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#2dd4bf" />
                <stop offset="100%" stopColor="#1e1b4b" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* 呼吸波纹（播放时扩散） */}
            <div className={`absolute inset-0 flex items-center justify-center ${isPlaying ? 'opacity-100' : 'opacity-30'}`}>
              <div className={`size-48 rounded-full border border-zen-turquoise/20 transition-all duration-1000 ${isPlaying ? 'animate-ripple' : ''}`} />
              <div className={`absolute size-48 rounded-full border border-zen-turquoise/10 transition-all duration-1000 ${isPlaying ? 'animate-ripple' : ''}`} style={{ animationDelay: '2s' }} />
            </div>
            <div className="size-20 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-zen-turquoise/40 transition-all duration-500 z-10">
              <span className="material-symbols-outlined text-4xl text-white/60 group-hover:text-white transition-colors">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </div>
            <div className="mt-6 text-center z-10">
              <span className="text-[10px] tracking-[0.4em] text-white/30 uppercase block mb-1">
                播放进度
              </span>
              <span className="text-white/50 font-serif tracking-widest tabular-nums text-sm">
                {formatTime(elapsedSeconds)} / {durationSeconds > 0 ? formatTime(durationSeconds) : currentPhase.duration}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* 底部装饰 */}
      <footer className="fixed bottom-12 w-full px-8 sm:px-16 z-50 flex justify-between items-end pointer-events-none">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-zen-turquoise/40" />
            <span className="text-[8px] tracking-[0.5em] text-white/40 uppercase">Natural Resonance</span>
          </div>
          <span className="text-[10px] text-white/20 font-light">432Hz Healing Frequency</span>
        </div>
        <div className="font-calligraphy text-2xl sm:text-3xl text-white/5 tracking-[0.5em]">心无挂碍</div>
      </footer>

      {/* 纹理遮罩 */}
      <div className="pointer-events-none fixed inset-0 z-[60] opacity-[0.06] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default MeditationSanctuary;

