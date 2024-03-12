/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */
/* istanbul ignore file */

/** ***************** get css style property value *******************/
export const getCssStyle = (element: HTMLElement, property: string) => {
  return getComputedStyle(element).getPropertyValue(property);
};

/** ***************** calculate full width for given element *******************/
export const calculateTextWidth = (
  element: HTMLElement,
  styleRoot?: HTMLElement,
) => {
  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.font = getCssStyle(styleRoot ?? element, "font");
  clone.style.padding = getCssStyle(styleRoot ?? element, "padding");
  clone.style.letterSpacing = getCssStyle(
    styleRoot ?? element,
    "letter-spacing",
  );
  clone.style.position = "absolute";
  clone.style.top = "-10000%";
  document.body.appendChild(clone);
  const width = clone.offsetWidth;
  clone.remove();
  return width;
};

/** ***************** calculate full height for given element *******************/
export const calculateTextHeight = (
  element: HTMLElement,
  styleRoot?: HTMLElement,
) => {
  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.font = getCssStyle(styleRoot ?? element, "font");
  clone.style.width = `${element.offsetWidth}px`;
  clone.style.padding = getCssStyle(styleRoot ?? element, "padding");
  clone.style.lineHeight = getCssStyle(styleRoot ?? element, "line-height");
  clone.style.letterSpacing = getCssStyle(
    styleRoot ?? element,
    "letter-spacing",
  );
  clone.style.webkitLineClamp = "unset";
  clone.style.position = "absolute";
  clone.style.left = "-10000%";
  document.body.appendChild(clone);
  const height = clone.offsetHeight;
  clone.remove();
  return height;
};
