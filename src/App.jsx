import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import Profile from "./components/profile";
import Register from "./pages/registrationPage";
import LoginForm from "./pages/loginPage";
import Home from "./pages/Home";
import CryptoChart from "./components/CryptoChart";
import ProfilePage from "./components/profile";
import StakingPage from "./components/stakingPage";
import Staking from './components/Staking'
import NewsPage from "./components/news";
import NewsDetail from "./components/newsDetail";
import ChatComponent from "./components/ChatComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Routes> {/* ✅ No <Router> here */}
      <Route path="/" element={<LoginForm />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/crypto/:id" element={<CryptoChart />} /> 
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/staking" element={<StakingPage />} />
      <Route path="/stake" element={<Staking />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/newsdetail/:id" element={<NewsDetail />} />
    </Routes>
    <ChatComponent/>
    </>
  );
}

export default App;
