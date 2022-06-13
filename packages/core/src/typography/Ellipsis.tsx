// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { FC, useCallback, useLayoutEffect, useRef, useState } from "react";
import { debounce } from "@axux/utilities";
import ResizeObserver from "resize-observer-polyfill";

export const AxEllipsis: FC = ({ children }) => {
  const refSpan = useRef<HTMLSpanElement>(null);
  const [showEllipsis, setShowEllipsis] = useState<string>();

  const checkEllipsis = useCallback(() => {
    if (refSpan.current) {
      const el = refSpan.current;
      const span = el.firstElementChild as HTMLElement;
      setShowEllipsis(span.offsetWidth > el.offsetWidth + 8 ? span.innerText : undefined);
    }
  }, []);

  useLayoutEffect(() => {
    setShowEllipsis(undefined);
    debounce(checkEllipsis, 100)();
    if (refSpan.current) {
      const ob = new ResizeObserver(checkEllipsis);
      ob.observe(refSpan.current);

      return () => {
        ob.disconnect();
      };
    }
  }, [checkEllipsis, children]);

  return (
    <span
      ref={refSpan}
      title={showEllipsis}
      data-enabled={!!showEllipsis}
      className="ax-ellipsis--middle"
    >
      <span>{children}</span>
    </span>
  );
};
