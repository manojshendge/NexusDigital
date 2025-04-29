import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  
  return (
    <nav 
      id="navbar" 
      className={`fixed w-full z-50 transition-all duration-300 bg-white/90 dark:bg-dark-lighter/90 backdrop-blur-md ${
        isScrolled ? "py-2 shadow-md" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <div className="flex items-center">
            <div className="bg-gradient rounded-lg w-10 h-10 flex items-center justify-center mr-2">
              <span className="text-white font-bold text-lg">ND</span>
            </div>
            <span className="font-montserrat font-bold text-xl dark:text-white">Nexus<span className="gradient-text">Digital</span></span>
          </div>
        </a>
        
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition">Home</a>
          <a href="#services" className="font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition">Services</a>
          <a href="#about" className="font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition">About</a>
          <a href="#portfolio" className="font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition">Portfolio</a>
          <a href="#testimonials" className="font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition">Testimonials</a>
          <a href="#contact" className="font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition">Contact</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            aria-label={resolvedTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-dark-card dark:hover:bg-dark-lighter transition"
          >
            {resolvedTheme === 'dark' ? (
              <i className="fas fa-sun text-yellow-500"></i>
            ) : (
              <i className="fas fa-moon text-blue-300"></i>
            )}
          </button>
          
          <a href="#contact" className="hidden md:block bg-gradient hover:opacity-90 text-white py-2 px-6 rounded-full font-medium transition">
            Get Started
          </a>
          
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"} bg-white dark:bg-dark-lighter p-4 mt-2`}>
        <div className="flex flex-col space-y-4">
          <a href="#home" onClick={closeMobileMenu} className="font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition py-2">Home</a>
          <a href="#services" onClick={closeMobileMenu} className="font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition py-2">Services</a>
          <a href="#about" onClick={closeMobileMenu} className="font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition py-2">About</a>
          <a href="#portfolio" onClick={closeMobileMenu} className="font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition py-2">Portfolio</a>
          <a href="#testimonials" onClick={closeMobileMenu} className="font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition py-2">Testimonials</a>
          <a href="#contact" onClick={closeMobileMenu} className="font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition py-2">Contact</a>
          <a href="#contact" onClick={closeMobileMenu} className="bg-gradient hover:opacity-90 text-white py-2 px-6 rounded-full font-medium transition text-center">
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
