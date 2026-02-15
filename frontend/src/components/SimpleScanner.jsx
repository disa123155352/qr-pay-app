import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const SimpleScanner = ({ onScan }) => {
  const scannerRef = useRef(null);
  const [error, setError] = useState('');
  const [hasCamera, setHasCamera] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let scanner = null;

    // Проверяем наличие камер
    Html5Qrcode.getCameras()
      .then((cameras) => {
        if (!isMounted) return;
        
        if (cameras.length === 0) {
          setHasCamera(false);
          setError('Камера не найдена на этом устройстве');
          return;
        }

        // Есть камера - запускаем сканер
        scanner = new Html5Qrcode("qr-reader");
        scannerRef.current = scanner;

        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        scanner.start(
          { facingMode: "environment" }, // пытаемся использовать заднюю камеру
          config,
          (decodedText) => {
            if (isMounted) {
              onScan(decodedText);
              scanner.stop().catch(() => {});
            }
          },
          (errorMessage) => {
            // Игнорируем ошибки сканирования
          }
        ).catch((err) => {
          console.error('Ошибка запуска сканера:', err);
          if (isMounted) {
            setError('Не удалось запустить камеру. Проверьте разрешения.');
          }
        });
      })
      .catch((err) => {
        console.error('Ошибка получения списка камер:', err);
        if (isMounted) {
          setError('Ошибка доступа к камере. Разрешите доступ и перезагрузите страницу.');
        }
      });

    return () => {
      isMounted = false;
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, [onScan]);

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p style={{ color: 'red' }}>{error}</p>
        {!hasCamera && <p>На этом устройстве нет камеры. Для тестирования используйте телефон.</p>}
        <button onClick={() => window.location.reload()}>Повторить</button>
      </div>
    );
  }

  return <div id="qr-reader" style={{ width: '100%' }} />;
};

export default SimpleScanner;