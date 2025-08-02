import { ReactNode, type JSX } from "react";

type PropTypes = {
  children: ReactNode;
};

export default function CenteredModal({
  children: children,
}: PropTypes): JSX.Element {
  return (
    <div className="fixed inset-0 z-40 backdrop-blur-sm">
      <div className="sticky top-80 z-50 flex items-center justify-center">{children}</div>
    </div>
  );
}
