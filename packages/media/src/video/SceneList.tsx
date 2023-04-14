/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { AxList } from "@axux/data";
import { Format } from "@axux/utilities";
import { type FC, memo, type RefObject, useState } from "react";

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
          <AxList
            layout="horizontal"
            items={scenes.sort((a, b) => (a[0] < b[0] ? -1 : 1))}
            className="h-14"
          >
            {({ data, ...props }) => (
              <AxList.Item {...props} className="ax-video__scenes--card">
                <span>{Format.durationSeconds(data[0], true)}</span>
                <img
                  src={data[1]}
                  loading="lazy"
                  onClick={() =>
                    videoRef.current != null &&
                    (videoRef.current.currentTime = data[0])
                  }
                />
              </AxList.Item>
            )}
          </AxList>
        )}
      </div>
    );
  }
);
SceneList.displayName = "AxVideo.Scenes";
