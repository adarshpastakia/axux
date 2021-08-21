// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { ComponentType } from "react";
import { render, unmountComponentAtNode } from "react-dom";

/**
 * Service hook for displaying modal overlays
 */
export const useAxModalService = () => {
  const open = (Body: ComponentType<{ doClose: () => void }>) => {
    const el = document.createElement("div");
    el.className = "ax-overlay__mask";
    document.body.appendChild(el);
    const doClose = () => {
      el.dataset.show = "";
      setTimeout(() => {
        unmountComponentAtNode(el);
        el.remove();
      }, 500);
    };
    render(<Body doClose={doClose} />, el);
    setTimeout(() => (el.dataset.show = "true"), 10);

    return doClose;
  };

  return { open };
};
