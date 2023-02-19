// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { AxIcon } from "@axux/core";
import { FC, memo, useEffect, useMemo, useState } from "react";
import { iconImageBroken } from "../../utils/icons";
import { IImageConfig } from "../../utils/types";
import { Item } from "./Item";

export const Image: FC<IImageConfig> = memo((item) => {
  const { src = "?", fit } = item;
  const [isErrored, setErrored] = useState(false);

  const styles = useMemo(
    () => ({
      objectFit: fit,
      display: isErrored ? "none" : undefined,
    }),
    [fit, isErrored]
  );

  useEffect(() => {
    setErrored(false);
  }, [src]);

  return (
    <Item item={item}>
      <img
        src={src}
        onError={() => setErrored(true)}
        className="w-full h-full overflow-hidden"
        style={styles as AnyObject}
      />
      {isErrored && (
        <AxIcon
          icon={iconImageBroken}
          className="text-2xl text-bw-500/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      )}
    </Item>
  );
});
Image.displayName = "AxPageMaker.Image";
