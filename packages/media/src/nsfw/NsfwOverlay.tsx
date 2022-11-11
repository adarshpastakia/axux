/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { useEffect, useState } from "react";
import { Icons } from "../types/icons";

export const NsfwOverlay = ({ isNsfw = false }) => {
  const [showNsfw, setShowNsfw] = useState(false);

  useEffect(() => {
    setShowNsfw(!!isNsfw);
  }, [isNsfw]);

  return showNsfw ? (
    <div
      className="ax-media__nsfw"
      onClick={(e) => (
        setShowNsfw(false), e.stopPropagation(), e.preventDefault
      )}
    >
      <div>
        <div>Not Safe For Work</div>
        <AxIcon size={48} icon={Icons.iconNsfw} />
        <div>Click to view</div>
      </div>
    </div>
  ) : null;
};
