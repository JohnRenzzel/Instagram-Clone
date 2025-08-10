"use client";
import { useEffect } from "react";

export default function ThemeObserver() {
  useEffect(() => {
    // Get saved theme or default to light
    const savedTheme = localStorage.getItem("theme") || "light";

    // Apply theme to HTML element
    const html = document.querySelector("html");
    if (html) {
      if (savedTheme === "dark") {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    }
  }, []);

  return null;
}
