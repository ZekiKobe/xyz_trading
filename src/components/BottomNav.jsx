import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaRegStar, FaNewspaper, FaUser } from "react-icons/fa";
import '../components/CSS/BottomNav.css'

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <Link to="/home" className={`nav-item ${location.pathname === "/home" ? "active" : ""}`}>
        <FaHome />
        <span>Home</span>
      </Link>
      <Link to="/staking" className={`nav-item ${location.pathname === "/staking" ? "active" : ""}`}>
        <FaRegStar />
        <span>Staking</span>
      </Link>
      <Link to="/news" className={`nav-item ${location.pathname === "/news" ? "active" : ""}`}>
        <FaNewspaper />
        <span>News</span>
      </Link>
      <Link to="/profile" className={`nav-item ${location.pathname === "/profile" ? "active" : ""}`}>
        <FaUser />
        <span>Profile</span>
      </Link>
    </nav>
  );
};

export default BottomNav;