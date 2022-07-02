/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

const _getBox = (box: AnyObject = "0,0,0,0") => {
  let boundingBox = box;
  if (typeof box === "string") {
    boundingBox = box.split(",");
  }
  if (Array.isArray(boundingBox)) {
    boundingBox = boundingBox.map((b) => parseInt(b, 10));
  }
  return boundingBox;
};

/**
 * box "x1,y1,x2,y2" | [x1,y1,x2,y2]
 * returns canvas box
 */
export const getBoundingBox = (box: AnyObject = "0,0,0,0") => {
  const boundingBox = _getBox(box);

  let [x = 0, y = 0, w = 0, h = 0] = boundingBox;
  x = x > 0 ? x : 0;
  y = y > 0 ? y : 0;
  w = w - x;
  h = h - y;
  return [x, y, w, h];
};

/**
 * box "x,y,w,h" | [x,y,w,h]
 * returns canvas box
 */
export const getBox = (box: AnyObject = "0,0,0,0") => {
  const boundingBox = _getBox(box);

  let [x = 0, y = 0, w = 0, h = 0] = boundingBox;
  x = x > 0 ? x : 0;
  y = y > 0 ? y : 0;
  return [x, y, w, h];
};
