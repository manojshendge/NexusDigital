import { useState, useEffect, useRef } from "react";

const useTypewriter = (phrases: string[], typingSpeed = 100, pauseTime = 1500) => {
  const [displayText, setDisplayText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Clear existing timer when component unmounts or dependencies change
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const typeCharacter = () => {
      if (!phrases || phrases.length === 0) {
        return;
      }
      
      const currentPhrase = phrases[currentPhraseIndex];
      
      let newText = "";
      let delay = typingSpeed;
      
      if (isDeleting) {
        newText = currentPhrase.substring(0, currentCharIndex - 1);
        setCurrentCharIndex(prev => prev - 1);
        delay = typingSpeed / 2; // Delete faster than typing
      } else {
        newText = currentPhrase.substring(0, currentCharIndex + 1);
        setCurrentCharIndex(prev => prev + 1);
      }
      
      setDisplayText(newText);
      
      // Determine next state
      if (!isDeleting && currentCharIndex === currentPhrase.length) {
        delay = pauseTime; // Pause at end of phrase
        setIsDeleting(true);
      } else if (isDeleting && currentCharIndex === 0) {
        setIsDeleting(false);
        setCurrentPhraseIndex(prev => (prev + 1) % phrases.length);
        delay = 500; // Pause before typing next phrase
      }
      
      timerRef.current = setTimeout(typeCharacter, delay);
    };
    
    // Start the typewriter with a slight initial delay
    timerRef.current = setTimeout(typeCharacter, 400);
    
    // Cleanup on unmount or when dependencies change
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentCharIndex, currentPhraseIndex, isDeleting, phrases, pauseTime, typingSpeed]);
  
  return displayText;
};

export default useTypewriter;
