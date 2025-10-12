import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AnimatedMenuEntry({
  href,
  text,
  onSelect,
  arrowPosition = "left",
}: {
  text: string;
  href: string;
  onSelect?: () => void;
  arrowPosition?: "left" | "right";
}) {
  const [hovered, setHovered] = useState(false);
  const currentPath = usePathname();

  const selected = href === currentPath;

  return (
    <div
      className="group relative flex cursor-pointer items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {selected ? (
        <span
          className={`${arrowPosition === "left" ? "absolute left-0 mr-6" : "order-2 ml-2"}`}
        >
          {arrowPosition === "left" ? <ArrowRight /> : <ArrowLeft />}
        </span>
      ) : (
        <>
          <motion.span
            initial={{ opacity: 0, x: -16 }}
            animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`${arrowPosition === "left" ? "absolute left-0 mr-6" : "order-2 ml-2"}`}
          >
            {arrowPosition === "left" ? (
              <ArrowRight stroke="var(--accent)" />
            ) : (
              <ArrowLeft stroke="var(--accent)" />
            )}
          </motion.span>
        </>
      )}
      <li className={` ${arrowPosition === "left" && "pl-8" } inline-block `}>
        <Link href={href} onClick={() => onSelect !== undefined && onSelect()}>
          {text}
        </Link>
      </li>
    </div>
  );
}
