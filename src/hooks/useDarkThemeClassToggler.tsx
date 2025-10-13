import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function useDarkThemeClassToggler() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!theme || theme.includes("system")) {
      setTheme("green-mist-light");
    }
    // set .dark class if dark theme active for tailwindss dark: utility
    if (theme!.includes("dark"))
      document.documentElement.classList.add("dark");
    else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
}
