const TechItem = ({ icon, name }: { icon: string; name: string }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-dark-card rounded-xl shadow flex items-center justify-center p-3 transition duration-300 transform hover:scale-110">
        <i className={`${icon}`}></i>
      </div>
      <span className="mt-3 text-gray-600 dark:text-gray-400 text-sm md:text-base">{name}</span>
    </div>
  );
};

const TechStack = () => {
  const techItems = [
    { icon: "fab fa-react text-3xl text-blue-500", name: "React" },
    { icon: "fab fa-node-js text-3xl text-green-600", name: "Node.js" },
    { icon: "fab fa-python text-3xl text-yellow-500", name: "Python" },
    { icon: "fab fa-aws text-3xl text-orange-500", name: "AWS" },
    { icon: "fab fa-google text-3xl text-red-500", name: "Google Cloud" },
    { icon: "fab fa-angular text-3xl text-red-600", name: "Angular" },
    { icon: "fab fa-vuejs text-3xl text-green-500", name: "Vue.js" },
    { icon: "fab fa-php text-3xl text-purple-600", name: "PHP" },
    { icon: "fab fa-laravel text-3xl text-red-500", name: "Laravel" },
    { icon: "fab fa-wordpress text-3xl text-blue-600", name: "WordPress" }
  ];

  return (
    <section className="py-20 bg-light-darker dark:bg-dark-lighter">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4 dark:text-white">Our <span className="gradient-text">Tech Stack</span></h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We use cutting-edge technologies and proven tools to deliver exceptional digital solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-5 gap-8 md:gap-12">
          {techItems.map((item, index) => (
            <TechItem key={index} icon={item.icon} name={item.name} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
