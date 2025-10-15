import Link from "next/link";

type PropTypes = {
  size?: string;
  responsive?: boolean;
  isLink?: boolean;
};
export default function Logo({
  size,
  responsive = false,
  isLink = true,
}: PropTypes) {
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
    <h1
      className={`${fontSize} ${responsive && "max-md:text-2xl"} font-extrabold`}
    >
    { isLink ? (
        <Link href="/">Immoly</Link>
      ) : (
        "Immoly"
      )}
    </h1>
  );
}
