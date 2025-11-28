import React from 'react';
import { Users, Crown, Target } from 'lucide-react';
import { circleData, moodProfiles } from '../data/financialData';

const CircleView = ({ mood = "motivational" }) => {
  const progressPercentage = (circleData.currentProgress / circleData.totalGoal) * 100;
  const moodGradient = moodProfiles[mood]?.color || "from-purple-500 to-pink-500";

  // Slightly modified gradient for progress bar
  const barGradient = mood === "analytical"
    ? "from-indigo-300 to-purple-400"
    : mood === "supportive"
    ? "from-cyan-300 to-blue-400"
    : mood === "concerned"
    ? "from-orange-300 to-yellow-400"
    : "from-pink-300 to-orange-400"; // motivational default

  // Subtle border / accent
  const borderAccent = mood === "analytical"
    ? "border-indigo-300"
    : mood === "supportive"
    ? "border-blue-300"
    : mood === "concerned"
    ? "border-yellow-300"
    : "border-pink-300";

  return (
    <div className="max-w-2xl mx-auto space-y-6 relative">

      {/* Circle Info Card (Mood Gradient) */}
      <div className={`bg-gradient-to-br ${moodGradient} text-white rounded-2xl shadow-xl p-6`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Users className="w-7 h-7" />
              {circleData.name}
            </h2>
            <p className="text-sm opacity-90 mt-1">{circleData.members} members saving together</p>
          </div>

          <div className="text-right">
            <p className="text-3xl font-bold">₹{(circleData.currentProgress / 1000).toFixed(0)}K</p>
            <p className="text-sm opacity-90">of ₹{(circleData.totalGoal / 1000).toFixed(0)}K goal</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/30 rounded-full h-4 overflow-hidden backdrop-blur-sm">
          <div
            className={`h-full bg-gradient-to-r ${barGradient} transition-all duration-500 rounded-full flex items-center justify-end pr-2`}
            style={{ width: `${progressPercentage}%` }}
          >
            <span className="text-xs font-bold text-white drop-shadow">
              {progressPercentage.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      {/* Top Savers */}
      <div className={`bg-white rounded-2xl shadow-xl p-6 border ${borderAccent}`}>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Crown className="w-6 h-6 text-yellow-500" />
          Top Contributors
        </h3>

        <div className="space-y-3">
          {circleData.topSavers.map((saver, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-4 p-4 rounded-xl border
                ${saver.isUser
                  ? `bg-gradient-to-r ${moodGradient} text-white border-transparent`
                  : 'bg-gray-50 border-gray-200 text-gray-800'
                }`}
            >
              <div className="text-4xl">{saver.avatar}</div>

              <div className="flex-1">
                <p className={`font-bold ${saver.isUser ? 'text-white' : 'text-gray-800'}`}>
                  {saver.name} {saver.isUser && '(You)'}
                </p>
                <p className={`${saver.isUser ? 'text-white/90' : 'text-gray-600'} text-sm`}>
                  Contributed ₹{saver.amount.toLocaleString()}
                </p>
              </div>

              {idx === 0 && <Crown className="w-6 h-6 text-yellow-500" />}
            </div>
          ))}
        </div>
      </div>

      {/* Your Contribution */}
      <div className={`bg-white rounded-2xl shadow-xl p-6 border ${borderAccent}`}>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Your Impact</h3>

        <div className={`flex items-center justify-between p-4 rounded-xl 
          bg-gradient-to-r ${moodGradient} text-white shadow-md`}>
          <div>
            <p className="text-sm opacity-90">Your contribution</p>
            <p className="text-3xl font-bold">
              ₹{circleData.yourContribution.toLocaleString()}
            </p>
          </div>

          <Target className="w-12 h-12 text-white/90" />
        </div>
      </div>
    </div>
  );
};

export default CircleView;
