import React from "react";
import { Eye } from "lucide-react";

const BalanceCard = ({ balance = 0, growth = "+0%", onClick }) => {
  return (
    <div
      className="
        bg-white/90 
        backdrop-blur-xl 
        border border-white/40
        shadow-[0_8px_30px_rgba(0,0,0,0.12)]
        rounded-3xl 
        p-6 
        cursor-pointer 
        transition 
        hover:shadow-[0_10px_35px_rgba(0,0,0,0.15)]
      "
      onClick={onClick}
    >
      {/* Title + Eye */}
      <div className="flex items-center justify-between">
        <p className="text-gray-700 font-semibold text-lg">Total Balance</p>
        <Eye className="w-5 h-5 text-gray-500" />
      </div>

      {/* Balance */}
      <div className="mt-3">
        <p className="text-4xl font-bold text-gray-900 tracking-tight">
          ₹{balance.toLocaleString()}
        </p>
      </div>

      {/* Growth */}
      <div className="mt-2 flex items-center gap-2 text-green-600 text-sm font-semibold">
        <span className="text-md">↑</span>
        <p>{growth} from last month</p>
      </div>
    </div>
  );
};

export default BalanceCard;
