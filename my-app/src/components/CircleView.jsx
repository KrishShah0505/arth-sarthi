import React, { useState } from 'react';
import { Users, Crown, Calendar, Target as TargetIcon, Plus, LogIn, TrendingUp } from 'lucide-react';
import { moodProfiles } from '../data/financialData';

const CircleView = ({ groups = [], onCreateGroup, onJoinGroup, mood = "motivational" }) => {
  // State for Create Group Form
  const [createData, setCreateData] = useState({
    name: '',
    goalTitle: '',
    targetAmount: '',
    deadline: ''
  });

  const [joinCode, setJoinCode] = useState("");
  const [activeTab, setActiveTab] = useState('join'); // 'join' or 'create'

  const activeGroup = groups.length > 0 ? groups[0] : null; 
  const moodGradient = moodProfiles[mood]?.color || "from-purple-500 to-pink-500";

  // Handle Create Form Change
  const handleCreateChange = (e) => {
    setCreateData({ ...createData, [e.target.name]: e.target.value });
  };

  const submitCreateGroup = () => {
    if (!createData.name || !createData.goalTitle || !createData.targetAmount) return;
    onCreateGroup(createData);
    setCreateData({ name: '', goalTitle: '', targetAmount: '', deadline: '' });
  };

  if (!activeGroup) {
    return (
      <div className="max-w-xl mx-auto space-y-6 pb-20">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-6">
            <Users className="w-16 h-16 mx-auto text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Savings Circle</h2>
            <p className="text-gray-500">Save together, compete, and reach goals faster!</p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
            <button
              onClick={() => setActiveTab('join')}
              className={`flex-1 py-2 rounded-md font-medium transition-all ${
                activeTab === 'join' ? 'bg-white shadow text-blue-600' : 'text-gray-500'
              }`}
            >
              Join Existing
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`flex-1 py-2 rounded-md font-medium transition-all ${
                activeTab === 'create' ? 'bg-white shadow text-blue-600' : 'text-gray-500'
              }`}
            >
              Create New
            </button>
          </div>

          {/* JOIN FORM */}
          {activeTab === 'join' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Have a Group Code?</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter 6-char Code (e.g. X7K9L2)" 
                    className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                  />
                  <button 
                    onClick={() => { if(joinCode) { onJoinGroup(joinCode); setJoinCode(""); } }}
                    className="bg-blue-600 text-white px-6 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition"
                  >
                    <LogIn size={20} /> Join
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CREATE FORM */}
          {activeTab === 'create' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Group Name</label>
                <input 
                  name="name"
                  type="text" 
                  placeholder="e.g. Goa Trip 2025" 
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 mt-1"
                  value={createData.name}
                  onChange={handleCreateChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Goal Title</label>
                  <input 
                    name="goalTitle"
                    type="text" 
                    placeholder="e.g. Hotel Booking" 
                    className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 mt-1"
                    value={createData.goalTitle}
                    onChange={handleCreateChange}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Target (₹)</label>
                  <input 
                    name="targetAmount"
                    type="number" 
                    placeholder="50000" 
                    className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 mt-1"
                    value={createData.targetAmount}
                    onChange={handleCreateChange}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Deadline</label>
                <input 
                  name="deadline"
                  type="date" 
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 mt-1 text-gray-700"
                  value={createData.deadline}
                  onChange={handleCreateChange}
                />
              </div>

              <button 
                onClick={submitCreateGroup}
                className={`w-full py-3 mt-2 rounded-xl font-bold flex items-center justify-center gap-2 text-white transition shadow-lg
                  bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-[1.02]`}
              >
                <Plus size={20} /> Create Circle
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // === DISPLAY ACTIVE GROUP ===
  const goal = activeGroup.activeGoal || {};
  const progressPercent = goal.target ? Math.min(100, (goal.progress / goal.target) * 100) : 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6 relative pb-20">
      
      {/* Group Header Card */}
      <div className={`bg-gradient-to-br ${moodGradient} text-white rounded-3xl shadow-xl p-6 relative overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide">Circle</span>
              <span className="bg-black/20 px-2 py-0.5 rounded text-xs font-mono opacity-80">{activeGroup.groupCode}</span>
            </div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              {activeGroup.name}
            </h2>
            <p className="text-white/80 text-sm mt-1">{activeGroup.memberCount || activeGroup.members?.length || 1} members saving together</p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl min-w-[120px] text-center">
             <p className="text-xs font-bold uppercase tracking-wider opacity-80">Pool Balance</p>
             <p className="text-2xl font-bold">₹{goal.progress?.toLocaleString() || 0}</p>
          </div>
        </div>

        {/* Goal Progress Section */}
        {goal.title && (
          <div className="mt-6 bg-black/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex justify-between items-end mb-2">
              <div>
                <p className="text-xs font-bold uppercase opacity-70 mb-1">Active Goal</p>
                <p className="font-bold text-lg flex items-center gap-2">
                  <TargetIcon size={18} /> {goal.title}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Target: ₹{goal.target?.toLocaleString()}</p>
                {goal.deadline && (
                  <p className="text-xs opacity-75 flex items-center justify-end gap-1 mt-1">
                    <Calendar size={12} /> {new Date(goal.deadline).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-black/30 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-1000 ease-out rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="text-xs text-right mt-1 opacity-80">{progressPercent.toFixed(1)}% funded</p>
          </div>
        )}
      </div>

      {/* Members / Leaderboard List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-500" />
          Contribution Leaderboard
        </h3>
        <div className="space-y-3">
          {activeGroup.members?.length > 0 ? (
            activeGroup.members.map((member, idx) => (
              <div key={member.id || idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group">
                <div className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-sm
                     ${idx === 0 ? 'bg-yellow-100 text-yellow-600' : 'bg-white text-gray-500 border border-gray-200'}`}>
                     {idx + 1}
                   </div>
                   <div>
                     <p className="font-bold text-gray-800">{member.name || member.user?.name || 'Member'}</p>
                     <p className="text-xs text-gray-500 font-medium">Rank {idx + 1}</p>
                   </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600 flex items-center gap-1">
                    <TrendingUp size={14} /> ₹{member.saved || 0}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
              <Users size={32} className="mx-auto mb-2 opacity-50" />
              <p>No members yet.</p>
              <p className="text-sm">Share code <strong>{activeGroup.groupCode}</strong> to invite friends!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CircleView;