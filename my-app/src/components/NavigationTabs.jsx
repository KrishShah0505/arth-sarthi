import React from 'react';
import { Sparkles, Trophy, Users } from 'lucide-react';
import { moodProfiles } from '../data/financialData';

const NavigationTabs = ({ activeTab, setActiveTab, mood = "motivational" }) => {
  const tabs = [
    { id: 'chat', label: 'Coach', icon: Sparkles },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'circle', label: 'Circle', icon: Users },
  ];

  const moodGradient = moodProfiles[mood]?.color || "from-blue-600 to-purple-600";

  return (
    <div className="flex justify-center gap-2 mb-6 w-full overflow-x-hidden">
      <div className="flex w-full gap-3 md:w-auto bg-gray-100/70 backdrop-blur-md p-1 rounded-full overflow-x-auto md:overflow-visible shadow-sm">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all whitespace-nowrap
              ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${moodGradient} text-white shadow-lg scale-100 md:scale-105`
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
          >
            <tab.icon className="w-4 h-4 md:w-5 md:h-5" />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationTabs;
