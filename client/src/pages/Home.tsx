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
import { useTheme } from "@/components/ThemeProvider";

const Home = () => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Add base styles to body
    document.body.classList.add(
      "font-poppins",
      "text-gray-800",
      "transition-colors",
      "duration-300"
    );
    
    return () => {
      document.body.classList.remove(
        "font-poppins",
        "text-gray-800",
        "transition-colors",
        "duration-300"
      );
    };
  }, []);

  // This runs on every theme change
  useEffect(() => {
    if (resolvedTheme === "dark") {
      document.body.classList.add("dark", "bg-dark");
      document.body.classList.remove("light", "bg-light");
      document.body.style.color = "#e5e7eb"; // text-gray-200
    } else {
      document.body.classList.add("light", "bg-light");
      document.body.classList.remove("dark", "bg-dark");
      document.body.style.color = "#1f2937"; // text-gray-800
    }
  }, [resolvedTheme]);

  return (
    <div className={`${resolvedTheme === "dark" ? "dark" : "light"}`}>
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
    </div>
  );
};

export default Home;
