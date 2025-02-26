import React, { useState, useEffect } from "react";
import { FaCopy } from "react-icons/fa";

const PersonalCenter = () => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [depositProof, setDepositProof] = useState(null);
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [profile, setProfile] = useState(null);
  const depositAddress = "0x1234567890abcdef";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("https://xyztrading-api.onrender.com/api/auth/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`, // Send token for authentication
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          alert("Failed to fetch profile information.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(depositAddress);
    alert("Address copied!");
  };

  if (!profile) {
    return <div>Loading...</div>; // Show loading state while fetching profile
  }

  return (
    <div className="flex flex-col items-center w-full max-w-4xl bg-[#1e253b] p-6 md:p-8 rounded-xl text-center shadow-lg">
      <img
        src="/profile.png"
        alt="Profile"
        className="w-20 h-20 rounded-full mx-auto mb-4 border border-gray-500"
      />
      
      <h3 className="text-xl font-semibold">{profile.email}</h3>
      <p className="text-gray-400 text-sm flex justify-center gap-2 mt-2">
        <span className="bg-[#2d354b] px-3 py-1 rounded-full">UID: {profile.uid}</span>
        <span className="bg-[#2d354b] px-3 py-1 rounded-full">Invitation Code: {profile.invitationCode}</span>
      </p>

      <div className="bg-[#3b4a6b] p-6 rounded-xl mt-6 w-full flex justify-between">
        <div>
          <h4 className="text-lg font-semibold">Account Balance</h4>
          <p className="text-3xl font-bold">{profile.balance} <span className="text-sm">USDT</span></p>
          <p className="text-gray-300 text-sm">0.00 USDT Today</p>
        </div>
        
        <div className="flex gap-4">
          <button onClick={() => setShowWithdrawModal(true)} className="bg-white text-black px-8 py-2 rounded">Withdraw</button>
          <button onClick={() => setShowDepositModal(true)} className="bg-white text-black px-8 py-2 rounded">Deposit</button>
        </div>
      </div>

      <button className="mt-6 border border-green-400 text-green-400 px-10 py-3 rounded-full hover:bg-green-400 hover:text-black transition-all">
        Logout
      </button>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#2d354b] p-6 rounded-xl shadow-lg text-white w-96">
            <h3 className="text-xl mb-4">Deposit USDT</h3>
            <div className="flex items-center justify-between bg-gray-700 p-2 rounded-md mb-4">
              <span>{depositAddress}</span>
              <FaCopy className="cursor-pointer" onClick={handleCopy} />
            </div>
            <input
              type="file"
              className="mb-4 p-2 w-full bg-gray-800 rounded-md"
              onChange={(e) => setDepositProof(e.target.files[0])}
            />
            <button onClick={() => setShowDepositModal(false)} className="w-full bg-green-500 py-2 rounded-md mt-2">Confirm</button>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#2d354b] p-6 rounded-xl shadow-lg text-white w-96">
            <h3 className="text-xl mb-4">Withdraw USDT</h3>
            <input
              type="text"
              className="w-full p-2 bg-gray-800 rounded-md mb-4"
              placeholder="Withdrawal Address"
              value={withdrawAddress}
              onChange={(e) => setWithdrawAddress(e.target.value)}
            />
            <input
              type="number"
              className="w-full p-2 bg-gray-800 rounded-md mb-4"
              placeholder="Amount"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />
            <button onClick={() => setShowWithdrawModal(false)} className="w-full bg-green-500 py-2 rounded-md mt-2">Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalCenter;