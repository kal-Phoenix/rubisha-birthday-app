import React, { useState, useEffect } from 'react';
import './EscapeRoom.css';

const EscapeRoom = ({ onComplete }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [unlockedDoors, setUnlockedDoors] = useState([1]);
  const [showFinalCelebration, setShowFinalCelebration] = useState(false);
  const [showFinale, setShowFinale] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showWrongAnswer, setShowWrongAnswer] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [scrambledLetters, setScrambledLetters] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [wordSearchGrid, setWordSearchGrid] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const levels = [
    {
      id: 1,
      title: "The Wardrobe",
      series: "Narnia",
      description: "Step through the magical wardrobe to find the first key...",
      background: "narnia",
      puzzle: {
        type: "riddle",
        question: "I hide a world of magic behind my doors. Step through me to find talking animals and more. What am I?",
        answer: "wardrobe",
        hint: "Think of the entrance to Narnia..."
      }
    },
    {
      id: 2,
      title: "Camp Half-Blood",
      series: "Percy Jackson",
      description: "Prove your demigod knowledge to unlock the next door...",
      background: "camp-half-blood",
      puzzle: {
        type: "cipher",
        question: "Decode this Caesar cipher (shift by 3): FDPS",
        answer: "camp",
        hint: "Shift each letter 3 positions back in the alphabet...",
        cipher: "FDPS"
      }
    },
    {
      id: 3,
      title: "Stellarlune",
      series: "Keeper of the Lost Cities",
      description: "Unscramble the letters to reveal the hidden world...",
      background: "stellarlune",
      puzzle: {
        type: "scramble",
        question: "Drag the letters to form the magical world name:",
        answer: "stellarlune",
        hint: "Think of Sophie's special ability...",
        letters: "LULANSTERE"
      }
    },
    {
      id: 4,
      title: "The Babysitters Notebook",
      series: "Baby-Sitters Club",
      description: "Find the hidden word in the letter grid...",
      background: "babysitters",
      puzzle: {
        type: "word_search",
        question: "Click and drag to highlight the club president's name:",
        answer: "kristy",
        hint: "Look for the name starting with K...",
        grid: [
          ['A', 'B', 'C', 'D', 'E'],
          ['F', 'K', 'R', 'I', 'S'],
          ['T', 'Y', 'M', 'N', 'O'],
          ['P', 'Q', 'R', 'S', 'T'],
          ['U', 'V', 'W', 'X', 'Y']
        ]
      }
    }
  ];

  const currentLevelData = levels[currentLevel - 1];

  useEffect(() => {
    // Initialize scrambled letters for level 3
    if (currentLevel === 3) {
      const letters = currentLevelData.puzzle.letters.split('');
      setScrambledLetters(letters.sort(() => Math.random() - 0.5));
      setSelectedLetters([]);
    }
    
    // Initialize word search for level 4
    if (currentLevel === 4) {
      setWordSearchGrid(currentLevelData.puzzle.grid);
      setSelectedCells([]);
    }
  }, [currentLevel]);

  const playSound = (soundType) => {
    if (!audioEnabled) return;
    
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    switch (soundType) {
      case 'correct':
        // Play unlock sound
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
        break;
      case 'wrong':
        // Play shake sound
        const wrongOscillator = audioContext.createOscillator();
        const wrongGainNode = audioContext.createGain();
        wrongOscillator.connect(wrongGainNode);
        wrongGainNode.connect(audioContext.destination);
        wrongOscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        wrongOscillator.frequency.setValueAtTime(150, audioContext.currentTime + 0.1);
        wrongGainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        wrongGainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        wrongOscillator.start();
        wrongOscillator.stop(audioContext.currentTime + 0.3);
        break;
      case 'door':
        // Play door creak
        const doorOscillator = audioContext.createOscillator();
        const doorGainNode = audioContext.createGain();
        doorOscillator.connect(doorGainNode);
        doorGainNode.connect(audioContext.destination);
        doorOscillator.frequency.setValueAtTime(300, audioContext.currentTime);
        doorOscillator.frequency.setValueAtTime(250, audioContext.currentTime + 0.5);
        doorGainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        doorGainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        doorOscillator.start();
        doorOscillator.stop(audioContext.currentTime + 1);
        break;
    }
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    const normalizedAnswer = userAnswer.toLowerCase().trim();
    const normalizedCorrectAnswer = currentLevelData.puzzle.answer.toLowerCase().trim();
    
    setAttempts(attempts + 1);
    
    if (normalizedAnswer === normalizedCorrectAnswer) {
      // Correct answer!
      setShowCorrectAnswer(true);
      playSound('correct');
      
      setTimeout(() => {
        setUnlockedDoors(prev => [...prev, currentLevel]);
        playSound('door');
        
        if (currentLevel === 4) {
          // All levels completed!
          setTimeout(() => {
            setShowFinale(true);
            setShowConfetti(true); // Start confetti immediately when finale shows
          }, 2000);
        } else {
          // Move to next level
          setTimeout(() => {
            setCurrentLevel(currentLevel + 1);
            setUserAnswer('');
            setAttempts(0);
            setShowHint(false);
            setShowCorrectAnswer(false);
          }, 2000);
        }
      }, 1000);
    } else {
      // Wrong answer - show feedback
      setShowWrongAnswer(true);
      playSound('wrong');
      setUserAnswer('');
      
      setTimeout(() => {
        setShowWrongAnswer(false);
      }, 1000);
    }
  };

  const handleLetterClick = (letter, index) => {
    if (currentLevel === 3) {
      setSelectedLetters(prev => [...prev, { letter, index }]);
      setScrambledLetters(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleCellClick = (row, col) => {
    if (currentLevel === 4) {
      setSelectedCells(prev => [...prev, { row, col }]);
    }
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  const handleFinaleComplete = () => {
    // Go directly to photos by calling onComplete with a special value
    onComplete('photos');
  };

  const renderPuzzle = () => {
    switch (currentLevelData.puzzle.type) {
      case "riddle":
        return (
          <div className="puzzle-container">
            <div className="puzzle-question">
              <h3>{currentLevelData.puzzle.question}</h3>
            </div>
            <form onSubmit={handleAnswerSubmit} className="answer-form">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className={`answer-input ${showWrongAnswer ? 'shake' : ''} ${showCorrectAnswer ? 'correct' : ''}`}
                autoFocus
              />
              <button type="submit" className="submit-button">
                Submit Answer
              </button>
            </form>
          </div>
        );
      
      case "cipher":
        return (
          <div className="puzzle-container">
            <div className="puzzle-question">
              <h3>{currentLevelData.puzzle.question}</h3>
            </div>
            <div className="cipher-display">
              <div className="cipher-text">{currentLevelData.puzzle.cipher}</div>
            </div>
            <form onSubmit={handleAnswerSubmit} className="answer-form">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type the decoded word..."
                className={`answer-input ${showWrongAnswer ? 'shake' : ''} ${showCorrectAnswer ? 'correct' : ''}`}
                autoFocus
              />
              <button type="submit" className="submit-button">
                Submit Answer
              </button>
            </form>
          </div>
        );
      
      case "scramble":
        return (
          <div className="puzzle-container">
            <div className="puzzle-question">
              <h3>{currentLevelData.puzzle.question}</h3>
            </div>
            <div className="scramble-container">
              <div className="scrambled-letters">
                {scrambledLetters.map((letter, index) => (
                  <button
                    key={index}
                    className="letter-button"
                    onClick={() => handleLetterClick(letter, index)}
                  >
                    {letter}
                  </button>
                ))}
              </div>
              <div className="selected-letters">
                {selectedLetters.map((item, index) => (
                  <span key={index} className="selected-letter">
                    {item.letter}
                  </span>
                ))}
              </div>
            </div>
            <form onSubmit={handleAnswerSubmit} className="answer-form">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type the unscrambled word..."
                className={`answer-input ${showWrongAnswer ? 'shake' : ''} ${showCorrectAnswer ? 'correct' : ''}`}
                autoFocus
              />
              <button type="submit" className="submit-button">
                Submit Answer
              </button>
            </form>
          </div>
        );
      
      case "word_search":
        return (
          <div className="puzzle-container">
            <div className="puzzle-question">
              <h3>{currentLevelData.puzzle.question}</h3>
            </div>
            <div className="word-search-grid">
              {wordSearchGrid.map((row, rowIndex) => (
                <div key={rowIndex} className="grid-row">
                  {row.map((letter, colIndex) => (
                    <div
                      key={colIndex}
                      className={`grid-cell ${selectedCells.some(cell => cell.row === rowIndex && cell.col === colIndex) ? 'selected' : ''}`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <form onSubmit={handleAnswerSubmit} className="answer-form">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type the hidden word..."
                className={`answer-input ${showWrongAnswer ? 'shake' : ''} ${showCorrectAnswer ? 'correct' : ''}`}
                autoFocus
              />
              <button type="submit" className="submit-button">
                Submit Answer
              </button>
            </form>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getBackgroundClass = () => {
    return `escape-room level-${currentLevel} ${currentLevelData.background}`;
  };

  return (
    <div className={getBackgroundClass()}>
      {/* Animated Background */}
      <div className="escape-background">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
      </div>

      {/* Thematic Background Elements */}
      <div className="thematic-elements">
        {currentLevel === 1 && (
          <>
            <div className="snowflake">❄️</div>
            <div className="snowflake">❄️</div>
            <div className="snowflake">❄️</div>
            <div className="wardrobe-glow"></div>
          </>
        )}
        {currentLevel === 2 && (
          <>
            <div className="greek-column">🏛️</div>
            <div className="camp-logo">⚡</div>
            <div className="lightning">⚡</div>
          </>
        )}
        {currentLevel === 3 && (
          <>
            <div className="star">⭐</div>
            <div className="star">⭐</div>
            <div className="star">⭐</div>
            <div className="sparkle">✨</div>
            <div className="sparkle">✨</div>
            <div className="sparkle">✨</div>
          </>
        )}
        {currentLevel === 4 && (
          <>
            <div className="notebook">📓</div>
            <div className="pencil">✏️</div>
            <div className="doodle">💕</div>
          </>
        )}
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-key">🗝️</div>
        <div className="floating-door">🚪</div>
        <div className="floating-star">⭐</div>
        <div className="floating-magic">✨</div>
      </div>

      {/* Audio Toggle */}
      <div className="audio-toggle">
        <button 
          className={`audio-button ${audioEnabled ? 'enabled' : 'disabled'}`}
          onClick={toggleAudio}
        >
          {audioEnabled ? '🔊' : '🔇'}
        </button>
      </div>

      {/* Header */}
      <div className="escape-header">
        <h1 className="escape-title">
          <span className="title-icon">🎮</span>
          <span className="title-text">Escape Room Birthday Puzzle</span>
          <span className="title-icon">🎂</span>
        </h1>
        <p className="escape-subtitle">Solve all 4 puzzles to unlock your birthday surprise!</p>
        
        {/* Progress Doors */}
        <div className="doors-container">
          {levels.map((level) => (
            <div
              key={level.id}
              className={`door ${unlockedDoors.includes(level.id) ? 'unlocked' : ''} ${currentLevel === level.id ? 'current' : ''}`}
            >
              <div className="door-icon">
                {level.id === 1 && '🏠'} {/* Wardrobe */}
                {level.id === 2 && '⚡'} {/* Camp Half-Blood */}
                {level.id === 3 && '⭐'} {/* Stellarlune */}
                {level.id === 4 && '📓'} {/* Babysitters Club */}
              </div>
              <div className="door-number">{level.id}</div>
              <div className="door-title">{level.title}</div>
              <div className="door-series">{level.series}</div>
              {unlockedDoors.includes(level.id) && (
                <div className="unlock-icon">🔓</div>
              )}
              {unlockedDoors.includes(level.id) && (
                <div className="door-glow"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Level */}
      <div className="level-container">
        <div className="level-header">
          <h2 className="level-title">
            Level {currentLevel}: {currentLevelData.title}
          </h2>
          <p className="level-series">{currentLevelData.series}</p>
          <p className="level-description">{currentLevelData.description}</p>
        </div>

        {/* Hint Button */}
        <div className="hint-container">
          <button className="hint-button" onClick={toggleHint}>
            {showHint ? '🫥 Hide Hint' : '💡 Show Hint'}
          </button>
        </div>

        {/* Hint */}
        {showHint && (
          <div className="hint-display">
            <div className="hint-icon">💡</div>
            <p className="hint-text">{currentLevelData.puzzle.hint}</p>
          </div>
        )}

        {/* Puzzle */}
        {renderPuzzle()}

        {/* Attempts Counter */}
        {attempts > 0 && (
          <div className="attempts-counter">
            Attempts: {attempts}
          </div>
        )}
      </div>

      {/* Simple Birthday Message */}
      {showFinale && (
        <div className="finale-overlay">
          {/* Confetti Animation */}
          {showConfetti && (
            <div className="confetti-container">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className={`confetti confetti-${i % 6}`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Party Poppers */}
          {showConfetti && (
            <div className="party-poppers">
              <div className="popper popper-left">🎉</div>
              <div className="popper popper-right">🎊</div>
              <div className="popper popper-center-left">🎈</div>
              <div className="popper popper-center-right">🎈</div>
            </div>
          )}

          <div className="finale-message">
            <h2 className="finale-title">Happy Birthday Rubisha! 🎂</h2>
            <p className="finale-text">You've solved all the puzzles!</p>
            <button className="claim-gift-btn" onClick={handleFinaleComplete}>
              Show Me My Journey 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EscapeRoom;