/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { AxAside, AxButton, AxContent } from "@axux/core";
import { GraphIcons } from "../types/icons";

export const Toolbar = () => {
  return (
    <AxAside width="auto" className="graph-toolbar">
      <AxContent
        padding="none"
        className="flex flex-col gap-1 bg-none no-scrollbars"
      >
        <AxButton.Group isVertical variant="flat">
          <AxButton className="flush" icon={GraphIcons.zoomIn} />
          <AxButton className="flush" icon={GraphIcons.zoomOut} />
          <AxButton className="flush" icon={GraphIcons.zoomReset} />
        </AxButton.Group>

        <AxButton.Group isVertical variant="flat">
          {false && (
            <AxButton.Group variant="flat" className="m-0 fixed z-10 bg-base">
              <AxButton
                className="flush m-0"
                variant="link"
                icon={GraphIcons.selectLasso}
              />
              <AxButton
                className="flush m-0"
                variant="link"
                icon={GraphIcons.selectRect}
              />
              <AxButton variant="link" className="flush">
                Cancel
              </AxButton>
            </AxButton.Group>
          )}
          <AxButton icon={GraphIcons.selectLasso} />
          <AxButton icon={GraphIcons.toolExpand} />
          <AxButton icon={GraphIcons.toolHilight} />
          <AxButton color="danger" icon={GraphIcons.toolDelete} />
          <AxButton.Confirm
            color="danger"
            placement="right"
            actionType="danger"
            message={
              (<div className="text-center">Clear graph?</div>) as AnyObject
            }
            icon={GraphIcons.toolErase}
          />
        </AxButton.Group>
        <AxButton.Group isVertical variant="flat">
          <AxButton icon={GraphIcons.layoutAuto} />
          <AxButton icon={GraphIcons.layoutGrid} />
          <AxButton icon={GraphIcons.layoutHierarchial} />
        </AxButton.Group>
      </AxContent>
    </AxAside>
  );
};
