import React from 'react';
import { Send } from 'lucide-react';

const InputBox = ({ value, onChange, onSubmit, disabled }) => (
  <div className="max-w-2xl mx-auto px-4 sticky bottom-4 z-40">
    <div className="flex gap-2 bg-white rounded-full shadow-2xl p-2 border border-gray-100 focus-within:border-blue-500 transition-all focus-within:shadow-xl focus-within:ring-2 focus-within:ring-blue-100">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
        placeholder="Type a message..."
        disabled={disabled}
        className="flex-1 px-4 py-2 outline-none bg-transparent text-sm md:text-base min-w-0"
      />
      <button
        onClick={onSubmit}
        disabled={disabled || !value.trim()}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-2 md:p-3 hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:scale-100 transition-all shadow-md shrink-0"
      >
        <Send className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </div>
  </div>
);

export default InputBox;