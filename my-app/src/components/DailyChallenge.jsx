import React from 'react';
import { Target, Gift } from 'lucide-react';

const DailyChallenge = ({ challenge, onComplete, completed }) => (
  <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white p-4 rounded-xl shadow-lg mx-2 md:mx-0">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3 flex-1">
        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm shrink-0">
          <Target className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div>
          <p className="font-bold text-sm md:text-base">Daily Challenge</p>
          <p className="text-xs md:text-sm opacity-90">{challenge}</p>
        </div>
      </div>
      <button
        onClick={onComplete}
        disabled={completed}
        className={`w-full sm:w-auto px-4 py-2 rounded-lg font-bold text-sm transition-all ${
          completed 
            ? 'bg-green-400 cursor-not-allowed' 
            : 'bg-white text-purple-600 hover:scale-105 shadow-md'
        }`}
      >
        {completed ? '✓ Done' : 'Complete'}
      </button>
    </div>
    {!completed && (
      <div className="mt-2 text-xs md:text-sm flex items-center gap-1 bg-white/20 inline-block px-3 py-1 rounded-full backdrop-blur-sm">
        <Gift className="w-3 h-3 md:w-4 md:h-4" />
        <span>Reward: +50 XP</span>
      </div>
    )}
  </div>
);

export default DailyChallenge;