"use client";

import { useTheme } from "next-themes";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggleDarkMode = () => {
    if (!theme) {
      setTheme("green-mist-light");
    }
    setTheme(
      theme!.includes("dark")
        ? theme!.split("dark")[0] + "light"
        : theme!.split("light")[0] + "dark",
    );
    // set .dark class if dark theme active for tailwindss dark: utility
    if (theme!.includes("dark"))
      document.documentElement.classList.remove("dark");
    else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <div onClick={handleToggleDarkMode}>
    { theme!.includes("dark") ?
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-sun-icon lucide-sun"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
     :
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-moon-icon lucide-moon"
      >
        <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
      </svg>
    }
    </div>
  );
}
