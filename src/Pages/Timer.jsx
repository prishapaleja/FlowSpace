import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Menu } from 'lucide-react';

export default function PomodoroTimer() {
  const [mode, setMode] = useState('focus'); // 'focus' or 'break'
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const FOCUS_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Auto switch modes when timer ends
      if (mode === 'focus') {
        setMode('break');
        setTimeLeft(BREAK_TIME);
      } else {
        setMode('focus');
        setTimeLeft(FOCUS_TIME);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, mode]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'focus' ? FOCUS_TIME : BREAK_TIME);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === 'focus' ? FOCUS_TIME : BREAK_TIME);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'focus' 
    ? ((FOCUS_TIME - timeLeft) / FOCUS_TIME) * 100
    : ((BREAK_TIME - timeLeft) / BREAK_TIME) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
       

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center">
          {/* Mode Toggle */}
          <div className="flex gap-2 mb-12">
            <button
              onClick={() => switchMode('focus')}
              className={`px-8 py-2 rounded-full font-medium transition-all ${
                mode === 'focus'
                  ? 'bg-cyan-400 text-white'
                  : 'bg-cyan-100 text-cyan-600'
              }`}
            >
              Focus
            </button>
            <button
              onClick={() => switchMode('break')}
              className={`px-8 py-2 rounded-full font-medium transition-all ${
                mode === 'break'
                  ? 'bg-cyan-400 text-white'
                  : 'bg-cyan-100 text-cyan-600'
              }`}
            >
              Break
            </button>
          </div>

          {/* Circular Timer */}
          <div className="relative w-64 h-64 mb-8">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="112"
                stroke="#E0F7FF"
                strokeWidth="24"
                fill="none"
              />
              {/* Progress Circle */}
              <circle
                cx="128"
                cy="128"
                r="112"
                stroke="#22D3EE"
                strokeWidth="24"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 112}`}
                strokeDashoffset={`${2 * Math.PI * 112 * (1 - progress / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>

            {/* Timer Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-indigo-900">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                {mode === 'focus' ? 'Focus Time' : 'Break Time'}
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-4">
            <button
              onClick={toggleTimer}
              className="w-14 h-14 bg-cyan-400 hover:bg-cyan-500 rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
            >
              {isRunning ? (
                <div className="w-4 h-4 bg-white rounded-sm" />
              ) : (
                <Play size={24} fill="white" className="ml-1" />
              )}
            </button>
            <button
              onClick={resetTimer}
              className="w-14 h-14 bg-cyan-400 hover:bg-cyan-500 rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
            >
              <RotateCcw size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}