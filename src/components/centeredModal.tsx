import centerModalVerticallyFunc from "@/services/centerVertically";
import {
  useIsEmbedRoute,
  useParentScrollHeight,
  useParentScrollYStore,
  useParentViewportHeightStore,
} from "@/store";
import { screenWidthMedium } from "@/utils/screenWidth";
import { useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useRef, useState, type JSX } from "react";
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
  const offsetTopRef = useRef<number>(0);

  const setParentViewportHeight = useParentViewportHeightStore().updateValue;
  const setParentScrollY = useParentScrollYStore().updateValue;
  const setParentScrollHeight = useParentScrollHeight().updateValue;

  const parentOriginRef = useRef(null);

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
    if (!isEmbedRoute) return;

    const offsetTop = centerModalVertically();
    if (!offsetTop) return;

    if (offsetTopRef.current == 0) {
      offsetTopRef.current = offsetTop;
      setOffsetTop(offsetTop); 
      return;
    }
    offsetTopRef.current = offsetTop;
  }, [parentScrollHeight, parentScrollY, parentViewportHeight]);

  useEffect(() => {
    window.addEventListener("resize", centerModalVertically);

    return () => {
      window.removeEventListener("resize", centerModalVertically);
    };
  }, []);

  const centerModalVertically = () => {
    if (!isEmbedRoute || !backdropRef.current) {
      return;
    }

    const modalElement = backdropRef.current?.firstElementChild as HTMLElement;
    if (!modalElement) {
      return;
    }

    const parentScrollY = Number(useParentScrollYStore.getState().value);
    const parentViewportHeight = Number(
      useParentViewportHeightStore.getState().value,
    );
    const parentScrollHeight = Number(useParentScrollHeight.getState().value);
    const iframeHeight = document.body.scrollHeight;

    const modalTop = centerModalVerticallyFunc(
      modalElement.clientHeight,
      iframeHeight,
      parentScrollHeight,
      parentViewportHeight,
      parentScrollY,
    );
    return modalTop;
  };

  useEffect(() => {
    if (!isEmbedRoute) return;
    window.parent.postMessage({ type: "REQUEST_PARENT_VIEWPORT" }, "*");
  }, []);

  useEffect(() => {
    if (!isEmbedRoute) return;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const handleMessage = (event: any) => {
      if (event.data?.type !== "PARENT_VIEWPORT") {
        return;
      }

      const newOrigin = event.origin;

      if (!parentOriginRef.current) {
        parentOriginRef.current = newOrigin;
      } else if (newOrigin !== parentOriginRef.current) {
        console.warn(
          `Embed rejected message from untrusted origin: ${newOrigin}`,
        );
        return;
      }

      setParentViewportHeight(event.data.viewportHeight);
      setParentScrollY(event.data.scrollY);
      setParentScrollHeight(event.data.scrollHeight);
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [setParentScrollHeight, setParentScrollY, setParentViewportHeight]);

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      if (!offsetTopRef.current) return;
      setOffsetTop((prev) => {
        if (!offsetTopRef.current) return 0;
        const diff = offsetTopRef.current - prev;
        if (Math.abs(diff) < 0.5) return offsetTopRef.current; // snap when close
        return prev + diff * 0.05; // lerp factor 0.2 gives ~smooth trailing
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <>
      {createPortal(
        <div
          className={`fixed inset-0 z-40 h-screen backdrop-blur-lg`}
          onClick={handleBackdropClick}
        >
          <div
            ref={backdropRef}
            className="modal flex h-screen w-full items-center justify-center"
          >
            {isEmbedRoute && screenWidthMedium() && offsetTop !== 0 ? (
              <div
                className=""
                style={{
                  position: "absolute",
                  top: `${offsetTop}px`,
                  visibility: offsetTop === 0 ? "hidden" : "visible",
                }}
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
