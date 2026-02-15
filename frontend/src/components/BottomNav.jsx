import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="bottom-nav">
      <button className={`nav-item ${getActiveClass('/')}`} onClick={() => navigate('/')}>
        <span>🏠</span>
        <span>Home</span>
      </button>
      <button className={`nav-item ${getActiveClass('/history')}`} onClick={() => navigate('/history')}>
        <span>📋</span>
        <span>History</span>
      </button>
      <button className={`nav-item scan-btn`} onClick={() => navigate('/scan')}>
        <span>📷</span>
        <span>SCAN</span>
      </button>
      <button className={`nav-item ${getActiveClass('/services')}`} onClick={() => navigate('/services')}>
        <span>🛠️</span>
        <span>Services</span>
      </button>
      <button className={`nav-item ${getActiveClass('/profile')}`} onClick={() => navigate('/profile')}>
        <span>👤</span>
        <span>Profile</span>
      </button>
    </nav>
  );
};

export default BottomNav;