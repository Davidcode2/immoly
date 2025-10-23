import {
  useIsEmbedRoute,
  useParentScrollHeight,
  useParentScrollYStore,
  useParentViewportHeightStore,
} from "@/store";
import { debounce } from "@/utils/debounce";
import { screenWidthMedium } from "@/utils/screenWidth";
import { useSearchParams } from "next/navigation";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type JSX,
} from "react";
import { createPortal } from "react-dom";

type PropTypes = {
  children: ReactNode;
  onClose: () => void;
  historyState?: { modalId: string; urlParam?: string };
};

export default function CenteredModal({
  children: children,
  onClose,
  historyState,
}: PropTypes): JSX.Element {
  const backdropRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [offsetTop, setOffsetTop] = useState<number>(0);
  const parentScrollY = Number(useParentScrollYStore().value);
  const parentViewportHeight = Number(useParentViewportHeightStore().value);
  const parentScrollHeight = Number(useParentScrollHeight().value);
  const isEmbedRoute = useIsEmbedRoute().value;

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
        const cleanUrl = new URL(window.location.href);
        cleanUrl.searchParams.delete(param);
        window.history.replaceState(null, "", cleanUrl.toString());
      };
    }
  }, []);

  useEffect(() => {
    if (!isEmbedRoute) {
      return;
    }
    debouncedCenterModal();
    window.addEventListener("resize", debouncedCenterModal);

    return () => {
      window.removeEventListener("resize", debouncedCenterModal);
    };
  }, []);

  const centerModalVertically = useCallback(() => {
    if (!isEmbedRoute || !backdropRef.current) {
      return;
    }

    const modalElement = backdropRef.current?.firstElementChild as HTMLElement;
    if (!modalElement) {
      return;
    }

    const iframeHeight = document.body.scrollHeight;
    const modalElementHeight = modalElement.clientHeight;

    const iframeOffsetInParent = parentScrollHeight - iframeHeight;
    let visibleTop = parentScrollY - iframeOffsetInParent;
    let visibleBottom = visibleTop + parentViewportHeight;

    visibleTop = Math.max(0, Math.min(visibleTop, iframeHeight));
    visibleBottom = Math.max(0, Math.min(visibleBottom, iframeHeight));

    const visibleCenter = (visibleTop + visibleBottom) / 2;
    let modalTop = visibleCenter - modalElementHeight / 2;
    const minTop = 0;
    const maxTop = Math.max(0, iframeHeight - modalElementHeight);
    modalTop = Math.max(minTop, Math.min(modalTop, maxTop));

    setOffsetTop(Math.round(modalTop));
  }, []);

  const debouncedCenterModal = useMemo(
    () => centerModalVertically,
    [centerModalVertically],
  );

  return (
    <>
      {createPortal(
        <div
          className={`fixed inset-0 z-40 h-screen backdrop-blur-lg transition-all`}
          onClick={handleBackdropClick}
        >
          <div
            ref={backdropRef}
            className="modal flex h-screen w-full items-center justify-center"
          >
            {isEmbedRoute && screenWidthMedium() ? (
              <div
                className=""
                style={{ position: "absolute", top: `${offsetTop}px` }}
              >
                {children}
              </div>
            ) : (
              children
            )}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
