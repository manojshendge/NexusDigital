import { useEffect, useRef } from "react";
import useTypewriter from "@/hooks/useTypewriter";
import useCounter from "@/hooks/useCounter";

const Hero = () => {
  const counterRef = useRef<HTMLDivElement>(null);
  const typedText = useTypewriter([
    "We Build. We Market. We Scale.",
    "Transform Your Digital Presence.",
    "Innovate. Create. Dominate."
  ], 100, 1500);
  
  const { start: startCounters } = useCounter();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const counters = counterRef.current?.querySelectorAll('.counter');
          if (counters) {
            startCounters(counters);
          }
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.5 }
    );
    
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    
    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [startCounters]);
  
  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28 bg-light dark:bg-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/20 dark:bg-secondary/10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0" data-aos="fade-right">
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 dark:text-white">
              Empowering Your <span className="gradient-text">Digital Vision</span>
            </h1>
            
            <div className="h-8 mb-6 overflow-hidden">
              <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-400">
                {typedText}
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 md:pr-10">
              Cutting-edge digital marketing and software solutions that drive growth and transform your business for the digital age.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#contact" className="bg-gradient hover:opacity-90 text-white py-3 px-8 rounded-full font-medium transition text-center shadow-lg hover:shadow-xl">
                Get a Free Quote
              </a>
              <a href="#services" className="bg-transparent border-2 border-primary hover:bg-primary/10 text-primary dark:text-primary-light py-3 px-8 rounded-full font-medium transition text-center">
                Explore Services
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2 relative" data-aos="fade-up">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-2xl blur-lg"></div>
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80" 
                   alt="Digital Marketing and Software Development" 
                   className="rounded-2xl shadow-xl relative z-10 w-full transform transition duration-500 hover:scale-[1.02]" />
            </div>
          </div>
        </div>
        
        <div ref={counterRef} className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-montserrat font-bold gradient-text counter" data-target="150">0</div>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Clients Worldwide</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-montserrat font-bold gradient-text counter" data-target="200">0</div>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Projects Completed</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-montserrat font-bold gradient-text counter" data-target="97">0</div>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-montserrat font-bold gradient-text">
              <span className="counter" data-target="10">0</span>+
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
