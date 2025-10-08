import { ReactNode, useEffect, useRef, useState, type JSX } from "react";
import { motion } from "motion/react"
import { createPortal } from "react-dom";

type PropTypes = {
  children: ReactNode;
  onClose: () => void;
};

export default function Toast({
  children: children,
  onClose,
}: PropTypes): JSX.Element {
  const [isShown, setIsShown] = useState<boolean>(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  setTimeout(() => {
    setIsShown(true);
  }, 100);
  const [progress, setProgress] = useState(100);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (
      backdropRef.current &&
      backdropRef.current.isSameNode(e.target as Node)
    ) {
      onClose();
    }
  };

  // Handle auto-close of modal with shrinking bar
  useEffect(() => {
    setProgress(100); // reset to full bar
    const duration = 5000;
    const steps = 50; // how many updates
    const stepTime = duration / steps;
    let current = 100;

    const interval = setInterval(() => {
      current -= 100 / steps;
      setProgress(Math.max(current, 0));
    }, stepTime);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      onClose();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {createPortal(
        <motion.div initial={{ scale: .7 }} animate={{ scale: 1 }} 
          className={`fixed top-10 z-40 mx-auto flex w-full transition-all duration-250 md:right-10 md:w-fit ${isShown ? "opacity-100" : "opacity-0"}`}
          onClick={handleBackdropClick}
        >
          <div
            ref={backdropRef}
            className="modal mx-auto flex h-full w-fit items-center justify-center"
          >
          <div className="relative backdrop-blur-xl rounded-xl">
            {children}
            <div
              className="absolute z-50 bottom-[0px] left-[6px] max-w-[94%] h-1 rounded-bl-full bg-[var(--accent)] transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
</div>
          </div>
        </motion.div>,

        document.body,
      )}
    </>
  );
}
