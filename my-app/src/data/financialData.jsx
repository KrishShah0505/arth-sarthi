// ============= DATA LAYER (Simulated Local Knowledge Graph) =============

export const financialKnowledgeGraph = {
  banks: {
    'HDFC': { monthlyFee: 0, atmFee: 20, minBalance: 10000, rating: 4.2 },
    'SBI': { monthlyFee: 0, atmFee: 15, minBalance: 5000, rating: 4.0 },
    'ICICI': { monthlyFee: 100, atmFee: 20, minBalance: 10000, rating: 4.1 },
    'Axis': { monthlyFee: 0, atmFee: 20, minBalance: 5000, rating: 4.3 },
  },
  schemes: {
    'PM Jan Dhan Yojana': { type: 'Banking', benefit: 'Zero balance account + ₹10L accident insurance', eligibility: 'All citizens' },
    'Sukanya Samriddhi': { type: 'Savings', benefit: '8.2% interest for girl child education', eligibility: 'Parents of girls < 10 years' },
    'PMMY (Mudra Loan)': { type: 'Business', benefit: 'Loans up to ₹10L for small businesses', eligibility: 'Small entrepreneurs' },
  },
  insights: {
    'entertainment': { avgSpending: 5000, recommendation: 'Try to keep it under ₹3000/month', riskLevel: 'medium' },
    'food': { avgSpending: 8000, recommendation: 'Cook at home 4x more per week saves ₹2400', riskLevel: 'low' },
  }
};

export const moodProfiles = {
  neutral: {
    greeting: "Hey there! Let's take a calm look at your spending today. 💙",
    tone: "balanced, objective, and steady",
    color: "bg-blue-500",
    gradient: "from-blue-500 to-sky-300"
  },

  impulsive: {
    greeting: "Hold on — I spotted something interesting in your spending! ⚡",
    tone: "alert, analytical, and quick-to-act",
    color: "bg-purple-500",
    gradient: "from-purple-500 to-fuchsia-400"
  },

  casual: {
    greeting: "All good! Let's keep things smooth and fun 😄",
    tone: "relaxed, friendly, and easygoing",
    color: "bg-pink-400",
    gradient: "from-pink-400 to-orange-400"
  },

  saver: {
    greeting: "Great job managing your money! Let’s keep your savings strong 💛",
    tone: "supportive, reassuring, and encouraging",
    color: "bg-amber-400",
    gradient: "from-amber-500 to-yellow-300"
  },

  disciplined: {
    greeting: "Your consistency is impressive — let’s optimize even further 💼",
    tone: "focused, strategic, and structured",
    color: "bg-emerald-600",
    gradient: "from-emerald-600 to-teal-400"
  },
};


export const leaderboardData = [
  { rank: 1, name: 'Priya S.', points: 2840, level: 12, avatar: '👩‍💼', streak: 45 },
  { rank: 2, name: 'Rahul K.', points: 2650, level: 11, avatar: '👨‍💻', streak: 38 },
  { rank: 3, name: 'You', points: 2420, level: 10, avatar: '🎯', streak: 30, isUser: true },
  { rank: 4, name: 'Anjali M.', points: 2180, level: 9, avatar: '👩‍🎓', streak: 25 },
  { rank: 5, name: 'Vikram D.', points: 1950, level: 9, avatar: '👨‍🔧', streak: 22 },
];

export const circleData = {
  name: "Mumbai Savers Squad",
  members: 8,
  totalGoal: 100000,
  currentProgress: 67500,
  yourContribution: 15000,
  topSavers: [
    { name: 'Priya S.', amount: 22000, avatar: '👩‍💼' },
    { name: 'You', amount: 15000, avatar: '🎯', isUser: true },
    { name: 'Rahul K.', amount: 12500, avatar: '👨‍💻' },
  ]
};