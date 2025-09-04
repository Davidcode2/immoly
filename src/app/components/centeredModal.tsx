import { ReactNode, useState, type JSX } from "react";
import { createPortal } from "react-dom";

type PropTypes = {
  children: ReactNode;
  onClose: () => void;
};

export default function CenteredModal({
  children: children,
  onClose,
}: PropTypes): JSX.Element {
  const [isShown, setIsShown] = useState<boolean>(false);
  setTimeout(() => {
    setIsShown(true);
  }, 100);

  const handleBackdropClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("modal")) {
      onClose();
    }
  };

  return (
    <>
      {createPortal(
        <div
          className={`fixed inset-0 z-40 backdrop-blur-sm transition-all ${isShown ? "opacity-100" : "opacity-0"}`}
          onClick={handleBackdropClick}
        >
          <div className="modal flex h-full w-full items-center justify-center">
            {children}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
