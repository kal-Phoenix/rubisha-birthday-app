import React, { useState, useEffect } from 'react';
import './BookGallery.css';

const BookGallery = ({ onPlayAgain }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTurning, setIsTurning] = useState(false);

  // Photo data - you can add more photos here
  const photos = [
    {
      id: 1,
      src: '/profile.png',
      caption: "Happy Birthday Rubisha! 🎂",
      pageNumber: 1
    },
    {
      id: 2,
      src: '/jigsaw-original.jpg',
      caption: "Beautiful memories together 💖",
      pageNumber: 2
    },
    // Add more photos as needed
    {
      id: 3,
      src: '/profile.png',
      caption: "Another wonderful moment ✨",
      pageNumber: 3
    },
    {
      id: 4,
      src: '/jigsaw-original.jpg',
      caption: "More memories to cherish 🌟",
      pageNumber: 4
    }
  ];

  const totalPages = photos.length;

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
      }, 4000); // Change page every 4 seconds

      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, totalPages]);

  const handleNextPage = () => {
    if (isTurning) return;
    setIsTurning(true);
    setCurrentPage((prev) => (prev + 1) % totalPages);
    setTimeout(() => setIsTurning(false), 1000);
  };

  const handlePrevPage = () => {
    if (isTurning) return;
    setIsTurning(true);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setTimeout(() => setIsTurning(false), 1000);
  };

  const handlePageClick = (pageIndex) => {
    if (isTurning) return;
    setIsTurning(true);
    setCurrentPage(pageIndex);
    setTimeout(() => setIsTurning(false), 1000);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="book-gallery">
      {/* Animated Background */}
      <div className="book-background">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-book">📖</div>
        <div className="floating-heart">💖</div>
        <div className="floating-star">⭐</div>
        <div className="floating-sparkle">✨</div>
      </div>

      {/* Header */}
      <div className="book-header">
        <h1 className="book-title">
          <span className="title-icon">📖</span>
          <span className="title-text">Rubisha's Birthday Book</span>
          <span className="title-icon">🎂</span>
        </h1>
        <p className="book-subtitle">Turn the pages to see beautiful memories...</p>
      </div>

      {/* Book Container */}
      <div className="book-container">
        <div className="book">
          {/* Book Binding */}
          <div className="book-binding"></div>
          
          {/* Book Pages */}
          <div className="book-pages">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className={`book-page ${index === currentPage ? 'active' : ''} ${index < currentPage ? 'turned' : ''}`}
                style={{ zIndex: totalPages - index }}
              >
                <div className="page-content">
                  <div className="photo-container">
                    <img
                      src={photo.src}
                      alt={`Memory ${photo.pageNumber}`}
                      className="photo"
                    />
                  </div>
                  <div className="photo-caption">
                    <h3>{photo.caption}</h3>
                    <div className="page-number">Page {photo.pageNumber}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="book-controls">
        <button 
          className="control-btn prev-btn" 
          onClick={handlePrevPage}
          disabled={isTurning}
        >
          <span className="btn-icon">←</span>
          Previous
        </button>
        
        <button 
          className="control-btn auto-play-btn" 
          onClick={toggleAutoPlay}
        >
          <span className="btn-icon">{isAutoPlaying ? '⏸️' : '▶️'}</span>
          {isAutoPlaying ? 'Pause' : 'Play'}
        </button>
        
        <button 
          className="control-btn next-btn" 
          onClick={handleNextPage}
          disabled={isTurning}
        >
          Next
          <span className="btn-icon">→</span>
        </button>
      </div>

      {/* Page Indicators */}
      <div className="page-indicators">
        {photos.map((_, index) => (
          <button
            key={index}
            className={`page-dot ${index === currentPage ? 'active' : ''}`}
            onClick={() => handlePageClick(index)}
            disabled={isTurning}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
          ></div>
        </div>
        <div className="progress-text">
          {currentPage + 1} of {totalPages}
        </div>
      </div>

      {/* Play Again Button */}
      <div className="play-again-container">
        <button className="play-again-btn" onClick={onPlayAgain}>
          <span className="btn-icon">🔄</span>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default BookGallery;
