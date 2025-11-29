import React from 'react';
import { Mic } from 'lucide-react';
import { moodProfiles } from '../data/financialData';

const VoiceCircle = ({ isListening, onToggleListen, level, mood }) => {
  const moodData = moodProfiles[mood] || moodProfiles.neutral;
  
  return (
    <div className="flex flex-col items-center justify-center my-6 md:my-8 min-h-[250px] md:min-h-[300px]">
      <div className="relative">
        
        {/* === SIRI RADIATING GLOW EFFECT === */}
        {isListening && (
          <>
            {/* 1. Outer Radiation Ring (Big Ping) */}
            <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-40 blur-2xl animate-ping duration-[2000ms]"></div>
            
            {/* 2. Inner Radiating Ring (Faster Ping) */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-60 blur-lg"></div>
            
            {/* 3. Constant Glow Boundary */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-100 blur-md "></div>
          </>
        )}

        {/* Idle State Glow (Subtle Mood Color) */}
        {!isListening && (
           <div className={`absolute -inset-4 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 opacity-20 blur-xl animate-pulse`}></div>
        )}
        
        {/* === MAIN BUTTON === */}
        <button
          onClick={onToggleListen}
          className={`relative w-28 h-28 md:w-40 md:h-40 rounded-full flex items-center justify-center transition-all duration-500 z-10 bg-white shadow-2xl ${
            isListening ? 'scale-105' : 'hover:scale-110'
          }`}
        >
           {/* Gradient Circle Inside Button */}
           <div className={`absolute inset-1 rounded-full bg-gradient-to-br ${moodData.gradient} flex items-center justify-center overflow-hidden`}>
              
              {/* Icon */}
              <div className="relative z-20">
                <Mic className={`w-10 h-10 md:w-16 md:h-16 text-white transition-transform duration-300 ${isListening ? 'scale-125' : ''}`} />
              </div>

              {/* Inner Ripple when listening */}
              {isListening && (
                <div className="absolute inset-0 bg-white/20 animate-ping rounded-full"></div>
              )}
           </div>

          {/* Level badge */}
          {/* <div className="absolute -top-1 -right-1 md:-top-3 md:-right-3 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center font-bold text-sm md:text-xl shadow-lg border-2 md:border-4 border-white transform hover:rotate-12 transition-transform z-30">
            {level}
          </div> */}
          
          {/* Mood indicator */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-lg md:text-2xl px-2 md:px-3 py-0.5 md:py-1 rounded-full shadow-lg border-2 border-gray-200 whitespace-nowrap z-30">
            {moodData.emoji}
          </div>
        </button>
      </div>
      
      <p className={`mt-8 md:mt-12 font-bold text-sm md:text-lg transition-all duration-300 text-center px-4 ${isListening ? 'scale-105 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600' : 'text-gray-600'}`}>
        {isListening ? (
          <span className="flex items-center justify-center gap-2 animate-pulse">
            <span className="inline-block w-2 h-2"></span>
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