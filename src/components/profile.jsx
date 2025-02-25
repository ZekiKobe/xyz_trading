import React, { useState } from "react";
import { 
  FaUser, FaGift, FaShieldAlt, FaHistory, FaFileContract, 
  FaLayerGroup, FaKey 
} from "react-icons/fa";
import Navbar from "./navbar";
import ChangePassword from "./changePassword";
import PersonalCenter from './personalProfile';
import TopUpRewards from './topUp';
import Identity from './Identity';
import './CSS/profile.css'

const ProfilePage = () => {
  const [activePage, setActivePage] = useState("personal-center"); // Default active page

  const renderContent = () => {
    switch (activePage) {
      case "personal-center":
        return <PersonalCenter />;
      case "top-up-rewards":
        return <TopUpRewards />;
      case "real-name-authentication":
        return <Identity />;
      case "billing-history":
        return <div className="text-center p-6"><h2 className="text-2xl font-bold">Billing History</h2></div>;
      case "second-contract-order":
        return <div className="text-center p-6"><h2 className="text-2xl font-bold">Second Contract Order</h2></div>;
      case "liquidity-pool-order":
        return <div className="text-center p-6"><h2 className="text-2xl font-bold">Liquidity Pool Order</h2></div>;
      case "change-password":
        return <ChangePassword />;
      default:
        return <div className="text-center p-6"><h2 className="text-2xl font-bold">Welcome</h2></div>;
    }
  };

  return (
    <div className="bg-[#0a0f1f] min-h-screen text-white flex flex-col" style={{ width: '100vw' }}>
      {/* Full-width Navbar */}
      <Navbar />

      <div className="flex flex-row w-full flex-1">
        
        {/* Sidebar */}
        <div className="w-72 bg-[#1a2235] p-5 h-fit rounded-xl" style={{marginLeft:"40px"}}>
          <h2 className="text-2xl font-bold text-white mb-6">XYZ Trading</h2>
          <ul className="space-y-4">
            {/** Sidebar items */}
            {[
              { icon: <FaUser />, label: "Personal Center", key: "personal-center" },
              { icon: <FaGift />, label: "Top-up Rewards", key: "top-up-rewards" },
              { icon: <FaShieldAlt />, label: "Real Name Authentication", key: "real-name-authentication" },
              { icon: <FaHistory />, label: "Billing History", key: "billing-history" },
              { icon: <FaFileContract />, label: "Second Contract Order", key: "second-contract-order" },
              { icon: <FaLayerGroup />, label: "Liquidity Pool Order", key: "liquidity-pool-order" },
              { icon: <FaKey />, label: "Change Password", key: "change-password" },
            ].map(item => (
              <li 
                key={item.key}
                className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer ${activePage === item.key ? "bg-[#121a2a] text-green-400" : "text-gray-400 hover:text-white"}`}
                onClick={() => setActivePage(item.key)}
              >
                {item.icon} {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content with Left Margin */}
        <div className="flex-1 flex flex-col items-center p-6 ml-4">
          <div className="w-full max-w-4xl bg-[#1e253b] p-6 rounded-xl shadow-lg">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;