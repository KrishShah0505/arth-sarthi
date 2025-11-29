import React from 'react';
import { Sparkles, Trophy, Users } from 'lucide-react';
import { moodProfiles } from '../data/financialData';

const NavigationTabs = ({ activeTab, setActiveTab, mood = "neutral" }) => {
  const tabs = [
    { id: 'chat', label: 'Coach', icon: Sparkles },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'circle', label: 'Circle', icon: Users },
  ];

  // Use solid color from moodProfiles
  const moodColor = moodProfiles[mood]?.color || "bg-blue-500";

  return (
    <div className="flex justify-center gap-2 mb-6 w-full px-2">
      <div className="flex w-full gap-3 sm:gap-2 md:w-auto bg-gray-100/70 backdrop-blur-md p-1 rounded-full 
                      shadow-sm flex-wrap justify-center">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 sm:px-3 sm:py-3 rounded-full font-semibold text-sm md:text-base transition-all whitespace-nowrap
              ${
                activeTab === tab.id
                  ? `${moodColor} text-white shadow-lg scale-100 md:scale-105`
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
