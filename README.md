## <h1> Arth-Saarthi: The AI Financial Charioteer </h1>

<i>A hyper-personalized, agentic AI financial coach for the gig and informal economy.</i>

Built for Mumbai Hacks 2025 – FinTech / Agentic AI Challenge

<br>Problem Statement:

Individuals with irregular or volatile income—gig workers, freelancers, and informal sector employees—rarely receive financial guidance tailored to their behavior.
Traditional finance apps offer generic charts and static insights, failing to adapt to real-world spending patterns.

Goal: Build an agentic AI that continuously learns from user behavior, analyzes financial patterns, and proactively delivers personalized recommendations.

<br><br><b>Solution Overview</b>
Arth-Sarthi goes beyond simple expense tracking.
It interprets user behavior, spending context, and emotional patterns to deliver adaptive financial coaching.
Powered by Google Gemini and a custom-built Financial Mood Engine, the system provides intelligent, timely nudges that help users stay financially disciplined.

<u><br><br>Key Features</u>
- Mood-Based Financial Analysis
  > Detects emotional spending behaviors (e.g., Impulsive, Stressed, Disciplined).
  > Adjusts tone and advice style based on user mood.
- Voice-First Interface
  > Users can log expenses or request insights through natural voice input.
  > Example: “I spent ₹500 at Starbucks” → automatically parsed and categorized.
- Agentic Intelligence
  > LLM-powered auto-categorization of transactions.
  > Proactive, context-aware recommendations.
  > Localized knowledge graph for Mumbai-focused financial tips.
- Gamification & Social Features
  > XP, levels, and daily challenges encourage consistent financial discipline.
  > Community savings circles, such as Mumbai Savers Squad, enhance motivation.
- SMS & Data Integration
  > Extracts structured data from bank/UPI messages to automate transaction tracking.

📸 Screenshots
<img src="./screenshots/dashboard.png" width="600"/>
<img src="./screenshots/chat.png" width="600"/>
<img src="./screenshots/leaderboard.png" width="600"/>


🛠 Tech Stack
> Frontend: React (Vite), Tailwind CSS, Lucide React, Framer Motion
> Backend: Node.js, Express.js
> Database: PostgreSQL, Prisma ORM
> AI/ML: Google Gemini API, Custom Mood Engine, SMS NLP Parser
> Authentication: Google OAuth 2.0

Getting Started
```
1. Clone Repository
git clone https://github.com/your-username/arth-sarthi.git
cd arth-sarthi

2. Backend Setup
cd backend3
npm install


Create .env:

DATABASE_URL="postgresql://user:password@localhost:5432/arthsarthi"
GEMINI_API_KEY="your_gemini_key"
GOOGLE_CLIENT_ID="your_google_client_id"
PORT=5000


Run migrations and start:

npx prisma generate
npx prisma db push
npm run dev

3. Frontend Setup
cd my-app
npm install


Create .env:

VITE_GOOGLE_CLIENT_ID="your_google_client_id"
VITE_BACKEND_URL="http://localhost:5000"


Start frontend:

npm run dev
```

🧩 System Architecture
User Input (Voice/Text/SMS)
       ↓
React Frontend
       ↓
Express API + OAuth
       ↓
AI Layer (Gemini, Mood Engine, SMS NLP)
       ↓
PostgreSQL + Prisma ORM

Roadmap
Hindi and Marathi voice support
WhatsApp-based nudges and conversational guidance
Credit score building for gig and informal economy workers

Made with ❤️ by Alcazar for Mumbai Hacks 2025.
