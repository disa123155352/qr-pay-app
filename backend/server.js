const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Разрешаем кросс-доменные запросы (для связи с фронтендом)
app.use(cors());
// Чтобы сервер понимал JSON в теле запроса
app.use(express.json());

// Временные данные (потом заменим на базу данных)
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

// Маршруты API
app.get('/api/balance', (req, res) => {
  res.json(userBalance);
});

app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

app.get('/api/profile', (req, res) => {
  res.json(userProfile);
});

// Запуск сервера
// Маршрут для обработки QR-кода
app.post('/api/scan', (req, res) => {
  const { qr } = req.body;
  // Здесь должна быть логика поиска заказа по QR-данным
  // Пока возвращаем фиктивные данные
  res.json({
    shop: 'Кофе Хауз',
    amountRub: 350,
    amountUsdt: 4.20,
    rate: 83.5,
    commission: 0.5,
  });
});

// Маршрут для подтверждения оплаты
app.post('/api/pay', (req, res) => {
  const { paymentId } = req.body; // например
  // Имитация успешной оплаты
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});