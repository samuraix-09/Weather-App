import React from 'react';

const GeolocationPermission = ({ onAllow, onClose }) => {
  return (
    <div className="geo-modal-backdrop">
      <div className="geo-modal">
        <h2>Joylashuvga ruxsat bering</h2>
        <p>
          Sizga eng yaqin hudud uchun aniq ob-havo Ma'lumotlarini ko'rsatishimiz
          uchun joylashuvingiz kerak.
        </p>

        <div className="geo-actions">
          <button className="allow-btn" onClick={onAllow}>
            Ruxsat berish
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Bekor qilish
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeolocationPermission;
