import React from 'react';
import { Trophy, Flame } from 'lucide-react';

const LeaderBoardView = ({ leaderboardData = [], userPoints, userLevel }) => (
  <div className="max-w-2xl mx-auto px-2 md:px-0 pb-20">
    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Trophy className="w-6 h-6 md:w-7 md:h-7 text-yellow-500" />
        Top Champions
      </h2>
      <div className="space-y-3">
        {leaderboardData.map((user) => (
          <div
            key={user.rank}
            className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl transition-all ${
              user.isUser
                ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-400 shadow-md transform md:scale-105'
                : 'bg-gray-50'
            }`}
          >
            <div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full font-bold text-sm md:text-base shrink-0 ${
              user.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
              user.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
              user.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
              'bg-gray-200 text-gray-600'
            }`}>
              {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : user.rank}
            </div>
            
            <div className="text-2xl md:text-4xl shrink-0">{user.avatar}</div>
            
            <div className="flex-1 min-w-0">
              <p className={`font-bold text-sm md:text-base truncate ${user.isUser ? 'text-blue-700' : 'text-gray-800'}`}>
                {user.name} {user.isUser && '(You)'}
              </p>
              <p className="text-xs md:text-sm text-gray-600">Level {user.level}</p>
            </div>
            
            <div className="text-right shrink-0">
              <p className="font-bold text-sm md:text-lg text-gray-800">{user.points}</p>
              <div className="flex items-center justify-end gap-1 text-orange-500 text-xs md:text-sm">
                <Flame className="w-3 h-3 md:w-4 md:h-4" />
                <span>{user.streak}d</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default LeaderBoardView;