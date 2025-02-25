import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import Navbar from './navbar';

// Tether SVG Icon
const TetherIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-1 text-green-500"
  >
    <path d="M12 2L12 22" />
    <path d="M4 12H20" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const liquidityOptions = [
  { version: 'V1', totalRevenue: '0.68%', dailyYield: '0.23%', stakingLimit: '100 - 1000', stakingTime: '3 Days' },
  { version: 'V2', totalRevenue: '1.00%', dailyYield: '0.14%', stakingLimit: '100 - 1000', stakingTime: '7 Days' },
  { version: 'V3', totalRevenue: '14.00%', dailyYield: '0.47%', stakingLimit: '5000 - 10000', stakingTime: '30 Days' },
  { version: 'V4', totalRevenue: '240.00%', dailyYield: '2.67%', stakingLimit: '10000 - 50000', stakingTime: '180 Days' },
  { version: 'V5', totalRevenue: '10.00%', dailyYield: '0.34%', stakingLimit: '10000 - 50000', stakingTime: '60 Days' },
  { version: 'V6', totalRevenue: '20.00%', dailyYield: '0.67%', stakingLimit: '50000 - 100000', stakingTime: '90 Days' },
  { version: 'V7', totalRevenue: '198.00%', dailyYield: '0.78%', stakingLimit: '100000 - 500000', stakingTime: '360 Days' },
];

const StakingPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedLiquidity, setSelectedLiquidity] = useState(null);
  const [stakingAmount, setStakingAmount] = useState('');

  const handleLiquidityClick = (liquidity) => {
    setSelectedLiquidity(liquidity);
    setModalOpen(true);
  };

  const handleStake = () => {
    console.log(`Staking ${stakingAmount} USDT for ${selectedLiquidity.version}`);
    setModalOpen(false);
  };

  return (
    <div className="bg-[#0a0f1f] min-h-screen flex flex-col" style={{ width: '100vw' }}>
        <Navbar/>
      {/* Header */}
      <div className="flex flex-col items-center w-full bg-[#1e253b] p-6">
        <div className="flex justify-between w-full max-w-6xl">
          <div>
            <h5 className="text-2xl font-bold">Current Total Staking</h5>
            <p className="text-xl">0.00 USDT</p>
          </div>
          <div>
            <h5 className="text-2xl font-bold">Cumulative Rewards</h5>
            <p className="text-xl">0.00 USDT Today</p>
          </div>
        </div>
      </div>

      {/* Liquidity Options */}
      <div className="flex-grow flex flex-col items-center p-4">
        <div className="w-full max-w-6xl bg-[#1e253b] rounded-lg shadow-lg p-4 overflow-x-auto">
          <h3 className="text-2xl font-semibold mb-4">Add Liquidity</h3>
          <table className="min-w-full text-left">
            <thead>
              <tr>
                <th className="border-b py-2 px-4">Version</th>
                <th className="border-b py-2 px-4">Total Revenue</th>
                <th className="border-b py-2 px-4">Daily Yield</th>
                <th className="border-b py-2 px-4">Staking Limit</th>
                <th className="border-b py-2 px-4">Staking Time</th>
              </tr>
            </thead>
            <tbody>
              {liquidityOptions.map((liquidity, index) => (
                <tr
                  key={index}
                  className="cursor-pointer hover:bg-[#121a2a] transition duration-200"
                  onClick={() => handleLiquidityClick(liquidity)}
                >
                  <td className="border-b py-2 px-4 flex items-center">
                    <TetherIcon />
                    {liquidity.version}
                  </td>
                  <td className="border-b py-2 px-4">{liquidity.totalRevenue}</td>
                  <td className="border-b py-2 px-4">{liquidity.dailyYield}</td>
                  <td className="border-b py-2 px-4">{liquidity.stakingLimit}</td>
                  <td className="border-b py-2 px-4">{liquidity.stakingTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black rounded-lg p-6 w-80 mx-4">
            <h2 className="text-xl font-bold mb-4">Enter Staking Amount</h2>
            <label className="block mb-2">Staking Amount (USDT)</label>
            <input
              type="number"
              className="border p-2 rounded w-full mb-4"
              placeholder="Input Amount"
              value={stakingAmount}
              onChange={(e) => setStakingAmount(e.target.value)}
            />
            <div className="mb-4">
              <p className="flex justify-between"><strong>Staking Limit:</strong> {selectedLiquidity?.stakingLimit}</p>
              <p className="flex justify-between"><strong>Daily Yield:</strong> {selectedLiquidity?.dailyYield}</p>
              <p className="flex justify-between"><strong>Total Revenue:</strong> {selectedLiquidity?.totalRevenue}</p>
              <p className="flex justify-between"><strong>Staking Time:</strong> {selectedLiquidity?.stakingTime}</p>
            </div>
            <div className="flex justify-between">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                onClick={handleStake}
              >
                Confirm
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StakingPage;