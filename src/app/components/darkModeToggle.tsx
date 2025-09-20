"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [useSystem, setUseSystem] = useState<boolean>();

  const handleToggleDarkMode = () => {
    setUseSystem(false);
    if (!theme) {
      setTheme("green-mist-light");
    }
    setTheme(theme!.includes("dark") ? theme!.split("dark")[0] + "light" : theme!.split("light")[0] + "dark");
    // set .dark class if dark theme active for tailwindss dark: utility
    if (theme!.includes("dark")) 
      document.documentElement.classList.remove("dark");
    else {
      document.documentElement.classList.add("dark");
    }
  };

  const [systemPreference, setSystemPreference] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem(
      "useSystem",
      useSystem ? (useSystem.valueOf() ? "true" : "false") : "false",
    );
  }, [theme, useSystem, systemPreference]);

  useEffect(() => {
    const handleSystemChange = (event: MediaQueryListEvent) => {
      setSystemPreference(event.matches ? "dark" : "light");
    };

    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQueryList.addEventListener("change", handleSystemChange);
      return () => {
        mediaQueryList.removeEventListener("change", handleSystemChange);
      };
    }
  }, []);

  return (
    <Image
      src="/images/icons/icons8-globus-60.png"
      alt="Globus Icon"
      width={24}
      height={24}
      className="invert dark:invert-0"
      onClick={handleToggleDarkMode}
    />
  );
}
