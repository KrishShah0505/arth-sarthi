import React, { useState } from 'react';
import { Users, Crown, Target, Plus, LogIn } from 'lucide-react';
import { moodProfiles } from '../data/financialData';

const CircleView = ({ groups = [], onCreateGroup, onJoinGroup, mood = "motivational" }) => {
  const [newGroupName, setNewGroupName] = useState("");
  const [joinCode, setJoinCode] = useState("");

  const activeGroup = groups.length > 0 ? groups[0] : null; 
  const moodGradient = moodProfiles[mood]?.color || "from-purple-500 to-pink-500";

  if (!activeGroup) {
    return (
      <div className="max-w-xl mx-auto space-y-6 pb-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <Users className="w-16 h-16 mx-auto text-blue-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Join a Savings Circle</h2>
          <p className="text-gray-500 mb-6">Compete with friends and save together!</p>

          <div className="space-y-4">
             {/* Create Group */}
             <div className="flex gap-2">
               <input 
                 type="text" 
                 placeholder="New Group Name" 
                 className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 value={newGroupName}
                 onChange={(e) => setNewGroupName(e.target.value)}
               />
               <button 
                 onClick={() => { if(newGroupName) { onCreateGroup(newGroupName); setNewGroupName(""); } }}
                 className="bg-blue-600 text-white p-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
               >
                 <Plus size={18} /> Create
               </button>
             </div>

             <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-400">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
             </div>

             {/* Join Group */}
             <div className="flex gap-2">
               <input 
                 type="text" 
                 placeholder="Enter Group Code" 
                 className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                 value={joinCode}
                 onChange={(e) => setJoinCode(e.target.value)}
               />
               <button 
                 onClick={() => { if(joinCode) { onJoinGroup(joinCode); setJoinCode(""); } }}
                 className="bg-green-600 text-white p-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
               >
                 <LogIn size={18} /> Join
               </button>
             </div>
          </div>
        </div>
      </div>
    );
  }

  // Display Active Group Info
  return (
    <div className="max-w-2xl mx-auto space-y-6 relative pb-20">
      {/* Group Header */}
      <div className={`bg-gradient-to-br ${moodGradient} text-white rounded-2xl shadow-xl p-6`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Users className="w-7 h-7" />
              {activeGroup.name}
            </h2>
            <p className="text-sm opacity-90 mt-1">Code: <strong>{activeGroup.groupCode}</strong> (Share this!)</p>
          </div>
          <div className="text-right bg-white/20 p-2 rounded-lg">
             <p className="text-xs font-bold uppercase tracking-wider">Total Pool</p>
             <p className="text-2xl font-bold">₹{activeGroup.totalSaved || 0}</p>
          </div>
        </div>
      </div>

      {/* Members List */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-500" />
          Leaderboard
        </h3>
        <div className="space-y-3">
          {activeGroup.members?.map((member, idx) => (
            <div key={member.id || idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                   {idx + 1}
                 </div>
                 <p className="font-medium text-gray-800">{member.name}</p>
              </div>
              <p className="font-bold text-green-600">₹{member.saved || 0}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CircleView;