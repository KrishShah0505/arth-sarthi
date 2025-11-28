import React from 'react';
import { Target, Gift } from 'lucide-react';
import { moodProfiles } from '../data/financialData';

const DailyChallenge = ({ challenge, onComplete, completed, mood = 'motivational' }) => {
  const moodColor = moodProfiles[mood]?.color || 'from-purple-500 to-pink-500';

  return (
    <div className={`bg-gradient-to-r ${moodColor} text-white p-4 rounded-xl shadow-lg mx-2 md:mx-0 border border-black`}>
      <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
        {/* Left section: Icon + Text */}
        <div className="flex items-center gap-3 flex-1 mt-5 ml-2">
          <div className="bg-black/30 p-2 rounded-lg backdrop-blur-sm shrink-0">
            <Target className="w-7 h-7 md:w-7 md:h-7" />
          </div>
          <div>
            <p className="font-bold text-lg md:text-lg">Daily Challenge</p>
            <p className="text-sm md:text-sm opacity-90">{challenge}</p>
          </div>
        </div>

        {/* Right section: Complete button + Reward */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={onComplete}
            disabled={completed}
            className={`px-5 py-3 rounded-lg font-bold text-md transition-all ${
              completed
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-white text-purple-600 hover:scale-105 shadow-md'
            }`}
          >
            {completed ? '✓ Done' : 'Complete'}
          </button>

          {!completed && (
            <div className="flex items-center gap-1 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm text-xs md:text-sm mt-1">
              <Gift className="w-3 h-3 md:w-4 md:h-4" />
              <span>Reward: +50 XP</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyChallenge;
