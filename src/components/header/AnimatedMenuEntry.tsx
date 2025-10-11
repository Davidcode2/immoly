import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function AnimatedMenuEntry({
  text,
  selected,
}: {
  text: string;
  selected?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative flex cursor-pointer items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {selected ? (
        <ArrowRight className="absolute left-0 mr-6" />
      ) : (
        <>
          <motion.span
            initial={{ opacity: 0, x: -16 }}
            animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute left-0 mr-6"
          >
            <ArrowRight stroke="var(--accent)" />
          </motion.span>
        </>
      )}
      <li className="inline-block pl-8">{text}</li>
    </div>
  );
}
