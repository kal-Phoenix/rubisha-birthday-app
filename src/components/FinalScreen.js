import React from 'react';
import './FinalScreen.css';

const FinalScreen = ({ onPlayAgain }) => {
  return (
    <div className="final-screen">
      <div className="final-container">
        <h1 className="final-title">Happy Birthday! 🎂</h1>
        <p className="final-message">
          Hope you had fun with your birthday puzzle!<br />
          Wishing you an amazing year ahead filled with joy, laughter, and wonderful memories!
        </p>
        <div className="final-celebration">
          <div className="celebration-emoji">🎈</div>
          <div className="celebration-emoji">🎁</div>
          <div className="celebration-emoji">⭐</div>
          <div className="celebration-emoji">🎊</div>
        </div>
        <button className="play-again-btn btn btn-primary" onClick={onPlayAgain}>
          <i className="fas fa-redo"></i>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default FinalScreen;
