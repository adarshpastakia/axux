/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton } from "@axux/core";
import { useEffect, useState } from "react";
import { useMapContext } from "../viewer/MapViewer";

const iconRectangle =
  "M14,17H17V14H19V17H22V19H19V22H17V19H14V17M12,17V19H9V17H12M7,17V19H3V15H5V17H7M3,13V10H5V13H3M3,8V4H7V6H5V8H3M9,4H12V6H9V4M15,4H19V8H17V6H15V4M19,10V12H17V10H19Z";
const iconCircle =
  "M6.35,20.25L7.56,18.66C8.42,19.23 9.39,19.64 10.43,19.85L10.16,21.83C8.77,21.57 7.5,21 6.35,20.25M16.43,18.66L17.64,20.26C16.5,21.03 15.23,21.57 13.84,21.83L13.57,19.85C14.61,19.64 15.57,19.23 16.43,18.66M19.84,13.59L21.83,13.86C21.57,15.25 21,16.54 20.24,17.66L18.65,16.45C19.22,15.6 19.63,14.63 19.84,13.59M2.17,13.84L4.15,13.57C4.36,14.61 4.77,15.58 5.34,16.44L3.75,17.65C3,16.5 2.43,15.23 2.17,13.84M18.66,7.56L20.25,6.35C21.03,7.5 21.58,8.78 21.83,10.18L19.85,10.45C19.64,9.4 19.23,8.42 18.66,7.56M13.57,4.15L13.84,2.17C15.23,2.43 16.5,3 17.65,3.75L16.44,5.34C15.58,4.77 14.61,4.36 13.57,4.15M7.56,5.34L6.35,3.75C7.5,3 8.77,2.43 10.16,2.17L10.43,4.15C9.39,4.36 8.42,4.77 7.56,5.34M4.15,10.43L2.17,10.16C2.43,8.77 3,7.5 3.75,6.35L5.34,7.56C4.77,8.42 4.36,9.39 4.15,10.43Z";

export const Draw = () => {
  const { map, draw } = useMapContext();

  const [active, setActive] = useState("");

  useEffect(() => {
    const cb = (e: KeyValue) => {
      map.getCanvas().focus();
      setActive(e?.drawType);
    };
    map.on("draw.start", cb);
    map.on("draw.stop", cb);

    return () => {
      map.off("draw.start", cb);
      map.off("draw.stop", cb);
    };
  }, [map]);

  return (
    <AxButton.Group isVertical>
      <AxButton
        icon={iconCircle}
        className="flush"
        isActive={active === "circle"}
        onClick={() => {
          draw?.changeMode("draw-circle");
        }}
      />
      <AxButton
        icon={iconRectangle}
        className="flush"
        isActive={active === "rectangle"}
        onClick={() => {
          draw?.changeMode("draw-rectangle");
        }}
      />
    </AxButton.Group>
  );
};
