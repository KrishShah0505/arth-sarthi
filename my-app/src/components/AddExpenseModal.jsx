import React, { useState } from 'react';

const AddExpenseModal = ({ onAdd, isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category) return;
    onAdd({ amount: parseFloat(amount), category, note });
    setAmount('');
    setCategory('');
    setNote('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-11/12 max-w-md animate-scale-in">
        <h2 className="text-xl font-bold mb-4">Add Expense</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
