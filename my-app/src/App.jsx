import React, { useState, useRef, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { TrendingUp, AlertCircle, Flame, Sparkles } from 'lucide-react';

// --- API Layer (Mock) ---
import * as API from './utils/api';

// --- Components ---
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

// --- Utils ---
import { moodProfiles } from './data/financialData';
import { analyzeMoodFromQuery } from './utils/helpers';
import './styles/animations.css';

const App = () => {
  // ==============================
  // 1. STATE MANAGEMENT
  // ==============================
  const [token, setToken] = useState(localStorage.getItem('auth_token'));
  const [user, setUser] = useState(null);

  // Data States
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [savingsStats, setSavingsStats] = useState(null);
  const [expenses, setExpenses] = useState([]);

  // UI States
  const [activeTab, setActiveTab] = useState('chat');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{
    text: "Hello! I'm your FinCoach. I've analyzed your local spending data. How can I help you save today?",
    isUser: false
  }]);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  // Game States
  const [level, setLevel] = useState(1);
  const [points, setPoints] = useState(0);
  const [xp, setXp] = useState(0);
  const [maxXp, setMaxXp] = useState(100);
  const [streak, setStreak] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [mood, setMood] = useState('motivational');

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (token) loadDashboardData();
  }, [token]);

  // ==============================
  // 2. HANDLERS
  // ==============================

  const handleLoginSuccess = (credentialResponse) => {
    const t = credentialResponse.credential;
    setToken(t);
    API.setAuthToken(t);
  };

  const handleGuestLogin = () => {
    const t = "guest_token_123";
    setToken(t);
    API.setAuthToken(t);
  };

  const loadDashboardData = async () => {
    try {
      setIsProcessing(true);
      const userData = await API.fetchUserData();
      const lbData = await API.fetchLeaderboard();
      const savingsData = await API.fetchSavingsStats();

      setUser(userData);
      setSavingsStats(savingsData);

      if (userData) {
        setPoints(userData.points);
        setLevel(userData.level);
        setXp(userData.xp);
        setStreak(userData.streak);
      }

      setLeaderboardData(lbData);
    } catch (error) {
      console.error("Load Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isUser: true, xpGained: 10 }]);
    setInput('');
    setIsProcessing(true);

    const detectedMood = analyzeMoodFromQuery(userMessage);
    setMood(detectedMood);

    try {
      let responseText = "";

      if (userMessage.toLowerCase().includes("spent") || userMessage.toLowerCase().includes("saving")) {
        const stats = await API.fetchSavingsStats();
        responseText = `You have spent ₹${stats.totalSpent} so far. Your savings are ₹${stats.savings}. ${stats.message}`;
      } else if (userMessage.toLowerCase().includes("add") && userMessage.toLowerCase().includes("transaction")) {
        await API.addTransaction({ merchant: 'Manual Entry', amount: 500, category: 'Misc' });
        responseText = "✅ Added ₹500 transaction. Your stats have been updated!";
        loadDashboardData();
      } else {
        const aiRes = await API.getAIAdvice();
        responseText = aiRes.message;
      }

      setMessages(prev => [...prev, { text: responseText, isUser: false, mood: detectedMood }]);
      setPoints(prev => prev + 10);
      setXp(prev => prev + 10);

    } catch (err) {
      setMessages(prev => [...prev, { text: "Connection error.", isUser: false }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddExpense = (expense) => {
    setExpenses(prev => [...prev, expense]);
  };

  // ==============================
  // 3. RENDER
  // ==============================

  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full animate-scale-in">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl shadow-lg">
            💰
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">FinCoach AI</h1>
          <p className="text-gray-600 mb-8">Gamify your finance, master your savings!</p>

          <div className="space-y-4">
            <div className="flex justify-center">
              <GoogleLogin onSuccess={handleLoginSuccess} onError={() => {}} useOneTap />
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or</span></div>
            </div>
            <button
              onClick={handleGuestLogin}
              className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-900 text-white font-bold rounded-lg shadow-md transition-all"
            >
              🚀 Continue as Demo User
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header level={level} xp={xp} maxXp={maxXp} points={points} mood={mood} />

      {/* Overlapping Balance Card */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[170px] z-50 
                      w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] 
                      max-w-[90%] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
        <BalanceCard balance={savingsStats?.balance || 124567} growth="+12.5%" />
      </div>
      <div className="h-[140px]"></div>

      <main className="max-w-6xl mx-auto p-4 space-y-6">

        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'chat' && (
          <>
            <DailyChallenge
              challenge="Check your spending stats"
              completed={challengeCompleted}
              onComplete={() => { setChallengeCompleted(true); setShowConfetti(true); }}
            />

            {/* Insight Cards & Add Expense */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InsightCard icon={TrendingUp} title="Total Saved" value={`₹${savingsStats?.savings || 0}`} color="border-green-600" onClick={() => setInput("Show my savings")} />
              <InsightCard icon={AlertCircle} title="Total Spent" value={`₹${savingsStats?.totalSpent || 0}`} color="border-yellow-600" onClick={() => setInput("Analyze my spending")} />
              <InsightCard icon={Flame} title="Daily Streak" value={`${streak} days`} color="border-orange-600" streak={streak} onClick={() => setInput("Streak info")} />

              {/* Add Expense Button spans full width under cards */}
              <div className="md:col-span-3 flex justify-center mt-4">
                <button
                  onClick={() => setIsExpenseModalOpen(true)}
                  className="bg-blue-500 text-white px-10 py-5 rounded-2xl shadow-lg w-50 hover:scale-105 transition-transform font-bold"
                >
                  + Add Expense
                </button>
              </div>
            </div>

            <VoiceCircle isListening={isListening} onToggleListen={() => setIsListening(!isListening)} level={level} mood={mood} />

            <AddExpenseModal
              isOpen={isExpenseModalOpen}
              onClose={() => setIsExpenseModalOpen(false)}
              onAdd={handleAddExpense}
            />

            <InputBox value={input} onChange={(e) => setInput(e.target.value)} onSubmit={handleSubmit} disabled={isProcessing} />

            {/* Expense List */}
            {expenses.length > 0 && (
              <div className="mt-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-4">
                <h3 className="text-lg font-bold mb-2">Your Expenses</h3>
                <ul className="space-y-2">
                  {expenses.map((exp, idx) => (
                    <li key={idx} className="flex justify-between p-3 rounded-lg bg-gray-50 shadow-sm">
                      <div>
                        <p className="font-semibold">{exp.category}</p>
                        {exp.note && <p className="text-gray-500 text-sm">{exp.note}</p>}
                      </div>
                      <p className="font-bold text-blue-500">₹{exp.amount}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* AI Coach Chat */}
            <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-600" /> AI Coach Chat
              </h2>
              <div className="max-h-96 overflow-y-auto pr-2">
                {messages.map((msg, idx) => (
                  <ChatMessage key={idx} message={msg.text} isUser={msg.isUser} xpGained={msg.xpGained} mood={msg.mood || mood} />
                ))}
                {isProcessing && <div className="text-gray-400 text-sm animate-pulse ml-4">Thinking...</div>}
                <div ref={chatEndRef} />
              </div>
            </div>
          </>
        )}

        {activeTab === 'leaderboard' && <LeaderboardView userPoints={points} userLevel={level} leaderboardData={leaderboardData} />}
        {activeTab === 'circle' && <CircleView />}
      </main>

      {showLevelUp && <LevelUpModal level={level} onClose={() => setShowLevelUp(false)} />}
      <Confetti show={showConfetti} />
    </div>
  );
};

export default App;
