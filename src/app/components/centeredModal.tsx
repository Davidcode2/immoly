import { ReactNode, useState, type JSX } from "react";
import { createPortal } from "react-dom";

type PropTypes = {
  children: ReactNode;
};

export default function CenteredModal({
  children: children,
}: PropTypes): JSX.Element {
  const [isShown, setIsShown] = useState<boolean>(false);
  setTimeout(() => {
    setIsShown(true);
  }, 100);

  return (
    <>
      {
        (createPortal(
          <div
            className={`fixed inset-0 z-40 backdrop-blur-sm transition-all ${isShown ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex h-full w-full items-center justify-center">
              {children}
            </div>
          </div>,
          document.body
        ))
      }
    </>
  );
}
