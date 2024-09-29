import React, { useEffect, useState } from 'react';
import './styles.css'; // Importe o CSS aqui

interface NotificationProps {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    duration?: number; // Duração da exibição da notificação
    onClose: () => void;
  }
  
  const Notification: React.FC<NotificationProps> = ({ message, type, duration = 3000, onClose }) => {
    const [progress, setProgress] = useState(100); // Estado para controlar o progresso
  
    useEffect(() => {
      const interval = setInterval(() => {
        setProgress(prev => prev - 100 / (duration / 100)); // Reduz o progresso proporcionalmente ao tempo
      }, 100);
  
      const timer = setTimeout(() => {
        onClose();
      }, duration);
  
      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }, [duration, onClose]);
  
    return (
      <div className={`notification-container ${type}`}>
        <button className="notification-close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="notification-content">
          <span className="notification-message">{message}</span>
          <div className="notification-progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
    );
  };
  
  export default Notification;