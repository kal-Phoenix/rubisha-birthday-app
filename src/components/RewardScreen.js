import React, { useEffect } from 'react';
import { CONFETTI_COLORS } from '../utils/constants';
import { createConfettiBurst, createWinMessage } from '../utils/animations';
import './RewardScreen.css';

const RewardScreen = ({ onViewPhotos, score }) => {
  useEffect(() => {
    createConfettiBurst(CONFETTI_COLORS);
    createWinMessage();
  }, []);


  return (
    <div className="reward-screen">
      <div className="reward-container">
        <div className="confetti-burst"></div>
        <h2 className="reward-title">🎊 Amazing Job! 🎊</h2>
        <p className="reward-score">You matched {score} pairs perfectly!</p>
        <button className="surprise-btn btn btn-primary" onClick={onViewPhotos}>
          <i className="fas fa-gift"></i>
          View Your Photos! 📸
        </button>
      </div>
    </div>
  );
};

export default RewardScreen;
