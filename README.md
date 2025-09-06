# 🎂 Birthday Website for Rubisha

A beautiful, interactive React-based birthday website featuring a book-themed matching puzzle game and photo slideshow.

## ✨ Features

- **🎨 Beautiful Profile Page** - Custom birthday card with Rubisha's photo
- **🧩 Interactive Matching Puzzle** - 21 book-themed pairs to match
- **🎊 Celebration Animations** - Confetti and success effects
- **📸 Photo Slideshow** - Book-themed birthday messages
- **📱 Fully Responsive** - Works on all devices
- **🎯 Modern React Architecture** - Clean, maintainable code

## 📚 Book Series Included

- **Percy Jackson** - Camp Half-Blood, Annabeth, Riptide, Poseidon
- **Narnia** - Wardrobe, Aslan, White Witch, The Silver Chair
- **Keeper of the Lost Cities** - Stellarlune, Sophie Foster, Telepathy, Elvin world
- **Baby-Sitters Club** - Stoneybrook, Kristy, Babysitting notebook, Claudia
- **Princess X** - Manga comic, May, Libby
- **Hamster Princess** - Harriet, Ogrecat

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd birthday-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── StartPage.js     # Profile and birthday card
│   ├── StartPage.css    # Styling for start page
│   ├── MatchingPuzzle.js # Interactive puzzle game
│   ├── MatchingPuzzle.css # Puzzle styling
│   ├── RewardScreen.js  # Celebration screen
│   ├── RewardScreen.css # Reward styling
│   ├── Slideshow.js     # Photo gallery
│   ├── Slideshow.css    # Slideshow styling
│   ├── FinalScreen.js   # Thank you screen
│   └── FinalScreen.css  # Final screen styling
├── App.js               # Main app component
├── App.css              # Global styles
├── index.js             # React entry point
└── index.css            # Base styles
```

## 🎮 How to Play

1. **Start Page** - View the beautiful birthday card with Rubisha's profile
2. **Matching Puzzle** - Click items and worlds to match them correctly
3. **Celebration** - Enjoy confetti and success animations
4. **Photo Slideshow** - Browse photos with book-themed messages
5. **Final Screen** - Thank you message and play again option

## 🎨 Customization

### Adding New Photos
Place photos in the `public/New Folder/` directory:
- `old/` - For old memories
- `new/` - For recent photos

### Modifying Puzzle Pairs
Edit the `puzzlePairs` array in `src/components/MatchingPuzzle.js`:

```javascript
const puzzlePairs = [
  { item: "Your Item", world: "Your World" },
  // Add more pairs...
];
```

### Styling
All components have their own CSS files for easy customization:
- Colors: Purple theme (`#8B5FBF`, `#C77DFF`, `#E0AAFF`)
- Fonts: Poppins and Comic Neue
- Animations: CSS keyframes for smooth effects

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All screen sizes

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App

## 🎯 Technologies Used

- **React 18** - Modern React with hooks
- **CSS3** - Advanced styling with animations
- **JavaScript ES6+** - Modern JavaScript features
- **HTML5** - Semantic markup
- **Google Fonts** - Poppins and Comic Neue fonts
- **Font Awesome** - Icons

## 📄 License

This project is created for Rubisha's birthday celebration.

## 🎉 Happy Birthday Rubisha!

Wishing you an amazing year filled with joy, laughter, and wonderful adventures! 🎂✨