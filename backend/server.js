const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001; // Render сам назначит порт, либо 5001 для локальной разработки

// Разрешаем CORS для вашего фронтенда на Vercel
// Если хотите разрешить все домены (например, для теста), замените на app.use(cors())
const corsOptions = {
  origin: 'https://qr-pay-app.vercel.app', // Точный адрес вашего фронтенда
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Чтобы сервер понимал JSON в теле запроса
app.use(express.json());

// Временные данные (имитация базы данных)
let userBalance = {
  USDT: 1250.45,
  TON: 15.2,
  BTC: 0.0025
};

let transactions = [
  { id: 1, shop: 'Кофе Хауз', date: '2025-02-14', amountRub: 350, amountUsdt: 4.20, status: 'success' },
  { id: 2, shop: 'Перекрёсток', date: '2025-02-13', amountRub: 1250, amountUsdt: 15.10, status: 'pending' },
  { id: 3, shop: 'Аптека', date: '2025-02-12', amountRub: 540, amountUsdt: 6.50, status: 'failed' }
];

let userProfile = {
  telegramId: '@testuser',
  support: 'https://t.me/support',
  terms: 'https://example.com/terms',
  privacy: 'https://example.com/privacy'
};

// ----- Маршруты API -----

// Получение баланса
app.get('/api/balance', (req, res) => {
  res.json(userBalance);
});

// Получение истории транзакций
app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

// Получение профиля
app.get('/api/profile', (req, res) => {
  res.json(userProfile);
});

// Обработка сканированного QR-кода (имитация)
app.post('/api/scan', (req, res) => {
  const { qr } = req.body;
  console.log('Получен QR:', qr); // для отладки
  // Здесь должна быть логика поиска заказа по QR
  res.json({
    shop: 'Кофе Хауз',
    amountRub: 350,
    amountUsdt: 4.20,
    rate: 83.5,
    commission: 0.5,
  });
});

// Подтверждение оплаты (имитация)
app.post('/api/pay', (req, res) => {
  const { paymentId } = req.body;
  console.log('Оплата по paymentId:', paymentId);
  // Здесь списание средств, запись в БД и т.д.
  res.json({ success: true });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});