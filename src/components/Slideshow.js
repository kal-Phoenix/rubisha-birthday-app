import React, { useState, useEffect } from 'react';
import { SLIDES_DATA } from '../utils/constants';
import './Slideshow.css';

const Slideshow = ({ onPlayAgain }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const slides = SLIDES_DATA;

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Touch handlers for swipe navigation
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className="slideshow-screen">
      <div 
        className="gift-card-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`gift-card ${index === currentSlide ? 'active' : ''}`}
            data-card={index}
          >
            <div className="card-cover">
              <div className="card-ribbon">
                <div className="ribbon-text">Happy Birthday Rubisha! 🎂</div>
                <div className="ribbon-bow">🎀</div>
              </div>
              <div className="card-sparkles">
                <div className="sparkle">✨</div>
                <div className="sparkle">⭐</div>
                <div className="sparkle">💫</div>
                <div className="sparkle">✨</div>
              </div>
            </div>
            <div className="card-content">
              <div className="photo-container">
                <img 
                  src={slide.image} 
                  alt="Birthday memory" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'block';
                  }}
                />
                <div style={{display: 'none', fontSize: '4rem', color: '#ff6b6b'}}>📸</div>
              </div>
              <div className="card-message">
                <h2>{slide.title}</h2>
                <p>{slide.message}</p>
                <div className="message-hearts">{slide.hearts}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="slideshow-controls">
        <button className="slide-btn" onClick={prevSlide}>←</button>
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
        <button className="slide-btn" onClick={nextSlide}>→</button>
      </div>
      
      <div className="slideshow-actions">
        <button className="btn btn-primary" onClick={toggleAutoPlay}>
          {isAutoPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>
        <button className="btn btn-primary" onClick={onPlayAgain}>
          🔄 Play Again
        </button>
      </div>
    </div>
  );
};

export default Slideshow;
