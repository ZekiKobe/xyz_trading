import React, { useState } from 'react';

const ChangePassword = () => {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderForm = () => {
    return (
      <form className="space-y-4 w-full">
        <div>
          <label className="block text-gray-300">
            {activeTab === 'login' ? 'Original Password' : 'Transaction Password'}
          </label>
          <input
            type="password"
            className="mt-1 block w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-green-500"
            placeholder={activeTab === 'login' ? 'Enter the original password' : 'Enter the transaction password'}
            required
          />
        </div>
        <div>
          <label className="block text-gray-300">
            {activeTab === 'login' ? 'New Password' : 'New Transaction Password'}
          </label>
          <input
            type="password"
            className="mt-1 block w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-green-500"
            placeholder={activeTab === 'login' ? 'Enter the new password (8 or more characters)' : 'Enter the new transaction password'}
            required
          />
        </div>
        <div>
          <label className="block text-gray-300">
            {activeTab === 'login' ? 'Confirm Password' : 'Confirm Transaction Password'}
          </label>
          <input
            type="password"
            className="mt-1 block w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-green-500"
            placeholder={activeTab === 'login' ? 'Re-enter the new password' : 'Re-enter the new transaction password'}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-green-500 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-200"
        >
          Confirm Modification
        </button>
      </form>
    );
  };

  return (
    <div className="bg-gray-900 flex flex-col items-center min-h-screen w-full px-4">
      <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl p-6 md:p-12 mt-10">
        <div className="flex justify-center mb-6 border-b border-gray-600 pb-3">
          <button
            onClick={() => handleTabClick('login')}
            className={`px-4 py-2 font-semibold ${activeTab === 'login' ? 'text-white border-b-2 border-green-500' : 'text-gray-400'}`}
          >
            Login Password
          </button>
          <button
            onClick={() => handleTabClick('transaction')}
            className={`px-4 py-2 font-semibold ${activeTab === 'transaction' ? 'text-white border-b-2 border-green-500' : 'text-gray-400'}`}
          >
            Transaction Password
          </button>
        </div>
        {renderForm()}
      </div>
    </div>
  );
};

export default ChangePassword;
