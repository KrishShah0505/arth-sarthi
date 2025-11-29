import React, { useState } from "react";
import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";

export const financialFaqs = [
  {
    question: "How do I make better financial decisions instead of acting on impulse?",
    answer: `
Every financial choice has an opportunity cost.  
Before spending or investing, pause and think about what you are giving up.  
Buying something on impulse—like a phone on EMI—means losing the chance to invest that same money.  
Smart investing begins with mindful decision-making, not rushing into what others are doing.
    `
  },

  {
    question: "Is education really considered an investment?",
    answer: `
Absolutely. Your skills are your highest-return asset.  
Better education and training lead to higher salaries, stronger job security, and more opportunities.  
Investing in yourself is the first step to investing in your future wealth.
    `
  },

  {
    question: "Why is understanding my real income important before investing?",
    answer: `
Your gross salary is not your real income.  
Taxes, PF, insurance, and deductions reduce your take-home pay.  
When you know your true disposable income, you can budget realistically, avoid stress, and invest confidently.
    `
  },

  {
    question: "How do I build a habit of saving consistently?",
    answer: `
Think of saving as paying your future self first.  
Start with a small auto-transfer—₹500 to ₹2000 monthly.  
Over time, you'll build an emergency fund and create the foundation needed for long-term investments.
    `
  },

  {
    question: "Why do investors need a budget?",
    answer: `
A budget helps you track spending, avoid financial leaks, and free up money for investing.  
Most people don't lack money—they lack a plan.  
A simple monthly budget can greatly improve your financial progress.
    `
  },

  {
    question: "How do I start investing safely as a beginner?",
    answer: `
Start with safe, diversified options like mutual funds, SIPs, and index funds.  
Avoid investing based on friends or influencers.  
Learn the basics, start small, and diversify your portfolio to reduce risk.
    `
  },

  {
    question: "Is credit good or bad for investing?",
    answer: `
Credit can help or harm you depending on how you use it.  
Good credit builds assets (home, car), but bad credit leads to debt traps.  
Keep credit card usage below 30%, pay full dues monthly, and avoid loans for luxury purchases.
    `
  },

  {
    question: "How do I avoid investment scams?",
    answer: `
Avoid anything that promises guaranteed high returns or zero risk.  
Research companies, check SEBI registration, and never trust unsolicited investment messages.  
If something sounds too good to be true, it probably is.
    `
  }
];


const FinancialTipsFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="w-8 h-8 text-yellow-400" />
        <h2 className="text-2xl font-bold">Financial Wellness Tips</h2>
      </div>

      <div className="space-y-3">
        {financialTips.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl border border-gray-200"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center p-4 text-left font-semibold text-lg"
            >
              <span>{item.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {openIndex === index && (
              <div className="p-4 pt-0 text-gray-700 leading-relaxed animate-fadeIn">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialTipsFAQ;
