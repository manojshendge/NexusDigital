import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@/components/ThemeProvider";

// Prevent theme flash on first load
const setInitialTheme = () => {
  const storageTheme = localStorage.getItem("nexus-digital-theme");
  if (storageTheme === "dark") {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");
  } else if (!storageTheme) {
    // Check system preference if no theme stored
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    }
  }
};

// Execute immediately to prevent flash
setInitialTheme();

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system" storageKey="nexus-digital-theme">
    <App />
  </ThemeProvider>
);
