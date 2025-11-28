import React from 'react';
import { Trophy } from 'lucide-react';

const LeaderBoardView = ({ leaderboardData = [] }) => (
  <div className="max-w-2xl mx-auto px-2 md:px-0 pb-20">
    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Trophy className="w-6 h-6 md:w-7 md:h-7 text-yellow-500" />
        Global Champions
      </h2>
      <div className="space-y-3">
        {leaderboardData.map((user, index) => (
          <div
            key={user.id || index}
            className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-gray-50 borderSx border-gray-100 hover:shadow-md transition-all"
          >
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm shrink-0 ${
              index === 0 ? 'bg-yellow-400 text-white' :
              index === 1 ? 'bg-gray-400 text-white' :
              index === 2 ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {index + 1}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm md:text-base truncate text-gray-800">
                {user.name}
              </p>
              <p className="text-xs text-gray-500">Mood: {user.moodState || 'Neutral'}</p>
            </div>
            
            <div className="text-right shrink-0">
              <p className="font-bold text-blue-600">{user.points} pts</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default LeaderBoardView;