// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { useMemo } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { AxContextMenu, ContextMenuProps } from "../overlays/ContextMenu";

export const useAxContextMenu = () => {
  const toastContainer = useMemo(() => {
    return document.body.querySelector(".ax-root") as HTMLElement;
  }, []);

  const showContextMenu = (props: ContextMenuProps) => {
    const el = document.createElement("div");
    toastContainer.appendChild(el);
    const onClose = () => {
      setTimeout(() => {
        unmountComponentAtNode(el);
        el.remove();
      }, 10);
    };
    setTimeout(() => render(<AxContextMenu {...props} onClose={onClose} />, el), 50);
  };

  return { showContextMenu };
};
