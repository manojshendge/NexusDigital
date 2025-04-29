const AboutFeature = ({ icon, title, description, iconBgClass }: {
  icon: string;
  title: string;
  description: string;
  iconBgClass: string;
}) => {
  return (
    <div className="flex">
      <div className={`mr-4 w-12 h-12 rounded-full ${iconBgClass} flex items-center justify-center flex-shrink-0`}>
        <i className={`${icon}`}></i>
      </div>
      <div>
        <h3 className="font-montserrat font-bold text-lg mb-2 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

const About = () => {
  const features = [
    {
      icon: "fas fa-users text-primary",
      title: "Expert Team",
      description: "Our team comprises industry veterans and certified professionals with deep expertise in their respective fields.",
      iconBgClass: "bg-primary/10 dark:bg-primary/20"
    },
    {
      icon: "fas fa-chart-bar text-secondary",
      title: "Proven Results",
      description: "We've helped businesses of all sizes achieve measurable growth with our data-driven approach.",
      iconBgClass: "bg-secondary/10 dark:bg-secondary/20"
    },
    {
      icon: "fas fa-rocket text-primary",
      title: "Scalable Solutions",
      description: "Our solutions grow with your business, providing long-term value and adaptability to changing market conditions.",
      iconBgClass: "bg-primary/10 dark:bg-primary/20"
    },
    {
      icon: "fas fa-headset text-secondary",
      title: "Dedicated Support",
      description: "We're committed to your success with ongoing support, regular updates, and transparent communication.",
      iconBgClass: "bg-secondary/10 dark:bg-secondary/20"
    }
  ];

  return (
    <section id="about" className="py-20 bg-light dark:bg-dark">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6 dark:text-white">Why Choose <span className="gradient-text">Nexus Digital</span></h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We combine cutting-edge technology with creative marketing strategies to deliver exceptional results that drive business growth and digital transformation.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <AboutFeature
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  iconBgClass={feature.iconBgClass}
                />
              ))}
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl blur-lg transform rotate-3"></div>
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                   alt="Our team working" 
                   className="rounded-2xl shadow-xl relative z-10 w-full transform transition duration-500 hover:scale-[1.02]" />
              
              <div className="absolute bottom-5 left-5 right-5 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-xl p-5 shadow-lg z-20">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-montserrat font-bold text-lg dark:text-white">Building Tomorrow's Digital Solutions</h4>
                    <p className="text-gray-600 dark:text-gray-400">Innovation at the core of everything we do</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-lightbulb text-white text-lg"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
