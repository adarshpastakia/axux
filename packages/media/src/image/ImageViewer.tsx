/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxAnimation, AxHotKey, AxIcon, useResizeObserver } from "@axux/core";
import { HotKeyWrapper } from "@axux/core/dist/hotkeys/HotKeyWrapper";
import { getImageColorset } from "@axux/utilities/dist/getImageColorset";
import {
  forwardRef,
  ReactEventHandler,
  RefObject,
  SyntheticEvent,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useReducer,
  useRef,
  useTransition,
} from "react";
import { CanvasRef } from "../canvas/Canvas";
import { Image } from "./Image";
import { Tools } from "./Tools";

type Rotation = 0 | 90 | 180 | 270;

interface ViewerState {
  zoom: number;
  rotate: Rotation;
  loading: boolean;
  error: boolean;
  ratio: number;
  width: number;
  height: number;
}

interface ViewerActions {
  type: "init" | "zoom" | "rotate" | "resize" | "loaded" | "errored";
  payload?: AnyObject;
}

interface ImageViewerRef extends CanvasRef {
  rotate: (rotation: Rotation) => void;
  zoom: (level: number) => void;
}

export interface ImageViewerProps {
  ref?: RefObject<ImageViewerRef | null>;
  /**
   * image src url
   */
  src: string;
  /**
   * overlay image
   */
  overlaySrc?: string;

  onLoad?: ReactEventHandler<HTMLImageElement>;
  onError?: ReactEventHandler<HTMLImageElement>;
}

export const AxImageViewer = forwardRef<
  ImageViewerRef | null,
  ImageViewerProps
>(({ src, overlaySrc, onLoad, onError }, ref) => {
  const canvasRef = useRef<CanvasRef>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const resizeHandler = useCallback(
    (size: KeyValue) => dispatch({ type: "resize", payload: size }),
    []
  );
  const containerRef = useResizeObserver(resizeHandler);

  const [pending, startTransition] = useTransition();

  const initState = useCallback(
    () =>
      ({
        zoom: 0,
        rotate: 0,
        loading: true,
        error: false,
        width: 512,
        height: 512,
      } as ViewerState),
    []
  );

  const calculateSize = useCallback((rotate: number, zoom: number) => {
    const el = containerRef.current;
    const img = imageRef.current;
    if (el && img && img.naturalWidth) {
      const turn = rotate % 180 !== 0;
      let ratio = zoom;
      let width = turn ? img.naturalHeight : img.naturalWidth;
      let height = turn ? img.naturalWidth : img.naturalHeight;
      if (zoom === 0) {
        const containerWidth = el.offsetWidth;
        const containerHeight = el.offsetHeight;
        // if container ratio is more than image ratio height set to container 100%
        if (containerWidth / containerHeight > width / height) {
          width = width * (containerHeight / height);
          height = containerHeight;
        } else {
          height = height * (containerWidth / width);
          width = containerWidth;
        }
        ratio = Math.min(width / img.naturalWidth, height / img.naturalHeight);
      } else {
        width *= zoom;
        height *= zoom;
      }
      return { ratio, width, height };
    }
    return { ratio: 1, width: 128, height: 128 };
  }, []);

  const reducer = useCallback(
    (state: ViewerState, action: ViewerActions) => {
      if (action.type === "init") {
        state = initState();
      }
      if (action.type === "zoom") {
        state.zoom = Math.min(5, Math.max(0, action.payload));
        state = { ...state, ...calculateSize(state.rotate, state.zoom) };
      }
      if (action.type === "rotate") {
        state.rotate =
          action.payload > 270 ? 0 : action.payload < 0 ? 270 : action.payload;
        state = { ...state, ...calculateSize(state.rotate, state.zoom) };
      }
      if (action.type === "resize") {
        state = { ...state, ...calculateSize(state.rotate, state.zoom) };
      }
      if (action.type === "loaded") {
        state.loading = false;
        state.error = false;
        state.zoom = 0;
        state = { ...state, ...calculateSize(state.rotate, state.zoom) };
      }
      if (action.type === "errored") {
        state.error = true;
        state.loading = false;
      }
      return { ...state };
    },
    [initState]
  );

  const [state, dispatch] = useReducer(
    reducer,
    {
      zoom: 1,
      rotate: 0,
      loading: true,
      error: false,
    },
    initState
  );

  useImperativeHandle(
    ref,
    () =>
      canvasRef.current
        ? {
            zoom: (zoom: number) => dispatch({ type: "zoom", payload: zoom }),
            rotate: (rotation: Rotation) =>
              dispatch({ type: "rotate", payload: rotation }),
            ...canvasRef.current,
          }
        : (null as AnyObject),
    []
  );

  /******************* reset zoom and rotate on change of source *******************/
  useLayoutEffect(() => {
    dispatch({ type: "init" });
  }, [src]);

  const handleLoad = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      dispatch({ type: "loaded" });
      startTransition(() => {
        const colorset = imageRef.current && getImageColorset(imageRef.current);
        colorset &&
          containerRef.current?.parentElement &&
          (containerRef.current.parentElement.dataset.colorset = colorset);
        onLoad?.(e);
      });
    },
    [onLoad]
  );
  const handleError = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      dispatch({ type: "errored" });
      startTransition(() => onError?.(e));
    },
    [onError]
  );

  return (
    <HotKeyWrapper>
      <AxHotKey
        global
        keyCombo="f"
        handler={() => dispatch({ type: "zoom", payload: 0 })}
      />
      <AxHotKey
        global
        keyCombo=","
        handler={() =>
          dispatch({ type: "zoom", payload: Math.max(state.zoom - 0.5, 0.5) })
        }
      />
      <AxHotKey
        global
        keyCombo="."
        handler={() => dispatch({ type: "zoom", payload: state.zoom + 0.5 })}
      />
      <AxHotKey
        global
        keyCombo="["
        handler={() => dispatch({ type: "rotate", payload: state.rotate - 90 })}
      />
      <AxHotKey
        global
        keyCombo="]"
        handler={() => dispatch({ type: "rotate", payload: state.rotate + 90 })}
      />
      <div className="ax-media" data-error={state.error}>
        <div
          className="ax-media__container ax-image__scroller"
          ref={containerRef}
        >
          <Image
            src={src}
            imageRef={imageRef}
            canvasRef={canvasRef}
            onLoad={handleLoad}
            onError={handleError}
            width={state.width}
            height={state.height}
            rotate={state.rotate}
          />

          <Tools
            zoom={state.zoom}
            rotate={state.rotate}
            onZoom={(zoom) => dispatch({ type: "zoom", payload: zoom })}
            onRotate={(rotate) =>
              dispatch({ type: "rotate", payload: state.rotate + rotate })
            }
          />
        </div>

        {state.loading && (
          <div className="ax-media__overlay">
            <AxAnimation.Bars className="text-white" />
          </div>
        )}
        {state.error && (
          <div className="ax-media__overlay">
            <AxIcon
              size={48}
              icon="M17 12C17 12.54 16.9 13.05 16.74 13.54L15 11.78C14.87 10.3 13.7 9.13 12.22 9L10.46 7.26C10.95 7.1 11.46 7 12 7C14.76 7 17 9.24 17 12M9.88 4H14.12L15.95 6H20V16.8L21.88 18.68C21.96 18.47 22 18.24 22 18V6C22 4.89 21.11 4 20 4H16.83L15 2H9L7.18 4L8.6 5.4L9.88 4M22.11 21.46L20.84 22.73L18.11 20H4C2.9 20 2 19.11 2 18V6C2 5.42 2.25 4.9 2.65 4.54L1.11 3L2.39 1.73L22.11 21.46M9 12C9 13.66 10.34 15 12 15C12.33 15 12.65 14.93 12.94 14.83L9.17 11.06C9.07 11.36 9 11.67 9 12M16.11 18L14.45 16.34C13.72 16.75 12.89 17 12 17C9.24 17 7 14.76 7 12C7 11.11 7.25 10.28 7.66 9.55L4.11 6H4V18H16.11Z"
            />
          </div>
        )}
      </div>
    </HotKeyWrapper>
  );
});
