/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

/* istanbul ignore file */

export const getImageColorset = (el: HTMLImageElement) => {
  // create canvas
  const canvas = document.createElement("canvas");
  canvas.width = Math.min(500, el.naturalWidth);
  canvas.height = Math.min(500, el.naturalHeight);

  const ctx = canvas.getContext("2d");
  if (ctx != null) {
    ctx.drawImage(
      el,
      0,
      0,
      el.naturalWidth,
      el.naturalHeight,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let r, g, b;
    let light = 0;
    let dark = 0;
    const transparent = data?.[3] === 0;

    for (let x = 0, len = data.length; x < len; x += 4) {
      if (data[x + 3] === 0) {
        continue;
      }
      r = data[x];
      g = data[x + 1];
      b = data[x + 2];
      if (Math.max(Math.max(r, g), b) < 128) dark++;
      else light++;
    }

    const diff = (light - dark) / (el.naturalWidth * el.naturalHeight);
    let ret = diff < 0 ? "dark" : "light";
    if (transparent) {
      ret += "_transparent";
    }
    return ret;
  }
  return "light";
};
