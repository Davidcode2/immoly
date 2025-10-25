import { RefObject, useEffect, useRef, useState } from "react";
import centerModalVerticallyFunc from "@/services/centerVertically";

type PropTypes = {
  children: React.ReactNode;
  isEmbedRoute: boolean;
  backdropRef: RefObject<HTMLDivElement | null>;
};
export default function EmmbedModal({
  children,
  isEmbedRoute,
  backdropRef,
}: PropTypes) {
  const offsetTopRef = useRef<number>(0);
  const [offsetTop, setOffsetTop] = useState<number>(0);
  const parentOriginRef = useRef(null);
  const receivedParentSizeMessage = useRef(false);

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  const centerModal = (
    parentViewportHeight: number,
    parentScrollY: number,
    parentScrollHeight: number,
  ) => {
    let offsetTop = centerModalVertically(
      parentViewportHeight,
      parentScrollY,
      parentScrollHeight,
    );
    if (!offsetTop) return;
    if ("virtualKeyboard" in navigator) {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      const { height } = (navigator as Navigator as any).virtualKeyboard
        .boundingRect;
      offsetTop -= height / 2;
    }

    setOffsetTop(offsetTop);
    offsetTopRef.current = offsetTop;
  };

  const centerModalVertically = (
    parentViewportHeight: number,
    parentScrollY: number,
    parentScrollHeight: number,
  ) => {
    if (!isEmbedRoute || !backdropRef.current) {
      return;
    }

    const modalElement = backdropRef.current?.firstElementChild as HTMLElement;
    if (!modalElement) {
      return;
    }

    const iframeHeight = document.body.scrollHeight;

    const modalTop = centerModalVerticallyFunc(
      modalElement.clientHeight,
      iframeHeight,
      Number(parentScrollHeight),
      Number(parentViewportHeight),
      Number(parentScrollY),
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

      const parentViewportHeight = event.data.viewportHeight;
      const parentScrollY = event.data.scrollY;
      const parentScrollHeight = event.data.scrollHeight;
      receivedParentSizeMessage.current = true;
      centerModal(parentViewportHeight, parentScrollY, parentScrollHeight);
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (!isEmbedRoute) return;
    window.parent.postMessage({ type: "LOCK_BODY_SCROLL" }, "*");
    return () => window.parent.postMessage({ type: "UNLOCK_BODY_SCROLL" }, "*");
  }, []);

  return (
    <>
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
    </>
  );
}
