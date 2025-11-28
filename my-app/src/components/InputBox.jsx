import React, { useState } from 'react';
import { Send, Mic } from 'lucide-react';

const InputBox = ({ value, onChange, onSubmit, disabled, onMicClick }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="max-w-2xl mx-auto px-4 sticky bottom-4 z-40">
      <div className="relative">
        
        {/* === SIRI GLOW BOUNDARY === */}
        {/* Glows when input is focused */}
        <div 
          className={`absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-md transition-all duration-500 ${
            isFocused ? 'opacity-100 animate-pulse scale-[1.02]' : 'opacity-0 scale-100'
          }`} 
        ></div>

        {/* Main Input Container */}
        <div className="relative flex items-center gap-2 bg-white rounded-full shadow-2xl p-2 border border-gray-100 transition-all">
          <input
            type="text"
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
            placeholder="Type a message..."
            disabled={disabled}
            className="flex-1 px-4 py-2 outline-none bg-transparent text-sm md:text-base min-w-0"
          />
          
          {/* 🎙️ SMALL MIC BUTTON */}
          <button
            onClick={onMicClick}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all active:scale-95"
            title="Tap to Speak"
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* Send Button */}
          <button
            onClick={onSubmit}
            disabled={disabled || !value.trim()}
            className={`rounded-full p-2 md:p-3 transition-all shadow-md shrink-0 text-white ${
              disabled || !value.trim() 
                ? 'bg-gray-300 cursor-not-allowed scale-100' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105'
            }`}
          >
            <Send className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputBox;