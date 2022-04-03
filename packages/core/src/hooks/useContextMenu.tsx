// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { render, unmountComponentAtNode } from "react-dom";
import { AxContextMenuPopper, ContextMenuPopperProps } from "../overlays/ContextMenu";

export const useAxContextMenu = () => {
  const showContextMenu = (props: ContextMenuPopperProps) => {
    const el = document.createElement("div");
    const container = document.body.querySelector(".ax-root") as HTMLElement;
    container.appendChild(el);
    const onClose = () => {
      setTimeout(() => {
        unmountComponentAtNode(el);
        el.remove();
      }, 10);
    };
    setTimeout(() => render(<AxContextMenuPopper {...props} onClose={onClose} />, el), 5);
  };

  return { showContextMenu };
};
