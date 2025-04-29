import { useState, useEffect } from "react";

const useWindowScroll = () => {
  const [scrollTop, setScrollTop] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.pageYOffset || document.documentElement.scrollTop);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return scrollTop;
};

export default useWindowScroll;
