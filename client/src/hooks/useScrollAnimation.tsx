import { useEffect, useRef } from "react";

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

const useScrollAnimation = (
  animationClass: string, 
  options: ScrollAnimationOptions = {}
) => {
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const { threshold = 0.1, rootMargin = "0px", once = true } = options;
    const element = ref.current;
    
    if (!element) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            entry.target.classList.remove(animationClass);
          }
        });
      },
      { threshold, rootMargin }
    );
    
    observer.observe(element);
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [animationClass, options]);
  
  return ref;
};

export default useScrollAnimation;
