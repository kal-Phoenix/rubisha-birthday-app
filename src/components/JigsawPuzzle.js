import React, { useState, useEffect } from 'react';
import './JigsawPuzzle.css';

const JigsawPuzzle = ({ onComplete }) => {
  const [pieces, setPieces] = useState([]);
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [completedPieces, setCompletedPieces] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showMemories, setShowMemories] = useState(false);
  const [touchStartPos, setTouchStartPos] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    initializePuzzle();
  }, []);

  const initializePuzzle = () => {
    // Create 12 jigsaw pieces (3x4 grid) - each piece shows 1/12th of the full image
    const newPieces = [];
    
    // Shuffle positions for the puzzle
    const shuffledPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < 12; i++) {
      const correctRow = Math.floor(i / 3);
      const correctCol = i % 3;
      const currentPosition = shuffledPositions[i];
      const currentRow = Math.floor(currentPosition / 3);
      const currentCol = currentPosition % 3;
      
      newPieces.push({
        id: i,
        correctPosition: i,
        currentPosition: currentPosition,
        correctRow,
        correctCol,
        currentRow,
        currentCol,
        isCorrect: i === currentPosition
      });
    }
    
    setPieces(newPieces);
    updateCompletedPieces(newPieces);
  };

  const updateCompletedPieces = (piecesArray) => {
    const correct = piecesArray.filter(piece => piece.isCorrect).length;
    setCompletedPieces(correct);
    
    if (correct === 12) {
      setTimeout(() => {
        setShowCelebration(true);
        setTimeout(() => {
          setShowMemories(true);
        }, 2000);
      }, 500);
    }
  };

  const handleDragStart = (e, piece) => {
    setDraggedPiece(piece);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetPiece) => {
    e.preventDefault();
    
    if (!draggedPiece || !targetPiece || draggedPiece.id === targetPiece.id) {
      setDraggedPiece(null);
      return;
    }

    swapPieces(draggedPiece, targetPiece);
    setDraggedPiece(null);
  };

  // Touch event handlers for mobile support
  const handleTouchStart = (e, piece) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    
    setTouchStartPos({ x: touch.clientX, y: touch.clientY });
    setDraggedPiece(piece);
    setIsDragging(true);
    
    // Calculate offset from touch point to piece center
    setDragOffset({
      x: touch.clientX - (rect.left + rect.width / 2),
      y: touch.clientY - (rect.top + rect.height / 2)
    });
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !draggedPiece) return;
    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    if (!isDragging || !draggedPiece) return;
    
    const touch = e.changedTouches[0];
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (elementBelow) {
      const targetPieceElement = elementBelow.closest('.puzzle-piece');
      if (targetPieceElement) {
        const targetPieceId = parseInt(targetPieceElement.dataset.pieceId);
        const targetPiece = pieces.find(p => p.id === targetPieceId);
        
        if (targetPiece && targetPiece.id !== draggedPiece.id) {
          swapPieces(draggedPiece, targetPiece);
        }
      }
    }
    
    setIsDragging(false);
    setDraggedPiece(null);
    setTouchStartPos(null);
    setDragOffset({ x: 0, y: 0 });
  };

  // Helper function to swap pieces
  const swapPieces = (piece1, piece2) => {
    setPieces(prev => {
      const newPieces = prev.map(piece => {
        if (piece.id === piece1.id) {
          const newPosition = piece2.currentPosition;
          const newRow = Math.floor(newPosition / 3);
          const newCol = newPosition % 3;
          return {
            ...piece,
            currentPosition: newPosition,
            currentRow: newRow,
            currentCol: newCol,
            isCorrect: piece.correctPosition === newPosition
          };
        } else if (piece.id === piece2.id) {
          const newPosition = piece1.currentPosition;
          const newRow = Math.floor(newPosition / 3);
          const newCol = newPosition % 3;
          return {
            ...piece,
            currentPosition: newPosition,
            currentRow: newRow,
            currentCol: newCol,
            isCorrect: piece.correctPosition === newPosition
          };
        }
        return piece;
      });
      
      updateCompletedPieces(newPieces);
      return newPieces;
    });
  };

  const getPositionX = (position) => {
    return (position % 3) * 33.333; // Each column is 33.333% of the container width
  };

  const getPositionY = (position) => {
    return Math.floor(position / 3) * 25; // Each row is 25% of the container height
  };
  
  const getBackgroundPosition = (row, col) => {
    const x = col * 100 / 2; // 0%, 50%, or 100% for x position
    const y = row * 100 / 3; // 0%, 33.33%, 66.66%, or 100% for y position
    return `${x}% ${y}%`;
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const handleContinueFromMemories = () => {
    onComplete(12);
  };

  return (
    <div className="jigsaw-screen">
      {/* Animated Background */}
      <div className="jigsaw-background">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-puzzle">🧩</div>
        <div className="floating-star">⭐</div>
        <div className="floating-heart">💖</div>
        <div className="floating-sparkle">✨</div>
      </div>

      {/* Header */}
      <div className="jigsaw-header">
        <h1 className="jigsaw-title">
          <span className="title-icon">🧩</span>
          <span className="title-text">Jigsaw Puzzle Challenge!</span>
          <span className="title-icon">🎂</span>
        </h1>
        <p className="jigsaw-subtitle">Put the pieces together to reveal the surprise!</p>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(completedPieces / 12) * 100}%` }}
            ></div>
          </div>
          <div className="progress-text">
            <span className="pieces-count">{completedPieces}</span>
            <span className="pieces-total">/12</span>
            <span className="pieces-label">Pieces</span>
          </div>
        </div>
      </div>

      {/* Hint Button */}
      <div className="hint-container">
        <button className="hint-button" onClick={toggleHint}>
          {showHint ? '🫥 Hide Hint' : '👁️ Show Hint'}
        </button>
      </div>

      {/* Hint Image */}
      {showHint && (
        <div className="hint-image-container">
          <div className="hint-label">💡 Hint: This is how it should look!</div>
          <img 
            src={`${process.env.PUBLIC_URL}/jigsaw-hint.jpg`} 
            alt="Jigsaw puzzle hint" 
            className="hint-image"
          />
        </div>
      )}

      {/* Puzzle Area */}
      <div className="puzzle-area">
        <div className="puzzle-grid">
          {pieces.map(piece => (
            <div
              key={piece.id}
              data-piece-id={piece.id}
              className={`puzzle-piece ${piece.isCorrect ? 'correct' : 'incorrect'} ${draggedPiece?.id === piece.id ? 'dragging' : ''} ${isDragging && draggedPiece?.id === piece.id ? 'touch-dragging' : ''}`}
              style={{
                left: `${getPositionX(piece.currentPosition)}%`,
                top: `${getPositionY(piece.currentPosition)}%`
              }}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, piece)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, piece)}
              onTouchStart={(e) => handleTouchStart(e, piece)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={`/JIGSAW/piece_${piece.id + 1}.jpg`}
                alt={`Jigsaw piece ${piece.id + 1}`}
                className="piece-image"
                draggable={false}
                onError={(e) => {
                  console.log(`Failed to load piece ${piece.id + 1}`);
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="jigsaw-instructions">
        <div className="instruction-bubble">
          <div className="instruction-icon">💡</div>
          <p className="instruction-text">Drag and swap pieces to complete the puzzle!</p>
          <p className="instruction-text-mobile">On mobile: Tap and hold a piece, then tap another to swap!</p>
        </div>
      </div>

      {/* Celebration */}
      {showCelebration && (
        <div className="celebration-overlay">
          <div className="celebration-content">
            <h2 className="celebration-title">🎉 Amazing! 🎉</h2>
            <p className="celebration-message">You completed the puzzle!</p>
            <div className="celebration-emojis">
              <span className="emoji">🎂</span>
              <span className="emoji">✨</span>
              <span className="emoji">🎉</span>
              <span className="emoji">💖</span>
              <span className="emoji">🎁</span>
            </div>
          </div>
        </div>
      )}

      {showMemories && (
        <div className="memories-overlay">
          <div className="memories-content">
            <div className="memories-image-container">
              <img 
                src="/jigsaw-original.jpg" 
                alt="Precious Memories" 
                className="memories-image"
              />
            </div>
            <div className="memories-text">
              <h2 className="memories-title">Precious Memories ✨</h2>
              <p className="memories-message">
                Every piece of this puzzle represents a beautiful moment we've shared together. 
                Just like putting together these pieces, our journey has been about creating 
                something wonderful from all the little moments that make us who we are.
              </p>
              <p className="memories-submessage">
                Thank you for being such an amazing part of my life! 💖
              </p>
              <button 
                className="memories-continue-btn"
                onClick={handleContinueFromMemories}
              >
                Continue the Adventure →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JigsawPuzzle;
