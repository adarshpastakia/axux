/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
} from "react";
import { useMapContext } from "../context/MapContext";
import { useProjection } from "../hooks/useProjection";

const SelectionSymbol = {
  type: "simple-fill" as AnyObject,
  color: "rgba(183,146,68,0.1)",
  outline: {
    width: 1,
    color: "#b79244",
  },
};
const SelectedSymbol = {
  type: "simple-fill" as AnyObject,
  color: "rgba(64,134,122,0.1)",
  outline: {
    width: 2,
    color: "#40867A",
  },
};

export interface SelectionProps {
  filters?: number[][][];
  onUpdate?: (areas: number[][][]) => void;
}

export const Selection: FC<SelectionProps> = memo(
  ({ onUpdate, filters = [] }: SelectionProps) => {
    const refWidget = useRef<HTMLDivElement>(null);
    const refLayer = useRef<GraphicsLayer>();
    const [sketchModel, setSketchModel] = useState<SketchViewModel>();
    const { view, map } = useMapContext();
    const { getGeometry } = useProjection();

    const [sketchState, setSketchState] = useState<"idle" | "edit" | "create">(
      "idle"
    );

    const onChange = useCallback(async () => {
      const graphics = refLayer.current?.graphics;
      if (graphics) {
        const geos = await Promise.all(
          graphics.map(
            async (graphic: Graphic) =>
              await getGeometry(graphic.geometry).then((geo) =>
                geo ? (geo as __esri.Polygon).rings[0] : []
              )
          )
        );
        onUpdate?.(geos);
      }
    }, []);

    useEffect(() => {
      const createHandle = sketchModel?.on(
        "create",
        ({ graphic, tool, state }) => {
          if (state === "cancel") {
            setSketchState("idle");
          }
          if (state === "complete") {
            graphic.set("symbol", SelectedSymbol);
            setSketchState("idle");
            void onChange();
          }
        }
      );
      const updateHandle = sketchModel?.on("update", ({ graphics, state }) => {
        if (state === "start") {
          setSketchState("edit");
        }
        if (state === "complete") {
          setSketchState("idle");
          void onChange();
        }
      });
      const deleteHandle = sketchModel?.on("delete", ({ graphics, tool }) => {
        setSketchState("idle");
        void onChange();
      });

      return () => {
        createHandle?.remove();
        updateHandle?.remove();
        deleteHandle?.remove();
      };
    }, [sketchModel]);

    useEffect(() => {
      if (view && map) {
        const widget = refWidget.current as HTMLElement;
        const layer = new GraphicsLayer({
          listMode: "hide",
          id: "graphic-layer",
        });
        const sketch = new SketchViewModel({
          view,
          layer,
          defaultUpdateOptions: {
            toggleToolOnClick: false,
          },
          updateOnGraphicClick: false,
          polygonSymbol: SelectionSymbol,
        });
        refLayer.current = layer;
        setSketchModel(sketch);

        const eventHandle = view?.popup.on?.("trigger-action", (e) => {
          if (e.action.id === "edit") {
            void sketch.update(view.popup.selectedFeature);
            view.popup.close();
          }
          if (e.action.id === "add-target") {
            void getGeometry(view.popup.selectedFeature.geometry).then((geo) =>
              console.log(geo ? (geo as __esri.Polygon).rings[0] : [])
            );
            view.popup.close();
          }
        });

        const handleKeydown = view.on("key-down", (evt) => {
          if (evt.key === "Control" && !evt.repeat) {
            sketch.create("circle");
          }
        });
        const handleKeyup = view.on("key-up", (evt) => {
          if (evt.key === "Control") {
            sketch.cancel();
          }
        });

        view.ui.add(widget, { index: -2, position: "top-trailing" });
        map.add(layer);
        view.on("layerview-create", () => {
          map.reorder(layer, 99);
        });
        return () => {
          eventHandle?.remove();
          handleKeydown.remove();
          handleKeyup.remove();
          view.ui.remove(widget);
          map.remove(layer);
        };
      }
    }, []);

    useEffect(() => {
      refLayer.current?.graphics.removeAll();
      filters.length > 0 &&
        refLayer.current?.graphics.addMany(
          filters?.map(
            (rings) =>
              new Graphic({
                geometry: {
                  type: "polygon",
                  rings: [rings],
                },
                popupTemplate: {
                  actions: [
                    {
                      id: "add-target",
                      type: "button",
                      className: "esri-icon-tracking",
                      title: "Add to Target",
                    },
                    {
                      id: "edit",
                      type: "button",
                      className: "esri-icon-edit",
                      title: "Edit",
                    },
                  ],
                },
                symbol: SelectedSymbol,
              } as AnyObject)
          )
        );
    }, [filters]);

    return (
      <div className="esri-widget" ref={refWidget}>
        <span className="text-xs text-center block">Draw</span>
        {sketchState === "idle" && (
          <Fragment>
            <button
              data-tooltip="Circle"
              data-tooltip-placement="left"
              className="esri-widget--button esri-widget esri-interactive"
              onClick={() => (
                setSketchState("create"), sketchModel?.create("circle")
              )}
            >
              <span className="esri-icon esri-icon-radio-unchecked" />
            </button>
            <button
              data-tooltip="Rectangle"
              data-tooltip-placement="left"
              className="esri-widget--button esri-widget esri-interactive"
              onClick={() => (
                setSketchState("create"), sketchModel?.create("rectangle")
              )}
            >
              <span className="esri-icon esri-icon-checkbox-unchecked" />
            </button>
            <button
              data-tooltip="Polygon"
              data-tooltip-placement="left"
              className="esri-widget--button esri-widget esri-interactive"
              onClick={() => (
                setSketchState("create"), sketchModel?.create("polygon")
              )}
            >
              <span className="esri-icon esri-icon-polygon" />
            </button>
          </Fragment>
        )}
        {(sketchState === "create" || sketchState === "edit") && (
          <button
            data-tooltip="Cancel"
            data-tooltip-placement="left"
            className="esri-widget--button esri-widget esri-interactive"
            onClick={() => sketchModel?.cancel()}
          >
            <span className="esri-icon esri-icon-close" />
          </button>
        )}
        {sketchState === "edit" && (
          <Fragment>
            <button
              data-tooltip="Add to target"
              data-tooltip-placement="left"
              className="esri-widget--button esri-widget esri-interactive"
              onClick={() => {
                if (sketchModel?.updateGraphics)
                  void getGeometry(
                    sketchModel?.updateGraphics.getItemAt(0).geometry
                  );
              }}
            >
              <span className="esri-icon esri-icon-locate-circled" />
            </button>
            <button
              data-tooltip="Delete"
              data-tooltip-placement="left"
              className="esri-widget--button esri-widget esri-interactive"
              onClick={() => sketchModel?.delete()}
            >
              <span className="esri-icon esri-icon-trash text-danger" />
            </button>
          </Fragment>
        )}
      </div>
    );
  }
);
Selection.displayName = "Map.tool.Selection";
