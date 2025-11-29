import React, { useState } from 'react';
import { Users, Crown, Calendar, Target as TargetIcon, Plus, LogIn, TrendingUp, ArrowLeft, LogOut, Wallet } from 'lucide-react';
import { moodProfiles } from '../data/financialData';

const CircleView = ({ groups = [], userId, onCreateGroup, onJoinGroup, onLeaveGroup, onContribute, mood = "motivational" }) => {
  // === State ===
  const [view, setView] = useState('lobby'); // 'lobby' | 'create_join' | 'detail'
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Forms
  const [createData, setCreateData] = useState({ name: '', goalTitle: '', targetAmount: '', deadline: '' });
  const [joinCode, setJoinCode] = useState("");
  const [subTab, setSubTab] = useState('join'); // 'join' or 'create'
  
  // Contribute
  const [isContributeOpen, setIsContributeOpen] = useState(false);
  const [contribAmount, setContribAmount] = useState('');

  // Styling
  const moodData = moodProfiles[mood] || moodProfiles.neutral;
  const moodGradient = moodData.gradient;

  // --- Handlers ---
  const handleCreateChange = (e) => {
    setCreateData({ ...createData, [e.target.name]: e.target.value });
  };

  const submitCreateGroup = async () => {
    if (!createData.name || !createData.goalTitle || !createData.targetAmount) return;
    await onCreateGroup(createData);
    setCreateData({ name: '', goalTitle: '', targetAmount: '', deadline: '' });
    setView('lobby');
  };

  const submitJoinGroup = async () => {
    if (!joinCode) return;
    await onJoinGroup(joinCode);
    setJoinCode("");
    setView('lobby');
  };

  const handleLeaveGroup = async () => {
    if(window.confirm("Are you sure you want to leave this circle?")) {
        await onLeaveGroup(selectedGroup.id);
        setSelectedGroup(null);
        setView('lobby');
    }
  };

  const handleContribute = async () => {
    if(!contribAmount || !selectedGroup?.activeGoal?.id) return;
    await onContribute(selectedGroup.activeGoal.id, parseFloat(contribAmount));
    setContribAmount('');
    setIsContributeOpen(false);
  };

  // === VIEW 1: LOBBY (List of Groups) ===
  if (view === 'lobby') {
    return (
      <div className="max-w-2xl mx-auto space-y-6 pb-20 animate-fade-in">
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Users className="text-blue-600" /> My Circles
            </h2>
            {/* New Circle Button */}
            <button 
                onClick={() => setView('create_join')}
                className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md hover:scale-105 transition flex items-center gap-1"
            >
                <Plus size={16} /> New Circle
            </button>
        </div>

        {groups.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
                <Users className="w-16 h-16 mx-auto text-blue-200 mb-4" />
                <h3 className="text-lg font-bold text-gray-700">No Circles Yet</h3>
                <p className="text-gray-500 mb-6">Join friends or create a squad!</p>
            </div>
        ) : (
            <div className="grid gap-4">
                {groups.map(group => {
                    const progress = group.activeGoal ? (group.activeGoal.progress / group.activeGoal.target) * 100 : 0;
                    return (
                        <div 
                            key={group.id} 
                            onClick={() => { setSelectedGroup(group); setView('detail'); }}
                            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition active:scale-[0.98]"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">{group.name}</h3>
                                    <p className="text-sm text-gray-500">{group.memberCount || group.members?.length || 0} members</p>
                                </div>
                                <div className="text-right">
                                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-lg">
                                        {progress.toFixed(0)}%
                                    </span>
                                </div>
                            </div>
                            {group.activeGoal && (
                                <div className="mt-3">
                                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Target: {group.activeGoal.title}</p>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div className={`h-2 rounded-full bg-gradient-to-r ${moodGradient}`} style={{ width: `${Math.min(100, progress)}%` }}></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        )}
      </div>
    );
  }

  // === VIEW 2: CREATE / JOIN FORM ===
  if (view === 'create_join') {
    return (
      <div className="max-w-xl mx-auto space-y-6 pb-20 animate-slide-in-right">
        <button onClick={() => setView('lobby')} className="text-gray-500 flex items-center gap-1 hover:text-gray-800 mb-2">
            <ArrowLeft size={18} /> Back to Lobby
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Expand Your Network</h2>
            <p className="text-gray-500">Join another squad or start a new movement.</p>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
            <button onClick={() => setSubTab('join')} className={`flex-1 py-2 rounded-md font-medium transition-all ${subTab === 'join' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}>Join Existing</button>
            <button onClick={() => setSubTab('create')} className={`flex-1 py-2 rounded-md font-medium transition-all ${subTab === 'create' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}>Create New</button>
          </div>

          {subTab === 'join' ? (
            <div className="space-y-4">
              <input type="text" placeholder="Enter Group Code" className="w-full p-3 border rounded-xl uppercase" value={joinCode} onChange={(e) => setJoinCode(e.target.value)} />
              <button onClick={submitJoinGroup} className="bg-blue-600 text-white w-full py-3 rounded-xl font-bold">Join Circle</button>
            </div>
          ) : (
            <div className="space-y-3">
              <input name="name" type="text" placeholder="Group Name" className="w-full p-3 border rounded-xl" value={createData.name} onChange={handleCreateChange} />
              <div className="grid grid-cols-2 gap-3">
                <input name="goalTitle" type="text" placeholder="Goal Title" className="w-full p-3 border rounded-xl" value={createData.goalTitle} onChange={handleCreateChange} />
                <input name="targetAmount" type="number" placeholder="Target ₹" className="w-full p-3 border rounded-xl" value={createData.targetAmount} onChange={handleCreateChange} />
              </div>
              <input name="deadline" type="date" className="w-full p-3 border rounded-xl text-gray-500" value={createData.deadline} onChange={handleCreateChange} />
              <button onClick={submitCreateGroup} className={`w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r ${moodGradient}`}>Create Circle</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // === VIEW 3: DETAIL GROUP VIEW ===
  if (view === 'detail' && selectedGroup) {
    const goal = selectedGroup.activeGoal || {};
    const progressPercent = goal.target ? Math.min(100, (goal.progress / goal.target) * 100) : 0;
    const isCreator = selectedGroup.createdById === userId;

    return (
      <div className="max-w-2xl mx-auto space-y-6 relative pb-20 animate-slide-in">
        <div className="flex justify-between items-center">
            <button onClick={() => setView('lobby')} className="text-gray-500 flex items-center gap-1 hover:text-gray-800">
                <ArrowLeft size={18} /> Back
            </button>
            {/* LEAVE BUTTON (Only if NOT creator) */}
            {!isCreator && (
                <button onClick={handleLeaveGroup} className="text-red-500 text-xs font-bold flex items-center gap-1 border border-red-200 px-3 py-1 rounded-lg hover:bg-red-50 transition">
                    <LogOut size={14} /> Leave Group
                </button>
            )}
        </div>

        {/* Group Header Card */}
        <div className={`bg-gradient-to-br ${moodGradient} text-white rounded-3xl shadow-xl p-6 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide">Code: {selectedGroup.groupCode}</span>
              </div>
              <h2 className="text-3xl font-bold">{selectedGroup.name}</h2>
              <p className="text-white/80 text-sm mt-1">{selectedGroup.members?.length || 0} members saving together</p>
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
                
                {/* CONTRIBUTE BUTTON */}
                <div className="text-right">
                    <button 
                        onClick={() => setIsContributeOpen(!isContributeOpen)}
                        className="bg-white text-purple-600 px-4 py-2 rounded-lg font-bold text-sm shadow-lg hover:scale-105 transition flex items-center gap-1"
                    >
                        <Wallet size={16} /> Contribute
                    </button>
                </div>
              </div>

              {/* Contribute Input Panel */}
              {isContributeOpen && (
                  <div className="mb-4 flex gap-2 animate-fade-in bg-white/10 p-2 rounded-lg">
                      <input 
                        type="number" 
                        placeholder="Amount ₹" 
                        className="flex-1 p-2 rounded-lg text-gray-800 focus:outline-none"
                        value={contribAmount}
                        onChange={(e) => setContribAmount(e.target.value)}
                      />
                      <button onClick={handleContribute} className="bg-green-500 text-white px-4 rounded-lg font-bold shadow-md hover:bg-green-600">Pay</button>
                  </div>
              )}

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

        {/* Leaderboard List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            Contribution Leaderboard
          </h3>
          <div className="space-y-3">
            {selectedGroup.members?.length > 0 ? (
              selectedGroup.members.map((member, idx) => (
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
              <p className="text-center text-gray-400">No members yet.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CircleView;