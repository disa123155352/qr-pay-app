import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import History from './pages/History';
import Scan from './pages/Scan';
import Services from './pages/Services';
import Profile from './pages/Profile';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Инициализация Telegram WebApp
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();

      // Получаем данные пользователя
      const tgUser = window.Telegram.WebApp.initDataUnsafe?.user;
      if (tgUser) {
        setUser({
          id: tgUser.id,
          firstName: tgUser.first_name,
          lastName: tgUser.last_name,
          username: tgUser.username,
          languageCode: tgUser.language_code,
          photoUrl: tgUser.photo_url, // может отсутствовать
        });
      }
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/history" element={<History user={user} />} />
            <Route path="/scan" element={<Scan user={user} />} />
            <Route path="/services" element={<Services user={user} />} />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;