import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const financialFaqs = [
  {
    question: "How do I make better financial decisions instead of acting on impulse?",
    answer: `Every financial choice has an opportunity cost. Before spending or investing, pause and think about what you are giving up. Buying something on impulse—like a phone on EMI—means losing the chance to invest that same money.`
  },
  {
    question: "Is education really considered an investment?",
    answer: `Absolutely. Your skills are your highest-return asset. Better education and training lead to higher salaries, stronger job security, and more opportunities.`
  },
  {
    question: "Why is understanding my real income important?",
    answer: `Your gross salary is not your real income. Taxes, PF, insurance, and deductions reduce your take-home pay. Knowing your true disposable income helps you budget realistically.`
  },
  {
    question: "How do I build a habit of saving consistently?",
    answer: `Think of saving as paying your future self first. Start with a small auto-transfer—₹500 to ₹2000 monthly. Over time, you'll build an emergency fund.`
  },
  {
    question: "Why do investors need a budget?",
    answer: `A budget helps you track spending, avoid financial leaks, and free up money for investing. Most people don't lack money—they lack a plan.`
  },
  {
    question: "How do I start investing safely as a beginner?",
    answer: `Start with safe, diversified options like mutual funds, SIPs, and index funds. Avoid investing based on friends or influencers. Learn the basics first.`
  },
  {
    question: "Is credit good or bad for investing?",
    answer: `Credit can help or harm you depending on how you use it. Good credit builds assets (home, car), but bad credit leads to debt traps. Keep usage below 30%.`
  },
  {
    question: "How do I avoid investment scams?",
    answer: `Avoid anything that promises guaranteed high returns or zero risk. Research companies, check SEBI registration, and never trust unsolicited messages.`
  }
];

const FinancialTipsFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      <div className="grid gap-4">
        {financialFaqs.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-sm hover:shadow-md rounded-2xl border border-gray-200 overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center p-5 text-left font-bold text-gray-800 hover:bg-gray-50 transition"
            >
              <span className="text-base md:text-lg pr-4 leading-snug">{item.question}</span>
              <div className={`p-2 rounded-full ${openIndex === index ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </button>

            {openIndex === index && (
              <div className="px-5 pb-5 text-gray-600 leading-relaxed text-sm md:text-base animate-fade-in">
                <div className="h-px w-full bg-gray-100 mb-4"></div>
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