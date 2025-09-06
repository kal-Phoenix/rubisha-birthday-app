import React, { useEffect, useState } from 'react';
import { FLOATING_EMOJIS } from '../utils/constants';
import './StartPage.css';

const StartPage = ({ onStartGame }) => {
  const [floatingElements, setFloatingElements] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  const birthdayMessages = [
    "Happy Birthday Rubisha! 🎂",
    "You're turning 15 today! 🎉",
    "Time for some birthday magic! ✨",
    "Ready for your surprise? 🎁"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      createFloatingElement();
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Show message after 2 seconds
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 2000);

    // Cycle through messages
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % birthdayMessages.length);
    }, 3000);

    return () => {
      clearTimeout(messageTimer);
      clearInterval(messageInterval);
    };
  }, [birthdayMessages.length]);

  const createFloatingElement = () => {
    const element = {
      id: Date.now(),
      emoji: FLOATING_EMOJIS[Math.floor(Math.random() * FLOATING_EMOJIS.length)],
      left: Math.random() * 100,
      animationDelay: Math.random() * 2
    };
    
    setFloatingElements(prev => [...prev, element]);
    
    setTimeout(() => {
      setFloatingElements(prev => prev.filter(el => el.id !== element.id));
    }, 4000);
  };

  return (
    <div className="start-screen">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
        <div className="bg-circle circle-4"></div>
      </div>

      {/* Floating Elements */}
      {floatingElements.map(element => (
        <div
          key={element.id}
          className="floating-element"
          style={{
            left: `${element.left}vw`,
            animationDelay: `${element.animationDelay}s`
          }}
        >
          {element.emoji}
        </div>
      ))}

      {/* Main Content */}
      <div className="main-container">
        {/* Header Section */}
        <div className="header-section">
          <div className="birthday-crown">👑</div>
          <h1 className="main-title">
            <span className="title-line-1">Happy</span>
            <span className="title-line-2">Birthday</span>
            <span className="title-line-3">Rubisha!</span>
          </h1>
          <div className="birthday-cake">🎂</div>
        </div>

        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-container">
            <div className="profile-frame">
              <div className="profile-ring ring-1"></div>
              <div className="profile-ring ring-2"></div>
              <div className="profile-ring ring-3"></div>
              <div className="profile-image-container">
                <img 
                  src="/profile.png" 
                  alt="Rubisha" 
                  className="profile-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'block';
                  }}
                />
                <div className="profile-placeholder" style={{display: 'none'}}>👧</div>
              </div>
              <div className="profile-sparkles">
                <div className="sparkle sparkle-1">✨</div>
                <div className="sparkle sparkle-2">⭐</div>
                <div className="sparkle sparkle-3">💫</div>
                <div className="sparkle sparkle-4">✨</div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Section */}
        <div className="message-section">
          {showMessage && (
            <div className="message-container">
              <div className="message-bubble">
                <p className="message-text">{birthdayMessages[currentMessage]}</p>
                <div className="message-tail"></div>
              </div>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="info-section">
                <div className="age-badge">
                  <span className="age-number">15</span>
                  <span className="age-text">Years Old</span>
                </div>
          <div className="date-info">
            <span className="date-icon">📅</span>
            <span className="date-text">6th September 2010</span>
          </div>
        </div>

        {/* Action Section */}
        <div className="action-section">
          <button className="main-action-btn" onClick={onStartGame}>
            <div className="btn-content">
              <span className="btn-icon">🎁</span>
              <span className="btn-text">Open Your Birthday Surprise!</span>
              <span className="btn-arrow">→</span>
            </div>
            <div className="btn-glow"></div>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="decorative-elements">
          <div className="balloon balloon-1">🎈</div>
          <div className="balloon balloon-2">🎈</div>
          <div className="balloon balloon-3">🎈</div>
          <div className="gift gift-1">🎁</div>
          <div className="gift gift-2">🎁</div>
          <div className="star star-1">⭐</div>
          <div className="star star-2">⭐</div>
          <div className="star star-3">⭐</div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
