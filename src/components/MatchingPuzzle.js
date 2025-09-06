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

  const puzzlePairs = PUZZLE_PAIRS;

  useEffect(() => {
    initializePuzzle();
  }, []);

  const initializePuzzle = () => {
    // Shuffle items
    const shuffledItems = [...puzzlePairs].sort(() => Math.random() - 0.5);
    setItems(shuffledItems);

    // Get unique worlds and shuffle them
    const uniqueWorlds = [...new Set(puzzlePairs.map(pair => pair.world))];
    const shuffledWorlds = uniqueWorlds.sort(() => Math.random() - 0.5);
    setWorlds(shuffledWorlds);
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
    // Check if this is a correct match
    const isCorrect = puzzlePairs.some(pair => 
      pair.item === item.item && pair.world === world.world
    );

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

    // Clear selections after animation
    setTimeout(() => {
      setSelectedItem(null);
      setSelectedWorld(null);
    }, 1000);
  };


  return (
    <div className="puzzle-screen">
      <div className="puzzle-header">
        <h2>🎂 Birthday Book World Matching Puzzle! 📚</h2>
        <p>Match the items to their correct book worlds! Click to connect them.</p>
        <div className="progress-info">
          <span>Matches: {matchesCount}/{puzzlePairs.length}</span>
        </div>
      </div>
      
      <div className="puzzle-container">
        <div className="puzzle-columns">
          {/* Left Column - Items */}
          <div className="items-column">
            <h3>📖 Items & Characters</h3>
            <div className="items-grid">
              {items.map((item, index) => (
                <div
                  key={`${item.item}-${index}`}
                  className={`puzzle-item ${item.correct ? 'correct' : ''} ${selectedItem?.item === item.item ? 'selected' : ''}`}
                  onClick={() => handleItemClick(item)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.item}
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Book Worlds */}
          <div className="worlds-column">
            <h3>🌍 Book Worlds</h3>
            <div className="worlds-grid">
              {worlds.map((world, index) => (
                <div
                  key={`${world.world}-${index}`}
                  className={`puzzle-world ${world.correct ? 'correct' : ''} ${selectedWorld?.world === world.world ? 'selected' : ''}`}
                  onClick={() => handleWorldClick(world)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {world.world}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="puzzle-instructions">
        <p>💡 Click items and worlds to match them!</p>
      </div>
    </div>
  );
};

export default MatchingPuzzle;
