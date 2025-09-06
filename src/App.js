import React, { useState } from 'react';
import StartPage from './components/StartPage';
import MatchingPuzzle from './components/MatchingPuzzle';
import RewardScreen from './components/RewardScreen';
import Slideshow from './components/Slideshow';
import FinalScreen from './components/FinalScreen';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('start');
  const [puzzleScore, setPuzzleScore] = useState(0);

  const handleStartGame = () => {
    setCurrentScreen('puzzle');
  };

  const handlePuzzleComplete = (score) => {
    setPuzzleScore(score);
    setCurrentScreen('reward');
  };

  const handleViewPhotos = () => {
    setCurrentScreen('slideshow');
  };

  const handlePlayAgain = () => {
    setCurrentScreen('start');
    setPuzzleScore(0);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'start':
        return <StartPage onStartGame={handleStartGame} />;
      case 'puzzle':
        return <MatchingPuzzle onComplete={handlePuzzleComplete} />;
      case 'reward':
        return <RewardScreen onViewPhotos={handleViewPhotos} score={puzzleScore} />;
      case 'slideshow':
        return <Slideshow onPlayAgain={handlePlayAgain} />;
      case 'final':
        return <FinalScreen onPlayAgain={handlePlayAgain} />;
      default:
        return <StartPage onStartGame={handleStartGame} />;
    }
  };

  return (
    <div className="App">
      {renderScreen()}
    </div>
  );
}

export default App;
