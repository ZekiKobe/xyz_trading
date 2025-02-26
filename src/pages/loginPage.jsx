import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate(); // Use useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      loginPassword,
    };

    try {
      const response = await fetch("https://xyztrading-api.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/home'); // Use navigate instead of history.push
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="hidden lg:flex w-1/2 bg-[#1a1a3d] justify-center items-center">
        <img
          src="src/assets/logo.png"
          alt="Uniswap"
          className="max-w-[80%] max-h-[80%]"
        />
      </div>

      <div className="w-full lg:w-1/2 flex justify-center items-center bg-[#0f172a] p-0">
        <div className="w-full max-w-md">
          <h2 className="text-white text-2xl font-semibold text-center mb-6">
            Login Account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-start gap-4">
              <label className="text-white block">Email</label>
              <input
                type="email"
                placeholder="Input Email Account"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-900 text-white rounded-md"
              />
            </div>
            <div className="flex flex-col items-start gap-4">
              <label className="text-white block">Password</label>
              <input
                type="password"
                placeholder="Input Login Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full p-3 bg-gray-900 text-white rounded-md"
              />
            </div>
            <button type="submit" className="w-full bg-green-500 text-white p-3 rounded-md text-lg mt-4">
              Login
            </button>
            
            <p className="text-white text-center mt-4">
              No account yet?{" "}
              <Link to='/register'><span className="text-blue-400">
                Register Now
              </span></Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;