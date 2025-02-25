import React from "react";

const Register = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Side - Image Section */}
      <div className="hidden lg:flex w-1/2 bg-[#1a1a3d] justify-center items-center">
        <img
          src="src/assets/logo.png"
          alt="Uniswap"
          className="max-w-[80%] max-h-[80%]"
        />
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-[#0f172a] p-0">
        <div className="w-full max-w-md">
          <h2 className="text-white text-2xl font-semibold text-center mb-6">
            Create Account
          </h2>
          <form>
            <div className="flex flex-col items-start gap-4">
              <label className="text-white block">Email</label>
              <input
                type="email"
                placeholder="Input Email Account"
                className="w-full p-3 bg-gray-900 text-white rounded-md"
              />
            </div>
            <div className="flex flex-col items-start gap-4">
              <label className="text-white block">Verification Code</label>
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  placeholder="Enter Verification Code"
                  className="flex-1 p-3 bg-gray-900 text-white rounded-md"
                />
                <button className="bg-green-500 text-white px-4 py-3 rounded-md whitespace-nowrap">
                  Get Code
                </button>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4">
              <label className="text-white block">Login Password</label>
              <input
                type="password"
                placeholder="Set Login Password (8+ characters)"
                className="w-full p-3 bg-gray-900 text-white rounded-md"
              />
            </div>
            <div className="flex flex-col items-start gap-4">
              <label className="text-white block ">Funds Password</label>
              <input
                type="password"
                placeholder="Set Funds Password (6-digit number)"
                className="w-full p-3 bg-gray-900 text-white rounded-md"
              />
            </div>
            <div className="flex flex-col items-start gap-4">
              <label className="text-white block ">Invitation Code</label>
              <input
                type="text"
                placeholder="Enter Invitation Code"
                className="w-full p-3 bg-gray-900 text-white rounded-md"
              />
            </div>
            <p className="text-white text-center gap-4">
              Already have an account?{" "}
              <a href="/" className="text-blue-400">
                Go to login
              </a>
            </p>
            <button className="w-full bg-green-500 text-white p-3 rounded-md text-lg">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
