import immoly_nebenkosten_screenshot from "/public/images/green_mist_screenshots/screenshot-nebenkosten.webp";
import green_mist_screenshot from "/public/images/green_mist_screenshots/screenshot-green-mist-full.webp";
import green_mist_save_or_buy_screenshot from "/public/images/green_mist_screenshots/screenshot-save-or-buy.webp";
import hearth_stone_screenshot1 from "/public/images/hearth_stone_screenshots/screenshot-full-hearth-stone.webp";
import hearth_stone_screenshot2 from "/public/images/hearth_stone_screenshots/2025-10-08-21-05-35.webp";
import hearth_stone_screenshot3 from "/public/images/hearth_stone_screenshots/2025-10-08-21-05-53.webp";
import blue_dream_screenshot1 from "/public/images/blue_dream_screenshots/2025-10-08-21-03-28.webp";
import blue_dream_screenshot2 from "/public/images/blue_dream_screenshots/2025-10-08-21-03-47.webp";
import blue_dream_screenshot3 from "/public/images/blue_dream_screenshots/2025-10-08-21-04-15.webp";
import green_mist_light_screenshot1 from "/public/images/green_mist_light_screenshots/green_mist_light_full.webp";
import green_mist_light_screenshot2 from "/public/images/green_mist_light_screenshots/green_mist_light_nebenkosten.webp";
import green_mist_light_screenshot3 from "/public/images/green_mist_light_screenshots/green_mist_light_tilgungswechsel.webp";
import green_mist_light_screenshot4 from "/public/images/green_mist_light_screenshots/green_mist_light_sparen.webp";
import green_mist_light_screenshot5 from "/public/images/green_mist_light_screenshots/green_mist_light_volltilgung.webp";
import { useTheme } from "next-themes";

const green_mist_screenshots = [
  {
    src: immoly_nebenkosten_screenshot,
    alt: "Screenshot der Nebenkosten Seite",
  },
  {
    src: green_mist_screenshot,
    alt: "Screenshot der Nebenkosten Seite",
  },
  {
    src: green_mist_save_or_buy_screenshot,
    alt: "Screenshot der Nebenkosten Seite",
  },
];

const green_mist_light_screenshots = [
  {
    src: green_mist_light_screenshot1,
    alt: "Screenshot der Nebenkosten Seite",
  },
  {
    src: green_mist_light_screenshot2,
    alt: "Screenshot der Nebenkosten Seite",
  },
  {
    src: green_mist_light_screenshot3,
    alt: "Screenshot der Nebenkosten Seite",
  },
  {
    src: green_mist_light_screenshot4,
    alt: "Screenshot der Nebenkosten Seite",
  },
  {
    src: green_mist_light_screenshot5,
    alt: "Screenshot der Nebenkosten Seite",
  },
];

const blue_dream_screenshots = [
  {
    src: blue_dream_screenshot1,
    alt: "Screenshot der Nebenkosten Seite",
  },
  {
    src: blue_dream_screenshot2,
    alt: "Screenshot der Nebenkosten Seite",
  },
  {
    src: blue_dream_screenshot3,
    alt: "Screenshot der Nebenkosten Seite",
  },
];

const hearth_stone_screenshots = [
  {
    src: hearth_stone_screenshot1,
    alt: "Screenshot des Tilgungsrechners in Hearth Stone Theme",
  },
  {
    src: hearth_stone_screenshot2,
    alt: "Screenshot des Tilgungsrechners mit Zeit bis zur Tilgung in Hearth Stone Theme",
  },
  {
    src: hearth_stone_screenshot3,
    alt: "Screenshot der Nebenkosten Seite in Hearth Stone Theme",
  },
];

export default function useScreenshotThemer() {
  const { theme } = useTheme();
  return themeAdjustedScreenshots(theme);
}

export const themeAdjustedScreenshots = (theme: string | undefined) => {
  switch (theme) {
    case "green-mist-dark":
      return green_mist_screenshots;
    case "blue-dream-dark":
      return blue_dream_screenshots;
    case "hearth-stone-dark":
      return hearth_stone_screenshots;
    default:
      if (theme && theme.includes("dark")) {
        return hearth_stone_screenshots;
      }
      return green_mist_light_screenshots;
  }
};
