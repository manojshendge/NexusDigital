import { useCallback } from "react";

const useCounter = () => {
  const start = useCallback((elements: NodeListOf<Element>) => {
    elements.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target') || "0");
      let count = 0;
      const increment = target / 100;
      
      const updateCounter = () => {
        if (count < target) {
          count += increment;
          counter.textContent = Math.ceil(count).toString();
          setTimeout(updateCounter, 10);
        } else {
          counter.textContent = target.toString();
        }
      };
      
      updateCounter();
    });
  }, []);

  return { start };
};

export default useCounter;
