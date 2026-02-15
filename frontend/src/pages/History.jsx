import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './History.css';

const History = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/transactions')
      .then(res => setTransactions(res.data))
      .catch(err => console.error('Ошибка загрузки истории', err));
  }, []);

  const getStatusText = (status) => {
    switch(status) {
      case 'success': return 'Успешно';
      case 'pending': return 'В обработке';
      case 'failed': return 'Ошибка';
      default: return status;
    }
  };

  return (
    <div className="history-container">
      <h2>История операций</h2>
      <ul className="transaction-list">
        {transactions.map(tx => (
          <li key={tx.id} className="transaction-item">
            <div className="tx-left">
              <div className="tx-shop">{tx.shop}</div>
              <div className="tx-date">{tx.date}</div>
            </div>
            <div className="tx-right">
              <div className="tx-amount">{tx.amountRub} ₽</div>
              <div className="tx-usdt">{tx.amountUsdt} USDT</div>
              <div className={`tx-status ${tx.status}`}>{getStatusText(tx.status)}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;