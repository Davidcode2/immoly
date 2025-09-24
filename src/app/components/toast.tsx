import { ReactNode, useEffect, useRef, useState, type JSX } from "react";
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
    const steps = 40; // how many updates
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
        <div
          className={`fixed top-10 md:right-10 z-40 transition-all ${isShown ? "opacity-100" : "opacity-0"}`}
          onClick={handleBackdropClick}
        >
          <div
            ref={backdropRef}
            className="modal flex h-full w-96 items-center justify-center"
          >
            {children}
            <div className="z-50 absolute bottom-[1px] left-[6px] mx-auto w-[97%]">
              <div
                className="h-1 rounded-bl-full bg-[var(--accent)]/60 transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
