/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { AxVirtualItem, AxVirtualList } from "@axux/data";
import { Format } from "@axux/utilities";
import { memo, useState, type FC, type RefObject } from "react";

interface SceneListProps {
  scenes?: Array<[time: number, poster: string]>;
  videoRef: RefObject<HTMLVideoElement>;
}

export const SceneList: FC<SceneListProps> = memo(
  ({ videoRef, scenes = [] }: SceneListProps) => {
    const [show, setShow] = useState(false);
    return (
      <div className="ax-video__scenes">
        <AxIcon
          icon={show ? AppIcons.iconCaretDown : AppIcons.iconCaretUp}
          onClick={() => setShow(!show)}
        />
        {show && (
          <AxVirtualList
            hideScroller
            padding="none"
            orientation="horizontal"
            items={scenes.sort((a, b) => (a[0] < b[0] ? -1 : 1))}
          >
            {({ data, ...props }) => (
              <AxVirtualItem {...props}>
                <div className="ax-video__scenes--card">
                  <span>{Format.durationSeconds(data[0], true)}</span>
                  <img
                    src={data[1]}
                    loading="lazy"
                    onClick={() =>
                      videoRef.current != null &&
                      (videoRef.current.currentTime = data[0])
                    }
                  />
                </div>
              </AxVirtualItem>
            )}
          </AxVirtualList>
        )}
      </div>
    );
  }
);
SceneList.displayName = "AxVideo.Scenes";
