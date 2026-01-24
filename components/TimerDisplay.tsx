
import React from 'react';

interface TimerDisplayProps {
  timeLeft: number;
  isDarkMode: boolean;
  isOvertime: boolean;
  overtimeSeconds: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft, isDarkMode, isOvertime, overtimeSeconds }) => {
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none">
      <div className={`immersive-timer font-display font-light tracking-tighter select-none tabular-nums ${
        isOvertime 
          ? 'immersive-timer-overtime' 
          : isDarkMode 
            ? 'immersive-timer-dark' 
            : 'immersive-timer-light'
      }`}>
        {isOvertime ? formatTime(overtimeSeconds) : formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default TimerDisplay;
