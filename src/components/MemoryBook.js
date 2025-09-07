import React, { useState, useEffect } from 'react';
import './MemoryBook.css';

const MemoryBook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false);

  // Memory pages organized from old to new
  const memoryPages = [
    // Old photos first
    {
      id: 1,
      note: "Every journey begins with a single step, and ours started with the most beautiful smile I'd ever seen. This is where our story began...",
      image: "/photos/old/DSC08525.JPG",
      date: "The Beginning"
    },
    {
      id: 2,
      note: "Remember those early days when everything felt new and exciting? We were discovering each other and creating the foundation of our friendship.",
      image: "/photos/old/DSC08526.JPG",
      date: "Early Days"
    },
    {
      id: 3,
      note: "Adventures await those who dare to dream. Together, we've created memories that will last a lifetime.",
      image: "/photos/old/DSC08527.JPG",
      date: "Our Adventures"
    },
    {
      id: 4,
      note: "Through every season, through every change, one thing remains constant - our friendship and the joy we bring to each other's lives.",
      image: "/photos/old/DSC08528.JPG",
      date: "Growing Together"
    },
    {
      id: 5,
      note: "Each moment we shared became a precious memory, building the beautiful story of our friendship.",
      image: "/photos/old/DSC08529.JPG",
      date: "Precious Moments"
    },
    {
      id: 6,
      note: "Laughter has always been our language, and these moments of pure joy are what I treasure most about our time together.",
      image: "/photos/old/DSC08532.JPG",
      date: "Laughter & Joy"
    },
    {
      id: 7,
      note: "As time passed, our bond only grew stronger. We became each other's constants in a changing world.",
      image: "/photos/old/DSC08533.JPG",
      date: "Stronger Bonds"
    },
    {
      id: 8,
      note: "These memories are the threads that weave together the beautiful tapestry of our friendship.",
      image: "/photos/old/DSC08534.JPG",
      date: "Woven Memories"
    },
    {
      id: 9,
      note: "Every photo tells a story, and every story reminds me of how grateful I am to have you in my life.",
      image: "/photos/old/DSC08535.JPG",
      date: "Stories We Share"
    },
    {
      id: 10,
      note: "The best friendships are those that grow and evolve, becoming more beautiful with each passing year.",
      image: "/photos/old/DSC08536.JPG",
      date: "Evolving Friendship"
    },
    {
      id: 11,
      note: "Through all the ups and downs, you've been my anchor, my confidant, and my greatest cheerleader.",
      image: "/photos/old/DSC08537.JPG",
      date: "My Anchor"
    },
    {
      id: 12,
      note: "These moments captured in time are proof that the best things in life are the people we love and the memories we create together.",
      image: "/photos/old/DSC08538.JPG",
      date: "Captured in Time"
    },
    {
      id: 13,
      note: "As we grew older, our friendship only deepened. We became family, chosen family, and that's the most beautiful kind.",
      image: "/photos/old/DSC08539.JPG",
      date: "Chosen Family"
    },
    {
      id: 14,
      note: "Every year brings new adventures, new challenges, and new reasons to celebrate our incredible friendship.",
      image: "/photos/old/DSC08546.JPG",
      date: "New Adventures"
    },
    {
      id: 15,
      note: "The years may pass, but the love and laughter we share remain timeless and precious.",
      image: "/photos/old/DSC08547.JPG",
      date: "Timeless Love"
    },
    {
      id: 16,
      note: "These photos are more than just images - they're windows into our shared history and the beautiful life we've built together.",
      image: "/photos/old/DSC08548.JPG",
      date: "Shared History"
    },
    {
      id: 17,
      note: "As we approach the present, I'm filled with gratitude for all the beautiful moments we've shared and all the ones yet to come.",
      image: "/photos/old/DSC08549.JPG",
      date: "Gratitude"
    },
    {
      id: 18,
      note: "The journey continues, and I can't wait to see what beautiful memories we'll create in the years ahead.",
      image: "/photos/old/DSC08550.JPG",
      date: "The Journey Continues"
    },
    {
      id: 19,
      note: "Recent memories that show how our friendship has blossomed into something truly special and irreplaceable.",
      image: "/photos/old/DSC08551.JPG",
      date: "Recent Memories"
    },
    {
      id: 20,
      note: "Every new photo is a reminder of how lucky I am to have you as my friend, my confidant, and my chosen family.",
      image: "/photos/old/DSC08552.JPG",
      date: "Lucky Me"
    },
    {
      id: 21,
      note: "As we move into the present, these moments show the beautiful person you've become and the amazing friendship we share.",
      image: "/photos/old/DSC08553.JPG",
      date: "Beautiful You"
    },
    {
      id: 22,
      note: "The present moment is a gift, and I'm so grateful to be sharing it with someone as wonderful as you.",
      image: "/photos/old/DSC08554.JPG",
      date: "Present Moment"
    },
    {
      id: 23,
      note: "These recent photos capture the essence of who we are today - stronger, wiser, and more connected than ever.",
      image: "/photos/old/DSC08555.JPG",
      date: "Who We Are Today"
    },
    {
      id: 24,
      note: "As we transition to the newest memories, I'm reminded that the best is always yet to come when we're together.",
      image: "/photos/old/DSC08556.JPG",
      date: "Best Yet to Come"
    },
    {
      id: 25,
      note: "The newest memories show how our friendship continues to grow and flourish, bringing joy to both our lives.",
      image: "/photos/old/DSC08557.JPG",
      date: "Flourishing Friendship"
    },
    {
      id: 26,
      note: "These moments are fresh in our minds, proof that our friendship is alive, vibrant, and full of endless possibilities.",
      image: "/photos/old/DSC08558.JPG",
      date: "Fresh Moments"
    },
    {
      id: 27,
      note: "As we reach the present day, I'm filled with excitement for all the beautiful memories we'll create together in the future.",
      image: "/photos/old/DSC08559.JPG",
      date: "Present Day"
    },
    {
      id: 28,
      note: "The newest photos show us as we are now - two friends who have grown together, learned together, and loved together.",
      image: "/photos/old/DSC09126.JPG",
      date: "Growing Together"
    },
    {
      id: 29,
      note: "These recent memories are a testament to the strength and beauty of our friendship, and I treasure each one.",
      image: "/photos/old/DSC09127.JPG",
      date: "Treasure Each One"
    },
    {
      id: 30,
      note: "As we move into the very latest photos, I'm reminded that our story is still being written, and it's beautiful.",
      image: "/photos/old/DSC09128.JPG",
      date: "Story Still Being Written"
    },
    {
      id: 31,
      note: "The latest memories show the incredible person you've become and the amazing friendship we continue to build together.",
      image: "/photos/old/DSC09129.JPG",
      date: "Incredible You"
    },
    {
      id: 32,
      note: "These newest photos capture the joy, laughter, and love that define our friendship today.",
      image: "/photos/old/DSC09150.JPG",
      date: "Joy & Laughter"
    },
    {
      id: 33,
      note: "As we transition to the most recent photos, I'm filled with gratitude for every moment we've shared.",
      image: "/photos/old/DSC09151.JPG",
      date: "Gratitude"
    },
    {
      id: 34,
      note: "The newest memories show how our friendship has evolved into something truly magical and irreplaceable.",
      image: "/photos/old/DSC09152.JPG",
      date: "Magical Friendship"
    },
    {
      id: 35,
      note: "These recent photos are proof that the best friendships only get better with time, and ours is no exception.",
      image: "/photos/old/DSC09177.JPG",
      date: "Better With Time"
    },
    {
      id: 36,
      note: "As we reach the very latest photos, I'm reminded that our friendship is a gift that keeps on giving.",
      image: "/photos/old/DSC09181.JPG",
      date: "Gift That Keeps Giving"
    },
    {
      id: 37,
      note: "The most recent photos show us as we are now - two friends who have created something truly beautiful together.",
      image: "/photos/old/DSC09362.JPG",
      date: "Something Beautiful"
    },
    {
      id: 38,
      note: "These latest memories are a celebration of our friendship and all the wonderful moments we've shared.",
      image: "/photos/old/DSC09363.JPG",
      date: "Celebration of Friendship"
    },
    {
      id: 39,
      note: "As we transition to the newest photos, I'm filled with excitement for all the beautiful memories yet to come.",
      image: "/photos/old/DSC09364.JPG",
      date: "Memories Yet to Come"
    },
    // New photos
    {
      id: 40,
      note: "The newest photos show us in the present moment, creating memories that will become the foundation of our future.",
      image: "/photos/new/Screenshot 2025-09-06 190523.png",
      date: "Present Moment"
    },
    {
      id: 41,
      note: "These recent captures show the beautiful person you are today and the amazing friendship we continue to build.",
      image: "/photos/new/Screenshot 2025-09-06 190720.png",
      date: "Beautiful Today"
    },
    {
      id: 42,
      note: "The latest memories are proof that our friendship is alive, vibrant, and full of endless possibilities.",
      image: "/photos/new/Screenshot 2025-09-06 191035.png",
      date: "Endless Possibilities"
    },
    {
      id: 43,
      note: "These newest photos capture the joy, laughter, and love that define our friendship in this moment.",
      image: "/photos/new/photo_2025-09-07_02-04-56.jpg",
      date: "This Moment"
    },
    {
      id: 44,
      note: "The most recent memories show us as we are now - two friends who have grown together and continue to create magic.",
      image: "/photos/new/photo_2025-09-07_02-04-56 (2).jpg",
      date: "Creating Magic"
    },
    {
      id: 45,
      note: "These latest photos are a testament to the strength and beauty of our friendship, and I treasure each one.",
      image: "/photos/new/photo_2025-09-07_02-04-58.jpg",
      date: "Strength & Beauty"
    },
    {
      id: 46,
      note: "As we reach the very newest photos, I'm reminded that our story is still being written, and it's beautiful.",
      image: "/photos/new/photo_2025-09-07_02-04-59.jpg",
      date: "Beautiful Story"
    },
    {
      id: 47,
      note: "The newest photos show the incredible person you've become and the amazing friendship we continue to build together.",
      image: "/photos/new/jigsaw.png",
      date: "Incredible Friendship"
    }
  ];

  useEffect(() => {
    console.log('MemoryBook component loaded');
    console.log('Total memory pages:', memoryPages.length);
    console.log('First image:', memoryPages[0]?.image);
    
    // Auto-open the book after a short delay
    const timer = setTimeout(() => {
      setIsBookOpen(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleNextPage = () => {
    if (currentPage < memoryPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const currentMemory = memoryPages[currentPage];

  return (
    <div className="memory-book-container">
      <div style={{color: 'white', fontSize: '2rem', textAlign: 'center', marginBottom: '20px'}}>
        MemoryBook Component Loaded! Total Pages: {memoryPages.length}
      </div>
      <div className={`memory-book ${isBookOpen ? 'open' : ''}`}>
        {/* Book Cover */}
        <div className="book-cover">
          <div className="cover-content">
            <h1 className="book-title">Our Journey Together</h1>
            <p className="book-subtitle">A Collection of Precious Memories</p>
            <div className="cover-decoration">✨</div>
          </div>
        </div>

        {/* Book Pages */}
        <div className="book-pages">
          {/* Left Page - Note */}
          <div className="page left-page">
            <div className="page-content">
              <div className="note-header">
                <h3 className="note-date">{currentMemory.date}</h3>
                <div className="page-number">{currentPage + 1} / {memoryPages.length}</div>
              </div>
              <div className="note-content">
                <p className="note-text">{currentMemory.note}</p>
              </div>
              <div className="note-decoration">
                <div className="decorative-line"></div>
                <span className="decorative-heart">💖</span>
                <div className="decorative-line"></div>
              </div>
            </div>
          </div>

          {/* Right Page - Photo */}
          <div className="page right-page">
            <div className="photo-container">
              <img 
                src={currentMemory.image} 
                alt={currentMemory.date}
                className="memory-photo"
                onError={(e) => {
                  console.log('Image failed to load:', currentMemory.image);
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                }}
              />
              <div className="photo-frame"></div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="book-controls">
          <button 
            className="nav-button prev-button" 
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            ← Previous
          </button>
          
          <div className="page-indicators">
            {memoryPages.map((_, index) => (
              <button
                key={index}
                className={`page-dot ${index === currentPage ? 'active' : ''}`}
                onClick={() => handlePageClick(index)}
              />
            ))}
          </div>
          
          <button 
            className="nav-button next-button" 
            onClick={handleNextPage}
            disabled={currentPage === memoryPages.length - 1}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoryBook;
