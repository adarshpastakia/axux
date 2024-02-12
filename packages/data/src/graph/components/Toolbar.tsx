/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type IG6GraphEvent, type NodeModel } from "@antv/g6";
import { AxAside, AxButton, AxContent } from "@axux/core";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useGraphContext } from "../context/GraphContext";
import { type GraphProps } from "../types";
import { GraphIcons } from "../types/icons";

export const Toolbar = ({
  allowInteraction,
  onNodeExpand,
}: Pick<GraphProps, "allowInteraction" | "onNodeExpand">) => {
  const { graph } = useGraphContext();

  const [zoom, setZoom] = useState(0);
  const [selected, setSelected] = useState<NodeModel[]>([]);

  const handleExpand = useCallback(
    (nodes: NodeModel[]) => {
      void onNodeExpand?.(nodes).then((newData) => {
        graph.addData(newData);
      });
    },
    [graph.ref, onNodeExpand]
  );

  useEffect(() => {
    graph.ref?.on("viewportchange", () => {
      const zoom = graph.ref?.getZoom() ?? 1;
      setZoom(zoom <= 0.25 ? -1 : zoom >= 15 ? 1 : 0);
    });
    graph.ref?.on("select", (e: IG6GraphEvent) => {
      setSelected(
        graph.ref
          ?.getAllNodesData()
          .filter((node) => graph.ref?.getItemState(node.id, "selected")) ?? []
      );
    });
    graph.ref?.on("node:dblclick", (e: IG6GraphEvent) => {
      const node = graph.ref?.getNodeData(e.itemId);
      node && handleExpand([node]);
    });
    return () => {
      graph.ref?.off("viewportchange");
      graph.ref?.off("select");
    };
  }, [graph.ref]);

  return (
    <AxAside width="auto" className="graph-toolbar">
      <AxContent
        padding="none"
        className="flex flex-col gap-1 bg-none no-scrollbars"
      >
        <AxButton.Group isVertical variant="flat">
          <AxButton
            className="flush"
            icon={GraphIcons.zoomIn}
            isDisabled={zoom === 1}
            onClick={() => graph.ref?.zoom(1.5) as AnyObject}
          />
          <AxButton
            className="flush"
            icon={GraphIcons.zoomOut}
            isDisabled={zoom === -1}
            onClick={() => graph.ref?.zoom(0.5) as AnyObject}
          />
          <AxButton
            className="flush"
            icon={GraphIcons.zoomReset}
            onClick={graph.resetView}
          />
        </AxButton.Group>

        {allowInteraction && (
          <Fragment>
            <AxButton.Group isVertical variant="flat">
              {false && (
                <AxButton.Group
                  variant="flat"
                  className="m-0 fixed z-10 bg-base"
                >
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
              <AxButton icon={GraphIcons.selectLasso} isDisabled />
              <AxButton
                icon={GraphIcons.toolExpand}
                isDisabled={!selected.length}
                onClick={() => {
                  handleExpand(selected);
                }}
              />
              <AxButton icon={GraphIcons.toolHilight} isDisabled />
              <AxButton
                color="danger"
                icon={GraphIcons.toolDelete}
                isDisabled={!selected.length}
                onClick={() => (
                  graph.ref?.removeData(
                    "node",
                    selected.map((node) => node.id)
                  ),
                  setSelected([])
                )}
              />
              <AxButton.Confirm
                color="danger"
                placement="right"
                actionType="danger"
                message={
                  (<div className="text-center">Clear graph?</div>) as AnyObject
                }
                icon={GraphIcons.toolErase}
                onClick={(b) => b && graph.ref?.clear()}
              />
            </AxButton.Group>
            <AxButton.Group isVertical variant="flat">
              <AxButton
                icon={GraphIcons.layoutAuto}
                onClick={() => graph.applyLayout("auto")}
              />
              <AxButton
                icon={GraphIcons.layoutRadial}
                onClick={() => graph.applyLayout("radial")}
              />
              <AxButton
                icon={GraphIcons.layoutGrid}
                onClick={() => graph.applyLayout("grid")}
              />
              <AxButton
                icon={GraphIcons.layoutHierarchial}
                onClick={() => graph.applyLayout("hierarchy")}
              />
            </AxButton.Group>
          </Fragment>
        )}
      </AxContent>
    </AxAside>
  );
};
