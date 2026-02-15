import React, { useState } from 'react';
import axios from 'axios';
import SimpleScanner from '../components/SimpleScanner';
import './Scan.css';

const Scan = () => {
  const [scannedData, setScannedData] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'processing', 'success', 'failed'

  const handleScan = (data) => {
    if (data) {
      setScannedData(data);
      fetchPaymentDetails(data);
    }
  };

  const fetchPaymentDetails = async (qrData) => {
    setLoading(true);
    try {
      // Имитация запроса к бэкенду (замени на реальный вызов axios)
      setTimeout(() => {
        setPaymentInfo({
          shop: 'Кофе Хауз',
          amountRub: 350,
          amountUsdt: 4.20,
          rate: 83.5,
          commission: 0.5,
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handlePay = () => {
    setStatus('processing');
    // Имитация оплаты
    setTimeout(() => {
      const success = Math.random() < 0.9;
      setStatus(success ? 'success' : 'failed');
    }, 2000);
  };

  const reset = () => {
    setScannedData(null);
    setPaymentInfo(null);
    setStatus(null);
  };

  return (
    <div className="scan-container">
      {!scannedData && !loading && (
        <>
          <h2>Сканируйте QR-код</h2>
          <SimpleScanner onScan={handleScan} />
        </>
      )}

      {loading && <div className="loading">Загрузка информации...</div>}

      {paymentInfo && !status && (
        <div className="payment-info">
          <h3>{paymentInfo.shop}</h3>
          <div className="info-row">
            <span>Сумма к оплате:</span>
            <span>{paymentInfo.amountRub} ₽</span>
          </div>
          <div className="info-row">
            <span>Эквивалент в USDT:</span>
            <span>{paymentInfo.amountUsdt} USDT</span>
          </div>
          <div className="info-row">
            <span>Курс:</span>
            <span>1 USDT = {paymentInfo.rate} ₽</span>
          </div>
          <div className="info-row">
            <span>Комиссия:</span>
            <span>{paymentInfo.commission}%</span>
          </div>
          <button className="pay-btn" onClick={handlePay}>
            Pay
          </button>
          <button className="cancel-btn" onClick={reset}>
            Отмена
          </button>
        </div>
      )}

      {status === 'processing' && (
        <div className="status processing">
          <div className="spinner"></div>
          <p>Обработка платежа...</p>
        </div>
      )}

      {status === 'success' && (
        <div className="status success">
          <div className="icon">✅</div>
          <p>Оплата прошла успешно!</p>
          <button onClick={reset}>Сканировать снова</button>
        </div>
      )}

      {status === 'failed' && (
        <div className="status failed">
          <div className="icon">❌</div>
          <p>Ошибка оплаты. Попробуйте снова.</p>
          <button onClick={reset}>Сканировать снова</button>
        </div>
      )}
    </div>
  );
};

export default Scan;