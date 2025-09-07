import React, { useState } from 'react';

const SimpleMemoryBook = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Photo collection celebrating Rubisha - Happy birthday wishes
  const photos = [
    // Old photos (21 total)
    { src: "/photos/old/DSC08525.JPG", note: "Happy Birthday Rubisha! 🎂" },
    { src: "/photos/old/DSC08527.JPG", note: "Happy Birthday! Have a wonderful day! 🎉" },
    { src: "/photos/old/DSC08528.JPG", note: "Happy Birthday! Hope you have a great celebration! 🎈" },
    { src: "/photos/old/DSC08529.JPG", note: "Happy Birthday! Enjoy your special day! 🎁" },
    { src: "/photos/old/DSC08534.JPG", note: "Happy Birthday Rubisha! 🎂" },
    { src: "/photos/old/DSC08538.JPG", note: "Happy Birthday! Wishing you lots of joy! 🎉" },
    { src: "/photos/old/DSC08548.JPG", note: "Happy Birthday! Have an amazing day! 🎈" },
    { src: "/photos/old/DSC08552.JPG", note: "Happy Birthday! Hope it's fantastic! 🎁" },
    { src: "/photos/old/DSC08553.JPG", note: "Happy Birthday! Enjoy every moment! 🎂" },
    { src: "/photos/old/DSC08555.JPG", note: "Happy Birthday! Have a wonderful time! 🎉" },
    { src: "/photos/old/DSC09126.JPG", note: "Happy Birthday! Hope it's your best one yet! 🎈" },
    { src: "/photos/old/DSC09127.JPG", note: "Happy Birthday! Celebrate in style! 🎁" },
    { src: "/photos/old/DSC09128.JPG", note: "Happy Birthday! Have a blast! 🎂" },
    { src: "/photos/old/DSC09129.JPG", note: "Happy Birthday! Make it memorable! 🎉" },
    { src: "/photos/old/DSC09150.JPG", note: "Happy Birthday! Enjoy your day! 🎈" },
    { src: "/photos/old/DSC09151.JPG", note: "Happy Birthday! Have fun celebrating! 🎁" },
    { src: "/photos/old/DSC09152.JPG", note: "Happy Birthday! Hope it's amazing! 🎂" },
    { src: "/photos/old/DSC09181.JPG", note: "Happy Birthday! Party hard! 🎉" },
    { src: "/photos/old/DSC09362.JPG", note: "Happy Birthday! Have a great one! 🎈" },
    { src: "/photos/old/DSC09363.JPG", note: "Happy Birthday! Make it count! 🎁" },
    { src: "/photos/old/DSC09364.JPG", note: "Happy Birthday Rubisha! 🎂" },
    
    // New photos (8 total)
    { src: "/photos/new/Screenshot 2025-09-06 190523.png", note: "Happy Birthday! Have a wonderful day! 🎉" },
    { src: "/photos/new/Screenshot 2025-09-06 190720.png", note: "Happy Birthday! Hope you have a great celebration! 🎈" },
    { src: "/photos/new/Screenshot 2025-09-06 191035.png", note: "Happy Birthday! Enjoy your special day! 🎁" },
    { src: "/photos/new/photo_2025-09-07_02-04-56.jpg", note: "Happy Birthday! Have an amazing time! 🎂" },
    { src: "/photos/new/photo_2025-09-07_02-04-56 (2).jpg", note: "Happy Birthday! Celebrate big! 🎉" },
    { src: "/photos/new/photo_2025-09-07_02-04-58.jpg", note: "Happy Birthday! Hope it's fantastic! 🎈" },
    { src: "/photos/new/photo_2025-09-07_02-04-59.jpg", note: "Happy Birthday! Have a blast! 🎁" },
    { src: "/photos/new/photo_2025-09-07_02-51-39.jpg", note: "Happy Birthday! Make it memorable! 🎂" },
    { src: "/photos/new/jigsaw.png", note: "Happy Birthday Rubisha! 🎉" }
  ];

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const currentPhoto = photos[currentIndex];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        display: 'flex',
        maxWidth: '1200px',
        width: '100%',
        height: '80vh',
        background: 'white',
        borderRadius: '15px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        overflow: 'hidden'
      }}>
        {/* Left Side - Note */}
        <div style={{
          flex: 1,
          padding: '40px',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          borderRight: '2px solid #dee2e6'
        }}>
          <h2 style={{
            fontSize: '2rem',
            color: '#495057',
            marginBottom: '20px',
            fontWeight: 'bold'
          }}>
            Happy Birthday Rubisha! 🎂
          </h2>
          <p style={{
            fontSize: '1.2rem',
            lineHeight: '1.6',
            color: '#495057',
            fontStyle: 'italic',
            marginBottom: '30px'
          }}>
            {currentPhoto.note}
          </p>
          <div style={{
            fontSize: '1rem',
            color: '#667eea',
            fontWeight: 'bold'
          }}>
            {currentIndex + 1} / {photos.length}
          </div>
        </div>

        {/* Right Side - Photo */}
        <div style={{
          flex: 1,
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
        }}>
          <img
            src={currentPhoto.src}
            alt={`Memory ${currentIndex + 1}`}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'cover',
              borderRadius: '10px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
            }}
          />
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '20px',
        alignItems: 'center'
      }}>
        <button
          onClick={prevPhoto}
          style={{
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '25px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
          }}
        >
          ← Previous
        </button>
        
        <div style={{
          display: 'flex',
          gap: '8px'
        }}>
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                background: index === currentIndex ? '#FFD700' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>
        
        <button
          onClick={nextPhoto}
          style={{
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '25px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default SimpleMemoryBook;
