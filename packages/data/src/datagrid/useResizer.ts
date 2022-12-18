/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

export const useResizer = (
  colEl: HTMLElement,
  ghostEl: HTMLElement,
  callback: (width: number) => void
) => {
  const placeholder = ghostEl.firstElementChild as HTMLElement;
  const isRtl = getComputedStyle(colEl).direction === "rtl";

  const onResize = (evt: MouseEvent) => {
    /** ***************** check if reverse enabled of RTL *******************/
    const box = colEl.getBoundingClientRect();
    const x = isRtl ? box.left - evt.clientX : evt.clientX - box.right;
    placeholder.style.width = `${colEl.offsetWidth + x}px`;
  };

  /** ***************** dettach handlers on mouseup *******************/
  const onResizeEnd = () => {
    callback(placeholder.offsetWidth);
    ghostEl.style.display = "none";
    document.removeEventListener("mousemove", onResize);
    document.removeEventListener("mouseup", onResizeEnd);
  };

  /** ***************** attach handlers *******************/
  const box = colEl.getBoundingClientRect();
  if (colEl.parentElement != null) {
    const parentBox = colEl.parentElement?.getBoundingClientRect();
    if (isRtl) {
      placeholder.style.left = "unset";
      placeholder.style.right = `${parentBox.right - box.right}px`;
    } else {
      placeholder.style.right = "unset";
      placeholder.style.left = `${parentBox.left - box.left}px`;
    }
  }
  placeholder.style.width = `${colEl.offsetWidth}px`;
  placeholder.style.minWidth = colEl.style.minWidth || "48px";
  placeholder.style.maxWidth = colEl.style.maxWidth || "75vw";
  ghostEl.style.display = "block";

  document.addEventListener("mousemove", onResize);
  document.addEventListener("mouseup", onResizeEnd);
};
