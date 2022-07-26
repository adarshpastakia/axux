/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

interface Options {
  /**
   * is vertical resize
   */
  isReverse?: boolean;
  /**
   * is vertical resize
   */
  isVertical?: boolean;
  /**
   * callback on drag start
   */
  onStart?: () => void;
  /**
   * callback on drag end
   */
  onEnd?: () => void;
}

export const useResizer = (
  colEl: HTMLElement,
  ghostEl: HTMLElement,
  callback: (width: number) => void
) => {
  const placeholder = ghostEl.firstElementChild as HTMLElement;
  const isRtl = getComputedStyle(colEl).direction === "rtl";
  const scrollTo = ghostEl.closest(".ax-datagrid")?.scrollLeft ?? 0;

  const onResize = (evt: MouseEvent) => {
    /******************* check if reverse enabled of RTL *******************/
    const box = colEl.getBoundingClientRect();
    const x = evt.clientX - (isRtl ? box.left : box.right);
    placeholder.style.width = `${colEl.offsetWidth + x}px`;
  };

  /******************* dettach handlers on mouseup *******************/
  const onResizeEnd = () => {
    callback(placeholder.offsetWidth);
    ghostEl.style.display = "none";
    document.removeEventListener("mousemove", onResize);
    document.removeEventListener("mouseup", onResizeEnd);
  };

  /******************* attach handlers *******************/
  const box = colEl.getBoundingClientRect();
  if (isRtl && colEl.parentElement) {
    placeholder.style.left = "unset";
    placeholder.style.right = `${box.right}px`;
  } else {
    placeholder.style.right = "unset";
    placeholder.style.left = `${box.left}px`;
  }
  placeholder.style.width = `${colEl.offsetWidth}px`;
  placeholder.style.minWidth = colEl.style.minWidth || "48px";
  placeholder.style.maxWidth = colEl.style.maxWidth || "75vw";
  ghostEl.style.display = "block";

  document.addEventListener("mousemove", onResize);
  document.addEventListener("mouseup", onResizeEnd);
};
