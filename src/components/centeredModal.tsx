import { useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useRef, type JSX } from "react";
import { createPortal } from "react-dom";

type PropTypes = {
  children: ReactNode;
  onClose: () => void;
  historyState?: { modalId: string; urlParam?: string }; // optional prop
};

export default function CenteredModal({
  children: children,
  onClose,
  historyState,
}: PropTypes): JSX.Element {
  const backdropRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (
      backdropRef.current &&
      backdropRef.current.isSameNode(e.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (historyState) {
      const param = historyState.urlParam || "modal";
      const params = new URLSearchParams(searchParams.toString());
      params.set(param, historyState.modalId);
      window.history.pushState(null, "", `?${params.toString()}`);

      const handlePopState = () => {
        onClose();
      };
      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
        // Optionally clean up URL
        const cleanUrl = new URL(window.location.href);
        cleanUrl.searchParams.delete(param);
        window.history.replaceState(null, "", cleanUrl.toString());
      };
    }
  }, []);

  return (
    <>
      {createPortal(
        <div
          className={`fixed inset-0 z-40 backdrop-blur-lg transition-all`}
          onClick={handleBackdropClick}
        >
          <div
            ref={backdropRef}
            className="modal flex h-full w-full items-center justify-center"
          >
            {children}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
