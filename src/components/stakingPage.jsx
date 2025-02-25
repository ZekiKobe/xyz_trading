import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Navbar from './navbar';

const StakingPage = () => {
  return (
    <div className="bg-[#0a0f1f] min-h-screen flex flex-col" style={{ width: '100vw' }}>
      <Navbar/>
      {/* Header */}
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold text-white">XYZ Trading</h1>
        <p className="text-lg text-gray-300">Using XYZ for Staking</p>
      </header>

      {/* Description Section */}
      <div className="bg-white rounded-lg shadow-lg p-10 mx-4 max-w-3xl" style={{margin:"auto"}}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold" style={{color:"black"}}>Your Rewards, Explore Opportunities,</h2>
          <h2 className="text-2xl font-semibold" style={{color:"black"}}>And Maintain Self-Custody Of Your Assets.</h2>
        </div>
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="text-green-500 text-3xl mr-4">🌟</div>
            <div>
              <h3 className="font-bold">One-Click Earn</h3>
              <p className="text-gray-600" >
                Easily compound your rewards by automatically subscribing into flexible products daily or locked products when they mature.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="text-green-500 text-3xl mr-4">💰</div>
            <div>
              <h3 className="font-bold">Easy To Make Money</h3>
              <p className="text-gray-600">
                Easy to deposit and make money. Stable income.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="text-green-500 text-3xl mr-4">🔒</div>
            <div>
              <h3 className="font-bold">Fixed-Term Products</h3>
              <p className="text-gray-600">
                Lock assets for a fixed period to earn higher returns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Staking Button */}
      <Link to="/stake">
      <button
    className="mt-8 w-64 bg-green-500 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-200"
  style={{background:"green"}}>
    Staking
  </button>
      </Link>
    </div>
  );
};

export default StakingPage;