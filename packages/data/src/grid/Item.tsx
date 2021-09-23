// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, useEffect, useState } from "react";

export const GridItem: FC = ({ children }) => {
  const [eventRef, setEventRef] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if (ResizeObserver) {
      if (eventRef && eventRef.parentElement) {
        const el = eventRef;
        const ph = eventRef.parentElement;
        const ob = new ResizeObserver(() => {
          ph.style.height = `${el.offsetHeight ?? 48}px`;
        });
        ob.observe(el);
        return () => ob.disconnect();
      }
    }
  }, [eventRef]);

  return <section ref={setEventRef}>{children}</section>;
};
