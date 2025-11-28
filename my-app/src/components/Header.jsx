import React from 'react';
import { DollarSign, Star, Trophy } from 'lucide-react';
import { moodProfiles } from '../data/financialData';

const Header = ({ level, xp, maxXp, points, mood }) => {
  const xpPercentage = (xp / maxXp) * 100;
  const moodData = moodProfiles[mood] || moodProfiles.motivational;
  
  return (
    <header className={`bg-gradient-to-r ${moodData.color} text-white p-4 shadow-lg sticky top-0 z-50`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 md:mb-2 gap-3">
          {/* Logo & Mood Section */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <DollarSign className="w-6 h-6 md:w-8 md:h-8" />
              <div className="absolute -top-1 -right-1 text-lg md:text-xl">{moodData.emoji}</div>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold leading-tight">FinCoach AI</h1>
              <p className="text-xs opacity-90">{moodData.tone} mode</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
            <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm flex-1 md:flex-none justify-center">
              <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-300" />
              <span className="font-bold text-xs md:text-sm">{points} pts</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm flex-1 md:flex-none justify-center">
              <Trophy className="w-4 h-4 md:w-5 md:h-5 text-yellow-300" />
              <span className="font-bold text-xs md:text-sm">Lvl {level}</span>
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="relative w-full bg-white/30 rounded-full h-2 md:h-3 overflow-hidden backdrop-blur-sm">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 transition-all duration-500 rounded-full"
            style={{ width: `${xpPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
          </div>
        </div>
        <p className="text-[10px] md:text-xs mt-1 text-white/90 font-medium text-right">{xp} / {maxXp} XP to next level</p>
      </div>
    </header>
  );
};

export default Header;