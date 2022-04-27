// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { FC, useCallback, useState } from "react";

export const AxEllipsis: FC = ({ children }) => {
  const [showEllipsis, setShowEllipsis] = useState(false);
  const checkText = useCallback((el: HTMLElement) => {
    setShowEllipsis(el && el.offsetWidth > (el.parentElement?.offsetWidth ?? 0));
  }, []);
  return (
    <span
      className={showEllipsis ? "ax-ellipsis--middle" : "ax-block"}
      title={showEllipsis ? children?.toString() : undefined}
    >
      <span ref={checkText}>{children}</span>
    </span>
  );
};
