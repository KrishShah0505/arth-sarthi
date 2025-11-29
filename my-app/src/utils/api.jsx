import axios from 'axios';

// ==========================================
// ⚙️ CONFIGURATION
// ==========================================
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

console.log(`🚀 API Mode: ${USE_MOCK ? 'MOCK (Local)' : 'REAL (Backend)'}`);

// ==========================================
// 1️⃣ REAL BACKEND IMPLEMENTATION
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

  // ... (Existing User/Tx/Goal fetchers remain same)
  fetchUserData: async () => (await RealAPI.api.get('/user/me')).data,
  fetchLeaderboard: async () => (await RealAPI.api.get('/leaderboard')).data,
  fetchSavingsStats: async () => {
    const stats = (await RealAPI.api.get('/user/savings')).data;
    if (stats.balance === undefined) {
      const user = (await RealAPI.api.get('/user/me')).data;
      const balance = (user.income || 0) - (stats.totalSpent || 0);
      return { ...stats, balance };
    }
    return stats;
  },
  fetchTransactions: async () => (await RealAPI.api.get('/transactions/my')).data,
  addTransaction: async (txData) => (await RealAPI.api.post('/transactions', { ...txData, type: 'EXPENSE' })).data,
  parseSMS: async (smsText) => (await RealAPI.api.post('/transactions/sms', { smsText })).data,
  fetchGoals: async () => (await RealAPI.api.get('/goals')).data,
  addGoal: async (goalData) => (await RealAPI.api.post('/goals', goalData)).data,
  addGoalProgress: async (id, amount) => (await RealAPI.api.patch(`/goals/${id}/progress`, { amount })).data,
  getAIAdvice: async () => (await RealAPI.api.get('/ai/recommend')).data,
  updateProfile: async (data) => (await RealAPI.api.patch('/user/profile', data)).data,

  // --- GROUP ENDPOINTS ---
  fetchGroups: async () => (await RealAPI.api.get('/groups/my')).data,
  createGroup: async (groupData) => (await RealAPI.api.post('/groups', groupData)).data,
  joinGroup: async (groupCode) => (await RealAPI.api.post('/groups/join', { groupCode })).data,
  
  // NEW: Leave Group
  leaveGroup: async (groupId) => (await RealAPI.api.post('/groups/leave', { groupId })).data,
  
  // NEW: Contribute Money
  contributeToGroup: async (goalId, amount) => (await RealAPI.api.post('/goals/contribute', { goalId, amount })).data,
};

// ==========================================
// 2️⃣ MOCK IMPLEMENTATION
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
  transactions: [],
  goals: [],
  groups: [
    { 
      id: 'g1', 
      name: 'Mumbai Savers', 
      groupCode: 'MUM123', 
      createdById: 'user_2', // Demo is not admin
      activeGoal: {
        id: 'goal_1',
        title: 'Community Fund',
        target: 100000,
        progress: 45000,
        deadline: '2025-12-31'
      },
      members: [
        { id: 'u2', name: 'Priya', saved: 20000, user: { name: 'Priya' } },
        { id: 'user_1', name: 'You', saved: 15000, user: { name: 'You' } },
        { id: 'u3', name: 'Rahul', saved: 10000, user: { name: 'Rahul' } }
      ]
    }
  ],
  leaderboard: []
};

const delay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms));
const getDB = (collection) => {
  const data = localStorage.getItem(`fc_${collection}`);
  return data ? JSON.parse(data) : DB_DEFAULTS[collection];
};
const saveDB = (collection, data) => localStorage.setItem(`fc_${collection}`, JSON.stringify(data));

const MockAPI = {
  setAuthToken: (token) => localStorage.setItem('auth_token', token),
  
  // ... (Keep existing fetchers for User, Stats, etc.)
  fetchUserData: async () => { await delay(); return getDB('user'); },
  fetchLeaderboard: async () => { await delay(); return []; },
  fetchSavingsStats: async () => { await delay(); return { totalSpent: 0, savings: 5000, balance: 20000 }; },
  fetchTransactions: async () => { await delay(); return getDB('transactions'); },
  addTransaction: async (tx) => { const db = getDB('transactions'); db.unshift(tx); saveDB('transactions', db); return tx; },
  parseSMS: async () => { throw new Error("Mock Parse SMS not impl"); },
  fetchGoals: async () => getDB('goals'),
  addGoal: async (g) => { const db = getDB('goals'); db.push({...g, id: Date.now()}); saveDB('goals', db); },
  addGoalProgress: async () => {},
  getAIAdvice: async () => ({ message: "Mock Advice" }),
  updateProfile: async (d) => { const u = getDB('user'); saveDB('user', {...u, ...d}); return {...u, ...d}; },

  // --- GROUP MOCK LOGIC ---
  fetchGroups: async () => { await delay(); return getDB('groups'); },

  createGroup: async (groupData) => {
    await delay();
    const groups = getDB('groups');
    const newGroup = {
      id: `g_${Date.now()}`,
      name: groupData.name,
      groupCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      createdById: 'user_1', // Current user is Creator
      activeGoal: {
        id: `gg_${Date.now()}`,
        title: groupData.goalTitle,
        target: parseFloat(groupData.targetAmount),
        progress: 0,
        deadline: groupData.deadline
      },
      members: [{ id: 'user_1', name: 'You', saved: 0, user: { name: 'You' } }]
    };
    groups.unshift(newGroup);
    saveDB('groups', groups);
    return newGroup;
  },

  joinGroup: async (groupCode) => {
    await delay();
    const groups = getDB('groups');
    // For mock, just duplicate the first group if code matches 'MUM123' or create a dummy one
    const newGroup = { ...groups[0], id: `g_join_${Date.now()}`, name: 'Joined Group ' + groupCode };
    groups.push(newGroup);
    saveDB('groups', groups);
    return newGroup;
  },

  leaveGroup: async (groupId) => {
    await delay();
    let groups = getDB('groups');
    groups = groups.filter(g => g.id !== groupId);
    saveDB('groups', groups);
    return { message: "Left group" };
  },

  contributeToGroup: async (goalId, amount) => {
    await delay();
    const groups = getDB('groups');
    // Find group containing this goal
    const group = groups.find(g => g.activeGoal?.id === goalId);
    if (group) {
      group.activeGoal.progress += parseFloat(amount);
      // Update member 'You' contribution
      const me = group.members.find(m => m.id === 'user_1' || m.name === 'You');
      if (me) me.saved += parseFloat(amount);
      saveDB('groups', groups);
    }
    return { message: "Contributed" };
  }
};

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
export const leaveGroup = (id) => USE_MOCK ? MockAPI.leaveGroup(id) : RealAPI.leaveGroup(id);
export const contributeToGroup = (id, amt) => USE_MOCK ? MockAPI.contributeToGroup(id, amt) : RealAPI.contributeToGroup(id, amt);

export default USE_MOCK ? MockAPI : RealAPI;