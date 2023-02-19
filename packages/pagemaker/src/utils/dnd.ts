/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

/** @internal */
import { isEmpty } from "@axux/utilities";
import { DragEvent } from "react";
import { EnumTypes, IDragObject } from "./types";

/**
 * Ghost element
 */
export const ghost: HTMLElement & { reset: () => HTMLElement } =
  document.createElement("div") as AnyObject;
ghost.classList.add("page-maker__ghost");
ghost.style.top = "-100%";
ghost.reset = () => {
  ghost.style.top = "-100%";
  ghost.style.left = "unset";
  ghost.style.width = "unset";
  ghost.style.height = "unset";
  ghost.dataset.id = undefined;
  return ghost;
};

/**
 * generate element id
 */
const generateId = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

/**
 * get config from drag object
 */
export const getNodeConfig = (dragging: IDragObject) => {
  let newConfig: AnyObject = { ...dragging.item };

  if (dragging.config) {
    newConfig = {
      ...dragging.config,
      isReadOnly: true,
      id: generateId(),
    };
  }

  if (isEmpty(newConfig)) {
    newConfig = {
      type: dragging.type,
      title: dragging.title,
      id: generateId(),
      colSpan: 12,
    };

    if (dragging.type === EnumTypes.TILE)
      newConfig = {
        ...newConfig,
        icon: dragging.icon,
        title: dragging.title,
        colSpan: 3,
        bordered: true,
        expandable: true,
        widgetId: dragging.widgetId,
      };

    if (dragging.type === EnumTypes.VDIVIDER)
      newConfig = {
        ...newConfig,
        colSpan: 1,
      };

    if (dragging.type === EnumTypes.DIVIDER)
      newConfig = {
        ...newConfig,
        align: "center",
      };

    if (newConfig.type === EnumTypes.GRID)
      newConfig = {
        ...newConfig,
        children: [],
        colSpan: 3,
      };

    if (newConfig.type === EnumTypes.IMAGE)
      newConfig = {
        ...newConfig,
        fit: "contain",
        aspect: "4 / 3",
        colSpan: 3,
      };
  }

  return newConfig;
};

const getNearestGrid = (target: HTMLElement) => {
  return target.closest(".page-maker__grid") as HTMLElement;
};

const getNearestNode = (target: HTMLElement) => {
  return target.closest(".page-maker__item") as HTMLElement;
};

/* eslint-disable @typescript-eslint/restrict-plus-operands */
const calculateGhostPosition = (
  clientX: number,
  grid: HTMLElement,
  neighbor: HTMLElement
) => {
  const gridRect = grid.getBoundingClientRect();
  const rect = neighbor.getBoundingClientRect();
  const isBefore = clientX < rect.left + rect.width / 2;
  const edge = isBefore
    ? rect.left <= gridRect.left
    : rect.right >= gridRect.right;
  ghost.dataset.id = neighbor.dataset.id;
  ghost.dataset.pos = isBefore ? "0" : "1";
  if (edge) {
    if (isBefore) ghost.style.top = rect.top - 8 + "px";
    else ghost.style.top = rect.bottom + "px";
    ghost.style.left = gridRect.left + "px";
    ghost.style.width = gridRect.width + "px";
  } else {
    ghost.style.top = rect.top + "px";
    ghost.style.height = rect.height + "px";
    if (isBefore) ghost.style.left = rect.left - 8 + "px";
    else ghost.style.left = rect.right + "px";
  }
};

const calculatePosition = (
  evt: DragEvent,
  grid: HTMLElement,
  neighbor?: HTMLElement
) => {
  const gridRect = grid.getBoundingClientRect();
  if (neighbor && neighbor !== grid) {
    calculateGhostPosition(evt.clientX, grid, neighbor);
  } else {
    const children = grid.querySelectorAll(":scope > .page-maker__item");
    const neighbor = [...children].reverse().find((child) => {
      const { top, bottom } = child.getBoundingClientRect();
      return evt.clientY >= top && evt.clientY <= bottom;
    }) as HTMLElement;
    if (neighbor) {
      calculateGhostPosition(evt.clientX, grid, neighbor);
    } else {
      const isInner = grid.classList.contains("inner");
      ghost.dataset.id = "";
      ghost.dataset.grid = grid.dataset.id ?? "";
      ghost.style.top = (isInner ? gridRect.top : gridRect.bottom) + "px";
      ghost.style.left = gridRect.left + "px";
      ghost.style.width = gridRect.width + "px";
    }
  }
};

/**
 * Element drag over
 */
export const onDragOver = (evt: DragEvent, dragging: IDragObject) => {
  evt.preventDefault();
  let target = evt.target as HTMLElement;
  if (target.classList.contains("page-maker__page"))
    target = target.querySelector(".page-maker__grid") as HTMLElement;
  if (target !== ghost) {
    let grid = getNearestGrid(target);
    if (dragging.type === EnumTypes.GRID && grid.classList.contains("inner"))
      grid = getNearestGrid(grid.parentElement as HTMLElement);
    const node = target !== grid ? getNearestNode(target) : grid;
    ghost.reset();
    calculatePosition(evt, grid, node);
  }
};

export const onDrop = (dragging: IDragObject) => {
  const parent = ghost.parentElement;
  if (parent != null) {
    const { id, grid, pos = 0 } = ghost.dataset;
    ghost.reset();
    return {
      id,
      grid,
      pos: +pos,
      item: getNodeConfig(dragging),
    };
  }
};

export const onDragLeave = (evt: DragEvent) => {
  ghost.reset();
  if (
    evt.relatedTarget != null &&
    (evt.relatedTarget as HTMLElement).dataset.type === EnumTypes.PAGE
  ) {
    return true;
  }
  return false;
};

export const onDragCancel = () => {
  ghost.reset();
};
