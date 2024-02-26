/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type GraphProps } from "../types";

export const layoutSpec = (
  layout: GraphProps["defaultLayout"] = "auto",
  useWorker = false
) => {
  let type: AnyObject = {
    type: "force-layout",
    center: [0, 0],
    nodeSize: 196,
    // factor: 9,
    // damping: 1,
    // nodeSpacing: 120,
    // linkDistance: 120,
    // clustering: true,
    // nodeClusterBy: "cluster",
    presetLayout: {
      type: "circular-layout",
      nodeSize: 32,
      nodeSpacing: 120,
      linkDistance: 120,
      preventOverlap: true,
    },
    kr: 20,
    kg: 0.1,
    preventOverlap: true,
    sortByCombo: true,
    animated: true,
    workerEnabled: useWorker,
  };
  if (layout === "grid")
    type = {
      type: "grid-layout",
      center: [0, 0],
      nodeSize: 120,
      gravity: 0.1,
      linkDistance: 120,
      preventOverlap: true,
      sortByCombo: true,
      animated: true,
      workerEnabled: useWorker,
    };
  if (layout === "circular")
    type = {
      type: "circular-layout",
      center: [0, 0],
      nodeSize: 32,
      nodeSpacing: 120,
      linkDistance: 120,
      sortByCombo: true,
      preventOverlap: true,
      animated: true,
      workerEnabled: useWorker,
    };
  if (layout === "radial")
    type = {
      type: "radial-layout",
      center: [0, 0],
      nodeSize: 32,
      unitRadius: 240,
      nodeSpacing: 120,
      linkDistance: 240,
      sortBy: "combo",
      sortByCombo: true,
      preventOverlap: true,
      animated: true,
      workerEnabled: useWorker,
    };
  if (layout === "hierarchy")
    type = {
      type: "hierarchy-layout",
      nodeSize: 32,
      nodesep: 100,
      ranksep: 70,
      sortByCombo: true,
      align: undefined,
      preventOverlap: true,
      animated: true,
      workerEnabled: useWorker,
    };

  return type;
};
