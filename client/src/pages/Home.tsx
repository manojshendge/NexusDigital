import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Home = () => {
  useEffect(() => {
    document.body.classList.add("font-poppins", "bg-light", "dark:bg-dark", "text-gray-800", "dark:text-gray-200", "transition-colors", "duration-300");
    
    return () => {
      document.body.classList.remove("font-poppins", "bg-light", "dark:bg-dark", "text-gray-800", "dark:text-gray-200", "transition-colors", "duration-300");
    };
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <TechStack />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Home;
