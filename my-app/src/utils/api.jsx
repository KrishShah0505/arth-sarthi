import axios from 'axios';

// ==========================================
// ⚙️ CONFIGURATION
// ==========================================
// Toggle this in your .env file: VITE_USE_MOCK=true or false
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

console.log(`🚀 API Mode: ${USE_MOCK ? 'MOCK (Local)' : 'REAL (Backend)'}`);

// ==========================================
// 1️⃣ REAL BACKEND IMPLEMENTATION (Axios)
// ==========================================
const RealAPI = {
  api: axios.create({ baseURL: BACKEND_URL }),

  setAuthToken: (token) => {
    if (token) {
      RealAPI.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('auth_token', token);
    } else {
      delete RealAPI.api.defaults.headers.common['Authorization'];
      localStorage.removeItem('auth_token');
    }
  },

  fetchUserData: async () => (await RealAPI.api.get('/user/me')).data,
  fetchLeaderboard: async () => (await RealAPI.api.get('/leaderboard')).data,
  
  fetchSavingsStats: async () => {
    const stats = (await RealAPI.api.get('/user/savings')).data;
    // Calculate balance if missing
    if (stats.balance === undefined) {
      const user = (await RealAPI.api.get('/user/me')).data;
      const balance = (user.income || 0) - (stats.totalSpent || 0);
      return { ...stats, balance };
    }
    return stats;
  },

  fetchTransactions: async () => (await RealAPI.api.get('/transactions/my')).data,
  
  addTransaction: async (txData) => {
    return (await RealAPI.api.post('/transactions', { ...txData, type: 'EXPENSE' })).data;
  },

  parseSMS: async (smsText) => {
    return (await RealAPI.api.post('/transactions/sms', { smsText })).data;
  },

  fetchGoals: async () => (await RealAPI.api.get('/goals')).data,
  
  addGoal: async (goalData) => (await RealAPI.api.post('/goals', goalData)).data,
  
  addGoalProgress: async (id, amount) => {
    return (await RealAPI.api.patch(`/goals/${id}/progress`, { amount })).data;
  },

  fetchGroups: async () => (await RealAPI.api.get('/groups/my')).data,

  createGroup: async (groupData) => (await RealAPI.api.post('/groups', groupData)).data,

  joinGroup: async (groupCode) => (await RealAPI.api.post('/groups/join', { groupCode })).data,

  getAIAdvice: async () => (await RealAPI.api.get('/ai/recommend')).data,

  updateProfile: async (data) => (await RealAPI.api.patch('/user/profile', data)).data,
};

// ==========================================
// 2️⃣ MOCK IMPLEMENTATION (Local Storage)
// ==========================================
// Initial Data
const DB_DEFAULTS = {
  user: {
    id: 'user_1',
    name: 'Demo User',
    email: 'demo@fincoach.com',
    points: 150,
    moodState: 'Motivational',
    income: 85000,
    budgetLimit: 30000,
    openingBalance: 15000 
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
      // Mocking the new Goal Structure
      activeGoal: {
        title: 'Community Fund',
        target: 100000,
        progress: 45000,
        deadline: '2025-12-31'
      },
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
    { id: 'user_1', name: 'You', points: 150, moodState: 'Motivational' }, 
  ]
};

const delay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms));

const getDB = (collection) => {
  const data = localStorage.getItem(`fc_${collection}`);
  return data ? JSON.parse(data) : DB_DEFAULTS[collection];
};

const saveDB = (collection, data) => {
  localStorage.setItem(`fc_${collection}`, JSON.stringify(data));
};

const MockAPI = {
  setAuthToken: (token) => {
    if(token) localStorage.setItem('auth_token', token);
    else localStorage.removeItem('auth_token');
  },

  fetchUserData: async () => { await delay(); return getDB('user'); },

  fetchLeaderboard: async () => {
    await delay();
    const user = getDB('user');
    let lb = getDB('leaderboard');
    return lb.map(u => u.id === 'user_1' ? { ...u, points: user.points } : u).sort((a,b) => b.points - a.points);
  },

  fetchSavingsStats: async () => {
    await delay();
    const user = getDB('user');
    const txs = getDB('transactions');
    const totalSpent = txs.filter(t => t.type === 'EXPENSE').reduce((acc, c) => acc + Number(c.amount), 0);
    const savings = Math.max(0, user.income - totalSpent);
    
    return {
      totalSpent,
      savings,
      balance: user.openingBalance + savings,
      budgetLimit: user.budgetLimit,
      message: savings > 5000 ? "Great saving habits! 🟢" : "Watch your spending! 🔴"
    };
  },

  fetchTransactions: async () => { await delay(); return getDB('transactions'); },

  addTransaction: async (txData) => {
    await delay();
    const txs = getDB('transactions');
    const newTx = { ...txData, id: Date.now(), date: new Date().toISOString().split('T')[0], type: 'EXPENSE' };
    txs.unshift(newTx);
    saveDB('transactions', txs);
    return newTx;
  },

  parseSMS: async (smsText) => {
    await delay(1000);
    const amountMatch = smsText.match(/(?:Rs\.?|INR)\s?(\d+(?:,\d+)*)/i);
    const merchantMatch = smsText.match(/at\s+([a-zA-Z0-9\s]+?)(?:\s+on|$)/i);
    
    if (amountMatch) {
      return await MockAPI.addTransaction({
        merchant: merchantMatch ? merchantMatch[1] : "Unknown Merchant",
        amount: parseInt(amountMatch[1].replace(/,/g, '')),
        category: 'Uncategorized'
      });
    }
    throw new Error("Could not parse SMS");
  },

  fetchGoals: async () => { await delay(); return getDB('goals'); },

  addGoal: async (goalData) => {
    await delay();
    const goals = getDB('goals');
    const newGoal = { ...goalData, id: Date.now(), progress: 0 };
    goals.push(newGoal);
    saveDB('goals', goals);
    return newGoal;
  },

  addGoalProgress: async (id, amount) => {
    await delay();
    const goals = getDB('goals');
    const index = goals.findIndex(g => g.id === id);
    if (index !== -1) {
      goals[index].progress += Number(amount);
      saveDB('goals', goals);
    }
    return goals[index];
  },

  fetchGroups: async () => { await delay(); return getDB('groups'); },

  createGroup: async (groupData) => {
    await delay();
    const groups = getDB('groups');
    const newGroup = {
      id: Date.now(),
      name: groupData.name,
      groupCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      totalSaved: 0,
      activeGoal: {
        title: groupData.goalTitle,
        target: parseFloat(groupData.targetAmount),
        progress: 0,
        deadline: groupData.deadline
      },
      members: [{ id: 'user_1', name: 'You', saved: 0 }]
    };
    groups.unshift(newGroup);
    saveDB('groups', groups);
    return newGroup;
  },

  joinGroup: async (groupCode) => {
    await delay();
    const groups = getDB('groups');
    const group = groups.find(g => g.groupCode === groupCode);
    if (!group) throw new Error("Invalid Group Code");
    if (!group.members.find(m => m.id === 'user_1')) {
      group.members.push({ id: 'user_1', name: 'You', saved: 0 });
      saveDB('groups', groups);
    }
    return group;
  },

  getAIAdvice: async () => {
    await delay(1500);
    return { type: 'Motivational', message: "🚀 You're crushing your goals! Have you considered starting an SIP?" };
  },

  updateProfile: async (data) => {
    await delay();
    const user = getDB('user');
    const updated = { ...user, ...data };
    saveDB('user', updated);
    return updated;
  }
};

// ==========================================
// 3️⃣ UNIFIED EXPORT
// ==========================================
export const setAuthToken = (t) => USE_MOCK ? MockAPI.setAuthToken(t) : RealAPI.setAuthToken(t);
export const fetchUserData = () => USE_MOCK ? MockAPI.fetchUserData() : RealAPI.fetchUserData();
export const fetchLeaderboard = () => USE_MOCK ? MockAPI.fetchLeaderboard() : RealAPI.fetchLeaderboard();
export const fetchSavingsStats = () => USE_MOCK ? MockAPI.fetchSavingsStats() : RealAPI.fetchSavingsStats();
export const fetchTransactions = () => USE_MOCK ? MockAPI.fetchTransactions() : RealAPI.fetchTransactions();
export const addTransaction = (d) => USE_MOCK ? MockAPI.addTransaction(d) : RealAPI.addTransaction(d);
export const parseSMS = (t) => USE_MOCK ? MockAPI.parseSMS(t) : RealAPI.parseSMS(t);
export const fetchGoals = () => USE_MOCK ? MockAPI.fetchGoals() : RealAPI.fetchGoals();
export const addGoal = (d) => USE_MOCK ? MockAPI.addGoal(d) : RealAPI.addGoal(d);
export const addGoalProgress = (i, a) => USE_MOCK ? MockAPI.addGoalProgress(i, a) : RealAPI.addGoalProgress(i, a);
export const fetchGroups = () => USE_MOCK ? MockAPI.fetchGroups() : RealAPI.fetchGroups();
export const createGroup = (d) => USE_MOCK ? MockAPI.createGroup(d) : RealAPI.createGroup(d);
export const joinGroup = (c) => USE_MOCK ? MockAPI.joinGroup(c) : RealAPI.joinGroup(c);
export const getAIAdvice = () => USE_MOCK ? MockAPI.getAIAdvice() : RealAPI.getAIAdvice();
export const updateProfile = (d) => USE_MOCK ? MockAPI.updateProfile(d) : RealAPI.updateProfile(d);

export default USE_MOCK ? MockAPI : RealAPI;