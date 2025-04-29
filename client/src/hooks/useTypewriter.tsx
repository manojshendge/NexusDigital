import { useState, useEffect } from "react";

const useTypewriter = (phrases: string[], typingSpeed = 100, pauseTime = 1500) => {
  const [displayText, setDisplayText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeCharacter = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      let newText = "";
      let delay = typingSpeed;
      
      if (isDeleting) {
        newText = currentPhrase.substring(0, currentCharIndex - 1);
        setCurrentCharIndex(currentCharIndex - 1);
        delay = typingSpeed / 2; // Delete faster than typing
      } else {
        newText = currentPhrase.substring(0, currentCharIndex + 1);
        setCurrentCharIndex(currentCharIndex + 1);
      }
      
      setDisplayText(newText);
      
      // Determine next state
      if (!isDeleting && currentCharIndex === currentPhrase.length) {
        delay = pauseTime; // Pause at end of phrase
        setIsDeleting(true);
      } else if (isDeleting && currentCharIndex === 0) {
        setIsDeleting(false);
        setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
        delay = 500; // Pause before typing next phrase
      }
      
      setTimeout(typeCharacter, delay);
    };
    
    const timerId = setTimeout(typeCharacter, 1000); // Start after 1s initial delay
    
    return () => clearTimeout(timerId);
  }, [currentCharIndex, currentPhraseIndex, isDeleting, phrases, pauseTime, typingSpeed]);
  
  return displayText;
};

export default useTypewriter;
