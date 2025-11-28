// src/utils/api.js

// --- INITIAL MOCK DATA ---
const INITIAL_USER = {
  id: 'user_1',
  name: 'Demo User',
  email: 'demo@fincoach.com',
  points: 2420,
  level: 10,
  xp: 420,
  streak: 5,
  moodState: 'motivational',
  income: 50000,
  budgetLimit: 30000
};

const INITIAL_TRANSACTIONS = [
  { id: 1, merchant: 'Starbucks', amount: 250, category: 'Food', date: '2023-10-01' },
  { id: 2, merchant: 'Uber', amount: 150, category: 'Transport', date: '2023-10-02' },
  { id: 3, merchant: 'Netflix', amount: 499, category: 'Entertainment', date: '2023-10-03' },
];

const INITIAL_LEADERBOARD = [
  { id: 'u2', name: 'Priya S.', points: 2840, avatar: '👩‍💼', streak: 45 },
  { id: 'u3', name: 'Rahul K.', points: 2650, avatar: '👨‍💻', streak: 38 },
  { id: 'user_1', name: 'You', points: 2420, avatar: '🎯', streak: 5 }, // Syncs with local user
  { id: 'u4', name: 'Anjali M.', points: 2180, avatar: '👩‍🎓', streak: 25 },
];

// --- HELPER: SIMULATE NETWORK DELAY ---
const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// --- HELPER: LOCAL STORAGE MANAGER ---
const getStorage = (key, initial) => {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(stored);
};

const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// --- API METHODS ---

// 1. AUTH (Mock)
export const setAuthToken = (token) => {
  console.log("Mock Auth Token Set:", token);
  localStorage.setItem('auth_token', token);
};

// 2. USER DATA
export const fetchUserData = async () => {
  await delay();
  return getStorage('fc_user', INITIAL_USER);
};

// 3. LEADERBOARD
export const fetchLeaderboard = async () => {
  await delay();
  const user = getStorage('fc_user', INITIAL_USER);
  const lb = getStorage('fc_leaderboard', INITIAL_LEADERBOARD);
  
  // Ensure "You" in leaderboard matches current user stats
  return lb.map(u => u.id === 'user_1' ? { ...u, points: user.points, streak: user.streak } : u);
};

// 4. TRANSACTIONS
export const fetchTransactions = async () => {
  await delay();
  return getStorage('fc_transactions', INITIAL_TRANSACTIONS);
};

// 5. SAVINGS STATS (Calculated dynamically)
export const fetchSavingsStats = async () => {
  await delay();
  const user = getStorage('fc_user', INITIAL_USER);
  const transactions = getStorage('fc_transactions', INITIAL_TRANSACTIONS);
  
  const totalSpent = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const savings = user.income - totalSpent;
  
  return {
    totalSpent,
    savings,
    budgetLimit: user.budgetLimit,
    message: savings > 0 ? "You are saving well! 🟢" : "Overspending alert! 🔴"
  };
};

// 6. AI RECOMMENDATIONS (Logic from your previous helper)
export const getAIAdvice = async () => {
  await delay(1500); // Longer delay for AI feel
  const stats = await fetchSavingsStats();
  
  if (stats.savings < 0) {
    return { type: 'critical', message: "⚠️ Warning: You've exceeded your income! Let's cut down on 'Entertainment' this week." };
  } else if (stats.savings < 5000) {
    return { type: 'analytical', message: "📊 You're doing okay, but we can optimize. Try using the '50/30/20' rule." };
  } else {
    return { type: 'motivational', message: "🚀 Excellent savings rate! Have you considered investing in a Mutual Fund?" };
  }
};

// 7. ACTIONS (These update LocalStorage)
export const addTransaction = async (txData) => {
  await delay();
  const txs = getStorage('fc_transactions', INITIAL_TRANSACTIONS);
  const newTx = { ...txData, id: Date.now(), date: new Date().toISOString().split('T')[0] };
  txs.unshift(newTx);
  setStorage('fc_transactions', txs);
  return newTx;
};

export const parseSMS = async (smsText) => {
  await delay(1200);
  // specific logic to parse SMS text
  const amountMatch = smsText.match(/Rs\.?\s?(\d+)/i);
  const merchantMatch = smsText.match(/at\s([A-Za-z ]+)/i);
  
  if (amountMatch) {
    const newTx = {
      merchant: merchantMatch ? merchantMatch[1] : 'Unknown Merchant',
      amount: parseInt(amountMatch[1]),
      category: 'Uncategorized'
    };
    return await addTransaction(newTx);
  }
  throw new Error("Could not parse SMS");
};