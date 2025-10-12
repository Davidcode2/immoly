import Link from "next/link";

export default function Logo({ size, responsive = false }: { size?: string, responsive?: boolean }) {
  let fontSize;
  switch (size) {
    case "small": {
      fontSize = "text-2xl";
      break;
    }
    case "medium": {
      fontSize = "text-4xl";
      break;
    }
    case "large": {
      fontSize = "text-6xl";
      break;
    }
    default: {
      fontSize = "text-6xl";
      break;
    }
  }

  return (
    <h1 className={`${fontSize} ${responsive && "max-md:text-2xl" } font-extrabold`}>
      <Link href="/">Immoly</Link>
    </h1>
  );
}
