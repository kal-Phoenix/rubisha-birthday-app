import React, { useState, useEffect } from 'react';
import { PUZZLE_PAIRS } from '../utils/constants';
import { createSuccessEffect, createWrongEffect } from '../utils/animations';
import './MatchingPuzzle.css';

const MatchingPuzzle = ({ onComplete }) => {
  const [matchesCount, setMatchesCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedWorld, setSelectedWorld] = useState(null);
  const [correctPairs, setCorrectPairs] = useState([]);
  const [items, setItems] = useState([]);
  const [worlds, setWorlds] = useState([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const puzzlePairs = PUZZLE_PAIRS;

  // Hint system data
  const hints = [
    "💡 Look for characters from the same book series!",
    "🌟 Think about where each character would live or what they would use!",
    "📚 Remember the main settings of each book world!",
    "✨ Some items are unique to specific magical worlds!",
    "🎯 Try matching the most obvious pairs first!",
    "🔍 Look for clues in the names - they often give hints!",
    "💫 Think about the powers and abilities of each character!",
    "🌟 Consider the magical objects and their origins!"
  ];

  useEffect(() => {
    initializePuzzle();
  }, []);

  const initializePuzzle = () => {
    // Create one-to-one matching: each item has exactly one corresponding world
    const shuffledPairs = [...puzzlePairs].sort(() => Math.random() - 0.5);
    
    // Extract items and their corresponding worlds
    const itemsList = shuffledPairs.map(pair => ({ 
      item: pair.item, 
      correct: false,
      correctWorld: pair.world 
    }));
    
    const worldsList = shuffledPairs.map(pair => ({ 
      world: pair.world, 
      correct: false,
      correctItem: pair.item 
    })).sort(() => Math.random() - 0.5);
    
    setItems(itemsList);
    setWorlds(worldsList);
  };

  const handleItemClick = (item) => {
    if (item.correct) return; // Can't select already matched items

    // Clear previous selections
    setSelectedItem(item);
    setSelectedWorld(null);

    // If we have both item and world selected, try to match
    if (selectedWorld) {
      attemptMatch(item, selectedWorld);
    }
  };

  const handleWorldClick = (world) => {
    if (world.correct) return; // Can't select already matched worlds

    // Clear previous selections
    setSelectedWorld(world);
    setSelectedItem(null);

    // If we have both item and world selected, try to match
    if (selectedItem) {
      attemptMatch(selectedItem, world);
    }
  };

  const attemptMatch = (item, world) => {
    // Check if this is a correct match (one-to-one)
    const isCorrect = item.correctWorld === world.world && world.correctItem === item.item;

    if (isCorrect) {
      handleCorrectMatch(item, world);
    } else {
      handleWrongMatch(item, world);
    }
  };

  const handleCorrectMatch = (item, world) => {
    // Mark as correct
    setItems(prev => prev.map(i => 
      i.item === item.item ? { ...i, correct: true } : i
    ));
    setWorlds(prev => prev.map(w => 
      w.world === world.world ? { ...w, correct: true } : w
    ));

    // Add to correct pairs
    setCorrectPairs(prev => [...prev, { item, world }]);

    // Update matches count
    const newCount = matchesCount + 1;
    setMatchesCount(newCount);

    // Clear selections
    setSelectedItem(null);
    setSelectedWorld(null);

    // Check if game is complete
    if (newCount >= puzzlePairs.length) {
      setTimeout(() => {
        onComplete(newCount);
      }, 1000);
    }

    // Create success effect
    createSuccessEffect();
  };

  const handleWrongMatch = (item, world) => {
    // Create wrong effect
    createWrongEffect();

    // Update wrong attempts counter
    setWrongAttempts(prev => prev + 1);

    // Clear selections after animation
    setTimeout(() => {
      setSelectedItem(null);
      setSelectedWorld(null);
    }, 1000);
  };

  // Hint system functions
  const getRandomHint = () => {
    const availableHints = hints.filter((_, index) => index < hints.length);
    return availableHints[Math.floor(Math.random() * availableHints.length)];
  };

  const showHintMessage = () => {
    if (hintsUsed < 3) {
      const hint = getRandomHint();
      setCurrentHint(hint);
      setShowHint(true);
      setHintsUsed(prev => prev + 1);
      
      // Hide hint after 5 seconds
      setTimeout(() => {
        setShowHint(false);
      }, 5000);
    }
  };

  const getHintButtonText = () => {
    if (hintsUsed >= 3) return "No more hints!";
    return `Get Hint (${3 - hintsUsed} left)`;
  };

  const getEncouragementMessage = () => {
    if (wrongAttempts === 0) return "";
    if (wrongAttempts < 3) return "Keep trying! You're doing great! 💪";
    if (wrongAttempts < 6) return "Don't give up! Every mistake is a learning opportunity! 🌟";
    return "Take your time and think carefully! You've got this! ✨";
  };


  return (
    <div className="puzzle-screen">
      {/* Animated Background */}
      <div className="puzzle-background">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
        <div className="bg-circle circle-4"></div>
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-book">📚</div>
        <div className="floating-star">⭐</div>
        <div className="floating-heart">💖</div>
        <div className="floating-sparkle">✨</div>
        <div className="floating-cake">🎂</div>
        <div className="floating-gift">🎁</div>
      </div>

      {/* Header Section */}
      <div className="puzzle-header">
        <div className="header-decoration">
          <div className="header-star star-1">⭐</div>
          <div className="header-star star-2">✨</div>
          <div className="header-star star-3">💫</div>
        </div>
        <h1 className="puzzle-title">
          <span className="title-icon">🎂</span>
          <span className="title-text">Birthday Book Adventure</span>
          <span className="title-icon">📚</span>
        </h1>
        <p className="puzzle-subtitle">Match the magical items to their book worlds!</p>
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(matchesCount / puzzlePairs.length) * 100}%` }}
            ></div>
          </div>
          <div className="progress-text">
            <span className="matches-count">{matchesCount}</span>
            <span className="matches-total">/{puzzlePairs.length}</span>
            <span className="matches-label">Matches</span>
          </div>
        </div>

        {/* Hint and Help Section */}
        <div className="hint-section">
          <button 
            className="hint-button" 
            onClick={showHintMessage}
            disabled={hintsUsed >= 3}
          >
            <span className="hint-icon">💡</span>
            <span className="hint-text">{getHintButtonText()}</span>
          </button>
          
          {wrongAttempts > 0 && (
            <div className="encouragement-message">
              {getEncouragementMessage()}
            </div>
          )}
        </div>

        {/* Hint Display */}
        {showHint && (
          <div className="hint-display">
            <div className="hint-bubble">
              <div className="hint-content">
                <span className="hint-emoji">💡</span>
                <span className="hint-message">{currentHint}</span>
              </div>
              <div className="hint-tail"></div>
            </div>
          </div>
        )}
      </div>
      
      {/* Main Puzzle Container */}
      <div className="puzzle-container">
        <div className="puzzle-columns">
          {/* Left Column - Items */}
          <div className="items-column">
            <div className="column-header">
              <div className="column-icon">📖</div>
              <h3 className="column-title">Magical Items & Characters</h3>
              <div className="column-decoration">✨</div>
            </div>
            <div className="items-grid">
              {items.map((item, index) => (
                <div
                  key={`${item.item}-${index}`}
                  className={`puzzle-item ${item.correct ? 'correct' : ''} ${selectedItem?.item === item.item ? 'selected' : ''}`}
                  onClick={() => handleItemClick(item)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="item-content">
                    <div className="item-text">{item.item}</div>
                    <div className="item-glow"></div>
                  </div>
                  {item.correct && (
                    <div className="correct-indicator">
                      <span className="checkmark">✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Book Worlds */}
          <div className="worlds-column">
            <div className="column-header">
              <div className="column-icon">🌍</div>
              <h3 className="column-title">Enchanted Book Worlds</h3>
              <div className="column-decoration">🌟</div>
            </div>
            <div className="worlds-grid">
              {worlds.map((world, index) => (
                <div
                  key={`${world.world}-${index}`}
                  className={`puzzle-world ${world.correct ? 'correct' : ''} ${selectedWorld?.world === world.world ? 'selected' : ''}`}
                  onClick={() => handleWorldClick(world)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="world-content">
                    <div className="world-text">{world.world}</div>
                    <div className="world-glow"></div>
                  </div>
                  {world.correct && (
                    <div className="correct-indicator">
                      <span className="checkmark">✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Instructions and Tips */}
      <div className="puzzle-instructions">
        <div className="instruction-bubble">
          <div className="instruction-icon">💡</div>
          <p className="instruction-text">Click on an item, then click on its matching world!</p>
        </div>
        
        {/* Quick Tips */}
        <div className="quick-tips">
          <div className="tip-item">
            <span className="tip-icon">🎯</span>
            <span className="tip-text">Start with obvious matches</span>
          </div>
          <div className="tip-item">
            <span className="tip-icon">📚</span>
            <span className="tip-text">Think about book series</span>
          </div>
          <div className="tip-item">
            <span className="tip-icon">✨</span>
            <span className="tip-text">Look for magical connections</span>
          </div>
        </div>
      </div>

      {/* Connection Lines SVG */}
      <svg className="connections-svg">
        {correctPairs.map((pair, index) => {
          // Calculate positions based on the matched items
          const itemIndex = items.findIndex(item => item.item === pair.item.item);
          const worldIndex = worlds.findIndex(world => world.world === pair.world.world);
          
          // Calculate approximate positions (these will be rough estimates)
          const itemX = 20; // Left column position
          const worldX = 80; // Right column position
          const itemY = 30 + (itemIndex * 6); // Spacing based on index
          const worldY = 30 + (worldIndex * 6); // Spacing based on index
          
          return (
            <line
              key={index}
              className="connection-line"
              x1={`${itemX}%`}
              y1={`${itemY}%`}
              x2={`${worldX}%`}
              y2={`${worldY}%`}
              stroke="#ff6b9d"
              strokeWidth="3"
              strokeDasharray="5,5"
              opacity="0.8"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default MatchingPuzzle;
