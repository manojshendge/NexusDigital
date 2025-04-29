import { useState } from "react";

const PortfolioCard = ({ 
  image, 
  category, 
  categoryColor, 
  title, 
  description 
}: {
  image: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition group">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end">
          <div className="p-6">
            <a href="#" className="px-4 py-2 bg-white text-gray-800 rounded-full font-medium inline-block">View Details</a>
          </div>
        </div>
      </div>
      <div className="p-6">
        <span className={`text-xs font-medium text-${categoryColor} bg-${categoryColor}/10 rounded-full py-1 px-3`}>
          {category}
        </span>
        <h3 className="font-montserrat font-bold text-xl mt-3 mb-2 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const portfolioItems = [
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2015&q=80",
      category: "Digital Marketing",
      categoryType: "marketing",
      categoryColor: "primary",
      title: "E-commerce Growth Strategy",
      description: "Comprehensive digital marketing campaign that increased online sales by 150% in 6 months."
    },
    {
      image: "https://images.unsplash.com/photo-1555421689-3f034debb7a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      category: "Software Development",
      categoryType: "development",
      categoryColor: "secondary",
      title: "Finance Management App",
      description: "Mobile application for personal finance management with AI-powered insights and recommendations."
    },
    {
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80",
      category: "UI/UX Design",
      categoryType: "design",
      categoryColor: "primary",
      title: "Healthcare Portal Redesign",
      description: "Complete redesign of a healthcare provider portal that improved user satisfaction by 85%."
    },
    {
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      category: "Social Media Marketing",
      categoryType: "marketing",
      categoryColor: "secondary",
      title: "Brand Awareness Campaign",
      description: "Strategic social media campaign that increased brand visibility by 200% and drove 15K new leads."
    },
    {
      image: "https://images.unsplash.com/photo-1573867639040-6dd25fa5f597?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      category: "Web Development",
      categoryType: "development",
      categoryColor: "primary",
      title: "E-commerce Platform",
      description: "Custom-built marketplace platform with integrated payment processing and inventory management."
    },
    {
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2036&q=80",
      category: "App Design",
      categoryType: "design",
      categoryColor: "secondary",
      title: "Travel App Experience",
      description: "Intuitive mobile app design for a travel company that increased bookings by 75% post-launch."
    }
  ];
  
  const filteredItems = activeFilter === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.categoryType === activeFilter);
  
  const setFilter = (filter: string) => {
    setActiveFilter(filter);
  };
  
  return (
    <section id="portfolio" className="py-20 bg-light dark:bg-dark">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4 dark:text-white">Our <span className="gradient-text">Portfolio</span></h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our recent projects and success stories across different industries.
          </p>
          
          <div className="flex flex-wrap justify-center mt-8 mb-10 space-x-2">
            <button 
              className={`py-2 px-6 rounded-full font-medium transition mb-2 ${
                activeFilter === "all" 
                  ? "bg-gradient text-white" 
                  : "bg-white dark:bg-dark-card text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-lighter"
              }`}
              onClick={() => setFilter("all")}
            >
              All Projects
            </button>
            <button 
              className={`py-2 px-6 rounded-full font-medium transition mb-2 ${
                activeFilter === "marketing" 
                  ? "bg-gradient text-white" 
                  : "bg-white dark:bg-dark-card text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-lighter"
              }`}
              onClick={() => setFilter("marketing")}
            >
              Marketing
            </button>
            <button 
              className={`py-2 px-6 rounded-full font-medium transition mb-2 ${
                activeFilter === "development" 
                  ? "bg-gradient text-white" 
                  : "bg-white dark:bg-dark-card text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-lighter"
              }`}
              onClick={() => setFilter("development")}
            >
              Development
            </button>
            <button 
              className={`py-2 px-6 rounded-full font-medium transition mb-2 ${
                activeFilter === "design" 
                  ? "bg-gradient text-white" 
                  : "bg-white dark:bg-dark-card text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-lighter"
              }`}
              onClick={() => setFilter("design")}
            >
              UI/UX Design
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div 
              key={index} 
              className="portfolio-item"
              style={{
                opacity: 1,
                transform: 'scale(1)',
                transition: 'opacity 0.3s ease, transform 0.3s ease, display 0.3s ease',
              }}
            >
              <PortfolioCard 
                image={item.image}
                category={item.category}
                categoryColor={item.categoryColor}
                title={item.title}
                description={item.description}
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#contact" className="bg-white dark:bg-dark-card border border-primary text-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white py-3 px-10 rounded-full font-medium transition inline-block shadow-md hover:shadow-lg">
            View More Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
