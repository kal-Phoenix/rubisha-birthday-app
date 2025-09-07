import React, { useState, useEffect } from 'react';
import './PhotoGallery.css';

const PhotoGallery = ({ onComplete }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  const photos = [
    {
      id: 1,
      image: "/jigsaw-original.jpg",
      quote: "Every piece of this puzzle represents a beautiful moment we've shared together. Just like putting together these pieces, our journey has been about creating something wonderful from all the little moments that make us who we are.",
      subtext: "Thank you for being such an amazing part of my life! 💖"
    },
    {
      id: 2,
      image: "/jigsaw-original.jpg", // Replace with actual photo
      quote: "Life is like a collection of memories, and you've been the brightest star in mine. Each moment with you feels like a perfect snapshot in time.",
      subtext: "You make every day special! ✨"
    },
    {
      id: 3,
      image: "/jigsaw-original.jpg", // Replace with actual photo
      quote: "In the gallery of my heart, your smile is the most beautiful picture. You've painted my world with colors I never knew existed.",
      subtext: "Your happiness is my greatest joy! 🌈"
    },
    {
      id: 4,
      image: "/jigsaw-original.jpg", // Replace with actual photo
      quote: "Like a photographer capturing the perfect moment, you've captured my heart in the most beautiful way possible.",
      subtext: "You are my favorite memory! 📸"
    },
    {
      id: 5,
      image: "/jigsaw-original.jpg", // Replace with actual photo
      quote: "Every laugh, every smile, every shared moment - they're all precious frames in the movie of our friendship.",
      subtext: "Here's to many more beautiful moments! 🎬"
    }
  ];

  useEffect(() => {
    // Show quote after photo loads
    const timer = setTimeout(() => {
      setShowQuote(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentPhoto]);

  const handleNextPhoto = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setShowQuote(false);
    
    setTimeout(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrevPhoto = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setShowQuote(false);
    
    setTimeout(() => {
      setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
      setIsAnimating(false);
    }, 300);
  };

  const handleComplete = () => {
    onComplete(5);
  };

  const currentPhotoData = photos[currentPhoto];

  return (
    <div className="photo-gallery">
      {/* Animated Background */}
      <div className="gallery-background">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-heart">💖</div>
        <div className="floating-star">⭐</div>
        <div className="floating-camera">📸</div>
        <div className="floating-magic">✨</div>
      </div>

      {/* Header */}
      <div className="gallery-header">
        <h1 className="gallery-title">
          <span className="title-icon">📸</span>
          <span className="title-text">Precious Memories</span>
          <span className="title-icon">✨</span>
        </h1>
        <p className="gallery-subtitle">A collection of beautiful moments we've shared together</p>
      </div>

      {/* Photo Stack Container */}
      <div className="photo-stack-container">
        {/* Photo Stack */}
        <div className="photo-stack">
          {photos.map((photo, index) => {
            const isCurrent = index === currentPhoto;
            const isNext = index === (currentPhoto + 1) % photos.length;
            const isPrev = index === (currentPhoto - 1 + photos.length) % photos.length;
            const isVisible = isCurrent || isNext || isPrev;
            
            if (!isVisible) return null;

            return (
              <div
                key={photo.id}
                className={`photo-card ${isCurrent ? 'current' : ''} ${isNext ? 'next' : ''} ${isPrev ? 'prev' : ''} ${isAnimating ? 'animating' : ''}`}
                style={{ zIndex: photos.length - index }}
              >
                <div className="photo-image-container">
                  <img
                    src={photo.image}
                    alt={`Memory ${photo.id}`}
                    className="photo-image"
                  />
                  <div className="photo-overlay"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quote Card */}
        <div className={`quote-card ${showQuote ? 'show' : ''}`}>
          <div className="quote-content">
            <h2 className="quote-title">Precious Memories ✨</h2>
            <p className="quote-text">{currentPhotoData.quote}</p>
            <p className="quote-subtext">{currentPhotoData.subtext}</p>
            <div className="quote-actions">
              <button 
                className="nav-button prev-btn" 
                onClick={handlePrevPhoto}
                disabled={isAnimating}
              >
                ← Previous
              </button>
              <button 
                className="nav-button next-btn" 
                onClick={handleNextPhoto}
                disabled={isAnimating}
              >
                Next →
              </button>
            </div>
            <button 
              className="continue-btn" 
              onClick={handleComplete}
            >
              Continue the Adventure →
            </button>
          </div>
        </div>
      </div>

      {/* Photo Counter */}
      <div className="photo-counter">
        <span className="current-number">{currentPhoto + 1}</span>
        <span className="total-number">/{photos.length}</span>
      </div>
    </div>
  );
};

export default PhotoGallery;
