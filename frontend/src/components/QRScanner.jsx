import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';

const QRScanner = ({ onScan }) => {
  const [error, setError] = useState('');

  const handleScan = (data) => {
    if (data) {
      onScan(data.text || data);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError('Ошибка доступа к камере. Проверьте разрешения.');
  };

  const previewStyle = {
    width: '100%',
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      <QrScanner
        onScan={handleScan}
        onError={handleError}
        style={previewStyle}
        facingMode="environment"
      />
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </div>
  );
};

export default QRScanner;