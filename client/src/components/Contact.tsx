const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-light dark:bg-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/20 dark:bg-secondary/10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4 dark:text-white">Ready to <span className="gradient-text">Transform</span> Your Digital Presence?</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get in touch with our team of experts to discuss your project and discover how we can help you achieve your business goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-8 relative z-10">
            <h3 className="font-montserrat font-bold text-2xl mb-6 dark:text-white">Send Us a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-dark-lighter border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-dark-lighter border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-dark-lighter border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">Your Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-dark-lighter border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
              </div>
              <button 
                type="button" 
                className="w-full bg-gradient hover:opacity-90 text-white py-3 px-6 rounded-lg font-medium transition shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
          </div>
          
          <div>
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-8 mb-8">
              <h3 className="font-montserrat font-bold text-2xl mb-6 dark:text-white">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-map-marker-alt text-primary"></i>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-1">Our Location</h4>
                    <p className="text-gray-600 dark:text-gray-400">123 Innovation Drive, Tech District, San Francisco, CA 94107</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-envelope text-secondary"></i>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-1">Email Us</h4>
                    <a href="mailto:info@nexusdigital.com" className="text-primary hover:underline">info@nexusdigital.com</a>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">We respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-phone-alt text-primary"></i>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-1">Call Us</h4>
                    <a href="tel:+14155552671" className="text-primary hover:underline">+1 (415) 555-2671</a>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Mon-Fri, 9am-6pm PST</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-8">
              <h3 className="font-montserrat font-bold text-2xl mb-6 dark:text-white">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-sky-500 hover:bg-sky-600 flex items-center justify-center text-white transition">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-blue-700 hover:bg-blue-800 flex items-center justify-center text-white transition">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-gradient hover:opacity-90 flex items-center justify-center text-white transition">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://wa.me/14155552671" className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
