import React from "react";

const TopUpRewards = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl text-white max-w-4xl mx-auto">
      <div className="bg-blue-500 p-4 rounded-lg text-center">
        <div className="text-sm font-bold">LVO</div>
        <div className="text-lg font-semibold">Current cumulative total amount</div>
        <div className="text-3xl font-bold">0.00 <span className="text-sm">USDT</span></div>
        <div className="text-sm mt-2">VIP0</div>
        <div className="w-full h-1 bg-gray-300 mt-2">
          <div className="w-1/6 h-1 bg-white"></div>
        </div>
      </div>

      <div className="flex justify-between mt-6 text-gray-400 text-sm border-b border-gray-600 pb-2">
        <span className="text-yellow-400">LV0</span>
        <span>LV1</span>
        <span>LV2</span>
        <span>LV3</span>
        <span>LV4</span>
        <span>LV5</span>
        <span>LV6</span>
        <span>LV7</span>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg mt-6 text-center">
        <div className="text-sm">LV1 Recharge Target: <span className="text-green-400 font-bold">1,000.00 USDT</span></div>
        <div className="flex justify-between mt-4 text-lg">
          <div>
            <div className="font-bold">18.00 USDT</div>
            <div className="text-sm text-gray-400">Giveaway</div>
          </div>
          <div className="font-bold text-white">LV1 Gift Pack</div>
          <div className="text-sm text-gray-400">Customer Service</div>
        </div>
      </div>

      <button className="w-full bg-green-500 text-white py-3 rounded-lg mt-6 font-semibold">
        Recharge upgrade
      </button>
    </div>
  );
};

export default TopUpRewards;
