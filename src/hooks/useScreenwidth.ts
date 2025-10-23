import { useEffect, useState } from "react";

export default function useScreenWidth() {
  const LG_SCREEN = 1040;
  const [isScreenWidthMobile, setIsScreenWidthMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= LG_SCREEN : false
  );

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsScreenWidthMobile(window.innerWidth <= LG_SCREEN);
    };

    window.addEventListener("resize", checkScreenWidth);
    checkScreenWidth();

    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  return isScreenWidthMobile;
}

