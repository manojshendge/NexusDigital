import { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener("scroll", toggleVisibility);
    
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <button
      id="scrollToTop"
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient text-white shadow-lg flex items-center justify-center transform transition duration-300 hover:scale-110 z-50 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
};

export default ScrollToTop;
