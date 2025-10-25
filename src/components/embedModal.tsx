import { RefObject, useEffect, useRef, useState } from "react";
import centerModalVerticallyFunc from "@/services/centerVertically";
import {
  useParentScrollHeight,
  useParentScrollYStore,
  useParentViewportHeightStore,
} from "@/store";

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
  const parentScrollY = Number(useParentScrollYStore().value);
  const parentViewportHeight = Number(useParentViewportHeightStore().value);
  const parentScrollHeight = Number(useParentScrollHeight().value);
  const offsetTopRef = useRef<number>(0);
  const [offsetTop, setOffsetTop] = useState<number>(0);

  const setParentViewportHeight = useParentViewportHeightStore().updateValue;
  const setParentScrollY = useParentScrollYStore().updateValue;
  const setParentScrollHeight = useParentScrollHeight().updateValue;
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

  useEffect(() => {
    if (!isEmbedRoute) return;
    window.parent.postMessage({ type: "LOCK_BODY_SCROLL" }, "*");
    return () => window.parent.postMessage({ type: "UNLOCK_BODY_SCROLL" }, "*");
  }, []);

  const parentOriginRef = useRef(null);

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
