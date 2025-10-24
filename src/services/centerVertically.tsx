export default function centerModalVerticallyFunc(
  modalHeight: number,
  iframeHeight: number,
  parentHeight: number,
  parentViewportHeight: number,
  parentScrollY: number,
) {
  const iframeOffsetInParent = parentHeight - iframeHeight;
  let visibleTop = parentScrollY - iframeOffsetInParent;
  let visibleBottom = visibleTop + parentViewportHeight;

  visibleTop = Math.max(0, Math.min(visibleTop, iframeHeight));
  visibleBottom = Math.max(0, Math.min(visibleBottom, iframeHeight));

  const visibleCenter = (visibleTop + visibleBottom) / 2;
  let modalTop = visibleCenter - modalHeight / 2;
  const minTop = 0;
  const maxTop = Math.max(0, iframeHeight - modalHeight);
  modalTop = Math.max(minTop, Math.min(modalTop, maxTop));

  return modalTop;
}
