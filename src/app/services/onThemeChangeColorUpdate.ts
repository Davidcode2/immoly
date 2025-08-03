export const onThemeChangeColorUpdate = (
  setColor: (color: string) => void,
  lightColor: string,
  darkColor: string,
): MutationObserver => {
  const updateGridColor = () => {
    console.log(
      "Updating grid color based on theme",
      document.documentElement.getAttribute("data-theme"),
    );
    const theme = document.documentElement.getAttribute("data-theme");
    setColor(theme === "dark" ? darkColor : lightColor);
  };

  updateGridColor();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "data-theme"
      ) {
        updateGridColor();
      }
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return observer;
};
