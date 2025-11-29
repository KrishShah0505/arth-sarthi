// ... (imports remain the same, ensure CircleView is imported)
import React, { useState, useRef, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { TrendingUp, AlertCircle, Flame, Sparkles, Plus } from 'lucide-react';
import * as API from './utils/api';
import Header from './components/Header';
import VoiceCircle from './components/VoiceCircle';
import NavigationTabs from './components/NavigationTabs';
import LeaderboardView from './components/LeaderBoardView';
import CircleView from './components/CircleView';
import InputBox from './components/InputBox';
import ChatMessage from './components/ChatMessage';
import InsightCard from './components/InsightCard';
import DailyChallenge from './components/DailyChallenge';
import LevelUpModal from './components/LevelUpModal';
import Confetti from './components/Confetti';
import BalanceCard from './components/BalanceCard';
import AddExpenseModal from './components/AddExpenseModal';
import ProfileModal from './components/ProfileModal';
import { analyzeMoodFromQuery } from './utils/helpers';
import './styles/animations.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('auth_token'));
  const [user, setUser] = useState(null);
  // ... (keep all your existing states: data, ui, modal, game)
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [savingsStats, setSavingsStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [groups, setGroups] = useState([]);
  const [activeTab, setActiveTab] = useState('chat');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ text: "Hello! I'm your FinCoach.", isUser: false }]);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState({});
  const [mood, setMood] = useState('motivational');
  const chatEndRef = useRef(null);

  // ... (keep useEffects for scroll, auth load, voice)
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  useEffect(() => { if (token) { API.setAuthToken(token); loadDashboardData(); } }, [token]);
  // ... (Voice useEffect code - keep as is)

  // ... (keep login, logout, profile handlers)
  const handleLoginSuccess = (r) => { setToken(r.credential); };
  const handleGuestLogin = () => { setToken("guest_mode"); };
  const handleLogout = () => { setToken(null); setUser(null); localStorage.removeItem('auth_token'); API.setAuthToken(null); };
  
  const loadDashboardData = async () => {
    try {
      setIsProcessing(true);
      const [userData, lbData, stats, txData, goalsData, groupsData] = await Promise.all([
        API.fetchUserData(), API.fetchLeaderboard(), API.fetchSavingsStats(),
        API.fetchTransactions(), API.fetchGoals(), API.fetchGroups()
      ]);
      setUser(userData); setLeaderboardData(lbData); setSavingsStats(stats);
      setTransactions(txData); setGoals(goalsData); setGroups(groupsData);
      if (userData?.moodState) setMood(userData.moodState.toLowerCase());
    } catch (error) { if (error.response?.status === 401) handleLogout(); } finally { setIsProcessing(false); }
  };

  // ... (keep all other handlers: goalComplete, addExpense, aiAdvice, submit)
  // ... (Using generic placeholders for brevity, assume your existing logic is here)
  const handleUpdateProfile = async (d) => { await API.updateProfile(d); loadDashboardData(); };
  const handleGoalComplete = async (id) => { await API.addGoalProgress(id, 500); setCompletedChallenges(p => ({...p, [id]:true})); setShowConfetti(true); loadDashboardData(); };
  const handleAddExpense = async (d) => { await API.addTransaction({...d, merchant: d.title||'Manual', amount: Number(d.amount)}); setIsExpenseModalOpen(false); loadDashboardData(); };
  const handleAiAdvice = async () => { /* ... existing logic ... */ };
  const handleSubmit = async () => { /* ... existing logic ... */ };

  if (!token) { /* ... Login UI ... */ 
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-4">
            <h1 className="text-3xl font-bold mb-4">Arth-Sarthi</h1>
            <GoogleLogin onSuccess={handleLoginSuccess} />
            <button onClick={handleGuestLogin} className="mt-4 text-blue-600">Guest Demo</button>
        </div>
    );
  }
  if (token && !user) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col">
      <Header level={Math.floor(user.points/100)+1} xp={user.points%100} maxXp={100} points={user.points} mood={mood} onProfileClick={() => setIsProfileOpen(true)} />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} user={user} onLogout={handleLogout} onUpdateProfile={handleUpdateProfile} />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 flex flex-col">
        <div className="relative -mt-16 mb-6 z-20 mx-auto w-full max-w-xl px-2">
          <BalanceCard balance={savingsStats?.balance||0} growth="+5%" />
        </div>

        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} mood={mood} />

        {activeTab === 'chat' && (
           /* ... Your Chat UI Code ... */
           <div className="animate-fade-in pb-24">
             {/* Goals Swiper */}
             <div className="mb-6 flex overflow-x-auto pb-4 gap-4 snap-x hide-scrollbar">
                {goals.map(g => (
                    <div key={g.id} className="min-w-[85vw] md:min-w-[350px] snap-center">
                        <DailyChallenge challenge={`Fund: ${g.title}`} completed={completedChallenges[g.id]} onComplete={() => handleGoalComplete(g.id)} mood={mood} />
                    </div>
                ))}
             </div>
             {/* Grid */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <InsightCard icon={TrendingUp} title="Saved" value={`₹${savingsStats?.savings}`} color="border-green-600" />
                <InsightCard icon={AlertCircle} title="Spent" value={`₹${savingsStats?.totalSpent}`} color="border-yellow-600" />
                <InsightCard icon={Flame} title="Rank" value="#3" color="border-orange-600" onClick={()=>setActiveTab('leaderboard')} />
             </div>
             {/* Voice & Chat */}
             <VoiceCircle isListening={isListening} onToggleListen={() => setIsListening(!isListening)} level={1} mood={mood} />
             <div className="mt-8 bg-white p-4 rounded-xl h-64 overflow-y-auto">
                {messages.map((m,i) => <ChatMessage key={i} {...m} mood={mood} />)}
                <div ref={chatEndRef} />
             </div>
             <InputBox value={input} onChange={e=>setInput(e.target.value)} onSubmit={handleSubmit} onMicClick={()=>setIsListening(!isListening)} onAiClick={handleAiAdvice} />
           </div>
        )}

        {activeTab === 'leaderboard' && <div className="animate-slide-in"><LeaderboardView leaderboardData={leaderboardData} /></div>}

        {activeTab === 'circle' && (
           <div className="animate-slide-in">
             <CircleView 
                groups={groups} 
                userId={user.id} // Pass User ID to check ownership
                onCreateGroup={(d) => API.createGroup(d).then(loadDashboardData)}
                onJoinGroup={(c) => API.joinGroup(c).then(loadDashboardData)}
                onLeaveGroup={(id) => API.leaveGroup(id).then(loadDashboardData)} // Wire Leave
                onContribute={(gid, amt) => API.contributeToGroup(gid, amt).then(loadDashboardData)} // Wire Contribute
                mood={mood} 
             />
           </div>
        )}
      </main>
      
      <AddExpenseModal isOpen={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)} onAdd={handleAddExpense} />
      {showLevelUp && <LevelUpModal level={5} onClose={()=>setShowLevelUp(false)} />}
      <Confetti show={showConfetti} />
    </div>
  );
};

export default App;