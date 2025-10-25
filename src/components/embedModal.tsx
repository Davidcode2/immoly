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
  const parentOriginRef = useRef(null);
  const receivedParentSizeMessage = useRef(false);

  const setParentViewportHeight = useParentViewportHeightStore().updateValue;
  const setParentScrollY = useParentScrollYStore().updateValue;
  const setParentScrollHeight = useParentScrollHeight().updateValue;

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  useEffect(() => {
    if (!isMounted.current) return;
    if (!isEmbedRoute) return;
    if (!receivedParentSizeMessage.current) return;

    let offsetTop = centerModalVertically();
    if (!offsetTop) return;
    if ("virtualKeyboard" in navigator) {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      const { height } = (navigator as Navigator as any).virtualKeyboard
        .boundingRect;
      offsetTop -= height / 2;
    }

    setOffsetTop(offsetTop);
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

    const iframeHeight = document.body.scrollHeight;

    const modalTop = centerModalVerticallyFunc(
      modalElement.clientHeight,
      iframeHeight,
      Number(useParentScrollHeight.getState().value),
      Number(useParentViewportHeightStore.getState().value),
      Number(useParentScrollYStore.getState().value),
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
      receivedParentSizeMessage.current = true;
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [setParentScrollHeight, setParentScrollY, setParentViewportHeight]);

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
