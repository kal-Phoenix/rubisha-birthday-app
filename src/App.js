import React, { useState } from 'react';
import StartPage from './components/StartPage';
import MatchingPuzzle from './components/MatchingPuzzle';
import JigsawPuzzle from './components/JigsawPuzzle';
import EscapeRoom from './components/EscapeRoom';
import RewardScreen from './components/RewardScreen';
import SimpleMemoryBook from './components/SimpleMemoryBook';
import FinalScreen from './components/FinalScreen';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('start'); // Start from the beginning
  const [puzzleScore, setPuzzleScore] = useState(0);

  const handleStartGame = () => {
    setCurrentScreen('puzzle');
  };

  const handlePuzzleComplete = (score) => {
    setPuzzleScore(score);
    setCurrentScreen('jigsaw');
  };

  const handleJigsawComplete = (score) => {
    setCurrentScreen('escape');
  };

  const handleEscapeComplete = (score) => {
    if (score === 'photos') {
      setCurrentScreen('slideshow');
    } else {
      setCurrentScreen('reward');
    }
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
      case 'jigsaw':
        return <JigsawPuzzle onComplete={handleJigsawComplete} />;
      case 'escape':
        return <EscapeRoom onComplete={handleEscapeComplete} />;
      case 'reward':
        return <RewardScreen onViewPhotos={handleViewPhotos} score={puzzleScore} />;
      case 'slideshow':
        return <SimpleMemoryBook />;
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
