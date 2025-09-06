# 📁 Project Structure

```
birthday-website/
├── public/                     # Static files
│   ├── index.html             # Main HTML template
│   └── New Folder/            # Photo assets
│       ├── old/               # Old memories photos
│       └── new/               # Recent photos
├── src/                       # Source code
│   ├── components/            # React components
│   │   ├── index.js          # Component exports
│   │   ├── StartPage.js      # Profile & birthday card
│   │   ├── StartPage.css     # Start page styling
│   │   ├── MatchingPuzzle.js # Puzzle game component
│   │   ├── MatchingPuzzle.css # Puzzle styling
│   │   ├── RewardScreen.js   # Celebration screen
│   │   ├── RewardScreen.css  # Reward styling
│   │   ├── Slideshow.js      # Photo gallery
│   │   ├── Slideshow.css     # Slideshow styling
│   │   ├── FinalScreen.js    # Thank you screen
│   │   └── FinalScreen.css   # Final screen styling
│   ├── utils/                 # Utility functions
│   │   ├── constants.js      # Game data & constants
│   │   └── animations.js     # Animation utilities
│   ├── App.js                # Main app component
│   ├── App.css               # Global app styles
│   ├── index.js              # React entry point
│   └── index.css             # Base styles
├── .gitignore                # Git ignore rules
├── package.json              # Dependencies & scripts
├── README.md                 # Project documentation
└── PROJECT_STRUCTURE.md      # This file
```

## 🎯 Component Architecture

### **App.js** - Main Application
- Manages global state and screen transitions
- Handles routing between different screens
- Coordinates data flow between components

### **StartPage** - Profile & Birthday Card
- Displays Rubisha's profile photo
- Shows birthday message and date
- Floating emoji animations
- Start game button

### **MatchingPuzzle** - Interactive Game
- 21 book-themed matching pairs
- Click-to-match functionality
- Visual feedback (correct/wrong)
- Progress tracking
- Success animations

### **RewardScreen** - Celebration
- Confetti burst animation
- Win message display
- Score display
- Continue to photos button

### **Slideshow** - Photo Gallery
- Book-themed birthday messages
- Auto-play functionality
- Navigation controls
- Responsive image display

### **FinalScreen** - Thank You
- Final birthday message
- Celebration emojis
- Play again option

## 🛠️ Utility Functions

### **constants.js** - Data Management
- `PUZZLE_PAIRS` - All matching pairs
- `SLIDES_DATA` - Photo slideshow data
- `FLOATING_EMOJIS` - Animation emojis
- `CONFETTI_COLORS` - Celebration colors

### **animations.js** - Animation Helpers
- `createSuccessEffect()` - Success popup
- `createWrongEffect()` - Wrong answer feedback
- `createConfettiBurst()` - Confetti animation
- `createWinMessage()` - Win celebration

## 🎨 Styling Architecture

Each component has its own CSS file for:
- Component-specific styles
- Responsive design
- Animations and transitions
- Hover effects and interactions

Global styles are in:
- `App.css` - Shared component styles
- `index.css` - Base styles and resets

## 📱 Responsive Design

All components include:
- Mobile-first approach
- Flexible grid layouts
- Scalable typography
- Touch-friendly interactions
- Optimized for all screen sizes

## 🚀 Development Workflow

1. **Development**: `npm start`
2. **Build**: `npm run build`
3. **Preview**: `npm run preview`
4. **Lint**: `npm run lint`
5. **Test**: `npm test`
