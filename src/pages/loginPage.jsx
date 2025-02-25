import React from "react";

const Login = () => {
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
            Login Account
          </h2>
          <form action={"/home"}>
            <div className="flex flex-col items-start gap-4">
              <label className="text-white block">Email</label>
              <input
                type="email"
                placeholder="Input Email Account"
                className="w-full p-3 bg-gray-900 text-white rounded-md"
              />
            </div>
            <div className="flex flex-col items-start gap-4">
              <label className="text-white block">Password</label>
              <input
                type="password"
                placeholder="Input Login Password"
                className="w-full p-3 bg-gray-900 text-white rounded-md"
              />
            </div>
            <button className="w-full bg-green-500 text-white p-3 rounded-md text-lg mt-4">
              Login
            </button>
            <p className="text-white text-center mt-4">
              No account yet?{" "}
              <a href="/register" className="text-blue-400">
                Register Now
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
