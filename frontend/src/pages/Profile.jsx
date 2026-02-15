import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios.get('https://qr-pay-backend-rwmw.onrender.com/api/profile')
      .then(res => setProfile(res.data))
      .catch(err => console.error('Ошибка загрузки профиля', err));
  }, []);

  return (
    <div className="profile-container">
      <h2>Профиль</h2>
      <div className="profile-item">
        <span>Telegram ID:</span>
        <span>{profile.telegramId}</span>
      </div>
      <div className="profile-item">
        <span>Поддержка:</span>
        <a href={profile.support}>Telegram</a>
      </div>
      <div className="profile-links">
        <a href={profile.terms}>Условия использования</a>
        <a href={profile.privacy}>Политика конфиденциальности</a>
      </div>
    </div>
  );
};

export default Profile;
