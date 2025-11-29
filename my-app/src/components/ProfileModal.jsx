import React, { useState, useEffect } from 'react';
import { X, LogOut, Save, Wallet, HelpCircle } from 'lucide-react';

const ProfileModal = ({ user, isOpen, onClose, onLogout, onUpdateProfile }) => {
  const [formData, setFormData] = useState({
    income: '',
    budgetLimit: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form safely
  useEffect(() => {
    if (user) {
      setFormData({
        income: user.income || '',
        budgetLimit: user.budgetLimit || ''
      });
    }
  }, [user, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await onUpdateProfile({
      income: parseFloat(formData.income),
      budgetLimit: parseFloat(formData.budgetLimit)
    });
    setIsSaving(false);
    onClose();
  };

  // FIX: Only check isOpen. Do not block if user is null.
  if (!isOpen) return null;

  const userName = user?.name || 'Guest User';
  const userEmail = user?.email || 'No email linked';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md mx-4 shadow-2xl overflow-hidden animate-scale-in">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1 transition"
          >
            <X size={24} />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl border-2 border-white/50 backdrop-blur-md font-bold">
              {userInitial}
            </div>
            <div>
              <h2 className="text-xl font-bold">{userName}</h2>
              <p className="text-sm text-white/80">{userEmail}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Financial Settings */}
            <div>
              <h3 className="text-gray-800 font-bold mb-3 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-blue-600" />
                Financial Settings
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Monthly Income</label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                    <input
                      type="number"
                      value={formData.income}
                      onChange={(e) => setFormData({...formData, income: e.target.value})}
                      className="w-full pl-7 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-gray-700"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Budget Limit</label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                    <input
                      type="number"
                      value={formData.budgetLimit}
                      onChange={(e) => setFormData({...formData, budgetLimit: e.target.value})}
                      className="w-full pl-7 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold text-gray-700"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button 
              type="submit"
              disabled={isSaving}
              className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-black transition flex items-center justify-center gap-2"
            >
              {isSaving ? 'Saving...' : <><Save size={18} /> Save Changes</>}
            </button>
          </form>

          {/* Divider */}
          <div className="h-px bg-gray-200 my-5"></div>

          {/* Links Section */}
          <div className="space-y-3">
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()} // Placeholder logic
              className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition font-semibold cursor-pointer"
            >
              <HelpCircle size={20} />
              Financial Tips
            </a>

            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-red-100 text-red-600 hover:bg-red-50 transition font-bold"
            >
              <LogOut size={20} /> 
              Log Out
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileModal;