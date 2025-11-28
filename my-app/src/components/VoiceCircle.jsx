import React from 'react';
import { Mic } from 'lucide-react';
import { moodProfiles } from '../data/financialData';

const VoiceCircle = ({ isListening, onToggleListen, level, mood }) => {
  const moodData = moodProfiles[mood] || moodProfiles.motivational;

  return (
    <div className="flex flex-col items-center justify-center my-6 md:my-8 min-h-[250px] md:min-h-[300px]">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing rings */}
        {isListening && (
          <>
            <div className="absolute flex items-center justify-center">
              <div className={`w-40 md:w-56 aspect-square rounded-full bg-gradient-to-r ${moodData.color} opacity-30 animate-ping`}></div>
            </div>
            <div className="absolute flex items-center justify-center">
              <div className={`w-44 md:w-60 aspect-square rounded-full border-4 border-white/30 shadow-[0_0_20px_#fff] animate-pulse`}></div>
            </div>
          </>
        )}

        {/* Main mic button */}
        <button
          onClick={onToggleListen}
          className={`relative w-28 h-28 md:w-40 md:h-40 rounded-full flex items-center justify-center transition-all duration-500 z-10
            ${isListening 
              ? `bg-gradient-to-br ${moodData.color} shadow-2xl scale-105` 
              : `bg-gradient-to-br ${moodData.color} hover:scale-110 shadow-xl`
            }`}
        >
          <Mic className={`w-10 h-10 md:w-16 md:h-16 text-white transition-transform duration-300 ${isListening ? 'scale-110' : ''}`} />

          {/* Level badge */}
          <div className="absolute -top-1 -right-1 md:-top-3 md:-right-3 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center font-bold text-sm md:text-xl shadow-lg border-2 md:border-4 border-white transform hover:rotate-12 transition-transform">
            {level}
          </div>

          {/* Mood indicator */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-lg md:text-2xl px-2 md:px-3 py-0.5 md:py-1 rounded-full shadow-lg border-2 border-gray-200 whitespace-nowrap">
            {moodData.emoji}
          </div>
        </button>
      </div>

      {/* Status text */}
      <p className={`mt-8 md:mt-12 text-gray-700 font-semibold text-sm md:text-lg transition-all duration-300 text-center px-4 ${isListening ? 'scale-105' : ''}`}>
        {isListening ? (
          <span className="flex items-center justify-center gap-2 animate-pulse">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            Listening...
          </span>
        ) : (
          'Tap to speak'
        )}
      </p>
    </div>
  );
};

export default VoiceCircle;
