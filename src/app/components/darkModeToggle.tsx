'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      return storedTheme;
    }
    return "system"; // Default to system
  });

  const handleToggleDarkMode = () => {
    setUseSystem(false);
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const [systemPreference, setSystemPreference] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light"; // Default if media query is not supported
  });

  const [useSystem, setUseSystem] = useState(
    () =>
      localStorage.getItem("useSystem") === "true" ||
      localStorage.getItem("useSystem") === null,
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("useSystem", useSystem.valueOf() ? "true" : "false");
    document.documentElement.setAttribute(
      "data-theme",
      useSystem ? systemPreference : theme,
    );
  }, [theme, useSystem, systemPreference]);

  useEffect(() => {
    const handleSystemChange = (event: any) => {
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
      className="dark:invert-0 invert"
      onClick={handleToggleDarkMode}
    />
  );
}
