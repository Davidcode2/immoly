import { onThemeChangeColorUpdate } from "app/services/onThemeChangeColorUpdate";
import { useEffect } from "react";

export function useThemeColorUpdates(updates: [React.Dispatch<React.SetStateAction<string>>, string, string][]) {
  useEffect(() => {
    const observers = updates.map(([setter, lightVar, darkVar]) =>
      onThemeChangeColorUpdate(setter, lightVar, darkVar)
    );

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [updates]);
}


