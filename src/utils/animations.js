// Animation utility functions
export const createSuccessEffect = () => {
  const effect = document.createElement('div');
  effect.innerHTML = '✓ Perfect Match!';
  effect.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(45deg, #32CD32, #90EE90);
    color: white;
    padding: 1rem 2rem;
    border-radius: 25px;
    font-weight: bold;
    font-size: 1.5rem;
    z-index: 1000;
    animation: successPop 1s ease-out forwards;
    font-family: 'Comic Neue', cursive;
  `;
  
  document.body.appendChild(effect);
  
  setTimeout(() => {
    if (effect.parentNode) {
      effect.parentNode.removeChild(effect);
    }
  }, 1000);
};

export const createWrongEffect = () => {
  const effect = document.createElement('div');
  effect.innerHTML = '❌ Try Again!';
  effect.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(45deg, #FF4500, #FF6347);
    color: white;
    padding: 1rem 2rem;
    border-radius: 25px;
    font-weight: bold;
    font-size: 1.5rem;
    z-index: 1000;
    animation: wrongPop 1s ease-out forwards;
    font-family: 'Comic Neue', cursive;
  `;
  
  document.body.appendChild(effect);
  
  setTimeout(() => {
    if (effect.parentNode) {
      effect.parentNode.removeChild(effect);
    }
  }, 1000);
};

export const createConfettiBurst = (colors) => {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: fixed;
      width: 15px;
      height: 15px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${Math.random() * 100}vw;
      top: -20px;
      z-index: 1000;
      animation: confettiFall 4s linear forwards;
      border-radius: 50%;
    `;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.parentNode.removeChild(confetti);
      }
    }, 4000);
  }
};

export const createWinMessage = () => {
  const message = document.createElement('div');
  message.innerHTML = '🎉 <strong>You did it! Happy Birthday Rubisha!</strong> 🎉';
  message.style.cssText = `
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(45deg, #8B5FBF, #C77DFF, #E0AAFF);
    color: white;
    padding: 2rem 3rem;
    border-radius: 30px;
    font-weight: bold;
    font-size: 2rem;
    z-index: 1000;
    text-align: center;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    animation: winBounce 2s ease-out;
    font-family: 'Comic Neue', cursive;
  `;
  
  document.body.appendChild(message);
  
  setTimeout(() => {
    if (message.parentNode) {
      message.parentNode.removeChild(message);
    }
  }, 3000);
};
