import { ReactNode, useState, type JSX } from "react";

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
    <div
      className={`fixed inset-0 z-40 backdrop-blur-sm transition-all ${isShown ? "opacity-100" : "opacity-0"}`}
    >
      <div className="sticky top-80 z-50 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
