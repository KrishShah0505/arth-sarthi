// src/utils/api.jsx

// --- MOCK DATABASE (Initial Data) ---
const DB_DEFAULTS = {
  user: {
    id: 'user_1',
    name: 'Demo User',
    email: 'demo@fincoach.com',
    points: 150,
    moodState: 'Motivational',
    income: 85000,
    budgetLimit: 30000,
    openingBalance: 15000 // Initial bank balance
  },
  transactions: [
    { id: 1, merchant: 'Starbucks', amount: 350, category: 'Food', date: '2023-10-25', type: 'EXPENSE' },
    { id: 2, merchant: 'Uber', amount: 120, category: 'Transport', date: '2023-10-24', type: 'EXPENSE' },
    { id: 3, merchant: 'Salary', amount: 85000, category: 'Salary', date: '2023-10-01', type: 'INCOME' },
  ],
  goals: [
    { id: 1, title: 'New Laptop', target: 80000, progress: 25000 },
    { id: 2, title: 'Goa Trip', target: 15000, progress: 5000 }
  ],
  groups: [
    { 
      id: 'g1', 
      name: 'Mumbai Savers', 
      groupCode: 'MUM123', 
      totalSaved: 45000, 
      members: [
        { id: 'u2', name: 'Priya', saved: 20000 },
        { id: 'user_1', name: 'You', saved: 15000 },
        { id: 'u3', name: 'Rahul', saved: 10000 }
      ]
    }
  ],
  leaderboard: [
    { id: 'u2', name: 'Priya S.', points: 450, moodState: 'Analytical' },
    { id: 'u3', name: 'Rahul K.', points: 320, moodState: 'Concerned' },
    { id: 'user_1', name: 'You', points: 150, moodState: 'Motivational' }, // Will sync with user
  ]
};

// --- HELPER: SIMULATE NETWORK DELAY ---
const delay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms));

// --- HELPER: LOCAL STORAGE DB ---
const getDB = (collection) => {
  const data = localStorage.getItem(`fc_${collection}`);
  return data ? JSON.parse(data) : DB_DEFAULTS[collection];
};

const saveDB = (collection, data) => {
  localStorage.setItem(`fc_${collection}`, JSON.stringify(data));
};

// --- AUTH (Mock) ---
export const setAuthToken = (token) => {
  if(token) localStorage.setItem('auth_token', token);
  else localStorage.removeItem('auth_token');
};

// ==========================================
// 1. USER & DASHBOARD
// ==========================================
export const fetchUserData = async () => {
  await delay();
  return getDB('user');
};

export const fetchLeaderboard = async () => {
  await delay();
  const user = getDB('user');
  let lb = getDB('leaderboard');
  
  // Ensure "You" is updated in leaderboard
  lb = lb.map(u => u.id === 'user_1' ? { ...u, points: user.points, moodState: user.moodState } : u);
  return lb.sort((a,b) => b.points - a.points);
};

export const fetchSavingsStats = async () => {
  await delay();
  const user = getDB('user');
  const txs = getDB('transactions');
  
  const totalSpent = txs
    .filter(t => t.type === 'EXPENSE')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
    
  const savings = Math.max(0, user.income - totalSpent);
  
  // Balance calculation (Opening + Income - Expenses)
  const currentBalance = user.openingBalance + savings;

  return {
    totalSpent,
    savings,
    balance: currentBalance,
    budgetLimit: user.budgetLimit,
    message: savings > 5000 ? "Great saving habits! 🟢" : "Watch your spending! 🔴"
  };
};

export const updateProfile = async (data) => {
  await delay();
  const user = getDB('user');
  const updated = { ...user, ...data };
  saveDB('user', updated);
  return updated;
};

// ==========================================
// 2. TRANSACTIONS
// ==========================================
export const fetchTransactions = async () => {
  await delay();
  return getDB('transactions');
};

export const addTransaction = async (txData) => {
  await delay();
  const txs = getDB('transactions');
  const newTx = { 
    ...txData, 
    id: Date.now(), 
    date: new Date().toISOString().split('T')[0],
    type: 'EXPENSE'
  };
  txs.unshift(newTx); // Add to top
  saveDB('transactions', txs);
  
  // Add XP for adding transaction
  const user = getDB('user');
  user.points += 10;
  saveDB('user', user);
  
  return newTx;
};

export const parseSMS = async (smsText) => {
  await delay(1000); // Simulate parsing time
  // Regex to find "Rs 500" and "at Starbucks"
  const amountMatch = smsText.match(/(?:Rs\.?|INR)\s?(\d+(?:,\d+)*)/i);
  const merchantMatch = smsText.match(/at\s+([a-zA-Z0-9\s]+?)(?:\s+on|$)/i);
  
  if (amountMatch) {
    const amount = parseInt(amountMatch[1].replace(/,/g, ''));
    const merchant = merchantMatch ? merchantMatch[1] : "Unknown Merchant";
    
    return await addTransaction({
      merchant,
      amount,
      category: 'Uncategorized'
    });
  }
  throw new Error("Could not parse SMS. Try 'Paid Rs 500 at Starbucks'");
};

// ==========================================
// 3. GOALS
// ==========================================
export const fetchGoals = async () => {
  await delay();
  return getDB('goals');
};

export const addGoal = async (goalData) => {
  await delay();
  const goals = getDB('goals');
  const newGoal = { ...goalData, id: Date.now(), progress: 0 };
  goals.push(newGoal);
  saveDB('goals', goals);
  
  const user = getDB('user');
  user.points += 50; // Bonus for setting goal
  saveDB('user', user);
  
  return newGoal;
};

export const addGoalProgress = async (id, amount) => {
  await delay();
  const goals = getDB('goals');
  const index = goals.findIndex(g => g.id === id);
  if (index !== -1) {
    goals[index].progress += Number(amount);
    saveDB('goals', goals);
    
    const user = getDB('user');
    user.points += 20; // Bonus for saving
    saveDB('user', user);
  }
  return goals[index];
};

// ==========================================
// 4. GROUPS
// ==========================================
export const fetchGroups = async () => {
  await delay();
  return getDB('groups');
};

export const createGroup = async (name) => {
  await delay();
  const groups = getDB('groups');
  const newGroup = {
    id: Date.now(),
    name,
    groupCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
    totalSaved: 0,
    members: [{ id: 'user_1', name: 'You', saved: 0 }]
  };
  groups.push(newGroup);
  saveDB('groups', groups);
  return newGroup;
};

export const joinGroup = async (groupCode) => {
  await delay();
  const groups = getDB('groups');
  const group = groups.find(g => g.groupCode === groupCode);
  
  if (!group) throw new Error("Invalid Group Code");
  
  // Check if already member
  if (!group.members.find(m => m.id === 'user_1')) {
    group.members.push({ id: 'user_1', name: 'You', saved: 0 });
    saveDB('groups', groups);
  }
  return group;
};

// ==========================================
// 5. AI ADVICE
// ==========================================
export const getAIAdvice = async () => {
  await delay(1500);
  const user = getDB('user');
  
  // Simple logic to generate "fake" AI advice
  if (user.points > 200) {
    return { type: 'Motivational', message: "🚀 You're crushing your goals! Have you considered starting an SIP with your extra savings?" };
  } else if (user.income < 50000) {
    return { type: 'Supportive', message: "💙 It looks like a tight month. Let's try to cut down on food delivery this week." };
  } else {
    return { type: 'Analytical', message: "📊 Analysis: You spent 40% of your income on 'Wants' last week. Try the 50/30/20 rule." };
  }
};

export default {
  setAuthToken,
  fetchUserData,
  fetchLeaderboard,
  fetchSavingsStats,
  fetchTransactions,
  addTransaction,
  parseSMS,
  fetchGoals,
  addGoal,
  addGoalProgress,
  fetchGroups,
  createGroup,
  joinGroup,
  getAIAdvice,
  updateProfile
};