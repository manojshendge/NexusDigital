import { useState, useEffect, useRef } from "react";

type Testimonial = {
  content: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  rating: number;
};

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);
  const [maxSlides, setMaxSlides] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const testimonials: Testimonial[] = [
    {
      content: "Nexus Digital transformed our online presence completely. Their SEO and PPC campaigns increased our qualified leads by 200% in just 3 months. The ROI has been phenomenal.",
      author: {
        name: "Sarah Johnson",
        title: "Marketing Director, TechNova",
        avatar: "https://randomuser.me/api/portraits/women/54.jpg"
      },
      rating: 5
    },
    {
      content: "The team at Nexus Digital delivered our mobile app ahead of schedule and under budget. Their attention to detail and commitment to quality is unmatched. We're already planning our next project with them.",
      author: {
        name: "Michael Chen",
        title: "CTO, FinTech Solutions",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      rating: 5
    },
    {
      content: "Working with Nexus Digital has been a game-changer for our e-commerce business. The website redesign improved our conversion rate by 85%, and their ongoing SEO work keeps us ahead of competitors.",
      author: {
        name: "Amanda Rodriguez",
        title: "Owner, Boutique Elegance",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg"
      },
      rating: 4.5
    },
    {
      content: "The automation tools that Nexus Digital built for our company have saved us countless hours and improved our operational efficiency by 40%. Their team is responsive, professional, and incredibly skilled.",
      author: {
        name: "David Thompson",
        title: "Operations Manager, LogiTech Services",
        avatar: "https://randomuser.me/api/portraits/men/44.jpg"
      },
      rating: 5
    }
  ];
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleSlides(3);
      } else if (window.innerWidth >= 768) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(1);
      }
    };
    
    handleResize();
    setMaxSlides(testimonials.length - visibleSlides);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [testimonials.length, visibleSlides]);
  
  const nextSlide = () => {
    if (currentSlide < maxSlides) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  
  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };
  
  useEffect(() => {
    if (trackRef.current) {
      const slideWidth = trackRef.current.children[0].clientWidth;
      trackRef.current.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }
  }, [currentSlide]);
  
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex text-primary">
        {[...Array(fullStars)].map((_, i) => (
          <i key={i} className="fas fa-star"></i>
        ))}
        {hasHalfStar && <i className="fas fa-star-half-alt"></i>}
      </div>
    );
  };
  
  return (
    <section id="testimonials" className="py-20 bg-light-darker dark:bg-dark-lighter">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4 dark:text-white">Client <span className="gradient-text">Testimonials</span></h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hear what our clients have to say about their experience working with us.
          </p>
        </div>
        
        <div className="relative testimonial-slider">
          <div className="overflow-hidden">
            <div 
              ref={trackRef}
              className="testimonial-track flex transition-transform duration-500"
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-slide w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                  <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-8 h-full flex flex-col">
                    <div className="mb-6">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow text-lg italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img src={testimonial.author.avatar} alt={testimonial.author.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-montserrat font-bold dark:text-white">{testimonial.author.name}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.author.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={prevSlide}
            className="testimonial-prev absolute top-1/2 left-0 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-dark-card shadow-lg flex items-center justify-center focus:outline-none transform -translate-x-1/2 hover:scale-110 transition z-10"
          >
            <i className="fas fa-chevron-left text-gray-600 dark:text-gray-400"></i>
          </button>
          
          <button 
            onClick={nextSlide}
            className="testimonial-next absolute top-1/2 right-0 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-dark-card shadow-lg flex items-center justify-center focus:outline-none transform translate-x-1/2 hover:scale-110 transition z-10"
          >
            <i className="fas fa-chevron-right text-gray-600 dark:text-gray-400"></i>
          </button>
        </div>
        
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(maxSlides + 1)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index
                  ? "bg-primary dark:bg-primary"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
