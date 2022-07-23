/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxProgress } from "@axux/core";
import { memo, useEffect, useState } from "react";
import { WavesurferInstance } from "./wavesurfer";

export const Loading = memo(
  ({ wavesurfer }: { wavesurfer: WavesurferInstance }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      wavesurfer.instance.on("loading", setProgress);
      return () => {
        wavesurfer.instance.un("loading", setProgress);
      };
    }, [wavesurfer]);

    return <AxProgress.Circle value={progress} />;
  }
);
