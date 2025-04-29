const Footer = () => {
  return (
    <footer className="bg-light-darker dark:bg-dark-lighter pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-gradient rounded-lg w-10 h-10 flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">ND</span>
              </div>
              <span className="font-montserrat font-bold text-xl dark:text-white">Nexus<span className="gradient-text">Digital</span></span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Transforming businesses through innovative digital marketing and cutting-edge software solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-montserrat font-bold text-lg mb-6 dark:text-white">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="#home" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition">Home</a></li>
              <li><a href="#services" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition">Services</a></li>
              <li><a href="#about" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition">About Us</a></li>
              <li><a href="#portfolio" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition">Portfolio</a></li>
              <li><a href="#testimonials" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition">Testimonials</a></li>
              <li><a href="#contact" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-bold text-lg mb-6 dark:text-white">Services</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition">Digital Marketing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition">Software Development</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition">UI/UX Design</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition">E-commerce Solutions</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition">Data Analytics</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition">Automation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-bold text-lg mb-6 dark:text-white">Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form className="space-y-4">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button type="button" className="absolute right-0 top-0 h-full px-3 text-primary">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
              <label className="flex items-start">
                <input type="checkbox" className="mt-1 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-400">I agree to receive marketing emails from Nexus Digital.</span>
              </label>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Nexus Digital. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition text-sm">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
