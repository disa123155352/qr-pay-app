import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [balance, setBalance] = useState({ USDT: 0, TON: 0, BTC: 0 });

  useEffect(() => {
   axios.get('https://qr-pay-backend-rwmw.onrender.com/api/balance')
      .then(res => setBalance(res.data))
      .catch(err => console.error('Ошибка загрузки баланса', err));
  }, []);

  return (
    <div className="home-container">
      <div className="balance-card">
        <div className="balance-main">
          <span className="balance-label">Основной баланс</span>
          <span className="balance-amount">{balance.USDT.toFixed(2)} USDT</span>
        </div>
        <div className="balance-secondary">
          <div>TON: {balance.TON}</div>
          <div>BTC: {balance.BTC}</div>
        </div>
        <button className="btn-topup">Top Up</button>
      </div>
    </div>
  );
};

export default Home;
