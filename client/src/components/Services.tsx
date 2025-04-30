const ServiceCard = ({ icon, title, description, items, learnMoreColor }: {
  icon: string;
  title: string;
  description: string;
  items: string[];
  learnMoreColor: string;
}) => {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg hover:shadow-xl p-8 transition duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-dark-lighter">
      <div className={`w-14 h-14 rounded-full ${learnMoreColor === "primary" ? "bg-primary/10 dark:bg-primary/20" : "bg-secondary/10 dark:bg-secondary/20"} flex items-center justify-center mb-6`}>
        <i className={`${icon} text-${learnMoreColor} text-2xl`}></i>
      </div>
      <h3 className="font-montserrat font-bold text-xl mb-4 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
      <ul className="space-y-3 mb-6">
        {items.map((item, index) => (
          <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
            <i className={`fas fa-check text-${learnMoreColor === "primary" ? "secondary" : "primary"} mr-2`}></i>
            {item}
          </li>
        ))}
      </ul>
      <a href="#contact" className={`inline-block text-${learnMoreColor} font-medium hover:text-${learnMoreColor}-dark transition dark:text-${learnMoreColor}-light`}>
        Learn More <i className="fas fa-arrow-right ml-1"></i>
      </a>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      icon: "fas fa-chart-line",
      title: "Digital Marketing",
      description: "Strategic campaigns that increase your brand visibility and drive qualified leads to your business.",
      items: [
        "Search Engine Optimization (SEO)",
        "Pay-Per-Click Advertising (PPC)",
        "Social Media Marketing",
        "Content Marketing Strategy"
      ],
      learnMoreColor: "primary"
    },
    {
      icon: "fas fa-code",
      title: "Software Development",
      description: "Custom software solutions that automate processes and enhance your business operations.",
      items: [
        "Web Application Development",
        "Mobile App Development",
        "Cloud Solutions & Deployment",
        "API Integrations & Automation"
      ],
      learnMoreColor: "primary"
    },
    {
      icon: "fas fa-paint-brush",
      title: "UI/UX Design",
      description: "Intuitive, user-centered designs that enhance user experience and increase conversions.",
      items: [
        "User Experience Research",
        "Interface Design & Prototyping",
        "Responsive Web Design",
        "Brand Identity & Visual Systems"
      ],
      learnMoreColor: "primary"
    },
    {
      icon: "fas fa-shopping-cart",
      title: "E-commerce Solutions",
      description: "Complete online retail solutions that drive sales and improve customer experience.",
      items: [
        "E-commerce Platform Development",
        "Shopping Cart Optimization",
        "Payment Gateway Integration",
        "Inventory Management Systems"
      ],
      learnMoreColor: "primary"
    },
    {
      icon: "fas fa-chart-pie",
      title: "Data Analytics",
      description: "Transform your data into actionable insights for smarter business decisions.",
      items: [
        "Business Intelligence Solutions",
        "Data Visualization & Reporting",
        "Performance Analytics",
        "Predictive Analysis Models"
      ],
      learnMoreColor: "primary "
    },
    {
      icon: "fas fa-robot",
      title: "Automation & Integration",
      description: "Streamline your workflows and connect your favorite tools for maximum efficiency.",
      items: [
        "Workflow Automation",
        "Third-party API Integrations",
        "CRM & ERP Integration",
        "Custom Automation Solutions"
      ],
      learnMoreColor: "primary"
    }
  ];

  return (
    <section id="services" className="py-20 bg-light-darker dark:bg-dark-lighter">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4 dark:text-white">Our <span className="gradient-text">Services</span></h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your business needs, from brand visibility to custom software development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              items={service.items}
              learnMoreColor={service.learnMoreColor}
            />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a href="#contact" className="bg-gradient hover:opacity-90 text-white py-3 px-10 rounded-full font-medium transition inline-block shadow-lg hover:shadow-xl">
            Discuss Your Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
